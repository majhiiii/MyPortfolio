"use client";

import { useState } from "react";
import { ASSPL_TRACKS } from "@/lib/data";
import { Code2, Cpu, CheckCircle2 } from "lucide-react";

export function ExperienceSection() {
  const [activeTrackId, setActiveTrackId] = useState(ASSPL_TRACKS[0].id);
  const activeTrack = ASSPL_TRACKS.find((t) => t.id === activeTrackId) || ASSPL_TRACKS[0];

  return (
    <section id="experience" className="py-20 lg:py-28 border-b border-hairline">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">04 / EXPERIENCE CONSOLE</span>
            <span className="text-xs font-mono text-[var(--muted)]">Software Developer @ Abacus System & Solution Pvt. Ltd. (Nov 2024 – Present)</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-[var(--ink)]">
            Production Engineering at ASSPL
          </h2>
          <p className="text-sm font-mono text-[var(--muted)] max-w-3xl leading-relaxed">
            All enterprise projects, internal tooling, and client architectures below were delivered during my tenure at ASSPL across 3 concurrent production client tracks. Select a track to inspect the deliverables, architectural patterns, and governor limit defenses.
          </p>
        </div>

        {/* Track Filter Rail */}
        <div className="flex gap-2 overflow-x-auto pb-2 border-b border-hairline scrollbar-none text-xs font-mono">
          {ASSPL_TRACKS.map((track) => {
            const isActive = activeTrackId === track.id;
            return (
              <button
                key={track.id}
                onClick={() => setActiveTrackId(track.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-t-sm transition-colors shrink-0 ${
                  isActive
                    ? "bg-[var(--surface)] text-[var(--ink)] font-bold border border-b-transparent border-hairline"
                    : "text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--surface)]/50"
                }`}
              >
                <span className="text-[10px] text-[var(--muted)] font-mono">{track.trackNumber}</span>
                <span>{track.tabLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Active Track Deep-Dive Card */}
        <div className="border border-hairline rounded-sm p-6 sm:p-8 bg-[var(--surface)] space-y-8">
          
          {/* Track Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-hairline">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase text-[var(--muted)] font-bold">
                <span>{trackNumberBadge(activeTrack.trackNumber)}</span>
                <span>·</span>
                <span>{activeTrack.period}</span>
                <span>·</span>
                <span>{activeTrack.clientContext}</span>
              </div>
              <h3 className="text-2xl font-bold text-[var(--ink)] font-sans pt-1">
                {activeTrack.title}
              </h3>
              <p className="text-sm text-[var(--muted)] font-sans max-w-3xl pt-1 leading-relaxed">
                {activeTrack.summary}
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 font-mono text-xs">
            {activeTrack.tech.map((tag, i) => (
              <span key={i} className="px-2 py-0.5 border border-hairline rounded-xs text-[var(--ink)] bg-[var(--bg)]">
                {tag}
              </span>
            ))}
          </div>

          {/* Core Deliverables */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase font-bold text-[var(--ink)] tracking-wider">
              Specific Deliverables Engineered at ASSPL
            </h4>
            <div className="space-y-2.5">
              {activeTrack.bullets.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-[var(--muted)] leading-relaxed font-sans">
                  <span className="font-mono font-bold text-[var(--ink)] mt-0.5 shrink-0">—</span>
                  <span className="text-[var(--ink)]/90">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Two-Column Deep Dive: Patterns & Limits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-hairline text-xs font-mono">
            {/* Patterns */}
            <div className="p-4 bg-[var(--bg)] border border-hairline rounded-sm space-y-2">
              <div className="text-[10px] uppercase font-bold text-[var(--ink)] flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5" />
                <span>Architectural Patterns Used</span>
              </div>
              <ul className="space-y-1.5 text-[11px] text-[var(--muted)]">
                {activeTrack.patterns.map((p, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[var(--ink)]"></span>
                    <span className="text-[var(--ink)] font-medium">{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Governor Limits & Safety */}
            <div className="p-4 bg-[var(--bg)] border border-hairline rounded-sm space-y-2">
              <div className="text-[10px] uppercase font-bold text-[var(--ink)] flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                <span>Governor Limits & Security Strategy</span>
              </div>
              <p className="text-[11px] text-[var(--muted)] leading-relaxed font-sans">
                {activeTrack.governorLimits}
              </p>
            </div>
          </div>

        </div>

        {/* Previous Web Intern Experience Row (Briskode) */}
        <div className="border border-hairline rounded-sm p-6 bg-[var(--bg)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
          <div className="space-y-1">
            <span className="text-[10px] uppercase text-[var(--muted)]">PRIOR EXPERIENCE // MAR 2024 – OCT 2024</span>
            <h4 className="text-base font-bold text-[var(--ink)] font-sans">Web Development Intern @ Briskode Technology Pvt. Ltd.</h4>
            <p className="text-xs text-[var(--muted)] font-sans">
              Built and shipped 10+ responsive React.js and Next.js UI components and pages for client-facing SaaS products, designed REST API data flow, and participated in agile sprints.
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5 text-[10px]">
            {["React.js", "Next.js", "REST APIs", "Tailwind CSS", "JavaScript (ES6+)"].map((t) => (
              <span key={t} className="px-2 py-0.5 border border-hairline rounded-xs bg-[var(--surface)] text-[var(--ink)]">
                {t}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function trackNumberBadge(num: string) {
  return num;
}

export default ExperienceSection;
