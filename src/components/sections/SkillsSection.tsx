"use client";

import { useState } from "react";
import { STACK_DATA, SKILL_GROUPS, SkillGroupId, TechItem } from "@/data/stack";
import { PROJECTS_DATA } from "@/data/projects";
import { Search, Sparkles, Filter, CheckCircle2, ArrowRight, LayoutGrid, Rows } from "lucide-react";
import { TechIcon } from "@/components/ui/TechIcon";
import { usePortfolioStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";

export default function SkillsSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeGroup, setActiveGroup] = useState<SkillGroupId | "all">("all");
  const [filterMode, setFilterMode] = useState<"all" | "daily" | "projects">("all");
  const [viewMode, setViewMode] = useState<"cartridges" | "compact">("cartridges");
  const [selectedTechId, setSelectedTechId] = useState<string | null>(null);

  const setActiveAccentColor = usePortfolioStore((s) => s.setActiveAccentColor);

  const selectedTech = STACK_DATA.find((t) => t.id === selectedTechId) || null;

  const linkedProjects = selectedTech
    ? PROJECTS_DATA.filter((p) => selectedTech.usedIn.includes(p.id))
    : [];

  const filteredItems = STACK_DATA.filter((item) => {
    const matchesGroup = activeGroup === "all" || item.group === activeGroup;
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.note.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.monogram.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterMode === "all"
        ? true
        : filterMode === "daily"
        ? item.dailyUse === true
        : item.usedIn.length > 0;

    return matchesGroup && matchesSearch && matchesFilter;
  });

  const handleGroupSelect = (groupKey: SkillGroupId | "all") => {
    setActiveGroup(groupKey);
    if (groupKey !== "all") {
      setActiveAccentColor(SKILL_GROUPS[groupKey].color);
    }
  };

  return (
    <section id="skills" className="py-24 lg:py-36 border-b border-hairline bg-[var(--bg)] transition-colors">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[var(--muted)]">
            <span>03 / TECH &amp; TOOLS</span>
          </div>
          <h2 className="font-serif text-[clamp(2.75rem,6vw,5.5rem)] font-normal tracking-tight text-[var(--ink)] leading-[0.95]">
            Skills &amp; <span className="italic">Stack</span>
          </h2>
          <p className="text-base font-sans text-[var(--muted)] max-w-2xl leading-relaxed">
            A versatile toolkit across full-stack web development, cloud backends, autonomous AI agents, and enterprise platforms. Filter by domain or search to inspect real-world deliverables.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-2 border-b border-hairline pb-6">
          
          {/* Quick Find Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[var(--muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search technologies, monograms or deliverables..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[var(--surface)] text-[var(--ink)] border border-hairline rounded-full pl-10 pr-4 py-2.5 text-xs font-mono placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
            />
          </div>

          {/* Daily / Project Filters & View Mode */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 text-xs font-mono bg-[var(--surface)] p-1 rounded-full border border-hairline shrink-0">
              <button
                onClick={() => setFilterMode("all")}
                className={`px-3 py-1.5 rounded-full transition-colors ${
                  filterMode === "all" ? "bg-[var(--ink)] text-[var(--bg)] font-semibold" : "text-[var(--muted)] hover:text-[var(--ink)]"
                }`}
              >
                All ({STACK_DATA.length})
              </button>
              <button
                onClick={() => setFilterMode("daily")}
                className={`px-3 py-1.5 rounded-full transition-colors ${
                  filterMode === "daily" ? "bg-[var(--ink)] text-[var(--bg)] font-semibold" : "text-[var(--muted)] hover:text-[var(--ink)]"
                }`}
              >
                Daily Core
              </button>
              <button
                onClick={() => setFilterMode("projects")}
                className={`px-3 py-1.5 rounded-full transition-colors ${
                  filterMode === "projects" ? "bg-[var(--ink)] text-[var(--bg)] font-semibold" : "text-[var(--muted)] hover:text-[var(--ink)]"
                }`}
              >
                In Projects
              </button>
            </div>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center gap-1 text-xs font-mono bg-[var(--surface)] p-1 rounded-full border border-hairline shrink-0">
              <button
                onClick={() => setViewMode("cartridges")}
                className={`p-1.5 rounded-full transition-colors ${
                  viewMode === "cartridges" ? "bg-[var(--ink)] text-[var(--bg)]" : "text-[var(--muted)]"
                }`}
                title="Cartridge View"
              >
                <Rows className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode("compact")}
                className={`p-1.5 rounded-full transition-colors ${
                  viewMode === "compact" ? "bg-[var(--ink)] text-[var(--bg)]" : "text-[var(--muted)]"
                }`}
                title="Compact Grid"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Grid Layout: Left Categories + Right Icons Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Color-coded Skill Groups */}
          <div className="lg:col-span-4 space-y-2">
            <div className="text-xs font-mono uppercase tracking-widest text-[var(--muted)] mb-3">
              Skill Domains
            </div>

            <button
              onClick={() => handleGroupSelect("all")}
              className={`w-full text-left py-3 px-3.5 rounded-sm transition-all flex items-center justify-between text-xs font-mono ${
                activeGroup === "all"
                  ? "bg-[var(--surface)] text-[var(--ink)] font-bold border-l-3 border-[var(--ink)]"
                  : "text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--surface)]/50"
              }`}
            >
              <span>All Stack Domains</span>
              <span>{STACK_DATA.length}</span>
            </button>

            {Object.values(SKILL_GROUPS).map((group) => {
              const isActive = activeGroup === group.id;
              const count = STACK_DATA.filter((s) => s.group === group.id).length;

              return (
                <button
                  key={group.id}
                  onClick={() => handleGroupSelect(group.id)}
                  className={`w-full text-left py-3 px-3.5 rounded-sm transition-all flex items-center justify-between group ${
                    isActive
                      ? "bg-[var(--surface)] text-[var(--ink)] shadow-2xs font-semibold"
                      : "text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--surface)]/50"
                  }`}
                  style={{
                    borderLeft: isActive ? `3px solid ${group.color}` : "3px solid transparent",
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: group.color }} />
                    <span className="font-sans text-xs">{group.name}</span>
                  </div>
                  <span className="text-[11px] font-mono text-[var(--muted)]">{count}</span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Icon Grid with FLIP Reflow Animation */}
          <div className="lg:col-span-8 space-y-6">
            
            <div className="flex items-center justify-between text-xs font-mono text-[var(--muted)] pb-2 border-b border-hairline">
              <span>{filteredItems.length} Technologies Active</span>
              <span>Click any card to inspect linked projects</span>
            </div>

            {/* Cartridges or Compact Layout */}
            {viewMode === "cartridges" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredItems.map((tech) => (
                  <TechIcon
                    key={tech.id}
                    item={tech}
                    variant="cartridge"
                    className="w-full"
                    onClick={() => {
                      setSelectedTechId(tech.id === selectedTechId ? null : tech.id);
                      setActiveAccentColor(tech.color);
                    }}
                  />
                ))}
              </div>
            ) : (
              <motion.div layout className="flex flex-wrap gap-2.5 sm:gap-3">
                <AnimatePresence>
                  {filteredItems.map((tech) => (
                    <motion.div
                      key={tech.id}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <TechIcon
                        item={tech}
                        size="md"
                        variant="compact"
                        onClick={() => {
                          setSelectedTechId(tech.id === selectedTechId ? null : tech.id);
                          setActiveAccentColor(tech.color);
                        }}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Connected Project Line / Drawer */}
            <AnimatePresence>
              {selectedTech && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="p-5 rounded-md bg-[var(--surface)] border border-hairline space-y-3 mt-4 shadow-sm"
                  style={{
                    borderLeft: `4px solid ${selectedTech.color}`,
                  }}
                >
                  <div className="flex items-center justify-between pb-2 border-b border-hairline">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="px-2 py-0.5 rounded-xs text-[10px] font-mono font-bold text-white uppercase"
                        style={{ backgroundColor: selectedTech.color }}
                      >
                        {selectedTech.monogram}
                      </span>
                      <h4 className="font-serif text-xl font-medium text-[var(--ink)]">
                        {selectedTech.name} &bull; Production Connections
                      </h4>
                    </div>
                    <span className="text-xs font-mono text-[var(--muted)]">
                      {linkedProjects.length} Verified Production Project{linkedProjects.length > 1 ? "s" : ""}
                    </span>
                  </div>

                  <p className="text-xs font-sans text-[var(--muted)] leading-relaxed">
                    {selectedTech.note}
                  </p>

                  {/* Connected Projects Badges */}
                  <div className="pt-2 flex flex-wrap gap-2">
                    {linkedProjects.map((p) => (
                      <a
                        key={p.id}
                        href="#projects"
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-hairline bg-[var(--bg)] hover:border-[var(--ink)] transition-colors text-xs font-mono text-[var(--ink)]"
                      >
                        <span className="text-[10px] text-[var(--accent)] font-bold">{p.number}</span>
                        <span>{p.title}</span>
                        <ArrowRight className="w-3 h-3 text-[var(--muted)]" />
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
