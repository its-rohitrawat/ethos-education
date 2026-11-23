# Ethos Education — website

The redesigned **ethoseducation.world**: a warm, editorial-modern site (cream canvas, large Bricolage Grotesque headlines, pastel panels) for an admissions consultancy, built to turn ambitious students and their families into qualified consultation requests.

**Stack:** Next.js 16 (App Router, Cache Components, Partial Prefetching) · React 19 · TypeScript · Tailwind CSS 4 · GSAP 3.15 (ScrollTrigger, SplitText) · Webflow CMS (Data API v2) · zod.

```bash
npm install
npm run dev      # http://localhost:4000 — preview mode: unverified content is shown (NEXT_PUBLIC_VERIFY_BADGES=true marks it)
npm run build && npm run start
```

## What’s here

| Area | Where |
|---|---|
| Pages (all routes) | `src/app/` — see [docs/AUDIT-AND-DIRECTION.md](docs/AUDIT-AND-DIRECTION.md) for the sitemap |
| Content (local source of truth / CMS fallback) | `src/content/` — programmes, exams, destinations, FAQs, stories, legal, 34 migrated articles |
| CMS adapter (Webflow) | `src/lib/cms/` |
| Consultation lead pipeline | `src/app/api/consultation/route.ts`, `src/lib/leads/` |
| Design tokens & typography | `src/app/globals.css` — [docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md) |
| Motion | `src/components/motion/`, `src/lib/motion/gsap.ts` |
| SEO (metadata, JSON-LD, sitemap, redirects, 404/410) | `src/lib/seo.ts`, `src/app/sitemap.ts`, `next.config.ts`, `src/proxy.ts` |
| Content migration script | `scripts/migration/migrate_journal.py` |

## Documentation

1. [AUDIT-AND-DIRECTION.md](docs/AUDIT-AND-DIRECTION.md) — content inventory, reference analysis, art direction, information architecture
2. [DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md) — colour, typography, layout, patterns, imagery, motion, components
   - [PHOTO-CREDITS.md](docs/PHOTO-CREDITS.md) — provisional stock photography and its licence
3. [CMS-MODEL.md](docs/CMS-MODEL.md) — Webflow collections and field slugs
4. [MIGRATION-MAP.md](docs/MIGRATION-MAP.md) — every old URL → new URL, redirects, content and metadata status
5. [SETUP.md](docs/SETUP.md) — environment variables, integrations (HubSpot / Zoho / webhook / Resend / Turnstile / GA4), Webflow, deployment, go-live checklist
6. [CONTENT-VERIFICATION.md](docs/CONTENT-VERIFICATION.md) — every claim Ethos must confirm before launch
7. [QA-REPORT.md](docs/QA-REPORT.md) — what was tested and the results
8. [KNOWN-LIMITATIONS.md](docs/KNOWN-LIMITATIONS.md) — outstanding credentials, trade-offs, measured performance

## Principles built in

- **Content integrity:** unverified statistics, testimonials, outcomes, addresses and programme terms are hidden in production until marked verified (`src/lib/verification.ts`).
- **Secrets stay server-side:** CMS tokens, CRM keys and webhook secrets are read only in server code. `NEXT_PUBLIC_*` holds publishable values only.
- **Leads are never faked:** the form reports success only when a lead was actually stored or sent.
- **Motion never gates content:** everything is readable without JavaScript, and reduced-motion preferences are respected.
