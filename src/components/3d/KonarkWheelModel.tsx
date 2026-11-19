"use client";

import React, { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SKILL_GROUPS, SkillGroupId } from "@/data/stack";
import { usePortfolioStore } from "@/lib/store";

const SKILL_GROUP_KEYS: SkillGroupId[] = [
  "salesforce",
  "agentforce",
  "integrations",
  "fullstack",
  "aws",
  "delivery",
  "admin",
  "contactcenter",
];

export function KonarkWheelModel({
  onSelectGroup,
}: {
  onSelectGroup?: (groupId: SkillGroupId) => void;
}) {
  const wheelGroupRef = useRef<THREE.Group>(null);
  const [hoveredSpoke, setHoveredSpoke] = useState<number | null>(null);
  const targetRotation = useRef(0);
  const pointerPos = useRef({ x: 0, y: 0 });

  const setActiveAccentColor = usePortfolioStore((s) => s.setActiveAccentColor);

  // 24 Spokes setup
  const spokesData = useMemo(() => {
    const spokes = [];
    const majorIndices = [0, 3, 6, 9, 12, 15, 18, 21];

    for (let i = 0; i < 24; i++) {
      const angle = (i * Math.PI * 2) / 24;
      const isMajor = majorIndices.includes(i);
      const majorIdx = majorIndices.indexOf(i);
      const groupKey = isMajor ? SKILL_GROUP_KEYS[majorIdx] : null;
      const groupInfo = groupKey ? SKILL_GROUPS[groupKey] : null;

      spokes.push({
        index: i,
        angle,
        isMajor,
        groupKey,
        color: groupInfo ? groupInfo.color : "#8A4B2A",
        name: groupInfo ? groupInfo.name : "Konark Spoke",
      });
    }
    return spokes;
  }, []);

  // Frame animation: idle spin, scroll sync, cursor tilt (max 6 deg)
  useFrame((state, delta) => {
    if (!wheelGroupRef.current) return;

    // Idle rotation
    wheelGroupRef.current.rotation.z += delta * 0.25;

    // Smooth cursor tilt (max 6° = ~0.1 rad)
    const targetTiltX = -state.pointer.y * 0.1;
    const targetTiltY = state.pointer.x * 0.1;

    wheelGroupRef.current.rotation.x = THREE.MathUtils.lerp(
      wheelGroupRef.current.rotation.x,
      targetTiltX,
      0.08
    );
    wheelGroupRef.current.rotation.y = THREE.MathUtils.lerp(
      wheelGroupRef.current.rotation.y,
      targetTiltY,
      0.08
    );
  });

  return (
    <group ref={wheelGroupRef} scale={1.15}>
      {/* Outer Rim (Torus) */}
      <mesh>
        <torusGeometry args={[2.5, 0.12, 16, 64]} />
        <meshStandardMaterial color="#8A4B2A" roughness={0.65} metalness={0.15} />
      </mesh>

      {/* Outer Beaded Ring */}
      <mesh>
        <torusGeometry args={[2.32, 0.04, 12, 64]} />
        <meshStandardMaterial color="#E8A317" roughness={0.4} metalness={0.25} />
      </mesh>

      {/* Inner Central Hub (Axle Cylinder) */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.75, 0.75, 0.35, 32]} />
        <meshStandardMaterial color="#8A4B2A" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Central Medallion Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.4, 32]} />
        <meshStandardMaterial color="#E8A317" roughness={0.4} metalness={0.3} />
      </mesh>

      {/* Core Indigo Hub Pin */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.45, 24]} />
        <meshStandardMaterial color="#1F2A5C" roughness={0.3} metalness={0.4} />
      </mesh>

      {/* 24 Spokes */}
      {spokesData.map((spoke) => {
        const isHovered = hoveredSpoke === spoke.index;

        return (
          <group key={spoke.index} rotation={[0, 0, spoke.angle]}>
            {/* Spoke Rod */}
            <mesh
              position={[0, 1.5, 0]}
              onPointerOver={(e) => {
                e.stopPropagation();
                setHoveredSpoke(spoke.index);
                if (spoke.groupKey) {
                  setActiveAccentColor(spoke.color);
                }
              }}
              onPointerOut={() => setHoveredSpoke(null)}
              onClick={() => {
                if (spoke.groupKey && onSelectGroup) {
                  onSelectGroup(spoke.groupKey);
                }
              }}
            >
              <cylinderGeometry
                args={[
                  spoke.isMajor ? 0.06 : 0.035,
                  spoke.isMajor ? 0.08 : 0.045,
                  1.6,
                  16,
                ]}
              />
              <meshStandardMaterial
                color={isHovered ? "#E8A317" : spoke.color}
                roughness={0.5}
                metalness={0.2}
              />
            </mesh>

            {/* Medallion on 8 Major Spokes */}
            {spoke.isMajor && (
              <mesh position={[0, 1.5, 0]}>
                <sphereGeometry args={[0.13, 16, 16]} />
                <meshStandardMaterial
                  color={isHovered ? "#FFF" : spoke.color}
                  roughness={0.3}
                  metalness={0.3}
                />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}
