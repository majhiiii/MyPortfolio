"use client";

import React, { useEffect, useState, useRef } from "react";

export function BackdropScene() {
  const [scrollY, setScrollY] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(media.matches);

    const handleMedia = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    media.addEventListener("change", handleMedia);

    if (!media.matches) {
      const handleScroll = () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
          setScrollY(window.scrollY);
        });
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", handleScroll);
        media.removeEventListener("change", handleMedia);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }

    return () => media.removeEventListener("change", handleMedia);
  }, []);

  // Parallax translation: 20% of scroll speed
  const parallaxOffset = reducedMotion ? 0 : scrollY * 0.2;
  const wheelRotation = reducedMotion ? 0 : (scrollY * 0.04) % 360;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-50 overflow-hidden select-none bg-[var(--bg)] transition-colors duration-500"
    >
      {/* 3 Large Drifting Colour Fields (Turmeric, Vermilion, Indigo) */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          transform: `translate3d(0, -${parallaxOffset}px, 0)`,
          willChange: reducedMotion ? "auto" : "transform",
        }}
      >
        {/* Field 1: Turmeric (Top Right / Overview & Work) */}
        <div
          className={`absolute -top-24 -right-24 w-[550px] h-[550px] rounded-full bg-[#E8A317] dark:bg-[#E8A317] opacity-[0.14] dark:opacity-[0.16] blur-[130px] ${
            reducedMotion ? "" : "animate-drift-slow-1"
          }`}
          style={{ willChange: reducedMotion ? "auto" : "transform" }}
        />

        {/* Field 2: Vermilion (Middle Left / Playground) */}
        <div
          className={`absolute top-[40%] -left-32 w-[600px] h-[600px] rounded-full bg-[#C8372D] dark:bg-[#C8372D] opacity-[0.13] dark:opacity-[0.15] blur-[140px] ${
            reducedMotion ? "" : "animate-drift-slow-2"
          }`}
          style={{ willChange: reducedMotion ? "auto" : "transform" }}
        />

        {/* Field 3: Indigo (Bottom Right / Skills & Contact) */}
        <div
          className={`absolute top-[75%] -right-28 w-[620px] h-[620px] rounded-full bg-[#1F2A5C] dark:bg-[#3851B5] opacity-[0.15] dark:opacity-[0.18] blur-[140px] ${
            reducedMotion ? "" : "animate-drift-slow-3"
          }`}
          style={{ willChange: reducedMotion ? "auto" : "transform" }}
        />
      </div>

      {/* Faint Konark Wheel 1px Line-Art Background (6% Opacity, slowly rotates) */}
      <div
        className="absolute top-[8%] -right-[180px] sm:-right-[120px] lg:right-[-60px] w-[680px] h-[680px] sm:w-[840px] sm:h-[840px] opacity-[0.06] dark:opacity-[0.05] text-[var(--ink)]"
        style={{
          transform: `rotate(${wheelRotation}deg)`,
          transition: reducedMotion ? "none" : "transform 0.1s linear",
          willChange: reducedMotion ? "auto" : "transform",
        }}
      >
        <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" className="w-full h-full">
          <circle cx="100" cy="100" r="94" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="100" cy="100" r="88" strokeWidth="1" />
          <circle cx="100" cy="100" r="76" strokeWidth="0.75" />
          <circle cx="100" cy="100" r="32" strokeWidth="1" />
          <circle cx="100" cy="100" r="16" strokeWidth="1" />
          <circle cx="100" cy="100" r="6" strokeWidth="1" fill="currentColor" fillOpacity="0.2" />
          {/* 24 Radial Spokes */}
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 360) / 24;
            const isMajor = i % 3 === 0;
            return (
              <g key={i} transform={`rotate(${angle} 100 100)`}>
                <line
                  x1="100"
                  y1="100"
                  x2="100"
                  y2="12"
                  strokeWidth={isMajor ? 1 : 0.6}
                  strokeOpacity={isMajor ? 1 : 0.6}
                />
                {isMajor && <circle cx="100" cy="46" r="3.5" strokeWidth="0.8" />}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Static SVG Noise Layer (3% Opacity to eliminate banding) */}
      <div
        className="absolute inset-0 w-full h-full opacity-[0.035] dark:opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
