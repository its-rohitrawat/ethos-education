import type { ReactNode } from "react";
import { ConsultationButton } from "@/components/consultation/ConsultationButton";
import { TrackedLink } from "@/components/layout/TrackedLink";
import { site, whatsappHref } from "@/content/site";
import type { ServiceInterest } from "@/lib/leads/options";

/** Closing call to action on inner pages: a navy band with one clear action and a phone number. */
export function FinalCTA({
  title = (
    <>
      Ready to plan your <em>next step?</em>
    </>
  ),
  subtitle = "Talk to an Ethos counsellor about your goals, your timeline and the universities you have in mind.",
  source,
  service,
}: {
  title?: ReactNode;
  subtitle?: string;
  source: string;
  service?: ServiceInterest;
  /** Kept for API compatibility. */
  label?: string;
}) {
  return (
    <section className="surface-dark" aria-labelledby={`cta-${source}`}>
      <div className="shell flex flex-col gap-8 py-12 lg:flex-row lg:items-center lg:justify-between lg:py-14">
        <div className="max-w-2xl">
          <h2 id={`cta-${source}`} className="t-display">
            {title}
          </h2>
          <p className="mt-3 text-canvas/80">{subtitle}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:shrink-0">
          <ConsultationButton source={source} service={service}>
            Book your consultation
          </ConsultationButton>
          <TrackedLink
            href={whatsappHref("Hello Ethos Education — I’d like to speak with a counsellor.")}
            event="whatsapp_click"
            source={`${source}-counsellor`}
            external
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-canvas/60 px-6 font-display text-[0.82rem] font-bold uppercase tracking-[0.08em] text-canvas transition-colors hover:bg-canvas hover:text-brand"
          >
            WhatsApp {site.phone.display}
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}
