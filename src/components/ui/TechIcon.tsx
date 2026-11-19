"use client";

import React, { useState } from "react";
import { TechItem, SKILL_GROUPS } from "@/data/stack";
import { usePortfolioStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiPython,
  SiJavascript,
  SiFastapi,
  SiPostgresql,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiPostman,
  SiStripe,
  SiPaypal,
  SiQuickbooks,
  SiGooglesheets,
  SiTailwindcss,
  SiMysql,
} from "@icons-pack/react-simple-icons";

interface TechIconProps {
  item: TechItem;
  size?: "sm" | "md" | "lg";
  showTooltip?: boolean;
  className?: string;
  onClick?: () => void;
}

export function TechIcon({
  item,
  size = "md",
  showTooltip = true,
  className = "",
  onClick,
}: TechIconProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { setActiveAccentColor, setActiveTechHovered } = usePortfolioStore();

  const handleMouseEnter = () => {
    setIsHovered(true);
    setActiveAccentColor(item.color);
    setActiveTechHovered(item.id);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setActiveTechHovered(null);
  };

  const group = SKILL_GROUPS[item.group] || SKILL_GROUPS.salesforce;

  const sizeClasses = {
    sm: "w-8 h-8 text-[10px]",
    md: "w-11 h-11 text-xs",
    lg: "w-14 h-14 text-sm",
  }[size];

  const iconSizes = {
    sm: 14,
    md: 18,
    lg: 24,
  }[size];

  const renderBrandIcon = () => {
    switch (item.brandIconKey) {
      case "react":
        return <SiReact size={iconSizes} />;
      case "nextdotjs":
        return <SiNextdotjs size={iconSizes} />;
      case "python":
        return <SiPython size={iconSizes} />;
      case "javascript":
        return <SiJavascript size={iconSizes} />;
      case "fastapi":
        return <SiFastapi size={iconSizes} />;
      case "postgresql":
        return <SiPostgresql size={iconSizes} />;
      case "git":
        return <SiGit size={iconSizes} />;
      case "github":
        return <SiGithub size={iconSizes} />;
      case "githubactions":
        return <SiGithubactions size={iconSizes} />;
      case "postman":
        return <SiPostman size={iconSizes} />;
      case "stripe":
        return <SiStripe size={iconSizes} />;
      case "paypal":
        return <SiPaypal size={iconSizes} />;
      case "quickbooks":
        return <SiQuickbooks size={iconSizes} />;
      case "googlesheets":
        return <SiGooglesheets size={iconSizes} />;
      case "mysql":
        return <SiMysql size={iconSizes} />;
      case "tailwindcss":
        return <SiTailwindcss size={iconSizes} />;
      default:
        return null;
    }
  };

  const brandIcon = renderBrandIcon();

  return (
    <div
      className={`relative inline-block select-none ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <motion.div
        whileHover={{ scale: 1.15, rotate: 6 }}
        transition={{ type: "spring", stiffness: 350, damping: 20 }}
        className={`${sizeClasses} rounded-md border border-hairline flex flex-col items-center justify-center font-mono font-semibold transition-colors duration-250 cursor-pointer shadow-2xs`}
        style={{
          backgroundColor: isHovered ? group.tint : "var(--surface)",
          color: isHovered ? group.color : "var(--ink)",
          borderColor: isHovered ? group.color : "var(--hairline)",
        }}
      >
        {brandIcon ? (
          <div className="flex items-center justify-center transition-colors">
            {brandIcon}
          </div>
        ) : (
          <span className="tracking-tighter font-mono font-bold leading-none">
            {item.monogram}
          </span>
        )}
      </motion.div>

      {/* Rich Tooltip with Name, Group & Where I used it */}
      {showTooltip && (
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.95 }}
              transition={{ duration: 0.18 }}
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-60 p-3 rounded-md bg-[var(--ink)] text-[var(--bg)] shadow-xl z-50 pointer-events-none text-left"
            >
              <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-white/15">
                <span className="font-sans font-semibold text-xs text-white leading-tight">
                  {item.name}
                </span>
                <span
                  className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded-xs font-bold"
                  style={{ backgroundColor: group.color, color: "#FFFFFF" }}
                >
                  {group.name}
                </span>
              </div>
              <p className="text-[11px] font-sans text-white/80 pt-1.5 leading-relaxed">
                {item.note}
              </p>
              <div className="mt-2 pt-1 border-t border-white/10 flex items-center justify-between text-[9px] font-mono text-white/50">
                <span>{item.usedIn.length} Linked Project{item.usedIn.length > 1 ? "s" : ""}</span>
                <span className="text-white/80">&bull; Click to filter</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
