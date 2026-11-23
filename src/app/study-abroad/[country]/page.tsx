import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FinalCTA } from "@/components/content/FinalCTA";
import { PageHero } from "@/components/content/PageHero";
import { ConsultationButton } from "@/components/consultation/ConsultationButton";
import { OutcomesList } from "@/components/home/HomeSections";
import { JournalCard } from "@/components/journal/JournalCard";
import { Reveal } from "@/components/motion/Reveal";
import { ChevronIcon, Label, NumberedList, PendingBadge, SectionHeader } from "@/components/ui/primitives";
import { destinations as localDestinations } from "@/content/destinations";
import { getArticles, getDestination, getExams, getOutcomes } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
import { SplitTextHeading } from "@/components/motion/SplitTextHeading";

export function generateStaticParams() {
  return localDestinations.map((d) => ({ country: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/study-abroad/[country]">): Promise<Metadata> {
  const { country } = await params;
  const d = await getDestination(country);
  return d ? pageMetadata({ title: d.seo.title, description: d.seo.description, path: d.path }) : {};
}

const keywords: Record<string, RegExp> = {
  usa: /\b(usa|us|united states|america|ivy|harvard|stanford|f-1|mit)\b/i,
  uk: /\b(uk|united kingdom|oxford|cambridge|britain|evisa)\b/i,
  canada: /\bcanada\b/i,
  europe: /\b(europe|european|germany|france|netherlands|ireland)\b/i,
  singapore: /\bsingapore\b/i,
};

const fmt = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { month: "long", year: "numeric" });

// params are awaited directly so unknown values return a real HTTP 404 (see docs/KNOWN-LIMITATIONS.md).
export default async function DestinationPage({ params }: PageProps<"/study-abroad/[country]">) {
  const { country } = await params;
  const [d, exams, outcomes, articles] = await Promise.all([getDestination(country), getExams(), getOutcomes(), getArticles()]);
  if (!d) notFound();
  const localOutcomes = outcomes.filter((o) => d.outcomeCountries.includes(o.destination));
  const relevantExams = exams.filter((e) => d.exams.includes(e.slug));
  const relatedArticles = articles.filter((a) => keywords[d.slug]?.test(a.title)).slice(0, 3);

  return (
    <>
      <PageHero
        label="Study abroad"
        title={d.name}
        intro={
          <>
            <span className="font-medium text-ink">{d.tagline}</span> {d.intro}
          </>
        }
        crumbs={[
          { name: "Study abroad", path: "/study-abroad/" },
          { name: d.name, path: d.path },
        ]}
        actions={
          <ConsultationButton source={`destination-hero-${d.slug}`}>
            Plan my applications to {d.shortName}
          </ConsultationButton>
        }
      />

      <section className="section-y" aria-labelledby="how-title">
        <div className="shell">
          <SectionHeader
            label="How applications work"
            title={
              <span id="how-title">
                Applying to <em>{d.shortName}.</em>
              </span>
            }
          />
          <Reveal as="ul" className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
            {d.howApplicationsWork.map((h, i) => (
              <li key={h.title} data-reveal className="rounded-[var(--radius-card)] bg-mist p-7">
                <span className="text-[0.8125rem] font-semibold text-accent-ink">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="t-card mt-3">{h.title}</h3>
                <p className="mt-2 text-[0.95rem] text-ink-soft">{h.text}</p>
              </li>
            ))}
          </Reveal>
          <p className="mt-5 text-[0.85rem] text-ink-soft">Last reviewed {fmt(d.lastReviewed)} · deadlines and visa rules change every year</p>
        </div>
      </section>

      <section className="section-y bg-mist" aria-labelledby="focus-title">
        <div className="shell grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Label>Where Ethos helps</Label>
            <SplitTextHeading id="focus-title" className="t-display mt-3">
              Guidance for <em>{d.shortName}</em> applications.
            </SplitTextHeading>
          </div>
          <NumberedList items={d.ethosFocus} className="lg:col-span-7" />
        </div>
      </section>

      <section className="section-y" aria-labelledby="tests-title">
        <div className="shell">
          <SectionHeader label="Tests to plan for" title={<span id="tests-title">The tests <em>that matter here.</em></span>} />
          <ul className="mt-10 flex flex-wrap gap-3">
            {relevantExams.map((e) => (
              <li key={e.slug}>
                <Link href={e.path} className="group inline-flex items-center gap-2 rounded-full bg-mist px-6 py-3.5 transition-colors hover:bg-cloud">
                  <span className="text-[1.15rem] font-semibold tracking-[-0.01em]">{e.name}</span>
                  <ChevronIcon className="text-brand-bright transition-transform group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>

          {localOutcomes.length ? (
            <div className="mt-20">
              <div className="mb-4 flex flex-wrap items-baseline justify-between gap-4">
                <h2 className="text-[1.25rem] font-semibold tracking-[-0.02em]">Selected outcomes · {d.name}</h2>
                {localOutcomes.some((o) => !o.verified) ? <PendingBadge note="Confirm consent for each name" /> : null}
              </div>
              <OutcomesList outcomes={localOutcomes} />
            </div>
          ) : null}
        </div>
      </section>

      {relatedArticles.length ? (
        <section className="section-y bg-mist" aria-labelledby="journal-title">
          <div className="shell">
            <SectionHeader label="From the Journal" title={<span id="journal-title">Read <em>before you apply.</em></span>} />
            <div className="mt-14 grid gap-x-[var(--column-gap)] gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {relatedArticles.map((a) => (
                <JournalCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <FinalCTA source={`destination-final-${d.slug}`} />
    </>
  );
}
