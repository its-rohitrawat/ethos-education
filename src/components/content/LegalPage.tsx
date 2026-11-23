import { ArticleBody } from "@/components/journal/ArticleBody";
import legal from "@/content/legal/legal.json";
import { Breadcrumbs } from "./Breadcrumbs";
import { SplitTextHeading } from "@/components/motion/SplitTextHeading";

export type LegalSlug = "privacy-policy" | "term-and-conditions" | "refund-policy";
type LegalDoc = { title: string; description: string; body: string };

export const legalDoc = (slug: LegalSlug) => (legal as Record<LegalSlug, LegalDoc>)[slug];

/** Legal text is migrated verbatim from the current site (pending legal review) — not rewritten. */
export function LegalPage({ slug }: { slug: LegalSlug }) {
  const doc = legalDoc(slug);
  return (
    <article className="pb-28 pt-[calc(var(--header-h)+3rem)] lg:pt-[calc(var(--header-h)+5rem)]">
      <div className="shell">
        <Breadcrumbs items={[{ name: doc.title, path: `/${slug}/` }]} />
        <div className="editorial-grid mt-10 gap-y-10">
          <header className="col-span-4 lg:col-span-4">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
              <p className="t-label text-ink">Legal</p>
              <SplitTextHeading as="h1" trigger="load" className="t-display mt-6">{doc.title}</SplitTextHeading>
            </div>
          </header>
          <div className="col-span-4 lg:col-span-7 lg:col-start-6">
            <ArticleBody article={{ body: doc.body, bodyFormat: "markdown", images: {} }} />
          </div>
        </div>
      </div>
    </article>
  );
}
