# Design system

**Direction: a professional brochure site that follows the layout of the original ethoseducation.world** (client decision, 23 Nov 2026).
- White and light-grey sections, the navy of the Ethos logo, and an orange accent (the logo's ember) for buttons and highlighted words.
- No decorative motion: no opening screen, scroll effects, smooth scrolling or animated headlines.

**Earlier directions** (all recoverable):
- The quakerschool.org-style theme is on git `main` at commit `2801d24`.
- The Apple-style theme is in `../_theme-snapshots/2026-11-23-apple-minimal-hkwide/`.

Tokens live in `src/app/globals.css` (`@theme`).

## Colour

| Token | Hex | Use |
|---|---|---|
| `canvas` | `#FFFFFF` | Page background, cards |
| `mist` | `#F4F6F9` | Alternate sections, footer, soft cards |
| `cloud` | `#E8ECF1` | Hover states, inactive progress |
| `ink` / `ink-soft` | `#1B2333` / `#586273` | Text / secondary text |
| `brand` | `#0B2A5B` | Navy: banners, FAQ band, closing CTA, footer bar, dark buttons |
| `accent` | `#C2410C` | Orange buttons (white text ≥ 4.5:1) and highlighted words on white |
| `accent-bright` | `#EA7317` | Rules, icons, check marks, highlights in large headings |
| `accent-soft` | `#FDBA74` | Highlights and labels on navy |
| `accent-ink` | `#B4410D` | Small orange text on white (eyebrows, links) |
| `line` | `#E2E7EE` | Borders and dividers |

## Typography

These are the client's chosen faces, all SIL OFL and self-hosted from `src/app/fonts/`:

| Role | Family | Utility |
|---|---|---|
| Hero and page titles | Bricolage Grotesque 700 | `t-hero`: `clamp(2.1rem → 3.75rem)` |
| Section headings | Bricolage Grotesque 700 | `t-display`: `clamp(1.7rem → 2.6rem)` |
| Titles / small headings | Bricolage Grotesque 650–700 | `t-title`, `t-subtitle` |
| Eyebrows | Bricolage Grotesque 700, uppercase, tracked, orange | `t-label` / `Label` |
| Buttons and nav | Bricolage Grotesque 600–700, uppercase | `pillBase`, header |
| **Card titles** | Dancing Script 700 | `t-card` |
| Paragraphs | DM Sans 400 | body: 16–17px, line-height 1.7 |

Wrap one or two words of a heading in `<em>` to colour them orange, as on the original site ("*Ivy League Mentors* Turn Ambition…"). Headings get a short orange rule underneath (`SectionHeader`, page banners).

## Layout patterns (from the original site)

- **Header:** sticky white bar with the logo, uppercase menu with dropdowns (Admissions, Test Prep, Study Abroad, About) and an orange "Book consultation" button. Below 1280px the menu opens a full-screen list with accordion groups.
- **Page banner** (`PageHero`): the page photograph under a navy gradient, with breadcrumbs, an eyebrow, the title, an orange rule, the intro and buttons. An optional facts card sits on the right.
- **Sections:** centred `SectionHeader` (eyebrow, heading, rule, intro), with white and `mist` sections alternating.
- **Cards** (`.card`): white, 1px border, soft shadow, 12px radius. Step cards add an orange top border.
- **Lists:** `CheckList` uses orange check marks; `NumberedList` uses orange numbered discs.
- **Closing CTA** (`FinalCTA`): a navy band with heading, line, orange button and WhatsApp button.
- **Footer:** light grey; logo, mission, contact and social icons; Test Prep (two columns), Company and Useful Links; offices with pin icons; navy copyright bar.
- **Buttons:** rectangular (6px radius), uppercase bold labels. Orange (default), navy (`dark`), outline, or white/ghost on dark backgrounds.

## Homepage (original order)

1. **Photo hero:** headline, lead with an orange side rule, buttons, and the featured testimonial video.
2. **Numbers row:** verified stats, or service facts until stats are verified.
3. **Student video cards** (`StoryVideos`): dark cards with an orange play button that open a captioned video dialog. They scroll sideways on phones.
4. **"What separates us from others":** photo collage beside four points with orange icons.
5. **Six step cards**, then a "View admission programmes" button.
6. **Career-counselling block.**
7. **Consultation form** beside a photo with the phone number.
8. **Study destinations.** These replace the original's university-logo strip, because trademarked logos imply affiliations Ethos hasn't verified.
9. **Navy FAQ band.**

## Motion

None beyond simple hover colour changes and the native accordion and drawer transitions. The unused motion components (`Landing.tsx`, `SceneStories`, `SmoothScroll`, `MotionController`, `ScrollWords`) are no longer imported anywhere and can be removed once the client confirms the direction.
