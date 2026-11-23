import type { Metadata } from "next";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { FinalCTA } from "@/components/content/FinalCTA";
import { JsonLd } from "@/components/content/JsonLd";
import { PageHero } from "@/components/content/PageHero";
import { ConsultationButton } from "@/components/consultation/ConsultationButton";
import type { Faq } from "@/content/types";
import { getFaqs } from "@/lib/cms";
import { faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Study Abroad FAQs",
  description: "Answers to common questions about studying abroad: when to start, shortlisting, Ivy League admissions, tests, scholarships, visas and how Ethos works.",
  path: "/faq/",
});

const groups: { category: Faq["category"][]; title: string }[] = [
  { category: ["process"], title: "Planning & applications" },
  { category: ["programmes", "mentorship", "consultation"], title: "Working with Ethos" },
  { category: ["tests"], title: "Tests" },
  { category: ["scholarships", "visas"], title: "Funding & visas" },
];

export default async function FaqPage() {
  const faqs = await getFaqs();
  return (
    <>
      <PageHero
        label="FAQs"
        title={
          <>
            Questions, <em>answered.</em>
          </>
        }
        intro="Honest answers to the questions students and parents ask us most. Requirements change — where an answer depends on current rules, we say so."
        crumbs={[{ name: "FAQs", path: "/faq/" }]}
        actions={<ConsultationButton source="faq-hero">Ask a counsellor</ConsultationButton>}
      />
      <section className="section-y pt-16">
        <div className="shell space-y-20">
          {groups.map((g) => {
            const items = faqs.filter((f) => g.category.includes(f.category));
            if (!items.length) return null;
            return (
              <div key={g.title} className="editorial-grid gap-y-8">
                <h2 className="t-title col-span-4 lg:col-span-4">{g.title}</h2>
                <div className="col-span-4 lg:col-span-8">
                  <FAQAccordion faqs={items} />
                </div>
              </div>
            );
          })}
        </div>
        <JsonLd data={faqJsonLd(faqs)} />
      </section>
      <FinalCTA source="faq-final" />
    </>
  );
}
