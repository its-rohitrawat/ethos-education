# Content verification checklist

The brief is explicit: **never fabricate statistics, ratings, guarantees, testimonials, affiliations or outcomes.** Everything below came from the current website or was written from it. Items marked *hidden* do not appear in production until verified; set `verified: true` locally (or the Webflow switch) once Ethos confirms them.

Preview any time with `npm run dev`. Development shows unverified items so the design can be reviewed with realistic content, but without badges, so the page looks as it will after launch. To see **which** items still need verification, set `NEXT_PUBLIC_VERIFY_BADGES=true` (in `.env.development.local`, which is git-ignored, or in `.env.development`) and restart the dev server. Each unverified item then shows an orange **Pending verification** badge.

## A. Hidden until verified

| # | Item | Where | What Ethos must confirm |
|---|---|---|---|
| A1 | “50+ years combined team experience” | `src/content/site.ts` → `stats` | Team roster and how years are counted |
| A2 | “3,000+ students guided” | same | Count, date range, which services count |
| A3 | “300+ universities” | same | Meaning. Old site said “Universities Represented”, which can imply partnerships — new label is “Universities in our students’ outcomes” |
| A4 | “99% visa success” | same | Numerator, denominator, period |
| A5 | Six video testimonials (Ansh Chawla, Nikita Singhal, Riya Malhotra, Sanjay Sinha, Lakshya Madaan, Munish Malhotra) | `src/content/stories.ts` | **Consent confirmed by Ethos (23 Nov 2026) — now shown in production.** Still worth a final check of spelling and programme details (from transcripts — see A7) |
| A6 | 30 named student outcomes (Harvard, Stanford, Cambridge…) | `src/content/stories.ts` → `outcomes` | Consent for each name; spellings; “HEC, Oxford” and “Boston School of Architecture” wording as listed on the old site |
| A7 | Pull quotes and programme details from the videos | `stories.ts` (`quote`, `quoteTimestamp`) | Quotes are verbatim from auto-transcripts — check each against the video at the stated timestamp |
| A8 | Full office addresses (Gurugram, Noida, Ranchi, Dublin CA) | `src/content/site.ts` → `offices` | Current addresses; cities are shown either way |
| A9 | Ivy Mentors claims: faculty from Harvard, MIT, Duke, Columbia, UPenn; “500+ Ivy League mentors”; named journal publications | `src/app/ivy-mentors/page.tsx` → `pendingClaims` (preview only) | Evidence for each; written permission to name institutions. Do not imply affiliation with any university |

## B. Shown, but must be confirmed before launch

| # | Item | Where | Note |
|---|---|---|---|
| B1 | Guaranteed Admissions Program — “what is and isn’t guaranteed” | `src/content/programmes.ts` → `terms` | Wording derived from the old site (“admission to leading partner universities… by fulfilling the set academic and language requirements”). Ethos must supply the **written terms and partner list**. Badge shows in preview |
| B2 | Scholarship Program description | `programmes.ts` | Old site said “Assured scholarship opportunities” — softened to guidance; confirm |
| B3 | 5:1 model role descriptions (University Expert, Profile Builder, Research Analyst, Editor, Counsellor) | `src/content/approach.ts` | Role *names* are from the old site; descriptions written from service copy |
| B4 | Six-stage process deliverables | `approach.ts` → `processSteps` | Derived from old homepage + ELITE page |
| B5 | Exam pages: official links and stable descriptions | `src/content/exams.ts` | Confirm `officialUrl` values (esp. ESAT → uat-uk.org) and each `lastReviewed` |
| B6 | Destination guides | `src/content/destinations.ts` | General structure only; confirm before launch and on each review date |
| B7 | FAQ answers marked “last reviewed” | `src/content/faqs.ts` | SAT test-optional policies, DET acceptance and IELTS ranges change yearly |
| B8 | Legal pages (privacy, terms, refund) | `src/content/legal/legal.json` | Migrated **verbatim**. Privacy policy should be updated to describe the new form, analytics consent and lead destinations |
| B9 | Social profile URLs | `src/content/site.ts` → `social` | Facebook link was simplified (removed a `viewas` parameter) |
| B10 | Counsellor name in captions (“Manik”) | `public/media/stories/*.vtt` | Auto-transcribed as Monique/Monica/Manick/Manik — confirm spelling; captions need a human review pass |

## C. Not used (claims found on the old site with no evidence)

- Google rating **5.0** and Trustpilot **4.0** (on the unfinished `/usa/` page)
- **NACAC / IECA membership** (on `/usa/`)
- “**1000+ families**” (homepage hero and `/usa/`, which also contained the placeholder “[confirm and update number]”)
- “**10× one-on-one counselling hours** compared to industry standards” and “**AI-powered research**” (homepage)
- “Our students have been admitted to **20+ universities**” (`/usa/` — contradicts the 300+ claim)

Add any of these only with evidence (e.g. a link to the live rating profile, a membership certificate).

## D. Imagery

| Item | Status |
|---|---|
| Photographs in `public/media/photos/` | **Provisional, licensed stock** (Unsplash License; photographers listed in [PHOTO-CREDITS.md](PHOTO-CREDITS.md)). Atmosphere only: they do not show Ethos students, staff or offices, and nothing on the site says they do. Replace with Ethos’s own photography where possible |
| Old editorial images in `public/media/editorial/` | From the first design direction. **No longer used**, and removal is awaiting approval |
| Testimonial posters `public/media/stories/*.webp` | Frames from Ethos’s own testimonial videos (real people) — consent per A5 |
| Article images `public/journal/` | Migrated from the old blog; many are AI-generated infographics. Review per article |
| Logo mark `src/components/brand/Logo.tsx` | **Traced** from the supplied JPEG. Replace `MARK_PATH` with the designer’s master vector |
