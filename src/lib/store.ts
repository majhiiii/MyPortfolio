import { create } from "zustand";

interface PortfolioState {
  theme: "light" | "dark";
  activeSection: string;
  isCommandPaletteOpen: boolean;
  selectedSkill: string | null;
  activeProjectModal: string | null;
  setTheme: (theme: "light" | "dark") => void;
  toggleTheme: () => void;
  setActiveSection: (section: string) => void;
  setCommandPaletteOpen: (open: boolean) => void;
  setSelectedSkill: (skill: string | null) => void;
  setActiveProjectModal: (id: string | null) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  theme: "light",
  activeSection: "hero",
  isCommandPaletteOpen: false,
  selectedSkill: null,
  activeProjectModal: null,
  setTheme: (theme) => {
    try {
      localStorage.setItem("rm_portfolio_theme", theme);
    } catch {}
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
    }
    set({ theme });
  },
  toggleTheme: () => {
    set((state) => {
      const nextTheme = state.theme === "light" ? "dark" : "light";
      try {
        localStorage.setItem("rm_portfolio_theme", nextTheme);
      } catch {}
      if (typeof document !== "undefined") {
        document.documentElement.setAttribute("data-theme", nextTheme);
      }
      return { theme: nextTheme };
    });
  },
  setActiveSection: (activeSection) => set({ activeSection }),
  setCommandPaletteOpen: (isCommandPaletteOpen) => set({ isCommandPaletteOpen }),
  setSelectedSkill: (selectedSkill) => set({ selectedSkill }),
  setActiveProjectModal: (activeProjectModal) => set({ activeProjectModal }),
}));
