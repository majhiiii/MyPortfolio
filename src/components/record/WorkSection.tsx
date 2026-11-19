"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronRight, Lock, ExternalLink, Cpu, CheckCircle2, Sparkles, Layers, Rocket } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectDetail {
  id: string;
  name: string;
  badge: string;
  badgeColor: string;
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
    id: "pantero-b2b",
    name: "Pantero B2B Commerce (CloudCraze) & CPQ Quoting",
    badge: "US Client Project",
    badgeColor: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
    shortDesc: "Delivered CloudCraze VFP & Lightning B2B storefront, order splitting, and custom CPQ tiered pricing hooks.",
    tag: "Private · ASSPL",
    chips: ["CloudCraze", "Apex", "LWC", "Sales Cloud"],
    problem:
      "Enterprise buyers required multi-tier volume discounts, order splitting, and quote-to-cash approvals that standard CloudCraze checkout flows could not calculate within governor execution limits.",
    whatIBuilt: [
      "Overrode ccServiceCart and cc_hk_Order pricing hooks with single-pass Apex logic and asynchronous batch queueables.",
      "Built 15+ custom LWC components pixel-matched from Zeplin designs and migrated SEO-deficient CloudCraze pages to Lightning B2B with Google Tag Manager.",
      "Managed user access, licensing, password policies, MFA/SSO coordination, and access audits for internal and community users.",
    ],
    result: {
      number: "~25% Fewer Billing Tickets",
      label: "Resolved order-splitting bottlenecks and automated pricing calculations across high-volume checkout cycles.",
    },
    techList: ["CloudCraze", "Apex Triggers", "LWC", "Sales Cloud", "Google Tag Manager", "Queueable Apex"],
    archDiagram: (
      <svg className="w-full h-32" viewBox="0 0 600 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="25" width="120" height="48" rx="6" fill="#F8FAFC" stroke="#0176D3" strokeWidth="1.5" />
        <text x="70" y="47" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0F172A">Lightning B2B</text>
        <text x="70" y="61" textAnchor="middle" fontSize="9" fill="#64748B">GTM &bull; Storefront</text>

        <path d="M 130 49 L 190 49" stroke="#0176D3" strokeWidth="2" strokeDasharray="4 4" />
        <polygon points="190,49 183,45 183,53" fill="#0176D3" />

        <rect x="195" y="25" width="130" height="48" rx="6" fill="#F8FAFC" stroke="#0176D3" strokeWidth="1.5" />
        <text x="260" y="47" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0F172A">CloudCraze Hooks</text>
        <text x="260" y="61" textAnchor="middle" fontSize="9" fill="#64748B">cc_hk_Order Pricing</text>

        <path d="M 325 49 L 385 49" stroke="#0176D3" strokeWidth="2" strokeDasharray="4 4" />
        <polygon points="385,49 378,45 378,53" fill="#0176D3" />

        <rect x="390" y="25" width="130" height="48" rx="6" fill="#F8FAFC" stroke="#0176D3" strokeWidth="1.5" />
        <text x="455" y="47" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0F172A">Sales Cloud Core</text>
        <text x="455" y="61" textAnchor="middle" fontSize="9" fill="#64748B">Order Split &amp; DML</text>
      </svg>
    ),
  },
  {
    id: "agentforce-suite",
    name: "Agentforce Autonomous Suite & PDF Extraction",
    badge: "AI Automation",
    badgeColor: "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300",
    shortDesc: "4 production Agentforce agents on Experience Cloud (Employee, Guided Shopping, Debug Log, Customer Service) + PDF pipeline.",
    tag: "Private · ASSPL",
    chips: ["Agentforce", "Agent Builder", "Invocable Apex"],
    problem:
      "Support queues suffered from repetitive triage delays, while incoming PDF order documents required manual transcription into CRM records.",
    whatIBuilt: [
      "Designed and deployed 4 production Agentforce agents (Employee, Guided Shopping, Debug Log Analysis, Customer Service) live on Experience Cloud.",
      "Engineered parameterized @InvocableMethod Apex actions and grounded Agent Builder Topics with Einstein Trust Layer PII masking.",
      "Built an automated PDF-extraction pipeline parsing unstructured documents directly into structured Lead and Case records.",
    ],
    result: {
      number: "4 Production Agents &bull; ~40% Faster",
      label: "Cut manual first-response handling time by ~40% across live Experience Cloud support communities.",
    },
    techList: ["Agentforce", "Agent Builder", "Invocable Apex", "Experience Cloud", "Einstein Trust Layer", "ChatGPT API"],
    archDiagram: (
      <svg className="w-full h-32" viewBox="0 0 600 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="25" width="120" height="48" rx="6" fill="#F8FAFC" stroke="#7C3AED" strokeWidth="1.5" />
        <text x="70" y="47" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0F172A">Experience Cloud</text>
        <text x="70" y="61" textAnchor="middle" fontSize="9" fill="#64748B">Customer Chat</text>

        <path d="M 130 49 L 190 49" stroke="#7C3AED" strokeWidth="2" strokeDasharray="4 4" />
        <polygon points="190,49 183,45 183,53" fill="#7C3AED" />

        <rect x="195" y="25" width="130" height="48" rx="6" fill="#F8FAFC" stroke="#7C3AED" strokeWidth="1.5" />
        <text x="260" y="47" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0F172A">4 Agentforce Agents</text>
        <text x="260" y="61" textAnchor="middle" fontSize="9" fill="#64748B">Topics &amp; Invocables</text>

        <path d="M 325 49 L 385 49" stroke="#7C3AED" strokeWidth="2" strokeDasharray="4 4" />
        <polygon points="385,49 378,45 378,53" fill="#7C3AED" />

        <rect x="390" y="25" width="130" height="48" rx="6" fill="#F8FAFC" stroke="#7C3AED" strokeWidth="1.5" />
        <text x="455" y="47" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0F172A">Invocable Apex</text>
        <text x="455" y="61" textAnchor="middle" fontSize="9" fill="#64748B">Record Creation</text>
      </svg>
    ),
  },
  {
    id: "outlook-addin",
    name: "In-House Outlook Add-in for Salesforce",
    badge: "Connected App",
    badgeColor: "bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300",
    shortDesc: "Replaced third-party connectors with multi-org OAuth 2.0 PKCE, dynamic SOQL describeSObjects, and 1-click email logging.",
    tag: "Private · ASSPL",
    chips: ["Office.js", "OAuth PKCE", "Apex REST"],
    problem:
      "Enterprise sales teams relied on costly third-party plugins that suffered from connection dropouts and security exposure of client secrets.",
    whatIBuilt: [
      "Engineered an in-house Office.js add-in with a Connected App using OAuth 2.0 PKCE login supporting any org (production and sandbox) without hardcoded limits.",
      "Built a metadata-discovery layer using Salesforce REST APIs and dynamic describeSObjects to view/edit custom fields inside Outlook.",
      "Added 1-click email logging to Task and EmailMessage records with idempotent deduplication.",
    ],
    result: {
      number: "100% In-House &bull; 0 Secrets",
      label: "Zero client-secret exposure with seamless multi-tenant token exchange and live schema discovery.",
    },
    techList: ["Office.js", "OAuth 2.0 PKCE", "Apex REST", "JavaScript", "describeSObjects", "EmailMessage"],
    archDiagram: (
      <svg className="w-full h-32" viewBox="0 0 600 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="25" width="120" height="48" rx="6" fill="#F8FAFC" stroke="#00A38C" strokeWidth="1.5" />
        <text x="70" y="47" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0F172A">Outlook Client</text>
        <text x="70" y="61" textAnchor="middle" fontSize="9" fill="#64748B">Office.js Add-in</text>

        <path d="M 130 49 L 190 49" stroke="#00A38C" strokeWidth="2" strokeDasharray="4 4" />
        <polygon points="190,49 183,45 183,53" fill="#00A38C" />

        <rect x="195" y="25" width="130" height="48" rx="6" fill="#F8FAFC" stroke="#00A38C" strokeWidth="1.5" />
        <text x="260" y="47" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0F172A">OAuth 2.0 PKCE</text>
        <text x="260" y="61" textAnchor="middle" fontSize="9" fill="#64748B">SHA-256 Verifier</text>

        <path d="M 325 49 L 385 49" stroke="#00A38C" strokeWidth="2" strokeDasharray="4 4" />
        <polygon points="385,49 378,45 378,53" fill="#00A38C" />

        <rect x="390" y="25" width="130" height="48" rx="6" fill="#F8FAFC" stroke="#00A38C" strokeWidth="1.5" />
        <text x="455" y="47" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0F172A">Salesforce Core</text>
        <text x="455" y="61" textAnchor="middle" fontSize="9" fill="#64748B">Dynamic SOQL REST</text>
      </svg>
    ),
  },
  {
    id: "planitrentals-aws",
    name: "Next.js on AWS E-Commerce (planitrentals.com)",
    badge: "Live AWS Architecture",
    badgeColor: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
    shortDesc: "Built the live e-commerce booking flow on AWS Amplify using Salesforce REST APIs with Lambda and RDS (MySQL).",
    tag: "Production · ASSPL",
    chips: ["Next.js", "Amplify", "AWS RDS", "Lambda"],
    problem:
      "A live rental storefront (planitrentals.com) needed item selection, real-time availability checks, and booking confirmation backed by Salesforce CRM records.",
    whatIBuilt: [
      "Engineered the responsive booking flow in Next.js deployed on AWS Amplify with automated GitHub branch previews.",
      "Connected the storefront to Salesforce REST APIs using AWS Lambda microservices for secure inventory reservation.",
      "Provisioned and maintained cloud architecture across 5 AWS services (Amplify, CloudFront, ACM, RDS MySQL, S3) with MySQL/PostgreSQL.",
    ],
    result: {
      number: "Live Storefront &bull; 5 AWS Services",
      label: "Sub-100ms edge response times and 99%+ uptime across automated CI/CD branch deployments.",
    },
    techList: ["AWS Amplify", "CloudFront", "ACM", "Amazon RDS (MySQL)", "AWS Lambda", "Next.js", "Salesforce REST"],
    archDiagram: (
      <svg className="w-full h-32" viewBox="0 0 600 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="25" width="120" height="48" rx="6" fill="#F8FAFC" stroke="#F59E0B" strokeWidth="1.5" />
        <text x="70" y="47" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0F172A">planitrentals.com</text>
        <text x="70" y="61" textAnchor="middle" fontSize="9" fill="#64748B">Next.js on Amplify</text>

        <path d="M 130 49 L 190 49" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 4" />
        <polygon points="190,49 183,45 183,53" fill="#F59E0B" />

        <rect x="195" y="25" width="130" height="48" rx="6" fill="#F8FAFC" stroke="#F59E0B" strokeWidth="1.5" />
        <text x="260" y="47" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0F172A">AWS Lambda &amp; RDS</text>
        <text x="260" y="61" textAnchor="middle" fontSize="9" fill="#64748B">MySQL DB &bull; S3</text>

        <path d="M 325 49 L 385 49" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 4" />
        <polygon points="385,49 378,45 378,53" fill="#F59E0B" />

        <rect x="390" y="25" width="130" height="48" rx="6" fill="#F8FAFC" stroke="#F59E0B" strokeWidth="1.5" />
        <text x="455" y="47" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0F172A">Salesforce CRM</text>
        <text x="455" y="61" textAnchor="middle" fontSize="9" fill="#64748B">Inventory &amp; Booking DML</text>
      </svg>
    ),
  },
  {
    id: "billing-integrations",
    name: "Enterprise Integrations & Financial Sync",
    badge: "10+ Integrations",
    badgeColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
    shortDesc: "Shipped 10+ integrations over REST/SOAP and OAuth: Stripe, PayPal, QuickBooks, CyberSource, GoHighLevel, Heymilo AI, Power BI.",
    tag: "Private · ASSPL",
    chips: ["Stripe", "QuickBooks", "FastAPI", "Power BI"],
    problem:
      "Finance and operations spent over 5 hours per week manually reconciling invoices and syncing candidate data across disjointed tools.",
    whatIBuilt: [
      "Built bidirectional Stripe payment sync, PayPal capture handlers, and CyberSource SOAP tokenization endpoints.",
      "Integrated Heymilo AI, Power BI, QuickBooks, and GoHighLevel with Salesforce via Python services and FastAPI middleware.",
      "Connected live executive Power BI dashboards with real-time SOQL queries, saving ~5 hours/week of manual report preparation.",
    ],
    result: {
      number: "10+ Integrations &bull; ~5 Hrs/Wk Saved",
      label: "Automated manual reconciliation and cut recurring production issues by ~30% with 99%+ uptime via GitHub CI/CD.",
    },
    techList: ["Stripe API", "QuickBooks Online", "FastAPI", "Python", "Power BI", "CyberSource", "GoHighLevel"],
    archDiagram: (
      <svg className="w-full h-32" viewBox="0 0 600 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="25" width="120" height="48" rx="6" fill="#F8FAFC" stroke="#10B981" strokeWidth="1.5" />
        <text x="70" y="47" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0F172A">Stripe / QBO / APIs</text>
        <text x="70" y="61" textAnchor="middle" fontSize="9" fill="#64748B">Payment &amp; CRM Sync</text>

        <path d="M 130 49 L 190 49" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4" />
        <polygon points="190,49 183,45 183,53" fill="#10B981" />

        <rect x="195" y="25" width="130" height="48" rx="6" fill="#F8FAFC" stroke="#10B981" strokeWidth="1.5" />
        <text x="260" y="47" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0F172A">FastAPI Middleware</text>
        <text x="260" y="61" textAnchor="middle" fontSize="9" fill="#64748B">Signed Webhooks</text>

        <path d="M 325 49 L 385 49" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4" />
        <polygon points="385,49 378,45 378,53" fill="#10B981" />

        <rect x="390" y="25" width="130" height="48" rx="6" fill="#F8FAFC" stroke="#10B981" strokeWidth="1.5" />
        <text x="455" y="47" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0F172A">Power BI &amp; CRM</text>
        <text x="455" y="61" textAnchor="middle" fontSize="9" fill="#64748B">Automated Ledger</text>
      </svg>
    ),
  },
  {
    id: "biznusoft-alt",
    name: "Building Biznusoft Alternative (Equipment Rental ERP)",
    badge: "Active In-Flight Build",
    badgeColor: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300",
    shortDesc: "Architecting a modern cloud alternative to Biznusoft for equipment rental, asset lifecycle tracking, and automated CPQ quoting.",
    tag: "Independent · 2026",
    chips: ["Next.js", "Salesforce", "Python", "Cloud ERP"],
    problem:
      "Legacy rental ERPs like Biznusoft suffer from rigid UX, complex multi-day quote turnarounds, and fragmented maintenance telemetry.",
    whatIBuilt: [
      "Architected real-time fleet availability calendars and dynamic multi-tier rental rate engines.",
      "Designed seamless dispatch and asset lifecycle tracking mapping directly into Salesforce Service & Asset objects.",
      "Built a modern full-stack quoting interface designed for instant mobile and desktop equipment reservations.",
    ],
    result: {
      number: "Next-Gen Cloud ERP",
      label: "Modernizing asset management and field equipment operations with instant quoting.",
    },
    techList: ["Next.js", "Python FastAPI", "Salesforce Platform", "PostgreSQL", "AWS S3", "LWC"],
    archDiagram: (
      <svg className="w-full h-32" viewBox="0 0 600 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="25" width="120" height="48" rx="6" fill="#F8FAFC" stroke="#EF4444" strokeWidth="1.5" />
        <text x="70" y="47" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0F172A">Rental Portal</text>
        <text x="70" y="61" textAnchor="middle" fontSize="9" fill="#64748B">Fleet &amp; Availability</text>

        <path d="M 130 49 L 190 49" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 4" />
        <polygon points="190,49 183,45 183,53" fill="#EF4444" />

        <rect x="195" y="25" width="130" height="48" rx="6" fill="#F8FAFC" stroke="#EF4444" strokeWidth="1.5" />
        <text x="260" y="47" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0F172A">CPQ Rental Engine</text>
        <text x="260" y="61" textAnchor="middle" fontSize="9" fill="#64748B">Tiered Rate Rules</text>

        <path d="M 325 49 L 385 49" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 4" />
        <polygon points="385,49 378,45 378,53" fill="#EF4444" />

        <rect x="390" y="25" width="130" height="48" rx="6" fill="#F8FAFC" stroke="#EF4444" strokeWidth="1.5" />
        <text x="455" y="47" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0F172A">Cloud ERP Backend</text>
        <text x="455" y="61" textAnchor="middle" fontSize="9" fill="#64748B">Asset Telemetry</text>
      </svg>
    ),
  },
];

export function WorkSection() {
  const [expandedId, setExpandedId] = useState<string | null>("pantero-b2b");

  const toggleRow = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="work" className="space-y-3 pt-4">
      {/* Title & Plain Line */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--ink)]">
            Work
          </h2>
          <p className="text-xs text-[var(--muted)]">
            Built at ASSPL &amp; Active Independent Projects. Source and live systems are private; walkthroughs use sample data.
          </p>
        </div>
        <span className="text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold">
          6 Enterprise Systems
        </span>
      </div>

      {/* Table-Style List of 6 Projects - Compact, Colorful, High Density */}
      <div className="rounded-lg bg-[var(--surface)] border border-hairline divide-y divide-hairline overflow-hidden shadow-xs transition-colors">
        {SIX_PROJECTS.map((project) => {
          const isOpen = expandedId === project.id;

          return (
            <div key={project.id} className="transition-colors">
              {/* Row Header */}
              <button
                onClick={() => toggleRow(project.id)}
                className={`w-full text-left p-3.5 sm:p-4 flex flex-col md:flex-row md:items-center justify-between gap-2.5 cursor-pointer transition-all ${
                  isOpen
                    ? "bg-slate-50/80 dark:bg-slate-900/40 border-l-4 border-l-[#0176D3]"
                    : "hover:bg-[var(--surface-alt)] border-l-4 border-l-transparent"
                }`}
              >
                <div className="space-y-1 md:max-w-xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-sm sm:text-[15px] text-[var(--ink)]">
                      {project.name}
                    </span>
                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-xs ${project.badgeColor}`}>
                      {project.badge}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-xs bg-[var(--surface-alt)] text-[var(--muted)] border border-hairline shrink-0">
                      {project.tag}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--muted)] line-clamp-1">
                    {project.shortDesc}
                  </p>
                </div>

                {/* Right Meta: Tech Chips + Chevron */}
                <div className="flex items-center gap-2.5 shrink-0">
                  <div className="hidden sm:flex items-center gap-1 text-[10px] font-mono">
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
                      <ChevronDown className="w-4 h-4 text-[#0176D3]" />
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
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="overflow-hidden bg-[var(--surface)] border-t border-hairline px-4 sm:px-6 py-4 space-y-4"
                  >
                    {/* Problem & What I Built */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                      
                      <div className="md:col-span-5 space-y-1">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--muted)] block font-semibold">
                          Business Context // Problem
                        </span>
                        <p className="text-xs sm:text-[13px] text-[var(--ink)] leading-relaxed">
                          {project.problem}
                        </p>
                      </div>

                      <div className="md:col-span-7 space-y-1">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--muted)] block font-semibold">
                          What I Built &bull; Engineering Scope
                        </span>
                        <ul className="space-y-1 text-xs sm:text-[13px] text-[var(--ink)]">
                          {project.whatIBuilt.map((bullet, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#0176D3] shrink-0 mt-1.5" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                    </div>

                    {/* Verified Result Metric */}
                    <div className="p-3 rounded-md bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/80 dark:border-blue-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div>
                        <span className="font-bold text-xs sm:text-sm text-[#0176D3] block">
                          {project.result.number}
                        </span>
                        <span className="text-[11px] text-[var(--muted)]">
                          {project.result.label}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-1 font-mono text-[10px]">
                        {project.techList.map((t, idx) => (
                          <span
                            key={idx}
                            className="px-1.5 py-0.5 rounded-xs bg-[var(--surface)] border border-hairline text-[var(--ink)]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Architecture Flow */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--muted)] block font-semibold">
                        Architecture Flow
                      </span>
                      <div className="rounded-md border border-hairline bg-[var(--surface-alt)] p-2.5 flex items-center justify-center overflow-x-auto">
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
