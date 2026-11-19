"use client";

import { useEffect } from "react";
import { Command } from "cmdk";
import { usePortfolioStore } from "@/lib/store";
import { Search, FolderGit2, Sparkles, Terminal, Code2, Sun, Moon, Mail } from "lucide-react";

export default function CommandPalette() {
  const { isCommandPaletteOpen, setCommandPaletteOpen, toggleTheme } = usePortfolioStore();

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
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={() => setCommandPaletteOpen(false)}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-lg bg-[var(--surface)] border border-hairline rounded-md shadow-2xl overflow-hidden font-mono text-xs"
        onClick={(e) => e.stopPropagation()}
      >
        <Command className="w-full">
          <div className="flex items-center px-4 border-b border-hairline">
            <Search className="w-4 h-4 text-[var(--muted)] mr-2 shrink-0" />
            <Command.Input
              placeholder="Type a command or section..."
              className="w-full py-3 bg-transparent text-[var(--ink)] placeholder-[var(--muted)] focus:outline-none text-xs font-mono"
              autoFocus
            />
          </div>

          <Command.List className="max-h-72 overflow-y-auto p-2 space-y-1">
            <Command.Empty className="p-4 text-center text-[var(--muted)]">
              No results found.
            </Command.Empty>

            <Command.Group heading="Navigation" className="text-[10px] uppercase tracking-wider text-[var(--muted)] px-2 py-1">
              <Command.Item
                onSelect={() => navigateTo("hero")}
                className="flex items-center gap-2.5 px-3 py-2 rounded text-[var(--ink)] hover:bg-[var(--bg)] cursor-pointer"
              >
                <Terminal className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>01 / Hero</span>
              </Command.Item>
              <Command.Item
                onSelect={() => navigateTo("about")}
                className="flex items-center gap-2.5 px-3 py-2 rounded text-[var(--ink)] hover:bg-[var(--bg)] cursor-pointer"
              >
                <Code2 className="w-3.5 h-3.5 text-[var(--muted)]" />
                <span>02 / About</span>
              </Command.Item>
              <Command.Item
                onSelect={() => navigateTo("skills")}
                className="flex items-center gap-2.5 px-3 py-2 rounded text-[var(--ink)] hover:bg-[var(--bg)] cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[var(--muted)]" />
                <span>03 / Skills Tree</span>
              </Command.Item>
              <Command.Item
                onSelect={() => navigateTo("projects")}
                className="flex items-center gap-2.5 px-3 py-2 rounded text-[var(--ink)] hover:bg-[var(--bg)] cursor-pointer"
              >
                <FolderGit2 className="w-3.5 h-3.5 text-[var(--muted)]" />
                <span>05 / Projects Index</span>
              </Command.Item>
              <Command.Item
                onSelect={() => navigateTo("playground")}
                className="flex items-center gap-2.5 px-3 py-2 rounded text-[var(--ink)] hover:bg-[var(--bg)] cursor-pointer"
              >
                <Terminal className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>06 / Developer Playground</span>
              </Command.Item>
              <Command.Item
                onSelect={() => navigateTo("contact")}
                className="flex items-center gap-2.5 px-3 py-2 rounded text-[var(--ink)] hover:bg-[var(--bg)] cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-[var(--muted)]" />
                <span>08 / Contact</span>
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Actions" className="text-[10px] uppercase tracking-wider text-[var(--muted)] px-2 py-1 pt-2 border-t border-hairline">
              <Command.Item
                onSelect={copyEmail}
                className="flex items-center gap-2.5 px-3 py-2 rounded text-[var(--ink)] hover:bg-[var(--bg)] cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>Copy Email (rakeshmajhi.connect@gmail.com)</span>
              </Command.Item>
              <Command.Item
                onSelect={() => { setCommandPaletteOpen(false); toggleTheme(); }}
                className="flex items-center gap-2.5 px-3 py-2 rounded text-[var(--ink)] hover:bg-[var(--bg)] cursor-pointer"
              >
                <Sun className="w-3.5 h-3.5 text-[var(--muted)]" />
                <span>Toggle Light / Dark Mode</span>
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
