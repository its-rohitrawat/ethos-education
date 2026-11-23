"use client";

/**
 * Analytics event hooks. Events are pushed to `window.dataLayer` (GA4 / GTM) ONLY after the visitor
 * grants analytics consent, and only when NEXT_PUBLIC_GA4_ID is configured. A DOM event
 * (`ethos:track`) is always dispatched so future A/B-testing tools can listen without sending data.
 */
export type EventName =
  | "cta_click"
  | "consultation_open"
  | "consultation_form_start"
  | "consultation_step_complete"
  | "consultation_submit"
  | "consultation_submit_error"
  | "whatsapp_click"
  | "phone_click"
  | "email_click"
  | "programme_view"
  | "exam_view"
  | "destination_view"
  | "journal_to_consultation"
  | "video_play"
  | "faq_open";

export type EventParams = Record<string, string | number | boolean | undefined>;

const CONSENT_KEY = "ethos-consent";
const ATTRIBUTION_KEY = "ethos-attribution";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const analyticsConfigured = () => Boolean(process.env.NEXT_PUBLIC_GA4_ID);

export function getConsent(): "granted" | "denied" | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(value: "granted" | "denied") {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* storage unavailable */
  }
  window.dispatchEvent(new CustomEvent("ethos:consent", { detail: value }));
}

export function track(name: EventName, params: EventParams = {}) {
  if (typeof window === "undefined") return;
  const detail = { event: name, ...params, page_path: window.location.pathname };
  window.dispatchEvent(new CustomEvent("ethos:track", { detail }));
  if (!analyticsConfigured() || getConsent() !== "granted") return;
  if (typeof window.gtag === "function") window.gtag("event", name, { ...params, page_path: detail.page_path });
}

/* ----------------------------- Lead attribution ------------------------------ */

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"] as const;

/** Stores first-touch campaign parameters for the session (not sent anywhere until a form is submitted). */
export function captureAttribution() {
  if (typeof window === "undefined") return;
  try {
    if (window.sessionStorage.getItem(ATTRIBUTION_KEY)) return;
    const params = new URLSearchParams(window.location.search);
    const data: Record<string, string> = { landingPage: window.location.pathname };
    for (const k of UTM_KEYS) {
      const v = params.get(k);
      if (v) data[k] = v.slice(0, 160);
    }
    if (document.referrer) {
      try {
        const ref = new URL(document.referrer);
        if (ref.origin !== window.location.origin) data.referrer = `${ref.origin}${ref.pathname}`.slice(0, 300);
      } catch {
        /* ignore malformed referrer */
      }
    }
    window.sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(data));
  } catch {
    /* storage unavailable */
  }
}

export function getAttribution(): Record<string, string> {
  try {
    return JSON.parse(window.sessionStorage.getItem(ATTRIBUTION_KEY) ?? "{}");
  } catch {
    return {};
  }
}
