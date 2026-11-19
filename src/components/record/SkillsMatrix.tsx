"use client";

import React, { useState, useRef, lazy, Suspense } from "react";
import { STACK_DATA, SKILL_GROUPS, TechItem, SkillGroupId } from "@/data/stack";
import { TechGlyph } from "@/components/ui/TechGlyph";
import { RefreshCw, ChevronDown, ChevronUp, Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// 6 Structured Columns per Brief
const SIX_COLUMNS: { id: SkillGroupId; name: string; color: string; coreIds: string[] }[] = [
  {
    id: "salesforce",
    name: "Salesforce Platform",
    color: "#1F2A5C",
    coreIds: ["apex", "lwc", "b2b-commerce", "soql"],
  },
  {
    id: "agentforce",
    name: "Agentforce & AI",
    color: "#6B4EFF",
    coreIds: ["agentforce", "agent-builder", "invocable-apex", "einstein-bots"],
  },
  {
    id: "integrations",
    name: "Integrations & APIs",
    color: "#00A38C",
    coreIds: ["rest-api", "oauth-pkce", "stripe", "quickbooks"],
  },
  {
    id: "fullstack",
    name: "Full-Stack Web",
    color: "#E8A317",
    coreIds: ["react", "nextjs", "javascript", "python"],
  },
  {
    id: "aws",
    name: "AWS & Data",
    color: "#8A4B2A",
    coreIds: ["aws-amplify", "aws-cloudfront", "aws-acm", "aws-rds"],
  },
  {
    id: "delivery",
    name: "Delivery & DevOps",
    color: "#C8372D",
    coreIds: ["git", "github-actions", "postman", "agile-scrum"],
  },
];

export function SkillsMatrix() {
  const [showAll, setShowAll] = useState(false);
  const [activeTooltipTech, setActiveTooltipTech] = useState<TechItem | null>(null);
  const [isShaking, setIsShaking] = useState(false);

  const totalTechCount = STACK_DATA.length;

  return (
    <section id="skills" className="space-y-4 pt-10 pb-12">
      {/* Title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--ink)]">
            Skills
          </h2>
          <p className="text-xs sm:text-sm text-[var(--muted)]">
            Core production competencies across 6 technical domains.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-1.5 text-[var(--indigo)] hover:underline cursor-pointer font-medium"
          >
            <span>{showAll ? "Show core (24)" : `Show all (${totalTechCount})`}</span>
            {showAll ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => setIsShaking(!isShaking)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-hairline bg-[var(--surface)] hover:border-[var(--turmeric)] text-[var(--ink)] transition-colors cursor-pointer"
            title="Physics interaction"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[var(--turmeric)] ${isShaking ? "animate-spin" : ""}`} />
            <span>{isShaking ? "Reset tiles" : "Shake"}</span>
          </button>
        </div>
      </div>

      {/* 6-Column Structured Grid */}
      <div className="rounded-lg bg-[var(--surface)] border border-hairline p-5 sm:p-6 shadow-2xs transition-colors">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5">
          {SIX_COLUMNS.map((col) => {
            // Get core items or all items for this group
            const items = showAll
              ? STACK_DATA.filter((t) => t.group === col.id)
              : STACK_DATA.filter((t) => col.coreIds.includes(t.id));

            return (
              <div key={col.id} className="space-y-3">
                {/* Column Header */}
                <div className="pb-2 border-b border-hairline flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: col.color }} />
                    <span className="text-xs font-semibold text-[var(--ink)]">
                      {col.name}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[var(--muted)]">
                    {items.length}
                  </span>
                </div>

                {/* Column Items */}
                <div className="space-y-2">
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
                          transition={{ duration: 0.18, ease: "easeOut" }}
                          className="p-2.5 rounded-md border border-hairline bg-[var(--bg)] hover:bg-[var(--surface)] hover:border-[var(--ink)] flex items-center gap-2.5 transition-colors cursor-pointer select-none"
                          style={{
                            borderLeftWidth: "3px",
                            borderLeftColor: col.color,
                          }}
                        >
                          <TechGlyph techId={tech.id} color={col.color} size={16} />
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
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-2.5 rounded-md bg-[var(--ink)] text-[var(--bg)] shadow-xl z-50 pointer-events-none text-left space-y-1">
                            <div className="flex items-center justify-between text-[10px] font-mono border-b border-white/20 pb-1">
                              <span className="font-semibold text-white">{tech.name}</span>
                              <span style={{ color: col.color }}>{col.name}</span>
                            </div>
                            <p className="text-[11px] font-sans leading-relaxed text-white/90">
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
