"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * One client component drives all scroll motion on the page, so headings, reveals and images can stay
 * server-rendered (no per-element hydration). It scans the DOM after each navigation:
 *
 *   [data-type]         word-by-word masked headline reveal via CSS transitions (words are split on the
 *                       server by SplitTextHeading — no SplitText, no layout reads)
 *   [data-reveal-root]  fade-and-rise of [data-reveal] children via CSS transitions
 *   [data-clip]         clip-path image unveil via CSS transitions
 *   [data-parallax]     desktop-only GSAP scrub parallax (loaded on demand)
 *
 * Elements already on screen when the page loads are left untouched (no flash of hidden content).
 * With prefers-reduced-motion, nothing is armed at all.
 */
export function MotionController() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cleanups: (() => void)[] = [];
    let cancelled = false;
    const onScreen = (el: Element) => el.getBoundingClientRect().top < window.innerHeight;

    // Lazily loaded GSAP (shared promise).
    let gsapModule: Promise<typeof import("@/lib/motion/gsap")> | null = null;
    const loadGsap = () => (gsapModule ??= import("@/lib/motion/gsap"));

    /* ---------- CSS-transition reveals (cheap: IntersectionObserver only) ---------- */
    const reveal = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.classList.add(el.hasAttribute("data-type") ? "type-in" : el.hasAttribute("data-clip") ? "clip-in" : "reveal-in");
          reveal.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    cleanups.push(() => reveal.disconnect());

    // Defer the scan until after first paint so it never competes with LCP.
    const start = () => {
      if (cancelled) return;
      document.querySelectorAll<HTMLElement>("[data-reveal-root]:not([data-motion])").forEach((root) => {
        root.dataset.motion = "";
        if (onScreen(root)) return;
        const stagger = Number(root.dataset.stagger ?? 0.08);
        const delay = Number(root.dataset.delay ?? 0);
        const items = root.querySelectorAll<HTMLElement>("[data-reveal]");
        if (items.length) items.forEach((el, i) => (el.style.transitionDelay = `${delay + i * stagger}s`));
        else root.setAttribute("data-reveal-self", "");
        root.classList.add("reveal-armed");
        reveal.observe(root);
      });
      document.querySelectorAll<HTMLElement>("[data-clip]:not([data-motion])").forEach((frame) => {
        frame.dataset.motion = "";
        if (onScreen(frame)) return;
        frame.classList.add("clip-armed");
        reveal.observe(frame);
      });

      /* ---------- Word-split headlines ---------- */
      document.querySelectorAll<HTMLElement>("[data-type]:not([data-motion])").forEach((heading) => {
        heading.dataset.motion = "";
        if (onScreen(heading)) return;
        heading.classList.add("type-armed");
        reveal.observe(heading);
      });

      /* ---------- Desktop parallax ---------- */
      if (window.matchMedia("(min-width: 1024px)").matches) {
        const frames = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]:not([data-parallax-on])"));
        if (frames.length) {
          loadGsap().then(({ gsap }) => {
            if (cancelled) return;
            frames.forEach((frame) => {
              const img = frame.querySelector("img");
              const amount = Number(frame.dataset.parallax);
              if (!img || !amount || !frame.isConnected) return;
              frame.dataset.parallaxOn = "";
              const tween = gsap.fromTo(
                img,
                { yPercent: -amount },
                { yPercent: amount, ease: "none", scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true } },
              );
              cleanups.push(() => {
                tween.scrollTrigger?.kill();
                tween.kill();
                delete frame.dataset.parallaxOn;
              });
            });
          });
        }
      }
    };

    // Safari lacks requestIdleCallback; fall back to a short timeout.
    const hasIdle = typeof window.requestIdleCallback === "function";
    const handle = hasIdle ? window.requestIdleCallback(start, { timeout: 1200 }) : window.setTimeout(start, 200);
    cleanups.push(() => (hasIdle ? window.cancelIdleCallback(handle) : window.clearTimeout(handle)));

    return () => {
      cancelled = true;
      cleanups.forEach((fn) => fn());
    };
  }, [pathname]);

  return null;
}
