import "server-only";
import type {
  Destination,
  Exam,
  Faq,
  JournalArticle,
  JournalTopic,
  Office,
  Outcome,
  Programme,
  Stat,
  VideoStory,
} from "@/content/types";
import type { WebflowImage, WebflowItem } from "./webflow";

/**
 * Webflow fieldData → site content. Field slugs are documented in docs/CMS-MODEL.md.
 * Every mapper is defensive: a malformed item returns null and is skipped, never crashing a page.
 */
type FD = Record<string, unknown>;

const str = (fd: FD, key: string): string | undefined => {
  const v = fd[key];
  return typeof v === "string" && v.trim() ? v.trim() : undefined;
};
const num = (fd: FD, key: string): number | undefined => {
  const v = fd[key];
  return typeof v === "number" && Number.isFinite(v) ? v : undefined;
};
const bool = (fd: FD, key: string): boolean => fd[key] === true;
const lines = (fd: FD, key: string): string[] | undefined =>
  str(fd, key)
    ?.split(/\r?\n/)
    .map((l) => l.replace(/^[-•]\s*/, "").trim())
    .filter(Boolean);
const image = (fd: FD, key: string) => {
  const v = fd[key] as WebflowImage;
  return v && typeof v === "object" && typeof v.url === "string" ? { url: v.url, alt: v.alt ?? "" } : undefined;
};
const order = (fd: FD) => num(fd, "sort-order") ?? 0;

const TOPICS: JournalTopic[] = ["admissions", "scholarships-funding", "visas-careers", "destinations", "test-prep", "perspectives"];
const FAQ_CATEGORIES: Faq["category"][] = ["process", "programmes", "tests", "scholarships", "visas", "mentorship", "consultation"];

export function mapArticle(item: WebflowItem): JournalArticle | null {
  const fd = item.fieldData;
  const slug = fd.slug;
  const title = fd.name;
  if (!slug || !title) return null;
  const markdown = str(fd, "body-markdown");
  const html = str(fd, "body");
  if (!markdown && !html) return null;
  const topic = str(fd, "topic") as JournalTopic | undefined;
  const featured = image(fd, "featured-image");
  const text = (markdown ?? html ?? "").replace(/<[^>]+>/g, " ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return {
    slug,
    path: `/${slug}/`,
    title,
    publishedAt: str(fd, "published-date") ?? item.createdOn ?? new Date(0).toISOString(),
    updatedAt: item.lastPublished ?? item.lastUpdated ?? str(fd, "published-date") ?? "",
    author: str(fd, "author-name") ?? null,
    topic: topic && TOPICS.includes(topic) ? topic : "perspectives",
    excerpt: str(fd, "excerpt") ?? "",
    seo: { title: str(fd, "seo-title") ?? title, description: str(fd, "seo-description") ?? str(fd, "excerpt") ?? "" },
    featuredImage: featured ? { src: featured.url, alt: featured.alt, width: 1600, height: 1000 } : null,
    images: {},
    readingMinutes: num(fd, "reading-minutes") ?? Math.max(1, Math.round(words / 220)),
    wordCount: words,
    body: markdown ?? html ?? "",
    bodyFormat: markdown ? "markdown" : "html",
  };
}

export function mapFaq(item: WebflowItem): (Faq & { order: number }) | null {
  const fd = item.fieldData;
  const answer = str(fd, "answer");
  if (!fd.name || !answer) return null;
  const category = str(fd, "category") as Faq["category"] | undefined;
  return {
    id: fd.slug ?? item.id,
    question: fd.name,
    answer,
    category: category && FAQ_CATEGORIES.includes(category) ? category : "process",
    lastReviewed: str(fd, "last-reviewed"),
    order: order(fd),
  };
}

export function mapVideoStory(item: WebflowItem): VideoStory | null {
  const fd = item.fieldData;
  const src = str(fd, "video-url");
  const poster = image(fd, "poster");
  if (!fd.name || !src || !poster) return null;
  return {
    id: fd.slug ?? item.id,
    speaker: fd.name,
    relation: str(fd, "relation"),
    student: str(fd, "student") ?? fd.name,
    programme: str(fd, "programme") ?? "",
    university: str(fd, "university") ?? "",
    country: str(fd, "country") ?? "",
    video: { src, poster: poster.url, captions: str(fd, "captions-url"), durationSeconds: num(fd, "duration-seconds") ?? 0 },
    quote: str(fd, "quote"),
    quoteTimestamp: str(fd, "quote-timestamp"),
    verified: bool(fd, "verified"),
  };
}

export function mapOutcome(item: WebflowItem): (Outcome & { order: number }) | null {
  const fd = item.fieldData;
  const university = str(fd, "university");
  if (!fd.name || !university) return null;
  return { name: fd.name, university, destination: str(fd, "destination") ?? "", verified: bool(fd, "verified"), order: order(fd) };
}

export function mapStat(item: WebflowItem): (Stat & { order: number }) | null {
  const fd = item.fieldData;
  const value = num(fd, "value");
  if (!fd.name || value === undefined) return null;
  return {
    value,
    prefix: str(fd, "prefix"),
    suffix: str(fd, "suffix") ?? "",
    label: fd.name,
    definition: str(fd, "definition") ?? "",
    verified: bool(fd, "verified"),
    order: order(fd),
  };
}

export function mapOffice(item: WebflowItem): (Office & { order: number }) | null {
  const fd = item.fieldData;
  if (!fd.name) return null;
  return {
    city: fd.name,
    region: str(fd, "region") ?? "",
    role: str(fd, "role"),
    address: lines(fd, "address") ?? [],
    verified: bool(fd, "verified"),
    order: order(fd),
  };
}

/** Programmes, exams and destinations keep their structure locally; Webflow can override copy by slug. */
export function mergeProgramme(base: Programme, item: WebflowItem): Programme {
  const fd = item.fieldData;
  return {
    ...base,
    name: fd.name ?? base.name,
    kicker: str(fd, "kicker") ?? base.kicker,
    summary: str(fd, "summary") ?? base.summary,
    intro: lines(fd, "intro") ?? base.intro,
    forWhom: lines(fd, "for-whom") ?? base.forWhom,
    terms: base.terms
      ? { ...base.terms, text: str(fd, "terms") ?? base.terms.text, verified: bool(fd, "terms-verified") || base.terms.verified }
      : base.terms,
    seo: { title: str(fd, "seo-title") ?? base.seo.title, description: str(fd, "seo-description") ?? base.seo.description },
  };
}

export function mergeExam(base: Exam, item: WebflowItem): Exam {
  const fd = item.fieldData;
  return {
    ...base,
    tagline: str(fd, "tagline") ?? base.tagline,
    measures: str(fd, "measures") ?? base.measures,
    approach: str(fd, "approach") ?? base.approach,
    forWhom: lines(fd, "for-whom") ?? base.forWhom,
    ethosSupport: lines(fd, "ethos-support") ?? base.ethosSupport,
    officialUrl: str(fd, "official-url") ?? base.officialUrl,
    lastReviewed: str(fd, "last-reviewed") ?? base.lastReviewed,
    seo: { title: str(fd, "seo-title") ?? base.seo.title, description: str(fd, "seo-description") ?? base.seo.description },
  };
}

export function mergeDestination(base: Destination, item: WebflowItem): Destination {
  const fd = item.fieldData;
  return {
    ...base,
    tagline: str(fd, "tagline") ?? base.tagline,
    intro: str(fd, "intro") ?? base.intro,
    ethosFocus: lines(fd, "ethos-focus") ?? base.ethosFocus,
    lastReviewed: str(fd, "last-reviewed") ?? base.lastReviewed,
    seo: { title: str(fd, "seo-title") ?? base.seo.title, description: str(fd, "seo-description") ?? base.seo.description },
  };
}
