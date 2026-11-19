"use client";

import React, { useState } from "react";
import { Mail, Phone, Copy, Check, ExternalLink, Calendar, MapPin } from "lucide-react";
import { PattachitraBorder } from "@/components/ui/PattachitraBorder";
import { GlassPanel } from "@/components/ui/GlassPanel";

interface ActivityMilestone {
  date: string;
  title: string;
  organization: string;
  description: string;
  badge: string;
  badgeColor: string;
}

const MILESTONES: ActivityMilestone[] = [
  {
    date: "NOV 2024 – PRESENT",
    title: "Software Developer – Salesforce & AI Integrations",
    organization: "Abacus System & Solution Pvt. Ltd. (ASSPL)",
    description: "Lead technical delivery across 3 concurrent production projects (B2B Commerce, Health Cloud, custom LWC). Deployed 4 production Agentforce agents on Experience Cloud and built an Agentforce PDF record extraction pipeline.",
    badge: "ASSPL · Current",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800",
  },
  {
    date: "2024",
    title: "Dual Salesforce Certifications",
    organization: "Salesforce Trailhead",
    description: "Salesforce Certified Agentforce Specialist & Salesforce Certified AI Associate credentials, covering autonomous Agent Builder topics, custom actions, and Einstein Trust Layer.",
    badge: "Certified",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800",
  },
  {
    date: "2024",
    title: "In-House Outlook Add-in for Salesforce",
    organization: "Internal Tooling at ASSPL",
    description: "Architected custom Office.js add-in with OAuth 2.0 PKCE login, dynamic SOQL metadata discovery on Contacts/Leads/Accounts/Opportunities, and 1-click email logging to Tasks/EmailMessage.",
    badge: "Shipped",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800",
  },
  {
    date: "MAR 2024 – OCT 2024",
    title: "Web Development Intern",
    organization: "Briskode Technology",
    description: "Built responsive client web applications with React.js, Next.js, and TypeScript, consumed RESTful endpoints, and managed state and UI components.",
    badge: "Internship",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800",
  },
  {
    date: "SEP 2023 – FEB 2024",
    title: "Python Full Stack with Data Science",
    organization: "Abacus Systems Training",
    description: "Engineered full-stack applications with Python, FastAPI/Django, PostgreSQL, relational modeling, and REST architectural patterns.",
    badge: "Foundation",
    badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800",
  },
  {
    date: "JAN 2019 – JUL 2023",
    title: "B.Tech in Computer Science & Engineering",
    organization: "Raajdhani Engineering College, Bhubaneswar",
    description: "Four-year undergraduate degree covering data structures & algorithms, database management systems, operating systems, and computer networks.",
    badge: "Degree",
    badgeColor: "bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800",
  },
];

export function ContactActivitySection() {
  const [copied, setCopied] = useState(false);
  const email = "rakeshmajhi.connect@gmail.com";
  const phone = "+91 8342849764";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="contact" className="space-y-4 pt-3 pb-8">
      
      {/* Get in touch (Base Glass Panel) */}
      <GlassPanel tier="base" radius="panel" className="p-5 sm:p-7 space-y-6">
        <div className="space-y-1 border-b border-[var(--hairline)] pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--ink)]">
                Get in touch
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[var(--muted)] mt-1">
              Open to Salesforce Developer &amp; Administrator roles, Agentforce automation, and enterprise integrations.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
            <MapPin className="w-3.5 h-3.5 text-[var(--vermilion)]" />
            <span>Bhubaneswar, Odisha, India</span>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs font-medium">
          <a
            href={`mailto:${email}?subject=Salesforce%20Opportunity%20-%20Discussion`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--indigo)] text-white hover:opacity-95 transition-opacity shadow-xs"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email Rakesh</span>
          </a>

          <a
            href="tel:+918342849764"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-[var(--hairline)] bg-[var(--surface-tint-solid)] text-[var(--ink)] hover:border-emerald-500 hover:text-emerald-600 transition-colors shadow-2xs"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-mono">+91 8342849764</span>
          </a>

          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-[var(--hairline)] bg-[var(--surface-tint-solid)] text-[var(--ink)] hover:border-[var(--ink)] transition-colors cursor-pointer shadow-2xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied" : "Copy email"}</span>
          </button>

          <a
            href="https://linkedin.com/in/rakeshmajhi57"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-[var(--hairline)] bg-[var(--surface-tint-solid)] text-[var(--ink)] hover:border-blue-500 hover:text-blue-600 transition-colors shadow-2xs"
          >
            <span>LinkedIn</span>
            <ExternalLink className="w-3 h-3 text-[var(--muted)]" />
          </a>

          <a
            href="https://github.com/majhiiii"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-[var(--hairline)] bg-[var(--surface-tint-solid)] text-[var(--ink)] hover:border-[var(--ink)] transition-colors shadow-2xs"
          >
            <span>GitHub</span>
            <ExternalLink className="w-3 h-3 text-[var(--muted)]" />
          </a>
        </div>

        {/* Activity Timeline sitting on Near-Solid readable surface */}
        <div className="surface-solid-reading p-4 sm:p-5 border border-[var(--hairline)] space-y-3.5 shadow-2xs">
          <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
            <Calendar className="w-3.5 h-3.5 text-[var(--turmeric)]" />
            <span className="font-semibold text-[var(--ink)]">Experience and education timeline</span>
          </div>

          <div className="space-y-4 pl-2 border-l-2 border-[var(--hairline)] ml-1">
            {MILESTONES.map((m, idx) => (
              <div key={idx} className="relative pl-5 space-y-1">
                {/* Node Dot */}
                <div className="absolute -left-[1.35rem] top-1.5 w-2 h-2 rounded-full bg-[var(--turmeric)] ring-4 ring-[var(--surface-tint-solid)]" />

                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="text-[11px] font-mono text-[var(--muted)] font-semibold">
                    {m.date}
                  </span>
                  <span className="text-xs font-bold text-[var(--ink)]">
                    {m.title}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${m.badgeColor}`}>
                    {m.badge}
                  </span>
                </div>
                <div className="text-[11px] font-medium text-[var(--muted)]">
                  {m.organization}
                </div>
                <p className="text-xs text-[var(--muted)] leading-relaxed">
                  {m.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </GlassPanel>

      {/* Page Footer (Not Glass - Clean & Grounded) */}
      <footer className="space-y-3 pt-2">
        <PattachitraBorder />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[var(--muted)] pt-1 font-mono">
          <p>
            &copy; {new Date().getFullYear()} Rakesh Majhi · Bhubaneswar, Odisha.
          </p>
          <p className="text-[11px] text-center sm:text-right">
            Not affiliated with Salesforce or any listed vendor. Built with Next.js &amp; Tailwind CSS.
          </p>
        </div>
      </footer>
    </section>
  );
}
