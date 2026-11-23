# Design system

**Direction: a professional brochure site that follows the layout of the original ethoseducation.world** (client decision, 23 Nov 2026).
- White and light-grey sections, the navy of the Ethos logo, and an orange accent (the logo's ember) for buttons and highlighted words.
- **Four elements from the previous design were brought back at the client's request:**
  - the 3D "Worldwide" scene
  - the programme podium cards
  - the logo-gradient footer
  - subtle reveal motion
- The homepage banner is a slider.

**Earlier directions** (all recoverable):
- The quakerschool.org-style theme is on git `main` at commit `2801d24`.
- The Apple-style theme is in `../_theme-snapshots/2026-11-23-apple-minimal-hkwide/`.

Tokens live in `src/app/globals.css` (`@theme`).

## Colour

| Token | Hex | Use |
|---|---|---|
| `canvas` | `#FFFFFF` | Page background, cards |
| `mist` | `#F4F6F9` | Alternate sections, soft cards |
| `cloud` | `#E8ECF1` | Hover states, inactive progress |
| `ink` / `ink-soft` | `#1B2333` / `#586273` | Text / secondary text |
| `brand` | `#0B2A5B` | Navy: banners, FAQ band, closing CTA, story cards, featured podium caption, dark buttons |
| `accent` | `#C2410C` | Orange buttons (white text ≥ 4.5:1) and highlighted words on white |
| `accent-bright` | `#EA7317` | Rules, icons, check marks, highlights in large headings |
| `accent-soft` | `#FDBA74` | Highlights and labels on navy |
| `accent-ink` | `#B4410D` | Small orange text on white (eyebrows, links) |
| `line` | `#E2E7EE` | Borders and dividers |

The footer uses `.footer-dawn`, the logo gradient (midnight navy → crimson → ember → amber). Its text stays on the dark side of the gradient.

## Typography

All faces are SIL OFL, self-hosted from `src/app/fonts/` with `next/font/local`.

| Role | Family | Utility |
|---|---|---|
| Hero and page titles | Bricolage Grotesque 700 | `t-hero`: `clamp(2.1rem → 3.75rem)` |
| Section headings | Bricolage Grotesque 700 | `t-display`: `clamp(1.7rem → 2.6rem)` |
| Titles / small headings | Bricolage Grotesque 650–700 | `t-title`, `t-subtitle` |
| Eyebrows | Bricolage Grotesque 700, uppercase, tracked, orange | `t-label` / `Label` |
| Buttons and nav | Bricolage Grotesque 600–700, uppercase | `pillBase`, header |
| **Card titles** | Fraunces 600, `SOFT` 50, `opsz` 48 | `t-card`: `clamp(1.2rem → 1.45rem)` |
| "Worldwide" scene word | Fraunces italic | `.scene-word` |
| Paragraphs | DM Sans 400 | body: 16–17px, line-height 1.7 |

**Card titles:**
- Card titles use **Fraunces**, which replaced Dancing Script on 23 Nov 2026 at the client's request.
- Fraunces is a soft, warm serif. It reads well at card sizes, contrasts with Bricolage headings without fighting them, and is the same family as the Worldwide word.
- Tight cards override the size with `!text-[…]`, for example story names at 1.1rem and destination cards at 1.22rem on desktop.
- `DancingScript-Variable.woff2` is no longer loaded.

**Headings:**
- Wrap one or two words of a heading in `<em>` to colour them orange, as on the original site ("*Ivy League Mentors* Turn Ambition…").
- Headings get a short orange rule underneath (`SectionHeader`, page banners).

## Layout patterns (from the original site)

- **Header:** sticky white bar with the logo, uppercase menu with dropdowns (Admissions, Test Prep, Study Abroad, About) and an orange "Book consultation" button. Below 1280px the menu opens a full-screen list with accordion groups.
- **Page banner** (`PageHero`): the page photograph under a navy gradient, with breadcrumbs, an eyebrow, the title, an orange rule, the intro and buttons. An optional facts card sits on the right.
- **Sections:** centred `SectionHeader` (eyebrow, heading, rule, intro), with white and `mist` sections alternating.
- **Cards** (`.card`): white, 1px border, soft shadow, 12px radius. Step cards add an orange top border.
- **Lists:** `CheckList` uses orange check marks; `NumberedList` uses orange numbered discs.
- **Closing CTA** (`FinalCTA`): a navy band with heading, line, orange button and WhatsApp button.
- **Footer** (`EditorialFooter`), on the logo gradient:
  - logo, mission, contact, social icons and a consultation button
  - Test Prep (two columns), Company and Useful Links
  - offices with pin icons
  - a large Ethos mark and wordmark
  - a dark copyright bar with "Back to top"
- **Buttons:** rectangular (6px radius), uppercase bold labels. Orange (default), navy (`dark`), outline, or white/ghost on dark backgrounds.

## Homepage

1. **Hero slider** (`HeroSlider`): three photo slides with a headline, lead and buttons.
   - Autoplay every 7s, with arrows, dots, swipe and a pause button (WCAG 2.2.2).
   - Autoplay stops on hover, on focus, when the tab is hidden and for reduced motion.
   - Inactive slides are `inert`.
   - On desktop each slide shows a testimonial video card; on phones it shows a compact "Watch … story" button.
2. **Numbers row:** verified stats, or service facts until stats are verified.
3. **"Worldwide" scene** (`WordScene`): a giant Fraunces-italic word with photos and floating story-video cards on several depth layers. It moves with scroll (CSS scroll-driven animations).
   - **Phones (below 768px) have their own layout**, set per item through `floatStyle(at, sm)`.
   - The word stacks as "World / wide" at 39vw.
   - Six sharp photos (no blur) and three larger story cards are spread over the whole pinned stretch. The cards alternate lanes, crossing the screen at ⅕, ½ and ⅘ of it, so the screen is never crowded and never empty.
   - The section is 190vh tall.
   - The phone `top` values double as the still layout (reduced motion, or no scroll-driven animation support): cards and photos frame the word.
4. **"What separates us from others":** photo collage beside four points with orange icons.
5. **Six step cards**, then a "View admission programmes" button.
6. **Programme podium** (`ProgrammePodium`): three image cards.
   - The first and last cards are the same height; the middle one is taller and carries a slowly rotating "Explore · Ethos" badge.
   - Captions expand on hover or focus to show the summary, and are always open below 768px.
   - The whole card is one link.
7. **Student video cards** (`StoryVideos`): dark cards with an orange play button that open a captioned video dialog. They scroll sideways on phones.
8. **Career-counselling block.**
9. **Consultation form** beside a photo with the phone number.
10. **Study destinations.** These replace the original's university-logo strip, because trademarked logos imply affiliations Ethos hasn't verified.
11. **Navy FAQ band.**

## Motion (subtle)

- **Reveals** (`MotionController`): sections marked `data-reveal-root` fade up once as they enter, with a short stagger.
  - Content that is already on screen at load is never hidden.
  - Nothing is hidden for reduced-motion users or when JavaScript is off.
- **Hero slider:** crossfade with a slow image zoom, as described above.
- **Worldwide scene:** scroll-linked depth drift, which is static under reduced motion.
- **Hover:** gentle image zoom on cards, colour changes, the podium caption expanding, and the podium badge's slow spin.
- **Not used:** opening screen, smooth-scroll hijacking, animated headline splitting.
- **Unused components:** `SmoothScroll`, `ScrollWords` and the older sections in `Landing.tsx` (everything except `WordScene` / `toSceneStories`) are not imported. They can be removed once the client confirms.
