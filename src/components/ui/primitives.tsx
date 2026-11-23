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

/** Plain list separated by hairlines — the default way to show bullet points across the site. */
export function CheckList({ items, className = "", tone = "default" }: { items: readonly string[]; className?: string; tone?: "default" | "inverse" }) {
  const line = tone === "inverse" ? "border-line-inverse" : "border-line";
  return (
    <ul className={`border-b ${line} ${className}`}>
      {items.map((item) => (
        <li key={item} className={`border-t ${line} py-3.5`}>
          {item}
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
        <li key={item} className="flex items-baseline gap-5 border-t border-line py-4">
          <span className="t-numeral w-8 shrink-0 text-[1.6em] text-ink-soft">{i + 1}</span>
          <span>{item}</span>
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
  if (typeof children !== "string") return <>{children}</>;
  return (
    <span className="roll">
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  );
}

/* --------------------------------- Labels ---------------------------------- */
/** Small eyebrow above a heading. (`index` is accepted for compatibility but not shown.) */
export function Label({ children, className = "", as: Tag = "p" }: { children: ReactNode; index?: string; className?: string; as?: "p" | "span" | "h2" | "h3" }) {
  const colour = /(^|\s)text-/.test(className) ? "" : "text-ink";
  return <Tag className={`t-label ${colour} ${className}`}>{children}</Tag>;
}

/* --------------------------------- Buttons --------------------------------- */
type Variant = "solid" | "outline" | "light" | "ghost";

const variants: Record<Variant, string> = {
  solid: "bg-ink text-canvas hover:bg-brand",
  outline: "border border-ink/80 text-ink hover:bg-ink hover:text-canvas",
  light: "bg-canvas text-ink hover:bg-butter",
  ghost: "border border-canvas/45 text-canvas hover:bg-canvas hover:text-ink",
};

/** Pill buttons: bold serif label + chevron, like "Inquire ›". */
export const pillBase =
  "group/btn inline-flex min-h-11 items-center justify-center gap-2 rounded-full pl-5 pr-4 font-display text-[clamp(0.95rem,0.85rem+0.3vw,1.1rem)] font-semibold [font-variation-settings:'opsz'_24] transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-60";
const base = pillBase;

/** Every pill carries a chevron (the `arrow` prop is kept for compatibility). */
function ButtonInner({ children }: { children: ReactNode; arrow?: boolean }) {
  return (
    <>
      <span>
        <RollText>{children}</RollText>
      </span>
      <ChevronIcon className="transition-transform duration-300 group-hover/btn:translate-x-0.5" />
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

/** Text link: bold serif label with an underline that draws in, plus a chevron. */
export function ArrowLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={`group/al inline-flex items-center gap-1.5 font-display font-semibold [font-variation-settings:'opsz'_24] ${className}`}>
      <span className="link-line">{children}</span>
      <ChevronIcon className="transition-transform duration-300 group-hover/al:translate-x-0.5" />
    </Link>
  );
}

export function SectionHeader({
  label,
  title,
  intro,
  className = "",
  align = "left",
}: {
  label?: string;
  index?: string;
  title: ReactNode;
  intro?: ReactNode;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <header className={`${align === "center" ? "mx-auto max-w-5xl text-center" : "max-w-5xl"} ${className}`}>
      {label ? <Label className="mb-5">{label}</Label> : null}
      <SplitTextHeading className="t-display">{title}</SplitTextHeading>
      {intro ? <div className={`mt-6 text-ink-soft ${align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"}`}>{intro}</div> : null}
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
    <span title={note} className="inline-flex items-center gap-1.5 rounded-full bg-butter px-2.5 py-1 text-xs font-medium text-ink">
      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
      Pending verification
    </span>
  );
}
