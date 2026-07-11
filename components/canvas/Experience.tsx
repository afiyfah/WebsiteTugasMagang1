"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  ContactShadows,
  Sparkles,
  Float,
  PerspectiveCamera,
} from "@react-three/drei";
import * as THREE from "three";
import { useGSAPRig } from "./useGSAPRig";
import { Laptop } from "./Laptop";

// centers + normalizes the raw model (bbox derived once via gltf-transform inspect)
const MODEL_CENTER: [number, number, number] = [-0.485, -0.06, -0.095];
const MODEL_SCALE = 0.62;

// a lime accent light that slowly orbits the laptop -> a moving glint travels
// across the metallic body, giving the hero shot some life
function OrbitLight() {
  const ref = useRef<THREE.PointLight>(null);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.position.set(
        Math.sin(t * 0.5) * 3.6,
        1.4,
        Math.cos(t * 0.5) * 3.6
      );
    }
  });
  return <pointLight ref={ref} intensity={3} distance={14} color="#c8f45f" />;
}

function Rig() {
  const scrollRig = useRef<THREE.Group>(null);
  const dragGroup = useRef<THREE.Group>(null);
  const drag = useRef({ active: false, x: 0, rotY: 0, rotX: 0.08 });

  useGSAPRig(scrollRig);

  const onPointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    drag.current.active = true;
    drag.current.x = e.clientX;
    (e.target as Element)?.setPointerCapture?.(e.pointerId);
  };
  const onPointerUp = () => {
    drag.current.active = false;
  };
  const onPointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.x;
    drag.current.x = e.clientX;
    drag.current.rotY += dx * 0.006;
  };

  useFrame((state) => {
    if (dragGroup.current) {
      dragGroup.current.rotation.y = THREE.MathUtils.lerp(
        dragGroup.current.rotation.y,
        drag.current.rotY,
        0.08
      );
    }
    if (scrollRig.current) {
      // idle float layered on top of the gsap-driven base transform
      const t = state.clock.getElapsedTime();
      scrollRig.current.position.y += Math.sin(t * 0.6) * 0.0009;
    }
  });

  return (
    <group ref={scrollRig}>
      <group ref={dragGroup}>
        <group
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerOut={onPointerUp}
          onPointerMove={onPointerMove}
        >
          <group scale={MODEL_SCALE} position={[0, -0.35, 0]}>
            <group position={MODEL_CENTER}>
              <Laptop />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

export default function Experience() {
  const dpr = useMemo<[number, number]>(() => [1, 1.75], []);
  return (
    <Canvas
      dpr={dpr}
      // alpha:true -> the canvas is transparent; if the GL context is ever
      // lost/cleared it reveals the dark page behind it instead of flashing white
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 0.95,
      }}
      shadows
      className="cursor-grab active:cursor-grabbing"
      style={{ background: "transparent" }}
      onCreated={({ gl }) => {
        // allow the browser to restore a lost context instead of freezing a
        // white framebuffer (happens on GPU pressure / dev fast-refresh)
        const canvas = gl.domElement;
        canvas.addEventListener(
          "webglcontextlost",
          (e) => e.preventDefault(),
          false
        );
      }}
    >
      <PerspectiveCamera makeDefault fov={32} position={[0, 0.15, 8]} />
      {/* fog only, NO scene background color -> stays transparent */}
      <fog attach="fog" args={["#08080a", 9, 17]} />

      <ambientLight intensity={0.35} />
      <directionalLight
        position={[3, 4, 4]}
        intensity={1.7}
        color="#fdfdf5"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      {/* front fill from the camera side so the open screen/keyboard is lit
          when the laptop faces us in the About focal pose */}
      <pointLight position={[0, 0.6, 4]} intensity={3} color="#ffffff" />
      {/* lime brand rim from behind-left */}
      <pointLight position={[-3, 1, -2]} intensity={5} color="#c8f45f" />
      {/* cool fill from front-right */}
      <pointLight position={[2, -1, 2]} intensity={3} color="#9fb4ff" />
      <spotLight
        position={[0, 3, 1]}
        angle={0.5}
        penumbra={1}
        intensity={3.5}
        color="#ffffff"
      />

      <OrbitLight />

      <Float speed={1.4} rotationIntensity={0.08} floatIntensity={0.25}>
        <Rig />
      </Float>

      {/* floating glints around the laptop for depth / tech ambiance */}
      <Sparkles
        count={55}
        scale={[11, 6, 5]}
        size={1.6}
        speed={0.3}
        opacity={0.5}
        color="#cfe89a"
      />
      <Sparkles
        count={30}
        scale={[9, 5, 4]}
        size={1}
        speed={0.5}
        opacity={0.35}
        color="#9fb4ff"
      />

      <ContactShadows
        position={[0, -1.55, 0]}
        opacity={0.5}
        scale={10}
        blur={2.4}
        far={2}
        color="#000000"
      />

      {/* controlled studio reflections via lightformers — no bright HDR sky
          (the city preset was washing the metallic laptop to white) */}
      <Environment resolution={256} environmentIntensity={0.4}>
        <Lightformer
          intensity={2}
          position={[0, 2.5, 2]}
          scale={[7, 3, 1]}
          color="#ffffff"
        />
        <Lightformer
          intensity={1.4}
          position={[-4, 1, -2]}
          scale={[4, 5, 1]}
          color="#c8f45f"
        />
        <Lightformer
          intensity={1}
          position={[4, -1, 2]}
          scale={[4, 4, 1]}
          color="#9fb4ff"
        />
      </Environment>
    </Canvas>
  );
}
