"use client";

import React from "react";

/* Tiny stylized tech marks (no external assets) scattered like a faint
   starfield — small, low opacity, gently twinkling. */
const LOGOS: Record<string, React.ReactNode> = {
  react: (
    <svg viewBox="-12 -12 24 24">
      <circle r="2.2" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1.1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  ),
  next: (
    <svg viewBox="0 0 48 48">
      <circle cx="24" cy="24" r="23" fill="#0b0b0b" stroke="#fff" strokeWidth="1.5" />
      <text x="24" y="33" fontFamily="sans-serif" fontWeight="700" fontSize="24" fill="#fff" textAnchor="middle">N</text>
    </svg>
  ),
  ts: (
    <svg viewBox="0 0 48 48">
      <rect width="48" height="48" rx="8" fill="#3178C6" />
      <text x="25" y="34" fontFamily="sans-serif" fontWeight="700" fontSize="21" fill="#fff" textAnchor="middle">TS</text>
    </svg>
  ),
  html: (
    <svg viewBox="0 0 48 48">
      <path d="M9 4h30l-3 33-12 4-12-4z" fill="#E34F26" />
      <path d="M24 8v29l9-3 2.3-26z" fill="#F06529" />
      <text x="24" y="29" fontFamily="sans-serif" fontWeight="700" fontSize="15" fill="#fff" textAnchor="middle">5</text>
    </svg>
  ),
  css: (
    <svg viewBox="0 0 48 48">
      <path d="M9 4h30l-3 33-12 4-12-4z" fill="#1572B6" />
      <path d="M24 8v29l9-3 2.3-26z" fill="#33A9DC" />
      <text x="24" y="29" fontFamily="sans-serif" fontWeight="700" fontSize="15" fill="#fff" textAnchor="middle">3</text>
    </svg>
  ),
  tailwind: (
    <svg viewBox="0 0 48 34">
      <path
        d="M13 9c3-6 7-6 12 0 3 3.6 6 3.6 9 0-3 6-7 6-12 0-3-3.6-6-3.6-9 0zM4 21c3-6 7-6 12 0 3 3.6 6 3.6 9 0-3 6-7 6-12 0-3-3.6-6-3.6-9 0z"
        fill="#38BDF8"
      />
    </svg>
  ),
  three: (
    <svg viewBox="0 0 48 48">
      <rect width="48" height="48" rx="8" fill="#151515" />
      <path d="M24 12l11 24H13z" fill="none" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  ),
};

type Spot = {
  logo: keyof typeof LOGOS;
  style: React.CSSProperties;
  size: number;
  delay: string;
  dur: string;
};

// helper keeps the list terse
const s = (
  logo: keyof typeof LOGOS,
  top: string,
  left: string,
  size: number,
  delay: number,
  dur: number
): Spot => ({ logo, style: { top, left }, size, delay: `${delay}s`, dur: `${dur}s` });

const SPOTS: Record<"hero" | "contact", Spot[]> = {
  hero: [
    s("react", "16%", "82%", 20, 0, 6.5),
    s("next", "30%", "68%", 15, 1.4, 7.5),
    s("ts", "62%", "88%", 17, 0.6, 6),
    s("html", "24%", "94%", 14, 2.1, 8),
    s("css", "72%", "72%", 16, 0.9, 7),
    s("tailwind", "48%", "78%", 18, 1.7, 6.8),
    s("three", "40%", "96%", 13, 2.6, 8.5),
    s("react", "80%", "84%", 13, 3.1, 7.2),
    s("next", "12%", "60%", 12, 2.3, 8),
    s("ts", "88%", "66%", 14, 0.3, 6.4),
    s("html", "56%", "62%", 12, 3.5, 7.8),
    s("css", "18%", "40%", 13, 1.1, 8.2),
    s("tailwind", "68%", "44%", 12, 2.8, 7.6),
    s("three", "84%", "36%", 12, 0.7, 8.8),
  ],
  contact: [
    s("react", "20%", "10%", 19, 0, 6.5),
    s("next", "58%", "26%", 15, 1.3, 7.5),
    s("ts", "76%", "84%", 17, 0.5, 6),
    s("html", "30%", "76%", 14, 2, 8),
    s("css", "44%", "14%", 16, 0.9, 7),
    s("tailwind", "66%", "58%", 18, 1.6, 6.8),
    s("three", "16%", "88%", 13, 2.4, 8.5),
    s("react", "82%", "40%", 13, 3, 7.2),
    s("next", "38%", "48%", 12, 2.2, 8),
    s("ts", "24%", "34%", 12, 0.4, 6.4),
    s("html", "70%", "18%", 12, 3.4, 7.8),
    s("css", "52%", "90%", 13, 1.2, 8.2),
  ],
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
