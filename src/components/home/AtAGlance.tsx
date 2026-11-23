import Image from "next/image";
import Link from "next/link";
import { ConsultationButton } from "@/components/consultation/ConsultationButton";
import { Label } from "@/components/ui/primitives";
import type { Destination, ProcessStep, VideoStory } from "@/content/types";
import { stepIcons } from "./Brochure";
import { InlineStory, type InlineStoryData } from "./InlineStory";
import { StepsTicker } from "./StepsTicker";

/* ==================================================================================================
   "Ethos at a glance" (client choice C, 23 Nov 2026): a bento grid that replaced the Worldwide scene.
   A large campus photo with the headline and booking button, two student stories that play inside
   their tiles, the specialists fact, the six steps playing on a loop, the destinations list and a
   counselling photo. Four columns from 1024px; two columns below, in the same reading order.
   ================================================================================================== */

const toInline = (s: VideoStory): InlineStoryData => ({
  id: s.id,
  speaker: s.speaker,
  relation: s.relation,
  university: s.university,
  poster: s.video.poster,
  src: s.video.src,
  captions: s.video.captions,
  durationSeconds: s.video.durationSeconds,
});

/** Students telling their own story first (Ansh, then Riya), then anyone else verified. */
function pickStories(stories: VideoStory[]) {
  const preferred = ["ansh-chawla", "riya-malhotra"];
  const ordered = [...preferred.map((id) => stories.find((s) => s.id === id)), ...stories.filter((s) => !preferred.includes(s.id))];
  return ordered.filter((s): s is VideoStory => Boolean(s)).slice(0, 2);
}

const Arrow = () => (
  <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0 text-accent transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
);

export function AtAGlance({ stories, steps, destinations }: { stories: VideoStory[]; steps: ProcessStep[]; destinations: Destination[] }) {
  const [first, second] = pickStories(stories);
  return (
    <section className="section-y" aria-labelledby="glance-title">
      <div className="shell">
        <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-16">
          <div>
            <Label>Ethos at a glance</Label>
            <h2 id="glance-title" className="t-display mt-3">
              Real students. Real routes. <em>One team behind them.</em>
            </h2>
            <span aria-hidden="true" className="mt-4 block h-[3px] w-14 rounded-full bg-accent-bright" />
          </div>
          <p className="max-w-[46ch] text-[1.05rem] text-ink-soft lg:pb-2">Hear from the students and parents we have guided, and see where we can take you next.</p>
        </div>

        <div className="glance-grid mt-9 lg:mt-12" data-reveal-root="" data-stagger="0.07">
          <div className="glance-tile g-hero" data-reveal>
            <Image src="/media/photos/hero-graduates.webp" alt="" fill sizes="(min-width: 1024px) 46vw, 92vw" className="glance-img object-cover" />
            <span className="glance-shade" aria-hidden="true" />
            <div className="relative z-[1] mt-auto p-5 sm:p-7">
              <p className="t-card max-w-[17ch] !text-[clamp(1.45rem,1.05rem+1.6vw,2.3rem)] !leading-[1.08] text-canvas">From Gurugram to the world’s leading universities</p>
              <ConsultationButton source="home-glance" className="mt-4">
                Book a consultation
              </ConsultationButton>
            </div>
          </div>

          {first ? (
            <div className="g-story-a" data-reveal>
              <InlineStory story={toInline(first)} sizes="(min-width: 1024px) 22vw, 46vw" />
            </div>
          ) : null}

          <div className="glance-tile g-fact" data-reveal>
            <span className="t-numeral text-[clamp(2.6rem,1.9rem+2.4vw,3.6rem)] leading-none text-accent-soft">5</span>
            <span className="mt-2 text-[0.88rem] leading-snug text-canvas/85">specialists behind every student</span>
          </div>

          {steps.length ? (
            <div className="g-steps" data-reveal>
              <StepsTicker steps={steps.map((s) => ({ title: s.title }))} icons={stepIcons} />
            </div>
          ) : null}

          <nav className="glance-tile g-dest" aria-label="Study destinations" data-reveal>
            <Label className="mb-1.5">Study destinations</Label>
            <ul>
              {destinations.map((d) => (
                <li key={d.slug}>
                  <Link href={d.path} className="group glance-dest-link">
                    <span className="t-card !text-[1.08rem]">{d.shortName === "USA" ? "United States" : d.name}</span>
                    <Arrow />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="glance-tile g-photo" data-reveal>
            <Image src="/media/photos/mentoring.webp" alt="A counsellor in a one-on-one session with a student" fill sizes="(min-width: 1024px) 22vw, 46vw" className="glance-img object-cover object-[70%_50%]" />
            <span className="glance-tag">One-on-one counselling</span>
          </div>

          {second ? (
            <div className="g-story-b" data-reveal>
              <InlineStory story={toInline(second)} sizes="(min-width: 1024px) 22vw, 46vw" />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
