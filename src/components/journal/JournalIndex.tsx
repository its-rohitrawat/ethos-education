import Link from "next/link";
import { Breadcrumbs, type Crumb } from "@/components/content/Breadcrumbs";
import { FinalCTA } from "@/components/content/FinalCTA";
import { SplitTextHeading } from "@/components/motion/SplitTextHeading";
import { Label } from "@/components/ui/primitives";
import { journalTopics } from "@/content/journal";
import type { JournalArticle, JournalTopic } from "@/content/types";
import { JournalCard } from "./JournalCard";

/** Shared layout for /blog/ and /blog/topic/[topic]/ — topic navigation is plain links (crawlable, no JS). */
export function JournalIndex({
  articles,
  activeTopic,
  title,
  intro,
  crumbs,
}: {
  articles: JournalArticle[];
  activeTopic?: JournalTopic;
  title: React.ReactNode;
  intro: string;
  crumbs: Crumb[];
}) {
  const [lead, ...rest] = articles;
  return (
    <>
      <section className="panel-sage relative pb-[calc(var(--radius-panel)+clamp(2.5rem,5vw,4.5rem))] pt-[calc(var(--header-h)+1.5rem)] lg:pt-[calc(var(--header-h)+2.5rem)]">
        <div className="shell">
          <Breadcrumbs items={crumbs} />
          <div className="editorial-grid mt-10 gap-y-8">
            <div className="col-span-4 lg:col-span-8">
              <Label>The Ethos Journal</Label>
              <SplitTextHeading as="h1" trigger="load" className="t-display mt-5">
                {title}
              </SplitTextHeading>
            </div>
            <p className="col-span-4 self-end text-ink/85 lg:col-span-4">{intro}</p>
          </div>
          <nav aria-label="Journal topics" className="mt-12 border-t border-ink/20 pt-5">
            <ul className="flex flex-wrap gap-2">
              <li>
                <Link
                  href="/blog/"
                  aria-current={!activeTopic ? "page" : undefined}
                  className="inline-flex min-h-10 items-center rounded-full border border-ink/30 px-4 text-[0.9rem] hover:border-ink aria-[current=page]:border-ink aria-[current=page]:bg-ink aria-[current=page]:text-canvas"
                >
                  All
                </Link>
              </li>
              {journalTopics.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/blog/topic/${t.slug}/`}
                    aria-current={activeTopic === t.slug ? "page" : undefined}
                    className="inline-flex min-h-10 items-center rounded-full border border-ink/30 px-4 text-[0.9rem] hover:border-ink aria-[current=page]:border-ink aria-[current=page]:bg-ink aria-[current=page]:text-canvas"
                  >
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[var(--radius-panel)] rounded-t-[var(--radius-panel)] bg-canvas" />
      </section>

      <section className="section-y pt-14">
        <div className="shell">
          {lead ? (
            <div className="border-b border-line pb-16">
              <JournalCard article={lead} size="large" priority />
            </div>
          ) : null}
          <div className="mt-16 grid gap-x-[var(--column-gap)] gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((a) => (
              <JournalCard key={a.slug} article={a} />
            ))}
          </div>
        </div>
      </section>
      <FinalCTA source={activeTopic ? `journal-${activeTopic}` : "journal-index"} />
    </>
  );
}
