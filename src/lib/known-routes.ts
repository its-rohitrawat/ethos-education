import { destinations } from "@/content/destinations";
import { exams } from "@/content/exams";
import articleSlugs from "@/content/journal/slugs.json";
import { journalTopics } from "@/content/journal/topics";
import { programmes } from "@/content/programmes";

/**
 * Lightweight allowlists used by src/proxy.ts to answer unknown URLs with a real HTTP 404 before the
 * response starts streaming (with Cache Components, a notFound() inside a page streams as 200 + noindex).
 * Keep this module small: it is bundled into the proxy.
 */
export const STATIC_TOP_LEVEL = new Set([
  "about",
  "admission",
  "ivy-mentors",
  "test-prep",
  "career-counselling",
  "study-abroad",
  "success-stories",
  "blog",
  "faq",
  "contact",
  "book-consultation",
  "privacy-policy",
  "term-and-conditions",
  "refund-policy",
  "opengraph-image",
  "apple-icon",
]);

export const ROOT_SLUGS = new Set<string>([...exams.map((e) => e.slug), ...(articleSlugs as string[])]);
export const PROGRAMME_SLUGS = new Set<string>(programmes.map((p) => p.slug));
export const DESTINATION_SLUGS = new Set<string>(destinations.map((d) => d.slug));
export const TOPIC_SLUGS = new Set<string>(journalTopics.map((t) => t.slug));

/** true when the path cannot match any page. */
export function isKnownMissing(pathname: string, { cmsArticles }: { cmsArticles: boolean }): boolean {
  const seg = pathname.split("/").filter(Boolean);
  if (seg.length === 1) {
    if (STATIC_TOP_LEVEL.has(seg[0]) || ROOT_SLUGS.has(seg[0])) return false;
    // With Webflow articles, new slugs may exist that were published after this build.
    return !cmsArticles;
  }
  if (seg[0] === "admission" && seg.length === 2) return !PROGRAMME_SLUGS.has(seg[1]);
  if (seg[0] === "study-abroad" && seg.length === 2) return !DESTINATION_SLUGS.has(seg[1]);
  if (seg[0] === "blog" && seg[1] === "topic" && seg.length === 3) return !TOPIC_SLUGS.has(seg[2]);
  return false;
}
