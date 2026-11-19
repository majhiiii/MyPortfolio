"use client";

import { useRef, useState } from "react";
import { EXPERIENCE_RAIL } from "@/lib/data";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function ExperienceSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const total = scrollWidth - clientWidth;
      if (total > 0) {
        setScrollProgress((scrollLeft / total) * 100);
      }
    }
  };

  const scrollBy = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section id="experience" className="py-20 lg:py-28 border-b border-hairline overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 space-y-8">
        
        {/* Section Header with Rail Scrubber and Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">04 / EXPERIENCE</span>
            <h2 className="text-3xl font-bold tracking-tight text-[var(--ink)]">Horizontal Delivery Rail</h2>
            <p className="text-sm font-mono text-[var(--muted)]">Briskode Technologies to Abacus Systems (ASSPL).</p>
          </div>

          <div className="flex items-center gap-4">
            {/* Scrubber bar */}
            <div className="w-32 h-1 bg-hairline rounded-full overflow-hidden hidden sm:block">
              <div
                className="h-full bg-[var(--accent)] transition-all duration-150"
                style={{ width: `${Math.max(15, scrollProgress)}%` }}
              />
            </div>
            {/* Arrows */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => scrollBy(-380)}
                className="p-2 border border-hairline rounded-sm hover:border-[var(--ink)] text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
                aria-label="Scroll experience left"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => scrollBy(380)}
                className="p-2 border border-hairline rounded-sm hover:border-[var(--ink)] text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
                aria-label="Scroll experience right"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Rail */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 pt-2 scrollbar-none"
          tabIndex={0}
          role="region"
          aria-label="Experience horizontal rail"
        >
          {EXPERIENCE_RAIL.map((item, idx) => (
            <div
              key={idx}
              className="min-w-[320px] sm:min-w-[480px] lg:min-w-[560px] snap-start border border-hairline rounded-sm p-6 sm:p-8 bg-[var(--surface)] space-y-6 shrink-0"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-hairline text-xs font-mono">
                <span className="text-[var(--accent)] font-bold">{item.period}</span>
                <span className="text-[var(--muted)]">{item.location}</span>
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-bold text-[var(--ink)]">{item.role}</h3>
                <p className="text-sm font-mono text-[var(--muted)] font-medium">{item.company}</p>
              </div>

              <ul className="space-y-2.5 text-xs text-[var(--muted)] leading-relaxed">
                {item.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2">
                    <span className="text-[var(--ink)] font-mono font-bold mt-0.5">—</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-hairline flex flex-wrap gap-1.5 font-mono text-[11px]">
                {item.tech.map((t, tIdx) => (
                  <span key={tIdx} className="px-2 py-0.5 border border-hairline rounded-xs text-[var(--muted)]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
