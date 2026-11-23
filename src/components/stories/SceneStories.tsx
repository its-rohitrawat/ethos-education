"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

export type SceneStory = {
  id: string;
  speaker: string;
  student: string;
  relation?: string;
  university: string;
  poster: string;
  preview: string;
  src: string;
  captions?: string;
};

/**
 * Story cards that float through the "Worldwide" scene. Each card loops a short, silent preview while
 * it is on screen (paused otherwise, and never for reduced-motion or data-saver users); activating a
 * card opens the full testimonial — sound, controls and captions — in a native <dialog>.
 */
export function SceneStories({ stories, slots }: { stories: SceneStory[]; slots: { className: string; style: CSSProperties }[] }) {
  const [active, setActive] = useState<SceneStory | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const fullRef = useRef<HTMLVideoElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Play previews only while visible.
  useEffect(() => {
    const root = cardsRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduce || saveData) return;
    const videos = Array.from(root.querySelectorAll<HTMLVideoElement>("video[data-preview]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const v = e.target as HTMLVideoElement;
          if (e.isIntersecting) {
            if (v.preload !== "auto") v.preload = "auto";
            v.play().catch(() => {});
          } else v.pause();
        }
      },
      { threshold: 0.15 },
    );
    videos.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, []);

  const open = (s: SceneStory) => {
    setActive(s);
    requestAnimationFrame(() => {
      dialogRef.current?.showModal();
      fullRef.current?.play().catch(() => {});
    });
  };

  return (
    <div ref={cardsRef} className="contents">
      {stories.map((s, i) => {
        const slot = slots[i % slots.length];
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => open(s)}
            className={`scene-float story-card group absolute overflow-hidden rounded-xl bg-ink text-left ${slot.className}`}
            style={slot.style}
            aria-label={`Watch ${s.speaker}’s story — ${s.university}`}
          >
            <video data-preview="" muted loop playsInline preload="none" poster={s.poster} className="absolute inset-0 h-full w-full object-cover" aria-hidden="true">
              <source src={s.preview} type="video/mp4" />
            </video>
            <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgb(0_0_0/0.65))]" />
            <span className="absolute inset-x-3 bottom-3 text-canvas" aria-hidden="true">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-canvas px-3 py-1.5 font-display text-[0.8rem] font-semibold text-ink [font-variation-settings:'opsz'_24]">
                Watch
                <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span className="t-card mt-2 block !text-[1.05rem]">{s.speaker}</span>
              <span className="block text-[0.75rem] text-canvas/80">{s.university}</span>
            </span>
          </button>
        );
      })}

      <dialog
        ref={dialogRef}
        aria-label={active ? `${active.speaker}’s story` : "Student story"}
        className="story-dialog m-auto max-h-[92dvh] w-[min(92vw,26rem)] overflow-hidden rounded-2xl bg-ink p-0 text-canvas backdrop:bg-ink/80"
        onClose={() => {
          fullRef.current?.pause();
          setActive(null);
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialogRef.current?.close();
        }}
      >
        {active ? (
          <div className="relative">
            <video key={active.id} ref={fullRef} controls playsInline poster={active.poster} className="block aspect-[9/16] max-h-[82dvh] w-full bg-ink object-contain">
              <source src={active.src} type="video/mp4" />
              {active.captions ? <track kind="captions" src={active.captions} srcLang="en" label="English" default /> : null}
            </video>
            <div className="flex items-center justify-between gap-4 px-4 py-3">
              <div>
                <p className="font-display font-semibold [font-variation-settings:'opsz'_24]">{active.speaker}</p>
                <p className="text-[0.8rem] text-canvas/70">
                  {active.relation ? `${active.relation} · ` : ""}
                  {active.university}
                </p>
              </div>
              <button type="button" onClick={() => dialogRef.current?.close()} className="inline-flex h-10 items-center rounded-full border border-canvas/40 px-4 text-[0.85rem]">
                Close
              </button>
            </div>
          </div>
        ) : null}
      </dialog>
    </div>
  );
}

/** Feeds pointer position into --px / --py (−1…1) on the parent, for layered 3D parallax. */
export function DepthPointer() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const host = ref.current?.parentElement;
    if (!host || !window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = host.getBoundingClientRect();
        host.style.setProperty("--px", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
        host.style.setProperty("--py", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
      });
    };
    const onLeave = () => {
      host.style.setProperty("--px", "0");
      host.style.setProperty("--py", "0");
    };
    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);
  return <span ref={ref} hidden />;
}
