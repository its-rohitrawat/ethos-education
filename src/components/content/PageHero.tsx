import type { ReactNode } from "react";
import type { Img } from "@/content/types";
import { Reveal } from "@/components/motion/Reveal";
import { RevealImage } from "@/components/motion/RevealImage";
import { SplitTextHeading } from "@/components/motion/SplitTextHeading";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

export type PanelTone = "butter" | "sage" | "coral" | "lilac" | "sky";

/** Each section of the site has its own pastel, so the hero colour tells you where you are. */
const toneBySection: Record<string, PanelTone> = {
  "/about/": "butter",
  "/admission/": "coral",
  "/ivy-mentors/": "lilac",
  "/test-prep/": "sage",
  "/career-counselling/": "sky",
  "/study-abroad/": "butter",
  "/success-stories/": "lilac",
  "/faq/": "sky",
  "/blog/": "sage",
  "/contact/": "butter",
  "/book-consultation/": "lilac",
};

export function toneFor(path?: string): PanelTone {
  if (!path) return "coral";
  const key = Object.keys(toneBySection).find((k) => path.startsWith(k));
  return key ? toneBySection[key] : "coral";
}

/**
 * Inner-page hero: a pastel panel with the title top-left, the introduction bottom-left and a photo on
 * the right. The cream page "slides over" its bottom edge with rounded corners.
 */
export function PageHero({
  label,
  title,
  intro,
  crumbs,
  image,
  actions,
  aside,
  tone,
}: {
  label?: string;
  index?: string;
  title: ReactNode;
  intro?: ReactNode;
  crumbs: Crumb[];
  image?: Img;
  actions?: ReactNode;
  aside?: ReactNode;
  tone?: PanelTone;
}) {
  const colour = tone ?? toneFor(crumbs[0]?.path);
  const side = image || aside;
  return (
    <section className={`panel-${colour} relative pb-[calc(var(--radius-panel)+clamp(3.5rem,8vw,7rem))] pt-[calc(var(--header-h)+1.5rem)] lg:pt-[calc(var(--header-h)+2.5rem)]`}>
      <div className="shell">
        <Breadcrumbs items={crumbs} />
        <div className={`mt-8 grid gap-10 lg:mt-10 ${side ? "lg:grid-cols-12 lg:gap-8" : ""}`}>
          <Reveal hero className={`flex flex-col ${side ? "lg:col-span-7" : "max-w-5xl"}`}>
            {label ? (
              <p data-reveal className="t-label mb-5">
                {label}
              </p>
            ) : null}
            <SplitTextHeading as="h1" trigger="load" delay={0.05} className="t-display">
              {title}
            </SplitTextHeading>
            {intro ? (
              <div data-reveal className="mt-8 max-w-xl text-ink/85 lg:mt-auto lg:pt-16">
                {intro}
              </div>
            ) : null}
            {actions ? (
              <div data-reveal className="mt-8 flex flex-wrap items-center gap-3">
                {actions}
              </div>
            ) : null}
          </Reveal>
          {image ? (
            <RevealImage
              image={image}
              hero
              priority
              sizes="(min-width: 1024px) 34vw, 92vw"
              className="aspect-[4/3] w-full self-start rounded-[var(--radius-card)] bg-mist lg:col-span-4 lg:col-start-9 lg:aspect-[5/6]"
            />
          ) : aside ? (
            <div className="self-start lg:col-span-5 lg:col-start-8">{aside}</div>
          ) : null}
        </div>
      </div>
      {/* The page beneath slides over the panel's bottom edge. */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[var(--radius-panel)] rounded-t-[var(--radius-panel)] bg-canvas" />
    </section>
  );
}
