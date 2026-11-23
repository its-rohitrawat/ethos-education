"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Horizontal card rail: native scroll-snap (touch, trackpad and keyboard all work), plus previous /
 * next buttons that scroll by roughly one view. Buttons disable themselves at either end.
 */
export function Carousel({ children, className = "", label }: { children: ReactNode; className?: string; label: string }) {
  const rail = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const update = () => setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const go = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: smooth ? "smooth" : "auto" });
  };

  const btn =
    "inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/70 transition-colors duration-300 hover:bg-ink hover:text-canvas disabled:pointer-events-none disabled:opacity-30";

  return (
    <div className={className}>
      <div
        ref={rail}
        role="region"
        aria-label={label}
        tabIndex={0}
        data-lenis-prevent-horizontal=""
        className="-mx-[var(--gutter)] flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-[var(--gutter)] px-[var(--gutter)] pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
      <div className="mt-8 flex gap-2">
        <button type="button" className={btn} onClick={() => go(-1)} disabled={edge.start} aria-label="Previous">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M19 12H5m6-6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button type="button" className={btn} onClick={() => go(1)} disabled={edge.end} aria-label="Next">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
