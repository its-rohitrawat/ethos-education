"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import type { StoryVideo } from "@/components/stories/StoryVideos";

export type HeroSlide = {
  id: string;
  /** Heading in three parts; `em` is highlighted in orange. */
  before?: string;
  em: string;
  after?: string;
  lead: string;
  image: { src: string; alt: string };
  video?: StoryVideo;
};

const INTERVAL = 7000;

/**
 * Homepage banner slider, after the original site's hero: three slides, each with its own photograph
 * (slow zoom), headline, line of support, consultation button and testimonial video. Autoplays every
 * 7s with arrows, progress dots and swipe; pauses on hover, keyboard focus, when the tab is hidden, or
 * via the pause button (WCAG 2.2.2). With prefers-reduced-motion it does not autoplay.
 * Only the first slide's heading is the page <h1>.
 */
export function HeroSlider({ slides, ctaHref = "/book-consultation/" }: { slides: HeroSlide[]; ctaHref?: string }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false); // user pressed pause
  const [hold, setHold] = useState(false); // hover / focus inside
  const [reduced, setReduced] = useState(false);
  const [active, setActive] = useState<StoryVideo | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const startX = useRef<number | null>(null);
  const count = slides.length;

  const go = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const running = count > 1 && !paused && !hold && !reduced && !active;
  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => {
      if (document.visibilityState === "visible") go(index + 1);
    }, INTERVAL);
    return () => window.clearTimeout(t);
  }, [running, index, go]);

  const openVideo = (v: StoryVideo) => {
    setActive(v);
    requestAnimationFrame(() => {
      dialogRef.current?.showModal();
      videoRef.current?.play().catch(() => {});
    });
  };

  const onPointerDown = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") startX.current = e.clientX;
  };
  const onPointerUp = (e: PointerEvent) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
  };

  return (
    <section
      className="hero-slider hero-photo relative isolate overflow-hidden bg-brand-deep text-canvas"
      aria-roledescription="carousel"
      aria-label="Ethos Education highlights"
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocusCapture={() => setHold(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHold(false);
      }}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      style={{ "--hs-interval": `${INTERVAL}ms` } as CSSProperties}
      data-running={running ? "" : undefined}
    >
      <div className="grid">
        {slides.map((s, i) => {
          const on = i === index;
          const Heading = i === 0 ? "h1" : "h2";
          return (
            <div
              key={s.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={!on}
              inert={!on}
              className={`hs-slide relative isolate [grid-area:1/1] ${on ? "is-active" : ""}`}
            >
              <div className="hs-bg absolute inset-0 -z-20 overflow-hidden">
                <Image src={s.image.src} alt={s.image.alt} fill priority={i === 0} loading={i === 0 ? "eager" : "lazy"} sizes="100vw" className="object-cover" />
              </div>
              <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(7_28_63/0.93)_0%,rgb(11_42_91/0.82)_55%,rgb(11_42_91/0.55)_100%)]" />
              <div className="shell grid items-center gap-10 pb-24 pt-14 sm:pt-20 lg:min-h-[36rem] lg:grid-cols-12 lg:pb-28 lg:pt-20">
                <div className="lg:col-span-7">
                  <p className="hs-in t-label text-accent-soft" style={{ "--d": "80ms" } as CSSProperties}>
                    Admissions counselling · Gurugram, India
                  </p>
                  <Heading className="hs-in t-hero mt-4" style={{ "--d": "180ms" } as CSSProperties}>
                    {s.before ? `${s.before} ` : null}
                    <em>{s.em}</em>
                    {s.after ? ` ${s.after}` : null}
                  </Heading>
                  <p className="hs-in t-lead mt-6 max-w-xl border-l-4 border-accent-bright pl-4 text-canvas/90" style={{ "--d": "300ms" } as CSSProperties}>
                    {s.lead}
                  </p>
                  <div className="hs-in mt-8 flex flex-wrap gap-3" style={{ "--d": "420ms" } as CSSProperties}>
                    <a
                      href={ctaHref}
                      data-consult={`hero-slide-${i + 1}`}
                      data-label="Book your consultation"
                      className="inline-flex min-h-12 items-center justify-center rounded-md bg-accent px-6 font-display text-[0.82rem] font-bold uppercase tracking-[0.08em] text-canvas transition-colors hover:bg-[#a83a0b]"
                    >
                      Book your consultation
                    </a>
                    <Link href="/admission/" className="inline-flex min-h-12 items-center justify-center rounded-md border border-canvas/60 px-6 font-display text-[0.82rem] font-bold uppercase tracking-[0.08em] text-canvas transition-colors hover:bg-canvas hover:text-brand">
                      Explore programmes
                    </Link>
                  </div>
                  {s.video ? (
                    <button
                      type="button"
                      onClick={() => openVideo(s.video as StoryVideo)}
                      className="hs-in mt-7 flex items-center gap-3 rounded-lg bg-canvas/10 p-2 pr-4 text-left ring-1 ring-canvas/20 lg:hidden"
                      style={{ "--d": "520ms" } as CSSProperties}
                      aria-label={`Play ${s.video.speaker}’s story — ${s.video.programme}, ${s.video.university}`}
                    >
                      <span className="relative h-14 w-11 shrink-0 overflow-hidden rounded-md bg-brand-deep">
                        <Image src={s.video.poster} alt="" fill sizes="44px" className="object-cover" />
                        <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center bg-black/25">
                          <svg viewBox="0 0 24 24" className="h-4 w-4 text-canvas" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </span>
                      </span>
                      <span aria-hidden="true">
                        <span className="block font-display text-[0.92rem] font-bold">Watch {s.video.speaker.split(" ")[0]}’s story</span>
                        <span className="block text-[0.78rem] text-canvas/75">{s.video.university}</span>
                      </span>
                    </button>
                  ) : null}
                </div>
                {s.video ? (
                  <div className="hs-in hidden lg:col-span-5 lg:block" style={{ "--d": "260ms" } as CSSProperties}>
                    <button
                      type="button"
                      onClick={() => openVideo(s.video as StoryVideo)}
                      className="group relative mx-auto block aspect-[4/5] w-full max-w-[20rem] overflow-hidden rounded-xl border-2 border-accent-bright bg-brand-deep text-left shadow-2xl lg:ml-auto lg:mr-0"
                      aria-label={`Play ${s.video.speaker}’s story — ${s.video.programme}, ${s.video.university}`}
                    >
                      <Image src={s.video.poster} alt="" fill sizes="(min-width: 1024px) 20rem, 80vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                      <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgb(7_28_63/0.85))]" />
                      <span aria-hidden="true" className="absolute left-1/2 top-1/2 inline-flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-canvas shadow-lg">
                        <svg viewBox="0 0 24 24" className="ml-0.5 h-7 w-7" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                      <span className="absolute inset-x-4 bottom-4" aria-hidden="true">
                        <span className="t-card block">{s.video.speaker}</span>
                        <span className="block text-[0.82rem] text-canvas/85">
                          {s.video.relation ? `${s.video.relation} · ` : ""}
                          {s.video.university}
                        </span>
                      </span>
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      {count > 1 ? (
        <div className="absolute inset-x-0 bottom-6 z-10">
          <div className="shell flex items-center gap-3">
            <button type="button" onClick={() => go(index - 1)} className="hs-ctrl" aria-label="Previous slide">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <ol className="flex items-center gap-2">
              {slides.map((s, i) => (
                <li key={s.id}>
                  <button type="button" onClick={() => go(i)} aria-label={`Show slide ${i + 1}`} aria-current={i === index ? "true" : undefined} className={`hs-dot ${i === index ? "is-on" : ""}`}>
                    <span key={i === index ? `${index}-on` : `${i}`} className="hs-dot-fill" />
                  </button>
                </li>
              ))}
            </ol>
            <button type="button" onClick={() => go(index + 1)} className="hs-ctrl" aria-label="Next slide">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button type="button" onClick={() => setPaused((p) => !p)} className="hs-ctrl" aria-label={paused ? "Play slideshow" : "Pause slideshow"} aria-pressed={paused}>
              {paused ? (
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      ) : null}

      <dialog
        ref={dialogRef}
        aria-label={active ? `${active.speaker}’s story` : "Student story"}
        className="m-auto max-h-[92dvh] w-[min(92vw,26rem)] overflow-hidden rounded-xl bg-brand-deep p-0 text-canvas backdrop:bg-brand-deep/80"
        onClose={() => {
          videoRef.current?.pause();
          setActive(null);
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialogRef.current?.close();
        }}
      >
        {active ? (
          <div>
            <video key={active.id} ref={videoRef} controls playsInline poster={active.poster} className="block aspect-[9/16] max-h-[80dvh] w-full bg-black object-contain">
              <source src={active.src} type="video/mp4" />
              {active.captions ? <track kind="captions" src={active.captions} srcLang="en" label="English" default /> : null}
            </video>
            <div className="flex items-center justify-between gap-4 px-4 py-3">
              <div>
                <p className="font-display font-bold">{active.speaker}</p>
                <p className="text-[0.8rem] text-canvas/75">
                  {active.programme} · {active.university}
                </p>
              </div>
              <button type="button" onClick={() => dialogRef.current?.close()} className="inline-flex h-10 items-center rounded-md border border-canvas/40 px-4 text-[0.85rem] font-semibold">
                Close
              </button>
            </div>
          </div>
        ) : null}
      </dialog>
    </section>
  );
}
