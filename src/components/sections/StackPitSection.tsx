"use client";

import React, { useState, useRef } from "react";
import { STACK_DATA, SKILL_GROUPS, TechItem, SkillGroupId } from "@/data/stack";
import { usePortfolioStore } from "@/lib/store";
import { RefreshCw, LayoutGrid, X, Layers, Sparkles, Move, ArrowRight, Grid3X3, Shuffle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TechGlyph } from "@/components/ui/TechGlyph";

export function StackPitSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedTech, setSelectedTech] = useState<TechItem | null>(null);
  const [activeGroupFilter, setActiveGroupFilter] = useState<SkillGroupId | "all">("all");
  const [scatterKey, setScatterKey] = useState(0);
  const [viewMode, setViewMode] = useState<"board" | "grid">("board");

  const setActiveAccentColor = usePortfolioStore((s) => s.setActiveAccentColor);

  const displayedTech = activeGroupFilter === "all"
    ? STACK_DATA
    : STACK_DATA.filter((t) => t.group === activeGroupFilter);

  const handleShuffle = () => {
    setScatterKey((prev) => prev + 1);
  };

  return (
    <section id="stack-pit" className="py-24 lg:py-36 border-b border-hairline bg-[#0C0C0E] text-[#F3F1EC] transition-colors relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#8E8E93]">
              <span>INTERACTIVE PLAYGROUND</span>
            </div>
            <h2 className="font-serif text-[clamp(2.75rem,6vw,5.5rem)] font-normal tracking-tight text-[#F3F1EC] leading-[0.95]">
              The Stack <span className="italic">Pit</span>
            </h2>
            <p className="text-sm font-sans text-[#8E8E93] max-w-2xl leading-relaxed">
              An interactive playground of technologies I build with. Drag tiles around, shuffle the board, or filter by domain. Click any card to inspect deliverables.
            </p>
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <button
              onClick={handleShuffle}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-white/20 text-[#F3F1EC] hover:bg-white/10 hover:border-white/40 transition-colors"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Scatter &amp; Reset</span>
            </button>

            <button
              onClick={() => setViewMode(viewMode === "board" ? "grid" : "board")}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-white/20 text-[#8E8E93] hover:text-white hover:border-white/40 transition-colors"
            >
              {viewMode === "board" ? (
                <>
                  <Grid3X3 className="w-3.5 h-3.5" />
                  <span>Structured Grid</span>
                </>
              ) : (
                <>
                  <Move className="w-3.5 h-3.5" />
                  <span>Interactive Surface</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Domain Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs font-mono">
          <button
            onClick={() => setActiveGroupFilter("all")}
            className={`px-3.5 py-1.5 rounded-full transition-colors shrink-0 ${
              activeGroupFilter === "all" ? "bg-white text-black font-semibold shadow-xs" : "bg-white/5 text-white/60 hover:text-white"
            }`}
          >
            All Domains ({STACK_DATA.length})
          </button>
          {Object.values(SKILL_GROUPS).map((group) => {
            const count = STACK_DATA.filter((s) => s.group === group.id).length;
            const isActive = activeGroupFilter === group.id;
            return (
              <button
                key={group.id}
                onClick={() => {
                  setActiveGroupFilter(group.id);
                  setActiveAccentColor(group.color);
                }}
                className={`px-3.5 py-1.5 rounded-full transition-colors shrink-0 flex items-center gap-2 ${
                  isActive ? "text-white font-semibold shadow-xs" : "bg-white/5 text-white/60 hover:text-white"
                }`}
                style={{
                  backgroundColor: isActive ? group.color : undefined,
                }}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: isActive ? "#FFF" : group.color }} />
                <span>{group.name}</span>
                <span className="opacity-60 text-[10px]">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Main Interactive Stage */}
        {viewMode === "board" ? (
          <div
            ref={containerRef}
            className="w-full min-h-[480px] rounded-lg bg-[#141417] border border-white/10 relative p-6 select-none overflow-hidden"
          >
            {/* Top Indicator */}
            <div className="flex items-center justify-between text-[11px] font-mono text-white/40 pb-4 mb-2 border-b border-white/5">
              <span className="flex items-center gap-1.5">
                <Move className="w-3.5 h-3.5 text-[#4C8DFF]" />
                Drag tiles around or click to inspect deliverables
              </span>
              <span>{displayedTech.length} Tiles Active</span>
            </div>

            {/* Draggable Tiles Canvas with GPU acceleration */}
            <div className="flex flex-wrap gap-3.5 py-2">
              {displayedTech.map((tech, idx) => {
                const group = SKILL_GROUPS[tech.group];
                const isSelected = selectedTech?.id === tech.id;
                
                // Subtle pseudo-random initial float offset on shuffle
                const randomRotate = ((idx * 7) % 11) - 5;

                return (
                  <motion.div
                    key={`${tech.id}-${scatterKey}`}
                    drag
                    dragConstraints={containerRef}
                    dragElastic={0.2}
                    dragTransition={{ bounceStiffness: 400, bounceDamping: 25 }}
                    initial={{ scale: 0.9, opacity: 0, rotate: randomRotate }}
                    animate={{ scale: 1, opacity: 1, rotate: randomRotate }}
                    whileHover={{ scale: 1.08, rotate: 0, zIndex: 40 }}
                    whileDrag={{ scale: 1.14, rotate: 0, zIndex: 50, cursor: "grabbing" }}
                    onClick={() => {
                      setSelectedTech(tech);
                      setActiveAccentColor(tech.color);
                    }}
                    className={`px-3.5 py-2.5 rounded-md border flex items-center gap-3 cursor-grab active:cursor-grabbing transition-colors duration-150 shadow-sm ${
                      isSelected
                        ? "bg-[#222228] border-white text-white shadow-lg"
                        : "bg-[#18181C] border-white/15 text-white/90 hover:border-white/40 hover:bg-[#1E1E23]"
                    }`}
                    style={{
                      borderLeft: `3px solid ${group.color}`,
                    }}
                  >
                    <TechGlyph techId={tech.id} color={group.color} size={18} />
                    <div className="flex flex-col text-left">
                      <span className="font-sans font-medium text-xs leading-tight text-white">
                        {tech.name}
                      </span>
                      <span className="text-[10px] font-mono text-white/50 leading-none mt-0.5">
                        {group.name}
                      </span>
                    </div>
                    <span
                      className="ml-1 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-xs"
                      style={{ backgroundColor: `${group.color}25`, color: group.color }}
                    >
                      {tech.monogram}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Structured Grid View */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pt-2">
            {displayedTech.map((tech) => {
              const group = SKILL_GROUPS[tech.group];
              const isSelected = selectedTech?.id === tech.id;
              return (
                <div
                  key={tech.id}
                  onClick={() => {
                    setSelectedTech(tech);
                    setActiveAccentColor(tech.color);
                  }}
                  className={`p-4 rounded-md border cursor-pointer transition-all space-y-2 group hover:translate-y-[-2px] ${
                    isSelected
                      ? "bg-[#222228] border-white shadow-md"
                      : "bg-[#141417] border-white/10 hover:border-white/30"
                  }`}
                  style={{
                    borderLeft: `3px solid ${group.color}`,
                  }}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <div className="flex items-center gap-2">
                      <TechGlyph techId={tech.id} color={group.color} size={18} />
                      <span className="font-semibold text-white group-hover:text-[#4C8DFF] transition-colors">
                        {tech.name}
                      </span>
                    </div>
                    <span
                      className="px-1.5 py-0.5 rounded-xs text-[9px] font-bold"
                      style={{ backgroundColor: `${group.color}25`, color: group.color }}
                    >
                      {tech.monogram}
                    </span>
                  </div>
                  <p className="text-[11px] font-sans text-white/70 line-clamp-2 leading-relaxed">
                    {tech.note}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* Selected Tech Deliverables Inspector */}
        <AnimatePresence>
          {selectedTech && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="p-6 rounded-md bg-[#161619] border border-white/20 space-y-4 shadow-xl"
              style={{
                borderLeft: `4px solid ${selectedTech.color}`,
              }}
            >
              <div className="flex items-start justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <TechGlyph techId={selectedTech.id} color={selectedTech.color} size={28} />
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className="px-2 py-0.5 rounded-xs text-[10px] font-mono font-bold text-white uppercase"
                        style={{ backgroundColor: selectedTech.color }}
                      >
                        {selectedTech.monogram}
                      </span>
                      <span className="text-xs font-mono uppercase tracking-wider text-[#8E8E93]">
                        {SKILL_GROUPS[selectedTech.group].name}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl text-white font-normal mt-0.5">
                      {selectedTech.name}
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTech(null)}
                  className="p-1.5 rounded-full border border-white/20 text-[#8E8E93] hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="text-sm font-sans text-white/90 leading-relaxed">
                <span className="text-xs font-mono uppercase tracking-wider text-[#8E8E93] block mb-1">
                  Production Engineering Context &bull; Tenure
                </span>
                {selectedTech.note}
              </div>

              <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#8E8E93]">
                <span>Linked Production Tracks: {selectedTech.usedIn.join(", ")}</span>
                <a href="#projects" className="text-[#4C8DFF] hover:underline flex items-center gap-1">
                  <span>View in Projects Index</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
