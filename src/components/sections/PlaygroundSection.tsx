"use client";

import { useState } from "react";
import { Terminal, Code2, Network, Shield, Cpu, GitBranch, Sparkles, Layers } from "lucide-react";
import { SoqlStudio } from "@/components/demos/SoqlStudio";
import { PkceLab } from "@/components/demos/PkceLab";
import { FlowCanvas } from "@/components/demos/FlowCanvas";
import { IntegrationMap } from "@/components/demos/IntegrationMap";
import { AgentforceSim } from "@/components/demos/AgentforceSim";
import { GovernorGame } from "@/components/demos/GovernorGame";
import { PipelineVisualizer } from "@/components/demos/PipelineVisualizer";
import { VibeLabDiff } from "@/components/demos/VibeLabDiff";

const DEMO_TABS = [
  { id: "soql", label: "SOQL Studio", icon: Code2, badge: "Live Query" },
  { id: "pkce", label: "OAuth PKCE Lab", icon: Shield, badge: "Web Crypto" },
  { id: "flow", label: "Flow Builder", icon: Network, badge: "@xyflow/react" },
  { id: "integration", label: "Integration Map", icon: Layers, badge: "Topology" },
  { id: "agentforce", label: "Agentforce Sim", icon: Sparkles, badge: "Topics & Apex" },
  { id: "governor", label: "Governor Game", icon: Cpu, badge: "Limits Engine" },
  { id: "pipeline", label: "Release Pipeline", icon: GitBranch, badge: "CI/CD Gate" },
  { id: "vibelab", label: "Vibe Lab Diff", icon: Terminal, badge: "Code Review" },
];

export default function PlaygroundSection() {
  const [activeTab, setActiveTab] = useState(DEMO_TABS[0].id);

  const renderActiveDemo = () => {
    switch (activeTab) {
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
        return <SoqlStudio />;
    }
  };

  return (
    <section id="playground" className="py-20 lg:py-28 border-b border-hairline">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 space-y-10">
        
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">06 / PLAYGROUND</span>
            <span className="text-xs font-mono text-[var(--muted)]">Sample data, simulated in your browser</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-[var(--ink)]">Developer Lab & Demos</h2>
          <p className="text-sm font-mono text-[var(--muted)] max-w-2xl">
            Interactive in-browser tools built with CodeMirror, @xyflow/react, and Web Crypto. Run live queries and inspect architecture states.
          </p>
        </div>

        {/* Tab Navigation Rail */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-hairline text-xs font-mono">
          {DEMO_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-t-sm transition-colors shrink-0 ${
                  isActive
                    ? "bg-[var(--surface)] text-[var(--ink)] font-bold border border-b-transparent border-hairline"
                    : "text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--surface)]/50"
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>{tab.label}</span>
                <span className="text-[10px] px-1 py-0.2 rounded-xs bg-[var(--bg)] border border-hairline text-[var(--muted)]">
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Demo Container */}
        <div className="border border-hairline rounded-sm p-6 sm:p-8 bg-[var(--surface)] min-h-[460px] flex flex-col justify-between font-mono text-xs">
          
          <div className="flex items-center justify-between pb-4 border-b border-hairline text-[11px] text-[var(--muted)] mb-6">
            <div className="flex items-center gap-2">
              <span>ACTIVE LAB // {activeTab.toUpperCase()}</span>
              <span className="text-hairline">|</span>
              <span className="text-[var(--accent)] font-semibold">{DEMO_TABS.find((t) => t.id === activeTab)?.label}</span>
            </div>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Client Simulation Engine Active
            </span>
          </div>

          {/* Render Active Component */}
          <div className="flex-1 w-full">
            {renderActiveDemo()}
          </div>

          <div className="pt-6 mt-6 border-t border-hairline flex flex-wrap items-center justify-between gap-2 text-[10px] text-[var(--muted)]">
            <span>Security: Zero External API Leakage · Local In-Browser Execution</span>
            <span>All enterprise data simulated with anonymized schemas</span>
          </div>

        </div>

      </div>
    </section>
  );
}
