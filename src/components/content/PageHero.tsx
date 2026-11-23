import Image from "next/image";
import type { ReactNode } from "react";
import type { Img } from "@/content/types";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

export type PanelTone = "butter" | "sage" | "coral" | "lilac" | "sky";

const fallback: Img = { src: "/media/photos/library-hall.webp", alt: "", width: 2400, height: 1600 };

/**
 * Inner-page banner in the original site's style: the page photograph under a navy overlay, with the
 * breadcrumb trail, title, introduction and actions in white. An optional `aside` (e.g. test facts)
 * sits on the right on large screens. (`tone` is accepted for compatibility.)
 */
export function PageHero({
  label,
  title,
  intro,
  crumbs,
  image,
  actions,
  aside,
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
  const bg = image ?? fallback;
  return (
    <section className="page-banner overflow-hidden">
      <Image src={bg.src} alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(7_28_63/0.94)_0%,rgb(11_42_91/0.86)_55%,rgb(11_42_91/0.62)_100%)]" />
      <div className="shell py-12 sm:py-16 lg:py-20">
        <Breadcrumbs items={crumbs} />
        <div className={`mt-6 grid gap-8 ${aside ? "lg:grid-cols-12 lg:items-center" : ""}`}>
          <div className={aside ? "lg:col-span-7" : "max-w-3xl"}>
            {label ? <p className="t-label text-accent-soft">{label}</p> : null}
            <h1 className="t-hero mt-3 !text-[clamp(1.9rem,1.2rem+2.8vw,3.25rem)]">{title}</h1>
            <span aria-hidden="true" className="mt-5 block h-[3px] w-14 rounded-full bg-accent-bright" />
            {intro ? <div className="t-lead mt-5 max-w-2xl text-canvas/85">{intro}</div> : null}
            {actions ? <div className="mt-8 flex flex-wrap items-center gap-3">{actions}</div> : null}
          </div>
          {aside ? <div className="text-ink lg:col-span-5">{aside}</div> : null}
        </div>
      </div>
    </section>
  );
}
