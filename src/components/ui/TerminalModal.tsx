"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePortfolioStore } from "@/lib/store";
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CommandLog {
  id: string;
  type: "input" | "output";
  text: string;
}

export function TerminalModal() {
  const { isTerminalOpen, setTerminalOpen } = usePortfolioStore();
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CommandLog[]>([
    { id: "1", type: "output", text: "Rakesh Majhi [Enterprise Core v3.0.0] - Type 'help' for available commands." },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Toggle on `~` key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`" || e.key === "~") {
        e.preventDefault();
        setTerminalOpen(!isTerminalOpen);
      }
      if (e.key === "Escape" && isTerminalOpen) {
        setTerminalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isTerminalOpen, setTerminalOpen]);

  useEffect(() => {
    if (isTerminalOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isTerminalOpen, history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    const newLogs: CommandLog[] = [...history, { id: String(Date.now()), type: "input", text: inputVal }];

    switch (cmd) {
      case "help":
        newLogs.push({
          id: String(Date.now() + 1),
          type: "output",
          text: `Available commands:
  whoami        - Developer identity, tenure at ASSPL & credentials
  skills        - Summary of 8 stack domains & platform competencies
  projects      - Production enterprise systems index
  resume        - Request CV / verified portfolio dossier
  contact       - Direct communications channel
  sudo hire-me  - Autonomous recruitment dispatch
  clear         - Wipe terminal screen
  exit          - Close terminal window`,
        });
        break;

      case "whoami":
        newLogs.push({
          id: String(Date.now() + 1),
          type: "output",
          text: `Rakesh Majhi
Role: Software Developer @ Abacus System & Solution Pvt. Ltd. (ASSPL)
Location: Bhubaneswar, India
Certifications: Salesforce Certified Agentforce Specialist & AI Associate
Tenure: 2 Years enterprise production experience across 3 concurrent tracks`,
        });
        break;

      case "skills":
        newLogs.push({
          id: String(Date.now() + 1),
          type: "output",
          text: `Core Technical Domains:
  1. Salesforce Platform : Apex, LWC, CloudCraze B2B, SOQL, Flow
  2. Agentforce & AI     : Topics, Actions, Invocable Apex, Einstein Bots
  3. Integrations & APIs : OAuth 2.0 PKCE, REST/SOAP, Stripe, NACHA ACH
  4. Full-Stack Web      : Next.js, React, Python FastAPI, JavaScript
  5. AWS Infrastructure  : Amplify, CloudFront, ACM, RDS MySQL, Lambda, S3
  6. Delivery & DevOps   : GitHub Actions, sf CLI, Scratch Orgs, PMD`,
        });
        break;

      case "projects":
        newLogs.push({
          id: String(Date.now() + 1),
          type: "output",
          text: `Production Systems Index @ ASSPL:
  [01] B2B Commerce Platform & CPQ Quoting Engine
  [02] In-House Outlook Add-in (Multi-Org OAuth PKCE)
  [03] Agentforce Autonomous Suite (4 Live Agents)
  [04] Health Cloud Patient Intake & Einstein Bots
  [05] Enterprise Billing, NACHA Engine & ERP Reconciliations
  [06] Next.js Web Platforms & AWS Cloud Infrastructure
  [07] Amazon Connect & Salesforce Service Cloud CTI
  [08] GitHub Actions Enterprise CI/CD Pipeline`,
        });
        break;

      case "resume":
        newLogs.push({
          id: String(Date.now() + 1),
          type: "output",
          text: "Opening email client to request full verified CV dossier...",
        });
        window.location.href = "mailto:rakeshmajhi.connect@gmail.com?subject=Resume%20Request%20-%20Rakesh%20Majhi";
        break;

      case "contact":
        newLogs.push({
          id: String(Date.now() + 1),
          type: "output",
          text: `Direct Contact Channels:
  Email    : rakeshmajhi.connect@gmail.com
  LinkedIn : https://linkedin.com/in/rakeshmajhi57
  GitHub   : https://github.com/rakeshmajhi57
  Location : Bhubaneswar, India`,
        });
        break;

      case "sudo hire-me":
        newLogs.push({
          id: String(Date.now() + 1),
          type: "output",
          text: `[ACCESS GRANTED]
==============================================
   CONGRATULATIONS! TOP TALENT IDENTIFIED.
   Dispatching immediate technical interview!
==============================================
Let's build something precise together. Emailing: rakeshmajhi.connect@gmail.com`,
        });
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      case "exit":
        setTerminalOpen(false);
        setInputVal("");
        return;

      default:
        newLogs.push({
          id: String(Date.now() + 1),
          type: "output",
          text: `bash: command not found: ${cmd}. Type 'help' for available commands.`,
        });
        break;
    }

    setHistory(newLogs);
    setInputVal("");
  };

  if (!isTerminalOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
        onClick={() => setTerminalOpen(false)}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="w-full max-w-2xl h-[460px] bg-[#0C0C0E] border border-white/20 rounded-md shadow-2xl flex flex-col overflow-hidden font-mono text-xs text-white"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Title Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-black/50 border-b border-white/10 select-none">
            <div className="flex items-center gap-2 text-white/60">
              <TerminalIcon className="w-4 h-4 text-[#0176D3]" />
              <span className="text-[11px] font-semibold text-white">rakesh@asspl-core:~ (press ` to toggle)</span>
            </div>
            <button
              onClick={() => setTerminalOpen(false)}
              className="p-1 text-white/40 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Terminal Screen */}
          <div className="flex-1 p-4 overflow-y-auto space-y-2 text-[#F4F1EA] text-[11px] leading-relaxed">
            {history.map((log) => (
              <div key={log.id} className="whitespace-pre-wrap">
                {log.type === "input" ? (
                  <div className="flex items-center gap-2 text-[#4C8DFF]">
                    <span>&gt;</span>
                    <span className="text-white">{log.text}</span>
                  </div>
                ) : (
                  <div className="text-white/80">{log.text}</div>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Terminal Input Bar */}
          <form onSubmit={handleCommand} className="flex items-center px-4 py-3 bg-black/40 border-t border-white/10">
            <span className="text-[#0176D3] mr-2 font-bold">&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="type a command (e.g. 'help', 'whoami', 'skills')..."
              className="w-full bg-transparent text-white placeholder-white/30 focus:outline-none text-[11px]"
              autoFocus
            />
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
