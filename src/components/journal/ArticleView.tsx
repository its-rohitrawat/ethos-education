import Image from "next/image";
import { Breadcrumbs } from "@/components/content/Breadcrumbs";
import { FinalCTA } from "@/components/content/FinalCTA";
import { JsonLd } from "@/components/content/JsonLd";
import { ConsultationButton } from "@/components/consultation/ConsultationButton";
import { SplitTextHeading } from "@/components/motion/SplitTextHeading";
import { Label } from "@/components/ui/primitives";
import { topicLabel } from "@/content/journal";
import type { JournalArticle } from "@/content/types";
import { articleJsonLd } from "@/lib/seo";
import { ArticleBody } from "./ArticleBody";
import { JournalCard } from "./JournalCard";

const fmt = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
const TIME_SENSITIVE = new Set(["visas-careers", "test-prep", "scholarships-funding", "destinations"]);

export function ArticleView({ article, related }: { article: JournalArticle; related: JournalArticle[] }) {
  const updated = article.updatedAt && article.updatedAt.slice(0, 10) !== article.publishedAt.slice(0, 10);
  return (
    <>
      <article>
        <header className="pt-12 lg:pt-16">
          <div className="shell">
            <Breadcrumbs
              items={[
                { name: "Journal", path: "/blog/" },
                { name: topicLabel(article.topic), path: `/blog/topic/${article.topic}/` },
              ]}
            />
            <div className="mx-auto mt-12 max-w-5xl text-center">
              <Label className="justify-center">{topicLabel(article.topic)}</Label>
              <SplitTextHeading as="h1" trigger="load" className="mt-6 font-display text-[clamp(2.1rem,1.4rem+2.8vw,3.6rem)] leading-[0.98] tracking-[-0.02em] [text-wrap:balance]">
                {article.title}
              </SplitTextHeading>
              {article.excerpt ? <p className="t-lead mx-auto mt-8 max-w-2xl text-ink-soft">{article.excerpt}</p> : null}
              <p className="t-label mt-8 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-ink-soft">
                <span>{article.author ?? "Ethos Education"}</span>
                <span aria-hidden="true">·</span>
                <time dateTime={article.publishedAt}>{fmt(article.publishedAt)}</time>
                {updated ? (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>
                      Updated <time dateTime={article.updatedAt}>{fmt(article.updatedAt)}</time>
                    </span>
                  </>
                ) : null}
                <span aria-hidden="true">·</span>
                <span>{article.readingMinutes} min read</span>
              </p>
            </div>
          </div>
          {article.featuredImage ? (
            <div className="shell mt-14">
              <div className="relative mx-auto aspect-[16/9] max-w-6xl overflow-hidden bg-cloud">
                <Image
                  src={article.featuredImage.src}
                  alt={article.featuredImage.alt}
                  fill
                  loading="eager"
                  fetchPriority="high"
                  sizes="(min-width: 1280px) 1152px, 94vw"
                  className="object-cover"
                />
              </div>
            </div>
          ) : null}
        </header>

        <div className="shell section-y pt-16">
          <div className="editorial-grid gap-y-12">
            <aside className="order-2 col-span-4 lg:order-1 lg:col-span-3">
              <div className="rounded-[var(--radius-card)] bg-mist p-6 lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
                <p className="t-subtitle">Planning your own application?</p>
                <p className="mt-3 text-[0.95rem] text-ink-soft">A counsellor can turn this guide into a plan for your profile and shortlist.</p>
                <ConsultationButton source={`article-${article.slug}`} className="mt-6 w-full" arrow={false}>
                  Book a consultation
                </ConsultationButton>
              </div>
            </aside>
            <div className="order-1 col-span-4 lg:order-2 lg:col-span-7 lg:col-start-5">
              <ArticleBody article={article} />
              {TIME_SENSITIVE.has(article.topic) ? (
                <p className="mt-14 border-l-2 border-accent bg-mist px-5 py-4 text-[0.92rem] text-ink-soft">
                  First published {fmt(article.publishedAt)}. Admissions requirements, costs and visa rules change — confirm current details with official sources or your Ethos counsellor before you act.
                </p>
              ) : null}
            </div>
          </div>
        </div>
        <JsonLd data={articleJsonLd(article)} />
      </article>

      {related.length ? (
        <section className="section-y border-t border-line bg-mist pt-20">
          <div className="shell">
            <Label>Further reading</Label>
            <div className="mt-10 grid gap-x-[var(--column-gap)] gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((a) => (
                <JournalCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <FinalCTA source={`article-final-${article.slug}`} />
    </>
  );
}
