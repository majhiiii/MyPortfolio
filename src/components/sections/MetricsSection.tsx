"use client";

import { useState } from "react";
import { METRICS } from "@/lib/data";
import { X, ArrowUpRight } from "lucide-react";

export default function MetricsSection() {
  const [activeStoryIdx, setActiveStoryIdx] = useState<number | null>(null);

  const activeMetric = activeStoryIdx !== null ? METRICS[activeStoryIdx] : null;

  return (
    <section id="metrics" className="py-20 lg:py-28 border-b border-hairline">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 space-y-12">
        
        {/* Section Title */}
        <div className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">07 / METRICS</span>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-[var(--ink)]">Quantitative Delivery</h2>
          <p className="text-sm font-mono text-[var(--muted)] max-w-xl">
            Verified production performance metrics. Click any metric to review the architectural story behind it.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {METRICS.map((metric, idx) => (
            <div
              key={idx}
              onClick={() => setActiveStoryIdx(idx)}
              className="p-6 border border-hairline rounded-sm bg-[var(--surface)] hover:border-[var(--ink)] transition-colors cursor-pointer group flex flex-col justify-between min-h-[190px]"
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[10px] uppercase text-[var(--muted)]">{metric.tag}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[var(--muted)] group-hover:text-[var(--ink)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>

              <div className="my-3">
                <div className="text-4xl lg:text-5xl font-mono font-bold tracking-tight text-[var(--ink)] transition-colors">
                  {metric.value}
                </div>
                <div className="text-xs font-mono font-semibold text-[var(--muted)] mt-1">{metric.label}</div>
              </div>

              <div className="text-[10px] font-mono text-[var(--muted)] border-t border-hairline pt-2">
                Click to inspect technical context →
              </div>
            </div>
          ))}
        </div>

        {/* Story Modal */}
        {activeMetric && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setActiveStoryIdx(null)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="w-full max-w-lg bg-[var(--surface)] border border-hairline rounded-sm p-6 sm:p-8 space-y-4 font-mono text-xs"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between pb-3 border-b border-hairline">
                <div>
                  <span className="text-[10px] uppercase text-[var(--muted)]">{activeMetric.tag}</span>
                  <div className="text-3xl font-bold text-[var(--ink)] mt-1">{activeMetric.value}</div>
                  <div className="text-xs font-semibold text-[var(--accent)]">{activeMetric.label}</div>
                </div>
                <button
                  onClick={() => setActiveStoryIdx(null)}
                  className="p-1 border border-hairline rounded-sm text-[var(--muted)] hover:text-[var(--ink)]"
                  aria-label="Close story"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="font-sans text-sm text-[var(--muted)] leading-relaxed pt-2">
                <p>{activeMetric.narrative}</p>
              </div>

              <div className="pt-3 border-t border-hairline text-[10px] text-[var(--muted)]">
                Verified delivery metric across production tracks at ASSPL.
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
