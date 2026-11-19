"use client";

import React from "react";

export function ProjectDiagram({ projectId }: { projectId: string }) {
  switch (projectId) {
    case "b2b-commerce-platform":
      return (
        <div className="w-full bg-[var(--bg)] border border-hairline rounded-sm p-4 text-[var(--ink)]">
          <div className="text-[10px] uppercase font-mono text-[var(--muted)] mb-3 tracking-wider flex items-center justify-between">
            <span>B2B Commerce Architecture // CloudCraze Service Overrides & CPQ</span>
            <span className="text-[var(--accent)] font-semibold">1-Page Bulk Checkout</span>
          </div>
          <svg className="w-full h-auto max-h-[220px]" viewBox="0 0 760 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Box 1: LWC Configurators & Storefront */}
            <rect x="10" y="40" width="160" height="80" rx="4" stroke="currentColor" strokeWidth="1" fill="var(--surface)" />
            <text x="90" y="68" textAnchor="middle" fontSize="11" fontFamily="var(--font-geist-mono)" fontWeight="600" fill="currentColor">LWC 2D/3D Configurator</text>
            <text x="90" y="86" textAnchor="middle" fontSize="9" fontFamily="var(--font-geist-mono)" fill="var(--muted)">ccServiceCart Overrides</text>
            <text x="90" y="102" textAnchor="middle" fontSize="8" fontFamily="var(--font-geist-mono)" fill="var(--accent)">Tiered B2B Pricing Hook</text>

            {/* Arrow 1 */}
            <path d="M170 80 L230 80" stroke="currentColor" strokeWidth="1" />
            <polygon points="230,80 223,76 223,84" fill="currentColor" />
            <text x="200" y="72" textAnchor="middle" fontSize="8" fontFamily="var(--font-geist-mono)" fill="var(--muted)">Order Hook</text>

            {/* Box 2: Queueable Backorder & Split Engine */}
            <rect x="235" y="40" width="180" height="80" rx="4" stroke="currentColor" strokeWidth="1" fill="var(--surface)" />
            <text x="325" y="68" textAnchor="middle" fontSize="11" fontFamily="var(--font-geist-mono)" fontWeight="600" fill="currentColor">Queueable Apex Engine</text>
            <text x="325" y="86" textAnchor="middle" fontSize="9" fontFamily="var(--font-geist-mono)" fill="var(--muted)">Async Order Splitting & WMS</text>
            <text x="325" y="102" textAnchor="middle" fontSize="8" fontFamily="var(--font-geist-mono)" fill="var(--accent)">Avoids 101 SOQL Bottleneck</text>

            {/* Arrow 2 */}
            <path d="M415 80 L475 80" stroke="currentColor" strokeWidth="1" />
            <polygon points="475,80 468,76 468,84" fill="currentColor" />
            <text x="445" y="72" textAnchor="middle" fontSize="8" fontFamily="var(--font-geist-mono)" fill="var(--muted)">REST/SOAP</text>

            {/* Box 3: Logistics & Compliance */}
            <rect x="480" y="40" width="260" height="80" rx="4" stroke="currentColor" strokeWidth="1" fill="var(--surface)" />
            <text x="610" y="68" textAnchor="middle" fontSize="11" fontFamily="var(--font-geist-mono)" fontWeight="600" fill="currentColor">UPS & Avalara AvaTax</text>
            <text x="610" y="86" textAnchor="middle" fontSize="9" fontFamily="var(--font-geist-mono)" fill="var(--muted)">Real-Time Rate Quoting & Multi-State Tax</text>
            <text x="610" y="102" textAnchor="middle" fontSize="8" fontFamily="var(--font-geist-mono)" fill="var(--accent)">Automated Bill of Lading (BOL)</text>
          </svg>
        </div>
      );

    case "agentforce-invocables":
      return (
        <div className="w-full bg-[var(--bg)] border border-hairline rounded-sm p-4 text-[var(--ink)]">
          <div className="text-[10px] uppercase font-mono text-[var(--muted)] mb-3 tracking-wider flex items-center justify-between">
            <span>Agentforce Orchestration // Topics & Invocable Dispatch</span>
            <span className="text-[var(--accent)] font-semibold">Autonomous Support Triage</span>
          </div>
          <svg className="w-full h-auto max-h-[220px]" viewBox="0 0 760 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="40" width="150" height="80" rx="4" stroke="currentColor" strokeWidth="1" fill="var(--surface)" />
            <text x="85" y="70" textAnchor="middle" fontSize="11" fontFamily="var(--font-geist-mono)" fontWeight="600" fill="currentColor">Experience Cloud</text>
            <text x="85" y="88" textAnchor="middle" fontSize="9" fontFamily="var(--font-geist-mono)" fill="var(--muted)">Customer & Rep Inquiries</text>
            <text x="85" y="104" textAnchor="middle" fontSize="8" fontFamily="var(--font-geist-mono)" fill="var(--accent)">Natural Language Session</text>

            <path d="M160 80 L220 80" stroke="currentColor" strokeWidth="1" />
            <polygon points="220,80 213,76 213,84" fill="currentColor" />

            <rect x="225" y="30" width="180" height="100" rx="4" stroke="currentColor" strokeWidth="1" fill="var(--surface)" />
            <text x="315" y="58" textAnchor="middle" fontSize="11" fontFamily="var(--font-geist-mono)" fontWeight="600" fill="currentColor">Einstein Trust Layer</text>
            <text x="315" y="74" textAnchor="middle" fontSize="9" fontFamily="var(--font-geist-mono)" fill="var(--muted)">PII Masking & Toxicity Audit</text>
            <text x="315" y="94" textAnchor="middle" fontSize="10" fontFamily="var(--font-geist-mono)" fontWeight="600" fill="var(--ink)">Topic Routing Matrix</text>
            <text x="315" y="112" textAnchor="middle" fontSize="8" fontFamily="var(--font-geist-mono)" fill="var(--accent)">Intent Classification</text>

            <path d="M405 80 L465 80" stroke="currentColor" strokeWidth="1" />
            <polygon points="465,80 458,76 458,84" fill="currentColor" />

            <rect x="470" y="40" width="270" height="80" rx="4" stroke="currentColor" strokeWidth="1" fill="var(--surface)" />
            <text x="605" y="68" textAnchor="middle" fontSize="11" fontFamily="var(--font-geist-mono)" fontWeight="600" fill="currentColor">Invocable Apex Actions</text>
            <text x="605" y="86" textAnchor="middle" fontSize="9" fontFamily="var(--font-geist-mono)" fill="var(--muted)">Case Creation (Origin=Agentforce) · Summaries</text>
            <text x="605" y="102" textAnchor="middle" fontSize="8" fontFamily="var(--font-geist-mono)" fill="var(--accent)">Structured Record Creation in CRM</text>
          </svg>
        </div>
      );

    case "outlook-addin":
      return (
        <div className="w-full bg-[var(--bg)] border border-hairline rounded-sm p-4 text-[var(--ink)]">
          <div className="text-[10px] uppercase font-mono text-[var(--muted)] mb-3 tracking-wider flex items-center justify-between">
            <span>System Architecture Flow // Multi-Org OAuth 2.0 PKCE</span>
            <span className="text-[var(--accent)] font-semibold">Zero Hardcoded Orgs</span>
          </div>
          <svg className="w-full h-auto max-h-[220px]" viewBox="0 0 760 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="40" width="160" height="80" rx="4" stroke="currentColor" strokeWidth="1" fill="var(--surface)" />
            <text x="90" y="70" textAnchor="middle" fontSize="11" fontFamily="var(--font-geist-mono)" fontWeight="600" fill="currentColor">Outlook Add-In</text>
            <text x="90" y="88" textAnchor="middle" fontSize="9" fontFamily="var(--font-geist-mono)" fill="var(--muted)">Office.js + React</text>
            <text x="90" y="104" textAnchor="middle" fontSize="8" fontFamily="var(--font-geist-mono)" fill="var(--accent)">PKCE Code Verifier</text>

            <path d="M170 80 L230 80" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
            <polygon points="230,80 223,76 223,84" fill="currentColor" />
            <text x="200" y="72" textAnchor="middle" fontSize="8" fontFamily="var(--font-geist-mono)" fill="var(--muted)">Auth Code</text>

            <rect x="235" y="40" width="160" height="80" rx="4" stroke="currentColor" strokeWidth="1" fill="var(--surface)" />
            <text x="315" y="70" textAnchor="middle" fontSize="11" fontFamily="var(--font-geist-mono)" fontWeight="600" fill="currentColor">Connected App</text>
            <text x="315" y="88" textAnchor="middle" fontSize="9" fontFamily="var(--font-geist-mono)" fill="var(--muted)">Multi-Org Token Endpoint</text>
            <text x="315" y="104" textAnchor="middle" fontSize="8" fontFamily="var(--font-geist-mono)" fill="var(--accent)">SHA-256 S256 Handshake</text>

            <path d="M395 80 L455 80" stroke="currentColor" strokeWidth="1" />
            <polygon points="455,80 448,76 448,84" fill="currentColor" />
            <text x="425" y="72" textAnchor="middle" fontSize="8" fontFamily="var(--font-geist-mono)" fill="var(--muted)">JWT / Session</text>

            <rect x="460" y="40" width="280" height="80" rx="4" stroke="currentColor" strokeWidth="1" fill="var(--surface)" />
            <text x="600" y="68" textAnchor="middle" fontSize="11" fontFamily="var(--font-geist-mono)" fontWeight="600" fill="currentColor">Salesforce Core Instance</text>
            <text x="600" y="86" textAnchor="middle" fontSize="9" fontFamily="var(--font-geist-mono)" fill="var(--muted)">describeSObjects() Schema Reflection</text>
            <text x="600" y="102" textAnchor="middle" fontSize="8" fontFamily="var(--font-geist-mono)" fill="var(--accent)">Idempotent Upsert (EmailMessage + Task)</text>
          </svg>
        </div>
      );

    case "financial-sync":
      return (
        <div className="w-full bg-[var(--bg)] border border-hairline rounded-sm p-4 text-[var(--ink)]">
          <div className="text-[10px] uppercase font-mono text-[var(--muted)] mb-3 tracking-wider flex items-center justify-between">
            <span>Automated Banking & Payments // NACHA ACH & Accounting Sync</span>
            <span className="text-[var(--accent)] font-semibold">Automated Reconciliation</span>
          </div>
          <svg className="w-full h-auto max-h-[220px]" viewBox="0 0 760 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="40" width="160" height="80" rx="4" stroke="currentColor" strokeWidth="1" fill="var(--surface)" />
            <text x="90" y="70" textAnchor="middle" fontSize="11" fontFamily="var(--font-geist-mono)" fontWeight="600" fill="currentColor">Order Billing Records</text>
            <text x="90" y="88" textAnchor="middle" fontSize="9" fontFamily="var(--font-geist-mono)" fill="var(--muted)">Daily Account Terms</text>
            <text x="90" y="104" textAnchor="middle" fontSize="8" fontFamily="var(--font-geist-mono)" fill="var(--accent)">Cash Receipts Ready</text>

            <path d="M170 80 L230 80" stroke="currentColor" strokeWidth="1" />
            <polygon points="230,80 223,76 223,84" fill="currentColor" />

            <rect x="235" y="40" width="180" height="80" rx="4" stroke="currentColor" strokeWidth="1" fill="var(--surface)" />
            <text x="325" y="70" textAnchor="middle" fontSize="11" fontFamily="var(--font-geist-mono)" fontWeight="600" fill="currentColor">Batch Apex Engine</text>
            <text x="325" y="88" textAnchor="middle" fontSize="9" fontFamily="var(--font-geist-mono)" fill="var(--muted)">NACHA File Generator</text>
            <text x="325" y="104" textAnchor="middle" fontSize="8" fontFamily="var(--font-geist-mono)" fill="var(--accent)">Standard 94-char ACH Records</text>

            <path d="M415 80 L475 80" stroke="currentColor" strokeWidth="1" />
            <polygon points="475,80 468,76 468,84" fill="currentColor" />

            <rect x="480" y="40" width="260" height="80" rx="4" stroke="currentColor" strokeWidth="1" fill="var(--surface)" />
            <text x="610" y="68" textAnchor="middle" fontSize="11" fontFamily="var(--font-geist-mono)" fontWeight="600" fill="currentColor">Banking & QuickBooks Sync</text>
            <text x="610" y="86" textAnchor="middle" fontSize="9" fontFamily="var(--font-geist-mono)" fill="var(--muted)">ACH Direct Debit & Ledger Balancing</text>
            <text x="610" y="102" textAnchor="middle" fontSize="8" fontFamily="var(--font-geist-mono)" fill="var(--accent)">Daily Automated Settlement</text>
          </svg>
        </div>
      );

    default:
      return (
        <div className="w-full bg-[var(--bg)] border border-hairline rounded-sm p-4 text-[var(--ink)]">
          <div className="text-[10px] uppercase font-mono text-[var(--muted)] mb-3 tracking-wider flex items-center justify-between">
            <span>Enterprise Pipeline // Architecture & Integration</span>
            <span className="text-[var(--accent)] font-semibold">ASSPL Private Client System</span>
          </div>
          <svg className="w-full h-auto max-h-[180px]" viewBox="0 0 760 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="30" width="180" height="80" rx="4" stroke="currentColor" strokeWidth="1" fill="var(--surface)" />
            <text x="110" y="65" textAnchor="middle" fontSize="11" fontFamily="var(--font-geist-mono)" fontWeight="600" fill="currentColor">External Service</text>
            <text x="110" y="85" textAnchor="middle" fontSize="9" fontFamily="var(--font-geist-mono)" fill="var(--muted)">REST / SOAP / Webhook</text>

            <path d="M200 70 L280 70" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
            <polygon points="280,70 273,66 273,74" fill="currentColor" />

            <rect x="285" y="30" width="190" height="80" rx="4" stroke="currentColor" strokeWidth="1" fill="var(--surface)" />
            <text x="380" y="65" textAnchor="middle" fontSize="11" fontFamily="var(--font-geist-mono)" fontWeight="600" fill="currentColor">Salesforce Middleware</text>
            <text x="380" y="85" textAnchor="middle" fontSize="9" fontFamily="var(--font-geist-mono)" fill="var(--accent)">FastAPI / Named Credentials</text>

            <path d="M475 70 L555 70" stroke="currentColor" strokeWidth="1" />
            <polygon points="555,70 548,66 548,74" fill="currentColor" />

            <rect x="560" y="30" width="180" height="80" rx="4" stroke="currentColor" strokeWidth="1" fill="var(--surface)" />
            <text x="650" y="65" textAnchor="middle" fontSize="11" fontFamily="var(--font-geist-mono)" fontWeight="600" fill="currentColor">Salesforce Core Org</text>
            <text x="650" y="85" textAnchor="middle" fontSize="9" fontFamily="var(--font-geist-mono)" fill="var(--muted)">Apex Units & LWC Engine</text>
          </svg>
        </div>
      );
  }
}
