import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { mentorRoles, processSteps } from "@/content/approach";
import { destinations as localDestinations } from "@/content/destinations";
import { exams as localExams } from "@/content/exams";
import { faqs as localFaqs } from "@/content/faqs";
import { articles as localArticles } from "@/content/journal";
import { programmes as localProgrammes } from "@/content/programmes";
import { offices as localOffices, stats as localStats } from "@/content/site";
import { outcomes as localOutcomes, videoStories as localStories } from "@/content/stories";
import type { JournalArticle } from "@/content/types";
import { visible } from "@/lib/verification";
import {
  mapArticle,
  mapFaq,
  mapOffice,
  mapOutcome,
  mapStat,
  mapVideoStory,
  mergeDestination,
  mergeExam,
  mergeProgramme,
} from "./mappers";
import { collectionId, fetchLiveItems, type CollectionKey, type WebflowItem } from "./webflow";

/**
 * Content accessors used by every page. When Webflow is configured (token + collection ID) the
 * published CMS items are used; otherwise — or if the API fails — the local content in
 * src/content is served, so the site always renders. All reads are cached for an hour and tagged
 * "cms" so the Webflow publish webhook (/api/revalidate) can refresh them on demand.
 */
async function fromCms<T>(key: CollectionKey, map: (item: WebflowItem) => T | null): Promise<T[] | null> {
  const id = collectionId(key);
  if (!id) return null;
  try {
    const items = await fetchLiveItems(id);
    return items.map(map).filter((x): x is T => x !== null);
  } catch (error) {
    console.error(`[cms] ${key} unavailable, serving local content:`, error instanceof Error ? error.message : "unknown error");
    return null;
  }
}

async function mergeBySlug<T extends { slug: string }>(key: CollectionKey, local: T[], merge: (base: T, item: WebflowItem) => T) {
  const id = collectionId(key);
  if (!id) return local;
  const items = await fromCms(key, (i) => i);
  if (!items) return local;
  const bySlug = new Map(items.map((i) => [i.fieldData.slug, i]));
  return local.map((base) => (bySlug.has(base.slug) ? merge(base, bySlug.get(base.slug)!) : base));
}

const byOrder = <T extends { order: number }>(a: T, b: T) => a.order - b.order;
const stripOrder = <T extends { order: number }>(item: T): Omit<T, "order"> => {
  const copy: Partial<T> = { ...item };
  delete copy.order;
  return copy as Omit<T, "order">;
};

/* ---------------------------------- Journal --------------------------------- */

export async function getArticles(): Promise<JournalArticle[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("cms", "cms:articles");
  const cms = await fromCms("ARTICLES", mapArticle);
  const list = cms && cms.length ? cms : localArticles;
  return [...list].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getArticle(slug: string) {
  const all = await getArticles();
  return all.find((a) => a.slug === slug) ?? null;
}

/* ------------------------------- Programmes etc. ----------------------------- */

export async function getProgrammes() {
  "use cache";
  cacheLife("hours");
  cacheTag("cms", "cms:programmes");
  return mergeBySlug("PROGRAMMES", localProgrammes, mergeProgramme);
}

export async function getProgramme(slug: string) {
  return (await getProgrammes()).find((p) => p.slug === slug) ?? null;
}

export async function getExams() {
  "use cache";
  cacheLife("hours");
  cacheTag("cms", "cms:exams");
  return mergeBySlug("EXAMS", localExams, mergeExam);
}

export async function getExam(slug: string) {
  return (await getExams()).find((e) => e.slug === slug) ?? null;
}

export async function getDestinations() {
  "use cache";
  cacheLife("hours");
  cacheTag("cms", "cms:destinations");
  return mergeBySlug("DESTINATIONS", localDestinations, mergeDestination);
}

export async function getDestination(slug: string) {
  return (await getDestinations()).find((d) => d.slug === slug) ?? null;
}

export const getMentorRoles = async () => mentorRoles;
export const getProcessSteps = async () => processSteps;

/* ------------------------------ Trust & proof -------------------------------- */

export async function getFaqs() {
  "use cache";
  cacheLife("hours");
  cacheTag("cms", "cms:faqs");
  const cms = await fromCms("FAQS", mapFaq);
  return cms && cms.length ? cms.sort(byOrder).map(stripOrder) : localFaqs;
}

/** Verified-only in production (see src/lib/verification.ts). */
export async function getVideoStories() {
  "use cache";
  cacheLife("hours");
  cacheTag("cms", "cms:stories");
  const cms = await fromCms("VIDEO_STORIES", mapVideoStory);
  return visible(cms && cms.length ? cms : localStories);
}

export async function getOutcomes() {
  "use cache";
  cacheLife("hours");
  cacheTag("cms", "cms:outcomes");
  const cms = await fromCms("OUTCOMES", mapOutcome);
  return visible(cms && cms.length ? cms.sort(byOrder).map(stripOrder) : localOutcomes);
}

export async function getStats() {
  "use cache";
  cacheLife("hours");
  cacheTag("cms", "cms:stats");
  const cms = await fromCms("STATS", mapStat);
  return visible(cms && cms.length ? cms.sort(byOrder).map(stripOrder) : localStats);
}

/** Offices are always listed by city; full street addresses only when verified. */
export async function getOffices() {
  "use cache";
  cacheLife("hours");
  cacheTag("cms", "cms:offices");
  const cms = await fromCms("OFFICES", mapOffice);
  return cms && cms.length ? cms.sort(byOrder).map(stripOrder) : localOffices;
}
