import type { CSSProperties, ElementType, ReactNode } from "react";

/**
 * Staggered fade-and-rise for `[data-reveal]` descendants (or the element itself).
 *
 * - `hero`: pure CSS animation that starts at first paint (above-the-fold content; no LCP delay).
 * - default: armed by <MotionController /> with an IntersectionObserver + CSS transitions. Content is
 *   visible unless JavaScript confirms it is below the fold — no hidden content without JS.
 *
 * Server component: it adds no JavaScript to the page.
 */
export function Reveal({
  as: Tag = "div",
  children,
  className = "",
  stagger = 0.08,
  delay = 0,
  hero = false,
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  hero?: boolean;
  /** Kept for API compatibility with earlier versions. */
  y?: number;
  start?: string;
}) {
  if (hero) {
    return (
      <Tag className={`hero-stagger ${className}`} style={{ "--base": Math.round(delay * 1000) } as CSSProperties}>
        {children}
      </Tag>
    );
  }
  return (
    <Tag className={className} data-reveal-root="" data-stagger={stagger} data-delay={delay || undefined}>
      {children}
    </Tag>
  );
}
