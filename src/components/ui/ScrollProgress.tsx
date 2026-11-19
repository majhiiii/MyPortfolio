"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { usePortfolioStore } from "@/lib/store";

const SECTIONS = [
  { id: "hero", label: "Hero" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "playground", label: "Playground" },
  { id: "metrics", label: "Metrics" },
  { id: "contact", label: "Contact" },
];

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const activeSection = usePortfolioStore((s) => s.activeSection);
  const setActiveSection = usePortfolioStore((s) => s.setActiveSection);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -40% 0px", threshold: 0.1 }
    );

    SECTIONS.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [setActiveSection]);

  if (!mounted) return null;

  return (
    <>
      {/* Top thin accent line */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[var(--accent)] origin-left z-50 pointer-events-none"
        style={{ scaleX }}
      />

      {/* Right minimal section dot indicator (hidden on mobile) */}
      <div className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3 pointer-events-auto">
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              className="group relative flex items-center justify-center p-1"
              aria-label={`Scroll to ${sec.label}`}
            >
              {/* Tooltip on hover */}
              <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-[var(--ink)] text-[var(--bg)] whitespace-nowrap shadow-sm">
                {sec.label}
              </span>

              {/* Stretching dot indicator */}
              <motion.div
                animate={{
                  height: isActive ? 20 : 5,
                  width: 5,
                  backgroundColor: isActive ? "var(--accent)" : "var(--muted)",
                  opacity: isActive ? 1 : 0.4,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="rounded-full"
              />
            </a>
          );
        })}
      </div>
    </>
  );
}
