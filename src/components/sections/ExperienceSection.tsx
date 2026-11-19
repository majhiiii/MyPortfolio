"use client";

import { useState } from "react";
import { Layers, ChevronRight, ShieldCheck, Cpu, Code2, Users, CheckCircle2 } from "lucide-react";

interface ASSPLTrack {
  id: string;
  tabLabel: string;
  title: string;
  role: string;
  period: string;
  tags: string[];
  summary: string;
  deliverables: string[];
  patterns: string[];
  securityAndLimits: string;
}

const ASSPL_TRACKS: ASSPLTrack[] = [
  {
    id: "b2b-cpq",
    tabLabel: "B2B Commerce & CPQ",
    title: "B2B Storefront Architecture & Dimensional CPQ",
    role: "Software Developer – Lead Track Delivery",
    period: "NOV 2024 – PRESENT · ASSPL",
    tags: ["CloudCraze", "ccServiceCart", "LWC 2D/3D Configurators", "Queueable Apex", "WMS Engine"],
    summary: "Extended a high-volume B2B Commerce platform on CloudCraze, overriding core service providers and logic hooks to implement tiered wholesale pricing, a unified 1-page checkout flow, and custom LWC visual quoting configurators.",
    deliverables: [
      "Overrode CloudCraze core services (ccServiceCart, ccServiceCategory) and hooks (cc_hk_Order) to support tiered account pricing, volume discounts, and requisition approvals.",
      "Engineered an interactive 2D layout and 3D visual configurator in Lightning Web Components (LWC) for industrial equipment quoting, drawing real-time scaled SVG blueprints and calculating bill of materials (BOM).",
      "Automated Quote-to-Order conversion with multi-page spec sheet PDF generation, enabling sales reps to issue engineering-backed quotes in minutes.",
      "Engineered an asynchronous Queueable Apex framework handling multi-warehouse order splitting, automated backorders, and drop-ship purchase order dispatching.",
      "Built warehouse management (WMS) workflows in LWC for receiving worksheets, cycle counts, bin allocations, and inter-warehouse inventory transfers.",
    ],
    patterns: [
      "CloudCraze Service Provider Override Pattern",
      "Queueable Apex Chaining for Order Splitting",
      "Dynamic SVG Scaled Blueprint Rendering in LWC",
      "Custom Metadata-Driven Pricing Matrix",
    ],
    securityAndLimits: "Isolated order splitting and dimensional calculations into Queueable execution units to prevent 101 SOQL limits and CPU timeouts during high-volume checkout bursts.",
  },
  {
    id: "fintech-ach",
    tabLabel: "FinTech & Banking (ACH)",
    title: "Automated Banking & Multi-Gateway Payment Sync",
    role: "Software Developer – Financial Integrations",
    period: "NOV 2024 – PRESENT · ASSPL",
    tags: ["NACHA ACH", "Batch Apex", "Stripe API", "QuickBooks Online", "CyberSource SOAP"],
    summary: "Built automated financial processing pipelines including banking-compliant NACHA ACH direct debit batch generation, daily cash receipts, and multi-gateway payment reconciliation.",
    deliverables: [
      "Engineered an automated Batch Apex engine generating standard 94-character NACHA ACH direct debit files for direct submission to banking clearinghouses.",
      "Automated daily cash receipts processing against customer credit and payment terms, matching inbound bank settlements to open invoice lines.",
      "Built secure webhook listeners for Stripe charge events with cryptographic HmacSHA256 signature verification and Platform Event decoupling.",
      "Implemented bidirectional QuickBooks Online integration via REST API for sales receipts, credit memo adjustments, and ledger reconciliation.",
      "Integrated CyberSource payment gateway over SOAP XML with WSDL2Apex client generators and WS-Security headers for B2B storefront checkout.",
    ],
    patterns: [
      "NACHA 94-Character Fixed-Width Record Formatter",
      "Cryptographic HmacSHA256 Signature Verification",
      "Platform Event Decoupled Webhook Ingestion",
      "Two-Way REST Ledger Reconciliation",
    ],
    securityAndLimits: "Enforced strict idempotency keys on payment transactions to prevent duplicate debits, and applied WITH USER_MODE and stripInaccessible() across all financial DML operations.",
  },
  {
    id: "logistics-tax",
    tabLabel: "Logistics & APIs",
    title: "Enterprise Logistics, Tax & Sales Intelligence Integrations",
    role: "Software Developer – External Services",
    period: "NOV 2024 – PRESENT · ASSPL",
    tags: ["UPS API", "Avalara AvaTax", "Apollo.io API", "FastAPI / Python", "REST/SOAP"],
    summary: "Connected Salesforce with mission-critical third-party platforms for shipping rate quotes, multi-state tax compliance, and in-CRM sales intelligence.",
    deliverables: [
      "Integrated UPS REST/SOAP shipping APIs for live shipping rate quotes, automated shipping label generation, tracking updates, and Bill of Lading (BOL) documentation.",
      "Integrated Avalara AvaTax for automated multi-jurisdictional sales tax calculations, exemption certificate validation, and backorder tax adjustments.",
      "Built custom Apollo.io integration inside an LWC panel on Lead and Account layouts, enabling sales reps to enrich contact data and find decision-makers directly in Salesforce.",
      "Developed high-throughput asynchronous Python FastAPI middleware on AWS bridging external candidate/lead platforms to Salesforce using Platform Events with automatic retry queues.",
    ],
    patterns: [
      "Named Credentials & External Credentials Architecture",
      "HTTP Callout Mocking & Circuit Breaker Retry Queues",
      "LWC Wire Service & Imperative Apex Data Fetching",
      "Composite REST API Batching",
    ],
    securityAndLimits: "Centralized all external endpoint credentials in Named Credentials with zero hardcoded URLs or tokens, routing callouts prior to DML to respect Salesforce callout boundaries.",
  },
  {
    id: "agentforce-ai",
    tabLabel: "Agentforce & AI",
    title: "Agentforce Autonomous Bots & Service Cloud Workflows",
    role: "Certified Agentforce Specialist & AI Associate",
    period: "NOV 2024 – PRESENT · ASSPL",
    tags: ["Agentforce", "Agent Builder", "Invocable Apex", "Einstein Trust Layer", "OpenAI API"],
    summary: "Architected and deployed 4 production Agentforce agents on Experience Cloud and built Invocable Apex actions for autonomous support case management and rep enablement.",
    deliverables: [
      "Designed and deployed 4 production Agentforce agents (Employee Assistant, Guided Shopping, Debug Log Analyzer, Customer Service) on Experience Cloud.",
      "Built Invocable Apex actions (CaseService, ChatSummaryService) enabling autonomous agents to create support cases (Origin = 'Agentforce') and log structured chat summaries directly onto Case records.",
      "Configured Einstein Trust Layer guardrails enforcing PII data masking, toxicity screening, and grounded live CRM queries.",
      "Created an interactive sales rep enablement tool in LWC powered by the OpenAI API for real-time inventory lookups, backorder alternatives, and pricing summaries during live customer calls.",
      "Automated territory-based lead assignment across 50 US states and engineered a multi-step cadence execution engine (CadenceStepExecutorBatch) for outbound sales outreach.",
    ],
    patterns: [
      "InvocableMethod Apex with Structured Request/Result DTOs",
      "Einstein Trust Layer Guardrail Enforcement",
      "Topic Routing Matrix with High-Confidence Fallbacks",
      "Context-Aware LWC Chat Interfaces",
    ],
    securityAndLimits: "Strict deterministic validation on all Invocable Apex methods so autonomous AI planners can only execute permitted CRM actions within defined user permissions.",
  },
  {
    id: "devops-mentorship",
    tabLabel: "DevOps & Mentorship",
    title: "Release Engineering, CI/CD & Technical Leadership",
    role: "Software Developer – Track Lead & Mentor",
    period: "NOV 2024 – PRESENT · ASSPL",
    tags: ["GitHub Actions", "Salesforce CLI (sf)", "Scratch Orgs", "PMD Analysis", "Agile / Scrum"],
    summary: "Led technical delivery across 3 concurrent production client tracks, mentoring 4 junior engineers and maintaining zero-downtime release pipelines.",
    deliverables: [
      "Engineered automated GitHub Actions CI/CD pipelines with Salesforce CLI (sf) executing automated unit tests, scratch org deployment validation, and quick production releases.",
      "Enforced a strict >85% unit test code coverage gate with dedicated test factories (@TestSetup) and comprehensive negative assertion tests.",
      "Integrated PMD Apex static code analysis into pull request workflows to prevent hardcoded IDs, unindexed queries, and missing security annotations.",
      "Conducted daily code reviews and technical unblocking for 4 junior developers, mentoring them on Apex bulkification, LWC state management, and governor limits.",
      "Managed day-to-day communication with US and global stakeholders across timezones, translating business specifications into sprint-ready technical tasks in Agile/Scrum.",
    ],
    patterns: [
      "Multi-Branch Scratch Org Validation Pipeline",
      "Apex Test Data Factory Architecture (@TestSetup)",
      "Automated PMD Static Analysis PR Gate",
      "Agile Technical Task Decomposition",
    ],
    securityAndLimits: "Guaranteed zero-defect deployments across production orgs by requiring 100% green validation builds before merging pull requests.",
  },
];

export function ExperienceSection() {
  const [activeTrackId, setActiveTrackId] = useState(ASSPL_TRACKS[0].id);
  const activeTrack = ASSPL_TRACKS.find((t) => t.id === activeTrackId) || ASSPL_TRACKS[0];

  return (
    <section id="experience" className="py-20 lg:py-28 border-b border-hairline">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">04 / EXPERIENCE CONSOLE</span>
            <span className="text-xs font-mono text-[var(--muted)]">Production Delivery at ASSPL (Nov 2024 – Present)</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-[var(--ink)]">
            Engineering Tracks & Architecture
          </h2>
          <p className="text-sm font-mono text-[var(--muted)] max-w-3xl leading-relaxed">
            Detailed breakdown of production systems engineered at Abacus System & Solution Pvt. Ltd. (ASSPL). Select a track below to inspect technical implementations, patterns, and governor limit strategies.
          </p>
        </div>

        {/* Track Filter Rail */}
        <div className="flex gap-2 overflow-x-auto pb-2 border-b border-hairline scrollbar-none text-xs font-mono">
          {ASSPL_TRACKS.map((track, idx) => {
            const isActive = activeTrackId === track.id;
            return (
              <button
                key={track.id}
                onClick={() => setActiveTrackId(track.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-t-sm transition-colors shrink-0 ${
                  isActive
                    ? "bg-[var(--surface)] text-[var(--ink)] font-bold border border-b-transparent border-hairline"
                    : "text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--surface)]/50"
                }`}
              >
                <span className="text-[10px] text-[var(--muted)] font-mono">0{idx + 1}</span>
                <span>{track.tabLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Active Track Deep-Dive Card */}
        <div className="border border-hairline rounded-sm p-6 sm:p-8 bg-[var(--surface)] space-y-8">
          
          {/* Track Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-hairline">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-[var(--muted)] font-bold">
                {activeTrack.period} · {activeTrack.role}
              </span>
              <h3 className="text-2xl font-bold text-[var(--ink)] font-sans">
                {activeTrack.title}
              </h3>
              <p className="text-sm text-[var(--muted)] font-sans max-w-3xl pt-1">
                {activeTrack.summary}
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 font-mono text-xs">
            {activeTrack.tags.map((tag, i) => (
              <span key={i} className="px-2 py-0.5 border border-hairline rounded-xs text-[var(--ink)] bg-[var(--bg)]">
                {tag}
              </span>
            ))}
          </div>

          {/* Core Deliverables */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase font-bold text-[var(--ink)] tracking-wider">
              Technical Deliverables & Code Modules
            </h4>
            <div className="space-y-2.5">
              {activeTrack.deliverables.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-[var(--muted)] leading-relaxed font-sans">
                  <span className="font-mono font-bold text-[var(--ink)] mt-0.5 shrink-0">—</span>
                  <span className="text-[var(--ink)]/90">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Two-Column Deep Dive: Patterns & Limits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-hairline text-xs font-mono">
            {/* Patterns */}
            <div className="p-4 bg-[var(--bg)] border border-hairline rounded-sm space-y-2">
              <div className="text-[10px] uppercase font-bold text-[var(--ink)] flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5" />
                <span>Architectural Patterns Used</span>
              </div>
              <ul className="space-y-1.5 text-[11px] text-[var(--muted)]">
                {activeTrack.patterns.map((p, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[var(--ink)]"></span>
                    <span className="text-[var(--ink)] font-medium">{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Governor Limits & Safety */}
            <div className="p-4 bg-[var(--bg)] border border-hairline rounded-sm space-y-2">
              <div className="text-[10px] uppercase font-bold text-[var(--ink)] flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                <span>Governor Limits & Security Strategy</span>
              </div>
              <p className="text-[11px] text-[var(--muted)] leading-relaxed font-sans">
                {activeTrack.securityAndLimits}
              </p>
            </div>
          </div>

        </div>

        {/* Previous Web Intern Experience Row (Briskode) */}
        <div className="border border-hairline rounded-sm p-6 bg-[var(--bg)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
          <div className="space-y-1">
            <span className="text-[10px] uppercase text-[var(--muted)]">PREVIOUS ROLE // MAR 2024 – OCT 2024</span>
            <h4 className="text-base font-bold text-[var(--ink)] font-sans">Web Development Intern @ Briskode Technology Pvt. Ltd.</h4>
            <p className="text-xs text-[var(--muted)] font-sans">
              Built 10+ responsive React and Next.js frontend components, integrated REST APIs, and managed client-side data validation.
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5 text-[10px]">
            {["React.js", "Next.js", "REST APIs", "Tailwind CSS"].map((t) => (
              <span key={t} className="px-2 py-0.5 border border-hairline rounded-xs bg-[var(--surface)] text-[var(--ink)]">
                {t}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default ExperienceSection;
