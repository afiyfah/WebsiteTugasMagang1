"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const SKILLS = ["React", "Next.js", "Three.js", "GSAP", "TypeScript", "Tailwind"];

export default function About() {
  const root = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const b1 = useRef<HTMLDivElement>(null);
  const b2 = useRef<HTMLDivElement>(null);
  const b3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Progress is measured directly from the About section's own position each
    // frame — 0% the instant it pins at the top, 100% as it releases into
    // Projects — so it is exact and strictly scoped to About (independent of
    // ScrollTrigger's global layout measurements).
    const update = () => {
      const section = root.current;
      if (!section) return;
      const total = section.offsetHeight - window.innerHeight;
      const p =
        total > 0
          ? Math.min(1, Math.max(0, -section.getBoundingClientRect().top / total))
          : 0;

      if (numRef.current) numRef.current.textContent = `${Math.round(p * 100)}%`;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;

      // reveal all three in the first ~70% so there's a pause to read before
      // the section hands off to Projects
      b1.current?.classList.toggle("show", p >= 0.2);
      b2.current?.classList.toggle("show", p >= 0.45);
      b3.current?.classList.toggle("show", p >= 0.7);

      // show the % only once the laptop has settled dead-center, fade out at end
      if (screenRef.current) {
        let o = 1;
        if (p < 0.1) o = 0;
        else if (p < 0.17) o = (p - 0.1) / 0.07;
        else if (p > 0.97) o = Math.max(0, (1 - p) / 0.03);
        screenRef.current.style.opacity = String(o);
      }
    };

    gsap.ticker.add(update);
    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <section id="about" ref={root} className="relative" style={{ height: "230vh" }}>
      {/* pointer-events-none so the laptop canvas behind stays draggable in
          About; the bubbles/HUD are display-only */}
      <div className="sticky top-0 h-screen w-full overflow-hidden z-30 pointer-events-none">
        {/* the big "ABOUT" word lives in <StageWord /> (behind the laptop) */}

        {/* heading */}
        <div className="absolute top-[13%] left-6 md:left-16 max-w-md pointer-events-none">
          <p className="eyebrow mb-5">About me</p>
        </div>

        {/* scroll-progress HUD sitting on the centered laptop screen */}
        <div ref={screenRef} className="about-screen" style={{ opacity: 0 }}>
          <span ref={numRef} className="about-screen-num">
            0%
          </span>
          <div className="about-screen-track">
            <div ref={barRef} className="about-screen-fill" />
          </div>
        </div>

        {/* 01 — identity (>= 25%) */}
        <div
          ref={b1}
          className="about-bubble hud hud-1"
          style={{ top: "28%", left: "12%" }}
        >
          <div className="hud-head">
            <span className="dot" />
            01 / Identity
          </div>
          <p className="font-display text-lg text-[var(--ink)] leading-tight">
            Nala Arunika
          </p>
          <p className="font-mono text-[0.72rem] text-[var(--ink-dim)] mt-1">
            Bogor, Indonesia
          </p>
        </div>

        {/* 02 — about (>= 50%) */}
        <div
          ref={b2}
          className="about-bubble hud violet hud-2"
          style={{ top: "40%", right: "10%" }}
        >
          <div className="hud-head">
            <span className="dot" />
            02 / About
          </div>
          <p className="text-[0.82rem] text-[var(--ink)] leading-relaxed">
            Frontend developer focused on creating responsive websites with
            smooth animations and 3D experiences.
          </p>
        </div>

        {/* 03 — skills (>= 75%) */}
        <div
          ref={b3}
          className="about-bubble hud amber hud-3"
          style={{ top: "50%", left: "5%" }}
        >
          <div className="hud-head">
            <span className="dot" />
            03 / Skill
          </div>
          <div className="flex flex-wrap gap-1.5">
            {SKILLS.map((s) => (
              <span
                key={s}
                className="font-mono text-[0.66rem] px-2 py-1 rounded-md border border-[var(--line)] text-[var(--ink-dim)]"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* bottom meta row */}
        <div className="absolute bottom-8 left-6 md:left-16 right-6 md:right-16 flex items-center justify-between font-mono text-[0.66rem] uppercase tracking-[0.2em] text-[var(--ink-faint)]">
          <span>Drag the laptop to rotate</span>
          <span>/ 02 — About</span>
        </div>
      </div>
    </section>
  );
}
