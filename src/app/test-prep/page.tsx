import type { Metadata } from "next";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { FinalCTA } from "@/components/content/FinalCTA";
import { PageHero } from "@/components/content/PageHero";
import { ConsultationButton } from "@/components/consultation/ConsultationButton";
import { Reveal } from "@/components/motion/Reveal";
import { TestPrepGrid } from "@/components/sections/TestPrepGrid";
import { toExamSummary } from "@/content/exams";
import { SectionHeader } from "@/components/ui/primitives";
import { getExams, getFaqs } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Test Preparation — SAT, ACT, AP, GRE, GMAT, IELTS, TOEFL, PTE, DET & ESAT",
  description:
    "Personalised preparation for ten admissions and English tests, planned around the requirements of the universities on your shortlist.",
  path: "/test-prep/",
});

const method = [
  { title: "Diagnose", text: "A full diagnostic to find your real starting point and the sections that cost you most." },
  { title: "Plan", text: "A target and timeline set by your shortlist and deadlines — not by a generic score." },
  { title: "Practise", text: "Timed, test-realistic practice with one-to-one help where it matters." },
  { title: "Review", text: "Every error pattern analysed, so the same mistakes stop repeating." },
];

export default async function TestPrepPage() {
  const [exams, faqs] = await Promise.all([getExams(), getFaqs()]);
  return (
    <>
      <PageHero
        label="Test preparation"
        title={
          <>
            Preparation with <em>purpose.</em>
          </>
        }
        intro="Ten tests, one principle: prepare for what your shortlist actually requires. We help you decide which tests to take, when to take them, and how to reach the score that matters."
        crumbs={[{ name: "Test Prep", path: "/test-prep/" }]}
        actions={<ConsultationButton source="testprep-hero" service="test-prep">Plan my test preparation</ConsultationButton>}
      />
      <section className="section-y pt-16">
        <div className="shell">
          <TestPrepGrid exams={exams.map(toExamSummary)} />
        </div>
      </section>
      <section className="section-y bg-mist" aria-labelledby="method-title">
        <div className="shell">
          <SectionHeader
            label="How we prepare"
            title={
              <span id="method-title">
                Four steps, <em>every test.</em>
              </span>
            }
          />
          <Reveal className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
            {method.map((m, i) => (
              <div key={m.title} data-reveal className="rounded-[var(--radius-card)] bg-canvas p-7">
                <span className="text-[0.8125rem] font-semibold text-accent-ink">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="t-card mt-3">{m.title}</h3>
                <p className="mt-2 text-[0.95rem] text-ink-soft">{m.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
      <section className="section-y" aria-labelledby="tests-faq-title">
        <div className="shell">
          <SectionHeader label="Questions" title={<span id="tests-faq-title">About tests.</span>} />
          <div className="mx-auto mt-10 max-w-3xl">
            <FAQAccordion faqs={faqs.filter((f) => f.category === "tests")} />
          </div>
        </div>
      </section>
      <FinalCTA source="testprep-final" service="test-prep" />
    </>
  );
}
