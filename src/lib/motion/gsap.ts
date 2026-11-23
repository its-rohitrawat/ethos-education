"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  gsap.defaults({ ease: "expo.out", duration: 1 });
}

/** Motion tokens — keep timing consistent across the site (mirrors --motion-* in globals.css). */
export const motion = {
  ease: "expo.out",
  easeInOut: "power3.inOut",
  fast: 0.5,
  base: 0.9,
  slow: 1.3,
  stagger: 0.08,
  rise: 32,
} as const;

export const MQ = {
  motionOK: "(prefers-reduced-motion: no-preference)",
  desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
  mobile: "(max-width: 1023px)",
} as const;

export { gsap, ScrollTrigger, useGSAP };
