"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover" | "text" | "action">("default");
  const [isVisible, setIsVisible] = useState(false);

  // Direct 1:1 mouse position tracking for zero lag
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setMounted(true);

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorAttr = target.closest("[data-cursor]")?.getAttribute("data-cursor");
      if (cursorAttr) {
        setCursorText(cursorAttr.toUpperCase());
        setCursorVariant("action");
        return;
      }

      if (target.closest("input, textarea, [contenteditable]")) {
        setCursorText("");
        setCursorVariant("text");
        return;
      }

      if (target.closest("button, a, [role='button'], .cursor-pointer")) {
        setCursorText("");
        setCursorVariant("hover");
        return;
      }

      setCursorText("");
      setCursorVariant("default");
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!mounted || !isVisible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] flex items-center justify-center -translate-x-1/2 -translate-y-1/2 will-change-transform"
      style={{
        x: mouseX,
        y: mouseY,
      }}
    >
      <motion.div
        animate={{
          width: cursorVariant === "action" ? 64 : cursorVariant === "hover" ? 38 : 12,
          height: cursorVariant === "action" ? 64 : cursorVariant === "hover" ? 38 : 12,
          backgroundColor:
            cursorVariant === "action"
              ? "var(--ink)"
              : cursorVariant === "hover"
              ? "rgba(15, 107, 255, 0.12)"
              : "transparent",
          borderColor:
            cursorVariant === "hover"
              ? "var(--accent)"
              : cursorVariant === "action"
              ? "transparent"
              : "var(--ink)",
          borderWidth: cursorVariant === "action" ? 0 : 1.5,
        }}
        transition={{ type: "spring", damping: 24, stiffness: 450 }}
        className="rounded-full flex items-center justify-center transition-colors shadow-xs"
      >
        {cursorText && (
          <span className="text-[10px] font-mono font-medium tracking-wider text-[var(--bg)] select-none">
            {cursorText}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}
