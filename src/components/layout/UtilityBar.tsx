"use client";

import { usePortfolioStore } from "@/lib/store";
import { Sun, Moon, FileText, Mail, ArrowUp } from "lucide-react";

export default function UtilityBar() {
  const { theme, toggleTheme } = usePortfolioStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <aside
      aria-label="Utility Controls"
      className="fixed bottom-0 left-0 right-0 z-30 bg-[var(--surface)]/95 backdrop-blur-sm border-t border-hairline py-2 px-6 lg:px-12 transition-colors duration-200"
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between text-xs font-mono">
        
        {/* Left: Direct Mail trigger */}
        <div className="flex items-center gap-4">
          <a
            href="mailto:rakeshmajhi.connect@gmail.com"
            className="flex items-center gap-2 text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span className="hidden sm:inline">rakeshmajhi.connect@gmail.com</span>
            <span className="sm:hidden">Email</span>
          </a>
          <span className="hidden md:inline text-[var(--hairline)]">|</span>
          <span className="hidden md:inline text-[var(--muted)]">Bhubaneswar, India</span>
        </div>

        {/* Right: Theme Toggle, Resume, Top */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1.5 text-[var(--muted)] hover:text-[var(--ink)] transition-colors p-1"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <>
                <Sun className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Dark</span>
              </>
            )}
          </button>

          <span className="text-[var(--hairline)]">|</span>

          <a
            href="mailto:rakeshmajhi.connect@gmail.com?subject=Resume%20Request%20-%20Rakesh%20Majhi"
            className="flex items-center gap-1.5 text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>

          <span className="text-[var(--hairline)]">|</span>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Top</span>
          </button>
        </div>

      </div>
    </aside>
  );
}
