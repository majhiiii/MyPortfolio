"use client";

import { useState } from "react";
import { Terminal, Code2, Network, Shield, Cpu, GitBranch, Sparkles, Layers, Sliders, Cloud } from "lucide-react";
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
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolioStore } from "@/lib/store";

const UTILITY_TABS = [
  { id: "cpq", label: "CPQ Configurator", icon: Sliders, badge: "Dimensional Engine", groupColor: "#0176D3" },
  { id: "soql", label: "SOQL Studio", icon: Code2, badge: "Query Runner", groupColor: "#0176D3" },
  { id: "pkce", label: "OAuth PKCE", icon: Shield, badge: "Web Crypto", groupColor: "#00A38C" },
  { id: "flow", label: "Flow Builder", icon: Network, badge: "Graph Canvas", groupColor: "#0176D3" },
  { id: "integration", label: "Integration Map", icon: Layers, badge: "Topology Hub", groupColor: "#00A38C" },
  { id: "agentforce", label: "Agentforce Trace", icon: Sparkles, badge: "Topics & Apex", groupColor: "#6B4EFF" },
  { id: "governor", label: "Governor Limits", icon: Cpu, badge: "Limits Engine", groupColor: "#0176D3" },
  { id: "pipeline", label: "Release Pipeline", icon: GitBranch, badge: "CI/CD Gate", groupColor: "#FF5A5F" },
  { id: "vibelab", label: "Code Review", icon: Terminal, badge: "Hardened Review", groupColor: "#FFC93C" },
  { id: "aws", label: "AWS Deploy Walkthrough", icon: Cloud, badge: "Cloud Infra", groupColor: "#FF8A1F" },
];

export default function PlaygroundSection() {
  const [activeTab, setActiveTab] = useState(UTILITY_TABS[0].id);
  const setActiveAccentColor = usePortfolioStore((s) => s.setActiveAccentColor);

  const handleSelectTab = (tab: typeof UTILITY_TABS[0]) => {
    setActiveTab(tab.id);
    setActiveAccentColor(tab.groupColor);
  };

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
      case "aws":
        return <AwsDeployWalkthrough />;
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
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: activeTabData.groupColor }} />
              <span>10 Production Utilities Ready</span>
            </div>
          </div>

          <h2 className="font-serif text-[clamp(2.75rem,6vw,5.5rem)] font-normal tracking-tight text-[#F3F1EC] leading-[0.95]">
            Developer <span className="italic">Playground</span>
          </h2>
          <p className="text-base font-sans text-[#8E8E93] max-w-2xl leading-relaxed">
            Authentic client-side testing environments executing real browser APIs: dimensional SVG drafting, Web Crypto SHA-256 digests, graph topologies, AWS deployment walkthroughs, and governor limit analysis.
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
                onClick={() => handleSelectTab(tab)}
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
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeTabData.groupColor }} />
              <span className="text-[#F3F1EC] font-medium">{activeTabData.label}</span>
              <span className="hidden sm:inline text-white/30">&bull;</span>
              <span className="hidden sm:inline text-[11px] text-[#8E8E93]">Client-Side Runtime</span>
            </div>
            <div className="text-[11px]">
              Module ID: <span style={{ color: activeTabData.groupColor }}>{activeTab.toUpperCase()}_v3.0</span>
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
            <span>Zero Server Latency &bull; Sample data processed client-side</span>
            <span className="text-[11px]">Built for Salesforce &amp; Cloud Engineering Evaluations</span>
          </div>
        </div>

      </div>
    </section>
  );
}
