import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { SplitTextHeading } from "@/components/motion/SplitTextHeading";

/* ---------------------------------- Icons ---------------------------------- */
export function ArrowIcon({ className = "", direction = "right" }: { className?: string; direction?: "right" | "up-right" | "down" }) {
  const rotate = direction === "up-right" ? "-rotate-45" : direction === "down" ? "rotate-90" : "";
  return (
    <svg viewBox="0 0 24 24" className={`h-[1em] w-[1em] ${rotate} ${className}`} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M4 12h15M13.5 6 19.5 12l-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-[0.85em] w-[0.85em] ${className}`} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d="m9 5 7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PlusIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-5 w-5 ${className}`} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 4v16M4 12h16" />
    </svg>
  );
}

export function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-[1.1em] w-[1.1em] shrink-0 ${className}`} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.25">
      <path d="m5 12.5 4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Bullet list with orange check marks (original site style). */
export function CheckList({ items, className = "", tone = "default" }: { items: readonly string[]; className?: string; tone?: "default" | "inverse" }) {
  return (
    <ul className={`space-y-2.5 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <CheckIcon className={`mt-[0.25em] ${tone === "inverse" ? "text-accent-soft" : "text-accent-bright"}`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Ordered steps: hairline rows with a light serif number. (`surface` kept for compatibility.) */
export function NumberedList({ items, className = "" }: { items: readonly string[]; className?: string; surface?: "bg-canvas" | "bg-mist" }) {
  return (
    <ol className={`border-b border-line ${className}`}>
      {items.map((item, i) => (
        <li key={item} className="flex items-start gap-4 border-t border-line py-4">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-[0.85rem] font-bold text-canvas">{i + 1}</span>
          <span className="pt-0.5">{item}</span>
        </li>
      ))}
    </ol>
  );
}

/* ------------------------------- Text roll --------------------------------- */
/**
 * Hover micro-interaction for short labels: the text rolls up and an identical copy rolls in from
 * below (CSS in globals.css, `.roll`). The copy is aria-hidden, so the accessible name is unchanged.
 * Non-string children are rendered as-is.
 */
export function RollText({ children }: { children: ReactNode }) {
  // The brochure layout has no hover text animation; kept as a pass-through for existing callers.
  return <>{children}</>;
}

/* --------------------------------- Labels ---------------------------------- */
/** Small eyebrow above a heading. (`index` is accepted for compatibility but not shown.) */
export function Label({ children, className = "", as: Tag = "p" }: { children: ReactNode; index?: string; className?: string; as?: "p" | "span" | "h2" | "h3" }) {
  const colour = /(^|\s)text-/.test(className) ? "" : "text-accent-ink";
  return <Tag className={`t-label ${colour} ${className}`}>{children}</Tag>;
}

/* --------------------------------- Buttons --------------------------------- */
type Variant = "solid" | "outline" | "light" | "ghost";

const variants: Record<Variant, string> = {
  solid: "bg-accent text-canvas hover:bg-[#a83a0b]",
  outline: "border border-brand text-brand hover:bg-brand hover:text-canvas",
  light: "bg-canvas text-brand hover:bg-mist",
  ghost: "border border-canvas/60 text-canvas hover:bg-canvas hover:text-brand",
};

/** Buttons in the original site's style: rectangular, bold uppercase label. */
export const pillBase =
  "group/btn inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-6 font-display text-[0.82rem] font-bold uppercase tracking-[0.08em] transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60";
const base = pillBase;

function ButtonInner({ children, arrow }: { children: ReactNode; arrow?: boolean }) {
  return (
    <>
      <span>{children}</span>
      {arrow ? <ChevronIcon className="transition-transform duration-200 group-hover/btn:translate-x-0.5" /> : null}
    </>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "solid",
  arrow = false,
  className = "",
  ...rest
}: { href: string; children: ReactNode; variant?: Variant; arrow?: boolean; className?: string } & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`} {...rest}>
      <ButtonInner arrow={arrow}>{children}</ButtonInner>
    </Link>
  );
}

export function Button({
  children,
  variant = "solid",
  arrow = false,
  className = "",
  ...rest
}: { children: ReactNode; variant?: Variant; arrow?: boolean; className?: string } & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      <ButtonInner arrow={arrow}>{children}</ButtonInner>
    </button>
  );
}

/** Text link: orange label with a chevron. */
export function ArrowLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={`group/al inline-flex items-center gap-1.5 font-display font-semibold text-accent-ink hover:underline hover:underline-offset-4 ${className}`}>
      <span>{children}</span>
      <ChevronIcon className="transition-transform duration-200 group-hover/al:translate-x-0.5" />
    </Link>
  );
}

export function SectionHeader({
  label,
  title,
  intro,
  className = "",
  align = "center",
}: {
  label?: string;
  index?: string;
  title: ReactNode;
  intro?: ReactNode;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <header className={`${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}>
      {label ? <Label className="mb-3">{label}</Label> : null}
      <SplitTextHeading className="t-display">{title}</SplitTextHeading>
      <span aria-hidden="true" className={`mt-4 block h-[3px] w-14 rounded-full bg-accent-bright ${align === "center" ? "mx-auto" : ""}`} />
      {intro ? <div className={`mt-5 text-ink-soft ${align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"}`}>{intro}</div> : null}
    </header>
  );
}

/**
 * Marks content Ethos still has to verify. Hidden unless NEXT_PUBLIC_VERIFY_BADGES=true, so previews
 * look like the real site; the full list lives in docs/CONTENT-VERIFICATION.md.
 */
export function PendingBadge({ note }: { note?: string }) {
  if (process.env.NEXT_PUBLIC_VERIFY_BADGES !== "true") return null;
  return (
    <span title={note} className="inline-flex items-center gap-1.5 rounded-full bg-[#fff4dc] px-2.5 py-1 text-xs font-medium text-ink">
      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
      Pending verification
    </span>
  );
}
