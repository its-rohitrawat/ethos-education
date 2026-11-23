"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export type StoryVideo = {
  id: string;
  speaker: string;
  relation?: string;
  programme: string;
  university: string;
  country: string;
  poster: string;
  src: string;
  captions?: string;
  durationSeconds?: number;
};

const mmss = (s?: number) => (s ? `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, "0")}` : "");

function Play({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center justify-center rounded-full bg-accent text-canvas shadow-lg ${className}`} aria-hidden="true">
      <svg viewBox="0 0 24 24" className="ml-0.5 h-[45%] w-[45%]" fill="currentColor">
        <path d="M8 5v14l11-7z" />
      </svg>
    </span>
  );
}

/**
 * Testimonial videos, as on the original homepage: dark portrait cards with an orange play button,
 * the speaker and their programme / university underneath. Nothing autoplays; a card opens the full
 * video (sound, controls, captions) in a native <dialog>.
 * `mode="hero"` renders a single larger card for the homepage hero.
 */
export function StoryVideos({ stories, mode = "grid" }: { stories: StoryVideo[]; mode?: "grid" | "hero" }) {
  const [active, setActive] = useState<StoryVideo | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const open = (s: StoryVideo) => {
    setActive(s);
    requestAnimationFrame(() => {
      dialogRef.current?.showModal();
      videoRef.current?.play().catch(() => {});
    });
  };

  return (
    <>
      {mode === "hero" ? (
        stories.slice(0, 1).map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => open(s)}
            className="group relative mx-auto block aspect-[4/5] w-full max-w-[22rem] overflow-hidden rounded-xl border-2 border-accent-bright bg-brand-deep text-left shadow-2xl lg:ml-auto lg:mr-0"
            aria-label={`Play ${s.speaker}’s story — ${s.programme}, ${s.university}`}
          >
            <Image src={s.poster} alt="" fill priority sizes="(min-width: 1024px) 22rem, 80vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
            <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgb(7_28_63/0.85))]" />
            <Play className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2" />
            <span className="absolute inset-x-4 bottom-4 text-canvas" aria-hidden="true">
              <span className="t-card block">{s.speaker}</span>
              <span className="block text-[0.85rem] text-canvas/85">
                {s.programme} · {s.university}
              </span>
            </span>
          </button>
        ))
      ) : (
        <ul className="-mx-[var(--gutter)] flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] pb-3 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0 xl:grid-cols-6">
          {stories.map((s) => (
            <li key={s.id} className="w-[68vw] max-w-[17rem] shrink-0 snap-start md:w-auto md:max-w-none">
              <button type="button" onClick={() => open(s)} className="group flex h-full w-full flex-col overflow-hidden rounded-xl bg-brand text-left text-canvas shadow-md transition-shadow hover:shadow-xl" aria-label={`Play ${s.speaker}’s story — ${s.programme}, ${s.university}`}>
                <span className="relative block aspect-[3/4] overflow-hidden bg-brand-deep">
                  <Image src={s.poster} alt="" fill sizes="(min-width: 1280px) 15vw, (min-width: 768px) 30vw, 68vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                  <Play className="absolute bottom-3 left-1/2 h-11 w-11 -translate-x-1/2" />
                  {s.durationSeconds ? <span className="absolute right-2 top-2 rounded bg-brand-deep/80 px-1.5 py-0.5 text-[0.7rem]">{mmss(s.durationSeconds)}</span> : null}
                </span>
                <span className="flex flex-1 flex-col items-center px-3 py-4 text-center" aria-hidden="true">
                  <span className="t-card !text-[1.35rem]">{s.speaker}</span>
                  {s.relation ? <span className="mt-0.5 text-[0.72rem] text-canvas/70">({s.relation})</span> : null}
                  <span className="mt-2 text-[0.78rem] font-semibold text-accent-soft">{s.programme}</span>
                  <span className="text-[0.75rem] text-canvas/80">{s.university}</span>
                  <span className="text-[0.75rem] text-canvas/60">{s.country}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

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
    </>
  );
}
