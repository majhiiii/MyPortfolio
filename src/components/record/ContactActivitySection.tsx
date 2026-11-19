"use client";

import React, { useState } from "react";
import { Mail, Copy, Check, ExternalLink, Calendar, GitCommit } from "lucide-react";
import { PattachitraBorder } from "@/components/ui/PattachitraBorder";

interface ActivityMilestone {
  date: string;
  title: string;
  description: string;
  badge: string;
}

const MILESTONES: ActivityMilestone[] = [
  {
    date: "NOV 2024",
    title: "Joined Abacus System & Solution (ASSPL)",
    description: "Started engineering enterprise Salesforce B2B Commerce platforms, custom CPQ quoting, and third-party integrations.",
    badge: "ASSPL",
  },
  {
    date: "[DATE]",
    title: "Salesforce Certified Agentforce Specialist",
    description: "Achieved specialist credential in autonomous Agent Builder topics, invocable actions, and Einstein Trust Layer guardrails.",
    badge: "Certification",
  },
  {
    date: "[DATE]",
    title: "In-House Outlook Add-in Production Deployment",
    description: "Shipped Office.js add-in with cryptographic OAuth 2.0 PKCE to enterprise sales users for 1-click email sync.",
    badge: "Production Release",
  },
  {
    date: "MAR 2024",
    title: "Joined Briskode Technology",
    description: "Frontend web engineering with React and Next.js, building interactive client applications and consuming REST services.",
    badge: "Briskode",
  },
];

export function ContactActivitySection() {
  const [copied, setCopied] = useState(false);
  const email = "rakeshmajhi.connect@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="contact" className="space-y-12 pt-10 pb-16">
      
      {/* Say Hello Record Box */}
      <div className="rounded-lg bg-[var(--surface)] border border-hairline p-6 sm:p-8 space-y-6 shadow-2xs transition-colors">
        <div className="space-y-1 border-b border-hairline pb-4">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--ink)]">
            Say hello
          </h2>
          <p className="text-xs sm:text-sm text-[var(--muted)]">
            Open to Salesforce Developer roles, enterprise platform engineering, and consulting conversations.
          </p>
        </div>

        {/* Quick Action Buttons (Record Quick Actions Style) */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
          <a
            href={`mailto:${email}?subject=Salesforce%20Opportunity%20-%20Discussion`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[var(--indigo)] text-[#FFFBF2] font-medium hover:opacity-90 transition-opacity shadow-2xs"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email</span>
          </a>

          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-hairline bg-[var(--bg)] text-[var(--ink)] hover:border-[var(--ink)] transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied to clipboard" : "Copy email"}</span>
          </button>

          <a
            href="https://linkedin.com/in/rakeshmajhi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-hairline bg-[var(--bg)] text-[var(--ink)] hover:border-[var(--ink)] transition-colors"
          >
            <span>LinkedIn</span>
            <ExternalLink className="w-3 h-3 text-[var(--muted)]" />
          </a>

          <a
            href="https://github.com/majhiiii"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-hairline bg-[var(--bg)] text-[var(--ink)] hover:border-[var(--ink)] transition-colors"
          >
            <span>GitHub</span>
            <ExternalLink className="w-3 h-3 text-[var(--muted)]" />
          </a>
        </div>

        {/* Activity Timeline (4 Milestones) */}
        <div className="pt-6 border-t border-hairline space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--muted)] uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5" />
            <span>Activity Timeline // Key Milestones</span>
          </div>

          <div className="space-y-4 pl-2 border-l-2 border-hairline">
            {MILESTONES.map((m, idx) => (
              <div key={idx} className="relative pl-5 space-y-0.5">
                {/* Node Dot */}
                <div className="absolute -left-[1.35rem] top-1.5 w-2 h-2 rounded-full bg-[var(--turmeric)] ring-4 ring-[var(--surface)]" />

                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="text-[11px] font-mono text-[var(--muted)] font-semibold">
                    {m.date}
                  </span>
                  <span className="text-xs font-semibold text-[var(--ink)]">
                    {m.title}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-xs border border-hairline text-[var(--muted)]">
                    {m.badge}
                  </span>
                </div>
                <p className="text-xs text-[var(--muted)] leading-relaxed">
                  {m.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Page Footer */}
      <footer className="space-y-4 pt-6">
        {/* Bottom Pattachitra Creeper Border Strip */}
        <PattachitraBorder />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--muted)] pt-2 font-mono">
          <p>
            &copy; 2024&ndash;Present Rakesh Majhi. Bhubaneswar, Odisha.
          </p>
          <p className="text-[11px] text-center sm:text-right">
            Not affiliated with Salesforce or any listed vendor. Logos belong to their owners.
          </p>
        </div>
      </footer>

    </section>
  );
}
