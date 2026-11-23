import { NextResponse, type NextRequest } from "next/server";
import { isKnownMissing } from "@/lib/known-routes";
import { spamPaths } from "@/lib/spam-paths";

/**
 * Runs before routing:
 *  1. Casino-spam URLs injected into the old site → 410 Gone, so search engines de-index them quickly.
 *  2. URLs that cannot match any page → rewritten to an unmatched path so Next serves the site's
 *     not-found page with a real 404 status. (With Cache Components, notFound() inside a page would
 *     stream as 200 + noindex — see node_modules/next/dist/docs, "loading" → Status codes.)
 */
export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const normalised = path.endsWith("/") ? path : `${path}/`;

  if (spamPaths.has(normalised)) {
    return new NextResponse("Gone", { status: 410, headers: { "content-type": "text/plain; charset=utf-8", "x-robots-tag": "noindex" } });
  }

  if (isKnownMissing(normalised, { cmsArticles: Boolean(process.env.WEBFLOW_API_TOKEN && process.env.WEBFLOW_COLLECTION_ARTICLES) })) {
    return NextResponse.rewrite(new URL("/__not-found__/x/x/x/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Skip Next internals, API routes and static assets; only page-like paths are checked.
  matcher: ["/((?!_next/|api/|media/|journal/|brand/|.*\\.[a-zA-Z0-9]+$).*)"],
};
