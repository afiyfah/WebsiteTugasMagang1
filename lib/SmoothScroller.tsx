"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroller({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      touchMultiplier: 1.3,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // expose for nav-link smooth scrolling
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    // ScrollTrigger measures section positions on creation — but the 3D canvas
    // and web fonts settle a beat later and shift the layout, which otherwise
    // leaves triggers (e.g. the About progress) stretched over the wrong range.
    // Re-measure once everything has landed.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready?.then(refresh).catch(() => {});
    const timers = [400, 1200, 2600].map((ms) => setTimeout(refresh, ms));

    return () => {
      window.removeEventListener("load", refresh);
      timers.forEach(clearTimeout);
      gsap.ticker.remove(raf);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return <>{children}</>;
}
