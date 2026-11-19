"use client";

import React, { useState } from "react";
import { Sliders, Database, KeyRound, ChevronDown, Terminal, Sparkles, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CpqConfigurator } from "@/components/demos/CpqConfigurator";
import { SoqlStudio } from "@/components/demos/SoqlStudio";
import { PkceLab } from "@/components/demos/PkceLab";
import { FlowCanvas } from "@/components/demos/FlowCanvas";
import { IntegrationMap } from "@/components/demos/IntegrationMap";
import { AgentforceSim } from "@/components/demos/AgentforceSim";
import { GovernorGame } from "@/components/demos/GovernorGame";
import { PipelineVisualizer } from "@/components/demos/PipelineVisualizer";
import { VibeLabDiff } from "@/components/demos/VibeLabDiff";
import { AwsDeployWalkthrough } from "@/components/demos/AwsDeployWalkthrough";
import { GanttChartDemo } from "@/components/demos/GanttChartDemo";

type PrimaryTool = "cpq" | "gantt" | "soql" | "pkce";
type MoreTool = "flow" | "integrations" | "agentforce" | "governor" | "pipeline" | "diff" | "aws";

interface MoreToolItem {
  id: MoreTool;
  label: string;
}

const MORE_TOOLS: MoreToolItem[] = [
  { id: "flow", label: "Flow Builder Canvas" },
  { id: "integrations", label: "Integration Topology Map" },
  { id: "agentforce", label: "Agentforce Execution Trace" },
  { id: "governor", label: "Governor Limits Estimator" },
  { id: "pipeline", label: "CI/CD Release Pipeline" },
  { id: "diff", label: "Refactoring Code Review" },
  { id: "aws", label: "AWS Deployment Walkthrough" },
];

export function PlaygroundConsole() {
  const [activeTab, setActiveTab] = useState<PrimaryTool | MoreTool>("cpq");
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const isMoreActive = MORE_TOOLS.some((t) => t.id === activeTab);
  const activeMoreLabel = MORE_TOOLS.find((t) => t.id === activeTab)?.label || "More Tools";

  return (
    <section id="playground" className="space-y-4 pt-4 pb-6">
      {/* Title & Plain Label */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--ink)]">
            Playground
          </h2>
          <p className="text-xs sm:text-sm text-[var(--muted)]">
            Interactive client-side developer tools.
          </p>
        </div>
        <span className="text-xs font-mono text-[var(--muted)]">
          Sample data, runs in your browser
        </span>
      </div>

      {/* Dark Indigo Raised Glass Console Window Container */}
      <div className="rounded-[20px] bg-[#14182E]/80 backdrop-blur-[26px] border border-white/20 shadow-[0_28px_60px_-28px_rgba(20,24,46,0.6)] overflow-hidden text-white transition-colors">
        
        {/* Console Window Titlebar */}
        <div className="bg-[#0F1326]/90 px-4 py-3 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
          
          {/* Left: Window Controls + Tabs */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C8372D]/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#E8A317]/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#3C6E47]/80" />
            </div>

            <span className="text-xs font-mono text-white/50 border-r border-white/10 pr-3 hidden sm:inline">
              Developer Console
            </span>

            {/* 3 Primary Tool Tabs with Gliding Indicator */}
            <div className="flex items-center gap-1 text-xs font-mono">
              <button
                onClick={() => {
                  setActiveTab("cpq");
                  setIsMoreOpen(false);
                }}
                className={`relative px-3 py-1.5 rounded-sm transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "cpq"
                    ? "text-white font-semibold"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {activeTab === "cpq" && (
                  <motion.div
                    layoutId="console-tab-indicator"
                    className="absolute inset-0 bg-white/10 border border-white/20 rounded-sm -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Sliders className="w-3.5 h-3.5 text-[#E8A317]" />
                <span>CPQ Configurator (3D)</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab("gantt");
                  setIsMoreOpen(false);
                }}
                className={`relative px-3 py-1.5 rounded-sm transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "gantt"
                    ? "text-white font-semibold"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {activeTab === "gantt" && (
                  <motion.div
                    layoutId="console-tab-indicator"
                    className="absolute inset-0 bg-white/10 border border-white/20 rounded-sm -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Calendar className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>Gantt Dispatch</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab("soql");
                  setIsMoreOpen(false);
                }}
                className={`relative px-3 py-1.5 rounded-sm transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "soql"
                    ? "text-white font-semibold"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {activeTab === "soql" && (
                  <motion.div
                    layoutId="console-tab-indicator"
                    className="absolute inset-0 bg-white/10 border border-white/20 rounded-sm -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Database className="w-3.5 h-3.5 text-[#4A5EA8]" />
                <span>SOQL Studio</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab("pkce");
                  setIsMoreOpen(false);
                }}
                className={`relative px-3 py-1.5 rounded-sm transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "pkce"
                    ? "text-white font-semibold"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {activeTab === "pkce" && (
                  <motion.div
                    layoutId="console-tab-indicator"
                    className="absolute inset-0 bg-white/10 border border-white/20 rounded-sm -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <KeyRound className="w-3.5 h-3.5 text-[#3C6E47]" />
                <span>OAuth PKCE Lab</span>
              </button>
            </div>
          </div>

          {/* Right: "More tools" Dropdown Menu */}
          <div className="relative">
            <button
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm border text-xs font-mono transition-colors cursor-pointer ${
                isMoreActive
                  ? "bg-white/15 border-white text-white font-semibold"
                  : "border-white/20 text-white/70 hover:text-white hover:border-white/40"
              }`}
            >
              <span>{isMoreActive ? activeMoreLabel : "More tools (7)"}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {/* Dropdown Popover */}
            {isMoreOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-60 rounded-md bg-[#0F1326] border border-white/20 shadow-2xl py-1 z-50 text-xs font-mono">
                {MORE_TOOLS.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => {
                      setActiveTab(tool.id);
                      setIsMoreOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 hover:bg-white/10 transition-colors flex items-center justify-between cursor-pointer ${
                      activeTab === tool.id ? "text-[#E8A317] font-semibold" : "text-white/80"
                    }`}
                  >
                    <span>{tool.label}</span>
                    {activeTab === tool.id && <span className="w-1.5 h-1.5 rounded-full bg-[#E8A317]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Console Tool Body */}
        <div className="p-4 sm:p-6 min-h-[460px]">
          {activeTab === "cpq" && <CpqConfigurator />}
          {activeTab === "soql" && <SoqlStudio />}
          {activeTab === "pkce" && <PkceLab />}
          {activeTab === "gantt" && <GanttChartDemo />}
          {activeTab === "flow" && <FlowCanvas />}
          {activeTab === "integrations" && <IntegrationMap />}
          {activeTab === "agentforce" && <AgentforceSim />}
          {activeTab === "governor" && <GovernorGame />}
          {activeTab === "pipeline" && <PipelineVisualizer />}
          {activeTab === "diff" && <VibeLabDiff />}
          {activeTab === "aws" && <AwsDeployWalkthrough />}
        </div>

      </div>
    </section>
  );
}
