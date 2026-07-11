"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: "Nebula Commerce",
    tag: "E-commerce",
    year: "2025",
    desc: "Headless online store with instant checkout and 3D product previews.",
    stack: ["Next.js", "Stripe", "R3F"],
  },
  {
    title: "Pulse Analytics",
    tag: "Dashboard",
    year: "2025",
    desc: "Real-time dashboard for monitoring product metrics across teams.",
    stack: ["React", "WebSocket", "D3"],
  },
  {
    title: "Northline Studio",
    tag: "Agency Site",
    year: "2024",
    desc: "Creative agency landing page with cinematic page transitions.",
    stack: ["GSAP", "Next.js", "Sanity"],
  },
  {
    title: "Aether Notes",
    tag: "Productivity",
    year: "2024",
    desc: "Collaborative note-taking app with offline-first sync.",
    stack: ["React", "IndexedDB", "CRDT"],
  },
  {
    title: "Vertex Portfolio",
    tag: "3D Experience",
    year: "2024",
    desc: "Interactive portfolio with a 3D object that responds to scroll.",
    stack: ["Three.js", "GSAP", "Lenis"],
  },
  {
    title: "Fieldwork CMS",
    tag: "Internal Tool",
    year: "2023",
    desc: "Lightweight CMS for content teams to manage articles and media.",
    stack: ["Next.js", "Prisma", "Postgres"],
  },
];

export default function Projects() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.batch(".project-card", {
        start: "top 88%",
        onEnter: (els) =>
          gsap.to(els, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.09,
            ease: "power3.out",
          }),
      });
      gsap.from(".projects-head > *", {
        scrollTrigger: { trigger: "#projects", start: "top 80%" },
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
    // 3D tilt toward the cursor
    el.style.setProperty("--rx", `${(px - 0.5) * 12}deg`);
    el.style.setProperty("--ry", `${-(py - 0.5) * 12}deg`);
  };

  const onLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  };

  return (
    <section
      id="projects"
      ref={root}
      className="relative z-30 bg-[var(--bg)] px-6 md:px-16 pt-28 md:pt-40 pb-28 md:pb-36"
    >
      <div className="projects-head flex items-end justify-between mb-16 flex-wrap gap-6">
        <div>
          <p className="eyebrow mb-4">Selected work</p>
          <h2 className="display-xl text-5xl md:text-[5.5vw] leading-none">
            Projects
          </h2>
        </div>
        <p className="text-[var(--ink-dim)] text-sm max-w-xs leading-relaxed">
          Six projects that reflect how I work — clean, fast, and obsessed
          with the details.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {PROJECTS.map((p, i) => (
          <div
            key={p.title}
            className="project-card opacity-0 translate-y-10"
          >
          <article
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className="card group rounded-2xl p-5"
          >
            {/* thumbnail */}
            <div className="card-thumb card-depth relative h-40 rounded-xl mb-5 flex items-center justify-between p-4 overflow-hidden">
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-[var(--accent)]">
                {p.tag}
              </span>
              <span className="font-display text-6xl text-[var(--line-strong)] leading-none">
                0{i + 1}
              </span>
            </div>

            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display text-lg text-[var(--ink)]">
                {p.title}
              </h3>
              <span className="font-mono text-[0.66rem] text-[var(--ink-dim)]">
                {p.year}
              </span>
            </div>

            <p className="text-sm text-[var(--ink-dim)] leading-relaxed mb-5">
              {p.desc}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="font-mono text-[0.62rem] px-2 py-1 rounded-md border border-[var(--line)] text-[var(--ink-dim)]"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <span className="text-[var(--ink-dim)] transition-transform duration-300 group-hover:translate-x-1">
                ↗
              </span>
            </div>
          </article>
          </div>
        ))}
      </div>
    </section>
  );
}
