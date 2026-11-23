import Image from "next/image";
import type { ReactNode } from "react";
import { ConsultationButton } from "@/components/consultation/ConsultationButton";
import { TrackedLink } from "@/components/layout/TrackedLink";
import { SplitTextHeading } from "@/components/motion/SplitTextHeading";
import { ChevronIcon } from "@/components/ui/primitives";
import { whatsappHref } from "@/content/site";
import type { ServiceInterest } from "@/lib/leads/options";

/**
 * Closing call to action on every page: a full-bleed photograph with a lilac card over it — heading,
 * one line of support, the consultation pill, and a second photograph inside the card.
 */
export function FinalCTA({
  title = "Ready to talk?",
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
    <section className="relative isolate overflow-hidden py-[clamp(3rem,9vw,8rem)]" aria-labelledby={`cta-${source}`}>
      <Image
        src="/media/photos/library-hall.webp"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover"
        data-parallax-bg=""
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/25" />
      <div className="shell">
        <div className="panel-lilac mx-auto grid max-w-6xl gap-6 rounded-[var(--radius-card)] p-6 sm:p-8 lg:grid-cols-2 lg:gap-10 lg:p-10" data-reveal-root="">
          <div data-reveal className="flex flex-col">
            <SplitTextHeading id={`cta-${source}`} className="t-display">
              {title}
            </SplitTextHeading>
            <p className="mt-5 max-w-md text-ink/85">{subtitle}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 lg:mt-auto lg:pt-12">
              <ConsultationButton source={source} service={service}>
                Book a consultation
              </ConsultationButton>
              <TrackedLink
                href={whatsappHref("Hello Ethos Education — I’d like to speak with a counsellor.")}
                event="whatsapp_click"
                source={`${source}-counsellor`}
                external
                className="group inline-flex items-center gap-1.5 font-display font-semibold [font-variation-settings:'opsz'_24]"
              >
                <span className="link-line">Chat on WhatsApp</span>
                <ChevronIcon className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </TrackedLink>
            </div>
          </div>
          <div data-reveal className="relative aspect-[4/3] overflow-hidden rounded-xl bg-mist lg:aspect-auto lg:min-h-[22rem]">
            <Image src="/media/photos/students-laptop.webp" alt="Students working together at a laptop" fill sizes="(min-width: 1024px) 34vw, 90vw" className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
