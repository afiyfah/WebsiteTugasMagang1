"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Big "ABOUT" ghost word rendered on a fixed layer that sits BEHIND the 3D
 * canvas (both z-0, this one earlier in the DOM) so the laptop passes in
 * front of it. Fades in while the About section is on screen.
 */
export default function StageWord() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(ref.current, { opacity: 0 });
      gsap.to(ref.current, {
        opacity: 1,
        scrollTrigger: {
          trigger: "#about",
          start: "top 75%",
          end: "top 15%",
          scrub: 1,
        },
      });
      gsap.to(ref.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: "#projects",
          start: "top 95%",
          end: "top 55%",
          scrub: 1,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none"
    >
      <span className="ghost-word text-[36vw] md:text-[26vw] leading-none">
        ABOUT
      </span>
    </div>
  );
}
