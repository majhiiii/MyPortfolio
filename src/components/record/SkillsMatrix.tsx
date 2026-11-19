"use client";

import React, { useState } from "react";
import { STACK_DATA, TechItem, SkillGroupId } from "@/data/stack";
import { TechGlyph } from "@/components/ui/TechGlyph";
import { RefreshCw, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
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
    headerBg: "bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900",
    badgeColor: "text-blue-700 dark:text-blue-300",
    coreIds: ["apex", "lwc", "b2b-commerce", "soql"],
  },
  {
    id: "agentforce",
    name: "Agentforce & AI",
    color: "#7C3AED",
    headerBg: "bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-900",
    badgeColor: "text-purple-700 dark:text-purple-300",
    coreIds: ["agentforce", "agent-builder", "invocable-apex", "einstein-bots"],
  },
  {
    id: "integrations",
    name: "Integrations & APIs",
    color: "#00A38C",
    headerBg: "bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-900",
    badgeColor: "text-teal-700 dark:text-teal-300",
    coreIds: ["rest-api", "oauth-pkce", "stripe", "quickbooks"],
  },
  {
    id: "fullstack",
    name: "Full-Stack Web",
    color: "#F59E0B",
    headerBg: "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900",
    badgeColor: "text-amber-700 dark:text-amber-300",
    coreIds: ["react", "nextjs", "javascript", "python"],
  },
  {
    id: "aws",
    name: "AWS & Data",
    color: "#EA580C",
    headerBg: "bg-orange-50 dark:bg-orange-950/40 border-orange-200 dark:border-orange-900",
    badgeColor: "text-orange-700 dark:text-orange-300",
    coreIds: ["aws-amplify", "aws-cloudfront", "aws-acm", "aws-rds"],
  },
  {
    id: "delivery",
    name: "Delivery & DevOps",
    color: "#EF4444",
    headerBg: "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900",
    badgeColor: "text-rose-700 dark:text-rose-300",
    coreIds: ["git", "github-actions", "postman", "agile-scrum"],
  },
];

export function SkillsMatrix() {
  const [showAll, setShowAll] = useState(false);
  const [activeTooltipTech, setActiveTooltipTech] = useState<TechItem | null>(null);
  const [isShaking, setIsShaking] = useState(false);

  const totalTechCount = STACK_DATA.length;

  return (
    <section id="skills" className="space-y-3 pt-4">
      {/* Title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--ink)]">
            Skills Matrix
          </h2>
          <p className="text-xs text-[var(--muted)]">
            Core production competencies grouped into 6 engineering domains.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-1 text-[#0176D3] hover:underline cursor-pointer font-semibold"
          >
            <span>{showAll ? "Show core (24)" : `Show all (${totalTechCount})`}</span>
            {showAll ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => setIsShaking(!isShaking)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-hairline bg-[var(--surface)] hover:border-amber-400 text-[var(--ink)] transition-colors cursor-pointer text-xs"
            title="Tilt tiles"
          >
            <RefreshCw className={`w-3 h-3 text-amber-500 ${isShaking ? "animate-spin" : ""}`} />
            <span>{isShaking ? "Reset" : "Shake"}</span>
          </button>
        </div>
      </div>

      {/* 6-Column Structured Grid - Colorful, Tight & Compact */}
      <div className="rounded-lg bg-[var(--surface)] border border-hairline p-4 sm:p-5 shadow-xs transition-colors">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3.5">
          {SIX_COLUMNS.map((col) => {
            const items = showAll
              ? STACK_DATA.filter((t) => t.group === col.id)
              : STACK_DATA.filter((t) => col.coreIds.includes(t.id));

            return (
              <div key={col.id} className="space-y-2">
                {/* Column Header with colorful pill */}
                <div className={`p-2 rounded-md border flex items-center justify-between ${col.headerBg}`}>
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
                          className="p-2 rounded-md border border-hairline bg-[var(--surface-alt)] hover:bg-[var(--surface)] hover:border-slate-400 flex items-center gap-2 transition-colors cursor-pointer select-none"
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

                        {/* Plain Tooltip with "where I used it" */}
                        {isHovered && (
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-2 rounded-md bg-[#0F172A] text-white shadow-xl z-50 pointer-events-none text-left space-y-1 border border-slate-700">
                            <div className="flex items-center justify-between text-[10px] font-mono border-b border-slate-700 pb-1">
                              <span className="font-semibold text-white">{tech.name}</span>
                              <span style={{ color: col.color }}>{col.name}</span>
                            </div>
                            <p className="text-[11px] font-sans leading-relaxed text-slate-200">
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
      </div>
    </section>
  );
}
