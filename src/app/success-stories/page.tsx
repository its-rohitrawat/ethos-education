import type { Metadata } from "next";
import { FinalCTA } from "@/components/content/FinalCTA";
import { PageHero } from "@/components/content/PageHero";
import { ConsultationButton } from "@/components/consultation/ConsultationButton";
import { OutcomesList } from "@/components/home/HomeSections";
import { Reveal } from "@/components/motion/Reveal";
import { VideoTestimonial } from "@/components/stories/VideoTestimonial";
import { Label, PendingBadge } from "@/components/ui/primitives";
import { getOutcomes, getVideoStories } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
import { SplitTextHeading } from "@/components/motion/SplitTextHeading";

export const metadata: Metadata = pageMetadata({
  title: "Abroad Admission Success Stories",
  description:
    "Students and parents describe their journeys with Ethos Education — to Columbia, the University of Pennsylvania, Trinity College Dublin, the University of Alberta and more.",
  path: "/success-stories/",
});

const order = ["USA", "UK", "Canada", "Ireland", "France", "Netherlands", "Singapore"];

export default async function SuccessStoriesPage() {
  const [stories, outcomes] = await Promise.all([getVideoStories(), getOutcomes()]);
  const groups = order
    .map((dest) => ({ dest, items: outcomes.filter((o) => o.destination === dest) }))
    .filter((g) => g.items.length);

  return (
    <>
      <PageHero
        label="Success stories"
        title={
          <>
            Behind every acceptance is <em>a human story.</em>
          </>
        }
        intro="Students and parents, in their own words — about the decisions, the work and the people behind each offer."
        crumbs={[{ name: "Success Stories", path: "/success-stories/" }]}
        actions={<ConsultationButton source="stories-hero">Start your own story</ConsultationButton>}
      />

      {stories.length ? (
        <section className="section-y pt-16">
          <div className="shell">
            <Label index="01">In their words</Label>
            <Reveal className="mt-12 grid gap-x-[var(--column-gap)] gap-y-20 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
              {stories.map((s) => (
                <div key={s.id} data-reveal>
                  <VideoTestimonial story={s} />
                </div>
              ))}
            </Reveal>
            <p className="t-label mt-10 text-xs text-ink-soft">Captions are auto-generated. Quotes are verbatim excerpts from each video.</p>
          </div>
        </section>
      ) : (
        <section className="section-y pt-16">
          <div className="shell">
            <p className="t-lead max-w-2xl text-ink-soft">Our students’ stories are being prepared for this page. In the meantime, a counsellor can introduce you to families we have worked with.</p>
          </div>
        </section>
      )}

      {groups.length ? (
        <section className="section-y bg-mist">
          <div className="shell">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <Label index="02">Selected outcomes</Label>
                <SplitTextHeading className="t-display mt-8">Where our students went.</SplitTextHeading>
              </div>
              {outcomes.some((o) => !o.verified) ? <PendingBadge note="Confirm consent for each name before launch" /> : null}
            </div>
            <div className="mt-14 space-y-14">
              {groups.map((g) => (
                <div key={g.dest}>
                  <h3 className="t-label mb-2 text-ink">
                    {g.dest} · {g.items.length}
                  </h3>
                  <OutcomesList outcomes={g.items} />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <FinalCTA source="stories-final" />
    </>
  );
}
