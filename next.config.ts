import type { NextConfig } from "next";

/**
 * Legacy WordPress URLs → new information architecture (permanent 308 redirects).
 * Full rationale per URL: docs/MIGRATION-MAP.md. Blog articles and the ten exam pages keep their
 * existing URLs, so they need no redirect.
 */
const legacyRedirects: [string, string][] = [
  ["/blogs", "/blog/"],
  ["/blogs/page/:n", "/blog/"],
  ["/guaranteed-admission-program", "/admission/guaranteed-admissions/"],
  ["/dream-school-application", "/admission/dream-school/"],
  ["/scholarship-program-2", "/admission/scholarship-program/"],
  ["/elite", "/admission/dream-school/"],
  ["/elite-preparation-ethos-education-expert-coaching", "/admission/dream-school/"],
  ["/usa", "/study-abroad/usa/"],
  ["/success-stories-clone", "/success-stories/"],
  ["/book-consultation-old", "/book-consultation/"],
  ["/home-01-one-page", "/"],
  ["/home-03", "/"],
  ["/review-data-draft", "/"],
  ["/ethos-landing-page", "/book-consultation/"],
  ["/best-scholarships-for-indian-students-in-2026", "/best-scholarships-for-indian-students-in-2026-the-complete-guide-to-studying-abroad-with-financial-aid/"],
  ["/category/:slug*", "/blog/"],
  ["/tag/:slug*", "/blog/"],
  ["/author/:slug*", "/blog/"],
];

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "cdn.prod.website-files.com" },
      { protocol: "https", hostname: "uploads-ssl.webflow.com" },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return legacyRedirects.flatMap(([source, destination]) => [
      { source, destination, permanent: true },
      { source: `${source}/`, destination, permanent: true },
    ]);
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
