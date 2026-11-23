import "server-only";
import { createHmac } from "node:crypto";
import { countries, labelFor, roles, services, studyLevels } from "../options";
import type { LeadRecord } from "./validate";

/**
 * Lead destinations ("sinks"). Each is enabled purely by environment configuration; credentials are
 * read here, server-side, and never sent to the browser. None of these integrations has been tested
 * against live accounts yet — see docs/INTEGRATIONS.md before relying on one in production.
 */
export interface LeadSink {
  name: string;
  enabled(): boolean;
  send(lead: LeadRecord): Promise<void>;
}

const TIMEOUT_MS = 10_000;

class SinkError extends Error {
  constructor(sink: string, status: number | string) {
    super(`${sink} responded with ${status}`);
  }
}

const splitName = (full: string) => {
  const parts = full.trim().split(/\s+/);
  return parts.length > 1 ? { first: parts.slice(0, -1).join(" "), last: parts.at(-1)! } : { first: "", last: parts[0] };
};

export function describe(lead: LeadRecord) {
  return {
    "Study level": labelFor(studyLevels, lead.studyLevel),
    "Student or parent": labelFor(roles, lead.role),
    "Preferred country": labelFor(countries, lead.country),
    "Intended intake": lead.intake ?? "",
    "Service of interest": labelFor(services, lead.service),
    Message: lead.message ?? "",
    "CTA / source": lead.attribution.source ?? "",
    "Submitted from": lead.attribution.pagePath ?? "",
    "Landing page": lead.attribution.landingPage ?? "",
    Referrer: lead.attribution.referrer ?? "",
    UTM: ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]
      .map((k) => lead.attribution[k as keyof typeof lead.attribution])
      .filter(Boolean)
      .join(" / "),
  };
}

/* --------------------------------- HubSpot ---------------------------------- */
// Forms API v3. The HubSpot form must contain fields with these internal names.
export const hubspotSink: LeadSink = {
  name: "hubspot",
  enabled: () => process.env.CRM_PROVIDER === "hubspot" && !!process.env.HUBSPOT_PORTAL_ID && !!process.env.HUBSPOT_FORM_GUID,
  async send(lead) {
    const { first, last } = splitName(lead.fullName);
    const token = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
    const path = token ? "secure/submit" : "submit";
    const fields: Record<string, string | undefined> = {
      firstname: first,
      lastname: last,
      email: lead.email,
      phone: lead.phoneE164,
      study_level: lead.studyLevel,
      applicant_role: lead.role,
      preferred_country: lead.country,
      intended_intake: lead.intake,
      service_interest: lead.service,
      message: lead.message,
      utm_source: lead.attribution.utm_source,
      utm_medium: lead.attribution.utm_medium,
      utm_campaign: lead.attribution.utm_campaign,
      lead_source_detail: lead.attribution.source,
    };
    const res = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/${path}/${process.env.HUBSPOT_PORTAL_ID}/${process.env.HUBSPOT_FORM_GUID}`,
      {
        method: "POST",
        headers: { "content-type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({
          submittedAt: Date.now(),
          fields: Object.entries(fields).filter(([, v]) => v).map(([name, value]) => ({ name, value })),
          context: { pageUri: lead.attribution.pagePath, pageName: "Consultation request" },
          legalConsentOptions: { consent: { consentToProcess: true, text: "I agree that Ethos Education may contact me about my enquiry." } },
        }),
        signal: AbortSignal.timeout(TIMEOUT_MS),
      },
    );
    if (!res.ok) throw new SinkError("hubspot", res.status);
  },
};

/* ---------------------------------- Zoho ------------------------------------ */
let zohoToken: { value: string; expiresAt: number } | null = null;

async function zohoAccessToken() {
  if (zohoToken && zohoToken.expiresAt > Date.now() + 60_000) return zohoToken.value;
  const dc = process.env.ZOHO_DC || "in";
  const params = new URLSearchParams({
    refresh_token: process.env.ZOHO_REFRESH_TOKEN!,
    client_id: process.env.ZOHO_CLIENT_ID!,
    client_secret: process.env.ZOHO_CLIENT_SECRET!,
    grant_type: "refresh_token",
  });
  const res = await fetch(`https://accounts.zoho.${dc}/oauth/v2/token`, { method: "POST", body: params, signal: AbortSignal.timeout(TIMEOUT_MS) });
  if (!res.ok) throw new SinkError("zoho-auth", res.status);
  const json = (await res.json()) as { access_token?: string; expires_in?: number };
  if (!json.access_token) throw new SinkError("zoho-auth", "no token");
  zohoToken = { value: json.access_token, expiresAt: Date.now() + (json.expires_in ?? 3600) * 1000 };
  return zohoToken.value;
}

export const zohoSink: LeadSink = {
  name: "zoho",
  enabled: () =>
    process.env.CRM_PROVIDER === "zoho" && !!process.env.ZOHO_CLIENT_ID && !!process.env.ZOHO_CLIENT_SECRET && !!process.env.ZOHO_REFRESH_TOKEN,
  async send(lead) {
    const dc = process.env.ZOHO_DC || "in";
    const { first, last } = splitName(lead.fullName);
    const description = Object.entries(describe(lead))
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");
    const res = await fetch(`https://www.zohoapis.${dc}/crm/v8/Leads`, {
      method: "POST",
      headers: { Authorization: `Zoho-oauthtoken ${await zohoAccessToken()}`, "content-type": "application/json" },
      body: JSON.stringify({
        data: [{ First_Name: first, Last_Name: last || first, Email: lead.email, Phone: lead.phoneE164, Lead_Source: "Website", Description: description }],
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) throw new SinkError("zoho", res.status);
  },
};

/* ------------------------------ Generic webhook ------------------------------ */
// For Zapier / Make / n8n / a custom backend. Signed with HMAC-SHA256 so the receiver can verify it.
export const webhookSink: LeadSink = {
  name: "webhook",
  enabled: () => process.env.CRM_PROVIDER === "webhook" && !!process.env.LEADS_WEBHOOK_URL?.startsWith("https://"),
  async send(lead) {
    const body = JSON.stringify({ type: "consultation_request", lead });
    const secret = process.env.LEADS_WEBHOOK_SECRET;
    const timestamp = String(Math.floor(Date.now() / 1000));
    const signature = secret ? createHmac("sha256", secret).update(`${timestamp}.${body}`).digest("hex") : undefined;
    const res = await fetch(process.env.LEADS_WEBHOOK_URL!, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-ethos-timestamp": timestamp,
        ...(signature ? { "x-ethos-signature": `sha256=${signature}` } : {}),
      },
      body,
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) throw new SinkError("webhook", res.status);
  },
};

/* ----------------------------- Email notification ----------------------------- */
const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export const resendSink: LeadSink = {
  name: "email",
  enabled: () => !!process.env.RESEND_API_KEY && !!process.env.LEADS_EMAIL_FROM && !!process.env.LEADS_EMAIL_TO,
  async send(lead) {
    const rows = { Name: lead.fullName, Email: lead.email, Phone: lead.phoneE164, ...describe(lead) };
    const html = `<h2 style="font-family:Georgia,serif">New consultation request</h2><table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">${Object.entries(
      rows,
    )
      .filter(([, v]) => v)
      .map(([k, v]) => `<tr><th align="left" style="border-bottom:1px solid #ddd">${escapeHtml(k)}</th><td style="border-bottom:1px solid #ddd">${escapeHtml(String(v)).replace(/\n/g, "<br>")}</td></tr>`)
      .join("")}</table>`;
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "content-type": "application/json" },
      body: JSON.stringify({
        from: process.env.LEADS_EMAIL_FROM,
        to: process.env.LEADS_EMAIL_TO!.split(",").map((s) => s.trim()).filter(Boolean),
        reply_to: lead.email,
        subject: `Consultation request — ${lead.fullName} (${labelFor(studyLevels, lead.studyLevel)})`,
        html,
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) throw new SinkError("email", res.status);
  },
};

/* ------------------------- Development fallback (local) ------------------------ */
// Only in `next dev`: appends leads to .leads/dev-leads.ndjson (git-ignored) so the form can be
// tested end-to-end without credentials. Never active in production builds.
export const devFileSink: LeadSink = {
  name: "dev-file",
  enabled: () => process.env.NODE_ENV === "development",
  async send(lead) {
    const { appendFile, mkdir } = await import("node:fs/promises");
    const path = await import("node:path");
    const dir = path.join(process.cwd(), ".leads");
    await mkdir(dir, { recursive: true });
    await appendFile(path.join(dir, "dev-leads.ndjson"), JSON.stringify(lead) + "\n", "utf8");
  },
};

export const allSinks: LeadSink[] = [hubspotSink, zohoSink, webhookSink, resendSink];
