"use client";

import { useState } from "react";
import { SKILLS_TREE } from "@/lib/data";
import { Search, ChevronRight, Check } from "lucide-react";
import { usePortfolioStore } from "@/lib/store";

export default function SkillsSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState(SKILLS_TREE[0].id);
  const { selectedSkill, setSelectedSkill } = usePortfolioStore();

  const currentCategory = SKILLS_TREE.find((c) => c.id === activeCategory) || SKILLS_TREE[0];

  const filteredItems = currentCategory.items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.context.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="skills" className="py-20 lg:py-28 border-b border-hairline">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-12 gap-8 lg:gap-12">
        
        {/* Header */}
        <div className="col-span-12 space-y-2">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">03 / SKILLS MATRIX</span>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--ink)]">Technical Competencies</h2>
          <p className="text-sm font-mono text-[var(--muted)] max-w-xl">
            Categorized by daily production engineering, platform frameworks, and API integrations.
          </p>
        </div>

        {/* Left Column: Salesforce Setup-style Category Tree & Search */}
        <div className="col-span-12 lg:col-span-4 space-y-4">
          
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[var(--muted)] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Quick Find skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[var(--surface)] text-[var(--ink)] border border-hairline rounded-sm pl-8 pr-3 py-2 text-xs font-mono placeholder-[var(--muted)] focus:outline-none focus:border-[var(--ink)]"
            />
          </div>

          <div className="border border-hairline divide-y divide-hairline rounded-sm overflow-hidden font-mono text-xs">
            {SKILLS_TREE.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  setSelectedSkill(category.items[0]?.name || null);
                }}
                className={`w-full p-3 text-left flex items-center justify-between transition-colors ${
                  activeCategory === category.id
                    ? "bg-[var(--surface)] font-bold text-[var(--ink)] border-l-2 border-l-[var(--ink)]"
                    : "hover:bg-[var(--surface)]/50 text-[var(--muted)]"
                }`}
              >
                <span>{category.category}</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>
            ))}
          </div>

        </div>

        {/* Right Column: Skill Detail Inspector Panel */}
        <div className="col-span-12 lg:col-span-8">
          <div className="border border-hairline rounded-sm p-6 bg-[var(--surface)] space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-hairline">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--muted)]">Active Module</span>
                <h3 className="text-lg font-bold text-[var(--ink)]">{currentCategory.category}</h3>
              </div>
              <span className="text-xs font-mono text-[var(--muted)]">{filteredItems.length} Entities</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredItems.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedSkill(item.name)}
                  className={`p-3.5 border rounded-sm transition-all cursor-pointer ${
                    selectedSkill === item.name
                      ? "border-[var(--ink)] bg-[var(--bg)] shadow-xs"
                      : "border-hairline hover:border-[var(--muted)]"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="font-bold text-[var(--ink)]">{item.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-xs border border-hairline text-[var(--muted)] font-mono">
                      {item.tier}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--muted)] leading-relaxed">{item.context}</p>
                </div>
              ))}
            </div>

            <div className="pt-2 text-[11px] font-mono text-[var(--muted)] flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-[var(--ink)]" />
              <span>Grounded in verified production engineering at ASSPL. Zero arbitrary proficiency bars.</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
