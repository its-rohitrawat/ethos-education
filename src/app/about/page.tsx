import type { Metadata } from "next";
import { FinalCTA } from "@/components/content/FinalCTA";
import { PageHero } from "@/components/content/PageHero";
import { ConsultationButton } from "@/components/consultation/ConsultationButton";
import { DifferenceSection, MentorshipSection } from "@/components/home/HomeSections";
import { Reveal } from "@/components/motion/Reveal";
import { RevealImage } from "@/components/motion/RevealImage";
import { ArrowLink, Label, SectionHeader } from "@/components/ui/primitives";
import { site } from "@/content/site";
import { getMentorRoles, getOffices } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
import { SplitTextHeading } from "@/components/motion/SplitTextHeading";

export const metadata: Metadata = pageMetadata({
  title: "About Ethos Education",
  description:
    "Ethos Education is an admissions consultancy in Gurugram. We start with where a student wants their life to go — then build the right fit, the right field and the right future.",
  path: "/about/",
});

const triad = [
  { title: "Right fit", text: "The country, campus and culture where you will thrive — not just the names on a ranking." },
  { title: "Right field", text: "The course that matches your strengths and the career you want." },
  { title: "Right future", text: "An application built around real outcomes: internships, scholarships and the first job after graduation." },
];

export default async function AboutPage() {
  const [roles, offices] = await Promise.all([getMentorRoles(), getOffices()]);
  return (
    <>
      <PageHero
        label="About Ethos"
        title={
          <>
            We start with where you want <em>your life to go.</em>
          </>
        }
        intro="Most admissions help begins with the application. Ours begins with you — your strengths, your goals and the career you’re working towards."
        crumbs={[{ name: "About", path: "/about/" }]}
        image={{ src: "/media/photos/campus-walk.webp", alt: "Students talking outside a university building", width: 2400, height: 1600, provisional: true }}
        actions={<ConsultationButton source="about-hero" arrow={false}>Book a consultation</ConsultationButton>}
      />

      <section className="section-y" aria-labelledby="triad-title">
        <div className="shell">
          <SectionHeader
            label="Our approach"
            title={
              <span id="triad-title">
                Right fit. Right field. <em>Right future.</em>
              </span>
            }
          />
          <Reveal className="mt-14 grid gap-3 md:grid-cols-3" stagger={0.08}>
            {triad.map((t) => (
              <div key={t.title} data-reveal className="rounded-[var(--radius-card)] bg-mist p-7 lg:p-9">
                <h3 className="t-card">{t.title}</h3>
                <p className="mt-2 text-ink-soft">{t.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="pb-[var(--section-y)]" aria-labelledby="insight-title">
        <div className="shell grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <RevealImage
            image={{ src: "/media/photos/library-hall.webp", alt: "A grand library hall with long reading tables", width: 2400, height: 1600, provisional: true }}
            sizes="(min-width: 1024px) 45vw, 92vw"
            className="aspect-[4/3] w-full rounded-[var(--radius-media)] bg-mist"
          />
          <div>
            <Label>The insight</Label>
            <SplitTextHeading id="insight-title" className="t-display mt-3">
              Admissions aren’t random. <em>They’re just not obvious.</em>
            </SplitTextHeading>
            <p className="t-lead mt-6 text-ink-soft">
              Every year, students with excellent grades miss out on the universities they worked hardest for. The difference is rarely talent — it’s clarity about which universities truly fit, what each one values, and how to tell your story.
            </p>
            <ArrowLink href="/success-stories/" className="mt-6">
              Read our students’ stories
            </ArrowLink>
          </div>
        </div>
      </section>

      <MentorshipSection roles={roles} />
      <DifferenceSection />

      <section className="pb-[var(--section-y)]" aria-labelledby="offices-title">
        <div className="shell">
          <SectionHeader
            label="Offices"
            title={
              <span id="offices-title">
                Based in Gurugram. <em>Working worldwide.</em>
              </span>
            }
            intro={
              <>
                Consultations in person or online. Call{" "}
                <a className="text-brand-bright hover:underline" href={`tel:${site.phone.e164}`}>
                  {site.phone.display}
                </a>{" "}
                or email{" "}
                <a className="text-brand-bright hover:underline" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
                .
              </>
            }
          />
          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {offices.map((o) => (
              <li key={o.city} className="rounded-[var(--radius-card)] bg-mist p-6">
                <p className="t-card">{o.city}</p>
                <p className="mt-1 text-[0.9rem] text-ink-soft">
                  {o.role ?? "Office"} · {o.region}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCTA source="about-final" />
    </>
  );
}
