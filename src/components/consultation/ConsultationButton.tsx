import type { ReactNode } from "react";
import type { ServiceInterest } from "@/lib/leads/options";
import { ChevronIcon, RollText, pillBase } from "@/components/ui/primitives";

type Variant = "solid" | "outline" | "light" | "ghost" | "text";

const styles: Record<Variant, string> = {
  solid: `${pillBase} bg-ink text-canvas hover:bg-brand`,
  outline: `${pillBase} border border-ink/80 text-ink hover:bg-ink hover:text-canvas`,
  light: `${pillBase} bg-canvas text-ink hover:bg-butter`,
  ghost: `${pillBase} border border-canvas/45 text-canvas hover:bg-canvas hover:text-ink`,
  text: "group/btn inline-flex items-center gap-1.5 font-display font-semibold [font-variation-settings:'opsz'_24]",
};

/**
 * Primary conversion trigger. A real link to /book-consultation/ (works without JavaScript); with JS,
 * the ConsultationProvider's delegated click handler opens the consultation drawer instead and records
 * the CTA source and service. Renders plain HTML — no hydration cost per button.
 * Styled as the site's pill: bold serif label + chevron. (`arrow={false}` is accepted for compatibility.)
 */
export function ConsultationButton({
  children,
  source,
  service,
  variant = "solid",
  className = "",
}: {
  children: ReactNode;
  source: string;
  service?: ServiceInterest;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
}) {
  return (
    <a
      href={`/book-consultation/${service ? `?service=${service}` : ""}`}
      data-consult={source}
      data-service={service}
      data-label={typeof children === "string" ? children : undefined}
      className={`${styles[variant]} ${className}`}
    >
      <span className={variant === "text" ? "link-line" : ""}>{variant === "text" ? children : <RollText>{children}</RollText>}</span>
      <ChevronIcon className="transition-transform duration-300 group-hover/btn:translate-x-0.5" />
    </a>
  );
}
