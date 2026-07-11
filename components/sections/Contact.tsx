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

// fine dust-like twinkling dots clustered in the top-right icon area
const DOTS: { t: string; l: string; d: string; u: string }[] = [
  { t: "6%", l: "58%", d: "0s", u: "4s" },
  { t: "12%", l: "66%", d: "1.4s", u: "5s" },
  { t: "7%", l: "84%", d: "0.6s", u: "4.5s" },
  { t: "15%", l: "94%", d: "2.1s", u: "5.5s" },
  { t: "18%", l: "72%", d: "0.9s", u: "4.2s" },
  { t: "20%", l: "60%", d: "1.7s", u: "6s" },
  { t: "16%", l: "80%", d: "0.3s", u: "4.8s" },
  { t: "27%", l: "88%", d: "2.4s", u: "5.2s" },
  { t: "30%", l: "64%", d: "1.1s", u: "4.6s" },
  { t: "28%", l: "76%", d: "3s", u: "5.8s" },
  { t: "33%", l: "94%", d: "0.5s", u: "4.4s" },
  { t: "38%", l: "70%", d: "1.9s", u: "6.2s" },
  { t: "40%", l: "82%", d: "2.6s", u: "5s" },
  { t: "10%", l: "72%", d: "0.8s", u: "4.7s" },
  { t: "23%", l: "92%", d: "1.5s", u: "5.4s" },
  { t: "36%", l: "60%", d: "2.2s", u: "4.9s" },
  { t: "5%", l: "70%", d: "1.2s", u: "5.1s" },
  { t: "9%", l: "90%", d: "2.8s", u: "4.3s" },
  { t: "14%", l: "62%", d: "0.4s", u: "5.7s" },
  { t: "22%", l: "78%", d: "1.9s", u: "4.1s" },
  { t: "25%", l: "68%", d: "0.7s", u: "6.1s" },
  { t: "31%", l: "84%", d: "2.3s", u: "4.9s" },
  { t: "34%", l: "74%", d: "1.0s", u: "5.3s" },
  { t: "42%", l: "90%", d: "2.5s", u: "4.6s" },
  { t: "19%", l: "88%", d: "0.2s", u: "5.9s" },
  { t: "12%", l: "78%", d: "1.6s", u: "4.4s" },
  { t: "37%", l: "66%", d: "2.9s", u: "5.2s" },
  { t: "43%", l: "76%", d: "0.9s", u: "4.8s" },
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
