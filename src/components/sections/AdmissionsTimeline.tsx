"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ProcessStep } from "@/content/types";

/**
 * Six-stage roadmap. Desktop: a sticky frame cross-fades imagery and the large step number as each
 * chapter becomes active, with a scrubbed progress line. Mobile: vertical chapter cards, no pinning.
 */
export function AdmissionsTimeline({ steps }: { steps: ProcessStep[] }) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Desktop-only choreography; GSAP is imported on demand (never downloaded on mobile).
  useEffect(() => {
    const el = root.current;
    if (!el || !window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)").matches) return;
    let cancelled = false;
    let ctx: { revert: () => void } | undefined;
    import("@/lib/motion/gsap").then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        gsap.fromTo(
          el.querySelector("[data-progress]"),
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: { trigger: el.querySelector("[data-steps]"), start: "top 60%", end: "bottom 60%", scrub: true } },
        );
        el.querySelectorAll<HTMLElement>("[data-step]").forEach((item, i) => {
          ScrollTrigger.create({ trigger: item, start: "top 60%", end: "bottom 60%", onToggle: (self) => self.isActive && setActive(i) });
          gsap.from(item.querySelectorAll("[data-step-reveal]"), {
            autoAlpha: 0,
            y: 28,
            duration: 1,
            stagger: 0.08,
            ease: "expo.out",
            scrollTrigger: { trigger: item, start: "top 75%", once: true },
          });
        });
      }, el);
    });
    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <div ref={root} className="editorial-grid">
      {/* Sticky frame (desktop) */}
      <div className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-[calc(var(--header-h)+2rem)]">
          <div className="relative aspect-[4/5] overflow-hidden bg-night">
            {steps.map((s, i) => (
              <Image
                key={s.index}
                src={s.image.src}
                alt=""
                fill
                sizes="40vw"
                className={`archival object-cover transition-[opacity,transform] duration-[1.2s] ease-[var(--ease-editorial)] ${active === i ? "scale-100 opacity-100" : "scale-[1.06] opacity-0"}`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-night/75 via-night/10 to-transparent" aria-hidden="true" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-canvas" aria-hidden="true">
              <span className="t-numeral text-[9rem]">{steps[active].index}</span>
              <span className="t-label mb-4 text-right text-canvas/75">
                Stage {active + 1} of {steps.length}
              </span>
            </div>
          </div>
          <div className="mt-6 flex gap-1.5" aria-hidden="true">
            {steps.map((s, i) => (
              <span key={s.index} className={`h-[3px] flex-1 transition-colors duration-500 ${i <= active ? "bg-brand" : "bg-line-strong"}`} />
            ))}
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="relative col-span-4 lg:col-span-6 lg:col-start-7" data-steps>
        <span className="absolute left-0 top-0 hidden h-full w-px bg-line lg:block" aria-hidden="true" />
        <span data-progress className="absolute left-0 top-0 hidden h-full w-px origin-top bg-brand lg:block" aria-hidden="true" />
        <ol>
          {steps.map((s, i) => (
            <li key={s.index} data-step className="relative border-t border-line py-10 first:border-t-0 lg:min-h-[70vh] lg:border-t-0 lg:py-20 lg:pl-14">
              <span
                className={`absolute -left-[5px] top-[5.6rem] hidden h-[11px] w-[11px] rounded-full border transition-colors duration-500 lg:block ${i <= active ? "border-brand bg-brand" : "border-line-strong bg-canvas"}`}
                aria-hidden="true"
              />
              <div className="relative mb-6 aspect-[16/10] overflow-hidden lg:hidden">
                <Image src={s.image.src} alt="" fill sizes="92vw" className="archival object-cover" />
              </div>
              <p data-step-reveal className="t-label text-brand">
                Stage {s.index}
              </p>
              <h3 data-step-reveal className="t-title mt-4">
                {s.title}
              </h3>
              <p data-step-reveal className="t-lead mt-5 text-ink-soft">
                {s.summary}
              </p>
              <div data-step-reveal className="mt-8">
                <p className="t-label text-xs text-ink-soft">What you leave this stage with</p>
                <ul className="mt-3 divide-y divide-line border-y border-line">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex items-baseline gap-4 py-3 text-[0.98rem]">
                      <span className="h-px w-4 shrink-0 translate-y-[-0.3em] bg-brand" aria-hidden="true" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
