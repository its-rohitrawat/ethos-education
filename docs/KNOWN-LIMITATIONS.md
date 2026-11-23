# Known limitations & outstanding items

Honest status as of 21 Nov 2026. Nothing below is presented as complete when it is not.

## Requires credentials or decisions from Ethos

| Item | Status |
|---|---|
| Webflow CMS | Adapter implemented and type-checked; **not tested against a real Webflow site** (no token available). Site runs on local content until configured. |
| Webflow webhook signature | Implemented as HMAC-SHA256 of `timestamp:body`; **confirm against Webflow’s current docs** when creating the webhook. |
| HubSpot / Zoho / webhook / Resend | Implemented; **none tested against live accounts**. The development fallback (local file) was tested end to end. |
| Cloudflare Turnstile | Implemented as optional; not tested with real keys. |
| GA4 | Loader + consent banner implemented; not tested with a real property. |
| Programme terms, statistics, testimonials, outcomes, addresses | Hidden or flagged until verified — see CONTENT-VERIFICATION.md. |
| Photography | Provisional; commissioned photography needed. |
| Logo | Vector traced from a JPEG; master vector needed. |

## Technical trade-offs (deliberate)

- **Rate limiting is in-memory** (per server instance). Fine for a single instance; use a shared store (Upstash/Redis) on serverless or multi-instance hosting.
- **Real 404s come from the proxy.** With Cache Components, a `notFound()` inside a page streams with HTTP 200 (+ `noindex`). `src/proxy.ts` therefore checks slugs against small allowlists (`src/lib/known-routes.ts`) *before* streaming starts and serves the 404 page with a real 404 status. Once Webflow articles are connected, unknown root-level slugs are let through (so articles published after a build still work) and fall back to the 200 + `noindex` behaviour. The dynamic routes also show a dev-only “instant navigation” insight; it does not affect production.
- **GSAP is loaded on demand** (dynamic `import()` with `gsap.context()` cleanup) rather than through `useGSAP`’s static import, so pages don’t pay for it at load and mobile never downloads the desktop-only choreography. `@gsap/react` remains installed for future components.
- **Experimental `inlineCss`** was evaluated and reverted (inconclusive on the test machine; experimental flag). Re-evaluate with real-user data after launch.
- **Captions are machine-generated** (faster-whisper) with a light correction pass; they need a human review (WCAG requires accurate captions).
- Video files are served from `public/media/stories/` (≈6–9 MB each after compression). For launch, consider a video host/CDN (Mux, Vimeo, Cloudflare Stream) and point the CMS `video-url` there.
- The scaffold left default files (`src/app/favicon.ico` with the Next.js logo, and `public/{file,globe,next,vercel,window}.svg`). They are unused except `favicon.ico`, which competes with `icon.svg`. **Delete them** (not done automatically — deletions need approval).
- `src/components/content/PageShell.tsx` is an unused Suspense fallback kept for future streamed routes.
- `public/brand/ethos-mark.png` (structured-data logo) is rendered from the traced SVG — regenerate it from the master vector.

## Performance — measured, not guaranteed

> **Re-measure.** The figures below were taken on the first (editorial) design. The Apple-style redesign uses a single font family, shorter pages (the homepage dropped from ~24,700px to ~9,300px tall at 1440px) and new hero photography, so they need re-running on a production build.

Measured on a busy development laptop (11th-gen i7, ~34% background CPU), production build served locally:

**Lighthouse 13 mobile (simulated throttling)** — best valid runs: Home 80 · Programme 83 · SAT 93 · Booking 87 · Journal index 86 · Article 80. Accessibility 96–100 · Best practices 100 · SEO 100 · **CLS 0 on every page**. Runs varied by ±15–20 points between identical builds because simulated throttling scales this machine’s background load.

**Applied throttling (4× CPU, 150 ms / 1.6 Mbps), Chrome’s own LCP API:** text-led pages 1.6–1.8 s · programme & about pages 2.1–2.7 s · article 2.9–3.7 s · home 2.8–3.3 s.

The 90+ mobile target is met on text-led pages but **not yet on the image-led pages and the homepage**. Next steps, in order of impact:
1. Measure on the real host (CDN, Brotli, HTTP/3) with PageSpeed Insights / CrUX before optimising further.
2. Replace provisional hero images with properly art-directed, mobile-specific crops (smaller LCP image).
3. ~~Shorten the homepage~~: done in the redesign (nine sections). Re-check HTML weight.
4. Re-evaluate `inlineCss` with field data.

## Fonts

The current theme uses **Bricolage Grotesque**, **DM Sans**, **Dancing Script** and **Fraunces**, all under the SIL Open Font License, so web use is allowed and there is no licence to buy. They are self-hosted from `src/app/fonts/`.
- The reference site's own fonts (Season Mix / Season Sans) are commercial and are not used.
- **HK Grotesk Wide** (Hanken Basic License, which does *not* cover web use) is no longer loaded. Its WOFF2 files remain in `src/app/fonts/`, unused and not bundled.
- If it is ever brought back, a web-font licence from Hanken Design Co. is needed first.

## Unused since the redesign (removal awaiting approval)

Nothing below is referenced by any page. It is kept only because deleting files needs explicit sign-off:

- `src/components/sections/MentorExperience.tsx`, `src/components/sections/AdmissionsTimeline.tsx`, `src/components/content/PageShell.tsx`
- `public/media/editorial/` (images from the first design direction)
- Poster images in `public/media/stories/` without the `-portrait` suffix (replaced by the `-portrait.webp` versions)
- Create-next-app leftovers: `public/{file,globe,next,vercel,window}.svg`

**Wrong favicon (fix awaiting approval):** `src/app/favicon.ico` is still the create-next-app “N” icon, and Next.js serves it at `/favicon.ico`, which search engines and some browsers use. `src/app/icon.svg` (the Ethos mark) is correct. A replacement `favicon.ico` built from `icon.svg` is ready; replacing the file needs sign-off.

## Not built (out of scope for this pass, specified for later)

- Individual success-story pages — no substantive written stories exist yet (brief: only where verified content exists).
- Career-interest quiz — optional in the brief; must not be presented as a psychometric assessment.
- Calendar booking — needs an approved scheduling provider.
- Authors and Mentors collections (see CMS-MODEL.md).
