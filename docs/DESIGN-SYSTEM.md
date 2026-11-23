# Design system

**Direction: warm editorial-modern, modelled on the layout and motion of quakerschool.org** (the reference the client chose on 23 Nov 2026).
- The canvas is cream. Headlines are huge and set in Bricolage Grotesque.
- Body copy is a calm sans.
- Soft pastel panels with rounded tops stack down the page.
- Photography is full-bleed and natural.

Only the *design language* follows the reference: structure, type scale, colour approach and motion. All copy, photography, branding and code are Ethos's own or licensed. Nothing is copied from the reference site.

The previous direction (Apple-style minimal with HK Grotesk Wide) is snapshotted at `../_theme-snapshots/2026-11-23-apple-minimal-hkwide/`.

Tokens live in `src/app/globals.css` (`@theme`), so Tailwind generates utilities from them (`bg-butter`, `text-ink`, `panel-sage`…).

## Colour

| Token | Hex | Use |
|---|---|---|
| `canvas` | `#F9F9F0` | Page background (cream) |
| `mist` / `cloud` | `#F0EFE3` / `#E7E6D7` | Cards on cream, hover |
| `ink` | `#1A1A1A` | Text, pill buttons |
| `ink-soft` | `#4A4A45` | Secondary text |
| `butter` | `#FFDC7E` | Panel |
| `sage` | `#D6DEB9` | Panel |
| `coral` | `#DE8A74` | Panel |
| `lilac` | `#BD9FC3` | Panel, closing CTA card |
| `sky` | `#B5CDE3` | Panel |
| `brand` / `night` | `#0B2A5B` | Ethos navy: footer, button hover |
| `brand-bright` | `#2C5C94` | Occasional links |
| `line` | ink 14% | Hairlines |

**Panels** (`.panel` + `.panel-{butter,sage,coral,lilac,sky}`) have 36px rounded top corners, so each one looks as if it slides over the section above.
- Inner-page heroes are a full panel in the section's colour (`PageHero`, see `toneFor()`). The cream page overlaps their bottom edge.
- Alternate sections written as `section.bg-mist` render automatically as pastel panels, cycling lilac → butter → sage.

## Typography

The client chose these on 23 Nov 2026:
- **Bricolage Grotesque** for main headings, nav, labels and buttons.
- **DM Sans** for paragraphs.
- **Dancing Script** for card titles.

| Role | Family | Utility | Size |
|---|---|---|---|
| Home hero | Bricolage Grotesque 600 | `t-hero` | `clamp(3.4rem → 13.6vw → 15rem)`, tracking −0.045em |
| Section headline / inner hero | Bricolage Grotesque 550 | `t-display` | `clamp(2.2rem → 5.3rem)` |
| Statement | Bricolage Grotesque 450 | `t-statement` | `clamp(1.8rem → 4.2rem)` |
| Title | Bricolage Grotesque 550 | `t-title` | `clamp(1.45rem → 2.3rem)` |
| Small bold heading, call-outs | Bricolage Grotesque 600 | `t-subtitle` | `clamp(1.08rem → 1.55rem)` |
| Eyebrow, nav, buttons, links | Bricolage Grotesque 600 | `t-label` / `font-display` / `pillBase` | body size, sentence case |
| **Card titles** | Dancing Script 700 | `t-card` | `clamp(1.6rem → 2.25rem)` |
| Paragraphs | DM Sans 400 | `body` / `t-body` | `clamp(1rem → 1.32rem)` (16px phone → ~21px desktop) |
| "Worldwide" word | Fraunces italic | `.scene-word` | 24.5vw |

**Where `t-card` is used:**
- Programme cards (home and admissions).
- "What's included", approach and method cards.
- How-applications-work cards, mentor-role and difference cards, and the pathway cards on the career page.
- Office cards, test and destination tiles, related tests, and the "Who it's for" / "What it measures" cards.
- Story names on video cards.

Journal article titles stay in Bricolage Grotesque, because they are long sentences and a script would be hard to read there.

**Fonts are self-hosted**: variable Latin WOFF2 files in `src/app/fonts/`, loaded with `next/font/local`.
- Bricolage Grotesque: opsz, wdth and wght axes.
- DM Sans: opsz and wght.
- Dancing Script: wght.
- Fraunces Italic: opsz, wght, SOFT and WONK.

All four are SIL Open Font License, so web use is free. They were downloaded once from Google Fonts, so builds don't depend on reaching Google. To change a face, swap its file and the `localFont` call in `app/layout.tsx` (Fraunces: `components/home/Landing.tsx`, `preload: false`).

Emphasis (`<em>`) inside headlines is upright and the same colour. The design relies on scale, not colour, for emphasis.

## Layout

- `shell`: max 1600px, gutter `clamp(1.25rem, 2.8vw, 2.5rem)`. Content runs close to the edges, like the reference.
- `section-y`: `clamp(4.5rem, 10vw, 9.5rem)`.
- Headings are left-aligned. Two-column sections put the image left and text right, or the other way round.
- Cards: 16px radius. Pills: fully rounded. Panels: 36px top radius.

## Patterns

| Need | Use |
|---|---|
| Buttons | Black pill, bold Bricolage label, chevron (`ConsultationButton`, `ButtonLink`): "Book a consultation ›". On dark or photo backgrounds, the cream `light` variant |
| Text links | `ArrowLink`: bold Bricolage label, underline draws in, chevron |
| Lists | `CheckList`: hairline-separated rows. `NumberedList`: hairline rows with large numerals |
| Call-outs | Big heading → hairline → 3–4 columns divided by vertical hairlines (`CallOuts`) |
| Cards on panels | Pastel card, title + black "Explore ›" pill, text, image (`Pathways`) |
| Closing CTA | Full-bleed photo with a lilac card: heading, text, pill, inset photo (`FinalCTA`) |

## Header

- At the top of the page the header is transparent: cream text over the home hero, ink text on inner pages.
- Scrolling down tucks it away. Scrolling up brings it back as a floating cream bar.
- One passive, rAF-throttled scroll handler sets `data-hidden` / `data-floating`, with 24px hysteresis, so trackpad jitter can't make it bounce.
- Only `transform` and colours animate; there's no backdrop blur.
- Desktop nav items open mega-menus: title and blurb, links, and a photo.
- The mobile menu is a full-screen `<dialog>` with accordion groups.

## Motion

| Effect | Where | How |
|---|---|---|
| Opening screen | Home, first load per browser session | A pastel field steps butter → sage → coral → lilac → sky while a small centred photo changes. The last photo (the hero image) expands to full screen and hands over to the hero, then the headline rises. Pure CSS (`.intro`); an inline gate script in `app/layout.tsx` skips it on other pages, on repeat loads in the same session and for reduced motion. Lenis is held for its ~3.5s |
| Smooth scrolling | Whole site (desktop wheel / trackpad) | Lenis (`SmoothScroll`). Off for touch and reduced motion; dialogs scroll natively |
| Word rise | Every hero and section headline | `splitWords()` masks each word on the server; CSS transitions armed by `MotionController` |
| Pinned giant word (3D) | Home "Worldwide" scene | Three depth layers in a sticky stage: 8 photos *behind* the word (smaller, slower, softened), the word, and 4 photos plus 3 story films *in front* (larger, faster, shadowed). Scroll drift is CSS scroll-driven (`view-timeline`). `DepthPointer` feeds the pointer position into `--px`/`--py`, so each layer shifts by a different amount and the word tilts slightly. The word is set in **Fraunces italic** (SOFT/WONK axes, OFL), with "World" solid and "wide" outlined |
| Story films | Home scene (`SceneStories`) | Portrait cards loop a 6s silent preview (`public/media/stories/previews/`, 90–240 KB, cut from the full testimonial) only while on screen. Previews don't play for reduced motion or data saver. Clicking opens the full video with sound, controls and captions in a `<dialog>`. Only verified stories are shown in production |
| Programme cards | Home "Programmes" | Podium layout: cards 1 and 3 are identical in size (photos cropped to fill), card 2 is taller and centred, with a slowly rotating badge. Each pastel caption expands on hover or focus to reveal the summary (always open on touch screens). The whole card is one link |
| Growing media | Home full-width photo | `animation-timeline: view()`, scale 0.82 → 1 |
| Hero drift | Home hero photo | Slow scale and drift tied to page scroll |
| Text roll | Nav links, pill labels | Hover rolls the label up; copy is `aria-hidden` |
| Reveals | Cards, images | IntersectionObserver + CSS, only for content that starts below the fold |

Browsers without scroll-driven animations (currently Firefox) show the scenes at rest. Reduced-motion users get no animation at all.

## Components

| Component | Kind | Notes |
|---|---|---|
| `SiteHeader` | client | Header as above. Menu data comes from `content/nav.ts`, built on the server |
| `EditorialFooter` | server (cached) | Logo-gradient background (`.footer-dawn`): midnight navy → crimson → ember → amber, as in the Ethos logo artwork, with the warm light behind the white giant wordmark. Talk-to-us rows, three link columns, address, and a dark legal band so small text stays readable |
| `PageHero` | server | Pastel panel hero for inner pages (`tone` prop or `toneFor(path)`) |
| `FinalCTA` | server | Photo + lilac card closing block |
| `components/home/Landing.tsx` | server | Homepage sections: `LandingHero`, `WordScene`, `Statement`, `ApproachPanel`, `GrowMedia`, `CallOuts`, `JournalPanel`, `Pathways`, `MentorPanel`, `Conversation` |
| `Carousel` | client | Native scroll-snap rail + previous/next buttons |
| `SmoothScroll` | client | Lenis |
| `SplitTextHeading`, `Reveal`, `RevealImage`, `MotionController` | server / client | Word-split headlines and reveals |
| `ConsultationProvider` / `Drawer` / `Form` | client | Native `<dialog>`; two-step form |

Kept from earlier themes but no longer used on the homepage: `HomeSections.tsx` (some exports are still used by inner pages), `HomeHero.tsx`, `ScrollWords.tsx`, `MentorExperience.tsx`, `AdmissionsTimeline.tsx`, `PageShell.tsx`.
