import { ConsultationButton } from "@/components/consultation/ConsultationButton";
import { Reveal } from "@/components/motion/Reveal";
import { RevealImage } from "@/components/motion/RevealImage";
import { ArrowLink } from "@/components/ui/primitives";
import { SplitTextHeading } from "@/components/motion/SplitTextHeading";

const heroImage = {
  src: "/media/photos/hero-graduates.webp",
  alt: "Graduates throwing their caps into the air against a city skyline at sunset",
  width: 2400,
  height: 1600,
  provisional: true,
};

/** Centred, Apple-style hero: eyebrow, headline, one line of support, two actions, wide photo. */
export function HomeHero() {
  return (
    <section className="pt-[calc(var(--header-h)+3rem)] text-center lg:pt-[calc(var(--header-h)+5rem)]" aria-labelledby="hero-title">
      <div className="shell">
        <Reveal hero className="mx-auto max-w-4xl">
          <p data-reveal className="t-label text-accent-ink">
            Admissions counselling for the world’s leading universities
          </p>
          <SplitTextHeading as="h1" trigger="load" delay={0.08} id="hero-title" className="t-hero mt-4">
            Your ambition. <br className="max-sm:hidden" />
            <em>A world of possibility.</em>
          </SplitTextHeading>
          <p data-reveal className="t-lead mx-auto mt-6 max-w-2xl text-ink-soft">
            Personal guidance and expert mentorship — from your first shortlist to your first day on campus.
          </p>
          <div data-reveal className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <ConsultationButton source="hero" arrow={false}>
              Book a consultation
            </ConsultationButton>
            <ArrowLink href="/admission/">Explore programmes</ArrowLink>
          </div>
        </Reveal>
      </div>
      <div className="mt-14 px-[var(--gutter)] pb-[var(--section-y)] lg:mt-20">
        <RevealImage
          image={heroImage}
          hero
          priority
          sizes="(min-width: 1280px) 1184px, 94vw"
          className="mx-auto aspect-[4/5] w-full max-w-[var(--shell-max)] rounded-[var(--radius-media)] bg-mist sm:aspect-[16/9] lg:aspect-[2.2/1]"
        />
      </div>
    </section>
  );
}
