"use client";

import React, { useRef } from "react";
import { FACTS, CERTIFICATIONS } from "@/lib/data";
import { motion, useScroll, useTransform } from "framer-motion";
import { ShieldCheck } from "lucide-react";

function Word({ children, progress, range }: { children: string; progress: any; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <span className="relative inline-block mr-1.5 lg:mr-2">
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
}

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.5"],
  });

  const narrativeText =
    "I am a Salesforce Developer specializing in custom Apex engineering, Lightning Web Components, B2B Commerce, and enterprise integrations. Over 2 years at Abacus System & Solution Pvt. Ltd. (ASSPL), I have engineered high-throughput quoting configurators, logistics APIs, and automated billing reconciliations. I treat governor limits, unit test isolation (>85% coverage), and field-level security as non-negotiable fundamentals.";

  const words = narrativeText.split(" ");

  return (
    <section id="about" className="py-24 lg:py-36 border-b border-hairline bg-[var(--bg)] transition-colors">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-12 gap-8 lg:gap-16">
        
        {/* Left Column: Sticky Editorial Portrait / Identity Card with Colored Offset Block */}
        <div className="col-span-12 lg:col-span-5">
          <div className="lg:sticky lg:top-28 space-y-8">
            
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">02 / ABOUT</span>
              <h2 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-normal tracking-tight text-[var(--ink)] leading-[0.95]">
                Discipline &amp; <span className="italic">Tenure</span>
              </h2>
            </div>

            {/* Editorial Portrait Frame with Colored Offset Block */}
            <div className="relative max-w-sm">
              {/* Colored offset shadow block */}
              <div
                className="absolute inset-0 translate-x-3 translate-y-3 rounded-lg opacity-40 transition-colors duration-500"
                style={{ backgroundColor: "var(--accent)" }}
              />

              <motion.div
                initial={{ clipPath: "inset(100% 0% 0% 0%)", opacity: 0 }}
                whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-[4/5] rounded-lg bg-[var(--surface)] border border-hairline p-6 flex flex-col justify-between overflow-hidden shadow-xs z-10"
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-[var(--muted)]">
                  <span>PORTRAIT // ARCHIVE</span>
                  <span className="text-[var(--ink)] font-medium">ASSPL &bull; 2024&ndash;PRESENT</span>
                </div>

                {/* Architectural Monogram Visual */}
                <div className="my-auto flex flex-col items-center justify-center text-center py-8">
                  <div className="w-24 h-24 rounded-full border border-hairline flex items-center justify-center font-serif text-5xl font-light text-[var(--ink)] mb-4 shadow-xs bg-[var(--bg)]">
                    RM
                  </div>
                  <span className="font-serif text-2xl text-[var(--ink)] font-normal tracking-tight">
                    Rakesh Majhi
                  </span>
                  <span className="text-xs font-mono text-[var(--muted)] mt-1 tracking-wider uppercase">
                    Salesforce Developer &bull; Bhubaneswar
                  </span>
                </div>

                <div className="border-t border-hairline pt-3 flex items-center justify-between text-[10px] font-mono text-[var(--muted)]">
                  <span>3 CLIENT TRACKS</span>
                  <span className="font-medium" style={{ color: "var(--accent)" }}>
                    VERIFIED PRODUCTION
                  </span>
                </div>
              </motion.div>
            </div>

          </div>
        </div>

        {/* Right Column: Progressive Word-by-Word Scroll Reveal & Clean Rows */}
        <div ref={containerRef} className="col-span-12 lg:col-span-7 space-y-16">
          
          {/* Progressive Scroll-driven Narrative */}
          <div className="space-y-6">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">
              Core Philosophy
            </h3>
            <p className="font-serif text-2xl sm:text-3xl lg:text-[2.2rem] leading-relaxed text-[var(--ink)] font-normal">
              {words.map((word, i) => {
                const start = i / words.length;
                const end = start + 1 / words.length;
                return (
                  <Word key={i} progress={scrollYProgress} range={[start, end]}>
                    {word}
                  </Word>
                );
              })}
            </p>
          </div>

          {/* Quick Facts */}
          <div className="border-t border-hairline pt-8 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">
                Engineering Tenets &amp; Facts
              </h3>
              <span className="text-[11px] font-mono text-[var(--muted)]">Verified @ ASSPL</span>
            </div>

            <div className="divide-y divide-hairline">
              {FACTS.map((fact, idx) => (
                <div
                  key={idx}
                  className="py-4 grid grid-cols-12 gap-4 text-sm font-sans items-baseline hover:bg-[var(--surface)]/40 px-2 transition-colors rounded-sm"
                >
                  <span className="col-span-12 sm:col-span-4 font-mono text-xs text-[var(--muted)]">
                    {fact.label}
                  </span>
                  <span className="col-span-12 sm:col-span-8 text-[var(--ink)] font-medium">
                    {fact.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Credentials */}
          <div className="border-t border-hairline pt-8 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">
                Verified Credentials &amp; Standards
              </h3>
              <span className="text-[11px] font-mono font-medium" style={{ color: "var(--accent)" }}>
                Official Badges
              </span>
            </div>

            <div className="divide-y divide-hairline">
              {CERTIFICATIONS.map((cert, idx) => (
                <div
                  key={idx}
                  className="py-5 grid grid-cols-12 gap-4 items-start hover:bg-[var(--surface)]/40 px-2 transition-colors rounded-sm"
                >
                  <div className="col-span-12 sm:col-span-1 font-serif text-3xl text-[var(--muted)]/50 leading-none">
                    0{idx + 1}
                  </div>
                  <div className="col-span-12 sm:col-span-7 space-y-1">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#0176D3] shrink-0" />
                      <h4 className="font-serif text-lg font-medium text-[var(--ink)] leading-snug">
                        {cert.title}
                      </h4>
                    </div>
                    <p className="text-xs text-[var(--muted)] font-sans leading-relaxed">
                      {cert.summary}
                    </p>
                  </div>
                  <div className="col-span-12 sm:col-span-4 text-left sm:text-right font-mono text-xs">
                    <span className="font-semibold text-[var(--ink)] block">{cert.status}</span>
                    <span className="text-[11px] text-[var(--muted)] block">{cert.issuer}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
