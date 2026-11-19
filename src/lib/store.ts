import { create } from "zustand";

interface PortfolioState {
  theme: "light" | "dark";
  activeSection: string;
  isCommandPaletteOpen: boolean;
  selectedSkill: string | null;
  activeProjectModal: string | null;
  activeAccentColor: string;
  activeTechHovered: string | null;
  cloudClickCount: number;
  triggerStackPitRain: boolean;
  isTerminalOpen: boolean;
  setTheme: (theme: "light" | "dark") => void;
  toggleTheme: () => void;
  setActiveSection: (section: string) => void;
  setCommandPaletteOpen: (open: boolean) => void;
  setSelectedSkill: (skill: string | null) => void;
  setActiveProjectModal: (id: string | null) => void;
  setActiveAccentColor: (color: string) => void;
  setActiveTechHovered: (techId: string | null) => void;
  incrementCloudClick: () => void;
  setTriggerStackPitRain: (trigger: boolean) => void;
  setTerminalOpen: (open: boolean) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  theme: "light",
  activeSection: "hero",
  isCommandPaletteOpen: false,
  selectedSkill: null,
  activeProjectModal: null,
  activeAccentColor: "#0176D3",
  activeTechHovered: null,
  cloudClickCount: 0,
  triggerStackPitRain: false,
  isTerminalOpen: false,
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
  setActiveAccentColor: (color: string) => {
    if (typeof document !== "undefined") {
      document.documentElement.style.setProperty("--accent", color);
    }
    set({ activeAccentColor: color });
  },
  setActiveTechHovered: (techId) => set({ activeTechHovered: techId }),
  incrementCloudClick: () => {
    set((state) => {
      const nextCount = state.cloudClickCount + 1;
      if (nextCount >= 5) {
        return { cloudClickCount: 0, triggerStackPitRain: true };
      }
      return { cloudClickCount: nextCount };
    });
  },
  setTriggerStackPitRain: (trigger) => set({ triggerStackPitRain: trigger }),
  setTerminalOpen: (isTerminalOpen) => set({ isTerminalOpen }),
}));
