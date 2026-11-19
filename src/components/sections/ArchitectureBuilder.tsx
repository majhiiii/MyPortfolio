"use client";

import React, { useState } from "react";
import { SKILL_GROUPS } from "@/data/stack";
import { Network, Play, CheckCircle2, ChevronRight, Layers, Cpu, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ArchNode {
  id: string;
  label: string;
  sub: string;
  group: keyof typeof SKILL_GROUPS;
  x: number;
  y: number;
}

interface ArchConnection {
  from: string;
  to: string;
  label?: string;
}

interface ArchPreset {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  nodes: ArchNode[];
  connections: ArchConnection[];
}

const PRESETS: ArchPreset[] = [
  {
    id: "outlook-addin",
    title: "1. Outlook Add-in & OAuth PKCE",
    subtitle: "In-House Add-in → OAuth 2.0 PKCE → Salesforce → REST API",
    description: "Office.js add-in executing cryptographic code verifier and challenge without client secret exposure, querying Salesforce via dynamic describeSObjects.",
    nodes: [
      { id: "office", label: "Office.js Add-in", sub: "Outlook Desktop/Web", group: "integrations", x: 60, y: 140 },
      { id: "pkce", label: "OAuth 2.0 PKCE", sub: "SHA-256 Verifier", group: "integrations", x: 260, y: 140 },
      { id: "sf", label: "Salesforce Core", sub: "Connected App / Auth", group: "salesforce", x: 480, y: 140 },
      { id: "rest", label: "Dynamic SOQL REST", sub: "Activity & Contact Sync", group: "salesforce", x: 710, y: 140 },
    ],
    connections: [
      { from: "office", to: "pkce", label: "Auth Code Req" },
      { from: "pkce", to: "sf", label: "Token Exchange" },
      { from: "sf", to: "rest", label: "describeSObjects" },
    ],
  },
  {
    id: "agentforce",
    title: "2. Agentforce Experience Cloud",
    subtitle: "Agentforce Agent → Topics → Actions → Apex/Flow → Records",
    description: "4 production agents routing natural language prompts through Einstein Trust Layer PII filters to invoke Apex actions and create case records.",
    nodes: [
      { id: "exp", label: "Experience Cloud", sub: "Customer Chat", group: "salesforce", x: 60, y: 140 },
      { id: "topics", label: "Agent Topics", sub: "Intent Routing", group: "agentforce", x: 270, y: 140 },
      { id: "actions", label: "Invocable Actions", sub: "@InvocableMethod", group: "agentforce", x: 500, y: 140 },
      { id: "records", label: "DML & Verification", sub: "Case & Lead Objects", group: "salesforce", x: 730, y: 140 },
    ],
    connections: [
      { from: "exp", to: "topics", label: "Grounded Prompt" },
      { from: "topics", to: "actions", label: "Topic Match" },
      { from: "actions", to: "records", label: "USER_MODE DML" },
    ],
  },
  {
    id: "aws-stack",
    title: "3. Next.js on AWS Infrastructure",
    subtitle: "Amplify → Route 53 → ACM → CloudFront → Lambda API → RDS MySQL",
    description: "Production full-stack web architectures provisioned during tenure: edge cached frontend with serverless Python/Node APIs and RDS relational stores.",
    nodes: [
      { id: "dns", label: "Route 53 & ACM", sub: "SSL / DNS Alias", group: "aws", x: 50, y: 80 },
      { id: "amp", label: "AWS Amplify / CF", sub: "Next.js Edge CDN", group: "aws", x: 260, y: 80 },
      { id: "lmb", label: "Lambda API", sub: "Serverless Microservice", group: "aws", x: 490, y: 80 },
      { id: "rds", label: "RDS (MySQL / S3)", sub: "Relational DB & Assets", group: "aws", x: 720, y: 80 },
      { id: "sf_api", label: "Salesforce REST", sub: "Bidirectional Sync", group: "salesforce", x: 490, y: 220 },
    ],
    connections: [
      { from: "dns", to: "amp", label: "HTTPS / Edge" },
      { from: "amp", to: "lmb", label: "REST Invoke" },
      { from: "lmb", to: "rds", label: "SQL / Assets" },
      { from: "lmb", to: "sf_api", label: "OAuth Sync" },
    ],
  },
  {
    id: "b2b-commerce",
    title: "4. B2B Commerce & Order Splitting",
    subtitle: "CloudCraze → Cart Overrides → Queueable Split → Payment Gateways",
    description: "Enterprise quoting and bulk checkout pipeline with async order allocation to prevent 101 SOQL limit violations across high-volume carts.",
    nodes: [
      { id: "cc", label: "CloudCraze Store", sub: "ccServiceCart Hook", group: "salesforce", x: 50, y: 140 },
      { id: "cpq", label: "LWC CPQ Engine", sub: "2D/3D Dimensional Quote", group: "salesforce", x: 260, y: 140 },
      { id: "que", label: "Queueable Apex", sub: "Async Order Split", group: "salesforce", x: 490, y: 140 },
      { id: "pay", label: "Stripe / PayPal / QBO", sub: "Payment & NACHA ACH", group: "integrations", x: 720, y: 140 },
    ],
    connections: [
      { from: "cc", to: "cpq", label: "Cart Payload" },
      { from: "cpq", to: "que", label: "Bulk Checkout" },
      { from: "que", to: "pay", label: "Webhook Token" },
    ],
  },
  {
    id: "amazon-connect",
    title: "5. Amazon Connect to Service Cloud",
    subtitle: "Amazon Connect → Salesforce CTI Adapter → Service Cloud Omni-Channel",
    description: "Amazon Connect integration with Salesforce Service Cloud. Generic unified contact routing and screen-pop architecture [CONFIRM WITH RAKESH].",
    nodes: [
      { id: "tel", label: "Customer Inbound", sub: "Voice & Telephony", group: "contactcenter", x: 60, y: 140 },
      { id: "acn", label: "Amazon Connect", sub: "Contact Flow Routing", group: "contactcenter", x: 270, y: 140 },
      { id: "cti", label: "Salesforce CTI", sub: "Console Softphone Adapter", group: "contactcenter", x: 500, y: 140 },
      { id: "svc", label: "Service Cloud", sub: "Omni-Channel & Case", group: "salesforce", x: 730, y: 140 },
    ],
    connections: [
      { from: "tel", to: "acn", label: "Call Stream" },
      { from: "acn", to: "cti", label: "CTI Event" },
      { from: "cti", to: "svc", label: "Screen-Pop" },
    ],
  },
];

export function ArchitectureBuilder() {
  const [activePresetId, setActivePresetId] = useState(PRESETS[0].id);
  const activePreset = PRESETS.find((p) => p.id === activePresetId) || PRESETS[0];

  return (
    <section id="architecture-builder" className="py-24 lg:py-36 border-b border-hairline bg-[var(--bg)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 space-y-12">
        
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[var(--muted)]">
            <span>ENTERPRISE BLUEPRINTS</span>
            <span>&bull;</span>
            <span>Architecture Builder</span>
          </div>
          <h2 className="font-serif text-[clamp(2.75rem,6vw,5.5rem)] font-normal tracking-tight text-[var(--ink)] leading-[0.95]">
            Topology <span className="italic">Builder</span>
          </h2>
          <p className="text-base font-sans text-[var(--muted)] max-w-2xl leading-relaxed">
            Five verified architectural flow patterns engineered during my tenure. Select a preset below to trace the animated live data paths and integration handshakes.
          </p>
        </div>

        {/* Preset Selector Rail */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-hairline text-xs font-mono">
          {PRESETS.map((preset) => {
            const isActive = activePresetId === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => setActivePresetId(preset.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-t-sm transition-colors shrink-0 ${
                  isActive
                    ? "bg-[var(--surface)] text-[var(--ink)] font-bold border border-b-transparent border-hairline"
                    : "text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--surface)]/50"
                }`}
              >
                <span>{preset.title}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Canvas */}
        <div className="border border-hairline rounded-sm p-6 sm:p-10 bg-[var(--surface)] space-y-6 shadow-sm overflow-hidden">
          
          {/* Preset Context Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-hairline">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--accent)] font-semibold">
                {activePreset.subtitle}
              </span>
              <p className="text-xs font-sans text-[var(--muted)] max-w-2xl">
                {activePreset.description}
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--muted)] shrink-0">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-ping" />
              <span>Simulated Packet Flow</span>
            </div>
          </div>

          {/* SVG Diagram Stage with Animated Flow Line Dash */}
          <div className="relative w-full overflow-x-auto py-8">
            <svg
              className="w-[840px] h-[280px] mx-auto select-none"
              viewBox="0 0 840 280"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Connecting Lines with animated dashes */}
              {activePreset.connections.map((conn, idx) => {
                const fromNode = activePreset.nodes.find((n) => n.id === conn.from);
                const toNode = activePreset.nodes.find((n) => n.id === conn.to);
                if (!fromNode || !toNode) return null;

                const startX = fromNode.x + 85;
                const startY = fromNode.y + 35;
                const endX = toNode.x + 10;
                const endY = toNode.y + 35;

                const midX = (startX + endX) / 2;

                return (
                  <g key={idx}>
                    {/* Background solid line */}
                    <path
                      d={`M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`}
                      stroke="var(--hairline)"
                      strokeWidth="2"
                      fill="none"
                    />

                    {/* Animated running pulse dashes */}
                    <path
                      d={`M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`}
                      stroke="var(--accent)"
                      strokeWidth="2"
                      strokeDasharray="6 6"
                      className="animate-[dash_1.5s_linear_infinite]"
                      fill="none"
                    />

                    {/* Connection label */}
                    {conn.label && (
                      <text
                        x={midX}
                        y={(startY + endY) / 2 - 8}
                        textAnchor="middle"
                        fontSize="9"
                        fontFamily="var(--font-geist-mono)"
                        fill="var(--muted)"
                      >
                        {conn.label}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Node Boxes */}
              {activePreset.nodes.map((node) => {
                const group = SKILL_GROUPS[node.group] || SKILL_GROUPS.salesforce;

                return (
                  <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                    <rect
                      x="0"
                      y="0"
                      width="160"
                      height="70"
                      rx="6"
                      fill="var(--bg)"
                      stroke={group.color}
                      strokeWidth="1.5"
                    />

                    {/* Group Badge indicator */}
                    <circle cx="16" cy="22" r="5" fill={group.color} />

                    <text
                      x="28"
                      y="26"
                      fontSize="11"
                      fontWeight="600"
                      fontFamily="var(--font-sans)"
                      fill="var(--ink)"
                    >
                      {node.label}
                    </text>

                    <text
                      x="16"
                      y="48"
                      fontSize="9.5"
                      fontFamily="var(--font-geist-mono)"
                      fill="var(--muted)"
                    >
                      {node.sub}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Verification Callout */}
          <div className="pt-4 border-t border-hairline flex flex-wrap items-center justify-between text-xs font-mono text-[var(--muted)]">
            <span>Deterministic Node Flow &bull; Real Architecture Model</span>
            <span className="text-[11px]">ASSPL Client Tracks &amp; Production Deployments</span>
          </div>

        </div>

      </div>
    </section>
  );
}
