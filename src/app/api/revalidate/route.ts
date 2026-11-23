import { createHmac, timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";

/**
 * POST /api/revalidate — Webflow "site publish" / "collection item" webhook.
 *
 * Verification: Webflow signs webhook requests with HMAC-SHA256 over `${timestamp}:${rawBody}` using
 * the webhook's signing secret, sending `x-webflow-timestamp` and `x-webflow-signature`. Confirm this
 * scheme against Webflow's current webhook documentation when configuring (docs/WEBFLOW.md).
 * Requests older than five minutes are rejected to prevent replay.
 */
const MAX_SKEW_MS = 5 * 60 * 1000;

function validSignature(body: string, timestamp: string | null, signature: string | null, secret: string) {
  if (!timestamp || !signature) return false;
  const ts = Number(timestamp);
  if (!Number.isFinite(ts) || Math.abs(Date.now() - ts) > MAX_SKEW_MS) return false;
  const expected = createHmac("sha256", secret).update(`${timestamp}:${body}`).digest("hex");
  const a = Buffer.from(expected, "hex");
  const b = Buffer.from(signature.replace(/^sha256=/, ""), "hex");
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  const secret = process.env.WEBFLOW_WEBHOOK_SECRET;
  if (!secret) return Response.json({ ok: false }, { status: 404 });

  const body = await request.text();
  if (body.length > 100_000) return Response.json({ ok: false }, { status: 413 });
  if (!validSignature(body, request.headers.get("x-webflow-timestamp"), request.headers.get("x-webflow-signature"), secret)) {
    return Response.json({ ok: false }, { status: 401 });
  }

  // Any publish refreshes all CMS-backed content; pages revalidate as they are next visited.
  revalidateTag("cms", "max");
  console.info("[cms] revalidated after Webflow webhook");
  return Response.json({ ok: true });
}
