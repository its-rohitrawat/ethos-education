"use client";

import { useEffect, useState } from "react";

/**
 * The "6 steps" tile: plays through every step on a loop, like a GIF. Each step shows for a few
 * seconds while its progress bar fills; the bar's animationend moves to the next step, so pausing the
 * bar pauses the whole loop. Hovering or focusing the tile holds it, and the pause button stops it
 * (WCAG 2.2.2). Reduced-motion users see all six steps as a still list.
 */
export function StepsTicker({ steps, icons, className = "" }: { steps: { title: string }[]; icons: string[]; className?: string }) {
  const [i, setI] = useState(0);
  const [stopped, setStopped] = useState(false);
  const [held, setHeld] = useState(false);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setStill(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const n = steps.length;
  const step = steps[i];
  const pad = (k: number) => String(k).padStart(2, "0");

  return (
    <div
      className={`glance-tile steps-tile ${still ? "is-still" : ""} ${className}`}
      data-paused={stopped || held ? "" : undefined}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(false)}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="leading-none">
          <span className="font-display text-[1.45rem] font-extrabold text-brand">{n} steps</span>
          {still ? null : <span className="mt-1.5 block text-[0.8rem] leading-snug text-ink-soft">from the first chat to the first day on campus</span>}
        </p>
        {still ? null : (
          <button
            type="button"
            className="steps-toggle"
            onClick={() => setStopped((s) => !s)}
            aria-label={stopped ? "Play the steps animation" : "Pause the steps animation"}
          >
            {stopped ? (
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
              </svg>
            )}
          </button>
        )}
      </div>

      {/* Screen readers get the whole list once; the animation itself is decorative. */}
      <ol className="sr-only">
        {steps.map((s) => (
          <li key={s.title}>{s.title}</li>
        ))}
      </ol>

      {still ? (
        <ol className="steps-list" aria-hidden="true">
          {steps.map((s, k) => (
            <li key={s.title}>
              <b>{pad(k + 1)}</b> {s.title}
            </li>
          ))}
        </ol>
      ) : (
        <>
          <div className="steps-stage" aria-hidden="true">
            <div key={i} className="steps-item">
              <span className="steps-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d={icons[i % icons.length]} />
                </svg>
              </span>
              <span className="min-w-0">
                <span className="steps-kicker">
                  Step {pad(i + 1)} / {pad(n)}
                </span>
                <span className="steps-title t-card">{step.title}</span>
              </span>
            </div>
          </div>
          <div className="steps-bars" aria-hidden="true">
            {steps.map((s, k) => (
              <span key={s.title} className={k < i ? "is-done" : k === i ? "is-now" : ""}>
                <i onAnimationEnd={k === i ? () => setI((x) => (x + 1) % n) : undefined} />
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
