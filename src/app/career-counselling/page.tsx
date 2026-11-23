import type { Metadata } from "next";
import { FinalCTA } from "@/components/content/FinalCTA";
import { PageHero } from "@/components/content/PageHero";
import { ConsultationButton } from "@/components/consultation/ConsultationButton";
import { Reveal } from "@/components/motion/Reveal";
import { CheckList, Label, SectionHeader } from "@/components/ui/primitives";
import { careerApproach, careerPaths } from "@/content/approach";
import { pageMetadata } from "@/lib/seo";
import { SplitTextHeading } from "@/components/motion/SplitTextHeading";

export const metadata: Metadata = pageMetadata({
  title: "Career Counselling for Study Abroad",
  description:
    "Career counselling with psychometric, personality and aptitude assessments for school students, graduates and working professionals — interpreted by experienced counsellors.",
  path: "/career-counselling/",
});

const why = [
  "Understand your strengths, interests and potential",
  "A structured roadmap for study, work or a transition",
  "Decisions made with evidence, not second-guessing",
  "A career aligned with your skills and values",
];

export default function CareerCounsellingPage() {
  return (
    <>
      <PageHero
        label="Career counselling"
        title={
          <>
            Before choosing a destination, <em>discover your direction.</em>
          </>
        }
        intro="Whether you study IB, CBSE, ICSE, ISC, a state board or Cambridge — or have already graduated — our counselling uses psychometric, personality and aptitude assessments to give clear, research-backed guidance on what to study and why."
        crumbs={[{ name: "Career Counselling", path: "/career-counselling/" }]}
        image={{ src: "/media/photos/counselling-session.webp", alt: "A counsellor in conversation with a student", width: 2400, height: 1350, provisional: true }}
        actions={<ConsultationButton source="career-hero" service="career-counselling">Book a counselling session</ConsultationButton>}
      />

      <section className="section-y" aria-labelledby="paths-title">
        <div className="shell">
          <SectionHeader
            label="Who we help"
            title={
              <span id="paths-title">
                Three stages of life. <em>Three kinds of question.</em>
              </span>
            }
          />
          <Reveal className="mt-14 grid gap-3 md:grid-cols-3" stagger={0.08}>
            {careerPaths.map((p) => (
              <article key={p.id} id={p.id} data-reveal className="flex flex-col rounded-[var(--radius-card)] bg-mist p-7 lg:p-9">
                <h3 className="t-card">{p.label}</h3>
                <p className="mt-3 text-ink-soft">{p.lede}</p>
                <CheckList items={p.points} className="mt-7 text-[0.95rem]" />
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section-y bg-mist" aria-labelledby="approach-title">
        <div className="shell">
          <SectionHeader
            label="Our approach"
            title={
              <span id="approach-title">
                Personal, structured — <em>and ongoing.</em>
              </span>
            }
          />
          <Reveal className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
            {careerApproach.map((a, i) => (
              <div key={a.title} data-reveal className="rounded-[var(--radius-card)] bg-canvas p-7">
                <p className="text-[0.8125rem] font-semibold text-accent-ink">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="t-card mt-3">{a.title}</h3>
                <p className="mt-2 text-[0.95rem] text-ink-soft">{a.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section-y" aria-labelledby="how-title">
        <div className="shell grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Label>How we work with you</Label>
            <SplitTextHeading id="how-title" className="t-display mt-3">
              It starts with <em>a conversation.</em>
            </SplitTextHeading>
            <p className="t-lead mt-6 text-ink-soft">
              A one-to-one session to understand where you are, followed by assessments and a written roadmap you can return to. A short online quiz can be a starting point, but it is never a substitute for a validated assessment interpreted by a counsellor.
            </p>
            <ConsultationButton source="career-how" service="career-counselling" className="mt-8">
              Book a counselling session
            </ConsultationButton>
          </div>
          <div className="rounded-[var(--radius-card)] bg-mist p-8 lg:p-10">
            <p className="t-card">What you leave with</p>
            <CheckList items={why} className="mt-6 text-[1.05rem]" />
          </div>
        </div>
      </section>

      <FinalCTA source="career-final" service="career-counselling" />
    </>
  );
}
