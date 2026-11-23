import "server-only";

/**
 * Sliding-window rate limiter and idempotency store.
 *
 * This in-memory implementation protects a single server instance. On serverless or multi-instance
 * hosting each instance keeps its own window, so production should swap in a shared store
 * (e.g. Redis/Upstash) behind the same two functions — see docs/INTEGRATIONS.md.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

export function rateLimit(key: string): { ok: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return { ok: false, retryAfterSeconds: Math.ceil((WINDOW_MS - (now - recent[0])) / 1000) };
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return { ok: true, retryAfterSeconds: 0 };
}

/** Remembers recently processed submission IDs so a double-click or retry cannot send a lead twice. */
const seen = new Map<string, { at: number; reference: string }>();
const SEEN_TTL_MS = 30 * 60 * 1000;

export function claimSubmission(id: string): { duplicate: boolean; reference?: string } {
  const now = Date.now();
  for (const [k, v] of seen) if (now - v.at > SEEN_TTL_MS) seen.delete(k);
  const existing = seen.get(id);
  if (existing) return { duplicate: true, reference: existing.reference };
  seen.set(id, { at: now, reference: "" });
  return { duplicate: false };
}

export function completeSubmission(id: string, reference: string) {
  seen.set(id, { at: Date.now(), reference });
}

export function releaseSubmission(id: string) {
  seen.delete(id);
}
