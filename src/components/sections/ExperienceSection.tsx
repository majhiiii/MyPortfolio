"use client";

import React, { useRef, useState, useEffect } from "react";
import { ASSPL_TRACKS } from "@/lib/data";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ShieldCheck, Cpu, ArrowRight } from "lucide-react";
import { usePortfolioStore } from "@/lib/store";

interface ExperienceItem {
  id: string;
  trackNumber: string;
  tabLabel: string;
  title: string;
  period: string;
  clientContext: string;
  summary: string;
  bullets: string[];
  tech: string[];
  color: string;
  tint: string;
  textColor?: string;
  governorLimits: string;
}

const ALL_EXPERIENCE: ExperienceItem[] = [
  {
    id: "briskode-tenure",
    trackNumber: "TRACK 00",
    tabLabel: "Full-Stack & AWS",
    title: "Full-Stack Web Engineering & AWS Cloud Deployments",
    period: "MAR 2024 – OCT 2024",
    clientContext: "Briskode Technology Pvt. Ltd. (Web Development)",
    summary: "Engineered responsive Next.js and React client storefronts, serverless Python APIs, and provisioned AWS cloud architectures (Amplify, CloudFront, ACM, RDS MySQL, S3).",
    bullets: [
      "Built production web applications in Next.js and React with semantic HTML5 and modern CSS architectures.",
      "Configured AWS Amplify hosting with automated GitHub branch previews and custom domain routing.",
      "Provisioned CloudFront distributions with SSL certificates managed via AWS Certificate Manager (ACM).",
      "Built serverless backend REST APIs using Python FastAPI and AWS Lambda microservices connected to RDS MySQL.",
    ],
    tech: ["Next.js", "React", "Python", "AWS Amplify", "CloudFront", "ACM", "RDS MySQL", "S3"],
    color: "#FFC93C",
    tint: "#FFF4D1",
    textColor: "#0D0D0F",
    governorLimits: "Enforced serverless scale-to-zero limits, RDS connection pooling, and sub-100ms CloudFront edge cache response times.",
  },
  ...ASSPL_TRACKS.map((t, idx) => ({
    id: t.id,
    trackNumber: t.trackNumber,
    tabLabel: t.tabLabel,
    title: t.title,
    period: t.period,
    clientContext: t.clientContext,
    summary: t.summary,
    bullets: t.bullets,
    tech: t.tech,
    color: idx === 3 ? "#00A38C" : idx === 5 ? "#FF5A5F" : "#0176D3",
    tint: idx === 3 ? "#DDF5F0" : idx === 5 ? "#FFE3E4" : "#E3F1FD",
    governorLimits: t.governorLimits,
  })),
];

export default function ExperienceSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const { setActiveAccentColor } = usePortfolioStore();

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-72%"]);
  const smoothX = useSpring(x, { stiffness: 120, damping: 25, restDelta: 0.001 });

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
      className={`relative border-b border-hairline bg-[var(--bg)] transition-colors ${
        isMobile ? "py-20" : "h-[340vh]"
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
              <span>Briskode &rarr; ASSPL Career Journey</span>
            </div>
            <h2 className="font-serif text-[clamp(2.5rem,5.5vw,4.5rem)] font-normal tracking-tight text-[var(--ink)] leading-[0.95]">
              Production Systems &bull; <span className="italic">Tenure</span>
            </h2>
          </div>

          {/* Big Tweening Year Indicator */}
          <div className="flex items-baseline gap-4 sm:text-right font-serif select-none">
            <span className="text-4xl sm:text-6xl text-[#FFC93C] font-normal">2024</span>
            <span className="text-3xl sm:text-5xl text-[var(--accent)]">&rarr;</span>
            <span className="text-4xl sm:text-6xl text-[#0176D3] font-normal italic">Present</span>
          </div>
        </div>

        {/* Mobile View: Vertical Stack */}
        {isMobile ? (
          <div className="flex flex-col space-y-6">
            {ALL_EXPERIENCE.map((track) => (
              <div
                key={track.id}
                className="p-6 rounded-sm bg-[var(--surface)] border border-hairline space-y-6 shadow-xs"
                style={{ borderTop: `4px solid ${track.color}` }}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span
                      className="px-2 py-0.5 rounded-full font-bold"
                      style={{ backgroundColor: track.tint, color: track.textColor || track.color }}
                    >
                      {track.trackNumber}
                    </span>
                    <span className="text-[var(--muted)]">{track.period}</span>
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
                      <span className="mt-0.5" style={{ color: track.color }}>&bull;</span>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Desktop Pinned Horizontal Rail */
          <div className="relative my-auto w-full overflow-visible" data-cursor="drag">
            <motion.div
              style={{ x: smoothX }}
              className="flex gap-8 w-max items-stretch cursor-grab active:cursor-grabbing py-4"
            >
              {ALL_EXPERIENCE.map((track) => (
                <div
                  key={track.id}
                  onMouseEnter={() => setActiveAccentColor(track.color)}
                  className="w-[520px] shrink-0 p-8 rounded-sm bg-[var(--surface)] border border-hairline flex flex-col justify-between space-y-6 shadow-sm hover:border-[var(--ink)] transition-all select-none"
                  style={{
                    borderTop: `4px solid ${track.color}`,
                  }}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span
                        className="font-bold px-2.5 py-0.5 rounded-full text-[11px]"
                        style={{ backgroundColor: track.tint, color: track.textColor || track.color }}
                      >
                        {track.trackNumber} &bull; {track.tabLabel}
                      </span>
                      <span className="text-[var(--muted)]">{track.period}</span>
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
                          <span className="font-mono font-bold" style={{ color: track.color }}>&mdash;</span>
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Limits Defense footer */}
                  <div className="pt-4 border-t border-hairline flex items-center justify-between text-[11px] font-mono text-[var(--muted)]">
                    <div className="flex items-center gap-1.5 text-[var(--ink)]">
                      <ShieldCheck className="w-3.5 h-3.5" style={{ color: track.color }} />
                      <span className="line-clamp-1">{track.governorLimits}</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider shrink-0 ml-2">Verified</span>
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
                className="h-full origin-left"
                style={{ scaleX: scrollYProgress, backgroundColor: "var(--accent)" }}
              />
            </div>
            <span>7 Production Tracks</span>
          </div>
        )}
      </div>
    </section>
  );
}
