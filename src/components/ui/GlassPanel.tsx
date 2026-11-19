"use client";

import React, { useRef, useState, useEffect } from "react";

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  tier?: "base" | "raised" | "overlay";
  tintColor?: string; // hex or rgba for 6% tint
  radius?: "panel" | "row" | "pill";
  enablePointerLight?: boolean;
  children: React.ReactNode;
}

export function GlassPanel({
  tier = "base",
  tintColor,
  radius = "panel",
  enablePointerLight = true,
  className = "",
  style = {},
  children,
  ...props
}: GlassPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    // Only enable pointer light on fine pointer (desktop mouse/trackpad), never on touch
    const match = window.matchMedia("(hover: hover) and (pointer: fine)");
    setCanHover(match.matches);

    const handler = (e: MediaQueryListEvent) => setCanHover(e.matches);
    match.addEventListener("change", handler);
    return () => match.removeEventListener("change", handler);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canHover || !enablePointerLight || !panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setCoords(null);
  };

  const tierClass =
    tier === "raised" ? "glass-raised" : tier === "overlay" ? "glass-overlay" : "glass-base";

  const radiusClass =
    radius === "row" ? "rounded-[14px]" : radius === "pill" ? "rounded-full" : "rounded-[20px]";

  return (
    <div
      ref={panelRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${tierClass} ${radiusClass} relative overflow-hidden ${className}`}
      style={{
        ...style,
      }}
      {...props}
    >
      {/* 6% Colour Tint Layer */}
      {tintColor && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] transition-opacity duration-300"
          style={{
            backgroundColor: tintColor,
            opacity: 0.06,
          }}
        />
      )}

      {/* Pointer Light (very soft radial highlight 240px, follows cursor) */}
      {canHover && enablePointerLight && coords && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -z-10 transition-opacity duration-300 rounded-[inherit]"
          style={{
            top: coords.y - 120,
            left: coords.x - 120,
            width: 240,
            height: 240,
            background:
              "radial-gradient(circle, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0) 70%)",
            opacity: coords ? 1 : 0,
          }}
        />
      )}

      {children}
    </div>
  );
}
