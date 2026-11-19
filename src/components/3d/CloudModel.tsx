"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { usePortfolioStore } from "@/lib/store";

interface SphereData {
  id: number;
  radius: number;
  categoryIndex: number;
  heroPos: [number, number, number];
  aboutPos: [number, number, number];
  skillsPos: [number, number, number];
  projectsPos: [number, number, number];
  contactPos: [number, number, number];
}

const SPHERES: SphereData[] = [
  { id: 0, radius: 0.85, categoryIndex: 0, heroPos: [1.8, 0.0, 0.0], aboutPos: [2.0, 0.2, -0.5], skillsPos: [0.8, 0.6, 0.0], projectsPos: [1.2, 0.8, -0.2], contactPos: [0.6, 0.1, 0.0] },
  { id: 1, radius: 0.72, categoryIndex: 1, heroPos: [1.1, -0.15, 0.2], aboutPos: [1.5, 0.0, -0.3], skillsPos: [-0.8, 0.6, 0.0], projectsPos: [1.4, 0.4, 0.1], contactPos: [0.1, 0.0, 0.2] },
  { id: 2, radius: 0.76, categoryIndex: 2, heroPos: [2.5, -0.1, 0.1], aboutPos: [2.4, -0.1, -0.4], skillsPos: [-0.8, -0.6, 0.0], projectsPos: [1.6, 0.0, 0.3], contactPos: [1.1, -0.1, 0.1] },
  { id: 3, radius: 0.64, categoryIndex: 3, heroPos: [1.8, 0.75, -0.1], aboutPos: [2.1, 0.7, -0.6], skillsPos: [0.8, -0.6, 0.0], projectsPos: [1.8, -0.4, 0.2], contactPos: [0.6, 0.6, -0.1] },

  { id: 4, radius: 0.58, categoryIndex: 0, heroPos: [1.2, 0.5, 0.1], aboutPos: [1.6, 0.45, -0.4], skillsPos: [1.4, 0.8, 0.2], projectsPos: [2.0, -0.8, 0.0], contactPos: [0.2, 0.45, 0.1] },
  { id: 5, radius: 0.54, categoryIndex: 1, heroPos: [2.4, 0.5, -0.15], aboutPos: [2.3, 0.5, -0.5], skillsPos: [-1.4, 0.8, 0.2], projectsPos: [2.2, -1.2, -0.1], contactPos: [1.0, 0.45, -0.1] },
  { id: 6, radius: 0.60, categoryIndex: 2, heroPos: [1.8, -0.65, 0.1], aboutPos: [1.9, -0.5, -0.3], skillsPos: [-1.4, -0.8, 0.2], projectsPos: [1.0, 1.2, -0.3], contactPos: [0.6, -0.5, 0.1] },
  { id: 7, radius: 0.48, categoryIndex: 3, heroPos: [0.6, 0.0, 0.0], aboutPos: [1.1, 0.1, -0.2], skillsPos: [1.4, -0.8, 0.2], projectsPos: [0.8, 1.6, -0.4], contactPos: [-0.3, 0.0, 0.0] },

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

  // Drag interaction states
  const dragRotation = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const isDragging = useRef(false);
  const prevPointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      // Allow drag when clicking near right side of screen or canvas
      if (e.clientX > window.innerWidth * 0.4) {
        isDragging.current = true;
        prevPointer.current = { x: e.clientX, y: e.clientY };
      }
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const dx = (e.clientX - prevPointer.current.x) * 0.009;
      const dy = (e.clientY - prevPointer.current.y) * 0.009;
      dragRotation.current.targetY += dx;
      dragRotation.current.targetX += dy;
      prevPointer.current = { x: e.clientX, y: e.clientY };
    };
    const onPointerUp = () => {
      isDragging.current = false;
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  const isMobile = viewport.width < 6;
  const isTablet = viewport.width >= 6 && viewport.width < 10;

  // Pure monochrome materials
  const materials = useMemo(() => {
    const isDark = theme === "dark";

    const baseMaterial = new THREE.MeshStandardMaterial({
      color: isDark ? new THREE.Color("#121214") : new THREE.Color("#EFEFEF"),
      roughness: isDark ? 0.8 : 0.85,
      metalness: isDark ? 0.1 : 0.02,
    });

    const highlightMaterial = new THREE.MeshStandardMaterial({
      color: isDark ? new THREE.Color("#FFFFFF") : new THREE.Color("#000000"),
      roughness: 0.3,
      metalness: 0.2,
      emissive: isDark ? new THREE.Color("#FFFFFF") : new THREE.Color("#000000"),
      emissiveIntensity: isDark ? 0.25 : 0.0,
    });

    const wireMaterial = new THREE.MeshBasicMaterial({
      color: isDark ? new THREE.Color("#444444") : new THREE.Color("#CCCCCC"),
      wireframe: true,
    });

    return { base: baseMaterial, highlight: highlightMaterial, wire: wireMaterial };
  }, [theme]);

  const highlightedCategory = useMemo(() => {
    if (!selectedSkill) return -1;
    if (selectedSkill.includes("dev") || selectedSkill.includes("apex") || selectedSkill.includes("lwc")) return 0;
    if (selectedSkill.includes("ai") || selectedSkill.includes("agentforce")) return 1;
    if (selectedSkill.includes("integration") || selectedSkill.includes("api")) return 2;
    if (selectedSkill.includes("admin") || selectedSkill.includes("flow")) return 3;
    return -1;
  }, [selectedSkill]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime();

    // Smooth drag rotation + mouse parallax
    dragRotation.current.x = THREE.MathUtils.damp(dragRotation.current.x, dragRotation.current.targetX, 7.0, delta);
    dragRotation.current.y = THREE.MathUtils.damp(dragRotation.current.y, dragRotation.current.targetY, 7.0, delta);

    const targetRotX = mouse.y * 0.12 + dragRotation.current.x;
    const targetRotY = mouse.x * 0.18 + dragRotation.current.y;
    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotX, 6.0, delta);
    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotY, 6.0, delta);

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

    // Update spheres
    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const data = SPHERES[i];

      let targetCoords: [number, number, number] = data.heroPos;
      if (activeSection === "about") targetCoords = data.aboutPos;
      else if (activeSection === "skills") targetCoords = data.skillsPos;
      else if (activeSection === "projects" || activeSection === "playground") targetCoords = data.projectsPos;
      else if (activeSection === "contact" || activeSection === "metrics") targetCoords = data.contactPos;

      const idleFloatY = Math.sin(time * 0.7 + i * 0.6) * 0.04;
      const idleFloatX = Math.cos(time * 0.4 + i * 0.4) * 0.02;

      mesh.position.x = THREE.MathUtils.damp(mesh.position.x, targetCoords[0] + idleFloatX, 3.0, delta);
      mesh.position.y = THREE.MathUtils.damp(mesh.position.y, targetCoords[1] + idleFloatY, 3.0, delta);
      mesh.position.z = THREE.MathUtils.damp(mesh.position.z, targetCoords[2], 3.0, delta);

      const isHighlighted = highlightedCategory === data.categoryIndex;
      if (activeSection === "playground") {
        mesh.material = materials.wire;
      } else {
        mesh.material = isHighlighted ? materials.highlight : materials.base;
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
