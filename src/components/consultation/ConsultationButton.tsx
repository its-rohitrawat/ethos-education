import type { ReactNode } from "react";
import type { ServiceInterest } from "@/lib/leads/options";
import { ChevronIcon, pillBase } from "@/components/ui/primitives";

type Variant = "solid" | "dark" | "outline" | "light" | "ghost" | "text";

const styles: Record<Variant, string> = {
  solid: `${pillBase} bg-accent text-canvas hover:bg-[#a83a0b]`,
  dark: `${pillBase} bg-brand text-canvas hover:bg-brand-deep`,
  outline: `${pillBase} border border-brand text-brand hover:bg-brand hover:text-canvas`,
  light: `${pillBase} bg-canvas text-brand hover:bg-mist`,
  ghost: `${pillBase} border border-canvas/60 text-canvas hover:bg-canvas hover:text-brand`,
  text: "group/btn inline-flex items-center gap-1.5 font-display font-semibold text-accent-ink hover:underline hover:underline-offset-4",
};

/**
 * Primary conversion trigger. A real link to /book-consultation/ (works without JavaScript); with JS,
 * the ConsultationProvider's delegated click handler opens the consultation drawer instead and records
 * the CTA source and service. Renders plain HTML — no hydration cost per button.
 */
export function ConsultationButton({
  children,
  source,
  service,
  variant = "solid",
  arrow = false,
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
      <span>{children}</span>
      {arrow || variant === "text" ? <ChevronIcon className="transition-transform duration-200 group-hover/btn:translate-x-0.5" /> : null}
    </a>
  );
}
