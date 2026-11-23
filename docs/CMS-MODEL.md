# Webflow CMS content model

Next.js is the production frontend; **Webflow is the content-management layer**. The site reads published items from these collections through the Webflow Data API (`src/lib/cms/webflow.ts`) and maps them in `src/lib/cms/mappers.ts`. Field **slugs** below must match exactly. Every collection has Webflow’s built-in `name` and `slug`.

When a collection is not configured, the matching local content in `src/content/` is used instead.

## Mapped today (editable in Webflow)

### Blog Posts — `WEBFLOW_COLLECTION_ARTICLES`
| Field slug | Type | Notes |
|---|---|---|
| `name` | Plain text | Article title |
| `slug` | Slug | **Keep existing slugs** — URLs are `/{slug}/` |
| `published-date` | Date | |
| `topic` | Option/plain text | one of `admissions`, `scholarships-funding`, `destinations`, `visas-careers`, `test-prep`, `perspectives` |
| `excerpt` | Plain text | Standfirst shown on cards and under the title |
| `seo-title`, `seo-description` | Plain text | |
| `featured-image` | Image | Alt text is required in Webflow |
| `body-markdown` | Plain text (long) | Preferred — migrated articles are Markdown |
| `body` | Rich text | Alternative; HTML is sanitised before rendering |
| `author-name` | Plain text | Optional; leave empty to credit “Ethos Education” |
| `reading-minutes` | Number | Optional |

### FAQs — `WEBFLOW_COLLECTION_FAQS`
`name` (question), `answer` (plain text), `category` (`process` · `programmes` · `tests` · `scholarships` · `visas` · `mentorship` · `consultation`), `last-reviewed` (date, for time-sensitive answers), `sort-order` (number).

### Video Testimonials — `WEBFLOW_COLLECTION_VIDEO_STORIES`
`name` (speaker), `relation`, `student`, `programme`, `university`, `country`, `video-url` (link or file URL — use a video host/CDN), `poster` (image), `captions-url` (WebVTT file URL), `duration-seconds`, `quote` (verbatim from the video), `quote-timestamp`, **`verified` (switch — only `true` items appear in production)**.

### University Outcomes — `WEBFLOW_COLLECTION_OUTCOMES`
`name` (student), `university`, `destination`, `sort-order`, **`verified` (switch)**.

### Verified Statistics — `WEBFLOW_COLLECTION_STATS`
`name` (label), `value` (number), `prefix`, `suffix`, `definition` (how it is counted — shown under the number), `sort-order`, **`verified` (switch)**.

### Office Locations — `WEBFLOW_COLLECTION_OFFICES`
`name` (city), `region`, `role` (e.g. “Head office”), `address` (multi-line plain text, one line per row), `sort-order`, **`verified` (switch — street addresses only appear when true)**.

### Admissions Programmes — `WEBFLOW_COLLECTION_PROGRAMMES`
Item slug must be `dream-school`, `guaranteed-admissions` or `scholarship-program`. Overrides copy on top of the structured local data: `name`, `kicker`, `summary`, `intro` (one paragraph per line), `for-whom` (one per line), `terms`, `terms-verified` (switch), `seo-title`, `seo-description`.

### Test Preparation — `WEBFLOW_COLLECTION_EXAMS`
Item slug = exam slug (`sat`, `act`, `ap`, `gre`, `gmat`, `ielts`, `toefl-ibt`, `pte`, `det`, `esat`). Overrides: `tagline`, `measures`, `approach`, `for-whom` (lines), `ethos-support` (lines), `official-url`, `last-reviewed`, `seo-title`, `seo-description`.

### Study Destinations — `WEBFLOW_COLLECTION_DESTINATIONS`
Item slug = `usa`, `uk`, `canada`, `europe`, `singapore`. Overrides: `tagline`, `intro`, `ethos-focus` (lines), `last-reviewed`, `seo-title`, `seo-description`.

## Specified for the next phase (local content today)

| Collection | Suggested fields | Currently in |
|---|---|---|
| Authors | name, slug, role, bio, photo, credentials, verified | — (all posts were by “admin”) |
| Blog Categories | name, slug, description | `src/content/journal/index.ts` (topics) |
| Mentors | name, slug, role (one of the five), bio, photo, institution, verified | `src/content/approach.ts` (roles only) |
| Page SEO Metadata | page path, seo title, description, OG image | page files (`metadata` exports) |

## Editorial rules built into the model

- **Verification switches** gate every claim that could mislead (stats, testimonials, outcomes, addresses, programme terms). Nothing unverified appears in production.
- **`last-reviewed` dates** accompany time-sensitive content (tests, visas, destinations); pages show them.
- Rich text is sanitised (`rehype-sanitize`); scripts, iframes and event handlers in CMS content are stripped.
