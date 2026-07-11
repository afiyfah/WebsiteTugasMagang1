"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FloatingLogos from "@/components/FloatingLogos";

gsap.registerPlugin(ScrollTrigger);

const SOCIALS = [
  { label: "GitHub", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Instagram", href: "#" },
];

// scattered twinkling dots (like the hero sparkles)
const DOTS: { t: string; l: string; d: string; u: string }[] = [
  { t: "14%", l: "18%", d: "0s", u: "4s" },
  { t: "8%", l: "40%", d: "1.4s", u: "5s" },
  { t: "24%", l: "9%", d: "0.6s", u: "4.5s" },
  { t: "38%", l: "24%", d: "2.1s", u: "5.5s" },
  { t: "20%", l: "52%", d: "0.9s", u: "4.2s" },
  { t: "44%", l: "12%", d: "1.7s", u: "6s" },
  { t: "54%", l: "40%", d: "0.3s", u: "4.8s" },
  { t: "62%", l: "22%", d: "2.4s", u: "5.2s" },
  { t: "70%", l: "55%", d: "1.1s", u: "4.6s" },
  { t: "48%", l: "66%", d: "3s", u: "5.8s" },
  { t: "66%", l: "80%", d: "0.5s", u: "4.4s" },
  { t: "78%", l: "34%", d: "1.9s", u: "6.2s" },
  { t: "30%", l: "88%", d: "2.6s", u: "5s" },
  { t: "82%", l: "68%", d: "0.8s", u: "4.7s" },
  { t: "16%", l: "72%", d: "1.5s", u: "5.4s" },
  { t: "58%", l: "92%", d: "2.2s", u: "4.9s" },
  { t: "88%", l: "16%", d: "0.4s", u: "5.6s" },
  { t: "40%", l: "48%", d: "1.3s", u: "4.3s" },
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
        {DOTS.map((d, i) => (
          <span
            key={i}
            className="cdot"
            style={{ top: d.t, left: d.l, animationDelay: d.d, animationDuration: d.u }}
          />
        ))}
      </div>
      <FloatingLogos
        variant="contact"
        className="absolute inset-0 -z-10 overflow-hidden"
      />

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
