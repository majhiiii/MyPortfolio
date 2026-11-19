"use client";

import { useState } from "react";
import { SKILLS_TREE } from "@/lib/data";
import { Search, ArrowUpRight } from "lucide-react";
import { usePortfolioStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";

export default function SkillsSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState(SKILLS_TREE[0].id);
  const { setSelectedSkill } = usePortfolioStore();

  const currentCategory = SKILLS_TREE.find((c) => c.id === activeCategory) || SKILLS_TREE[0];

  const filteredItems = currentCategory.items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.context.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="skills" className="py-24 lg:py-36 border-b border-hairline bg-[var(--bg)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-12 gap-8 lg:gap-16">
        
        {/* Section Header */}
        <div className="col-span-12 space-y-3">
          <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[var(--muted)]">
            <span>03 / SKILLS MATRIX</span>
            <span>&bull;</span>
            <span>ASSPL Technical Arsenal</span>
          </div>
          <h2 className="font-serif text-[clamp(2.5rem,5.5vw,5rem)] font-normal tracking-tight text-[var(--ink)] leading-[0.95]">
            Architectural <span className="italic">Competencies</span>
          </h2>
          <p className="text-base font-sans text-[var(--muted)] max-w-2xl">
            Engineered across 3 enterprise client tracks: daily production Apex patterns, Lightning Web Components, and asynchronous integration pipelines.
          </p>
        </div>

        {/* Left Column: Large Group Names as Vertical Editorial List */}
        <div className="col-span-12 lg:col-span-5 space-y-6">
          
          {/* Quick Find Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-[var(--muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search competencies or patterns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[var(--surface)] text-[var(--ink)] border border-hairline rounded-full pl-10 pr-4 py-2.5 text-xs font-mono placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
            />
          </div>

          {/* Group Names in Big Expressive Serif Type */}
          <div className="space-y-2 pt-2" data-cursor="explore">
            {SKILLS_TREE.map((category, idx) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id);
                    setSelectedSkill(category.items[0]?.name || null);
                  }}
                  onMouseEnter={() => setSelectedSkill(category.items[0]?.name || null)}
                  className={`w-full text-left py-3.5 px-4 rounded-sm transition-all duration-200 flex items-baseline justify-between group ${
                    isActive
                      ? "bg-[var(--surface)] text-[var(--ink)] border-l-2 border-[var(--accent)]"
                      : "text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--surface)]/50"
                  }`}
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-[var(--muted)] opacity-60">
                      0{idx + 1}
                    </span>
                    <span
                      className={`font-serif text-2xl sm:text-3xl transition-transform ${
                        isActive ? "font-normal italic translate-x-1" : "font-normal"
                      }`}
                    >
                      {category.category}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[var(--muted)]">
                    {category.items.length}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="p-4 border border-hairline rounded-sm bg-[var(--surface)]/50 text-xs font-mono text-[var(--muted)] space-y-1 hidden sm:block">
            <div className="text-[var(--ink)] font-medium">3D Orbit Sync</div>
            <p className="text-[11px] leading-relaxed">
              Hovering skill clusters dynamically focuses the 3D particle cloud nodes.
            </p>
          </div>

        </div>

        {/* Right Column: Active Group Skills Staggered List with "Where I used it" */}
        <div className="col-span-12 lg:col-span-7">
          <div className="space-y-6">
            
            <div className="flex items-baseline justify-between pb-3 border-b border-hairline">
              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--muted)]">
                  Active Domain
                </span>
                <h3 className="font-serif text-2xl font-normal text-[var(--ink)]">
                  {currentCategory.category}
                </h3>
              </div>
              <span className="text-xs font-mono text-[var(--muted)]">
                {filteredItems.length} Verified Entries
              </span>
            </div>

            {/* Staggered Skills List with Animated Reflow */}
            <motion.div layout className="divide-y divide-hairline">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, idx) => (
                  <motion.div
                    key={item.name}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25, delay: idx * 0.03 }}
                    className="py-4 px-2 hover:bg-[var(--surface)]/60 transition-colors rounded-sm group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="font-serif text-xl font-medium text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
                          {item.name}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded-full border border-hairline text-[var(--muted)] self-start sm:self-auto bg-[var(--surface)]">
                        {item.tier}
                      </span>
                    </div>

                    {/* Where I used it at ASSPL */}
                    <div className="mt-1.5 pl-3.5 border-l border-hairline sm:border-0 sm:pl-0">
                      <span className="text-xs font-mono text-[var(--muted)] uppercase tracking-wider block sm:inline mr-2">
                        Where I used it:
                      </span>
                      <span className="text-xs font-sans text-[var(--muted)] leading-relaxed">
                        {item.context}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}
