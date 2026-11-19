"use client";

import React from "react";

export function ProjectDiagram({ projectId }: { projectId: string }) {
  switch (projectId) {
    case "outlook-addin":
      return (
        <div className="w-full bg-[var(--bg)] border border-hairline rounded-sm p-4 text-[var(--ink)]">
          <div className="text-[10px] uppercase font-mono text-[var(--muted)] mb-3 tracking-wider flex items-center justify-between">
            <span>System Architecture Flow // Multi-Org OAuth 2.0 PKCE</span>
            <span className="text-[var(--accent)] font-semibold">Zero Hardcoded Orgs</span>
          </div>
          <svg className="w-full h-auto max-h-[220px]" viewBox="0 0 760 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Box 1: Outlook Add-in */}
            <rect x="10" y="40" width="160" height="80" rx="4" stroke="currentColor" strokeWidth="1" fill="var(--surface)" />
            <text x="90" y="70" textAnchor="middle" fontSize="11" fontFamily="var(--font-geist-mono)" fontWeight="600" fill="currentColor">Outlook Add-In</text>
            <text x="90" y="88" textAnchor="middle" fontSize="9" fontFamily="var(--font-geist-mono)" fill="var(--muted)">Office.js + React</text>
            <text x="90" y="104" textAnchor="middle" fontSize="8" fontFamily="var(--font-geist-mono)" fill="var(--accent)">PKCE Code Verifier</text>

            {/* Arrow 1 */}
            <path d="M170 80 L230 80" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
            <polygon points="230,80 223,76 223,84" fill="currentColor" />
            <text x="200" y="72" textAnchor="middle" fontSize="8" fontFamily="var(--font-geist-mono)" fill="var(--muted)">Auth Code</text>

            {/* Box 2: Connected App */}
            <rect x="235" y="40" width="160" height="80" rx="4" stroke="currentColor" strokeWidth="1" fill="var(--surface)" />
            <text x="315" y="70" textAnchor="middle" fontSize="11" fontFamily="var(--font-geist-mono)" fontWeight="600" fill="currentColor">Connected App</text>
            <text x="315" y="88" textAnchor="middle" fontSize="9" fontFamily="var(--font-geist-mono)" fill="var(--muted)">Multi-Org Token Endpoint</text>
            <text x="315" y="104" textAnchor="middle" fontSize="8" fontFamily="var(--font-geist-mono)" fill="var(--accent)">SHA-256 S256 Handshake</text>

            {/* Arrow 2 */}
            <path d="M395 80 L455 80" stroke="currentColor" strokeWidth="1" />
            <polygon points="455,80 448,76 448,84" fill="currentColor" />
            <text x="425" y="72" textAnchor="middle" fontSize="8" fontFamily="var(--font-geist-mono)" fill="var(--muted)">JWT / Session</text>

            {/* Box 3: Dynamic Schema & Logging */}
            <rect x="460" y="40" width="280" height="80" rx="4" stroke="currentColor" strokeWidth="1" fill="var(--surface)" />
            <text x="600" y="68" textAnchor="middle" fontSize="11" fontFamily="var(--font-geist-mono)" fontWeight="600" fill="currentColor">Salesforce Core Instance</text>
            <text x="600" y="86" textAnchor="middle" fontSize="9" fontFamily="var(--font-geist-mono)" fill="var(--muted)">describeSObjects() Schema Reflection</text>
            <text x="600" y="102" textAnchor="middle" fontSize="8" fontFamily="var(--font-geist-mono)" fill="var(--accent)">Idempotent Upsert (EmailMessage + Task)</text>
          </svg>
        </div>
      );

    case "agentforce-suite":
      return (
        <div className="w-full bg-[var(--bg)] border border-hairline rounded-sm p-4 text-[var(--ink)]">
          <div className="text-[10px] uppercase font-mono text-[var(--muted)] mb-3 tracking-wider flex items-center justify-between">
            <span>Agentforce Orchestration // Topics & Invocable Dispatch</span>
            <span className="text-[var(--accent)] font-semibold">4 Autonomous Agents</span>
          </div>
          <svg className="w-full h-auto max-h-[220px]" viewBox="0 0 760 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Box 1: Experience Cloud User */}
            <rect x="10" y="40" width="150" height="80" rx="4" stroke="currentColor" strokeWidth="1" fill="var(--surface)" />
            <text x="85" y="70" textAnchor="middle" fontSize="11" fontFamily="var(--font-geist-mono)" fontWeight="600" fill="currentColor">Experience Cloud</text>
            <text x="85" y="88" textAnchor="middle" fontSize="9" fontFamily="var(--font-geist-mono)" fill="var(--muted)">B2B Storefront Visitor</text>
            <text x="85" y="104" textAnchor="middle" fontSize="8" fontFamily="var(--font-geist-mono)" fill="var(--accent)">Natural Language Query</text>

            <path d="M160 80 L220 80" stroke="currentColor" strokeWidth="1" />
            <polygon points="220,80 213,76 213,84" fill="currentColor" />

            {/* Box 2: Trust Layer & Topic Router */}
            <rect x="225" y="30" width="180" height="100" rx="4" stroke="currentColor" strokeWidth="1" fill="var(--surface)" />
            <text x="315" y="58" textAnchor="middle" fontSize="11" fontFamily="var(--font-geist-mono)" fontWeight="600" fill="currentColor">Einstein Trust Layer</text>
            <text x="315" y="74" textAnchor="middle" fontSize="9" fontFamily="var(--font-geist-mono)" fill="var(--muted)">PII Masking & Toxicity Audit</text>
            <text x="315" y="94" textAnchor="middle" fontSize="10" fontFamily="var(--font-geist-mono)" fontWeight="600" fill="var(--ink)">Topic Routing Matrix</text>
            <text x="315" y="112" textAnchor="middle" fontSize="8" fontFamily="var(--font-geist-mono)" fill="var(--accent)">Intent Classification</text>

            <path d="M405 80 L465 80" stroke="currentColor" strokeWidth="1" />
            <polygon points="465,80 458,76 458,84" fill="currentColor" />

            {/* Box 3: Invocable Apex Engine */}
            <rect x="470" y="40" width="270" height="80" rx="4" stroke="currentColor" strokeWidth="1" fill="var(--surface)" />
            <text x="605" y="68" textAnchor="middle" fontSize="11" fontFamily="var(--font-geist-mono)" fontWeight="600" fill="currentColor">Invocable Apex Actions</text>
            <text x="605" y="86" textAnchor="middle" fontSize="9" fontFamily="var(--font-geist-mono)" fill="var(--muted)">Inventory Check · Order Tracking · Case Creation</text>
            <text x="605" y="102" textAnchor="middle" fontSize="8" fontFamily="var(--font-geist-mono)" fill="var(--accent)">Deterministic Safe Execution</text>
          </svg>
        </div>
      );

    case "pdf-pipeline":
      return (
        <div className="w-full bg-[var(--bg)] border border-hairline rounded-sm p-4 text-[var(--ink)]">
          <div className="text-[10px] uppercase font-mono text-[var(--muted)] mb-3 tracking-wider flex items-center justify-between">
            <span>Data Extraction Pipeline // Unstructured Document Automation</span>
            <span className="text-[var(--accent)] font-semibold">Zero Manual Data Entry</span>
          </div>
          <svg className="w-full h-auto max-h-[220px]" viewBox="0 0 760 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="40" width="150" height="80" rx="4" stroke="currentColor" strokeWidth="1" fill="var(--surface)" />
            <text x="85" y="70" textAnchor="middle" fontSize="11" fontFamily="var(--font-geist-mono)" fontWeight="600" fill="currentColor">Inbound PDF</text>
            <text x="85" y="88" textAnchor="middle" fontSize="9" fontFamily="var(--font-geist-mono)" fill="var(--muted)">Invoices / POs</text>
            <text x="85" y="104" textAnchor="middle" fontSize="8" fontFamily="var(--font-geist-mono)" fill="var(--accent)">Raw Document Stream</text>

            <path d="M160 80 L220 80" stroke="currentColor" strokeWidth="1" />
            <polygon points="220,80 213,76 213,84" fill="currentColor" />

            <rect x="225" y="40" width="180" height="80" rx="4" stroke="currentColor" strokeWidth="1" fill="var(--surface)" />
            <text x="315" y="70" textAnchor="middle" fontSize="11" fontFamily="var(--font-geist-mono)" fontWeight="600" fill="currentColor">Agentforce Parser</text>
            <text x="315" y="88" textAnchor="middle" fontSize="9" fontFamily="var(--font-geist-mono)" fill="var(--muted)">OCR & Entity Recognition</text>
            <text x="315" y="104" textAnchor="middle" fontSize="8" fontFamily="var(--font-geist-mono)" fill="var(--accent)">JSON Schema Normalization</text>

            <path d="M405 80 L465 80" stroke="currentColor" strokeWidth="1" />
            <polygon points="465,80 458,76 458,84" fill="currentColor" />

            <rect x="470" y="40" width="270" height="80" rx="4" stroke="currentColor" strokeWidth="1" fill="var(--surface)" />
            <text x="605" y="68" textAnchor="middle" fontSize="11" fontFamily="var(--font-geist-mono)" fontWeight="600" fill="currentColor">Queueable Apex Unit</text>
            <text x="605" y="86" textAnchor="middle" fontSize="9" fontFamily="var(--font-geist-mono)" fill="var(--muted)">Validation Rules & Relational Mapping</text>
            <text x="605" y="102" textAnchor="middle" fontSize="8" fontFamily="var(--font-geist-mono)" fill="var(--accent)">Automated CRM Record Creation</text>
          </svg>
        </div>
      );

    case "stripe-quickbooks":
      return (
        <div className="w-full bg-[var(--bg)] border border-hairline rounded-sm p-4 text-[var(--ink)]">
          <div className="text-[10px] uppercase font-mono text-[var(--muted)] mb-3 tracking-wider flex items-center justify-between">
            <span>Event-Driven Financial Bridge // Stripe & QuickBooks Sync</span>
            <span className="text-[var(--accent)] font-semibold">Zero Concurrency Errors</span>
          </div>
          <svg className="w-full h-auto max-h-[220px]" viewBox="0 0 760 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="40" width="150" height="80" rx="4" stroke="currentColor" strokeWidth="1" fill="var(--surface)" />
            <text x="85" y="70" textAnchor="middle" fontSize="11" fontFamily="var(--font-geist-mono)" fontWeight="600" fill="currentColor">Stripe Webhook</text>
            <text x="85" y="88" textAnchor="middle" fontSize="9" fontFamily="var(--font-geist-mono)" fill="var(--muted)">charge.succeeded</text>
            <text x="85" y="104" textAnchor="middle" fontSize="8" fontFamily="var(--font-geist-mono)" fill="var(--accent)">HmacSHA256 Signed</text>

            <path d="M160 80 L220 80" stroke="currentColor" strokeWidth="1" />
            <polygon points="220,80 213,76 213,84" fill="currentColor" />

            <rect x="225" y="40" width="180" height="80" rx="4" stroke="currentColor" strokeWidth="1" fill="var(--surface)" />
            <text x="315" y="70" textAnchor="middle" fontSize="11" fontFamily="var(--font-geist-mono)" fontWeight="600" fill="currentColor">Apex REST Listener</text>
            <text x="315" y="88" textAnchor="middle" fontSize="9" fontFamily="var(--font-geist-mono)" fill="var(--muted)">Signature Verification</text>
            <text x="315" y="104" textAnchor="middle" fontSize="8" fontFamily="var(--font-geist-mono)" fill="var(--accent)">Platform Event Dispatch</text>

            <path d="M405 80 L465 80" stroke="currentColor" strokeWidth="1" />
            <polygon points="465,80 458,76 458,84" fill="currentColor" />

            <rect x="470" y="40" width="270" height="80" rx="4" stroke="currentColor" strokeWidth="1" fill="var(--surface)" />
            <text x="605" y="68" textAnchor="middle" fontSize="11" fontFamily="var(--font-geist-mono)" fontWeight="600" fill="currentColor">QuickBooks Online REST</text>
            <text x="605" y="86" textAnchor="middle" fontSize="9" fontFamily="var(--font-geist-mono)" fill="var(--muted)">SalesReceipt & Account Reconciliation</text>
            <text x="605" y="102" textAnchor="middle" fontSize="8" fontFamily="var(--font-geist-mono)" fill="var(--accent)">Atomic Ledger Balancing</text>
          </svg>
        </div>
      );

    default:
      return (
        <div className="w-full bg-[var(--bg)] border border-hairline rounded-sm p-4 text-[var(--ink)]">
          <div className="text-[10px] uppercase font-mono text-[var(--muted)] mb-3 tracking-wider flex items-center justify-between">
            <span>Production Architecture // Enterprise Integration Pipeline</span>
            <span className="text-[var(--accent)] font-semibold">ASSPL Private Build</span>
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
