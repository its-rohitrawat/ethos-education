import { site } from "@/content/site";
import { deliverLead, NoDeliveryConfiguredError } from "@/lib/leads/server/deliver";
import { claimSubmission, completeSubmission, rateLimit, releaseSubmission } from "@/lib/leads/server/rate-limit";
import { verifyTurnstile } from "@/lib/leads/server/turnstile";
import { leadSchema, toRecord } from "@/lib/leads/server/validate";

/**
 * POST /api/consultation — receives a consultation request from the site's form.
 * Responses never include internal error details; diagnostics go to server logs without personal data.
 */
const MAX_BODY_BYTES = 20_000;
const MIN_FILL_MS = 2500;

const json = (status: number, body: Record<string, unknown>, headers: Record<string, string> = {}) =>
  Response.json(body, { status, headers: { "cache-control": "no-store", ...headers } });

const GENERIC_FAILURE =
  "We couldn’t send your request just now. Please try again, or call or WhatsApp us on " + site.phone.display + ".";

function allowedOrigin(origin: string | null) {
  if (!origin) return process.env.NODE_ENV !== "production";
  const allowed = new Set([site.url, ...(process.env.ALLOWED_ORIGINS ?? "").split(",").map((s) => s.trim()).filter(Boolean)]);
  if (process.env.NODE_ENV !== "production") {
    try {
      const u = new URL(origin);
      if (u.hostname === "localhost" || u.hostname === "127.0.0.1") return true;
    } catch {
      return false;
    }
  }
  return allowed.has(origin.replace(/\/$/, ""));
}

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: Request) {
  if (!allowedOrigin(request.headers.get("origin"))) {
    return json(403, { ok: false, message: "This request isn’t allowed." });
  }
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json(415, { ok: false, message: "Unsupported request." });
  }
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_BODY_BYTES) return json(413, { ok: false, message: "Your message is too long." });

  const ip = clientIp(request);
  const limit = rateLimit(ip);
  if (!limit.ok) {
    return json(429, { ok: false, message: "You’ve sent several requests in a short time. Please try again in a few minutes." }, {
      "retry-after": String(limit.retryAfterSeconds),
    });
  }

  let raw: unknown;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) return json(413, { ok: false, message: "Your message is too long." });
    raw = JSON.parse(text);
  } catch {
    return json(400, { ok: false, message: "We couldn’t read your request. Please try again." });
  }

  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key] && ["fullName", "email", "phone", "phoneCountry", "studyLevel", "consent"].includes(key)) {
        fieldErrors[key] = issue.message;
      }
    }
    return json(422, { ok: false, message: "Please check the highlighted fields.", fieldErrors });
  }
  const lead = parsed.data;

  // Bot heuristics. A filled honeypot is rejected; an implausibly fast submission is asked to retry,
  // so a real person using autofill is never silently dropped.
  if (lead.website) return json(400, { ok: false, message: GENERIC_FAILURE });
  if (lead.elapsedMs < MIN_FILL_MS) {
    return json(422, { ok: false, message: "Please take a moment to review your details, then submit again." });
  }
  if (!(await verifyTurnstile(lead.turnstileToken, ip))) {
    return json(400, { ok: false, message: "Please complete the verification and try again." });
  }

  const claim = claimSubmission(lead.submissionId);
  if (claim.duplicate) {
    return claim.reference
      ? json(200, { ok: true, reference: claim.reference, duplicate: true })
      : json(409, { ok: false, message: "Your request is already being sent. Please wait a moment." });
  }

  const reference = lead.submissionId.slice(0, 8).toUpperCase();
  try {
    const result = await deliverLead(lead.submissionId, toRecord(lead));
    if (!result.delivered) {
      releaseSubmission(lead.submissionId);
      return json(502, { ok: false, message: GENERIC_FAILURE });
    }
    completeSubmission(lead.submissionId, reference);
    return json(200, { ok: true, reference });
  } catch (error) {
    releaseSubmission(lead.submissionId);
    if (error instanceof NoDeliveryConfiguredError) {
      console.error("[lead] no destination configured — set CRM_PROVIDER and/or RESEND_API_KEY");
      return json(503, { ok: false, message: GENERIC_FAILURE });
    }
    console.error(`[lead] unexpected failure id=${lead.submissionId}:`, error instanceof Error ? error.message : "unknown");
    return json(500, { ok: false, message: GENERIC_FAILURE });
  }
}
