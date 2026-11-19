"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover" | "text" | "action">("default");
  const [isVisible, setIsVisible] = useState(false);

  // Direct 1:1 hardware mouse tracking with zero latency
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const lastTargetRef = useRef<EventTarget | null>(null);
  const currentVariantRef = useRef<"default" | "hover" | "text" | "action">("default");
  const currentTextRef = useRef<string>("");

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setMounted(true);

    const onMouseMove = (e: MouseEvent) => {
      // 1:1 direct coordinate set without React state updates
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (!isVisible) setIsVisible(true);

      // Only evaluate element classification when target element actually changes
      if (e.target === lastTargetRef.current) return;
      lastTargetRef.current = e.target;

      const target = e.target as HTMLElement | null;
      if (!target) return;

      let nextVariant: "default" | "hover" | "text" | "action" = "default";
      let nextText = "";

      const cursorAttr = target.closest("[data-cursor]")?.getAttribute("data-cursor");
      if (cursorAttr) {
        nextText = cursorAttr.toUpperCase();
        nextVariant = "action";
      } else if (target.closest("input, textarea, [contenteditable]")) {
        nextVariant = "text";
      } else if (target.closest("button, a, [role='button'], .cursor-pointer")) {
        nextVariant = "hover";
      }

      // Only trigger React state updates if variant or text changed
      if (nextVariant !== currentVariantRef.current) {
        currentVariantRef.current = nextVariant;
        setCursorVariant(nextVariant);
      }
      if (nextText !== currentTextRef.current) {
        currentTextRef.current = nextText;
        setCursorText(nextText);
      }
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
        transition={{ type: "spring", damping: 28, stiffness: 500 }}
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
