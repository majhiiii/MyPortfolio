"use client";

import React, { useState } from "react";
import { usePortfolioStore } from "@/lib/store";
import { Search, FileText, Menu, X } from "lucide-react";
import { Magnetic } from "@/components/ui/Magnetic";
import { motion, AnimatePresence } from "framer-motion";

const PRIMARY_LINKS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "playground", label: "Playground" },
  { id: "contact", label: "Contact" },
];

export default function Navigation() {
  const setCommandPaletteOpen = usePortfolioStore((s) => s.setCommandPaletteOpen);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[var(--bg)]/90 backdrop-blur-md border-b border-hairline transition-colors duration-200">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-18 flex items-center justify-between">
        
        {/* Left: Brand Monogram & Identity */}
        <Magnetic strength={0.25} radius={60}>
          <a href="#hero" className="flex items-center gap-3.5 group py-2" aria-label="Rakesh Majhi Home">
            <div className="w-8 h-8 rounded-full border border-hairline flex items-center justify-center font-mono text-xs font-medium text-[var(--ink)] group-hover:bg-[var(--ink)] group-hover:text-[var(--bg)] transition-all duration-300">
              RM
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg tracking-tight font-medium text-[var(--ink)] leading-none group-hover:italic transition-all">
                Rakesh Majhi
              </span>
              <span className="text-[11px] font-mono text-[var(--muted)] tracking-wider mt-0.5">
                Software Engineer &bull; Multi-Stack Builder
              </span>
            </div>
          </a>
        </Magnetic>

        {/* Center: 5 Clean Editorial Nav Items */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-3 text-sm font-sans" aria-label="Primary Navigation">
          {PRIMARY_LINKS.map((link) => (
            <Magnetic key={link.id} strength={0.3} radius={50}>
              <a
                href={`#${link.id}`}
                className="relative px-3.5 py-1.5 text-[var(--muted)] hover:text-[var(--ink)] transition-colors group text-sm font-normal"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-3.5 right-3.5 h-[1.5px] bg-[var(--accent)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-250 ease-out" />
              </a>
            </Magnetic>
          ))}
        </nav>

        {/* Right Controls: Resume & ⌘K trigger */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Magnetic strength={0.2} radius={60}>
            <a
              href="mailto:rakeshmajhi.connect@gmail.com?subject=Resume%20Request%20-%20Rakesh%20Majhi"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-[var(--muted)] hover:text-[var(--ink)] border border-hairline rounded-full hover:border-[var(--ink)] transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>
          </Magnetic>

          <Magnetic strength={0.25} radius={60}>
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-hairline text-xs font-mono text-[var(--muted)] hover:text-[var(--ink)] hover:border-[var(--accent)] transition-colors bg-[var(--surface)]/50"
              aria-label="Open command palette"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="px-1.5 py-0.5 text-[10px] bg-[var(--bg)] border border-hairline rounded font-mono text-[var(--muted)]">⌘K</kbd>
            </button>
          </Magnetic>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[var(--ink)] border border-hairline rounded-full"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden border-b border-hairline bg-[var(--surface)] px-6 py-6 overflow-hidden"
          >
            <div className="flex flex-col space-y-4">
              {PRIMARY_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-serif text-[var(--ink)] hover:text-[var(--accent)] transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <span className="text-xs font-mono text-[var(--muted)]">&rarr;</span>
                </a>
              ))}
              <div className="pt-4 border-t border-hairline flex items-center justify-between">
                <a
                  href="mailto:rakeshmajhi.connect@gmail.com?subject=Resume%20Request%20-%20Rakesh%20Majhi"
                  className="flex items-center gap-2 text-xs font-mono text-[var(--muted)]"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Request Full CV</span>
                </a>
                <span className="text-[10px] font-mono text-[var(--muted)]">ASSPL Bhubaneswar</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
