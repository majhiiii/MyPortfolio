"use client";

import React from "react";
import { PERSONAL_DATA } from "@/lib/data";
import { STACK_DATA, SKILL_GROUPS } from "@/data/stack";
import { ArrowDown, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Magnetic } from "@/components/ui/Magnetic";
import { TechIcon } from "@/components/ui/TechIcon";
import { usePortfolioStore } from "@/lib/store";

export default function HeroSection() {
  const name = "Rakesh Majhi";
  const { setActiveAccentColor } = usePortfolioStore();

  const marqueeItems = STACK_DATA.slice(0, 16);

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-4.5rem)] flex flex-col justify-between border-b border-hairline pt-8 md:pt-16 overflow-hidden bg-[var(--bg)] transition-colors"
    >
      {/* 12-Column Grid Container */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full grid grid-cols-12 gap-8 items-center flex-1 my-auto">
        
        {/* Left Column: Expressive Editorial Typography */}
        <div className="col-span-12 lg:col-span-7 space-y-6 z-10">
          
          {/* Metadata pill */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[var(--muted)]">
            <span className="flex items-center gap-2 px-3 py-1 rounded-full border border-hairline bg-[var(--surface)] text-[var(--ink)] shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#FFB020] animate-pulse" />
              <span>Available for Enterprise Roles</span>
            </span>
            <span className="hidden sm:inline text-[var(--hairline)]">&bull;</span>
            <span className="hidden sm:inline">Bhubaneswar &bull; ASSPL Tenure</span>
          </div>

          {/* Giant Display Name */}
          <h1 className="font-serif text-[clamp(4rem,10.5vw,11.5rem)] font-normal tracking-[-0.03em] leading-[0.88] text-[var(--ink)] select-none">
            {name.split(" ").map((word, wordIdx) => (
              <span key={wordIdx} className="inline-block mr-4 sm:mr-8">
                {word.split("").map((char, charIdx) => (
                  <motion.span
                    key={charIdx}
                    initial={{ y: 80, opacity: 0, rotateZ: 3 }}
                    animate={{ y: 0, opacity: 1, rotateZ: 0 }}
                    transition={{
                      duration: 0.9,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.1 + (wordIdx * 6 + charIdx) * 0.035,
                    }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          {/* Subtitle with SVG pathLength underline on emphasis */}
          <div className="space-y-4 max-w-[62ch]">
            <p className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[var(--ink)] leading-snug font-normal">
              Salesforce Developer &amp;{" "}
              <span className="italic relative inline-block text-[var(--ink)]">
                Agentforce Specialist
                <svg
                  className="absolute -bottom-1.5 left-0 w-full h-2 overflow-visible"
                  style={{ color: "var(--accent)" }}
                  viewBox="0 0 100 8"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M 0,5 Q 50,0 100,5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
                  />
                </svg>
              </span>{" "}
              architecting enterprise engines at ASSPL.
            </p>

            <p className="font-sans text-base sm:text-lg text-[var(--muted)] leading-relaxed">
              Leading 3 concurrent client tracks across B2B Commerce, CloudCraze, custom CPQ configurators, AWS cloud deployments, and 10+ hardened enterprise integrations.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono">
            <Magnetic strength={0.3} radius={70}>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--ink)] text-[var(--bg)] font-medium hover:opacity-90 transition-all shadow-sm"
              >
                <span>Explore Projects (05)</span>
                <span className="font-mono text-xs">&rarr;</span>
              </a>
            </Magnetic>

            <Magnetic strength={0.3} radius={70}>
              <a
                href="#skills"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-hairline text-[var(--ink)] hover:border-[var(--ink)] hover:bg-[var(--surface)] transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>Stack Explorer (03)</span>
              </a>
            </Magnetic>

            <Magnetic strength={0.3} radius={70}>
              <a
                href="#stack-pit"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-hairline text-[var(--ink)] hover:bg-[var(--surface)] transition-all"
              >
                <span>The Stack Pit</span>
              </a>
            </Magnetic>
          </div>

        </div>

        {/* Right Column: Open 3D Stage (Stage Anchor) */}
        <div
          data-stage="hero"
          data-cursor="drag"
          className="col-span-12 lg:col-span-5 h-[340px] sm:h-[420px] lg:h-[540px] relative pointer-events-auto flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
          title="Click and drag to rotate the 3D model. Click 5 times for easter egg!"
        >
          <div className="absolute bottom-4 right-4 text-[10px] font-mono text-[var(--muted)] opacity-60 hidden lg:block">
            Orbiting 3D Tech Tiles &bull; Click cloud 5x for rain
          </div>
        </div>

      </div>

      {/* Opposing Infinite Marquee Strip 1: Tech Monograms and Groups */}
      <div className="w-full border-t border-hairline bg-[var(--surface)] py-3 overflow-hidden select-none">
        <div className="flex whitespace-nowrap animate-[marquee_30s_linear_infinite]">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => {
            const group = SKILL_GROUPS[item.group] || SKILL_GROUPS.salesforce;
            return (
              <span
                key={idx}
                onMouseEnter={() => setActiveAccentColor(item.color)}
                className="mx-6 text-xs sm:text-sm font-mono tracking-wider text-[var(--ink)] flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform"
              >
                <span
                  className="px-2 py-0.5 rounded-xs font-bold text-[10px] text-white"
                  style={{ backgroundColor: group.color }}
                >
                  {item.monogram}
                </span>
                <span>{item.name}</span>
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: group.color }} />
              </span>
            );
          })}
        </div>
      </div>

      {/* Hero Bottom Bar */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full py-4 border-t border-hairline">
        <div className="grid grid-cols-12 gap-4 text-xs font-mono text-[var(--muted)] items-center">
          <div className="col-span-12 sm:col-span-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FFB020]" />
            <span className="text-[var(--ink)] font-medium">Bhubaneswar, India</span>
            <span>&bull; {PERSONAL_DATA.status}</span>
          </div>
          <div className="col-span-12 sm:col-span-4 text-left sm:text-center text-[11px]">
            Apex &bull; Agentforce &bull; LWC &bull; AWS &bull; REST/SOAP &bull; CPQ
          </div>
          <div className="col-span-12 sm:col-span-4 text-left sm:text-right flex items-center justify-start sm:justify-end gap-2">
            <span>Explore down</span>
            <ArrowDown className="w-3.5 h-3.5 text-[var(--accent)] animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
