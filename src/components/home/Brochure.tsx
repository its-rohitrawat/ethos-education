import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { ConsultationButton } from "@/components/consultation/ConsultationButton";
import { ConsultationForm } from "@/components/consultation/ConsultationForm";
import { TrackedLink } from "@/components/layout/TrackedLink";
import { StoryVideos, type StoryVideo } from "@/components/stories/StoryVideos";
import { ArrowLink, ButtonLink, CheckList, ChevronIcon, Label, SectionHeader } from "@/components/ui/primitives";
import { site } from "@/content/site";
import type { Destination, Faq, ProcessStep, Stat, VideoStory } from "@/content/types";

/* ==================================================================================================
   Homepage in the layout of the original ethoseducation.world (professional brochure, no effects):
   hero with video · numbers · student videos · what separates us · six steps · career counselling ·
   consultation form · destinations · FAQ.
   ================================================================================================== */

export const toStoryVideos = (stories: VideoStory[]): StoryVideo[] =>
  stories.map((s) => ({
    id: s.id,
    speaker: s.speaker,
    relation: s.relation,
    programme: s.programme,
    university: s.university,
    country: s.country,
    poster: s.video.poster,
    src: s.video.src,
    captions: s.video.captions,
    durationSeconds: s.video.durationSeconds,
  }));

/* ------------------------------------------------ Hero ------------------------------------------- */
export function BrochureHero({ story }: { story?: StoryVideo }) {
  return (
    <section className="hero-photo relative isolate overflow-hidden text-canvas" aria-labelledby="hero-title">
      <Image src="/media/photos/campus-quad.webp" alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(7_28_63/0.92)_0%,rgb(11_42_91/0.8)_55%,rgb(11_42_91/0.55)_100%)]" />
      <div className="shell grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-7">
          <p className="t-label text-accent-soft">Admissions counselling · Gurugram, India</p>
          <h1 id="hero-title" className="t-hero mt-4">
            <em>Ivy League Mentors</em> Turn Ambition into Admission Offers
          </h1>
          <p className="t-lead mt-6 max-w-xl border-l-4 border-accent-bright pl-4 text-canvas/90">
            With 1-on-1 mentorship, proven strategies and personalised support, students at Ethos Education secure admits at the world’s top universities.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ConsultationButton source="hero">Book your consultation</ConsultationButton>
            <ButtonLink href="/admission/" variant="ghost">
              Explore programmes
            </ButtonLink>
          </div>
        </div>
        <div className="lg:col-span-5">{story ? <StoryVideos stories={[story]} mode="hero" /> : null}</div>
      </div>
    </section>
  );
}

/* ---------------------------------------------- Numbers ------------------------------------------ */
const serviceFacts = [
  { value: "5", label: "Specialists behind every student" },
  { value: "6", label: "Steps from first chat to first day" },
  { value: "10", label: "Admissions & English tests covered" },
  { value: "5", label: "Study destinations in focus" },
];

export function Numbers({ stats }: { stats: Stat[] }) {
  const items = stats.length ? stats.map((s) => ({ value: `${s.prefix ?? ""}${s.value.toLocaleString("en-IN")}${s.suffix ?? ""}`, label: s.label })) : serviceFacts;
  return (
    <section className="border-b border-line" aria-label="Ethos at a glance">
      <dl className="shell grid grid-cols-2 gap-y-8 py-10 text-center lg:grid-cols-4 lg:py-12">
        {items.map((it, i) => (
          <div key={it.label} className={`px-3 ${i % 2 === 1 ? "border-l border-line" : ""} ${i > 0 ? "lg:border-l lg:border-line" : ""}`}>
            <dd className="t-numeral text-[clamp(2.1rem,1.6rem+1.6vw,3rem)] text-brand">{it.value}</dd>
            <dt className="mt-2 text-[0.92rem] font-medium text-ink-soft">{it.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}

/* ------------------------------------------- Student videos -------------------------------------- */
export function StoriesBand({ stories }: { stories: StoryVideo[] }) {
  if (!stories.length) return null;
  return (
    <section className="section-y bg-mist" aria-labelledby="stories-title">
      <div className="shell">
        <SectionHeader
          label="Success stories"
          title={
            <span id="stories-title">
              Hear it from our <em>students and parents</em>
            </span>
          }
          intro="Don’t just take our word for it — hear from the students and families who’ve lived the Ethos experience."
        />
        <div className="mt-10">
          <StoryVideos stories={stories} />
        </div>
        <div className="mt-10 text-center">
          <ButtonLink href="/success-stories/">Explore more success stories</ButtonLink>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------- What separates us ----------------------------------------- */
const separators: { title: string; text: string; icon: ReactNode }[] = [
  {
    title: "Exclusive 5:1 model",
    text: "Each student is guided by five experts: University Expert, Profile Builder, Research Analyst, Editor and Counsellor.",
    icon: <path d="M16 11a3 3 0 1 0-3-3 3 3 0 0 0 3 3ZM8 11a3 3 0 1 0-3-3 3 3 0 0 0 3 3Zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13Zm8 0c-.29 0-.62.02-.97.05A4.22 4.22 0 0 1 17 16.5V19h6v-2.5c0-2.33-4.67-3.5-7-3.5Z" />,
  },
  {
    title: "Research-led decisions",
    text: "Shortlists grounded in current requirements, funding and outcomes — not reputation alone.",
    icon: <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16a6.47 6.47 0 0 0 4.23-1.57l.27.28v.79l5 5L20.49 19l-5-5Zm-6 0A4.5 4.5 0 1 1 14 9.5 4.49 4.49 0 0 1 9.5 14Z" />,
  },
  {
    title: "Career guidance built in",
    text: "Career guidance is integrated into the entire admission counselling journey, so the course fits the future you want.",
    icon: <path d="M20 6h-4V4l-2-2h-4L8 4v2H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2ZM10 4h4v2h-4V4Z" />,
  },
  {
    title: "Funding and visas, handled",
    text: "Scholarship strategy, education-loan guidance and visa preparation are part of the same plan.",
    icon: <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21a3.99 3.99 0 0 0-3.21-3.81V3h-3v2.16C7.06 5.56 5.5 6.84 5.5 8.77c0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1H5.32c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4Z" />,
  },
];

export function WhyEthos() {
  return (
    <section className="section-y" aria-labelledby="why-title">
      <div className="shell grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-3 sm:space-y-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-mist">
              <Image src="/media/photos/graduation-celebration.webp" alt="Graduates celebrating together" fill sizes="(min-width: 1024px) 22vw, 45vw" className="object-cover" />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-xl bg-mist">
              <Image src="/media/photos/student-writing.webp" alt="A student writing notes" fill sizes="(min-width: 1024px) 22vw, 45vw" className="object-cover" />
            </div>
          </div>
          <div className="space-y-3 pt-10 sm:space-y-4 sm:pt-14">
            <div className="relative aspect-square overflow-hidden rounded-xl bg-mist">
              <Image src="/media/photos/study-group.webp" alt="Students working together" fill sizes="(min-width: 1024px) 22vw, 45vw" className="object-cover" />
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-mist">
              <Image src="/media/photos/counselling-session.webp" alt="A counsellor with a student" fill sizes="(min-width: 1024px) 22vw, 45vw" className="object-cover" />
            </div>
          </div>
        </div>
        <div>
          <Label>Why Ethos</Label>
          <h2 id="why-title" className="t-display mt-3">
            What <em>separates us</em> from others
          </h2>
          <span aria-hidden="true" className="mt-4 block h-[3px] w-14 rounded-full bg-accent-bright" />
          <ul className="mt-8 space-y-6">
            {separators.map((s) => (
              <li key={s.title} className="flex gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-canvas" aria-hidden="true">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                    {s.icon}
                  </svg>
                </span>
                <div>
                  <h3 className="t-subtitle">{s.title}</h3>
                  <p className="mt-1 text-ink-soft">{s.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <ConsultationButton source="home-why" variant="dark" className="mt-9">
            Book your consultation
          </ConsultationButton>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------- Steps ------------------------------------------- */
const stepIcons = [
  "M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4Z",
  "M12 3 1 9l11 6 9-4.91V17h2V9L12 3ZM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82Z",
  "m12 17.27 6.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27Z",
  "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25ZM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83Z",
  "M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 14H4v-6h16v6Zm0-10H4V6h16v2Z",
  "M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5Z",
];

export function Steps({ steps }: { steps: ProcessStep[] }) {
  return (
    <section className="section-y bg-mist" aria-labelledby="steps-title">
      <div className="shell">
        <SectionHeader
          label="How it works"
          title={
            <span id="steps-title">
              Your journey in <em>six steps</em>
            </span>
          }
          intro="From your first conversation to your first day on campus — one plan, one team."
        />
        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.index} className="card relative border-t-4 !border-t-accent-bright p-6 lg:p-7">
              <div className="flex items-center justify-between">
                <span className="t-label text-accent-ink">Step {i + 1}</span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fdeee6] text-accent" aria-hidden="true">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                    <path d={stepIcons[i % stepIcons.length]} />
                  </svg>
                </span>
              </div>
              <h3 className="t-card mt-3">{s.title}</h3>
              <p className="mt-2 text-ink-soft">{s.summary}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 text-center">
          <ButtonLink href="/admission/" variant="outline">
            View admission programmes
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------ Career counselling ----------------------------------- */
export function CareerBlock() {
  return (
    <section className="section-y" aria-labelledby="career-title">
      <div className="shell grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="card order-2 p-7 sm:p-10 lg:order-1">
          <Label>Career counselling</Label>
          <h2 id="career-title" className="t-display mt-3">
            Before you choose where to study, decide <em>what to study</em>
          </h2>
          <p className="mt-5 text-ink-soft">
            Psychometric, personality and aptitude assessments — interpreted by experienced counsellors — give school students, graduates and working professionals clear, research-backed guidance on what to study and why.
          </p>
          <CheckList className="mt-6" items={["School students: subject and stream choices", "Graduates: specialisation, master’s or MBA", "Professionals: the next career move"]} />
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <ConsultationButton source="home-career" service="career-counselling">
              Talk to an expert
            </ConsultationButton>
            <ArrowLink href="/career-counselling/">Career counselling</ArrowLink>
          </div>
        </div>
        <div className="relative order-1 aspect-[4/3] overflow-hidden rounded-xl bg-mist lg:order-2">
          <Image src="/media/photos/mentoring.webp" alt="A mentor working with a student" fill sizes="(min-width: 1024px) 45vw, 92vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------ Consultation form ------------------------------------ */
export function ConsultBlock() {
  return (
    <section id="book" className="section-y bg-mist" aria-label="Book your consultation">
      <div className="shell grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="relative hidden overflow-hidden rounded-xl bg-brand lg:col-span-5 lg:block">
          <Image src="/media/photos/hero-graduates.webp" alt="Graduates throwing their caps into the air" fill sizes="40vw" className="object-cover" />
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgb(7_28_63/0.85))]" />
          <div className="absolute inset-x-6 bottom-6 text-canvas">
            <p className="t-label text-accent-soft">Or just give us a call</p>
            <TrackedLink href={`tel:${site.phone.e164}`} event="phone_click" source="home-form" className="mt-2 block font-display text-[1.9rem] font-bold">
              {site.phone.display}
            </TrackedLink>
            <p className="text-[0.9rem] text-canvas/80">{site.email}</p>
          </div>
        </div>
        <div className="card p-6 sm:p-9 lg:col-span-7">
          <ConsultationForm source="home-form" heading="Book your consultation" />
          <p className="mt-6 border-t border-line pt-5 text-ink-soft lg:hidden">
            Or just give us a call:{" "}
            <TrackedLink href={`tel:${site.phone.e164}`} event="phone_click" source="home-form-mobile" className="font-semibold text-ink">
              {site.phone.display}
            </TrackedLink>
          </p>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------- Destinations -------------------------------------- */
export function Destinations({ destinations }: { destinations: Destination[] }) {
  return (
    <section className="section-y" aria-labelledby="dest-title">
      <div className="shell">
        <SectionHeader
          label="Study abroad"
          title={
            <span id="dest-title">
              Where we <em>guide students</em>
            </span>
          }
          intro="Country guides that explain how applications really work — timelines, tests, costs and visas."
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {destinations.map((d) => (
            <li key={d.slug}>
              <Link href={d.path} className="card group flex h-full flex-col p-6 transition-colors hover:border-accent-bright">
                <span className="t-card">{d.shortName === "USA" ? "United States" : d.name}</span>
                <span className="mt-2 text-[0.92rem] leading-snug text-ink-soft">{d.tagline}</span>
                <span className="mt-auto inline-flex items-center gap-1 pt-5 text-[0.9rem] font-semibold text-accent-ink">
                  Explore <ChevronIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------- FAQ ------------------------------------------- */
export function FAQBand({ faqs }: { faqs: Faq[] }) {
  return (
    <section className="surface-dark section-y" aria-labelledby="faq-title">
      <div className="shell">
        <h2 id="faq-title" className="t-display text-center">
          Frequently asked <em>questions</em>
        </h2>
        <span aria-hidden="true" className="mx-auto mt-4 block h-[3px] w-14 rounded-full bg-accent-bright" />
        <div className="mx-auto mt-10 max-w-3xl">
          <FAQAccordion faqs={faqs} tone="dark" />
        </div>
        <p className="mt-8 text-center text-canvas/80">
          More questions?{" "}
          <Link href="/faq/" className="font-semibold text-accent-soft hover:underline">
            See all FAQs
          </Link>
        </p>
      </div>
    </section>
  );
}
