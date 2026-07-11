"use client";

import React from "react";

/* One cohesive set: bold monochrome line glyphs (currentColor), animated as
   small semi-transparent 3D orbiting tokens. */
const LOGOS: Record<string, React.ReactNode> = {
  react: (
    <svg viewBox="-12 -12 24 24" fill="none" stroke="currentColor">
      <circle r="2.4" fill="currentColor" stroke="none" />
      <ellipse rx="11" ry="4.2" strokeWidth="1.7" />
      <ellipse rx="11" ry="4.2" strokeWidth="1.7" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" strokeWidth="1.7" transform="rotate(120)" />
    </svg>
  ),
  next: (
    <svg viewBox="0 0 48 48">
      <circle cx="24" cy="24" r="20.5" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <text x="24" y="33" fontFamily="sans-serif" fontWeight="800" fontSize="21" fill="currentColor" textAnchor="middle">
        N
      </text>
    </svg>
  ),
  html: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor">
      <path d="M11 6h26l-2.4 29-10.6 4-10.6-4z" strokeWidth="2.8" strokeLinejoin="round" />
      <text x="24" y="28" fontFamily="sans-serif" fontWeight="800" fontSize="13" fill="currentColor" stroke="none" textAnchor="middle">
        5
      </text>
    </svg>
  ),
  css: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 8c-5 0-6 3-6 7 0 4-1 6-5 6v4c4 0 5 2 5 6 0 4 1 7 6 7" />
      <path d="M28 8c5 0 6 3 6 7 0 4 1 6 5 6v4c-4 0-5 2-5 6 0 4-1 7-6 7" />
    </svg>
  ),
  ts: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor">
      <rect x="5" y="5" width="38" height="38" rx="9" strokeWidth="2.8" />
      <text x="24" y="32" fontFamily="sans-serif" fontWeight="800" fontSize="16" fill="currentColor" stroke="none" textAnchor="middle">
        TS
      </text>
    </svg>
  ),
  js: (
    <svg viewBox="0 0 48 48">
      <text x="24" y="35" fontFamily="sans-serif" fontWeight="800" fontSize="27" fill="currentColor" textAnchor="middle">
        JS
      </text>
    </svg>
  ),
  three: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor">
      <path d="M24 9l15 30H9z" strokeWidth="2.8" strokeLinejoin="round" />
    </svg>
  ),
  tailwind: (
    <svg viewBox="0 0 48 34">
      <path
        d="M13 8c3.4-6.5 7.6-6.5 12.6 0 3.2 3.9 6.4 3.9 9.4 0-3.4 6.5-7.6 6.5-12.6 0-3.2-3.9-6.4-3.9-9.4 0zM3.4 21c3.4-6.5 7.6-6.5 12.6 0 3.2 3.9 6.4 3.9 9.4 0-3.4 6.5-7.6 6.5-12.6 0-3.2-3.9-6.4-3.9-9.4 0z"
        fill="currentColor"
      />
    </svg>
  ),
};

type Entry = [keyof typeof LOGOS, string, string]; // [logo, top, left]

type Spot = {
  logo: keyof typeof LOGOS;
  style: React.CSSProperties;
  size: number;
  delay: string;
  dur: string;
};

const build = (entries: Entry[], size: number): Spot[] =>
  entries.map(([logo, top, left], i) => ({
    logo,
    style: { top, left },
    size,
    delay: `${i * -1.3}s`,
    dur: `${7.5 + (i % 4) * 0.6}s`,
  }));

const SPOTS: Record<"hero" | "contact", Spot[]> = {
  // an elliptical ring encircling the laptop
  hero: build(
    [
      ["react", "13%", "71%"], // top
      ["next", "24%", "86%"], // top-right
      ["html", "49%", "92%"], // right
      ["css", "74%", "86%"], // bottom-right
      ["ts", "84%", "71%"], // bottom
      ["js", "74%", "55%"], // bottom-left
      ["three", "49%", "49%"], // left (gap between text & laptop)
      ["tailwind", "24%", "55%"], // top-left
    ],
    24
  ),
  // scattered across the top-right, kept clear of the heading text
  contact: build(
    [
      ["react", "8%", "62%"],
      ["next", "9%", "76%"],
      ["html", "11%", "90%"],
      ["css", "22%", "68%"],
      ["ts", "24%", "82%"],
      ["js", "25%", "94%"],
      ["three", "35%", "74%"],
      ["tailwind", "36%", "88%"],
    ],
    22
  ),
};

export default function FloatingLogos({
  variant,
  className = "",
}: {
  variant: "hero" | "contact";
  className?: string;
}) {
  return (
    <div className={`pointer-events-none ${className}`} aria-hidden>
      {SPOTS[variant].map((spot, i) => (
        <span
          key={i}
          className="flogo"
          style={{
            ...spot.style,
            width: spot.size,
            animationDelay: spot.delay,
            animationDuration: spot.dur,
          }}
        >
          {LOGOS[spot.logo]}
        </span>
      ))}
    </div>
  );
}
