# QA report — 21 Nov 2026

All checks below were run against a **production build** (`next build` + `next start`) unless stated otherwise.

## Build & code quality

| Check | Result |
|---|---|
| `next build` | ✅ 87 routes generated; all pages static or partially prerendered; only `/api/*` dynamic |
| `tsc --noEmit` | ✅ 0 errors |
| `eslint src` (Next + React hooks rules) | ✅ 0 problems |
| Secret scan of source | ✅ no credentials in code; all secrets read from server-side env vars; `.env.example` contains names only |

## Routes & SEO

| Check | Result |
|---|---|
| 34 static/dynamic pages + 10 exams + 5 destinations + 3 programmes + 6 Journal topics | ✅ all 200 |
| All 34 migrated articles at their original URLs | ✅ 34/34 return 200 |
| Unknown URLs (root, `/admission/x/`, `/study-abroad/x/`, `/blog/topic/x/`, deep paths) | ✅ real 404 with the designed 404 page |
| 60 injected casino-spam URLs | ✅ 410 Gone + `X-Robots-Tag: noindex` |
| Legacy URLs (`/usa/`, `/blogs/`, `/guaranteed-admission-program/`, `/category/*`, `/tag/*` …) | ✅ 308 to new homes (see MIGRATION-MAP.md — 118 legacy routes mapped, 0 unresolved) |
| `sitemap.xml` / `robots.txt` | ✅ 73 URLs; API disallowed |
| Metadata | ✅ unique title + description + canonical on every page; Open Graph + Twitter; existing Yoast titles reused |
| Structured data | ✅ Organization (+ LocalBusiness only for verified offices), Article, BreadcrumbList, FAQPage |
| Security headers | ✅ nosniff, Referrer-Policy, X-Frame-Options, Permissions-Policy, HSTS; `X-Powered-By` removed |

## Consultation form (lead flow)

| Check | Result |
|---|---|
| Empty submit → accessible error summary listing every problem | ✅ |
| Two-step flow → submit → success state with reference | ✅ (development, local-file destination) |
| Stored lead contains all fields + attribution source | ✅ |
| Attempt logged before delivery, no personal data in logs | ✅ |
| Production with no destination configured → honest failure (503) with phone number | ✅ never fakes success |
| Foreign origin 403 · missing consent 422 · bot-speed submission 422 · honeypot rejected · malformed 400 · 6th request in 10 min 429 | ✅ all |
| Drawer: opens from every CTA (plain links), focus moves inside, Escape closes, page behind inert | ✅ |
| No-JS fallback: every CTA is a real link to `/book-consultation/` | ✅ |

## Content integrity (verification gate)

Production build checked: **0** “Pending verification” badges; no unverified statistics (service facts shown instead); no testimonials, outcomes or full addresses until verified; no Ivy Mentors claims box. Development build shows all of them, badged. See CONTENT-VERIFICATION.md.

## Motion & accessibility

| Check | Result |
|---|---|
| Nothing visible on load is hidden by animation | ✅ (0 above-the-fold elements at opacity 0) |
| Below-the-fold reveals arm and play on scroll; SplitText splits lazily | ✅ (6/6 reveals, 22 lines split during scroll) |
| `prefers-reduced-motion: reduce` | ✅ nothing armed, nothing split, no parallax |
| Lighthouse accessibility | 96–100 (remaining 96 on articles: content-level issues in migrated posts) |
| Keyboard: skip link, visible focus, native `<dialog>` and `<details>` | ✅ |
| Colour contrast | ✅ fixed all flagged labels to ≥ 4.5:1 |
| Video captions | ⚠️ auto-generated, need human review |

## Responsive

An automated horizontal-overflow sweep covered **21 page templates at 360, 390, 768, 1024 and 1920 px (105 combinations)**. It found one overflow — the email address on `/contact/` at 768 px — which was fixed; the re-run shows **0 overflows**. Full-page screenshots were reviewed at 1440 px for every template and at 390 px for the homepage. Mobile states were also verified: hero fold (headline and CTA above the fold), full-screen menu, sticky consultation dock and drawer form.

## Performance (see KNOWN-LIMITATIONS.md for full detail)

- **CLS 0** on every page measured.
- **Lighthouse mobile (simulated):** 80–93 on the best valid runs. Best practices and SEO 100. Noisy on the test laptop (±15–20 points).
- **Real LCP** with 4× CPU and slow 4G applied: 1.6–1.8 s on text-led pages, 2.1–2.7 s on programme and about pages, 2.8–3.3 s on the homepage.

Optimisations applied during QA:
- Above-the-fold motion is pure CSS.
- Per-element hydration was removed (≈35 client components replaced by one controller and delegated handlers).
- GSAP is loaded on demand and is desktop-only for the signature sections.
- The form chunk loads when the drawer first opens.
- The LCP image uses `fetchPriority="high"`.
- The client payload is slimmed.
- Initial JavaScript fell from about 220 KB to 165–179 KB per page.

## Not verified (needs credentials or a deployment)

- Webflow CMS and its webhook
- HubSpot, Zoho, generic webhook and Resend
- Turnstile
- GA4
- Behaviour on the final host / CDN

See KNOWN-LIMITATIONS.md.
