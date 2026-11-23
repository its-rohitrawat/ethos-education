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
    <Link href="/" className={`group inline-flex items-center gap-2.5 ${onDark ? "text-canvas" : ""} ${className}`}>
      <EthosMark className="h-[1.6rem] w-auto transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:rotate-[-6deg]" />
      <span className="font-display text-[1.7rem] font-normal leading-none tracking-[-0.01em] [font-variation-settings:'opsz'_72]">
        Ethos
        <span className="sr-only"> Education — home</span>
      </span>
    </Link>
  );
}
