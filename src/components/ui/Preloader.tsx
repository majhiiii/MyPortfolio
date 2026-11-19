"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [count, setCount] = useState(0);
  const [complete, setComplete] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Check reduced motion or repeat visit
    if (typeof window !== "undefined") {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const alreadyLoaded = sessionStorage.getItem("rm_preloader_seen");
      if (reducedMotion || alreadyLoaded) {
        setShouldRender(false);
        return;
      }
    }

    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 14) + 6;
      if (current >= 100) {
        current = 100;
        setCount(100);
        clearInterval(interval);
        setTimeout(() => {
          setComplete(true);
          sessionStorage.setItem("rm_preloader_seen", "true");
          setTimeout(() => setShouldRender(false), 900);
        }, 180);
      } else {
        setCount(current);
      }
    }, 45);

    return () => clearInterval(interval);
  }, []);

  if (!shouldRender) return null;

  const formattedCount = count < 10 ? `00${count}` : count < 100 ? `0${count}` : "100";

  return (
    <AnimatePresence>
      {!complete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col justify-between p-8 md:p-14 bg-[#0D0D0F] text-[#F3F1EC] pointer-events-auto select-none"
        >
          {/* Top header */}
          <div className="flex items-center justify-between text-xs font-mono tracking-widest text-[#6E6E73] uppercase">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFB020] animate-pulse" />
              <span>Rakesh Majhi &bull; ASSPL</span>
            </div>
            <span>Editorial Studio</span>
          </div>

          {/* Center counter */}
          <div className="flex flex-col items-center justify-center my-auto">
            <span className="font-serif text-8xl sm:text-9xl md:text-[14vw] tracking-tighter tabular-nums leading-none font-normal">
              {formattedCount}
            </span>
            <div className="mt-4 flex items-center gap-3 text-xs font-mono text-[#8E8E93] tracking-widest uppercase">
              <span className="w-8 h-[1px] bg-[#6E6E73]" />
              <span>Initialising Engine</span>
              <span className="w-8 h-[1px] bg-[#6E6E73]" />
            </div>
          </div>

          {/* Bottom metadata */}
          <div className="flex items-center justify-between text-[11px] font-mono text-[#6E6E73] uppercase tracking-wider">
            <span>Salesforce &bull; Agentforce &bull; Architecture</span>
            <span>2024 &mdash; Present</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
