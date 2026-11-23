import Image from "next/image";
import Link from "next/link";
import { differences } from "@/content/approach";
import { toExamSummary } from "@/content/exams";
import type { Destination, Exam, Faq, MentorRole, Outcome, ProcessStep, Programme, Stat, VideoStory } from "@/content/types";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { ConsultationButton } from "@/components/consultation/ConsultationButton";
import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollWords } from "@/components/motion/ScrollWords";
import { TestPrepGrid } from "@/components/sections/TestPrepGrid";
import { VideoTestimonial } from "@/components/stories/VideoTestimonial";
import { ArrowLink, ChevronIcon, Label, PendingBadge, SectionHeader } from "@/components/ui/primitives";

/* --------------------------------- At a glance --------------------------------- */
const serviceFacts = [
  { value: "5", label: "Specialists behind every student" },
  { value: "6", label: "Steps from first chat to first day" },
  { value: "10", label: "Admissions & English tests covered" },
  { value: "5", label: "Study destinations in focus" },
];

export function TrustSection({ stats }: { stats: Stat[] }) {
  return (
    <section className="pb-[var(--section-y)]" aria-label="Ethos at a glance">
      <div className="shell">
        <Reveal as="dl" className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {stats.length
            ? stats.map((s) => (
                <div key={s.label} data-reveal className="flex flex-col rounded-[var(--radius-card)] bg-mist p-6 lg:p-8">
                  <dt className="order-2 mt-2 text-[0.95rem] font-medium leading-snug text-ink">{s.label}</dt>
                  <dd className="t-numeral order-1 text-[clamp(2.5rem,1.8rem+2.4vw,3.75rem)] text-ink">
                    <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
                  </dd>
                  {!s.verified ? (
                    <dd className="order-3 mt-3">
                      <PendingBadge note={s.note} />
                    </dd>
                  ) : null}
                </div>
              ))
            : serviceFacts.map((f) => (
                <div key={f.label} data-reveal className="flex flex-col rounded-[var(--radius-card)] bg-mist p-6 lg:p-8">
                  <dt className="order-2 mt-2 text-[0.95rem] font-medium leading-snug text-ink">{f.label}</dt>
                  <dd className="t-numeral order-1 text-[clamp(2.5rem,1.8rem+2.4vw,3.75rem)] text-ink">{f.value}</dd>
                </div>
              ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------- Statement ----------------------------------- */
/** Scroll-linked statement (words brighten as you scroll). Copy from the About page. */
export function StatementSection() {
  return (
    <section className="section-y" aria-labelledby="statement-label">
      <div className="shell">
        <div className="mx-auto max-w-5xl">
          <Label as="h2" className="mb-6">
            <span id="statement-label">Our approach</span>
          </Label>
          <ScrollWords
            className="text-[clamp(1.55rem,1rem+2.3vw,3rem)] font-semibold leading-[1.18] tracking-[-0.03em] text-ink"
            text="Most admissions help begins with the application. *Ours begins with you* — your strengths, your goals and the career you’re working towards."
          />
          <ArrowLink href="/about/" className="mt-8">
            How we work
          </ArrowLink>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Programmes ---------------------------------- */
export function ProgrammeCard({ programme }: { programme: Programme; layout?: "home" | "index" }) {
  const href = `/admission/${programme.slug}/`;
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-mist transition-colors duration-300 hover:bg-cloud">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={programme.image.src}
          alt={programme.image.alt}
          fill
          sizes="(min-width: 1024px) 30vw, 92vw"
          className="object-cover transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-6 lg:p-8">
        <p className="t-label text-accent-ink">{programme.kicker}</p>
        <h3 className="t-card mt-2">
          <Link href={href} className="after:absolute after:inset-0">
            {programme.name}
          </Link>
        </h3>
        <p className="mt-3 text-ink-soft">{programme.summary}</p>
        <div className="relative z-10 mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6 text-[0.95rem]">
          <span className="inline-flex items-center gap-1 font-medium text-brand-bright">
            Learn more <ChevronIcon className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
          <ConsultationButton source={`programme-card-${programme.slug}`} service={programme.slug} variant="text" arrow={false} className="!font-medium text-ink-soft hover:text-ink">
            Ask about it
          </ConsultationButton>
        </div>
      </div>
    </article>
  );
}

export function ProgrammesSection({ programmes }: { programmes: Programme[] }) {
  return (
    <section className="section-y bg-canvas" aria-labelledby="programmes-title">
      <div className="shell">
        <SectionHeader
          label="Admissions programmes"
          title={
            <span id="programmes-title">
              Find the <em>right path.</em>
            </span>
          }
          intro="Three ways to work with Ethos, each built around a different kind of goal."
        />
        <Reveal className="mt-14 grid gap-4 lg:grid-cols-3" stagger={0.1}>
          {programmes.map((p) => (
            <div key={p.slug} data-reveal>
              <ProgrammeCard programme={p} />
            </div>
          ))}
        </Reveal>
        <p className="mt-8 text-ink-soft">
          Not sure what to study yet? <ArrowLink href="/career-counselling/">Start with career counselling</ArrowLink>
        </p>
      </div>
    </section>
  );
}

/* ------------------------------- 5:1 mentorship -------------------------------- */
export function MentorGrid({ roles }: { roles: MentorRole[] }) {
  return (
    <Reveal as="ol" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5" stagger={0.06}>
      {roles.map((r) => (
        <li key={r.index} data-reveal className="flex flex-col rounded-[var(--radius-card)] bg-canvas p-6">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink text-[0.85rem] font-semibold text-canvas">{Number(r.index)}</span>
          <h3 className="t-card mt-5 !text-[1.55rem]">{r.title}</h3>
          <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{r.description}</p>
        </li>
      ))}
    </Reveal>
  );
}

export function MentorshipSection({ roles }: { roles: MentorRole[] }) {
  return (
    <section className="section-y bg-mist" aria-labelledby="mentorship-title">
      <div className="shell">
        <SectionHeader
          label="The 5:1 model"
          title={
            <span id="mentorship-title">
              Five experts. <em>One plan.</em>
            </span>
          }
          intro="Every student gets a dedicated team, each specialist focused on a different part of the application."
        />
        <div className="mt-14">
          <MentorGrid roles={roles} />
        </div>
        <p className="mt-8">
          <ArrowLink href="/ivy-mentors/">Learn about Ivy Mentors</ArrowLink>
        </p>
      </div>
    </section>
  );
}

/* ---------------------------------- Process ------------------------------------ */
export function ProcessSection({ steps }: { steps: ProcessStep[] }) {
  return (
    <section className="section-y" aria-labelledby="process-title">
      <div className="shell">
        <SectionHeader
          label="How it works"
          title={
            <span id="process-title">
              Six steps. <em>One clear plan.</em>
            </span>
          }
          intro="From your first conversation to your first day on campus."
        />
        <Reveal as="ol" className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {steps.map((s) => (
            <li key={s.index} data-reveal className="rounded-[var(--radius-card)] bg-mist p-6 lg:p-8">
              <p className="t-label text-accent-ink">Step {Number(s.index)}</p>
              <h3 className="t-card mt-2">{s.title}</h3>
              <p className="mt-2 text-ink-soft">{s.summary}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- Destinations --------------------------------- */
export function DestinationIndex({ destinations }: { destinations: Destination[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {destinations.map((d) => (
        <li key={d.slug}>
          <Link href={d.path} className="group flex h-full flex-col rounded-[var(--radius-card)] bg-mist p-6 transition-colors duration-300 hover:bg-cloud">
            <span className="t-card">{d.shortName === "USA" ? "United States" : d.name}</span>
            <span className="mt-2 text-[0.95rem] leading-snug text-ink-soft">{d.tagline}</span>
            <span className="mt-auto inline-flex items-center gap-1 pt-6 text-[0.95rem] font-medium text-brand-bright">
              Explore <ChevronIcon className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Tests and destinations together — two quick ways in. */
export function PathwaysSection({ exams, destinations }: { exams: Exam[]; destinations: Destination[] }) {
  return (
    <section className="section-y bg-canvas" aria-labelledby="pathways-title">
      <div className="shell">
        <SectionHeader
          label="Tests & destinations"
          title={
            <span id="pathways-title">
              Where do you <em>want to go?</em>
            </span>
          }
          intro="Country guides that explain how applications really work, and preparation for the tests your universities require."
        />
        <div className="mt-14">
          <DestinationIndex destinations={destinations} />
        </div>
        <div className="mt-16">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <h3 className="t-subtitle">Test preparation</h3>
            <ArrowLink href="/test-prep/">All tests</ArrowLink>
          </div>
          <TestPrepGrid exams={exams.map(toExamSummary)} />
        </div>
      </div>
    </section>
  );
}

/** Kept for the /study-abroad/ page and other callers. */
export function DestinationsSection({ destinations }: { destinations: Destination[] }) {
  return (
    <section className="section-y" aria-labelledby="destinations-title">
      <div className="shell">
        <SectionHeader
          label="Study destinations"
          title={
            <span id="destinations-title">
              Where do you <em>want to go?</em>
            </span>
          }
        />
        <div className="mt-14">
          <DestinationIndex destinations={destinations} />
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- Stories ------------------------------------ */
export function OutcomesList({ outcomes, limit }: { outcomes: Outcome[]; limit?: number }) {
  const list = limit ? outcomes.slice(0, limit) : outcomes;
  return (
    <ul className="grid gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((o) => (
        <li key={`${o.name}-${o.university}`} className="border-b border-line py-3.5">
          <span className="block font-semibold tracking-[-0.01em]">{o.university}</span>
          <span className="mt-0.5 block text-[0.85rem] text-ink-soft">
            {o.name} · {o.destination}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function StoriesSection({ stories }: { stories: VideoStory[]; outcomes?: Outcome[] }) {
  if (!stories.length) return null;
  return (
    <section className="section-y bg-mist" aria-labelledby="stories-title">
      <div className="shell">
        <SectionHeader
          label="Success stories"
          title={
            <span id="stories-title">
              Real students. <em>Real offers.</em>
            </span>
          }
        />
        <Reveal className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {stories.slice(0, 3).map((s) => (
            <div key={s.id} data-reveal>
              <VideoTestimonial story={s} />
            </div>
          ))}
        </Reveal>
        <p className="mt-10">
          <ArrowLink href="/success-stories/">More success stories</ArrowLink>
        </p>
      </div>
    </section>
  );
}

/* ---------------------------------- Difference --------------------------------- */
export function DifferenceSection() {
  return (
    <section className="section-y" aria-labelledby="difference-title">
      <div className="shell">
        <SectionHeader
          label="The Ethos difference"
          title={
            <span id="difference-title">
              Why families <em>choose Ethos.</em>
            </span>
          }
        />
        <Reveal as="ul" className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {differences.map((d) => (
            <li key={d.title} data-reveal className="rounded-[var(--radius-card)] bg-mist p-6 lg:p-8">
              <h3 className="t-card">{d.title}</h3>
              <p className="mt-2 text-ink-soft">{d.text}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------ FAQ -------------------------------------- */
export function FAQSection({ faqs, title }: { faqs: Faq[]; title?: string }) {
  return (
    <section className="section-y" aria-labelledby="faq-title">
      <div className="shell">
        <SectionHeader
          label="FAQ"
          title={<span id="faq-title">{title ?? "Questions, answered."}</span>}
        />
        <div className="mt-12 max-w-4xl">
          <FAQAccordion faqs={faqs} />
          <p className="mt-8 text-ink-soft">
            Have another question? <ArrowLink href="/faq/">See all FAQs</ArrowLink>
          </p>
        </div>
      </div>
    </section>
  );
}
