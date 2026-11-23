"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { analyticsConfigured, captureAttribution, setConsent, track, type EventName } from "@/lib/analytics";
import { useConsent, useIsClient } from "@/lib/hooks";

const GA_ID = process.env.NEXT_PUBLIC_GA4_ID;

/**
 * Loads GA4 only after the visitor opts in. If NEXT_PUBLIC_GA4_ID is not configured, nothing is
 * loaded and no banner is shown. First-touch attribution is captured locally regardless; it only
 * leaves the browser when the visitor submits the consultation form.
 */
export function Analytics() {
  const pathname = usePathname();
  const consent = useConsent();
  const ready = useIsClient();

  useEffect(() => {
    captureAttribution();
    // Delegated tracking: <a data-track="whatsapp_click" data-track-source="footer"> and <details data-faq>.
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.<HTMLElement>("[data-track]");
      if (el) track(el.dataset.track as EventName, { source: el.dataset.trackSource });
    };
    const onToggle = (e: Event) => {
      const d = e.target;
      if (d instanceof HTMLDetailsElement && d.open && d.dataset.faq) track("faq_open", { faq: d.dataset.faq });
    };
    document.addEventListener("click", onClick);
    document.addEventListener("toggle", onToggle, true);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("toggle", onToggle, true);
    };
  }, []);

  useEffect(() => {
    if (consent === "granted" && typeof window.gtag === "function") window.gtag("event", "page_view", { page_path: pathname });
  }, [pathname, consent]);

  useEffect(() => {
    const exam = pathname.match(/^\/(sat|act|ap|gre|gmat|ielts|toefl-ibt|pte|det|esat)\/$/);
    if (exam) track("exam_view", { exam: exam[1] });
    const programme = pathname.match(/^\/admission\/([^/]+)\/$/);
    if (programme) track("programme_view", { programme: programme[1] });
    const destination = pathname.match(/^\/study-abroad\/([^/]+)\/$/);
    if (destination) track("destination_view", { destination: destination[1] });
  }, [pathname]);

  if (!analyticsConfigured() || !GA_ID) return null;

  return (
    <>
      {consent === "granted" ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config',${JSON.stringify(GA_ID)},{send_page_view:false,anonymize_ip:true});gtag('event','page_view',{page_path:location.pathname});`}
          </Script>
        </>
      ) : null}
      {ready && consent === null ? (
        <div role="region" aria-label="Cookie preferences" className="fixed inset-x-4 bottom-4 z-[60] max-w-md border border-line bg-mist p-5 text-ink shadow-[0_24px_60px_-30px_rgb(34_28_29/0.5)] sm:left-6 sm:right-auto">
          <p className="text-[0.95rem] leading-snug">
            We’d like to use analytics cookies to understand how people use this site. Nothing is collected unless you agree.
          </p>
          <div className="mt-4 flex gap-3">
            <button type="button" onClick={() => setConsent("granted")} className="min-h-11 rounded-full bg-ink px-5 text-[0.9rem] font-medium text-canvas">
              Accept analytics
            </button>
            <button type="button" onClick={() => setConsent("denied")} className="min-h-11 rounded-full border border-line-strong px-5 text-[0.9rem] font-medium">
              Decline
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
