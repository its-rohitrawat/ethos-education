"use client";

import { useEffect, useState } from "react";
import { site, whatsappHref } from "@/content/site";
import { ConsultationButton } from "@/components/consultation/ConsultationButton";
import { useConsultation } from "@/components/consultation/ConsultationProvider";
import { track } from "@/lib/analytics";

function WhatsAppGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.98L2 22l5.17-1.5A9.93 9.93 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.07.89.9-2.99-.2-.31a8.2 8.2 0 1 1 6.85 3.74Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06a6.7 6.7 0 0 1-3.32-2.9c-.25-.43.25-.4.71-1.33.08-.16.04-.3-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.41-.56-.42h-.48a.92.92 0 0 0-.67.31 2.8 2.8 0 0 0-.87 2.08 4.86 4.86 0 0 0 1.02 2.58 11.1 11.1 0 0 0 4.25 3.76c1.58.68 2.2.74 2.99.62.48-.07 1.46-.6 1.67-1.18.2-.58.2-1.08.14-1.18-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  );
}

/**
 * Persistent but quiet conversion access: a sticky bar on mobile (consultation, WhatsApp, call) and a
 * small WhatsApp button on desktop. Hidden while the consultation drawer is open and near the footer.
 */
export function ContactDock() {
  const { isOpen } = useConsultation();
  const [nearEnd, setNearEnd] = useState(false);
  const [past, setPast] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("footer");
    const io = footer
      ? new IntersectionObserver(([entry]) => setNearEnd(entry.isIntersecting), { rootMargin: "0px 0px -10% 0px" })
      : null;
    if (footer && io) io.observe(footer);
    const onScroll = () => setPast(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io?.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const showBar = past && !nearEnd && !isOpen;

  return (
    <>
      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-canvas px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 transition-transform duration-500 ease-[var(--ease-editorial)] lg:hidden ${
          showBar ? "translate-y-0" : "translate-y-full"
        }`}
        aria-hidden={!showBar}
        inert={!showBar}
      >
        <div className="flex items-center gap-2">
          <ConsultationButton source="sticky-mobile" arrow={false} className="flex-1 !min-h-12">
            Book a consultation
          </ConsultationButton>
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_click", { source: "sticky-mobile" })}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-ink/40"
            aria-label="Chat with Ethos Education on WhatsApp"
          >
            <WhatsAppGlyph className="h-5 w-5" />
          </a>
          <a
            href={`tel:${site.phone.e164}`}
            onClick={() => track("phone_click", { source: "sticky-mobile" })}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-ink/40"
            aria-label={`Call Ethos Education on ${site.phone.display}`}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
            </svg>
          </a>
        </div>
      </div>

      <a
        href={whatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("whatsapp_click", { source: "floating-desktop" })}
        className={`group fixed bottom-6 right-6 z-40 hidden items-center gap-3 rounded-full bg-ink py-2.5 pl-2.5 pr-5 font-display text-[0.95rem] font-semibold text-canvas [font-variation-settings:'opsz'_24] shadow-[0_18px_40px_-20px_rgb(26_26_26/0.7)] transition-[transform,opacity] duration-500 ease-[var(--ease-editorial)] lg:inline-flex ${
          past && !nearEnd && !isOpen ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
        aria-label="Chat with Ethos Education on WhatsApp"
        tabIndex={past && !nearEnd && !isOpen ? 0 : -1}
      >
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-canvas/10">
          <WhatsAppGlyph className="h-4 w-4" />
        </span>
        <span aria-hidden="true">Questions? WhatsApp us</span>
      </a>
    </>
  );
}
