"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (!el) return;
    const lenis = (
      window as unknown as {
        __lenis?: { scrollTo: (t: Element, o?: object) => void };
      }
    ).__lenis;
    if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.4 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-4 sm:px-6 md:px-12 transition-all duration-500 ${
        scrolled
          ? "py-4 bg-[var(--bg)]/70 backdrop-blur-xl border-b border-[var(--line)]"
          : "py-6 md:py-8"
      }`}
    >
      {/* logo / wordmark */}
      <a
        href="#hero"
        onClick={(e) => goTo(e, "#hero")}
        className="group flex items-center gap-2.5"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-60 animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]" />
        </span>
        <span className="font-mono text-[0.66rem] sm:text-[0.78rem] tracking-[0.14em] sm:tracking-[0.2em] uppercase text-[var(--ink)]">
          Portofolio
        </span>
        <sup className="hidden sm:inline font-mono text-[0.55rem] text-[var(--ink-dim)]">
          ®
        </sup>
      </a>

      {/* nav */}
      <nav className="flex items-center gap-3.5 sm:gap-7 md:gap-10">
        {LINKS.map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            onClick={(e) => goTo(e, l.href)}
            className="nav-link group flex items-center gap-1.5 font-mono text-[0.6rem] sm:text-[0.7rem] uppercase tracking-[0.1em] sm:tracking-[0.18em] text-[var(--ink-dim)] hover:text-[var(--ink)] transition-colors"
          >
            <span className="hidden sm:inline text-[var(--accent)] text-[0.6rem] opacity-80">
              0{i + 1}
            </span>
            {l.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
