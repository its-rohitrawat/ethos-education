import type { Metadata } from "next";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { FinalCTA } from "@/components/content/FinalCTA";
import { PageHero } from "@/components/content/PageHero";
import { ConsultationButton } from "@/components/consultation/ConsultationButton";
import { ProcessSection, ProgrammeCard } from "@/components/home/HomeSections";
import { Reveal } from "@/components/motion/Reveal";
import { Label } from "@/components/ui/primitives";
import { getFaqs, getProcessSteps, getProgrammes } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
import { SplitTextHeading } from "@/components/motion/SplitTextHeading";

export const metadata: Metadata = pageMetadata({
  title: "University Admission Guidance Services",
  description:
    "Admissions guidance for global universities from Gurugram: Dream School Application, the Guaranteed Admissions Program and the Scholarship Program — strategy, essays, scholarships and visas.",
  path: "/admission/",
});

export default async function AdmissionPage() {
  const [programmes, steps, faqs] = await Promise.all([getProgrammes(), getProcessSteps(), getFaqs()]);
  return (
    <>
      <PageHero
        label="Admissions"
        title={
          <>
            Your path to <em>global universities.</em>
          </>
        }
        intro="From application strategy to visa preparation, three programmes support every stage of the journey — choose the one built around your kind of goal."
        crumbs={[{ name: "Admissions", path: "/admission/" }]}
        actions={<ConsultationButton source="admission-hero">Find the right programme</ConsultationButton>}
      />
      <section className="section-y pt-16">
        <div className="shell">
          <Label index="01">Our programmes</Label>
          <Reveal className="mt-12 grid gap-x-[var(--column-gap)] gap-y-20 lg:grid-cols-3" stagger={0.12}>
            {programmes.map((p) => (
              <div key={p.slug} data-reveal>
                <ProgrammeCard programme={p} layout="index" />
              </div>
            ))}
          </Reveal>
        </div>
      </section>
      <ProcessSection steps={steps} />
      <section className="section-y bg-mist">
        <div className="shell editorial-grid gap-y-10">
          <div className="col-span-4 lg:col-span-4">
            <Label>Questions</Label>
            <SplitTextHeading className="t-display mt-6">Choosing well.</SplitTextHeading>
          </div>
          <div className="col-span-4 lg:col-span-8">
            <FAQAccordion faqs={faqs.filter((f) => ["programmes", "process", "scholarships"].includes(f.category)).slice(0, 8)} />
          </div>
        </div>
      </section>
      <FinalCTA source="admission-final" />
    </>
  );
}
