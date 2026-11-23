import type { Metadata } from "next";
import { FinalCTA } from "@/components/content/FinalCTA";
import { PageHero } from "@/components/content/PageHero";
import { ConsultationButton } from "@/components/consultation/ConsultationButton";
import { MentorshipSection } from "@/components/home/HomeSections";
import { Reveal } from "@/components/motion/Reveal";
import { SplitTextHeading } from "@/components/motion/SplitTextHeading";
import { Label, NumberedList, PendingBadge } from "@/components/ui/primitives";
import { getMentorRoles } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
import { SHOW_UNVERIFIED } from "@/lib/verification";

export const metadata: Metadata = pageMetadata({
  title: "Ivy League Admissions Mentors for Indian Students",
  description:
    "Ivy Mentors at Ethos Education: guided research, academic mentorship and the 5:1 specialist model for students applying to the world’s most selective universities.",
  path: "/ivy-mentors/",
});

const formats = [
  { title: "Independent research studies", text: "A focused research question, explored over months with expert guidance and regular feedback." },
  { title: "Faculty-guided projects", text: "Structured work alongside experienced academics, building real research and writing skills." },
  { title: "Advanced academic exploration", text: "Going beyond the school syllabus in the field you intend to study — and being able to talk about it." },
];

const help = [
  "Stream and course selection",
  "Clarity on universities and degree programmes",
  "Scholarship and funding opportunities",
  "Test-preparation strategy",
  "The application process, step by step",
  "Alumni perspectives and career advice",
  "Internship and research planning",
  "Teaching and research assistantships",
  "Post-study work and career paths",
];

/** Claims from the current site that Ethos must substantiate before they are published. */
const pendingClaims = [
  "Mentor panel including faculty and researchers from Harvard, MIT, Duke, Columbia and the University of Pennsylvania",
  "A community of 500+ Ivy League mentors, students and graduates",
  "Student projects published in the Journal of Student Research, Journal of Young Investigators, Journeys, Journal of International Marketing and Inventive Material Science and Applications",
];

export default async function IvyMentorsPage() {
  const roles = await getMentorRoles();
  return (
    <>
      <PageHero
        label="Ivy Mentors"
        title={
          <>
            Mentorship from people <em>who’ve been there.</em>
          </>
        }
        intro="Guided research, honest perspective on campuses and courses, and a five-specialist team behind every application — for students aiming at the most selective universities in the world."
        crumbs={[{ name: "Ivy Mentors", path: "/ivy-mentors/" }]}
        image={{ src: "/media/photos/mentoring.webp", alt: "A mentor and a student in a one-to-one conversation", width: 2400, height: 1600, provisional: true }}
        actions={<ConsultationButton source="ivy-hero" service="ivy-mentors">Talk to us about mentorship</ConsultationButton>}
      />

      <section className="section-y" aria-labelledby="research-title">
        <div className="shell">
          <div className="editorial-grid gap-y-8">
            <div className="col-span-4 lg:col-span-7">
              <Label index="01">IVY MENTOR</Label>
              <SplitTextHeading id="research-title" className="t-display mt-8">
                Expand what you know <em>through research.</em>
              </SplitTextHeading>
            </div>
            <p className="t-lead col-span-4 self-end text-ink-soft lg:col-span-4 lg:col-start-9">
              Selective universities look for intellectual curiosity that goes beyond the classroom. Guided research turns that curiosity into work you can show.
            </p>
          </div>
          <Reveal className="mt-14 grid gap-3 md:grid-cols-3">
            {formats.map((f, i) => (
              <div key={f.title} data-reveal className="rounded-[var(--radius-card)] bg-mist p-6 lg:p-8">
                <p className="t-label text-ink">Format {String(i + 1).padStart(2, "0")}</p>
                <h3 className="t-card mt-5">{f.title}</h3>
                <p className="mt-3 text-ink-soft">{f.text}</p>
              </div>
            ))}
          </Reveal>
          <p className="t-body mt-10 max-w-3xl text-ink-soft">
            We then help you use that work well in your applications — in reports, essays and recommendations — so it becomes part of a coherent academic story.
          </p>
        </div>
      </section>

      <MentorshipSection roles={roles} />

      <section className="section-y" aria-labelledby="help-title">
        <div className="shell grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Label>How our mentors help</Label>
            <SplitTextHeading id="help-title" className="t-display mt-3">
              Insight you <em>can’t get</em> from a brochure.
            </SplitTextHeading>
            <p className="t-lead mt-6 text-ink-soft">
              Independent, transparent guidance focused on one thing: the right decision for you.
            </p>
          </div>
          <NumberedList items={help} surface="bg-mist" className="lg:col-span-7" />
        </div>
      </section>

      {SHOW_UNVERIFIED && process.env.NEXT_PUBLIC_VERIFY_BADGES === "true" ? (
        <section className="pb-[var(--section-y)]">
          <div className="shell">
            <div className="rounded-[var(--radius-card)] border border-dashed border-accent/60 p-8">
              <div className="flex flex-wrap items-center gap-4">
                <h2 className="t-label">Claims awaiting verification (preview only)</h2>
                <PendingBadge />
              </div>
              <ul className="mt-5 list-disc space-y-2 pl-5 text-ink-soft">
                {pendingClaims.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-ink-soft">These appear on the current website. They are not shown in production until Ethos provides evidence (see docs/CONTENT-VERIFICATION.md).</p>
            </div>
          </div>
        </section>
      ) : null}

      <FinalCTA source="ivy-final" service="ivy-mentors" />
    </>
  );
}
