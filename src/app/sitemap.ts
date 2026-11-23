import type { MetadataRoute } from "next";
import { journalTopics } from "@/content/journal";
import { getArticles, getDestinations, getExams, getProgrammes } from "@/lib/cms";
import { absoluteUrl } from "@/lib/seo";

const staticRoutes = [
  "/",
  "/about/",
  "/admission/",
  "/ivy-mentors/",
  "/test-prep/",
  "/career-counselling/",
  "/study-abroad/",
  "/success-stories/",
  "/blog/",
  "/faq/",
  "/contact/",
  "/book-consultation/",
  "/privacy-policy/",
  "/term-and-conditions/",
  "/refund-policy/",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, exams, programmes, destinations] = await Promise.all([getArticles(), getExams(), getProgrammes(), getDestinations()]);
  return [
    ...staticRoutes.map((path) => ({ url: absoluteUrl(path), changeFrequency: "monthly" as const, priority: path === "/" ? 1 : 0.7 })),
    ...programmes.map((p) => ({ url: absoluteUrl(`/admission/${p.slug}/`), changeFrequency: "monthly" as const, priority: 0.8 })),
    ...exams.map((e) => ({ url: absoluteUrl(e.path), lastModified: e.lastReviewed, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...destinations.map((d) => ({ url: absoluteUrl(d.path), lastModified: d.lastReviewed, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...journalTopics.map((t) => ({ url: absoluteUrl(`/blog/topic/${t.slug}/`), changeFrequency: "weekly" as const, priority: 0.5 })),
    ...articles.map((a) => ({ url: absoluteUrl(a.path), lastModified: a.updatedAt || a.publishedAt, changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
