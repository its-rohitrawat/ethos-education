import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { FinalCTA } from "@/components/content/FinalCTA";
import { PageHero } from "@/components/content/PageHero";
import { ConsultationButton } from "@/components/consultation/ConsultationButton";
import { Reveal } from "@/components/motion/Reveal";
import { ProgrammeCard } from "@/components/home/HomeSections";
import { ArrowLink, CheckList, Label, PendingBadge, SectionHeader } from "@/components/ui/primitives";
import { programmes as localProgrammes } from "@/content/programmes";
import { getFaqs, getProgramme, getProgrammes } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return localProgrammes.map((p) => ({ programme: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/admission/[programme]">): Promise<Metadata> {
  const { programme: slug } = await params;
  const p = await getProgramme(slug);
  if (!p) return {};
  return pageMetadata({ title: p.seo.title, description: p.seo.description, path: `/admission/${p.slug}/`, image: { url: p.image.src, width: p.image.width, height: p.image.height, alt: p.image.alt } });
}

// params are awaited directly so unknown values return a real HTTP 404 (see docs/KNOWN-LIMITATIONS.md).
export default async function ProgrammePage({ params }: PageProps<"/admission/[programme]">) {
  const { programme: slug } = await params;
  const [p, all, faqs] = await Promise.all([getProgramme(slug), getProgrammes(), getFaqs()]);
  if (!p) notFound();
  const others = all.filter((o) => o.slug !== p.slug);
  const relevantFaqs = faqs.filter((f) => f.category === "programmes" || (p.slug === "scholarship-program" && f.category === "scholarships")).slice(0, 6);

  return (
    <>
      <PageHero
        label={p.kicker}
        title={p.name}
        intro={p.summary}
        crumbs={[
          { name: "Admissions", path: "/admission/" },
          { name: p.shortName, path: `/admission/${p.slug}/` },
        ]}
        image={p.image}
        actions={
          <>
            <ConsultationButton source={`programme-hero-${p.slug}`} service={p.slug}>
              Ask about this programme
            </ConsultationButton>
          </>
        }
      />

      <section className="section-y">
        <div className="shell grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-6 lg:col-span-7">
            {p.intro.map((para) => (
              <p key={para.slice(0, 24)} className="t-lead text-ink-soft first:text-ink">
                {para}
              </p>
            ))}
          </div>
          <div className="rounded-[var(--radius-card)] bg-mist p-8 lg:col-span-5">
            <h2 className="t-card">Who it’s for</h2>
            <CheckList items={p.forWhom} className="mt-5" />
          </div>
        </div>
      </section>

      {p.terms ? (
        <section className="pb-[var(--section-y)]" aria-labelledby="terms-title">
          <div className="shell">
            <div className="surface-oxblood grid gap-8 rounded-[var(--radius-card)] p-8 sm:p-12 lg:grid-cols-12 lg:p-14">
              <div className="lg:col-span-4">
                <Label className="text-accent-soft">Clarity first</Label>
                <h2 id="terms-title" className="t-title mt-3">
                  {p.terms.heading}
                </h2>
                {!p.terms.verified ? <span className="mt-5 inline-block"><PendingBadge note={p.terms.note} /></span> : null}
              </div>
              <p className="t-lead text-canvas/85 lg:col-span-7 lg:col-start-6">{p.terms.text}</p>
            </div>
          </div>
        </section>
      ) : null}

      <section className="section-y bg-mist" aria-labelledby="includes-title">
        <div className="shell">
          <SectionHeader
            label="What’s included"
            title={
              <span id="includes-title">
                Support at <em>every stage.</em>
              </span>
            }
          />
          <Reveal as="ul" className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
            {p.includes.map((inc, i) => (
              <li key={inc.title} data-reveal className="rounded-[var(--radius-card)] bg-canvas p-7">
                <span className="text-[0.8125rem] font-semibold text-accent-ink">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="t-card mt-3">{inc.title}</h3>
                <p className="mt-2 text-[0.95rem] text-ink-soft">{inc.text}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {p.components ? (
        <section className="section-y" aria-labelledby="components-title">
          <div className="shell">
            <SectionHeader
              label="Inside the programme"
              title={
                <span id="components-title">
                  Two offerings, <em>one plan.</em>
                </span>
              }
            />
            <div className="mt-14 grid gap-3 lg:grid-cols-2">
              {p.components.map((c) => (
                <article key={c.id} id={c.id} className="flex scroll-mt-28 flex-col rounded-[var(--radius-card)] bg-mist p-8 lg:p-10">
                  <h3 className="t-title !text-[clamp(1.9rem,1.35rem+1.6vw,2.8rem)]">{c.name}</h3>
                  <p className="mt-4 text-ink-soft">{c.summary}</p>
                  <CheckList items={c.points} className="mt-7" />
                  {c.href ? <ArrowLink href={c.href} className="mt-auto pt-8">Explore {c.name === "IVY MENTOR" ? "Ivy Mentors" : c.name}</ArrowLink> : null}
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {relevantFaqs.length ? (
        <section className={`section-y ${p.components ? "bg-mist" : ""}`} aria-labelledby="programme-faq-title">
          <div className="shell">
            <SectionHeader label="Questions" title={<span id="programme-faq-title">Before you decide.</span>} />
            <div className="mt-12 max-w-4xl">
              <FAQAccordion faqs={relevantFaqs} />
            </div>
          </div>
        </section>
      ) : null}

      <section className="section-y" aria-labelledby="others-title">
        <div className="shell">
          <SectionHeader
            label="Other programmes"
            title={
              <span id="others-title">
                Explore <em>another path.</em>
              </span>
            }
          />
          <ul className="mt-14 grid gap-3 md:grid-cols-2">
            {others.map((o) => (
              <li key={o.slug}>
                <ProgrammeCard programme={o} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCTA source={`programme-final-${p.slug}`} service={p.slug} />
    </>
  );
}
