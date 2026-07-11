"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SOCIALS = [
  { label: "GitHub", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Instagram", href: "#" },
];

export default function Contact() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-line span", {
        scrollTrigger: { trigger: "#contact", start: "top 70%" },
        yPercent: 110,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={root}
      className="relative z-30 bg-[var(--bg)] border-t border-[var(--line)] px-6 md:px-16 pt-28 md:pt-40 pb-12 overflow-hidden"
    >
      {/* background effects */}
      <div className="contact-fx" aria-hidden>
        <span className="glow contact-glow-a" />
        <span className="glow contact-glow-b" />
      </div>

      <p className="eyebrow mb-8">Get in touch</p>

      <h2 className="display-xl text-[13vw] md:text-[9vw] leading-[0.92] mb-16">
        <span className="contact-line block overflow-hidden">
          <span className="block">Let&apos;s build</span>
        </span>
        <span className="contact-line block overflow-hidden">
          <span className="block">
            something<span className="text-[var(--accent)]"> together.</span>
          </span>
        </span>
      </h2>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-t border-[var(--line)] pt-10">
        <div>
          <p className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-[var(--ink-dim)] mb-3">
            Email me at
          </p>
          <a
            href="mailto:hello@nalaarunika.dev"
            className="group inline-flex items-center gap-3 font-display text-2xl md:text-4xl text-[var(--ink)] hover:text-[var(--accent)] transition-colors break-all"
          >
            hello@nalaarunika.dev
            <span className="text-[var(--accent)] transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-1">
              ↗
            </span>
          </a>
        </div>

        <div className="flex gap-8 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-[var(--ink-dim)]">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="nav-link hover:text-[var(--ink)] transition-colors"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      <div className="mt-20 flex flex-col md:flex-row items-center justify-between gap-4 text-[var(--ink-faint)] font-mono text-[0.66rem] uppercase tracking-[0.16em]">
        <span>© 2026 Nala Arunika — Bogor, ID</span>
        <span>Next.js · React Three Fiber · GSAP</span>
      </div>
    </section>
  );
}
