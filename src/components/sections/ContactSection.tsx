"use client";

import { useState, useEffect } from "react";
import { PERSONAL_DATA } from "@/lib/data";
import { Check, Copy, ArrowUpRight, Mail } from "lucide-react";
import { Magnetic } from "@/components/ui/Magnetic";
import { motion, AnimatePresence } from "framer-motion";

const AVAILABILITY_STRIP = [
  "AVAILABLE FOR ENTERPRISE APEX & LWC ROLES",
  "BHUBANESWAR & HYBRID / REMOTE",
  "ASSPL TENURE &bull; VERIFIED DELIVERABLES",
  "AGENTFORCE & B2B COMMERCE",
  "OPEN TO TECHNICAL DISCUSSIONS",
];

const ROTATING_WORDS = [
  { word: "architecture.", color: "#0176D3" },
  { word: "Agentforce.", color: "#6B4EFF" },
  { word: "integrations.", color: "#00A38C" },
  { word: "production.", color: "#FF8A1F" },
  { word: "systems.", color: "#FF5A5F" },
];

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIdx((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_DATA.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <section id="contact" className="py-24 lg:py-36 bg-[var(--bg)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 space-y-16">
        
        {/* Contact Header */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[var(--muted)]">
            <span>08 / GET IN TOUCH</span>
            <span>&bull;</span>
            <span>Direct Channel</span>
          </div>

          <h2 className="font-serif text-[clamp(4rem,10.5vw,11rem)] font-normal text-[var(--ink)] leading-[0.88] tracking-[-0.03em] select-none">
            Let&apos;s talk{" "}
            <AnimatePresence mode="wait">
              <motion.span
                key={ROTATING_WORDS[wordIdx].word}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="italic inline-block"
                style={{ color: ROTATING_WORDS[wordIdx].color }}
              >
                {ROTATING_WORDS[wordIdx].word}
              </motion.span>
            </AnimatePresence>
          </h2>

          <p className="font-sans text-lg sm:text-xl text-[var(--muted)] max-w-2xl leading-relaxed">
            Interested in discussing enterprise Salesforce engineering, Agentforce deployments, B2B Commerce platforms, or technical leadership at ASSPL? Reach out directly.
          </p>
        </div>

        {/* Magnetic Action Controls */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono pt-4">
          <Magnetic strength={0.3} radius={70}>
            <a
              href={`mailto:${PERSONAL_DATA.email}?subject=Salesforce%20Opportunity%20-%20Discussion`}
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-[var(--ink)] text-[var(--bg)] font-medium rounded-full hover:opacity-90 transition-opacity shadow-sm"
            >
              <Mail className="w-4 h-4 text-[var(--accent)]" />
              <span className="text-sm font-sans font-medium">Send Email</span>
              <span className="font-mono text-xs">&rarr;</span>
            </a>
          </Magnetic>

          <Magnetic strength={0.3} radius={70}>
            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-2.5 px-6 py-4 border border-hairline rounded-full text-[var(--ink)] hover:border-[var(--ink)] transition-colors bg-[var(--surface)] text-sm font-sans font-medium"
            >
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    className="flex items-center gap-2 text-[var(--accent)]"
                  >
                    <Check className="w-4 h-4" />
                    <span className="font-mono text-xs">Copied to clipboard</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4 text-[var(--muted)]" />
                    <span>Copy: {PERSONAL_DATA.email}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </Magnetic>

          <Magnetic strength={0.2} radius={50}>
            <a
              href={PERSONAL_DATA.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-4 border border-hairline rounded-full text-[var(--muted)] hover:text-[var(--ink)] hover:border-[var(--ink)] transition-colors text-xs font-mono"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </Magnetic>

          <Magnetic strength={0.2} radius={50}>
            <a
              href={PERSONAL_DATA.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-4 border border-hairline rounded-full text-[var(--muted)] hover:text-[var(--ink)] hover:border-[var(--ink)] transition-colors text-xs font-mono"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </Magnetic>
        </div>

        {/* Looping Marquee of Availability Text */}
        <div className="w-full border-y border-hairline py-4 overflow-hidden select-none my-8">
          <div className="flex whitespace-nowrap animate-[marquee_30s_linear_infinite]">
            {[...AVAILABILITY_STRIP, ...AVAILABILITY_STRIP, ...AVAILABILITY_STRIP].map(
              (item, idx) => (
                <span
                  key={idx}
                  className="mx-6 text-xs font-mono tracking-widest text-[var(--muted)] flex items-center gap-4"
                >
                  <span dangerouslySetInnerHTML={{ __html: item }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                </span>
              )
            )}
          </div>
        </div>

        {/* Minimal Footer */}
        <footer className="border-t border-hairline pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-[var(--muted)]">
          <div className="space-y-1">
            <div>
              &copy; {new Date().getFullYear()} Rakesh Majhi &bull; Bhubaneswar, India
            </div>
            <div className="text-[11px] text-[var(--muted)]/80">
              Not affiliated with Salesforce, AWS or any listed vendor. Logos belong to their owners.
            </div>
          </div>
          <div className="text-[11px]">
            Colorful Stack &bull; Next.js Static Export &bull; Hosted on GitHub Pages
          </div>
        </footer>

      </div>
    </section>
  );
}
