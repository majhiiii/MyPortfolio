"use client";

import { useState } from "react";
import { PERSONAL_DATA } from "@/lib/data";
import { Check, Copy, ArrowUpRight } from "lucide-react";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_DATA.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <section id="contact" className="py-24 lg:py-36">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 space-y-16">
        
        {/* Contact Header with Editorial Typography */}
        <div className="space-y-6">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">08 / CONTACT</span>
          <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] font-bold tracking-tight text-[var(--ink)] leading-[1.05] max-w-4xl">
            Let's build something <span className="font-serif italic font-normal text-[var(--accent)]">precise</span>.
          </h2>
          <p className="text-base sm:text-lg text-[var(--muted)] max-w-xl leading-relaxed">
            Available for Salesforce Developer & Administrator roles, Agentforce AI implementation, and complex enterprise integrations.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
          <a
            href={`mailto:${PERSONAL_DATA.email}?subject=Salesforce%20Opportunity%20-%20Discussion`}
            className="px-6 py-3.5 bg-[var(--ink)] text-[var(--surface)] font-medium rounded-sm hover:opacity-90 transition-opacity"
          >
            Send Email
          </a>

          <button
            onClick={copyEmail}
            className="flex items-center gap-2 px-5 py-3.5 border border-hairline rounded-sm text-[var(--ink)] hover:border-[var(--accent)] transition-colors bg-[var(--surface)]"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied to clipboard</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[var(--muted)]" />
                <span>Copy Email ({PERSONAL_DATA.email})</span>
              </>
            )}
          </button>

          <a
            href={PERSONAL_DATA.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-5 py-3.5 border border-hairline rounded-sm text-[var(--muted)] hover:text-[var(--ink)] hover:border-[var(--ink)] transition-colors"
          >
            <span>LinkedIn</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <a
            href={PERSONAL_DATA.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-5 py-3.5 border border-hairline rounded-sm text-[var(--muted)] hover:text-[var(--ink)] hover:border-[var(--ink)] transition-colors"
          >
            <span>GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Minimal Footer */}
        <footer className="border-t border-hairline pt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-[var(--muted)]">
          <div>
            © {new Date().getFullYear()} Rakesh Majhi · {PERSONAL_DATA.disclaimer}
          </div>
          <div>
            Built with modern Next.js static export · Hosted on GitHub Pages
          </div>
        </footer>

      </div>
    </section>
  );
}
