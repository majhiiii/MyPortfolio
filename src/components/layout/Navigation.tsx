"use client";

import { usePortfolioStore } from "@/lib/store";
import { Search } from "lucide-react";

const NAV_LINKS = [
  { id: "hero", label: "01 / Hero" },
  { id: "about", label: "02 / About" },
  { id: "skills", label: "03 / Skills" },
  { id: "experience", label: "04 / Experience" },
  { id: "projects", label: "05 / Projects" },
  { id: "playground", label: "06 / Playground" },
  { id: "metrics", label: "07 / Metrics" },
  { id: "contact", label: "08 / Contact" },
];

export default function Navigation() {
  const { setCommandPaletteOpen } = usePortfolioStore();

  return (
    <header className="sticky top-0 z-40 w-full bg-[var(--surface)]/90 backdrop-blur-sm border-b border-hairline transition-colors duration-200">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        
        {/* Left: Monogram and Title */}
        <a href="#hero" className="flex items-center gap-3.5 group">
          <div className="w-8 h-8 border border-hairline flex items-center justify-center font-mono text-xs font-semibold tracking-wider text-[var(--ink)] group-hover:border-[var(--accent)] transition-colors">
            RM
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm tracking-tight text-[var(--ink)]">Rakesh Majhi</span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--muted)]">Cloud Workspace</span>
          </div>
        </a>

        {/* Center/Right: Numbered Section Index */}
        <nav className="hidden xl:flex items-center space-x-6 text-xs font-mono" aria-label="Section Navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="text-[var(--muted)] hover:text-[var(--ink)] transition-colors py-1 hover:underline underline-offset-4"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Controls: Command Palette Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 border border-hairline rounded-sm text-xs font-mono text-[var(--muted)] hover:text-[var(--ink)] hover:border-[var(--accent)] transition-colors"
            aria-label="Open command palette"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden sm:inline px-1 py-0.5 text-[10px] bg-[var(--bg)] border border-hairline rounded text-[var(--muted)]">⌘K</kbd>
          </button>
        </div>

      </div>
    </header>
  );
}
