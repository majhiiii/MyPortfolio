"use client";

import { usePortfolioStore } from "@/lib/store";
import { Sun, Moon, FileText, Mail, ArrowUp } from "lucide-react";
import { Magnetic } from "@/components/ui/Magnetic";

export default function UtilityBar() {
  const theme = usePortfolioStore((s) => s.theme);
  const toggleTheme = usePortfolioStore((s) => s.toggleTheme);

  const handleThemeToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Circular reveal transition with View Transitions API if supported
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      const x = e.clientX;
      const y = e.clientY;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      // @ts-ignore
      const transition = document.startViewTransition(() => {
        toggleTheme();
      });

      transition.ready.then(() => {
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ];
        document.documentElement.animate(
          {
            clipPath: clipPath,
          },
          {
            duration: 500,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      });
    } else {
      toggleTheme();
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <aside
      aria-label="Utility Controls"
      className="fixed bottom-0 left-0 right-0 z-30 bg-[var(--surface)]/90 backdrop-blur-md border-t border-hairline py-2 px-6 lg:px-12 transition-colors duration-200"
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between text-xs font-mono">
        
        {/* Left: Direct Mail trigger */}
        <div className="flex items-center gap-4">
          <Magnetic strength={0.2} radius={40}>
            <a
              href="mailto:rakeshmajhi.connect@gmail.com"
              className="flex items-center gap-2 text-[var(--muted)] hover:text-[var(--ink)] transition-colors py-1"
            >
              <Mail className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span className="hidden sm:inline">rakeshmajhi.connect@gmail.com</span>
              <span className="sm:hidden">Email</span>
            </a>
          </Magnetic>
          <span className="hidden md:inline text-[var(--hairline)]">|</span>
          <span className="hidden md:inline text-[var(--muted)]">Bhubaneswar &bull; ASSPL</span>
        </div>

        {/* Right: Theme Toggle, Resume, Top */}
        <div className="flex items-center gap-4">
          <Magnetic strength={0.25} radius={40}>
            <button
              onClick={handleThemeToggle}
              className="flex items-center gap-1.5 text-[var(--muted)] hover:text-[var(--ink)] transition-colors p-1"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-[var(--signal-amber)]" />
                  <span className="hidden sm:inline">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Dark</span>
                </>
              )}
            </button>
          </Magnetic>

          <span className="text-[var(--hairline)]">|</span>

          <Magnetic strength={0.25} radius={40}>
            <a
              href="mailto:rakeshmajhi.connect@gmail.com?subject=Resume%20Request%20-%20Rakesh%20Majhi"
              className="flex items-center gap-1.5 text-[var(--muted)] hover:text-[var(--ink)] transition-colors p-1"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>
          </Magnetic>

          <span className="text-[var(--hairline)]">|</span>

          <Magnetic strength={0.25} radius={40}>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-[var(--muted)] hover:text-[var(--ink)] transition-colors p-1"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Top</span>
            </button>
          </Magnetic>
        </div>

      </div>
    </aside>
  );
}
