"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import FloatingLogos from "@/components/FloatingLogos";

const SKILLS = [
  "React",
  "Next.js",
  "Three.js",
  "WebGL",
  "TypeScript",
  "GSAP",
  "Tailwind",
  "Node.js",
];

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.35 });
      tl.from(".hero-tag", { opacity: 0, y: 12, duration: 0.8 })
        .from(
          ".hero-name .row span",
          {
            yPercent: 115,
            duration: 1.1,
            stagger: 0.12,
            ease: "power4.out",
          },
          "-=0.4"
        )
        .from(
          ".hero-fade",
          { opacity: 0, y: 20, duration: 0.9, stagger: 0.12 },
          "-=0.7"
        )
        .from(
          ".hero-edge",
          { opacity: 0, duration: 1 },
          "-=0.8"
        );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={root}
      className="relative h-screen w-full flex items-center px-6 md:px-16"
    >
      {/* subtle floating tech logos behind the laptop */}
      <FloatingLogos
        variant="hero"
        className="absolute inset-0 z-[5] overflow-hidden"
      />

      {/* left rotated edge label */}
      <div className="hero-edge side-label hidden md:flex absolute left-5 top-1/2 -translate-y-1/2 items-center gap-4 font-mono text-[0.62rem] tracking-[0.3em] uppercase text-[var(--ink-faint)]">
        <span>Portfolio — 2026</span>
        <span className="h-16 w-px bg-[var(--line-strong)]" />
      </div>

      <div className="relative z-30 max-w-2xl pl-4">
        <p className="hero-tag eyebrow mb-7">Available for freelance</p>

        <h1 className="hero-name display-xl text-[var(--ink)] text-[19vw] md:text-[8.2vw] mb-7">
          <span className="row block overflow-hidden">
            <span className="block">Nala</span>
          </span>
          <span className="row block overflow-hidden">
            <span className="block">
              Arunika<span className="text-[var(--accent)]">.</span>
            </span>
          </span>
        </h1>

        <div className="hero-fade flex items-center gap-4 mb-8">
          <span className="h-px w-10 bg-[var(--accent)]" />
          <p className="font-mono text-sm md:text-base tracking-[0.16em] uppercase text-[var(--ink)]">
            Web Developer
          </p>
        </div>

        <div className="hero-fade mt-12 flex items-center gap-3 text-[var(--ink-dim)] font-mono text-[0.7rem] uppercase tracking-[0.16em]">
          <span className="flex flex-col gap-1">
            <span className="block h-4 w-px bg-[var(--ink-dim)] animate-pulse" />
          </span>
          Scroll to explore
        </div>
      </div>

      {/* bottom marquee */}
      <div className="hero-edge absolute bottom-0 inset-x-0 border-t border-[var(--line)] py-4 overflow-hidden">
        <div className="marquee gap-10 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-[var(--ink-faint)]">
          {[...SKILLS, ...SKILLS].map((s, i) => (
            <span key={i} className="flex items-center gap-10">
              {s}
              <span className="text-[var(--accent)]">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
