"use client";

import { useState } from "react";
import { METRICS } from "@/lib/data";
import { ArrowUpRight, ChevronDown, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MetricsSection() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const toggleExpand = (idx: number) => {
    setExpandedIdx(expandedIdx === idx ? null : idx);
  };

  return (
    <section id="metrics" className="py-24 lg:py-36 border-b border-hairline bg-[var(--bg)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 space-y-16">
        
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[var(--muted)]">
            <span>07 / QUANTITATIVE OUTCOMES</span>
            <span>&bull;</span>
            <span>Measured Across ASSPL Engagements</span>
          </div>
          <h2 className="font-serif text-[clamp(2.75rem,6vw,5.5rem)] font-normal tracking-tight text-[var(--ink)] leading-[0.95]">
            Engineered <span className="italic">Impact</span>
          </h2>
          <p className="text-base font-sans text-[var(--muted)] max-w-2xl">
            Empirically verified metrics from production systems. Click any metric to reveal the architectural narrative and implementation specifics.
          </p>
        </div>

        {/* Metrics Grid with Huge Serif Numerals */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {METRICS.map((metric, idx) => {
            const isExpanded = expandedIdx === idx;

            return (
              <div
                key={idx}
                onClick={() => toggleExpand(idx)}
                className="group cursor-pointer border-t border-hairline pt-6 space-y-4 hover:border-[var(--ink)] transition-colors"
              >
                <div className="flex items-center justify-between text-xs font-mono text-[var(--muted)]">
                  <span className="uppercase tracking-wider">{metric.tag}</span>
                  <div className="flex items-center gap-1 group-hover:text-[var(--accent)] transition-colors">
                    <span className="text-[11px] font-mono">
                      {isExpanded ? "Collapse" : "Story"}
                    </span>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </div>
                </div>

                {/* Huge Serif Numeral */}
                <div className="font-serif text-6xl sm:text-7xl lg:text-8xl font-normal tracking-tight text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors leading-none">
                  {metric.value}
                </div>

                {/* Label */}
                <div className="font-serif text-xl sm:text-2xl text-[var(--ink)] font-normal">
                  {metric.label}
                </div>

                {/* Clip-Path Smooth Story Reveal */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ clipPath: "inset(0% 0% 100% 0%)", opacity: 0, height: 0 }}
                      animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1, height: "auto" }}
                      exit={{ clipPath: "inset(0% 0% 100% 0%)", opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden pt-2"
                    >
                      <div className="p-4 rounded-sm bg-[var(--surface)] border border-hairline text-xs font-sans text-[var(--ink)] leading-relaxed space-y-2">
                        <p>{metric.narrative}</p>
                        <div className="pt-2 border-t border-hairline flex items-center justify-between text-[10px] font-mono text-[var(--muted)]">
                          <span>ASSPL Production Record</span>
                          <span className="text-[var(--accent)]">Verified Standard</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
