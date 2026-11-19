"use client";

import { useState } from "react";
import { Terminal, Code2, Network, Shield, Cpu, GitBranch, Sparkles, Layers, Sliders } from "lucide-react";
import { CpqConfigurator } from "@/components/demos/CpqConfigurator";
import { SoqlStudio } from "@/components/demos/SoqlStudio";
import { PkceLab } from "@/components/demos/PkceLab";
import { FlowCanvas } from "@/components/demos/FlowCanvas";
import { IntegrationMap } from "@/components/demos/IntegrationMap";
import { AgentforceSim } from "@/components/demos/AgentforceSim";
import { GovernorGame } from "@/components/demos/GovernorGame";
import { PipelineVisualizer } from "@/components/demos/PipelineVisualizer";
import { VibeLabDiff } from "@/components/demos/VibeLabDiff";
import { motion, AnimatePresence } from "framer-motion";

const UTILITY_TABS = [
  { id: "cpq", label: "CPQ Configurator", icon: Sliders, badge: "Dimensional Engine" },
  { id: "soql", label: "SOQL Studio", icon: Code2, badge: "Query Runner" },
  { id: "pkce", label: "OAuth PKCE", icon: Shield, badge: "Web Crypto" },
  { id: "flow", label: "Flow Builder", icon: Network, badge: "Graph Canvas" },
  { id: "integration", label: "Integration Map", icon: Layers, badge: "Topology Hub" },
  { id: "agentforce", label: "Agentforce Trace", icon: Sparkles, badge: "Topics & Apex" },
  { id: "governor", label: "Governor Limits", icon: Cpu, badge: "Limits Engine" },
  { id: "pipeline", label: "Release Pipeline", icon: GitBranch, badge: "CI/CD Gate" },
  { id: "vibelab", label: "Code Review", icon: Terminal, badge: "Hardened Review" },
];

export default function PlaygroundSection() {
  const [activeTab, setActiveTab] = useState(UTILITY_TABS[0].id);

  const renderActiveUtility = () => {
    switch (activeTab) {
      case "cpq":
        return <CpqConfigurator />;
      case "soql":
        return <SoqlStudio />;
      case "pkce":
        return <PkceLab />;
      case "flow":
        return <FlowCanvas />;
      case "integration":
        return <IntegrationMap />;
      case "agentforce":
        return <AgentforceSim />;
      case "governor":
        return <GovernorGame />;
      case "pipeline":
        return <PipelineVisualizer />;
      case "vibelab":
        return <VibeLabDiff />;
      default:
        return <CpqConfigurator />;
    }
  };

  const activeTabData = UTILITY_TABS.find((t) => t.id === activeTab) || UTILITY_TABS[0];

  return (
    <section
      id="playground"
      className="py-24 lg:py-36 border-b border-hairline bg-[#0B0B0D] text-[#F3F1EC] transition-colors"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 space-y-12">
        
        {/* Header */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#8E8E93]">
              <span>06 / DEVELOPER LAB</span>
              <span>&bull;</span>
              <span>Full-Bleed Engine Suite</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#8E8E93]">
              <span className="w-2 h-2 rounded-full bg-[#FFB020] animate-pulse" />
              <span>9 Production Utilities Ready</span>
            </div>
          </div>

          <h2 className="font-serif text-[clamp(2.75rem,6vw,5.5rem)] font-normal tracking-tight text-[#F3F1EC] leading-[0.95]">
            Developer <span className="italic">Playground</span>
          </h2>
          <p className="text-base font-sans text-[#8E8E93] max-w-2xl leading-relaxed">
            Authentic client-side testing environments executing real browser APIs: dimensional SVG drafting, Web Crypto SHA-256 digests, graph topologies, and governor limit simulations.
          </p>
        </div>

        {/* Tab Navigation Rail with Gliding Indicator */}
        <div className="relative flex gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-white/10 text-xs font-mono">
          {UTILITY_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2.5 px-4 py-3 rounded-full transition-colors shrink-0 z-10 ${
                  isActive ? "text-[#0D0D0F]" : "text-[#8E8E93] hover:text-[#F3F1EC]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabGlider"
                    className="absolute inset-0 bg-[#F3F1EC] rounded-full z-[-1]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <Icon className="w-3.5 h-3.5" />
                <span className="font-medium">{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive ? "bg-black/10 text-[#0D0D0F]" : "bg-white/5 text-[#8E8E93]"
                  }`}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Tool Stage */}
        <div
          data-cursor="play"
          className="border border-white/10 rounded-sm p-6 sm:p-10 bg-[#141417] min-h-[520px] flex flex-col justify-between shadow-2xl relative overflow-hidden"
        >
          {/* Top Stage Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs font-mono text-[#8E8E93] mb-6">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#0F6BFF]" />
              <span className="text-[#F3F1EC] font-medium">{activeTabData.label}</span>
              <span className="hidden sm:inline text-white/30">&bull;</span>
              <span className="hidden sm:inline text-[11px] text-[#8E8E93]">Client-Side Runtime</span>
            </div>
            <div className="text-[11px]">
              Module ID: <span className="text-[#4C8DFF]">{activeTab.toUpperCase()}_v2.4</span>
            </div>
          </div>

          {/* Animated Panel Crossfade */}
          <div className="flex-1 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                {renderActiveUtility()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Stage Footer */}
          <div className="pt-6 mt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-[#8E8E93]">
            <span>Zero Server Latency &bull; In-Memory Execution</span>
            <span className="text-[11px]">Built for Salesforce Engineering Evaluations</span>
          </div>
        </div>

      </div>
    </section>
  );
}
