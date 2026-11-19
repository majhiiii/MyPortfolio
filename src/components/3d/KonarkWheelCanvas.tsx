"use client";

import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { KonarkWheelModel } from "./KonarkWheelModel";
import { KonarkWheelSvg } from "./KonarkWheelSvg";
import { SkillGroupId } from "@/data/stack";

export function KonarkWheelCanvas({
  onSelectGroup,
}: {
  onSelectGroup?: (groupId: SkillGroupId) => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(media.matches);

    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  if (!mounted || prefersReducedMotion) {
    return (
      <div className="w-full h-full flex items-center justify-center p-4">
        <KonarkWheelSvg size={240} className="drop-shadow-xs" />
      </div>
    );
  }

  return (
    <div className="w-full h-full relative flex items-center justify-center">
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <KonarkWheelSvg size={240} className="opacity-80" />
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, 0, 7.5], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          style={{ width: "100%", height: "100%", background: "transparent" }}
        >
          {/* Studio Lighting */}
          <ambientLight intensity={1.2} />
          <directionalLight position={[4, 5, 4]} intensity={1.5} color="#FFFBF2" />
          <directionalLight position={[-4, -3, 2]} intensity={0.6} color="#E8A317" />
          <pointLight position={[0, 0, 3]} intensity={0.8} />

          <KonarkWheelModel onSelectGroup={onSelectGroup} />
        </Canvas>
      </Suspense>
    </div>
  );
}
