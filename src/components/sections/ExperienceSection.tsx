"use client";

import React, { useRef, useState, useEffect } from "react";
import { ASSPL_TRACKS } from "@/lib/data";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ShieldCheck, Cpu, ArrowRight } from "lucide-react";

export default function ExperienceSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Smooth horizontal translation
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-68%"]);
  const smoothX = useSpring(x, { stiffness: 120, damping: 25, restDelta: 0.001 });

  // Year tween from 2024 to Present
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      id="experience"
      ref={targetRef}
      className={`relative border-b border-hairline bg-[var(--bg)] ${
        isMobile ? "py-20" : "h-[320vh]"
      }`}
    >
      <div
        className={`${
          isMobile
            ? "space-y-8 px-6"
            : "sticky top-0 h-screen flex flex-col justify-between overflow-hidden py-12 px-6 lg:px-12 max-w-[1400px] mx-auto w-full"
        }`}
      >
        {/* Rail Top Header & Big Year Indicator */}
        <div className="w-full flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-hairline pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[var(--muted)]">
              <span>04 / EXPERIENCE RAIL</span>
              <span>&bull;</span>
              <span>ASSPL Engineering Tenure</span>
            </div>
            <h2 className="font-serif text-[clamp(2.5rem,5.5vw,4.5rem)] font-normal tracking-tight text-[var(--ink)] leading-[0.95]">
              Production Systems &bull; <span className="italic">ASSPL</span>
            </h2>
          </div>

          <div className="flex items-baseline gap-4 sm:text-right font-serif">
            <span className="text-4xl sm:text-6xl text-[var(--muted)]/50 font-normal">2024</span>
            <span className="text-3xl sm:text-5xl text-[var(--accent)]">&rarr;</span>
            <span className="text-4xl sm:text-6xl text-[var(--ink)] font-normal italic">Present</span>
          </div>
        </div>

        {/* Desktop Pinned Horizontal Rail / Mobile Snap-Scroll */}
        {isMobile ? (
          <div className="flex flex-col space-y-6">
            {ASSPL_TRACKS.map((track) => (
              <div
                key={track.id}
                className="p-6 rounded-sm bg-[var(--surface)] border border-hairline space-y-6"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[var(--muted)]">
                    <span className="text-[var(--accent)] font-semibold">{track.trackNumber}</span>
                    <span>{track.period}</span>
                  </div>
                  <h3 className="font-serif text-2xl font-normal text-[var(--ink)]">
                    {track.title}
                  </h3>
                  <p className="text-xs text-[var(--muted)] font-sans leading-relaxed">
                    {track.summary}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                  {track.tech.map((t, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-full border border-hairline bg-[var(--bg)] text-[var(--ink)]">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="space-y-2 pt-2 border-t border-hairline">
                  {track.bullets.slice(0, 3).map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs font-sans text-[var(--ink)]/80">
                      <span className="text-[var(--accent)] mt-0.5">&bull;</span>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="relative my-auto w-full overflow-visible" data-cursor="drag">
            <motion.div
              style={{ x: smoothX }}
              className="flex gap-8 w-max items-stretch cursor-grab active:cursor-grabbing py-4"
            >
              {ASSPL_TRACKS.map((track, idx) => (
                <div
                  key={track.id}
                  className="w-[520px] shrink-0 p-8 rounded-sm bg-[var(--surface)] border border-hairline flex flex-col justify-between space-y-6 shadow-sm hover:border-[var(--ink)] transition-colors select-none"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono text-[var(--muted)]">
                      <span className="font-semibold text-[var(--accent)]">
                        {track.trackNumber}
                      </span>
                      <span>{track.period} &bull; {track.clientContext}</span>
                    </div>

                    <h3 className="font-serif text-3xl font-normal text-[var(--ink)] leading-snug">
                      {track.title}
                    </h3>

                    <p className="text-sm font-sans text-[var(--muted)] leading-relaxed">
                      {track.summary}
                    </p>

                    <div className="flex flex-wrap gap-1.5 font-mono text-[11px] pt-1">
                      {track.tech.map((t, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-0.5 rounded-full border border-hairline bg-[var(--bg)] text-[var(--ink)]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Core Deliverables */}
                  <div className="space-y-3 pt-4 border-t border-hairline">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--muted)]">
                      Production Deliverables
                    </span>
                    <div className="space-y-2">
                      {track.bullets.map((bullet, bIdx) => (
                        <div
                          key={bIdx}
                          className="flex items-start gap-2.5 text-xs font-sans text-[var(--ink)] leading-relaxed"
                        >
                          <span className="font-mono text-[var(--accent)] font-bold">&mdash;</span>
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Governor Defenses footer */}
                  <div className="pt-4 border-t border-hairline flex items-center justify-between text-[11px] font-mono text-[var(--muted)]">
                    <div className="flex items-center gap-1.5 text-[var(--ink)]">
                      <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                      <span className="line-clamp-1">{track.governorLimits}</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider shrink-0 ml-2">ASSPL Verified</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        )}

        {/* Progress Scrubber (Desktop) */}
        {!isMobile && (
          <div className="w-full pt-6 border-t border-hairline flex items-center justify-between text-xs font-mono text-[var(--muted)]">
            <div className="flex items-center gap-3">
              <span>Scroll horizontally</span>
              <ArrowRight className="w-3.5 h-3.5 text-[var(--accent)] animate-pulse" />
            </div>
            {/* Scrubber track */}
            <div className="w-64 h-1 bg-[var(--hairline)] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[var(--accent)] origin-left"
                style={{ scaleX: scrollYProgress }}
              />
            </div>
            <span>6 ASSPL Tracks</span>
          </div>
        )}
      </div>
    </section>
  );
}
