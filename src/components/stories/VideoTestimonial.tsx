"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { VideoStory } from "@/content/types";
import { PendingBadge } from "@/components/ui/primitives";
import { track } from "@/lib/analytics";

/**
 * A testimonial card: portrait poster, verbatim quote and credentials. The video (with captions)
 * loads only when the visitor presses play, so it costs nothing until requested.
 */
export function VideoTestimonial({ story, size = "default" }: { story: VideoStory; size?: "default" | "feature" }) {
  const [playing, setPlaying] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const minutes = `${Math.floor(story.video.durationSeconds / 60)}:${String(story.video.durationSeconds % 60).padStart(2, "0")}`;

  const play = () => {
    setPlaying(true);
    track("video_play", { story: story.id });
    requestAnimationFrame(() => video.current?.play().catch(() => undefined));
  };

  return (
    <figure className={`group flex h-full flex-col ${size === "feature" ? "lg:flex-row lg:gap-12" : ""}`}>
      <div className={`relative overflow-hidden rounded-[var(--radius-card)] bg-night ${size === "feature" ? "aspect-[4/5] lg:w-[44%] lg:shrink-0" : "aspect-[4/5]"}`}>
        {playing ? (
          <video
            ref={video}
            className="absolute inset-0 h-full w-full object-cover"
            controls
            playsInline
            preload="metadata"
            poster={story.video.poster}
            aria-label={`Video testimonial from ${story.speaker}`}
          >
            <source src={story.video.src} type="video/mp4" />
            {story.video.captions ? <track kind="captions" src={story.video.captions} srcLang="en" label="English (auto-generated)" default /> : null}
          </video>
        ) : (
          <button type="button" onClick={play} className="absolute inset-0 block h-full w-full text-left" aria-label={`Play video testimonial from ${story.speaker}, ${minutes}`}>
            <Image
              src={story.video.poster}
              alt=""
              fill
              sizes="(min-width: 1024px) 30vw, 80vw"
              className="portrait-grade object-cover transition-transform duration-[1.4s] ease-[var(--ease-editorial)] group-hover:scale-[1.04]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-transparent" aria-hidden="true" />
            <span className="absolute bottom-5 left-5 inline-flex items-center gap-3 text-canvas" aria-hidden="true">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-canvas text-ink transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:scale-110">
                <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4" fill="currentColor">
                  <path d="M7 4.5v15l12-7.5-12-7.5Z" />
                </svg>
              </span>
              <span className="t-label text-[0.65rem]">Watch · {minutes}</span>
            </span>
          </button>
        )}
      </div>
      <figcaption className={`flex flex-1 flex-col ${size === "feature" ? "pt-8 lg:pt-0" : "pt-6"}`}>
        {story.quote ? (
          <blockquote className={`font-semibold leading-snug tracking-[-0.02em] ${size === "feature" ? "text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)]" : "text-[1.125rem]"}`}>
            <span className="text-brand" aria-hidden="true">
              “
            </span>
            {story.quote}
            <span className="text-brand" aria-hidden="true">
              ”
            </span>
          </blockquote>
        ) : null}
        <div className={`mt-auto border-t border-line pt-5 ${story.quote ? "mt-8" : ""}`}>
          <p className="t-card !text-[1.5rem]">{story.speaker}</p>
          {story.relation ? <p className="t-small text-ink-soft">{story.relation}</p> : null}
          <p className="t-label mt-3 text-xs text-ink-soft">
            {story.university} · {story.programme}
          </p>
          {!story.verified ? (
            <span className="mt-3 inline-block">
              <PendingBadge note="Confirm consent to feature this testimonial on the new site" />
            </span>
          ) : null}
        </div>
      </figcaption>
    </figure>
  );
}
