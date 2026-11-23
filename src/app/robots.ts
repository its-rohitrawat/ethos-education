import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

/** Production allows crawling; set NEXT_PUBLIC_NOINDEX=true on staging/preview deployments. */
export default function robots(): MetadataRoute.Robots {
  if (process.env.NEXT_PUBLIC_NOINDEX === "true") {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
