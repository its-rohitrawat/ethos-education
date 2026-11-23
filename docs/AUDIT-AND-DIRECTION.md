# Phase 1 — audit, reference analysis, art direction & information architecture

## 1. Existing website inventory

Source: the full capture in `../current-site-archive/` (README, ROUTES, REVAMP-NOTES, security findings).

- **116 live routes:** 28 pages, 34 blog posts, category/tag/author/pagination archives. WordPress 7.1 + Elementor 4.4 on the *Immigway* immigration-consultancy theme.
- **Services found:** three admissions programmes (Dream School Application with ELITE and IVY MENTOR; Guaranteed Admissions; Scholarship), the 5:1 mentor model, ten tests, career counselling, a six-step process.
- **Real assets:** six video testimonials (students and parents), a public list of 30 named outcomes, a strong honest FAQ page, 34 SEO articles.
- **Problems carried into the redesign brief:**
  - hidden casino spam on seven live pages, and on stored content of eight more (see the archive’s `security/SECURITY-FINDINGS.md`);
  - unverified marketing claims (stats, ratings, memberships, “assured” scholarships);
  - placeholder blog excerpts on all 34 posts;
  - demo, draft and duplicate pages published;
  - a broken newsletter form;
  - provisional and AI-generated imagery;
  - inconsistent typography (five font families) and colours that differ from the theme settings.

## 2. Reference analysis — Lipedema Guru

What it does well (principles, not layouts):

1. **Typography as architecture.** A full-bleed wordmark in the hero and footer; condensed display type at very large sizes; few words, set large.
2. **Warm, quiet palette.** Cream paper, dark plum-brown ink, sand tiles; colour comes from photography.
3. **Inset photography with text anchored to its corners.** The image is a stage, not a background.
4. **Tile rhythms** alternating text and image, bleeding off the page edges.
5. **Restraint around conversion.** One CTA style, repeated calmly; the final CTA set with huge type overlapping a portrait.
6. **Hairline structure.** Thin rules, small labels, generous space.

What Ethos must *not* take: the wellness softness (rounded pastel tiles, beige-only palette), body-focused imagery, the condensed grotesk. Ethos needs an academic, worldly, intellectual identity.

## 3. Art direction — “The Ethos Edition”

The site behaves like a beautifully set **journal or university press edition**: chapters, numbered labels, footnote-like captions (“Fig. 01 — The journey”), oversized serif statements with one italic word in oxblood, and a “contents” list in the hero.

- **Brand source:** the new Ethos mark (two mirrored arcs crossing a bar — an E and an open book). Its dawn gradient becomes a rare, ceremonial moment (the closing CTA) rather than wallpaper.
- **Type:** Instrument Serif for voice, DM Sans for clarity, IBM Plex Mono for the editorial apparatus.
- **Signature moments:** the masked three-line hero headline; the 5:1 orbit with the student at its centre; the six-stage roadmap with its sticky image frame; destinations as a typographic index that floods with colour on hover; the dawn CTA with giant cream type; the full-width footer wordmark.
- **Imagery:** an archival grade for atmosphere, natural colour for real people. No flags, logo walls, gradient cards or stock smiles.

## 4. Information architecture

```
/                                   Home (15 chapters, ends in consultation)
/about/                             About Ethos (absorbs the /usa/ draft)
/admission/                         Admissions programmes
  /admission/dream-school/          incl. ELITE + IVY MENTOR
  /admission/guaranteed-admissions/
  /admission/scholarship-program/
/ivy-mentors/                       Mentorship, research, the 5:1 model
/test-prep/                         Hub + filter
  /sat/ /act/ /ap/ /gre/ /gmat/ /ielts/ /toefl-ibt/ /pte/ /det/ /esat/   (existing URLs kept)
/career-counselling/
/study-abroad/
  /study-abroad/usa/ /uk/ /canada/ /europe/ /singapore/
/success-stories/
/blog/                              The Ethos Journal
  /blog/topic/{6 topics}/
  /{article-slug}/                  34 articles (existing URLs kept)
/faq/  /contact/  /book-consultation/
/privacy-policy/  /term-and-conditions/  /refund-policy/   (existing URLs kept)
/sitemap.xml  /robots.txt  /api/consultation/  /api/revalidate/
```

**Primary navigation:** About · Admissions (Dream School, Guaranteed Admissions, Scholarship) · Ivy Mentors · Test Prep · Career Counselling · Success Stories · Journal · Contact, plus a persistent **Book a consultation** button. Below 1280px the navigation collapses into a full-screen menu that also lists destinations and FAQs.

**Conversion paths:** global header CTA, contextual CTAs on every service section (pre-selecting the service), a sticky mobile bar (consultation, WhatsApp, call), a quiet desktop WhatsApp button, article sidebars, and the closing dawn CTA on every page. All of them open the same two-step consultation drawer. `/book-consultation/` is the no-JavaScript fallback.

## 5. SEO migration

See [MIGRATION-MAP.md](MIGRATION-MAP.md). In short:
- every article and exam URL is kept;
- 18 legacy URLs get 308 redirects;
- archives move to Journal topics;
- 60 spam URLs answer 410;
- all existing Yoast titles and descriptions are reused where the page survives.
