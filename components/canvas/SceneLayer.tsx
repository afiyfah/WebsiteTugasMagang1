"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Experience = dynamic(() => import("./Experience"), { ssr: false });

export default function SceneLayer() {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(wrap.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: "#projects",
          start: "top 90%",
          end: "top 40%",
          scrub: 1,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrap} className="fixed inset-0 z-20">
      <Experience />
    </div>
  );
}
