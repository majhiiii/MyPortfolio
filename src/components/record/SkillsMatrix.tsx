"use client";

import React, { useState } from "react";
import { STACK_DATA, TechItem, SkillGroupId } from "@/data/stack";
import { TechGlyph } from "@/components/ui/TechGlyph";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { RefreshCw, ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";

const SIX_COLUMNS: {
  id: SkillGroupId;
  name: string;
  color: string;
  headerBg: string;
  badgeColor: string;
  coreIds: string[];
}[] = [
  {
    id: "salesforce",
    name: "Salesforce Platform",
    color: "#0176D3",
    headerBg: "bg-blue-100/90 dark:bg-blue-950/60 border-blue-300 dark:border-blue-800",
    badgeColor: "text-blue-950 dark:text-blue-200",
    coreIds: ["apex", "lwc", "b2b-commerce", "soql"],
  },
  {
    id: "agentforce",
    name: "Agentforce & AI",
    color: "#7C3AED",
    headerBg: "bg-purple-100/90 dark:bg-purple-950/60 border-purple-300 dark:border-purple-800",
    badgeColor: "text-purple-950 dark:text-purple-200",
    coreIds: ["agentforce", "agent-builder", "invocable-apex", "einstein-bots"],
  },
  {
    id: "integrations",
    name: "Integrations & APIs",
    color: "#008774",
    headerBg: "bg-teal-100/90 dark:bg-teal-950/60 border-teal-300 dark:border-teal-800",
    badgeColor: "text-teal-950 dark:text-teal-200",
    coreIds: ["rest-api", "oauth-pkce", "stripe", "quickbooks"],
  },
  {
    id: "fullstack",
    name: "Full-Stack Web",
    color: "#D97706",
    headerBg: "bg-amber-100/90 dark:bg-amber-950/60 border-amber-300 dark:border-amber-800",
    badgeColor: "text-amber-950 dark:text-amber-200",
    coreIds: ["react", "nextjs", "javascript", "python"],
  },
  {
    id: "aws",
    name: "AWS & Data",
    color: "#C2410C",
    headerBg: "bg-orange-100/90 dark:bg-orange-950/60 border-orange-300 dark:border-orange-800",
    badgeColor: "text-orange-950 dark:text-orange-200",
    coreIds: ["aws-amplify", "aws-cloudfront", "aws-acm", "aws-rds"],
  },
  {
    id: "delivery",
    name: "Delivery & DevOps",
    color: "#DC2626",
    headerBg: "bg-rose-100/90 dark:bg-rose-950/60 border-rose-300 dark:border-rose-800",
    badgeColor: "text-rose-950 dark:text-rose-200",
    coreIds: ["git", "github-actions", "postman", "agile-scrum"],
  },
];

export function SkillsMatrix() {
  const [showAll, setShowAll] = useState(false);
  const [activeTooltipTech, setActiveTooltipTech] = useState<TechItem | null>(null);
  const [isShaking, setIsShaking] = useState(false);

  const totalTechCount = STACK_DATA.length;

  return (
    <section id="skills" className="space-y-3 pt-3">
      {/* Title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--ink)]">
            Skills matrix
          </h2>
          <p className="text-xs text-[var(--muted)]">
            Core production competencies grouped into 6 engineering domains.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-1 text-[var(--indigo)] hover:underline cursor-pointer font-semibold"
          >
            <span>{showAll ? "Show core (24)" : `Show all (${totalTechCount})`}</span>
            {showAll ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => setIsShaking(!isShaking)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--hairline)] bg-[var(--surface-tint-solid)] hover:border-amber-400 text-[var(--ink)] transition-colors cursor-pointer text-xs shadow-2xs"
            title="Tilt tiles"
          >
            <RefreshCw className={`w-3 h-3 text-amber-500 ${isShaking ? "animate-spin" : ""}`} />
            <span>{isShaking ? "Reset" : "Shake"}</span>
          </button>
        </div>
      </div>

      {/* 6-Column Structured Grid on Base Glass Panel */}
      <GlassPanel tier="base" radius="panel" className="p-4 sm:p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3.5">
          {SIX_COLUMNS.map((col) => {
            const items = showAll
              ? STACK_DATA.filter((t) => t.group === col.id)
              : STACK_DATA.filter((t) => col.coreIds.includes(t.id));

            return (
              <div key={col.id} className="space-y-2">
                {/* Column Header */}
                <div className={`p-2 rounded-[14px] border flex items-center justify-between shadow-2xs ${col.headerBg}`}>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: col.color }} />
                    <span className={`text-xs font-bold ${col.badgeColor}`}>
                      {col.name}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-semibold opacity-80">
                    {items.length}
                  </span>
                </div>

                {/* Column Items */}
                <div className="space-y-1.5">
                  {items.map((tech) => {
                    const isHovered = activeTooltipTech?.id === tech.id;
                    const randomTilt = isShaking ? ((tech.name.length * 5) % 15) - 7 : 0;
                    const randomY = isShaking ? ((tech.name.length * 3) % 12) : 0;

                    return (
                      <div
                        key={tech.id}
                        className="relative group"
                        onMouseEnter={() => setActiveTooltipTech(tech)}
                        onMouseLeave={() => setActiveTooltipTech(null)}
                      >
                        <motion.div
                          animate={{
                            rotate: randomTilt,
                            y: randomY,
                          }}
                          whileHover={{ y: -2 }}
                          transition={{ duration: 0.15, ease: "easeOut" }}
                          className="p-2 rounded-[14px] border border-[var(--hairline)] bg-[var(--surface-tint-solid)] hover:border-slate-400 flex items-center gap-2 transition-colors cursor-pointer select-none shadow-2xs"
                          style={{
                            borderLeftWidth: "3px",
                            borderLeftColor: col.color,
                          }}
                        >
                          <TechGlyph techId={tech.id} color={col.color} size={15} />
                          <div className="flex flex-col min-w-0">
                            <span className="text-xs font-medium text-[var(--ink)] truncate">
                              {tech.name}
                            </span>
                            <span className="text-[9px] font-mono text-[var(--muted)] uppercase tracking-wider">
                              {tech.monogram}
                            </span>
                          </div>
                        </motion.div>

                        {/* High-Contrast Floating Tooltip */}
                        {isHovered && (
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 rounded-[12px] bg-[#141210] dark:bg-[#1C1814] text-[#FDFBF7] shadow-2xl z-50 pointer-events-none text-left space-y-1.5 border border-white/20">
                            <div className="flex items-center justify-between text-[11px] font-mono border-b border-white/15 pb-1">
                              <span className="font-bold text-white">{tech.name}</span>
                              <span className="font-semibold text-amber-400">{col.name}</span>
                            </div>
                            <p className="text-[12px] font-sans leading-relaxed text-[#DCD4CA]">
                              {tech.note}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </GlassPanel>
    </section>
  );
}
