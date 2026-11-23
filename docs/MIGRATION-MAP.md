# Route migration map — ethoseducation.world → new site

Generated from the crawl in `../current-site-archive/crawl-results.json` (116 live routes on 21 Nov 2026) plus legacy redirects.
Redirects are implemented in `next.config.ts` (permanent 308, both with and without trailing slash).

**Principle:** established URLs are kept wherever the content still exists — all 34 articles and the ten exam pages keep their exact URLs. Only duplicates, drafts, demo pages and the old programme pages move.

| Old URL | Type | Old status | New URL | Action | Content | Metadata | Notes |
|---|---|---|---|---|---|---|---|
| `/author/admin/` | author | 200 | `/blog/` | 308 → /blog/ | Replaced by Journal topics (/blog/topic/…) | n/a |  |
| `/category/blog/` | category | 200 | `/blog/` | 308 → /blog/ | Replaced by Journal topics (/blog/topic/…) | n/a |  |
| `/category/campeign/` | category | 200 | `/blog/` | 308 → /blog/ | Replaced by Journal topics (/blog/topic/…) | n/a |  |
| `/category/consultation/` | category | 200 | `/blog/` | 308 → /blog/ | Replaced by Journal topics (/blog/topic/…) | n/a |  |
| `/category/education/` | category | 200 | `/blog/` | 308 → /blog/ | Replaced by Journal topics (/blog/topic/…) | n/a |  |
| `/category/post/` | category | 200 | `/blog/` | 308 → /blog/ | Replaced by Journal topics (/blog/topic/…) | n/a |  |
| `/dream-school-application/` | other | 404 | `/admission/dream-school/` | 308 → /admission/dream-school/ | Merged into new page | New metadata | Was a 404 linked from /guaranteed-admission-program/. |
| `/scholarship-program-2/` | other | 404 | `/admission/scholarship-program/` | 308 → /admission/scholarship-program/ | Merged into new page | New metadata | Was a 404 linked from /guaranteed-admission-program/. |
| `/` | page | 200 | `/` | Kept (same URL) | Rebuilt from archived copy | Rewritten |  |
| `/act/` | page | 200 | `/act/` | Kept (same URL) | Rebuilt from archived copy | Existing Yoast title/description reused |  |
| `/admission/` | page | 200 | `/admission/` | Kept (same URL) | Rebuilt from archived copy | Existing Yoast title/description reused |  |
| `/ap/` | page | 200 | `/ap/` | Kept (same URL) | Rebuilt from archived copy | Existing Yoast title/description reused |  |
| `/blogs/` | page | 200 | `/blog/` | 308 → /blog/ | Merged into new page | New metadata |  |
| `/book-consultation/` | page | 200 | `/book-consultation/` | Kept (same URL) | Rebuilt from archived copy | Existing Yoast title/description reused |  |
| `/career-counselling/` | page | 200 | `/career-counselling/` | Kept (same URL) | Rebuilt from archived copy | Existing Yoast title/description reused |  |
| `/det/` | page | 200 | `/det/` | Kept (same URL) | Rebuilt from archived copy | Existing Yoast title/description reused |  |
| `/elite-preparation-ethos-education-expert-coaching/` | page | 200 | `/admission/dream-school/` | 308 → /admission/dream-school/ | Merged into new page | New metadata |  |
| `/esat/` | page | 200 | `/esat/` | Kept (same URL) | Rebuilt from archived copy | Existing Yoast title/description reused |  |
| `/ethos-landing-page/` | page | 200 | `/book-consultation/` | 308 → /book-consultation/ | Merged into new page | New metadata | Possible ad landing page — confirm with marketing whether campaigns still point here. |
| `/faq/` | page | 200 | `/faq/` | Kept (same URL) | Rebuilt from archived copy | Existing Yoast title/description reused |  |
| `/gmat/` | page | 200 | `/gmat/` | Kept (same URL) | Rebuilt from archived copy | Existing Yoast title/description reused |  |
| `/gre/` | page | 200 | `/gre/` | Kept (same URL) | Rebuilt from archived copy | Existing Yoast title/description reused |  |
| `/guaranteed-admission-program/` | page | 200 | `/admission/guaranteed-admissions/` | 308 → /admission/guaranteed-admissions/ | Merged into new page | New metadata |  |
| `/home-01-one-page/` | page | 200 | `/` | 308 → / | Merged into new page | New metadata | Theme demo page with placeholder phone numbers + injected spam widget. |
| `/home-03/` | page | 200 | `/` | 308 → / | Merged into new page | New metadata | Theme demo page with placeholder phone numbers. |
| `/ielts/` | page | 200 | `/ielts/` | Kept (same URL) | Rebuilt from archived copy | Existing Yoast title/description reused |  |
| `/ivy-mentors/` | page | 200 | `/ivy-mentors/` | Kept (same URL) | Rebuilt from archived copy | Existing Yoast title/description reused |  |
| `/privacy-policy/` | page | 200 | `/privacy-policy/` | Kept (same URL) | Migrated verbatim (legal review pending) | Existing Yoast title/description reused |  |
| `/pte/` | page | 200 | `/pte/` | Kept (same URL) | Rebuilt from archived copy | Existing Yoast title/description reused |  |
| `/refund-policy/` | page | 200 | `/refund-policy/` | Kept (same URL) | Migrated verbatim (legal review pending) | Existing Yoast title/description reused |  |
| `/review-data-draft/` | page | 200 | `/` | 308 → / | Merged into new page | New metadata | Draft page, published by mistake. |
| `/sat/` | page | 200 | `/sat/` | Kept (same URL) | Rebuilt from archived copy | Existing Yoast title/description reused |  |
| `/success-stories/` | page | 200 | `/success-stories/` | Kept (same URL) | Rebuilt from archived copy | Existing Yoast title/description reused |  |
| `/term-and-conditions/` | page | 200 | `/term-and-conditions/` | Kept (same URL) | Migrated verbatim (legal review pending) | Existing Yoast title/description reused |  |
| `/toefl-ibt/` | page | 200 | `/toefl-ibt/` | Kept (same URL) | Rebuilt from archived copy | Existing Yoast title/description reused |  |
| `/usa/` | page | 200 | `/study-abroad/usa/` | 308 → /study-abroad/usa/ | Merged into new page | New metadata | Unfinished 'About' draft (contains '[confirm and update number]'). Ideas merged into /about/; URL → USA destination guide. |
| `/author/admin/page/2/` | pagination | 200 | `/blog/` | 308 → /blog/ | Replaced by Journal topics (/blog/topic/…) | n/a |  |
| `/author/admin/page/3/` | pagination | 200 | `/blog/` | 308 → /blog/ | Replaced by Journal topics (/blog/topic/…) | n/a |  |
| `/author/admin/page/4/` | pagination | 200 | `/blog/` | 308 → /blog/ | Replaced by Journal topics (/blog/topic/…) | n/a |  |
| `/category/blog/page/2/` | pagination | 200 | `/blog/` | 308 → /blog/ | Replaced by Journal topics (/blog/topic/…) | n/a |  |
| `/category/blog/page/3/` | pagination | 200 | `/blog/` | 308 → /blog/ | Replaced by Journal topics (/blog/topic/…) | n/a |  |
| `/category/blog/page/4/` | pagination | 200 | `/blog/` | 308 → /blog/ | Replaced by Journal topics (/blog/topic/…) | n/a |  |
| `/category/campeign/page/2/` | pagination | 200 | `/blog/` | 308 → /blog/ | Replaced by Journal topics (/blog/topic/…) | n/a |  |
| `/category/education/page/2/` | pagination | 200 | `/blog/` | 308 → /blog/ | Replaced by Journal topics (/blog/topic/…) | n/a |  |
| `/tag/affordable-countries-to-study-abroad/page/2/` | pagination | 200 | `/blog/` | 308 → /blog/ | Replaced by Journal topics (/blog/topic/…) | n/a |  |
| `/tag/financial-planning-abroad/page/2/` | pagination | 200 | `/blog/` | 308 → /blog/ | Replaced by Journal topics (/blog/topic/…) | n/a |  |
| `/tag/gurgaon-study-abroad-experts/page/2/` | pagination | 200 | `/blog/` | 308 → /blog/ | Replaced by Journal topics (/blog/topic/…) | n/a |  |
| `/tag/overseas-financial-strategy/page/2/` | pagination | 200 | `/blog/` | 308 → /blog/ | Replaced by Journal topics (/blog/topic/…) | n/a |  |
| `/tag/shortlisting-universities-abroad/page/2/` | pagination | 200 | `/blog/` | 308 → /blog/ | Replaced by Journal topics (/blog/topic/…) | n/a |  |
| `/tag/study-abroad-consultant-india/page/2/` | pagination | 200 | `/blog/` | 308 → /blog/ | Replaced by Journal topics (/blog/topic/…) | n/a |  |
| `/tag/study-abroad-consultants-in-gurgaon/page/2/` | pagination | 200 | `/blog/` | 308 → /blog/ | Replaced by Journal topics (/blog/topic/…) | n/a |  |
| `/tag/unlock-global-dreams/page/2/` | pagination | 200 | `/blog/` | 308 → /blog/ | Replaced by Journal topics (/blog/topic/…) | n/a |  |
| `/affordable-countries-study-abroad-indian-student/` | post | 200 | `/affordable-countries-study-abroad-indian-student/` | Kept (same URL) | Migrated — scripts/migration/migrate_journal.py | Yoast title + description carried over |  |
| `/best-scholarships-for-indian-students-in-2026-the-complete-guide-to-studying-abroad-with-financial-aid/` | post | 200 | `/best-scholarships-for-indian-students-in-2026-the-complete-guide-to-studying-abroad-with-financial-aid/` | Kept (same URL) | Migrated — scripts/migration/migrate_journal.py | Yoast title + description carried over |  |
| `/best-stem-courses-abroad-with-the-highest-roi-in-2026-top-degrees-that-deliver-global-careers/` | post | 200 | `/best-stem-courses-abroad-with-the-highest-roi-in-2026-top-degrees-that-deliver-global-careers/` | Kept (same URL) | Migrated — scripts/migration/migrate_journal.py | Yoast title + description carried over |  |
| `/best-study-abroad-consultants-in-gurgaon-for-usa-uk-canada-australia/` | post | 200 | `/best-study-abroad-consultants-in-gurgaon-for-usa-uk-canada-australia/` | Kept (same URL) | Migrated — scripts/migration/migrate_journal.py | Yoast title + description carried over |  |
| `/cost-of-education-in-singapore-2026-complete-fee-breakdown-for-indian-students/` | post | 200 | `/cost-of-education-in-singapore-2026-complete-fee-breakdown-for-indian-students/` | Kept (same URL) | Migrated — scripts/migration/migrate_journal.py | Yoast title + description carried over |  |
| `/emotional-journey-of-studying-abroad/` | post | 200 | `/emotional-journey-of-studying-abroad/` | Kept (same URL) | Migrated — scripts/migration/migrate_journal.py | Yoast title + description carried over |  |
| `/fully-funded-scholarships-in-europe-for-international-students-2026/` | post | 200 | `/fully-funded-scholarships-in-europe-for-international-students-2026/` | Kept (same URL) | Migrated — scripts/migration/migrate_journal.py | Yoast title + description carried over |  |
| `/global-education-a-catalyst-for-your-career-path/` | post | 200 | `/global-education-a-catalyst-for-your-career-path/` | Kept (same URL) | Migrated — scripts/migration/migrate_journal.py | Yoast title + description carried over |  |
| `/guaranteed-admissions-program-everything-students-should-know/` | post | 200 | `/guaranteed-admissions-program-everything-students-should-know/` | Kept (same URL) | Migrated — scripts/migration/migrate_journal.py | Yoast title + description carried over |  |
| `/guaranteed-admissions-program-for-study-abroad-eligibility-process-benefits-for-indian-students/` | post | 200 | `/guaranteed-admissions-program-for-study-abroad-eligibility-process-benefits-for-indian-students/` | Kept (same URL) | Migrated — scripts/migration/migrate_journal.py | Yoast title + description carried over |  |
| `/high-employability-courses-ai-era-2026/` | post | 200 | `/high-employability-courses-ai-era-2026/` | Kept (same URL) | Migrated — scripts/migration/migrate_journal.py | Yoast title + description carried over |  |
| `/how-to-afford-an-ivy-league-education-from-india-the-complete-financial-aid-scholarship-guide-2026/` | post | 200 | `/how-to-afford-an-ivy-league-education-from-india-the-complete-financial-aid-scholarship-guide-2026/` | Kept (same URL) | Migrated — scripts/migration/migrate_journal.py | Yoast title + description carried over |  |
| `/how-to-build-yourself-for-scholarships-in-undergraduate-bachelors-degree-programs/` | post | 200 | `/how-to-build-yourself-for-scholarships-in-undergraduate-bachelors-degree-programs/` | Kept (same URL) | Migrated — scripts/migration/migrate_journal.py | Yoast title + description carried over |  |
| `/how-to-get-into-harvard-oxford-stanford-or-mit-as-an-indian-student-2026-guide/` | post | 200 | `/how-to-get-into-harvard-oxford-stanford-or-mit-as-an-indian-student-2026-guide/` | Kept (same URL) | Migrated — scripts/migration/migrate_journal.py | Yoast title + description carried over |  |
| `/how-to-get-into-stanford-university-a-strategic-guide-to-a-winning-application/` | post | 200 | `/how-to-get-into-stanford-university-a-strategic-guide-to-a-winning-application/` | Kept (same URL) | Migrated — scripts/migration/migrate_journal.py | Yoast title + description carried over |  |
| `/is-16-years-of-education-mandatory-for-masters-programs-in-the-usa/` | post | 200 | `/is-16-years-of-education-mandatory-for-masters-programs-in-the-usa/` | Kept (same URL) | Migrated — scripts/migration/migrate_journal.py | Yoast title + description carried over |  |
| `/making-of-harvard-student-a-strategic-application-guide/` | post | 200 | `/making-of-harvard-student-a-strategic-application-guide/` | Kept (same URL) | Migrated — scripts/migration/migrate_journal.py | Yoast title + description carried over |  |
| `/navigating-the-us-job-market-during-the-trump-era-what-indian-students-must-know/` | post | 200 | `/navigating-the-us-job-market-during-the-trump-era-what-indian-students-must-know/` | Kept (same URL) | Migrated — scripts/migration/migrate_journal.py | Yoast title + description carried over |  |
| `/prepare-for-edustarr-esat-2025-syllabus-strategy-scholarship-tips/` | post | 200 | `/prepare-for-edustarr-esat-2025-syllabus-strategy-scholarship-tips/` | Kept (same URL) | Migrated — scripts/migration/migrate_journal.py | Yoast title + description carried over |  |
| `/scholarships-for-indian-students-to-study-abroad/` | post | 200 | `/scholarships-for-indian-students-to-study-abroad/` | Kept (same URL) | Migrated — scripts/migration/migrate_journal.py | Yoast title + description carried over |  |
| `/stem-management-degree-programs-and-careers-complete-guide-for-2026/` | post | 200 | `/stem-management-degree-programs-and-careers-complete-guide-for-2026/` | Kept (same URL) | Migrated — scripts/migration/migrate_journal.py | Yoast title + description carried over |  |
| `/study-abroad-consultant-in-india/` | post | 200 | `/study-abroad-consultant-in-india/` | Kept (same URL) | Migrated — scripts/migration/migrate_journal.py | Yoast title + description carried over |  |
| `/study-abroad-guide-2026-indian-students/` | post | 200 | `/study-abroad-guide-2026-indian-students/` | Kept (same URL) | Migrated — scripts/migration/migrate_journal.py | Yoast title + description carried over |  |
| `/study-abroad-without-ielts-in-2026-countries-universities-and-alternatives-accepted-by-top-institutions/` | post | 200 | `/study-abroad-without-ielts-in-2026-countries-universities-and-alternatives-accepted-by-top-institutions/` | Kept (same URL) | Migrated — scripts/migration/migrate_journal.py | Yoast title + description carried over |  |
| `/study-in-the-usa-for-indian-students-in-2026-cost-visa-top-universities-scholarships/` | post | 200 | `/study-in-the-usa-for-indian-students-in-2026-cost-visa-top-universities-scholarships/` | Kept (same URL) | Migrated — scripts/migration/migrate_journal.py | Yoast title + description carried over |  |
| `/the-best-language-for-global-studies-unlocking-the-world-through-multilingual-power/` | post | 200 | `/the-best-language-for-global-studies-unlocking-the-world-through-multilingual-power/` | Kept (same URL) | Migrated — scripts/migration/migrate_journal.py | Yoast title + description carried over |  |
| `/the-future-of-global-education-trends-every-student-should-know/` | post | 200 | `/the-future-of-global-education-trends-every-student-should-know/` | Kept (same URL) | Migrated — scripts/migration/migrate_journal.py | Yoast title + description carried over |  |
| `/the-uks-digital-visa-revolution-what-indian-students-must-know-about-the-evisa-system-in-2026/` | post | 200 | `/the-uks-digital-visa-revolution-what-indian-students-must-know-about-the-evisa-system-in-2026/` | Kept (same URL) | Migrated — scripts/migration/migrate_journal.py | Yoast title + description carried over |  |
| `/top-10-emerging-courses-for-high-employability-in-the-guide/` | post | 200 | `/top-10-emerging-courses-for-high-employability-in-the-guide/` | Kept (same URL) | Migrated — scripts/migration/migrate_journal.py | Yoast title + description carried over |  |
| `/top-mistakes-students-make-when-shortlisting-universities-abroad/` | post | 200 | `/top-mistakes-students-make-when-shortlisting-universities-abroad/` | Kept (same URL) | Migrated — scripts/migration/migrate_journal.py | Yoast title + description carried over |  |
| `/university-admissions-institutional-social-factors/` | post | 200 | `/university-admissions-institutional-social-factors/` | Kept (same URL) | Migrated — scripts/migration/migrate_journal.py | Yoast title + description carried over |  |
| `/unlock-global-dreams-the-hidden-power-of-financial-planning-abroad/` | post | 200 | `/unlock-global-dreams-the-hidden-power-of-financial-planning-abroad/` | Kept (same URL) | Migrated — scripts/migration/migrate_journal.py | Yoast title + description carried over |  |
| `/us-student-visa-2026-latest-f-1-rules-every-indian-student-must-know/` | post | 200 | `/us-student-visa-2026-latest-f-1-rules-every-indian-student-must-know/` | Kept (same URL) | Migrated — scripts/migration/migrate_journal.py | Yoast title + description carried over |  |
| `/why-personalized-admission-counseling-matters-more-than-ever/` | post | 200 | `/why-personalized-admission-counseling-matters-more-than-ever/` | Kept (same URL) | Migrated — scripts/migration/migrate_journal.py | Yoast title + description carried over |  |
| `/tag/2023/` | tag | 200 | `/blog/` | 308 → /blog/ | Replaced by Journal topics (/blog/topic/…) | n/a |  |
| `/tag/affordable-countries-to-study-abroad/` | tag | 200 | `/blog/` | 308 → /blog/ | Replaced by Journal topics (/blog/topic/…) | n/a |  |
| `/tag/best-study-abroad-consultant-in-india/` | tag | 200 | `/blog/` | 308 → /blog/ | Replaced by Journal topics (/blog/topic/…) | n/a |  |
| `/tag/business/` | tag | 200 | `/blog/` | 308 → /blog/ | Replaced by Journal topics (/blog/topic/…) | n/a |  |
| `/tag/consultancy/` | tag | 200 | `/blog/` | 308 → /blog/ | Replaced by Journal topics (/blog/topic/…) | n/a |  |
| `/tag/consultation/` | tag | 200 | `/blog/` | 308 → /blog/ | Replaced by Journal topics (/blog/topic/…) | n/a |  |
| `/tag/dream/` | tag | 200 | `/blog/` | 308 → /blog/ | Replaced by Journal topics (/blog/topic/…) | n/a |  |
| `/tag/education/` | tag | 200 | `/blog/` | 308 → /blog/ | Replaced by Journal topics (/blog/topic/…) | n/a |  |
| `/tag/finance/` | tag | 200 | `/blog/` | 308 → /blog/ | Replaced by Journal topics (/blog/topic/…) | n/a |  |
| `/tag/financial-planning-abroad/` | tag | 200 | `/blog/` | 308 → /blog/ | Replaced by Journal topics (/blog/topic/…) | n/a |  |
| `/tag/fully-funded-scholarships-for-indian/` | tag | 200 | `/blog/` | 308 → /blog/ | Replaced by Journal topics (/blog/topic/…) | n/a |  |
| `/tag/gurgaon-study-abroad-experts/` | tag | 200 | `/blog/` | 308 → /blog/ | Replaced by Journal topics (/blog/topic/…) | n/a |  |
| `/tag/immigration/` | tag | 200 | `/blog/` | 308 → /blog/ | Replaced by Journal topics (/blog/topic/…) | n/a |  |
| `/tag/marketing/` | tag | 200 | `/blog/` | 308 → /blog/ | Replaced by Journal topics (/blog/topic/…) | n/a |  |
| `/tag/meeting/` | tag | 200 | `/blog/` | 308 → /blog/ | Replaced by Journal topics (/blog/topic/…) | n/a |  |
| `/tag/overseas-financial-strategy/` | tag | 200 | `/blog/` | 308 → /blog/ | Replaced by Journal topics (/blog/topic/…) | n/a |  |
| `/tag/paper/` | tag | 200 | `/blog/` | 308 → /blog/ | Replaced by Journal topics (/blog/topic/…) | n/a |  |
| `/tag/process/` | tag | 200 | `/blog/` | 308 → /blog/ | Replaced by Journal topics (/blog/topic/…) | n/a |  |
| `/tag/scholarships-to-study-overseas/` | tag | 200 | `/blog/` | 308 → /blog/ | Replaced by Journal topics (/blog/topic/…) | n/a |  |
| `/tag/shortlisting-universities-abroad/` | tag | 200 | `/blog/` | 308 → /blog/ | Replaced by Journal topics (/blog/topic/…) | n/a |  |
| `/tag/study-abroad-consultant-india/` | tag | 200 | `/blog/` | 308 → /blog/ | Replaced by Journal topics (/blog/topic/…) | n/a |  |
| `/tag/study-abroad-consultants-in-gurgaon/` | tag | 200 | `/blog/` | 308 → /blog/ | Replaced by Journal topics (/blog/topic/…) | n/a |  |
| `/tag/study-abroad-scholarships-india/` | tag | 200 | `/blog/` | 308 → /blog/ | Replaced by Journal topics (/blog/topic/…) | n/a |  |
| `/tag/studying-abroad-journey/` | tag | 200 | `/blog/` | 308 → /blog/ | Replaced by Journal topics (/blog/topic/…) | n/a |  |
| `/tag/tip/` | tag | 200 | `/blog/` | 308 → /blog/ | Replaced by Journal topics (/blog/topic/…) | n/a |  |
| `/tag/uk-evisa-2026/` | tag | 200 | `/blog/` | 308 → /blog/ | Replaced by Journal topics (/blog/topic/…) | n/a |  |
| `/tag/uk-student-visa-2026/` | tag | 200 | `/blog/` | 308 → /blog/ | Replaced by Journal topics (/blog/topic/…) | n/a |  |
| `/tag/unlock-global-dreams/` | tag | 200 | `/blog/` | 308 → /blog/ | Replaced by Journal topics (/blog/topic/…) | n/a |  |
| `/tag/visa-fee/` | tag | 200 | `/blog/` | 308 → /blog/ | Replaced by Journal topics (/blog/topic/…) | n/a |  |
| `/tag/visa/` | tag | 200 | `/blog/` | 308 → /blog/ | Replaced by Journal topics (/blog/topic/…) | n/a |  |
| `/elite/` | redirect | 301 | `/admission/dream-school/` | 308 → /admission/dream-school/ | Was already a WordPress redirect | n/a |  |
| `/best-scholarships-for-indian-students-in-2026/` | redirect | 301 | `/best-scholarships-for-indian-students-in-2026-the-complete-guide-to-studying-abroad-with-financial-aid/` | 308 → /best-scholarships-for-indian-students-in-2026-the-complete-guide-to-studying-abroad-with-financial-aid/ | Was already a WordPress redirect | n/a |  |

## New URLs (no previous equivalent)

| New URL | Purpose |
|---|---|
| `/about/` | About Ethos (absorbs the /usa/ draft’s approach) |
| `/contact/` | Contact channels, offices, form |
| `/admission/dream-school/`, `/admission/guaranteed-admissions/`, `/admission/scholarship-program/` | Programme detail pages |
| `/test-prep/` | Test-preparation hub |
| `/study-abroad/` + `/study-abroad/{usa,uk,canada,europe,singapore}/` | Destination guides |
| `/blog/` + `/blog/topic/{admissions,scholarships-funding,destinations,visas-careers,test-prep,perspectives}/` | The Ethos Journal |

## Spam URLs (answered 410 Gone)

The 60 casino URLs that were injected into the old homepage never existed as real pages. `src/proxy.ts` answers them with **410 Gone** (+ `X-Robots-Tag: noindex`) so search engines drop them quickly. List: `src/lib/spam-paths.ts`.

## After launch

1. Submit the new `/sitemap.xml` in Google Search Console.
2. Watch Search Console → Pages → *Not found (404)* for any legacy URL missed here; add it to `legacyRedirects` in `next.config.ts`.
3. Check the *Security issues* and *Manual actions* reports (see the spam findings in the archive).
