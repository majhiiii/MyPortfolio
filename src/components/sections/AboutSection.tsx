"use client";

import React from "react";
import { FACTS, CERTIFICATIONS } from "@/lib/data";
import { motion } from "framer-motion";
import { ShieldCheck, Award, Terminal, CheckCircle2, Zap } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 lg:py-36 border-b border-hairline bg-[var(--bg)] transition-colors">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-12 gap-8 lg:gap-16">
        
        {/* Left Column: Sticky Editorial Profile Card */}
        <div className="col-span-12 lg:col-span-5">
          <div className="lg:sticky lg:top-28 space-y-8">
            
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">02 / ABOUT</span>
              <h2 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-normal tracking-tight text-[var(--ink)] leading-[0.95]">
                Engineering &amp; <span className="italic">Approach</span>
              </h2>
            </div>

            {/* Profile Card */}
            <div className="relative max-w-sm rounded-lg bg-[var(--surface)] border border-hairline p-6 flex flex-col justify-between shadow-xs transition-colors">
              
              {/* Header Meta */}
              <div className="flex items-center justify-between text-[11px] font-mono text-[var(--muted)] pb-4 border-b border-hairline">
                <span>PROFILE</span>
                <span className="text-[var(--ink)] font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                  ASSPL &amp; BRISKODE
                </span>
              </div>

              {/* Monogram & Title */}
              <div className="py-8 flex flex-col items-center justify-center text-center">
                <div
                  className="w-24 h-24 rounded-full border-2 border-[var(--accent)] flex items-center justify-center font-serif text-5xl font-light mb-4 shadow-xs bg-[var(--bg)] text-[var(--ink)]"
                >
                  RM
                </div>
                <h3 className="font-serif text-2xl text-[var(--ink)] font-normal tracking-tight">
                  Rakesh Majhi
                </h3>
                <span className="text-xs font-mono text-[var(--accent)] font-semibold mt-1 tracking-wider uppercase">
                  Software Engineer &bull; Full-Stack Builder
                </span>
                <span className="text-[11px] font-mono text-[var(--muted)] mt-0.5">
                  Bhubaneswar, Odisha, India
                </span>
              </div>

              {/* Key Highlights */}
              <div className="border-t border-hairline pt-4 space-y-2.5 text-xs font-mono">
                <div className="flex items-center justify-between text-[var(--muted)]">
                  <span>Stack Agility</span>
                  <span className="text-[var(--ink)] font-medium">Multi-Stack &bull; Fast Shipping</span>
                </div>
                <div className="flex items-center justify-between text-[var(--muted)]">
                  <span>Experience</span>
                  <span className="text-[var(--ink)] font-medium">2+ Years Enterprise &amp; Products</span>
                </div>
                <div className="flex items-center justify-between text-[var(--muted)]">
                  <span>Core Focus</span>
                  <span className="text-[var(--ink)] font-medium">Web &bull; Cloud &bull; AI &bull; Platforms</span>
                </div>
              </div>

              {/* Bottom Strip */}
              <div className="mt-4 pt-3 border-t border-hairline flex items-center justify-between text-[10px] font-mono text-[var(--muted)]">
                <span className="flex items-center gap-1 text-[var(--ink)] font-medium">
                  <Zap className="w-3.5 h-3.5 text-[var(--accent)]" />
                  VERSATILE &amp; RELENTLESS
                </span>
                <span className="uppercase">PRODUCTION READY</span>
              </div>

            </div>

          </div>
        </div>

        {/* Right Column: Narrative with Real Human Voice */}
        <div className="col-span-12 lg:col-span-7 space-y-16">
          
          {/* Core Philosophy Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">
              Approach &amp; Mindset
            </h3>
            <p className="font-serif text-2xl sm:text-3xl lg:text-[2.2rem] leading-relaxed text-[var(--ink)] font-normal">
              I am a versatile <span className="italic font-medium">Software Engineer</span> and relentless builder who works fluidly across multiple tech stacks. I don&apos;t believe in being boxed into a single ecosystem &mdash; I move fast, pick up new frameworks in hours, and turn complex problems into running software at breakneck velocity. Over 2+ years across <span className="italic text-[var(--accent)]">ASSPL and Briskode</span>, I have shipped across the entire spectrum: from React and Next.js frontends to Python microservices, AWS cloud infrastructure, autonomous AI agents, and high-throughput enterprise platforms. I balance rapid execution with rock-solid engineering &mdash; clean code, strict security, and battle-tested production reliability.
            </p>
          </motion.div>

          {/* Quick Facts */}
          <div className="border-t border-hairline pt-8 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">
                Quick Facts &amp; Experience
              </h3>
              <span className="text-[11px] font-mono text-[var(--muted)]">ASSPL &amp; Briskode</span>
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

          {/* Certifications & Standards */}
          <div className="border-t border-hairline pt-8 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">
                Certifications &amp; Standards
              </h3>
              <span className="text-[11px] font-mono font-medium text-[var(--accent)]">
                Credentials
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
                      <ShieldCheck className="w-4 h-4 text-[var(--accent)] shrink-0" />
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
