import type { Verification } from "@/content/types";

/**
 * Content-integrity gate. Unverified claims (statistics, testimonials, outcomes, full addresses,
 * programme terms) are hidden unless NEXT_PUBLIC_SHOW_UNVERIFIED=true — which `.env.development`
 * sets so the design can be reviewed with realistic content. Production builds hide them until
 * each item is marked `verified: true` (locally or in Webflow).
 */
export const SHOW_UNVERIFIED = process.env.NEXT_PUBLIC_SHOW_UNVERIFIED === "true";

export const isVisible = (item: Verification) => item.verified || SHOW_UNVERIFIED;

export const visible = <T extends Verification>(items: T[]): T[] => items.filter(isVisible);
