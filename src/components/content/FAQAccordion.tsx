import type { Faq } from "@/content/types";

/**
 * Accessible accordion built on native <details>/<summary> (keyboard and screen-reader support
 * without custom ARIA). Height animates in browsers that support `interpolate-size`. Opens are tracked
 * by the delegated `toggle` listener in <Analytics />. Server component — no hydration cost.
 */
export function FAQAccordion({ faqs, tone = "light" }: { faqs: Faq[]; tone?: "light" | "dark" }) {
  const line = tone === "dark" ? "border-line-inverse" : "border-line";
  return (
    <div className={`border-t ${line}`}>
      {faqs.map((f) => (
        <details key={f.id} data-faq={f.id} className={`accordion group border-b ${line}`}>
          <summary className="flex items-center justify-between gap-6 py-5 lg:py-6">
            <span className="text-[1.0625rem] font-semibold leading-snug tracking-[-0.015em] lg:text-[1.15rem]">{f.question}</span>
            <span className="accordion-icon inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mist text-ink" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14" strokeLinecap="round" />
              </svg>
            </span>
          </summary>
          <div className="pb-6 pr-12">
            <p className={`t-body max-w-3xl ${tone === "dark" ? "text-canvas/80" : "text-ink-soft"}`}>{f.answer}</p>
            {f.lastReviewed ? (
              <p className="mt-3 text-xs text-ink-soft">
                Last reviewed {new Date(f.lastReviewed).toLocaleDateString("en-GB", { month: "long", year: "numeric" })}. Requirements change — always confirm with each university.
              </p>
            ) : null}
          </div>
        </details>
      ))}
    </div>
  );
}
