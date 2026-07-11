"use client";

import { useLayoutEffect, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Group } from "three";

gsap.registerPlugin(ScrollTrigger);

export function useGSAPRig(rigRef: RefObject<Group | null>) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const rig = rigRef.current;
      if (!rig) return;

      const FRONT = Math.PI;
      const mobile = window.innerWidth < 768;

      const hero = mobile
        ? { x: 0, y: -0.35, z: 0, ry: FRONT - 0.45, s: 1.25 }
        : { x: 1.45, y: -0.12, z: 0.55, ry: FRONT - 0.6, s: 2.15 };
      const focalScale = mobile ? 1.4 : 2.35;
      const focalZ = mobile ? 1.1 : 1.45;
      const focalY = mobile ? 0.0 : -0.02;
      const endScale = mobile ? 1.25 : 2.1;

      // default HERO pose (model front faces the camera at rotation.y = PI)
      rig.position.set(hero.x, hero.y, hero.z);
      rig.rotation.set(0.06, hero.ry, 0);
      rig.scale.setScalar(hero.s);

      // A) APPROACH — as the About section rises into view, glide the laptop
      //    from the hero pose to the centered, front-facing focal pose. Done
      //    by the time About pins ("top top"), independent of About's height.
      gsap
        .timeline({
          scrollTrigger: {
            trigger: "#about",
            start: "top bottom",
            end: "top top",
            scrub: 1,
          },
        })
        .to(rig.position, { x: 0, y: focalY, z: focalZ, ease: "power2.inOut" }, 0)
        .to(rig.rotation, { x: -0.03, y: FRONT, ease: "power2.inOut" }, 0)
        .to(
          rig.scale,
          { x: focalScale, y: focalScale, z: focalScale, ease: "power2.inOut" },
          0
        );

      // B) THROUGH ABOUT — hold big & centered, then a tiny settle right at the
      //    very end (SceneLayer opacity fade handles the exit to Projects).
      gsap
        .timeline({
          scrollTrigger: {
            trigger: "#about",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        })
        .to(
          rig.scale,
          { x: endScale, y: endScale, z: endScale, duration: 0.1, ease: "power2.in" },
          0.9
        );
    });

    return () => ctx.revert();
  }, [rigRef]);
}
