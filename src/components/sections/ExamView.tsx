import Link from "next/link";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { FinalCTA } from "@/components/content/FinalCTA";
import { JsonLd } from "@/components/content/JsonLd";
import { PageHero } from "@/components/content/PageHero";
import { ConsultationButton } from "@/components/consultation/ConsultationButton";
import { CheckList, ChevronIcon, Label, NumberedList, SectionHeader } from "@/components/ui/primitives";
import { examCategoryLabels, exams } from "@/content/exams";
import type { Exam } from "@/content/types";
import { faqJsonLd } from "@/lib/seo";
import { SplitTextHeading } from "@/components/motion/SplitTextHeading";

const fmt = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export function ExamView({ exam }: { exam: Exam }) {
  const related = exams.filter((e) => e.slug !== exam.slug && e.categories.some((c) => exam.categories.includes(c))).slice(0, 4);
  return (
    <>
      <PageHero
        label="Test preparation"
        title={
          <>
            {exam.name} <em>preparation.</em>
          </>
        }
        intro={exam.tagline}
        crumbs={[
          { name: "Test Prep", path: "/test-prep/" },
          { name: exam.name, path: exam.path },
        ]}
        actions={
          <ConsultationButton source={`exam-hero-${exam.slug}`} service="test-prep">
            Plan my {exam.name} preparation
          </ConsultationButton>
        }
        aside={
          <dl className="rounded-[var(--radius-card)] bg-mist px-6 py-2 text-[0.95rem]">
            {[
              ["Full name", exam.fullName],
              ["Administered by", exam.administeredBy],
              ["Used for", exam.categories.map((c) => examCategoryLabels[c]).join(", ")],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-6 border-b border-line py-3.5 last:border-0">
                <dt className="text-ink-soft">{k}</dt>
                <dd className="text-right">{v}</dd>
              </div>
            ))}
          </dl>
        }
      />

      <section className="section-y">
        <div className="shell grid gap-3 lg:grid-cols-2">
          <div className="rounded-[var(--radius-card)] bg-mist p-8 lg:p-10">
            <h2 className="t-card">Who it’s for</h2>
            <CheckList items={exam.forWhom} className="mt-5" />
          </div>
          <div className="rounded-[var(--radius-card)] bg-mist p-8 lg:p-10">
            <h2 className="t-card">What it measures</h2>
            <p className="mt-5 text-[1.05rem]">{exam.measures}</p>
            <p className="mt-6 text-[0.9rem] text-ink-soft">
              Formats, fees and score requirements change. Always confirm current details with{" "}
              <a href={exam.officialUrl} target="_blank" rel="noopener noreferrer" className="text-brand-bright hover:underline">
                {exam.administeredBy.split(",")[0]} (official site)
              </a>
              . Last reviewed {fmt(exam.lastReviewed)}.
            </p>
          </div>
        </div>
      </section>

      <section className="section-y bg-mist" aria-labelledby="exam-help-title">
        <div className="shell grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Label>How Ethos helps</Label>
            <SplitTextHeading id="exam-help-title" className="t-display mt-3">
              A plan built around <em>your shortlist.</em>
            </SplitTextHeading>
            <p className="t-lead mt-6 text-ink-soft">{exam.approach}</p>
          </div>
          <NumberedList items={exam.ethosSupport} className="lg:col-span-7" />
        </div>
      </section>

      {exam.faqs.length ? (
        <section className="section-y" aria-labelledby="exam-faq-title">
          <div className="shell">
            <SectionHeader label="Questions" title={<span id="exam-faq-title">{exam.name}, answered.</span>} />
            <div className="mt-12 max-w-4xl">
              <FAQAccordion faqs={exam.faqs} />
            </div>
          </div>
          <JsonLd data={faqJsonLd(exam.faqs)} />
        </section>
      ) : null}

      {related.length ? (
        <section className="pb-[var(--section-y)]">
          <div className="shell">
            <h2 className="text-[1.25rem] font-semibold tracking-[-0.02em]">Related tests</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={r.path} className="group flex items-center justify-between rounded-[var(--radius-card)] bg-mist p-6 transition-colors hover:bg-cloud">
                    <span className="t-card">{r.name}</span>
                    <ChevronIcon className="text-brand-bright transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <FinalCTA source={`exam-final-${exam.slug}`} service="test-prep" />
    </>
  );
}
