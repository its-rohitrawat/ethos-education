import "server-only";

/**
 * Minimal Webflow Data API v2 client (read-only, published content only).
 * Token and collection IDs stay server-side; nothing here is bundled for the browser.
 *
 *   WEBFLOW_API_TOKEN               site token with the cms:read scope
 *   WEBFLOW_COLLECTION_<KEY>        collection ID per content type (see CollectionKey)
 */
const API = "https://api.webflow.com/v2";

export type CollectionKey =
  | "ARTICLES"
  | "FAQS"
  | "VIDEO_STORIES"
  | "OUTCOMES"
  | "STATS"
  | "OFFICES"
  | "PROGRAMMES"
  | "EXAMS"
  | "DESTINATIONS";

export type WebflowImage = { fileId?: string; url: string; alt?: string | null } | null | undefined;

export type WebflowItem = {
  id: string;
  isDraft?: boolean;
  isArchived?: boolean;
  lastPublished?: string | null;
  lastUpdated?: string;
  createdOn?: string;
  fieldData: Record<string, unknown> & { name?: string; slug?: string };
};

type ListResponse = { items: WebflowItem[]; pagination?: { limit: number; offset: number; total: number } };

export class WebflowError extends Error {
  constructor(public status: number) {
    super(`Webflow request failed with status ${status}`);
  }
}

export function collectionId(key: CollectionKey): string | null {
  if (!process.env.WEBFLOW_API_TOKEN) return null;
  return process.env[`WEBFLOW_COLLECTION_${key}`] || null;
}

/** All live (published) items in a collection, paginated, excluding drafts and archived items. */
export async function fetchLiveItems(id: string): Promise<WebflowItem[]> {
  const token = process.env.WEBFLOW_API_TOKEN;
  if (!token) throw new Error("WEBFLOW_API_TOKEN is not configured");
  const items: WebflowItem[] = [];
  const limit = 100;
  for (let offset = 0; offset < 10_000; offset += limit) {
    const res = await fetch(`${API}/collections/${encodeURIComponent(id)}/items/live?limit=${limit}&offset=${offset}`, {
      headers: { Authorization: `Bearer ${token}`, accept: "application/json" },
    });
    if (!res.ok) throw new WebflowError(res.status);
    const json = (await res.json()) as ListResponse;
    items.push(...json.items.filter((i) => !i.isDraft && !i.isArchived));
    const total = json.pagination?.total ?? items.length;
    if (offset + limit >= total || json.items.length === 0) break;
  }
  return items;
}
