"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type InlineStoryData = {
  id: string;
  speaker: string;
  relation?: string;
  university: string;
  poster: string;
  src: string;
  captions?: string;
  durationSeconds?: number;
};

const PLAY_EVENT = "ethos:inline-story-play";

const clock = (s?: number) => (s ? `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, "0")}` : "");
const spoken = (s?: number) => (s ? `${Math.floor(s / 60)} min ${Math.round(s % 60)} s` : "");

/**
 * A student-story tile whose video plays inside the tile — no dialog or new screen. Before it starts
 * the tile shows the portrait and a play button; once playing it shows pause / mute / captions buttons
 * and a thin progress line. Only one tile plays at a time, and a tile pauses when scrolled out of view.
 */
export function InlineStory({ story, className = "", sizes }: { story: InlineStoryData; className?: string; sizes: string }) {
  const tileRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [captions, setCaptions] = useState(true);

  // Pause when another story starts, or when this tile leaves the screen.
  useEffect(() => {
    const onOther = (e: Event) => {
      if ((e as CustomEvent<string>).detail !== story.id) videoRef.current?.pause();
    };
    window.addEventListener(PLAY_EVENT, onOther);
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) videoRef.current?.pause();
    }, { threshold: 0.2 });
    if (tileRef.current) io.observe(tileRef.current);
    return () => {
      window.removeEventListener(PLAY_EVENT, onOther);
      io.disconnect();
    };
  }, [story.id]);

  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    window.dispatchEvent(new CustomEvent(PLAY_EVENT, { detail: story.id }));
    v.muted = muted;
    setStarted(true);
    v.play().catch(() => {
      // Browsers may refuse sound without a gesture they recognise; fall back to muted playback.
      v.muted = true;
      setMuted(true);
      v.play().catch(() => setStarted(false));
    });
  };
  const toggle = () => (videoRef.current?.paused ? play() : videoRef.current?.pause());
  const toggleCaptions = () => {
    const v = videoRef.current;
    if (!v || !v.textTracks.length) return;
    const track = v.textTracks[0];
    track.mode = track.mode === "showing" ? "hidden" : "showing";
    setCaptions(track.mode === "showing");
  };
  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const who = `${story.speaker}’s story`;

  return (
    <div ref={tileRef} className={`glance-tile story-tile ${started ? "is-started" : ""} ${playing ? "is-playing" : ""} ${className}`}>
      <video
        ref={videoRef}
        className="story-video"
        playsInline
        preload="none"
        poster={story.poster}
        aria-label={`${who} — ${story.university}`}
        onClick={toggle}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          setPlaying(false);
          setStarted(false);
          if (videoRef.current) videoRef.current.currentTime = 0;
        }}
        onTimeUpdate={(e) => {
          const v = e.currentTarget;
          if (barRef.current && v.duration) barRef.current.style.transform = `scaleX(${v.currentTime / v.duration})`;
        }}
      >
        <source src={story.src} type="video/mp4" />
        {story.captions ? <track kind="captions" src={story.captions} srcLang="en" label="English" default /> : null}
      </video>

      {/* Before playback: portrait, play button and name. */}
      <div className="story-cover" aria-hidden={started}>
        <Image src={story.poster} alt="" fill sizes={sizes} className="object-cover" />
        <span className="story-shade" />
        <span className="story-name">
          <span className="t-card block !text-[1.12rem] leading-tight">{story.speaker}</span>
          <span className="mt-0.5 block text-[0.78rem] leading-snug text-canvas/85">
            {story.relation ? `${story.relation} · ` : ""}
            {story.university}
          </span>
          {story.durationSeconds ? <span className="story-dur">Watch · {clock(story.durationSeconds)}</span> : null}
        </span>
      </div>
      {!started ? (
        <button type="button" className="story-play" onClick={play} aria-label={`Play ${who}${story.durationSeconds ? ` (${spoken(story.durationSeconds)})` : ""}`}>
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      ) : (
        <div className="story-controls">
          <button type="button" onClick={toggle} aria-label={playing ? `Pause ${who}` : `Play ${who}`}>
            {playing ? (
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          <button type="button" onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"} aria-pressed={muted}>
            {muted ? (
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M4 9v6h4l5 4V5L8 9H4Zm12.6 3 2.7-2.7-1.1-1.1-2.7 2.7-2.7-2.7-1.1 1.1 2.7 2.7-2.7 2.7 1.1 1.1 2.7-2.7 2.7 2.7 1.1-1.1-2.7-2.7Z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M4 9v6h4l5 4V5L8 9H4Zm11.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4ZM13 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6Z" />
              </svg>
            )}
          </button>
          {story.captions ? (
            <button type="button" onClick={toggleCaptions} aria-label="Captions" aria-pressed={captions} className="story-cc">
              CC
            </button>
          ) : null}
        </div>
      )}
      <span className="story-progress" aria-hidden="true">
        <span ref={barRef} />
      </span>
    </div>
  );
}
