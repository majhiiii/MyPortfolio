"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronRight, Lock, ExternalLink, Cpu, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectDetail {
  id: string;
  name: string;
  shortDesc: string;
  tag: string;
  chips: string[];
  problem: string;
  whatIBuilt: string[];
  result: {
    number: string;
    label: string;
  };
  techList: string[];
  archDiagram: React.ReactNode;
}

const SIX_PROJECTS: ProjectDetail[] = [
  {
    id: "b2b-commerce",
    name: "B2B Commerce Platform & Custom CPQ Quoting",
    shortDesc: "Extended CloudCraze cart, tiered volume pricing hooks, and single-page bulk checkout.",
    tag: "Private · ASSPL",
    chips: ["CloudCraze", "Apex", "LWC"],
    problem:
      "Enterprise buyers required complex tiered discounts and bulk order workflows that standard CloudCraze checkout flows could not calculate within governor execution limits.",
    whatIBuilt: [
      "Overrode ccServiceCart and cc_hk_Order pricing hooks with optimized single-pass Apex calculations.",
      "Engineered an interactive 15+ component Lightning Web Component bulk configurator pixel-matched from designs.",
      "Implemented asynchronous batch queueables to offload order post-processing and inventory validation.",
    ],
    result: {
      number: "3 Concurrent Projects",
      label: "Successfully architected and maintained across high-volume production release cycles.",
    },
    techList: ["CloudCraze", "Apex Triggers", "LWC", "SOQL", "Queueable Apex", "Sales Cloud"],
    archDiagram: (
      <svg className="w-full h-36" viewBox="0 0 600 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="35" width="120" height="50" rx="6" fill="#FFFBF2" stroke="#E3D6BD" strokeWidth="1.5" />
        <text x="70" y="58" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1A1410">LWC Storefront</text>
        <text x="70" y="73" textAnchor="middle" fontSize="9" fill="#6B5D4F">Bulk Configurator</text>

        <path d="M 130 60 L 190 60" stroke="#1F2A5C" strokeWidth="2" strokeDasharray="4 4" />
        <polygon points="190,60 183,56 183,64" fill="#1F2A5C" />

        <rect x="195" y="35" width="130" height="50" rx="6" fill="#FFFBF2" stroke="#E3D6BD" strokeWidth="1.5" />
        <text x="260" y="58" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1A1410">CloudCraze Hooks</text>
        <text x="260" y="73" textAnchor="middle" fontSize="9" fill="#6B5D4F">cc_hk_Order Pricing</text>

        <path d="M 325 60 L 385 60" stroke="#1F2A5C" strokeWidth="2" strokeDasharray="4 4" />
        <polygon points="385,60 378,56 378,64" fill="#1F2A5C" />

        <rect x="390" y="35" width="130" height="50" rx="6" fill="#FFFBF2" stroke="#E3D6BD" strokeWidth="1.5" />
        <text x="455" y="58" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1A1410">Queueable Apex</text>
        <text x="455" y="73" textAnchor="middle" fontSize="9" fill="#6B5D4F">Order DML &amp; Inventory</text>
      </svg>
    ),
  },
  {
    id: "outlook-addin",
    name: "In-House Outlook Add-in for Salesforce",
    shortDesc: "Office.js add-in executing cryptographic OAuth 2.0 PKCE to log emails directly to Contact records.",
    tag: "Private · ASSPL",
    chips: ["Office.js", "OAuth PKCE", "Apex REST"],
    problem:
      "Enterprise sales teams spent excessive manual hours re-entering email correspondence and meetings into Salesforce without client-secret security exposure.",
    whatIBuilt: [
      "Engineered an in-house Office.js add-in supporting Outlook Desktop and Web.",
      "Implemented a secure OAuth 2.0 PKCE authorization flow generating SHA-256 code challenges directly in browser memory.",
      "Built dynamic Apex REST endpoints describing SObjects to log emails and create Activity timeline records with one click.",
    ],
    result: {
      number: "1-Click Sync",
      label: "Zero client-secret exposure across multi-org public client authorization.",
    },
    techList: ["Office.js", "OAuth 2.0 PKCE", "Web Crypto API", "Apex REST", "JavaScript", "describeSObjects"],
    archDiagram: (
      <svg className="w-full h-36" viewBox="0 0 600 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="35" width="120" height="50" rx="6" fill="#FFFBF2" stroke="#E3D6BD" strokeWidth="1.5" />
        <text x="70" y="58" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1A1410">Office.js Add-in</text>
        <text x="70" y="73" textAnchor="middle" fontSize="9" fill="#6B5D4F">Outlook Desktop/Web</text>

        <path d="M 130 60 L 190 60" stroke="#1F2A5C" strokeWidth="2" strokeDasharray="4 4" />
        <polygon points="190,60 183,56 183,64" fill="#1F2A5C" />

        <rect x="195" y="35" width="130" height="50" rx="6" fill="#FFFBF2" stroke="#E3D6BD" strokeWidth="1.5" />
        <text x="260" y="58" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1A1410">OAuth 2.0 PKCE</text>
        <text x="260" y="73" textAnchor="middle" fontSize="9" fill="#6B5D4F">SHA-256 Verifier</text>

        <path d="M 325 60 L 385 60" stroke="#1F2A5C" strokeWidth="2" strokeDasharray="4 4" />
        <polygon points="385,60 378,56 378,64" fill="#1F2A5C" />

        <rect x="390" y="35" width="130" height="50" rx="6" fill="#FFFBF2" stroke="#E3D6BD" strokeWidth="1.5" />
        <text x="455" y="58" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1A1410">Salesforce Core</text>
        <text x="455" y="73" textAnchor="middle" fontSize="9" fill="#6B5D4F">describeSObjects REST</text>
      </svg>
    ),
  },
  {
    id: "agentforce-suite",
    name: "Agentforce Suite & PDF Extraction Pipeline",
    shortDesc: "Autonomous Agentforce agents on Experience Cloud with automated document extraction to Salesforce records.",
    tag: "Private · ASSPL",
    chips: ["Agentforce", "Einstein Bots", "Invocable Apex"],
    problem:
      "Support queues experienced recurring backlogs during peak intake, while inbound PDF order forms required tedious manual transcription by agents.",
    whatIBuilt: [
      "Configured 4 production Agentforce agents using Agent Builder with custom Topics, instructions, and Invocable Apex actions.",
      "Applied Einstein Trust Layer guardrails and PII masking for customer privacy across multi-turn sessions.",
      "Engineered an automated PDF parsing pipeline mapping unstructured document tables into structured Case and Lead records.",
    ],
    result: {
      number: "4 Production Agents",
      label: "~40% faster first response resolution time on Experience Cloud customer triage.",
    },
    techList: ["Agentforce", "Agent Builder", "Invocable Apex", "Experience Cloud", "Einstein Trust Layer", "Flow Builder"],
    archDiagram: (
      <svg className="w-full h-36" viewBox="0 0 600 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="35" width="120" height="50" rx="6" fill="#FFFBF2" stroke="#E3D6BD" strokeWidth="1.5" />
        <text x="70" y="58" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1A1410">Experience Cloud</text>
        <text x="70" y="73" textAnchor="middle" fontSize="9" fill="#6B5D4F">Customer Portal Chat</text>

        <path d="M 130 60 L 190 60" stroke="#6B4EFF" strokeWidth="2" strokeDasharray="4 4" />
        <polygon points="190,60 183,56 183,64" fill="#6B4EFF" />

        <rect x="195" y="35" width="130" height="50" rx="6" fill="#FFFBF2" stroke="#E3D6BD" strokeWidth="1.5" />
        <text x="260" y="58" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1A1410">Agent Builder</text>
        <text x="260" y="73" textAnchor="middle" fontSize="9" fill="#6B5D4F">Topics &amp; Invocables</text>

        <path d="M 325 60 L 385 60" stroke="#6B4EFF" strokeWidth="2" strokeDasharray="4 4" />
        <polygon points="385,60 378,56 378,64" fill="#6B4EFF" />

        <rect x="390" y="35" width="130" height="50" rx="6" fill="#FFFBF2" stroke="#E3D6BD" strokeWidth="1.5" />
        <text x="455" y="58" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1A1410">Invocable Apex</text>
        <text x="455" y="73" textAnchor="middle" fontSize="9" fill="#6B5D4F">Case Creation &amp; DML</text>
      </svg>
    ),
  },
  {
    id: "health-cloud",
    name: "Health Cloud Patient Intake & Einstein Bots",
    shortDesc: "Patient onboarding flows, clinical timeline tracking, and automated service triage.",
    tag: "Private · ASSPL",
    chips: ["Health Cloud", "Service Cloud", "Flows"],
    problem:
      "Patient onboarding and follow-up tracking required coordination across disparate case teams without automated escalation or skill-based dispatch.",
    whatIBuilt: [
      "Built multi-step screen Flows and automated case escalation matrices on Health Cloud and Service Cloud.",
      "Configured Einstein Bots with structured dialog trees and fallback human transfer handlers.",
      "Maintained legacy interfaces while modernizing key intake components into Lightning Web Components.",
    ],
    result: {
      number: "~30% Fewer Issues",
      label: "99%+ operational uptime achieved across high-volume service queues.",
    },
    techList: ["Health Cloud", "Service Cloud", "Einstein Bots", "Screen Flows", "LWC", "Validation Rules"],
    archDiagram: (
      <svg className="w-full h-36" viewBox="0 0 600 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="35" width="120" height="50" rx="6" fill="#FFFBF2" stroke="#E3D6BD" strokeWidth="1.5" />
        <text x="70" y="58" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1A1410">Patient Portal</text>
        <text x="70" y="73" textAnchor="middle" fontSize="9" fill="#6B5D4F">Intake Screen Flow</text>

        <path d="M 130 60 L 190 60" stroke="#0176D3" strokeWidth="2" strokeDasharray="4 4" />
        <polygon points="190,60 183,56 183,64" fill="#0176D3" />

        <rect x="195" y="35" width="130" height="50" rx="6" fill="#FFFBF2" stroke="#E3D6BD" strokeWidth="1.5" />
        <text x="260" y="58" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1A1410">Einstein Bot</text>
        <text x="260" y="73" textAnchor="middle" fontSize="9" fill="#6B5D4F">NLP Triage &amp; Intent</text>

        <path d="M 325 60 L 385 60" stroke="#0176D3" strokeWidth="2" strokeDasharray="4 4" />
        <polygon points="385,60 378,56 378,64" fill="#0176D3" />

        <rect x="390" y="35" width="130" height="50" rx="6" fill="#FFFBF2" stroke="#E3D6BD" strokeWidth="1.5" />
        <text x="455" y="58" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1A1410">Health Cloud Core</text>
        <text x="455" y="73" textAnchor="middle" fontSize="9" fill="#6B5D4F">Care Plan &amp; Timelines</text>
      </svg>
    ),
  },
  {
    id: "billing-integrations",
    name: "Enterprise Billing Integrations & Financial Sync",
    shortDesc: "Payment gateway webhooks and real-time reconciliation across Stripe, PayPal, QuickBooks, CyberSource, and Power BI.",
    tag: "Private · ASSPL",
    chips: ["Stripe", "QuickBooks", "REST Webhooks"],
    problem:
      "Finance and support teams had to manually reconcile customer invoice status between Salesforce, payment processors, and accounting software.",
    whatIBuilt: [
      "Constructed signed webhook receivers and custom Apex REST handlers for Stripe, PayPal, and CyberSource.",
      "Built two-way OAuth 2.0 REST synchronization with QuickBooks Online for automatic invoice matching.",
      "Connected executive Power BI dashboards to Salesforce via optimized indexed SOQL queries.",
    ],
    result: {
      number: "10+ Integrations",
      label: "~25% fewer billing tickets and ~5 hours/week saved by automated Power BI reporting.",
    },
    techList: ["Apex REST", "Stripe API", "PayPal API", "QuickBooks Online", "CyberSource", "Power BI", "GoHighLevel"],
    archDiagram: (
      <svg className="w-full h-36" viewBox="0 0 600 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="35" width="120" height="50" rx="6" fill="#FFFBF2" stroke="#E3D6BD" strokeWidth="1.5" />
        <text x="70" y="58" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1A1410">Payment Gateways</text>
        <text x="70" y="73" textAnchor="middle" fontSize="9" fill="#6B5D4F">Stripe / PayPal / QBO</text>

        <path d="M 130 60 L 190 60" stroke="#00A38C" strokeWidth="2" strokeDasharray="4 4" />
        <polygon points="190,60 183,56 183,64" fill="#00A38C" />

        <rect x="195" y="35" width="130" height="50" rx="6" fill="#FFFBF2" stroke="#E3D6BD" strokeWidth="1.5" />
        <text x="260" y="58" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1A1410">Apex @RestResource</text>
        <text x="260" y="73" textAnchor="middle" fontSize="9" fill="#6B5D4F">Signature Verification</text>

        <path d="M 325 60 L 385 60" stroke="#00A38C" strokeWidth="2" strokeDasharray="4 4" />
        <polygon points="385,60 378,56 378,64" fill="#00A38C" />

        <rect x="390" y="35" width="130" height="50" rx="6" fill="#FFFBF2" stroke="#E3D6BD" strokeWidth="1.5" />
        <text x="455" y="58" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1A1410">Ledger Records</text>
        <text x="455" y="73" textAnchor="middle" fontSize="9" fill="#6B5D4F">Power BI Sync</text>
      </svg>
    ),
  },
  {
    id: "aws-cloud",
    name: "Next.js on AWS Cloud Infrastructure",
    shortDesc: "Automated Amplify deployments, CloudFront edge caching, ACM SSL certificates, and RDS MySQL on AWS.",
    tag: "Private · ASSPL",
    chips: ["Next.js", "Amplify", "AWS RDS"],
    problem:
      "Client web applications required high-performance serverless deployment, automated branch preview pipelines, and secure database connectivity on AWS.",
    whatIBuilt: [
      "Configured AWS Amplify hosting with automated GitHub CI/CD branch deployment workflows.",
      "Provisioned AWS CloudFront edge distributions with custom cache policies and automated ACM SSL certificates.",
      "Engineered backend REST endpoints connecting AWS Lambda functions to managed Amazon RDS (MySQL) instances.",
    ],
    result: {
      number: "4 Junior Devs",
      label: "Mentored in modern cloud infrastructure, Next.js architecture, and git release standards.",
    },
    techList: ["AWS Amplify", "CloudFront", "ACM", "Amazon RDS (MySQL)", "AWS Lambda", "Next.js", "S3"],
    archDiagram: (
      <svg className="w-full h-36" viewBox="0 0 600 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="35" width="120" height="50" rx="6" fill="#FFFBF2" stroke="#E3D6BD" strokeWidth="1.5" />
        <text x="70" y="58" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1A1410">Route 53 &amp; ACM</text>
        <text x="70" y="73" textAnchor="middle" fontSize="9" fill="#6B5D4F">DNS &amp; SSL Validation</text>

        <path d="M 130 60 L 190 60" stroke="#FF8A1F" strokeWidth="2" strokeDasharray="4 4" />
        <polygon points="190,60 183,56 183,64" fill="#FF8A1F" />

        <rect x="195" y="35" width="130" height="50" rx="6" fill="#FFFBF2" stroke="#E3D6BD" strokeWidth="1.5" />
        <text x="260" y="58" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1A1410">Amplify / CloudFront</text>
        <text x="260" y="73" textAnchor="middle" fontSize="9" fill="#6B5D4F">Edge Static Hosting</text>

        <path d="M 325 60 L 385 60" stroke="#FF8A1F" strokeWidth="2" strokeDasharray="4 4" />
        <polygon points="385,60 378,56 378,64" fill="#FF8A1F" />

        <rect x="390" y="35" width="130" height="50" rx="6" fill="#FFFBF2" stroke="#E3D6BD" strokeWidth="1.5" />
        <text x="455" y="58" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1A1410">RDS MySQL &amp; Lambda</text>
        <text x="455" y="73" textAnchor="middle" fontSize="9" fill="#6B5D4F">Managed Relational DB</text>
      </svg>
    ),
  },
];

export function WorkSection() {
  const [expandedId, setExpandedId] = useState<string | null>("b2b-commerce");

  const toggleRow = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="work" className="space-y-4 pt-10 pb-12">
      {/* Title & Plain Disclaimer Line */}
      <div className="space-y-1">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--ink)]">
          Work
        </h2>
        <p className="text-xs sm:text-sm text-[var(--muted)]">
          Built at ASSPL. Source and live systems are private; walkthroughs use sample data.
        </p>
      </div>

      {/* Table-Style List of 6 Projects */}
      <div className="rounded-lg bg-[var(--surface)] border border-hairline divide-y divide-hairline overflow-hidden shadow-2xs transition-colors">
        {SIX_PROJECTS.map((project) => {
          const isOpen = expandedId === project.id;

          return (
            <div key={project.id} className="transition-colors">
              {/* Row Header */}
              <button
                onClick={() => toggleRow(project.id)}
                className={`w-full text-left p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3 cursor-pointer transition-all ${
                  isOpen
                    ? "bg-[var(--bg)] border-l-4 border-l-[var(--turmeric)]"
                    : "hover:bg-[var(--bg)]/50 border-l-4 border-l-transparent"
                }`}
              >
                <div className="space-y-1 md:max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm sm:text-base text-[var(--ink)]">
                      {project.name}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-xs bg-[var(--bg)] text-[var(--muted)] border border-hairline shrink-0">
                      {project.tag}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--muted)] line-clamp-1">
                    {project.shortDesc}
                  </p>
                </div>

                {/* Right Meta: 3 Tech Chips + Chevron */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono">
                    {project.chips.map((chip, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-xs border border-hairline bg-[var(--surface)] text-[var(--ink)]"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>

                  <div className="text-[var(--muted)]">
                    {isOpen ? (
                      <ChevronDown className="w-4 h-4 text-[var(--ink)]" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </button>

              {/* Inline Record Detail Expansion */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden bg-[var(--surface)] border-t border-hairline px-4 sm:px-6 py-6 space-y-6"
                  >
                    {/* Two-Column Problem & What I Built */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                      
                      <div className="md:col-span-5 space-y-2">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--muted)] block">
                          Problem
                        </span>
                        <p className="text-xs sm:text-sm text-[var(--ink)] leading-relaxed">
                          {project.problem}
                        </p>
                      </div>

                      <div className="md:col-span-7 space-y-2">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--muted)] block">
                          What I Built
                        </span>
                        <ul className="space-y-1.5 text-xs sm:text-sm text-[var(--ink)]">
                          {project.whatIBuilt.map((bullet, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[var(--turmeric)] shrink-0 mt-2" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                    </div>

                    {/* Highlighted Figure & Result Metric */}
                    <div className="p-3.5 rounded-md bg-[var(--bg)] border border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div>
                        <span className="font-semibold text-sm text-[var(--indigo)] block">
                          {project.result.number}
                        </span>
                        <span className="text-[11px] text-[var(--muted)]">
                          {project.result.label}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px]">
                        {project.techList.map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-xs bg-[var(--surface)] border border-hairline text-[var(--muted)]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Project Architecture Diagram */}
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--muted)] block">
                        Architecture Flow
                      </span>
                      <div className="rounded-md border border-hairline bg-[var(--bg)] p-3 flex items-center justify-center overflow-x-auto">
                        {project.archDiagram}
                      </div>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
