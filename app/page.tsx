import SmoothScroller from "@/lib/SmoothScroller";
import Navbar from "@/components/Navbar";
import StageWord from "@/components/StageWord";
import SceneLayer from "@/components/canvas/SceneLayer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <SmoothScroller>
      <div className="grain" />
      <div className="ambient">
        <span className="glow glow-a" />
        <span className="glow glow-b" />
        <span className="glow glow-c" />
      </div>
      <Navbar />
      <StageWord />
      <SceneLayer />

      {/* no z-index here on purpose: keeping #stage out of its own stacking
          context lets the laptop canvas (z-20) sit in front of the hero skill
          marquee while the hero text / about bubbles (z-30) stay in front of
          the laptop */}
      <main id="stage" className="relative">
        <Hero />
        <About />
      </main>

      <Projects />
      <Contact />
    </SmoothScroller>
  );
}
