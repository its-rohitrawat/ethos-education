import Link from "next/link";

/**
 * The Ethos mark — traced from the supplied logo artwork (logo/WhatsApp Image … .jpeg).
 * Replace MARK_PATH with the designer's master vector when available.
 */
export const MARK_PATH =
  "M0 0C200 15 340 75 440 163C540 75 680 15 880 0L880 195C748.4 195 600 298.35 600 390L880 390L880 568L600 568C600 659.65 748.4 763 880 763L880 958C680 943 540 883 440 795C340 883 200 943 0 958L0 763C131.6 763 280 659.65 280 568L0 568L0 390L280 390C280 298.35 131.6 195 0 195Z";

export function EthosMark({ className = "", title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 880 958" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} fill="currentColor">
      {title ? <title>{title}</title> : null}
      <path d={MARK_PATH} />
    </svg>
  );
}

export function Logo({ className = "", onDark = false }: { className?: string; onDark?: boolean }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 ${onDark ? "text-canvas" : "text-brand"} ${className}`}>
      <EthosMark className="h-8 w-auto" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.45rem] font-bold tracking-[-0.02em]">Ethos</span>
        <span className={`mt-0.5 font-display text-[0.58rem] font-semibold uppercase tracking-[0.32em] ${onDark ? "text-canvas/75" : "text-accent-ink"}`}>Education</span>
        <span className="sr-only"> — home</span>
      </span>
    </Link>
  );
}
