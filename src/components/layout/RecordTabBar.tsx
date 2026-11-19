"use client";

import React, { useEffect, useState } from "react";
import { usePortfolioStore } from "@/lib/store";
import { motion } from "framer-motion";
import { FileText, Sun, Moon } from "lucide-react";

interface TabItem {
  id: string;
  label: string;
  targetId: string;
}

const TABS: TabItem[] = [
  { id: "overview", label: "Overview", targetId: "overview" },
  { id: "work", label: "Work", targetId: "work" },
  { id: "playground", label: "Playground", targetId: "playground" },
  { id: "skills", label: "Skills", targetId: "skills" },
  { id: "contact", label: "Contact", targetId: "contact" },
];

export function RecordTabBar() {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const theme = usePortfolioStore((s) => s.theme);
  const toggleTheme = usePortfolioStore((s) => s.toggleTheme);

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const resumeUrl = `${basePath}/assets/Rakesh_Majhi_Resume.pdf`;

  // Smooth scroll spy to highlight active tab
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (let i = TABS.length - 1; i >= 0; i--) {
        const el = document.getElementById(TABS[i].targetId);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveTab(TABS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      const offsetTop = el.offsetTop - 70;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  };

  const handleThemeToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    // @ts-ignore
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
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 380,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      });
    } else {
      toggleTheme();
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[var(--glass-base-bg)] backdrop-blur-[20px] border-b border-[var(--glass-base-border)] shadow-[0_4px_24px_-10px_rgba(26,20,16,0.12)] dark:shadow-[0_4px_24px_-10px_rgba(0,0,0,0.5)] transition-colors">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        
        {/* Left: Tab Bar with Gliding Indicator */}
        <nav className="flex items-center space-x-1 sm:space-x-1.5 overflow-x-auto scrollbar-none py-1" aria-label="Record Navigation Tabs">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => scrollTo(tab.targetId)}
                className={`relative px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-colors cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "text-[var(--ink)] font-semibold"
                    : "text-[var(--muted)] hover:text-[var(--ink)]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="record-tab-active"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute inset-0 bg-[var(--surface-tint-solid)] border border-[var(--glass-base-border)] rounded-full -z-10 shadow-xs"
                  />
                )}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Plain Resume Link + Theme Toggle */}
        <div className="flex items-center space-x-2.5 text-xs sm:text-sm shrink-0">
          <a
            href={resumeUrl}
            download="Rakesh_Majhi_Resume.pdf"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--glass-base-border)] bg-[var(--surface-tint-solid)] text-[var(--ink)] hover:border-[var(--indigo)] hover:text-[var(--indigo)] transition-all font-medium text-xs shadow-2xs cursor-pointer"
            title="Download verified resume PDF"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Resume</span> (PDF)
          </a>

          <button
            onClick={handleThemeToggle}
            className="p-1.5 rounded-full border border-[var(--glass-base-border)] bg-[var(--surface-tint-solid)] text-[var(--muted)] hover:text-[var(--ink)] transition-colors cursor-pointer shadow-2xs"
            aria-label="Toggle colour theme"
            title="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-[var(--turmeric)]" /> : <Moon className="w-4 h-4 text-[var(--indigo)]" />}
          </button>
        </div>

      </div>
    </header>
  );
}
