import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ConsultationButton } from "@/components/consultation/ConsultationButton";
import { Carousel } from "@/components/motion/Carousel";
import { Reveal } from "@/components/motion/Reveal";
import { SplitTextHeading } from "@/components/motion/SplitTextHeading";
import { DepthPointer, SceneStories, type SceneStory } from "@/components/stories/SceneStories";
import { ArrowLink, ChevronIcon, Label } from "@/components/ui/primitives";
import { differences } from "@/content/approach";
import { topicLabel } from "@/content/journal";
import type { JournalArticle, MentorRole, Programme, VideoStory } from "@/content/types";

/* ==================================================================================================
   Homepage sections. Structure and motion follow the reference direction (full-bleed hero, pinned
   giant word, statement, pastel panels with rounded tops, call-outs, card carousel, pathways, closing
   image card). All copy and imagery are Ethos's own (or licensed stock, see docs/PHOTO-CREDITS.md).
   ================================================================================================== */

/* ------------------------------------------- Opening screen -------------------------------------- */
/**
 * First-visit opening screen (home only, once per browser session; see the inline script in
 * app/layout.tsx). A pastel field steps through the panel colours while a small centred photograph
 * changes; the last photograph is the hero image, which expands to fill the screen and hands over to
 * the real hero. Pure CSS (globals.css, `.intro`), so it starts at first paint and needs no JS to end.
 */
const introShots = [
  "/media/photos/counselling-session.webp",
  "/media/photos/study-group.webp",
  "/media/photos/campus-quad.webp",
  "/media/photos/students-laptop.webp",
];

function OpeningScreen() {
  return (
    <div className="intro" aria-hidden="true">
      {introShots.map((src, i) => (
        <div key={src} className="intro-shot" style={{ "--i": i } as CSSProperties}>
          <Image src={src} alt="" fill sizes="30vw" loading="eager" className="object-cover" />
        </div>
      ))}
      <div className="intro-shot intro-last" style={{ "--i": introShots.length } as CSSProperties}>
        <Image src="/media/photos/hero-graduates.webp" alt="" fill sizes="100vw" loading="eager" className="object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(0_0_0/0.35)_0%,rgb(0_0_0/0.05)_35%,rgb(0_0_0/0.15)_60%,rgb(0_0_0/0.55)_100%)]" />
      </div>
    </div>
  );
}

/* ------------------------------------------------ Hero ------------------------------------------- */
export function LandingHero() {
  return (
    <>
      <OpeningScreen />
      <section className="hero-full relative isolate flex h-svh min-h-[34rem] flex-col justify-end overflow-hidden text-canvas" aria-labelledby="hero-title">
        <Image
          src="/media/photos/hero-graduates.webp"
          alt="Graduates throwing their caps into the air against a city skyline at sunset"
          fill
          priority
          sizes="100vw"
          className="hero-media -z-20 object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(0_0_0/0.35)_0%,rgb(0_0_0/0.05)_35%,rgb(0_0_0/0.15)_60%,rgb(0_0_0/0.55)_100%)]" />
        <div className="shell w-full pb-5">
          <h1 id="hero-title">
            <SplitTextHeading as="span" trigger="load" delay={0.15} className="t-hero block max-sm:!text-[clamp(3.4rem,19vw,6rem)] max-sm:!leading-[0.9] sm:whitespace-nowrap">
              Your ambition
            </SplitTextHeading>
            <span className="sr-only">: admissions counselling for the world’s leading universities</span>
          </h1>
          <div className="hero-bar mt-[clamp(1rem,2.5vw,2.25rem)] flex items-center justify-between gap-6 border-t border-canvas/35 pt-4 font-display font-semibold [font-variation-settings:'opsz'_24]">
            <span className="flex items-center gap-4">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M12 4v15m-6-6 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="hidden sm:inline">Admissions counselling for the world’s leading universities</span>
            </span>
            <span>Scroll to explore</span>
          </div>
        </div>
      </section>
    </>
  );
}

/* --------------------------------------- Pinned giant word (3D) ---------------------------------- */
/** Expressive display face for the scene word only: Fraunces italic, soft and "wonky" (SIL OFL),
 *  self-hosted from app/fonts/. Not preloaded — it is only needed once the scene scrolls into view. */
const creative = localFont({
  src: [{ path: "../../app/fonts/Fraunces-Italic-Variable.woff2", weight: "100 900", style: "italic" }],
  display: "swap",
  variable: "--font-creative",
  preload: false,
});

type Floater = { src: string; w: string; ratio: string; style: CSSProperties; hideSm?: boolean };
const pos = (left: string, top: string, from: string, to: string) => ({ left, top, "--from": from, "--to": to }) as CSSProperties;

/** Back layer: smaller, slower, slightly softened — sits behind the word. */
const backLayer: Floater[] = [
  { src: "/media/photos/campus-quad.webp", w: "clamp(5rem,9vw,9.5rem)", ratio: "4/5", style: pos("4%", "10%", "30vh", "-45vh") },
  { src: "/media/photos/reading-room.webp", w: "clamp(5rem,8vw,8.5rem)", ratio: "4/3", style: pos("30%", "6%", "45vh", "-60vh"), hideSm: true },
  { src: "/media/photos/library-hall.webp", w: "clamp(5rem,10vw,10rem)", ratio: "16/10", style: pos("58%", "14%", "20vh", "-40vh"), hideSm: true },
  { src: "/media/photos/study-group.webp", w: "clamp(4.5rem,7vw,7.5rem)", ratio: "1/1", style: pos("84%", "8%", "35vh", "-55vh") },
  { src: "/media/photos/student-writing.webp", w: "clamp(4.5rem,7.5vw,8rem)", ratio: "4/5", style: pos("10%", "62%", "60vh", "-70vh"), hideSm: true },
  { src: "/media/photos/graduation-celebration.webp", w: "clamp(5rem,9vw,9rem)", ratio: "4/5", style: pos("40%", "66%", "70vh", "-80vh") },
  { src: "/media/photos/mentoring.webp", w: "clamp(5rem,8vw,8.5rem)", ratio: "4/3", style: pos("66%", "70%", "55vh", "-65vh"), hideSm: true },
  { src: "/media/photos/students-laptop.webp", w: "clamp(4.5rem,7vw,7.5rem)", ratio: "1/1", style: pos("88%", "58%", "80vh", "-85vh") },
];

/** Front layer: larger, faster, with real shadows — passes in front of the word. */
const frontLayer: Floater[] = [
  { src: "/media/photos/student-focus.webp", w: "clamp(7rem,13vw,14rem)", ratio: "4/5", style: pos("-2%", "34%", "110vh", "-150vh"), hideSm: true },
  { src: "/media/photos/campus-walk.webp", w: "clamp(7rem,14vw,15rem)", ratio: "4/3", style: pos("50%", "-6%", "140vh", "-170vh"), hideSm: true },
  { src: "/media/photos/counselling-session.webp", w: "clamp(7rem,12vw,13rem)", ratio: "1/1", style: pos("80%", "30%", "125vh", "-160vh"), hideSm: true },
  { src: "/media/photos/students-walking.webp", w: "clamp(7rem,13vw,14rem)", ratio: "16/10", style: pos("24%", "76%", "150vh", "-185vh"), hideSm: true },
];

/** Story cards travel with the front layer, entering one after another. */
const storySlots = [
  { className: "w-[clamp(7rem,13vw,13.5rem)] aspect-[9/16] max-md:!left-[5%]", style: pos("15%", "18%", "120vh", "-165vh") },
  { className: "w-[clamp(7rem,13vw,13.5rem)] aspect-[9/16] max-md:!left-[54%]", style: pos("44%", "40%", "175vh", "-120vh") },
  { className: "w-[clamp(7rem,13vw,13.5rem)] aspect-[9/16] max-md:!left-[12%]", style: pos("70%", "6%", "220vh", "-90vh") },
];

export function toSceneStories(stories: VideoStory[]): SceneStory[] {
  return stories.slice(0, 3).map((s) => ({
    id: s.id,
    speaker: s.speaker,
    student: s.student,
    relation: s.relation,
    university: s.university,
    poster: s.video.poster,
    preview: `/media/stories/previews/${s.id}.mp4`,
    src: s.video.src,
    captions: s.video.captions,
  }));
}

export function WordScene({ stories }: { stories: SceneStory[] }) {
  return (
    <section className={`word-scene relative h-[210vh] md:h-[280vh] ${creative.variable}`} aria-labelledby="scene-title">
      <h2 id="scene-title" className="sr-only">
        Ethos students study at leading universities around the world
      </h2>
      <div className="scene-stage sticky top-0 h-svh overflow-hidden">
        <DepthPointer />
        <div className="depth depth-back" aria-hidden="true">
          {backLayer.map((f) => (
            <div key={f.src} className={`scene-float absolute overflow-hidden rounded-lg bg-mist ${f.hideSm ? "max-md:hidden" : ""}`} style={{ ...f.style, width: f.w, aspectRatio: f.ratio }}>
              <Image src={f.src} alt="" fill sizes="10vw" className="object-cover" />
            </div>
          ))}
        </div>
        <div className="depth depth-mid flex items-center justify-center">
          <p aria-hidden="true" className="scene-word select-none whitespace-nowrap">
            <span className="scene-word-solid">World</span>
            <span className="scene-word-outline">wide</span>
          </p>
        </div>
        <div className="depth depth-front">
          {frontLayer.map((f) => (
            <div key={f.src} aria-hidden="true" className={`scene-float scene-front absolute overflow-hidden rounded-xl bg-mist ${f.hideSm ? "max-md:hidden" : ""}`} style={{ ...f.style, width: f.w, aspectRatio: f.ratio }}>
              <Image src={f.src} alt="" fill sizes="15vw" className="object-cover" />
            </div>
          ))}
          {stories.length ? <SceneStories stories={stories} slots={storySlots} /> : null}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------- Statement ---------------------------------------- */
export function Statement() {
  return (
    <section className="pb-[var(--section-y)] pt-[clamp(2rem,6vw,5rem)]">
      <div className="shell">
        <SplitTextHeading as="p" className="t-statement mx-auto max-w-[22ch] text-center">
          Most admissions help begins with the application. Ours begins with you — your strengths, your goals and the career you’re working towards.
        </SplitTextHeading>
      </div>
    </section>
  );
}

/* ------------------------------------- Butter panel: approach ------------------------------------ */
const triad = [
  { title: "Right fit.", text: "The country, campus and culture where you will thrive — not just the names on a ranking." },
  { title: "Right field.", text: "The course that matches your strengths and the career you want." },
  { title: "Right future.", text: "An application built around real outcomes: internships, scholarships and the first job after graduation." },
];

export function ApproachPanel() {
  return (
    <section className="panel panel-butter pb-[var(--section-y)] pt-[clamp(3rem,6vw,5.5rem)]" aria-labelledby="approach-title">
      <div className="shell">
        <Label>The Ethos approach</Label>
        <SplitTextHeading id="approach-title" className="t-display mt-5 max-w-[16ch]">
          Personal guidance for ambitious students
        </SplitTextHeading>
        <div className="mt-[clamp(3rem,7vw,6rem)] grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-mist lg:col-span-4" data-clip="">
            <Image src="/media/photos/counselling-session.webp" alt="A counsellor in conversation with a student" fill sizes="(min-width: 1024px) 32vw, 92vw" className="object-cover" />
          </div>
          <Reveal className="lg:col-span-5 lg:col-start-7" stagger={0.08}>
            <p data-reveal className="t-subtitle">
              Every shortlist, roadmap and essay starts from who you are and where you want to go.
            </p>
            {triad.map((t) => (
              <p key={t.title} data-reveal className="mt-5 text-ink/80">
                <strong className="font-semibold text-ink">{t.title}</strong> {t.text}
              </p>
            ))}
            <ArrowLink href="/about/" className="mt-8">
              About Ethos
            </ArrowLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------- Media that grows on scroll ------------------------------ */
export function GrowMedia({ src, alt }: { src: string; alt: string }) {
  return (
    <section className="py-[clamp(3rem,7vw,6rem)]">
      <div className="shell">
        <div className="grow-media relative mx-auto aspect-[16/9] overflow-hidden rounded-[var(--radius-card)] bg-mist">
          <Image src={src} alt={alt} fill sizes="(min-width: 1440px) 1360px, 94vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------- Call-outs --------------------------------------- */
export function CallOuts({ title, items, id }: { title: string; items: { title: string; text: string }[]; id: string }) {
  return (
    <section className="py-[clamp(3rem,7vw,6rem)]" aria-labelledby={id}>
      <div className="shell">
        <SplitTextHeading id={id} className="t-display !text-[clamp(2rem,1rem+3.8vw,4.6rem)]">
          {title}
        </SplitTextHeading>
        <Reveal className={`mt-8 grid border-t border-line pt-8 sm:grid-cols-2 ${items.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`} stagger={0.07}>
          {items.map((it, i) => (
            <div key={it.title} data-reveal className={`py-4 sm:pr-8 ${i > 0 ? "lg:border-l lg:border-line lg:pl-8" : ""}`}>
              <h3 className="t-subtitle !text-[clamp(1rem,0.85rem+0.45vw,1.3rem)]">{it.title}</h3>
              <p className="mt-2 text-ink/75">{it.text}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export const differenceCallouts = differences.slice(1, 5);

/* ----------------------------------------- Sage panel: Journal ----------------------------------- */
const fmt = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export function JournalPanel({ articles }: { articles: JournalArticle[] }) {
  return (
    <section className="panel panel-sage pb-[var(--section-y)] pt-[clamp(3rem,6vw,5.5rem)]" aria-labelledby="journal-title">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Label>From the Journal</Label>
            <SplitTextHeading id="journal-title" className="t-display mt-5">
              Guides for the road ahead
            </SplitTextHeading>
          </div>
          <ArrowLink href="/blog/">All articles</ArrowLink>
        </div>
        <Carousel className="mt-12" label="Journal articles">
          {articles.map((a) => (
            <article key={a.slug} className="group relative w-[min(78vw,24rem)] shrink-0 snap-start">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-mist">
                {a.featuredImage ? (
                  <Image src={a.featuredImage.src} alt="" fill sizes="(min-width: 1024px) 24rem, 78vw" className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-editorial)] group-hover:scale-[1.04]" />
                ) : null}
              </div>
              <p className="mt-4 text-[0.85rem] text-ink/70">
                {topicLabel(a.topic)} · <time dateTime={a.publishedAt}>{fmt(a.publishedAt)}</time>
              </p>
              <h3 className="t-subtitle mt-1.5">
                <Link href={a.path} className="after:absolute after:inset-0">
                  <span className="link-line">{a.title}</span>
                </Link>
              </h3>
            </article>
          ))}
        </Carousel>
      </div>
    </section>
  );
}

/* --------------------------------------------- Pathways ------------------------------------------ */
const pathwayTones = ["panel-butter", "panel-sage", "panel-coral"];

/**
 * Three image-filled cards. The first and last are exactly the same size (photos cropped to fill);
 * the middle one is taller and centred against them, so the row steps like a podium. Each card's
 * pastel caption grows on hover to reveal the summary (always open on touch screens).
 */
export function Pathways({ programmes }: { programmes: Programme[] }) {
  return (
    <section className="py-[var(--section-y)]" aria-labelledby="pathways-title">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SplitTextHeading id="pathways-title" className="t-hero !text-[clamp(3.2rem,1rem+8.2vw,10rem)] !leading-[0.95]">
            Programmes
          </SplitTextHeading>
          <p className="max-w-sm pb-3 text-ink/75">Three ways to work with Ethos — each built around a different kind of goal.</p>
        </div>
        <Reveal as="ul" className="mt-[clamp(2.5rem,6vw,5rem)] grid gap-4 md:grid-cols-3 md:items-center" stagger={0.1}>
          {programmes.slice(0, 3).map((p, i) => {
            const featured = i === 1;
            return (
              <li
                key={p.slug}
                data-reveal
                className={`pcard group relative isolate overflow-hidden rounded-[var(--radius-card)] bg-ink ${featured ? "h-[32rem] md:h-[clamp(34rem,46vw,44rem)]" : "h-[32rem] md:h-[clamp(28rem,38vw,36rem)]"}`}
              >
                <Image
                  src={p.image.src}
                  alt={p.image.alt}
                  fill
                  sizes="(min-width: 768px) 32vw, 92vw"
                  className="-z-10 object-cover transition-transform duration-[1.4s] ease-[var(--ease-editorial)] group-hover:scale-[1.06]"
                />
                <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(0_0_0/0.35),transparent_35%)]" />
                <Link href={`/admission/${p.slug}/`} className="absolute inset-0 rounded-[var(--radius-card)]" aria-label={`${p.name} — ${p.kicker}`} />
                <span aria-hidden="true" className="absolute left-5 top-4 font-display text-[clamp(2.5rem,4vw,3.75rem)] font-light leading-none text-canvas [font-variation-settings:'opsz'_144]">
                  0{i + 1}
                </span>
                {featured ? (
                  <span aria-hidden="true" className="spin-badge absolute right-4 top-4 h-24 w-24 text-canvas">
                    <svg viewBox="0 0 100 100" className="h-full w-full">
                      <defs>
                        <path id="badge-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
                      </defs>
                      <text className="fill-current font-display text-[10.5px] font-semibold uppercase tracking-[0.18em]">
                        <textPath href="#badge-circle">Explore · Ethos · Explore · Ethos ·</textPath>
                      </text>
                    </svg>
                  </span>
                ) : null}
                <div className={`${pathwayTones[i % 3]} pointer-events-none absolute inset-x-3 bottom-3 rounded-xl p-5`}>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="t-card min-w-0 !text-[clamp(1.5rem,1.2rem+1vw,2.1rem)]">{p.shortName}</h3>
                    <span aria-hidden="true" className="inline-flex shrink-0 items-center gap-1 rounded-full bg-ink px-3.5 py-1.5 font-display text-[0.85rem] font-semibold text-canvas [font-variation-settings:'opsz'_24]">
                      Explore
                      <ChevronIcon className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                  <p className="mt-1 text-[0.9em] text-ink/75">{p.kicker}</p>
                  <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[var(--ease-editorial)] md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] md:group-focus-within:grid-rows-[1fr]">
                    <p className="overflow-hidden text-[0.9em] text-ink/85">
                      <span className="block pt-3">{p.summary}</span>
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </Reveal>
        <p className="mt-10 text-ink/75">
          Also: <Link href="/ivy-mentors/" className="link-line font-display font-semibold">Ivy Mentors</Link>,{" "}
          <Link href="/test-prep/" className="link-line font-display font-semibold">test preparation</Link> and{" "}
          <Link href="/career-counselling/" className="link-line font-display font-semibold">career counselling</Link>.
        </p>
      </div>
    </section>
  );
}

/* --------------------------------------- Coral panel: 5:1 model ---------------------------------- */
export function MentorPanel({ roles }: { roles: MentorRole[] }) {
  return (
    <section className="panel panel-coral pb-[var(--section-y)] pt-[clamp(3rem,6vw,5.5rem)]" aria-labelledby="mentor-title">
      <div className="shell">
        <Label>The 5:1 model</Label>
        <SplitTextHeading id="mentor-title" className="t-display mt-5 max-w-[14ch]">
          Five experts, one student
        </SplitTextHeading>
        <div className="mt-[clamp(3rem,7vw,6rem)] grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-mist lg:col-span-4" data-clip="">
            <Image src="/media/photos/mentoring.webp" alt="A mentor working with a student" fill sizes="(min-width: 1024px) 32vw, 92vw" className="object-cover" />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="text-ink/85">
              Every student is guided by a dedicated team, each specialist focused on a different part of the application — and one counsellor who keeps it all together.
            </p>
            <Reveal as="ul" className="mt-8 border-b border-ink/20" stagger={0.06}>
              {roles.map((r) => (
                <li key={r.title} data-reveal className="grid gap-1 border-t border-ink/20 py-4 sm:grid-cols-[1fr_1.2fr] sm:gap-6">
                  <span className="font-display font-semibold [font-variation-settings:'opsz'_24]">{r.title}</span>
                  <span className="text-ink/80">{r.short}</span>
                </li>
              ))}
            </Reveal>
            <ArrowLink href="/ivy-mentors/" className="mt-8">
              Meet the mentorship model
            </ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------ Conversation (content + media) ------------------------------ */
export function Conversation() {
  return (
    <section className="py-[var(--section-y)]" aria-labelledby="conversation-title">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <SplitTextHeading id="conversation-title" className="t-display">
            It starts with a conversation
          </SplitTextHeading>
          <Reveal className="mt-8 max-w-md" stagger={0.08}>
            <p data-reveal className="text-ink/80">
              Choosing where and what to study can take time — especially when the options feel endless. A first consultation is simply a conversation: we listen to your goals, your academic background, your timeline and your questions.
            </p>
            <p data-reveal className="mt-5 text-ink/80">
              You leave knowing your realistic options and which kind of support, if any, would help. Students and parents are welcome together.
            </p>
            <div data-reveal className="mt-8">
              <ConsultationButton source="home-conversation">Book a consultation</ConsultationButton>
            </div>
          </Reveal>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-mist lg:col-span-5 lg:col-start-8" data-clip="">
          <Image src="/media/photos/students-walking.webp" alt="A group of students walking and laughing together outdoors" fill sizes="(min-width: 1024px) 40vw, 92vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}

export const consultationCallouts = [
  { title: "A conversation, not a pitch", text: "We listen first: your goals, your academic background, your timeline and your questions." },
  { title: "Students and parents welcome", text: "Many families join together — decisions are better when everyone hears the same advice." },
  { title: "A clearer picture", text: "You leave knowing your realistic options and which kind of support, if any, would help." },
];
