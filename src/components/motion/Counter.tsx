"use client";

import { useEffect, useRef } from "react";

/**
 * Renders the final value in the HTML (correct without JavaScript; screen readers read the visually
 * hidden copy), then counts up once when scrolled into view — unless reduced motion is requested.
 * Uses requestAnimationFrame + IntersectionObserver only; no animation library.
 */
export function Counter({ value, prefix = "", suffix = "", className = "" }: { value: number; prefix?: string; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const format = (n: number) => `${prefix}${Math.round(n).toLocaleString("en-IN")}${suffix}`;
    if (el.getBoundingClientRect().top < window.innerHeight) return; // already visible: show final value
    el.textContent = format(0);
    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const duration = 1800;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          el.textContent = format(value * (1 - Math.pow(1 - t, 3)));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = format(value);
    };
  }, [value, prefix, suffix]);

  return (
    <span className={className}>
      <span ref={ref} aria-hidden="true">
        {`${prefix}${Math.round(value).toLocaleString("en-IN")}${suffix}`}
      </span>
      <span className="sr-only">{`${prefix}${Math.round(value).toLocaleString("en-IN")}${suffix}`}</span>
    </span>
  );
}
