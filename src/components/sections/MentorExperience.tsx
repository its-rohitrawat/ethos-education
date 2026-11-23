"use client";

import { useEffect, useRef, useState } from "react";
import type { MentorRole } from "@/content/types";

const SIZE = 560;
const C = SIZE / 2;
const R = 205;

const nodePos = (i: number) => {
  const angle = (-90 + i * 72) * (Math.PI / 180);
  return { x: C + R * Math.cos(angle), y: C + R * Math.sin(angle) };
};

/**
 * The 5:1 model. Desktop: a sticky orbital diagram (student at the centre, five specialists around)
 * whose active specialist follows the role being read — via ScrollTrigger, without pinning or
 * hijacking scroll. Mobile / reduced motion: the same content as a simple stacked list, and no GSAP.
 */
export function MentorExperience({ roles }: { roles: MentorRole[] }) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1);

  // Desktop-only choreography. GSAP is imported on demand, so mobile visitors never download it.
  useEffect(() => {
    const el = root.current;
    if (!el || !window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)").matches) return;
    let cancelled = false;
    let ctx: { revert: () => void } | undefined;
    import("@/lib/motion/gsap").then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        const nodes = el.querySelectorAll("[data-orbit-node]");
        const spokes = el.querySelectorAll("[data-orbit-spoke]");
        gsap.from(el.querySelector("[data-orbit-ring]"), { scale: 0.6, autoAlpha: 0, transformOrigin: "50% 50%", duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 70%", once: true } });
        gsap.from(spokes, { scaleY: 0, transformOrigin: "50% 100%", autoAlpha: 0, duration: 1, stagger: 0.12, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 65%", once: true } });
        gsap.from(nodes, { scale: 0, autoAlpha: 0, transformOrigin: "50% 50%", duration: 1, stagger: 0.12, ease: "back.out(1.6)", delay: 0.2, scrollTrigger: { trigger: el, start: "top 65%", once: true } });
        el.querySelectorAll<HTMLElement>("[data-role]").forEach((item, i) => {
          ScrollTrigger.create({ trigger: item, start: "top 55%", end: "bottom 45%", onToggle: (self) => self.isActive && setActive(i) });
        });
      }, el);
    });
    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  const activeRole = active >= 0 ? roles[active] : null;

  return (
    <div ref={root} className="editorial-grid gap-y-12">
      {/* Diagram */}
      <div className="col-span-4 lg:col-span-6">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
          <figure className="relative mx-auto aspect-square w-full max-w-[34rem]" aria-hidden="true">
            <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-full w-full overflow-visible">
              <g data-orbit-ring>
                <circle cx={C} cy={C} r={R} fill="none" stroke="currentColor" strokeOpacity="0.18" />
                <circle cx={C} cy={C} r={R - 70} fill="none" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="2 6" />
                <circle cx={C} cy={C} r={R + 46} fill="none" stroke="currentColor" strokeOpacity="0.08" />
              </g>
              {roles.map((_, i) => {
                const p = nodePos(i);
                return (
                  <line
                    key={`spoke-${i}`}
                    data-orbit-spoke
                    x1={C}
                    y1={C}
                    x2={p.x}
                    y2={p.y}
                    stroke={active === i ? "var(--color-brand)" : "currentColor"}
                    strokeOpacity={active === i ? 1 : 0.18}
                    strokeWidth={active === i ? 1.5 : 1}
                    style={{ transition: "stroke 0.6s, stroke-opacity 0.6s" }}
                  />
                );
              })}
              <circle cx={C} cy={C} r="64" fill="var(--color-brand)" />
              <text x={C} y={C - 6} textAnchor="middle" className="fill-canvas font-display" fontSize="30">
                You
              </text>
              <text x={C} y={C + 20} textAnchor="middle" className="fill-canvas/70 font-mono uppercase" fontSize="9.5" letterSpacing="1.6">
                The student
              </text>
              {roles.map((role, i) => {
                const p = nodePos(i);
                const on = active === i;
                const labelBelow = p.y > C - 10;
                return (
                  <g key={role.index} data-orbit-node style={{ transition: "transform 0.6s cubic-bezier(.22,1,.36,1)" }}>
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={on ? 30 : 24}
                      fill={on ? "var(--color-brand)" : "var(--color-canvas)"}
                      stroke={on ? "var(--color-brand)" : "currentColor"}
                      strokeOpacity={on ? 1 : 0.35}
                      style={{ transition: "r 0.6s cubic-bezier(.22,1,.36,1), fill 0.6s" }}
                    />
                    <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize="11" className={`font-mono ${on ? "fill-canvas" : "fill-current"}`}>
                      {role.index}
                    </text>
                    <text
                      x={p.x}
                      y={labelBelow ? p.y + 52 : p.y - 42}
                      textAnchor="middle"
                      className="font-display fill-current"
                      fontSize="21"
                      style={{ opacity: on || active < 0 ? 1 : 0.45, transition: "opacity 0.6s" }}
                    >
                      {role.title}
                    </text>
                  </g>
                );
              })}
            </svg>
          </figure>
          <p className="t-label mt-6 hidden min-h-[1.2em] text-center text-brand lg:block" aria-live="polite">
            {activeRole ? `${activeRole.index} — ${activeRole.short}` : "Five specialists · one student"}
          </p>
        </div>
      </div>

      {/* Roles */}
      <ol className="col-span-4 lg:col-span-5 lg:col-start-8">
        {roles.map((role, i) => (
          <li
            key={role.index}
            data-role
            className={`border-t border-line py-10 transition-opacity duration-700 lg:flex lg:min-h-[62vh] lg:flex-col lg:justify-center lg:py-16 ${
              active === -1 || active === i ? "opacity-100" : "lg:opacity-35"
            }`}
          >
            <p className="t-label text-brand">
              {role.index} / 05 · {role.short}
            </p>
            <h3 className="t-title mt-4">{role.title}</h3>
            <p className="t-lead mt-5 text-ink-soft">{role.description}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {role.contributes.map((c) => (
                <li key={c} className="rounded-full border border-line-strong px-3.5 py-1.5 text-[0.85rem]">
                  {c}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
