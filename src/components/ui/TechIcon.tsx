"use client";

import React, { useState } from "react";
import { TechItem, SKILL_GROUPS } from "@/data/stack";
import { usePortfolioStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { TechGlyph } from "@/components/ui/TechGlyph";

interface TechIconProps {
  item: TechItem;
  size?: "sm" | "md" | "lg";
  variant?: "compact" | "cartridge";
  showTooltip?: boolean;
  className?: string;
  onClick?: () => void;
}

export function TechIcon({
  item,
  size = "md",
  variant = "compact",
  showTooltip = true,
  className = "",
  onClick,
}: TechIconProps) {
  const [isHovered, setIsHovered] = useState(false);
  const setActiveAccentColor = usePortfolioStore((s) => s.setActiveAccentColor);
  const setActiveTechHovered = usePortfolioStore((s) => s.setActiveTechHovered);

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

  if (variant === "cartridge") {
    return (
      <div
        className={`relative inline-block select-none ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
      >
        <motion.div
          whileHover={{ y: -2, scale: 1.02 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="h-11 px-3.5 rounded-md border border-hairline bg-[var(--surface)] hover:border-[var(--ink)] flex items-center gap-3 transition-colors duration-200 cursor-pointer shadow-2xs"
          style={{
            borderLeft: `3px solid ${group.color}`,
          }}
        >
          <TechGlyph techId={item.id} color={group.color} size={18} />
          <div className="flex flex-col text-left">
            <span className="font-sans font-medium text-xs text-[var(--ink)] leading-tight">
              {item.name}
            </span>
            <span className="text-[10px] font-mono text-[var(--muted)] leading-none mt-0.5">
              {group.name}
            </span>
          </div>
          <span
            className="ml-auto text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-xs"
            style={{ backgroundColor: group.tint, color: group.color }}
          >
            {item.monogram}
          </span>
        </motion.div>

        {showTooltip && (
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 rounded-[12px] bg-[#141210] dark:bg-[#1C1814] text-[#FDFBF7] shadow-2xl z-50 pointer-events-none text-left border border-white/20"
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
                <p className="text-[12px] font-sans text-[#DCD4CA] pt-1.5 leading-relaxed">
                  {item.note}
                </p>
                <div className="mt-2 pt-1 border-t border-white/10 flex items-center justify-between text-[9px] font-mono text-white/50">
                  <span>{item.usedIn.length} Linked Project{item.usedIn.length > 1 ? "s" : ""}</span>
                  <span className="text-white/80">· Click to inspect</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    );
  }

  // Compact Tile Variant
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-11 h-11",
    lg: "w-14 h-14",
  }[size];

  const glyphSize = {
    sm: 15,
    md: 20,
    lg: 26,
  }[size];

  return (
    <div
      className={`relative inline-block select-none ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <motion.div
        whileHover={{ scale: 1.15, rotate: 5 }}
        transition={{ type: "spring", stiffness: 350, damping: 20 }}
        className={`${sizeClasses} rounded-md border border-hairline flex items-center justify-center transition-colors duration-200 cursor-pointer shadow-2xs`}
        style={{
          backgroundColor: isHovered ? group.tint : "var(--surface)",
          borderColor: isHovered ? group.color : "var(--hairline)",
        }}
      >
        <TechGlyph techId={item.id} color={isHovered ? group.color : "var(--ink)"} size={glyphSize} />
      </motion.div>

      {/* Rich Tooltip */}
      {showTooltip && (
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 rounded-[12px] bg-[#141210] dark:bg-[#1C1814] text-[#FDFBF7] shadow-2xl z-50 pointer-events-none text-left border border-white/20"
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
              <p className="text-[12px] font-sans text-[#DCD4CA] pt-1.5 leading-relaxed">
                {item.note}
              </p>
              <div className="mt-2 pt-1 border-t border-white/10 flex items-center justify-between text-[9px] font-mono text-white/50">
                <span>{item.usedIn.length} Linked Project{item.usedIn.length > 1 ? "s" : ""}</span>
                <span className="text-white/80">· Click to filter</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
