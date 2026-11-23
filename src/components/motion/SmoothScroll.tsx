"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import type Lenis from "lenis";

/**
 * Inertial smooth scrolling (Lenis) for mouse-wheel / trackpad on desktop. Touch devices keep native
 * scrolling, and so do people who prefer reduced motion. Lenis drives the real window scroll position,
 * so CSS scroll-driven animations, IntersectionObservers and GSAP ScrollTrigger keep working unchanged.
 * Anything inside a <dialog> (menu, consultation drawer) scrolls natively.
 */
export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    import("lenis").then(({ default: LenisCtor }) => {
      if (cancelled) return;
      const lenis = new LenisCtor({
        autoRaf: true,
        lerp: 0.1,
        wheelMultiplier: 1,
        anchors: { offset: -96 },
        prevent: (node: HTMLElement) => Boolean(node.closest("dialog, [data-lenis-prevent]")),
      });
      lenisRef.current = lenis;
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    });
    return () => {
      cancelled = true;
      lenisRef.current?.destroy();
      lenisRef.current = null;
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  // New page: jump to the top immediately (Next.js restores scroll natively; keep Lenis in sync).
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (!window.location.hash) lenis.scrollTo(0, { immediate: true, force: true });
    lenis.resize();
  }, [pathname]);

  return null;
}
