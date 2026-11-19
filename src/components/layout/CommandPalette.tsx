"use client";

import { useEffect } from "react";
import { Command } from "cmdk";
import { usePortfolioStore } from "@/lib/store";
import { Search, FolderGit2, Sparkles, Terminal, Code2, Sun, Moon, Mail, Cpu, Workflow } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CommandPalette() {
  const { isCommandPaletteOpen, setCommandPaletteOpen, theme, toggleTheme } = usePortfolioStore();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandPaletteOpen(!isCommandPaletteOpen);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [isCommandPaletteOpen, setCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const navigateTo = (id: string) => {
    setCommandPaletteOpen(false);
    const elem = document.getElementById(id);
    if (elem) elem.scrollIntoView({ behavior: "smooth" });
  };

  const copyEmail = () => {
    setCommandPaletteOpen(false);
    navigator.clipboard.writeText("rakeshmajhi.connect@gmail.com");
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-24 md:pt-32 p-4"
        onClick={() => setCommandPaletteOpen(false)}
        role="dialog"
        aria-modal="true"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-lg bg-[var(--surface)] border border-hairline rounded-lg shadow-2xl overflow-hidden font-sans text-sm"
          onClick={(e) => e.stopPropagation()}
        >
          <Command className="w-full">
            <div className="flex items-center px-4 py-3 border-b border-hairline">
              <Search className="w-4 h-4 text-[var(--muted)] mr-3 shrink-0" />
              <Command.Input
                placeholder="Jump to section or tool..."
                className="w-full bg-transparent text-[var(--ink)] placeholder-[var(--muted)] focus:outline-none text-sm font-sans"
                autoFocus
              />
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-[var(--muted)] bg-[var(--bg)] border border-hairline rounded">ESC</kbd>
            </div>

            <Command.List className="max-h-80 overflow-y-auto p-2 space-y-1">
              <Command.Empty className="p-6 text-center text-xs font-mono text-[var(--muted)]">
                No matching destination found.
              </Command.Empty>

              <Command.Group heading="Navigation" className="text-[10px] font-mono uppercase tracking-widest text-[var(--muted)] px-3 py-1.5">
                <Command.Item
                  onSelect={() => navigateTo("hero")}
                  className="flex items-center gap-3 px-3 py-2 rounded text-[var(--ink)] hover:bg-[var(--bg)] cursor-pointer text-xs transition-colors"
                >
                  <Terminal className="w-4 h-4 text-[var(--accent)]" />
                  <span className="font-serif text-sm">Hero / Overview</span>
                </Command.Item>
                <Command.Item
                  onSelect={() => navigateTo("about")}
                  className="flex items-center gap-3 px-3 py-2 rounded text-[var(--ink)] hover:bg-[var(--bg)] cursor-pointer text-xs transition-colors"
                >
                  <Code2 className="w-4 h-4 text-[var(--muted)]" />
                  <span className="font-serif text-sm">About Rakesh Majhi</span>
                </Command.Item>
                <Command.Item
                  onSelect={() => navigateTo("skills")}
                  className="flex items-center gap-3 px-3 py-2 rounded text-[var(--ink)] hover:bg-[var(--bg)] cursor-pointer text-xs transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-[var(--muted)]" />
                  <span className="font-serif text-sm">Skills Architecture</span>
                </Command.Item>
                <Command.Item
                  onSelect={() => navigateTo("experience")}
                  className="flex items-center gap-3 px-3 py-2 rounded text-[var(--ink)] hover:bg-[var(--bg)] cursor-pointer text-xs transition-colors"
                >
                  <Workflow className="w-4 h-4 text-[var(--muted)]" />
                  <span className="font-serif text-sm">Experience Rail &bull; ASSPL</span>
                </Command.Item>
                <Command.Item
                  onSelect={() => navigateTo("projects")}
                  className="flex items-center gap-3 px-3 py-2 rounded text-[var(--ink)] hover:bg-[var(--bg)] cursor-pointer text-xs transition-colors"
                >
                  <FolderGit2 className="w-4 h-4 text-[var(--muted)]" />
                  <span className="font-serif text-sm">Projects Index & Demos</span>
                </Command.Item>
                <Command.Item
                  onSelect={() => navigateTo("playground")}
                  className="flex items-center gap-3 px-3 py-2 rounded text-[var(--ink)] hover:bg-[var(--bg)] cursor-pointer text-xs transition-colors"
                >
                  <Cpu className="w-4 h-4 text-[var(--accent)]" />
                  <span className="font-serif text-sm">Developer Playground & Tools</span>
                </Command.Item>
                <Command.Item
                  onSelect={() => navigateTo("contact")}
                  className="flex items-center gap-3 px-3 py-2 rounded text-[var(--ink)] hover:bg-[var(--bg)] cursor-pointer text-xs transition-colors"
                >
                  <Mail className="w-4 h-4 text-[var(--muted)]" />
                  <span className="font-serif text-sm">Contact</span>
                </Command.Item>
              </Command.Group>

              <Command.Group heading="Actions" className="text-[10px] font-mono uppercase tracking-widest text-[var(--muted)] px-3 py-1.5 pt-2 border-t border-hairline">
                <Command.Item
                  onSelect={copyEmail}
                  className="flex items-center justify-between px-3 py-2 rounded text-[var(--ink)] hover:bg-[var(--bg)] cursor-pointer text-xs transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[var(--accent)]" />
                    <span>Copy Email to Clipboard</span>
                  </span>
                  <span className="font-mono text-[11px] text-[var(--muted)]">rakeshmajhi.connect@gmail.com</span>
                </Command.Item>
                <Command.Item
                  onSelect={() => {
                    toggleTheme();
                    setCommandPaletteOpen(false);
                  }}
                  className="flex items-center justify-between px-3 py-2 rounded text-[var(--ink)] hover:bg-[var(--bg)] cursor-pointer text-xs transition-colors"
                >
                  <span className="flex items-center gap-3">
                    {theme === "dark" ? <Sun className="w-4 h-4 text-[var(--signal-amber)]" /> : <Moon className="w-4 h-4 text-[var(--muted)]" />}
                    <span>Toggle Visual Theme</span>
                  </span>
                  <span className="font-mono text-[11px] text-[var(--muted)]">
                    {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
                  </span>
                </Command.Item>
              </Command.Group>
            </Command.List>

            <div className="p-2 border-t border-hairline bg-[var(--bg)]/40 flex items-center justify-between text-[11px] font-mono text-[var(--muted)] px-4">
              <span>Navigate with &uarr;&darr; &bull; Select with Enter</span>
              <span>ASSPL Engineering</span>
            </div>
          </Command>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
