"use client";

import * as THREE from "three";
import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: Record<string, THREE.Mesh>;
  materials: Record<string, THREE.MeshStandardMaterial>;
};

const MODEL_PATH = "/models/laptop_gaming.glb";

export function Laptop(props: React.JSX.IntrinsicElements["group"]) {
  const { scene, materials } = useGLTF(MODEL_PATH) as unknown as GLTFResult & {
    scene: THREE.Group;
  };

  useEffect(() => {
    // material tuning + make the display panel glow like it's powered on
    Object.values(materials).forEach((mat) => {
      if (!mat) return;
      mat.envMapIntensity = 0.5;
      const n = mat.name?.toLowerCase() ?? "";
      // Material.004 = the screen -> black but "powered on": a faint neutral
      // (not blue) self-glow, matte enough to avoid a harsh light hotspot
      if (n === "material.004") {
        mat.color = new THREE.Color("#050506");
        mat.roughness = 0.5;
        mat.metalness = 0;
        mat.emissive = new THREE.Color("#202024");
        mat.emissiveIntensity = 1.0;
      }
    });
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [materials, scene]);

  return (
    <group {...props} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload(MODEL_PATH);
