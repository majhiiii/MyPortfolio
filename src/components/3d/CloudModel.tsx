"use client";

import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { usePortfolioStore } from "@/lib/store";

interface SphereData {
  id: number;
  radius: number;
  categoryIndex: number; // 0: dev, 1: ai, 2: integrations, 3: admin
  heroPos: [number, number, number];
  aboutPos: [number, number, number];
  skillsPos: [number, number, number];
  projectsPos: [number, number, number];
  contactPos: [number, number, number];
}

const SPHERES: SphereData[] = [
  // Core center spheres
  { id: 0, radius: 0.85, categoryIndex: 0, heroPos: [1.8, 0.0, 0.0], aboutPos: [2.0, 0.2, -0.5], skillsPos: [0.8, 0.6, 0.0], projectsPos: [1.2, 0.8, -0.2], contactPos: [0.6, 0.1, 0.0] },
  { id: 1, radius: 0.72, categoryIndex: 1, heroPos: [1.1, -0.15, 0.2], aboutPos: [1.5, 0.0, -0.3], skillsPos: [-0.8, 0.6, 0.0], projectsPos: [1.4, 0.4, 0.1], contactPos: [0.1, 0.0, 0.2] },
  { id: 2, radius: 0.76, categoryIndex: 2, heroPos: [2.5, -0.1, 0.1], aboutPos: [2.4, -0.1, -0.4], skillsPos: [-0.8, -0.6, 0.0], projectsPos: [1.6, 0.0, 0.3], contactPos: [1.1, -0.1, 0.1] },
  { id: 3, radius: 0.64, categoryIndex: 3, heroPos: [1.8, 0.75, -0.1], aboutPos: [2.1, 0.7, -0.6], skillsPos: [0.8, -0.6, 0.0], projectsPos: [1.8, -0.4, 0.2], contactPos: [0.6, 0.6, -0.1] },

  // Secondary cloud lobes
  { id: 4, radius: 0.58, categoryIndex: 0, heroPos: [1.2, 0.5, 0.1], aboutPos: [1.6, 0.45, -0.4], skillsPos: [1.4, 0.8, 0.2], projectsPos: [2.0, -0.8, 0.0], contactPos: [0.2, 0.45, 0.1] },
  { id: 5, radius: 0.54, categoryIndex: 1, heroPos: [2.4, 0.5, -0.15], aboutPos: [2.3, 0.5, -0.5], skillsPos: [-1.4, 0.8, 0.2], projectsPos: [2.2, -1.2, -0.1], contactPos: [1.0, 0.45, -0.1] },
  { id: 6, radius: 0.60, categoryIndex: 2, heroPos: [1.8, -0.65, 0.1], aboutPos: [1.9, -0.5, -0.3], skillsPos: [-1.4, -0.8, 0.2], projectsPos: [1.0, 1.2, -0.3], contactPos: [0.6, -0.5, 0.1] },
  { id: 7, radius: 0.48, categoryIndex: 3, heroPos: [0.6, 0.0, 0.0], aboutPos: [1.1, 0.1, -0.2], skillsPos: [1.4, -0.8, 0.2], projectsPos: [0.8, 1.6, -0.4], contactPos: [-0.3, 0.0, 0.0] },

  // Micro architectural accent satellites
  { id: 8, radius: 0.38, categoryIndex: 0, heroPos: [3.0, 0.1, -0.2], aboutPos: [2.7, 0.1, -0.6], skillsPos: [0.2, 1.2, 0.4], projectsPos: [0.6, 2.0, -0.5], contactPos: [1.5, 0.1, -0.2] },
  { id: 9, radius: 0.35, categoryIndex: 1, heroPos: [1.3, -0.6, 0.25], aboutPos: [1.5, -0.5, -0.2], skillsPos: [-0.2, 1.2, 0.4], projectsPos: [2.4, -1.6, -0.2], contactPos: [0.3, -0.4, 0.2] },
  { id: 10, radius: 0.32, categoryIndex: 2, heroPos: [2.3, -0.55, 0.2], aboutPos: [2.3, -0.45, -0.3], skillsPos: [-0.2, -1.2, 0.4], projectsPos: [2.6, -2.0, -0.3], contactPos: [0.9, -0.4, 0.2] },
  { id: 11, radius: 0.28, categoryIndex: 3, heroPos: [1.8, 1.2, -0.2], aboutPos: [2.0, 1.0, -0.7], skillsPos: [0.2, -1.2, 0.4], projectsPos: [0.4, 2.4, -0.6], contactPos: [0.6, 0.9, -0.2] },
];

export function CloudModel() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);
  const { mouse, viewport } = useThree();

  const theme = usePortfolioStore((s) => s.theme);
  const activeSection = usePortfolioStore((s) => s.activeSection);
  const selectedSkill = usePortfolioStore((s) => s.selectedSkill);

  // Responsive scale & position adjustments for smaller screens
  const isMobile = viewport.width < 6;
  const isTablet = viewport.width >= 6 && viewport.width < 10;

  // Pre-instantiate base materials to minimize GPU recreation
  const materials = useMemo(() => {
    const isDark = theme === "dark";

    const baseMaterial = new THREE.MeshStandardMaterial({
      color: isDark ? new THREE.Color("#1A1A1E") : new THREE.Color("#E8E7E0"),
      roughness: isDark ? 0.72 : 0.88,
      metalness: isDark ? 0.18 : 0.04,
      wireframe: false,
    });

    const accentMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#0176D3"),
      roughness: 0.35,
      metalness: 0.1,
      emissive: new THREE.Color("#0176D3"),
      emissiveIntensity: isDark ? 0.45 : 0.25,
    });

    const amberMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#FE9339"),
      roughness: 0.35,
      metalness: 0.1,
      emissive: new THREE.Color("#FE9339"),
      emissiveIntensity: isDark ? 0.45 : 0.25,
    });

    return { base: baseMaterial, accent: accentMaterial, amber: amberMaterial };
  }, [theme]);

  // Map skill id to active category index (0, 1, 2, 3)
  const highlightedCategory = useMemo(() => {
    if (!selectedSkill) return -1;
    if (selectedSkill.includes("dev") || selectedSkill.includes("apex") || selectedSkill.includes("lwc")) return 0;
    if (selectedSkill.includes("ai") || selectedSkill.includes("agentforce") || selectedSkill.includes("bot")) return 1;
    if (selectedSkill.includes("integration") || selectedSkill.includes("api") || selectedSkill.includes("rest")) return 2;
    if (selectedSkill.includes("admin") || selectedSkill.includes("flow") || selectedSkill.includes("security")) return 3;
    return -1;
  }, [selectedSkill]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime();

    // 1. Group Parallax Tilt (calm, damped mouse tracking)
    const targetRotX = mouse.y * 0.12;
    const targetRotY = mouse.x * 0.18;
    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotX, 3.5, delta);
    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotY, 3.5, delta);

    // Responsive position offset
    let targetGroupX = 0;
    let targetGroupY = 0;
    let targetScale = 1.0;

    if (isMobile) {
      targetGroupX = 0;
      targetGroupY = activeSection === "hero" ? 1.2 : -0.5;
      targetScale = 0.65;
    } else if (isTablet) {
      targetGroupX = 0.8;
      targetGroupY = 0;
      targetScale = 0.85;
    } else {
      targetGroupX = activeSection === "hero" ? 0.3 : activeSection === "skills" ? -0.2 : 0;
      targetGroupY = 0;
      targetScale = 1.0;
    }

    groupRef.current.position.x = THREE.MathUtils.damp(groupRef.current.position.x, targetGroupX, 2.5, delta);
    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, targetGroupY, 2.5, delta);
    groupRef.current.scale.setScalar(THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 2.5, delta));

    // 2. Animate each sphere toward section target
    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const data = SPHERES[i];

      // Pick target coords by active section
      let targetCoords: [number, number, number] = data.heroPos;
      if (activeSection === "about") targetCoords = data.aboutPos;
      else if (activeSection === "skills") targetCoords = data.skillsPos;
      else if (activeSection === "projects" || activeSection === "playground") targetCoords = data.projectsPos;
      else if (activeSection === "contact" || activeSection === "metrics") targetCoords = data.contactPos;

      // Add gentle procedural float
      const idleFloatY = Math.sin(time * 0.8 + i * 0.6) * 0.05;
      const idleFloatX = Math.cos(time * 0.5 + i * 0.4) * 0.03;

      const tx = targetCoords[0] + idleFloatX;
      const ty = targetCoords[1] + idleFloatY;
      const tz = targetCoords[2];

      mesh.position.x = THREE.MathUtils.damp(mesh.position.x, tx, 3.0, delta);
      mesh.position.y = THREE.MathUtils.damp(mesh.position.y, ty, 3.0, delta);
      mesh.position.z = THREE.MathUtils.damp(mesh.position.z, tz, 3.0, delta);

      // Sphere material highlight check
      const isHighlighted = highlightedCategory === data.categoryIndex;
      const isHeroFocal = activeSection === "hero" && i === 0;

      if (isHighlighted) {
        mesh.material = materials.accent;
      } else if (isHeroFocal && time % 6 < 0.8) {
        // Subtle amber heartbeat for Agentforce specialist pulse
        mesh.material = materials.amber;
      } else {
        mesh.material = materials.base;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {SPHERES.map((sphere, index) => (
        <mesh
          key={sphere.id}
          ref={(el) => {
            meshRefs.current[index] = el;
          }}
          castShadow={false}
          receiveShadow={false}
        >
          <sphereGeometry args={[sphere.radius, 32, 32]} />
          <primitive object={materials.base} attach="material" />
        </mesh>
      ))}
    </group>
  );
}
