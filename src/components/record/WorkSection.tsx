"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronRight, Lock } from "lucide-react";
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
    id: "us-b2b-commerce",
    name: "US B2B Client (CloudCraze) & CPQ Quoting",
    badge: "US Client Project",
    badgeColor: "bg-blue-100 text-blue-950 dark:bg-blue-950 dark:text-blue-200 border-blue-300 dark:border-blue-800",
    shortDesc: "Delivered CloudCraze VFP & Lightning B2B storefront, order splitting, and custom CPQ tiered pricing hooks.",
    tag: "Private · ASSPL",
    chips: ["CloudCraze", "Apex", "LWC", "Sales Cloud"],
    problem:
      "Enterprise buyers required multi-tier volume discounts, order splitting, and quote-to-cash approvals that standard checkout flows could not calculate within governor execution limits.",
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
      <svg className="w-full h-28" viewBox="0 0 600 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="25" width="120" height="48" rx="8" fill="var(--surface)" stroke="var(--indigo)" strokeWidth="1.5" />
        <text x="70" y="47" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--ink)">Lightning B2B</text>
        <text x="70" y="61" textAnchor="middle" fontSize="9" fill="var(--muted)">GTM &bull; Storefront</text>

        <path d="M 130 49 L 190 49" stroke="var(--indigo)" strokeWidth="2" strokeDasharray="4 4" />
        <polygon points="190,49 183,45 183,53" fill="var(--indigo)" />

        <rect x="195" y="25" width="130" height="48" rx="8" fill="var(--surface)" stroke="var(--indigo)" strokeWidth="1.5" />
        <text x="260" y="47" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--ink)">CloudCraze Hooks</text>
        <text x="260" y="61" textAnchor="middle" fontSize="9" fill="var(--muted)">cc_hk_Order Pricing</text>

        <path d="M 325 49 L 385 49" stroke="var(--indigo)" strokeWidth="2" strokeDasharray="4 4" />
        <polygon points="385,49 378,45 378,53" fill="var(--indigo)" />

        <rect x="390" y="25" width="130" height="48" rx="8" fill="var(--surface)" stroke="var(--indigo)" strokeWidth="1.5" />
        <text x="455" y="47" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--ink)">Sales Cloud Core</text>
        <text x="455" y="61" textAnchor="middle" fontSize="9" fill="var(--muted)">Order Split &amp; DML</text>
      </svg>
    ),
  },
  {
    id: "agentforce-suite",
    name: "Agentforce Autonomous Suite & PDF Extraction",
    badge: "AI Automation",
    badgeColor: "bg-purple-100 text-purple-950 dark:bg-purple-950 dark:text-purple-200 border-purple-300 dark:border-purple-800",
    shortDesc: "4 production Agentforce agents on Experience Cloud (Employee, Guided Shopping, Debug Log, Customer Service) + PDF pipeline.",
    tag: "Private · ASSPL",
    chips: ["Agentforce", "Agent Builder", "Invocable Apex"],
    problem:
      "Support queues suffered from repetitive triage delays, while incoming PDF order documents required manual transcription into CRM records.",
    whatIBuilt: [
      "Designed and deployed 4 production Agentforce agents (Employee, Guided Shopping, Debug Log Analysis, Customer Service) live on Experience Cloud.",
      "Engineered parameterized @InvocableMethod Apex actions and grounded Agent Builder Topics with Einstein Trust Layer guardrails.",
      "Built an automated PDF-extraction pipeline parsing unstructured documents directly into structured Lead and Case records.",
    ],
    result: {
      number: "4 Production Agents · ~40% Faster",
      label: "Cut manual first-response handling time by ~40% across live Experience Cloud support communities.",
    },
    techList: ["Agentforce", "Agent Builder", "Invocable Apex", "Experience Cloud", "Einstein Trust Layer", "ChatGPT API"],
    archDiagram: (
      <svg className="w-full h-28" viewBox="0 0 600 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="25" width="120" height="48" rx="8" fill="var(--surface)" stroke="#7C3AED" strokeWidth="1.5" />
        <text x="70" y="47" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--ink)">Experience Cloud</text>
        <text x="70" y="61" textAnchor="middle" fontSize="9" fill="var(--muted)">Customer Chat</text>

        <path d="M 130 49 L 190 49" stroke="#7C3AED" strokeWidth="2" strokeDasharray="4 4" />
        <polygon points="190,49 183,45 183,53" fill="#7C3AED" />

        <rect x="195" y="25" width="130" height="48" rx="8" fill="var(--surface)" stroke="#7C3AED" strokeWidth="1.5" />
        <text x="260" y="47" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--ink)">4 Agentforce Agents</text>
        <text x="260" y="61" textAnchor="middle" fontSize="9" fill="var(--muted)">Topics &amp; Invocables</text>

        <path d="M 325 49 L 385 49" stroke="#7C3AED" strokeWidth="2" strokeDasharray="4 4" />
        <polygon points="385,49 378,45 378,53" fill="#7C3AED" />

        <rect x="390" y="25" width="130" height="48" rx="8" fill="var(--surface)" stroke="#7C3AED" strokeWidth="1.5" />
        <text x="455" y="47" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--ink)">Invocable Apex</text>
        <text x="455" y="61" textAnchor="middle" fontSize="9" fill="var(--muted)">Record Creation</text>
      </svg>
    ),
  },
  {
    id: "outlook-addin",
    name: "In-House Outlook Add-in for Salesforce",
    badge: "Connected App",
    badgeColor: "bg-teal-100 text-teal-950 dark:bg-teal-950 dark:text-teal-200 border-teal-300 dark:border-teal-800",
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
      number: "100% In-House · 0 Secrets",
      label: "Zero client-secret exposure with seamless multi-tenant token exchange and live schema discovery.",
    },
    techList: ["Office.js", "OAuth 2.0 PKCE", "Apex REST", "JavaScript", "describeSObjects", "EmailMessage"],
    archDiagram: (
      <svg className="w-full h-28" viewBox="0 0 600 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="25" width="120" height="48" rx="8" fill="var(--surface)" stroke="#00A38C" strokeWidth="1.5" />
        <text x="70" y="47" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--ink)">Outlook Client</text>
        <text x="70" y="61" textAnchor="middle" fontSize="9" fill="var(--muted)">Office.js Add-in</text>

        <path d="M 130 49 L 190 49" stroke="#00A38C" strokeWidth="2" strokeDasharray="4 4" />
        <polygon points="190,49 183,45 183,53" fill="#00A38C" />

        <rect x="195" y="25" width="130" height="48" rx="8" fill="var(--surface)" stroke="#00A38C" strokeWidth="1.5" />
        <text x="260" y="47" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--ink)">OAuth 2.0 PKCE</text>
        <text x="260" y="61" textAnchor="middle" fontSize="9" fill="var(--muted)">SHA-256 Verifier</text>

        <path d="M 325 49 L 385 49" stroke="#00A38C" strokeWidth="2" strokeDasharray="4 4" />
        <polygon points="385,49 378,45 378,53" fill="#00A38C" />

        <rect x="390" y="25" width="130" height="48" rx="8" fill="var(--surface)" stroke="#00A38C" strokeWidth="1.5" />
        <text x="455" y="47" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--ink)">Salesforce Core</text>
        <text x="455" y="61" textAnchor="middle" fontSize="9" fill="var(--muted)">Dynamic SOQL REST</text>
      </svg>
    ),
  },
  {
    id: "booking-aws",
    name: "Live E-Commerce Equipment Booking Platform (AWS & Next.js)",
    badge: "Cloud Architecture",
    badgeColor: "bg-amber-100 text-amber-950 dark:bg-amber-950 dark:text-amber-200 border-amber-300 dark:border-amber-800",
    shortDesc: "Built the live e-commerce booking flow on AWS Amplify using Salesforce REST APIs with Lambda and RDS (MySQL).",
    tag: "Production · ASSPL",
    chips: ["Next.js", "Amplify", "AWS RDS", "Lambda"],
    problem:
      "A live rental storefront needed item selection, real-time availability checks, and booking confirmation backed by Salesforce CRM records.",
    whatIBuilt: [
      "Engineered the responsive booking flow in Next.js deployed on AWS Amplify with automated GitHub branch previews.",
      "Connected the storefront to Salesforce REST APIs using AWS Lambda microservices for secure inventory reservation.",
      "Provisioned and maintained cloud architecture across 5 AWS services (Amplify, CloudFront, ACM, RDS MySQL, S3) with MySQL/PostgreSQL.",
    ],
    result: {
      number: "Live Storefront · 5 AWS Services",
      label: "Sub-100ms edge response times and 99%+ uptime across automated CI/CD branch deployments.",
    },
    techList: ["AWS Amplify", "CloudFront", "ACM", "Amazon RDS (MySQL)", "AWS Lambda", "Next.js", "Salesforce REST"],
    archDiagram: (
      <svg className="w-full h-28" viewBox="0 0 600 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="25" width="120" height="48" rx="8" fill="var(--surface)" stroke="#F59E0B" strokeWidth="1.5" />
        <text x="70" y="47" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--ink)">Live Storefront</text>
        <text x="70" y="61" textAnchor="middle" fontSize="9" fill="var(--muted)">Next.js on Amplify</text>

        <path d="M 130 49 L 190 49" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 4" />
        <polygon points="190,49 183,45 183,53" fill="#F59E0B" />

        <rect x="195" y="25" width="130" height="48" rx="8" fill="var(--surface)" stroke="#F59E0B" strokeWidth="1.5" />
        <text x="260" y="47" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--ink)">AWS Lambda &amp; RDS</text>
        <text x="260" y="61" textAnchor="middle" fontSize="9" fill="var(--muted)">MySQL DB &bull; S3</text>

        <path d="M 325 49 L 385 49" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 4" />
        <polygon points="385,49 378,45 378,53" fill="#F59E0B" />

        <rect x="390" y="25" width="130" height="48" rx="8" fill="var(--surface)" stroke="#F59E0B" strokeWidth="1.5" />
        <text x="455" y="47" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--ink)">Salesforce CRM</text>
        <text x="455" y="61" textAnchor="middle" fontSize="9" fill="var(--muted)">Inventory &amp; Booking DML</text>
      </svg>
    ),
  },
  {
    id: "billing-integrations",
    name: "Enterprise Integrations & Financial Sync",
    badge: "10+ Integrations",
    badgeColor: "bg-emerald-100 text-emerald-950 dark:bg-emerald-950 dark:text-emerald-200 border-emerald-300 dark:border-emerald-800",
    shortDesc: "Shipped 10+ integrations over REST/SOAP and OAuth: Stripe, PayPal, QuickBooks, CyberSource, GoHighLevel, Heymilo AI, Power BI.",
    tag: "Private · ASSPL",
    chips: ["Stripe", "QuickBooks", "FastAPI", "Power BI"],
    problem:
      "Finance and operations spent over 5 hours per week manually reconciling invoices and syncing customer data across disjointed tools.",
    whatIBuilt: [
      "Built bidirectional Stripe payment sync, PayPal capture handlers, and CyberSource SOAP tokenization endpoints.",
      "Integrated Heymilo AI, Power BI, QuickBooks, and GoHighLevel with Salesforce via Python services and FastAPI middleware.",
      "Connected live executive Power BI dashboards with real-time SOQL queries, saving ~5 hours/week of manual report preparation.",
    ],
    result: {
      number: "10+ Integrations · ~5 Hrs/Wk Saved",
      label: "Automated manual reconciliation and cut recurring production issues by ~30% with 99%+ uptime via GitHub CI/CD.",
    },
    techList: ["Stripe API", "QuickBooks Online", "FastAPI", "Python", "Power BI", "CyberSource", "GoHighLevel"],
    archDiagram: (
      <svg className="w-full h-28" viewBox="0 0 600 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="25" width="120" height="48" rx="8" fill="var(--surface)" stroke="#10B981" strokeWidth="1.5" />
        <text x="70" y="47" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--ink)">Stripe / QBO / APIs</text>
        <text x="70" y="61" textAnchor="middle" fontSize="9" fill="var(--muted)">Payment &amp; CRM Sync</text>

        <path d="M 130 49 L 190 49" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4" />
        <polygon points="190,49 183,45 183,53" fill="#10B981" />

        <rect x="195" y="25" width="130" height="48" rx="8" fill="var(--surface)" stroke="#10B981" strokeWidth="1.5" />
        <text x="260" y="47" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--ink)">FastAPI Middleware</text>
        <text x="260" y="61" textAnchor="middle" fontSize="9" fill="var(--muted)">Signed Webhooks</text>

        <path d="M 325 49 L 385 49" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4" />
        <polygon points="385,49 378,45 378,53" fill="#10B981" />

        <rect x="390" y="25" width="130" height="48" rx="6" fill="var(--surface)" stroke="#10B981" strokeWidth="1.5" />
        <text x="455" y="47" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--ink)">Power BI &amp; CRM</text>
        <text x="455" y="61" textAnchor="middle" fontSize="9" fill="var(--muted)">Automated Ledger</text>
      </svg>
    ),
  },
  {
    id: "equipment-erp",
    name: "Enterprise Equipment Rental & CPQ Quoting Engine",
    badge: "Cloud Architecture",
    badgeColor: "bg-rose-100 text-rose-950 dark:bg-rose-950 dark:text-rose-200 border-rose-300 dark:border-rose-800",
    shortDesc: "Architecting a modern cloud solution for equipment rental, asset lifecycle tracking, and automated CPQ quoting.",
    tag: "Enterprise System",
    chips: ["Next.js", "Salesforce", "Python", "Cloud ERP"],
    problem:
      "Legacy rental ERP solutions suffer from rigid UX, complex multi-day quote turnarounds, and fragmented maintenance telemetry.",
    whatIBuilt: [
      "Architected real-time fleet availability calendars and dynamic multi-tier rental rate engines.",
      "Designed seamless dispatch and asset lifecycle tracking mapping directly into Salesforce Service & Asset objects.",
      "Built a modern full-stack quoting interface designed for instant mobile and desktop equipment reservations.",
    ],
    result: {
      number: "Next-Gen Cloud Architecture",
      label: "Modernizing asset management and field equipment operations with instant quoting.",
    },
    techList: ["Next.js", "Python FastAPI", "Salesforce Platform", "PostgreSQL", "AWS S3", "LWC"],
    archDiagram: (
      <svg className="w-full h-28" viewBox="0 0 600 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="25" width="120" height="48" rx="8" fill="var(--surface)" stroke="#EF4444" strokeWidth="1.5" />
        <text x="70" y="47" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--ink)">Rental Portal</text>
        <text x="70" y="61" textAnchor="middle" fontSize="9" fill="var(--muted)">Fleet &amp; Availability</text>

        <path d="M 130 49 L 190 49" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 4" />
        <polygon points="190,49 183,45 183,53" fill="#EF4444" />

        <rect x="195" y="25" width="130" height="48" rx="8" fill="var(--surface)" stroke="#EF4444" strokeWidth="1.5" />
        <text x="260" y="47" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--ink)">CPQ Rental Engine</text>
        <text x="260" y="61" textAnchor="middle" fontSize="9" fill="var(--muted)">Tiered Rate Rules</text>

        <path d="M 325 49 L 385 49" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 4" />
        <polygon points="385,49 378,45 378,53" fill="#EF4444" />

        <rect x="390" y="25" width="130" height="48" rx="8" fill="var(--surface)" stroke="#EF4444" strokeWidth="1.5" />
        <text x="455" y="47" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--ink)">Cloud ERP Backend</text>
        <text x="455" y="61" textAnchor="middle" fontSize="9" fill="var(--muted)">Asset Telemetry</text>
      </svg>
    ),
  },
];

export function WorkSection() {
  const [expandedId, setExpandedId] = useState<string | null>("us-b2b-commerce");

  const toggleRow = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="work" className="space-y-3 pt-3">
      {/* Title & Description */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--ink)]">
            Work
          </h2>
          <p className="text-xs text-[var(--muted)]">
            Production projects at ASSPL and cloud platforms. Live systems are private; diagrams reflect actual architecture.
          </p>
        </div>
        <span className="text-xs font-mono text-[var(--indigo)] font-semibold">
          6 Enterprise Systems
        </span>
      </div>

      {/* List of 6 Project Rows with Near-Solid Tint and Elevated Expansion */}
      <div className="space-y-2">
        {SIX_PROJECTS.map((project) => {
          const isOpen = expandedId === project.id;

          return (
            <div key={project.id} className="transition-all duration-300">
              {/* Row Header - Near Solid Tint Glass Row */}
              <button
                onClick={() => toggleRow(project.id)}
                className={`w-full text-left p-3.5 sm:p-4 rounded-[14px] flex flex-col md:flex-row md:items-center justify-between gap-2.5 cursor-pointer transition-all ${
                  isOpen
                    ? "glass-raised border-l-4 border-l-[var(--indigo)] shadow-md"
                    : "glass-row hover:border-[var(--indigo)]/50"
                }`}
              >
                <div className="space-y-1 md:max-w-xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-sm sm:text-[15px] text-[var(--ink)]">
                      {project.name}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${project.badgeColor}`}>
                      {project.badge}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--surface-tint-solid)] text-[var(--muted)] border border-[var(--hairline)] shrink-0">
                      {project.tag}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--muted)] line-clamp-1">
                    {project.shortDesc}
                  </p>
                </div>

                {/* Right Meta: Tech Chips + Chevron */}
                <div className="flex items-center gap-2.5 shrink-0">
                  <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono">
                    {project.chips.map((chip, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-full border border-[var(--hairline)] bg-[var(--surface-tint-solid)] text-[var(--ink)] shadow-2xs"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>

                  <div className="text-[var(--muted)]">
                    {isOpen ? (
                      <ChevronDown className="w-4 h-4 text-[var(--indigo)]" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </button>

              {/* Inline Raised Detail Panel */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden mt-1.5"
                  >
                    <div className="glass-raised rounded-[20px] p-5 sm:p-6 space-y-4">
                      {/* Context & What I Built sitting on near-solid readable surface */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        
                        <div className="md:col-span-5 surface-solid-reading p-3.5 sm:p-4 border border-[var(--hairline)] space-y-1.5 shadow-2xs">
                          <span className="text-xs font-semibold text-[var(--ink)] block">
                            Context &amp; problem
                          </span>
                          <p className="text-xs sm:text-[13px] text-[var(--muted)] leading-relaxed">
                            {project.problem}
                          </p>
                        </div>

                        <div className="md:col-span-7 surface-solid-reading p-3.5 sm:p-4 border border-[var(--hairline)] space-y-1.5 shadow-2xs">
                          <span className="text-xs font-semibold text-[var(--ink)] block">
                            Engineering scope
                          </span>
                          <ul className="space-y-1.5 text-xs sm:text-[13px] text-[var(--muted)]">
                            {project.whatIBuilt.map((bullet, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--indigo)] shrink-0 mt-1.5" />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                      </div>

                      {/* Verified Result Metric */}
                      <div className="p-3.5 rounded-[14px] bg-[var(--surface-tint-solid)] border border-[var(--hairline)] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs shadow-2xs">
                        <div>
                          <span className="font-bold text-xs sm:text-sm text-[var(--indigo)] block">
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
                              className="px-2 py-0.5 rounded-full bg-[var(--surface)] border border-[var(--hairline)] text-[var(--ink)] shadow-2xs"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Architecture Flow */}
                      <div className="space-y-1.5">
                        <span className="text-xs font-semibold text-[var(--ink)] block">
                          Architecture diagram
                        </span>
                        <div className="rounded-[14px] border border-[var(--hairline)] bg-[var(--surface-tint-solid)] p-3 flex items-center justify-center overflow-x-auto shadow-2xs">
                          {project.archDiagram}
                        </div>
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
