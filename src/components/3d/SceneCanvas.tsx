"use client";

import React, { useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { CloudModel } from "./CloudModel";
import { FallbackPoster } from "./FallbackPoster";
import { usePortfolioStore } from "@/lib/store";

export function SceneCanvas() {
  const [mounted, setMounted] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const theme = usePortfolioStore((s) => s.theme);

  useEffect(() => {
    setMounted(true);

    // 1. Reduced motion check
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(motionQuery.matches);

    const onMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    motionQuery.addEventListener("change", onMotionChange);

    // 2. WebGL support check
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      if (!gl) {
        setHasWebGL(false);
      }
    } catch {
      setHasWebGL(false);
    }

    return () => {
      motionQuery.removeEventListener("change", onMotionChange);
    };
  }, []);

  if (!mounted) {
    return null;
  }

  // If reduced motion is requested or WebGL is not available, provide clean fallback
  if (prefersReducedMotion || !hasWebGL) {
    return <FallbackPoster />;
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      <Suspense fallback={<FallbackPoster />}>
        <Canvas
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 7.5], fov: 45 }}
          className="w-full h-full"
        >
          <ambientLight intensity={theme === "dark" ? 0.6 : 0.85} />
          <directionalLight
            position={[5, 8, 5]}
            intensity={theme === "dark" ? 1.0 : 1.3}
          />
          <directionalLight
            position={[-5, -4, -3]}
            intensity={theme === "dark" ? 0.35 : 0.3}
            color="#0176D3"
          />
          <CloudModel />
        </Canvas>
      </Suspense>
    </div>
  );
}
