"use client";

import React, { useState, useEffect, useRef } from "react";
import { GitBranch, Play, CheckCircle2, Loader2, Terminal } from "lucide-react";

interface PipelineStep {
  name: string;
  command: string;
  duration: string;
  details: string;
}

const STAGES: PipelineStep[] = [
  {
    name: "01. Static Code Analysis",
    command: "pmd check --rulesets apex-rules.xml --format text",
    duration: "4.2s",
    details: "PASS: 0 critical vulnerabilities · Zero hardcoded IDs detected · SOQL user mode enforced.",
  },
  {
    name: "02. Unit Test Suite (>85% Gate)",
    command: "sf apex run test --code-coverage --result-format human",
    duration: "18.5s",
    details: "PASS: 42 test classes executed · 100% passed · Overall org coverage: 89.4% (Threshold: 85%).",
  },
  {
    name: "03. Scratch Org Deploy",
    command: "sf project deploy start --target-org ci-scratch-org",
    duration: "12.1s",
    details: "PASS: 184 components deployed without conflicts · LWC bundle compilation successful.",
  },
  {
    name: "04. Staging Delta Validation",
    command: "sf project deploy validate --target-org staging --test-level RunLocalTests",
    duration: "24.8s",
    details: "PASS: Validation Job ID: 0Af5g000000XyZ1 · Staging dry run clean.",
  },
  {
    name: "05. Production Quick Deploy",
    command: "sf project deploy quick --job-id 0Af5g000000XyZ1 --target-org production",
    duration: "3.4s",
    details: "SUCCESS: Deployed to production in 3.4 seconds without re-running tests. Release complete.",
  },
];

export function PipelineVisualizer() {
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    "GitHub Actions Runner (ubuntu-latest) initialized.",
    "Pipeline configured for ASSPL production release management across 3 client tracks.",
    "Ready to execute release validation suite.",
  ]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const runPipeline = () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveStep(0);
    setConsoleLogs(["[00:00] Triggered workflow: salesforce-ci-cd.yml on branch: main"]);

    let current = 0;
    intervalRef.current = setInterval(() => {
      const stage = STAGES[current];
      setConsoleLogs((prev) => [
        ...prev,
        `[Stage 0${current + 1}/05] $ ${stage.command}`,
        ` -> ${stage.details} (${stage.duration})`,
      ]);

      current++;
      setActiveStep(current);

      if (current >= STAGES.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsRunning(false);
        setConsoleLogs((prev) => [
          ...prev,
          "==> PIPELINE RUN COMPLETED: 100% PASS · 99%+ PRODUCTION UPTIME MAINTAINED",
        ]);
      }
    }, 850);
  };

  return (
    <div className="space-y-4 font-mono text-xs">
      {/* Header bar */}
      <div className="flex items-center justify-between text-[11px] text-[var(--muted)]">
        <div className="flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-[var(--ink)]" />
          <span>Automated GitHub CI/CD Pipeline · Release Management at ASSPL</span>
        </div>
        <button
          onClick={runPipeline}
          disabled={isRunning}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--ink)] text-[var(--surface)] rounded-xs hover:opacity-90 font-medium transition-opacity disabled:opacity-50"
        >
          {isRunning ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          <span>{isRunning ? "Executing Stages..." : "Execute CI/CD Run"}</span>
        </button>
      </div>

      {/* 5 Stages Progress Tracker */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
        {STAGES.map((s, idx) => {
          const isPassed = activeStep > idx;
          const isCurrent = activeStep === idx;
          return (
            <div
              key={idx}
              className={`p-3 border rounded-sm transition-all ${
                isCurrent
                  ? "border-[var(--ink)] bg-[var(--surface)] font-bold shadow-xs"
                  : isPassed
                  ? "border-[var(--ink)] bg-[var(--surface)]"
                  : "border-hairline bg-[var(--bg)] opacity-60"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] uppercase font-bold text-[var(--ink)]">STAGE 0{idx + 1}</span>
                {isPassed && <CheckCircle2 className="w-3.5 h-3.5 text-[var(--ink)]" />}
                {isCurrent && <Loader2 className="w-3.5 h-3.5 text-[var(--ink)] animate-spin" />}
              </div>
              <div className="text-[11px] font-semibold text-[var(--ink)] truncate">{s.name.split(". ")[1]}</div>
              <div className="text-[10px] text-[var(--muted)] mt-1">{s.duration}</div>
            </div>
          );
        })}
      </div>

      {/* Live Terminal Log */}
      <div className="border border-hairline rounded-sm bg-[var(--bg)] p-4 space-y-2">
        <div className="flex items-center justify-between text-[10px] text-[var(--muted)] border-b border-hairline/60 pb-2">
          <span className="flex items-center gap-1.5">
            <Terminal className="w-3 h-3 text-[var(--ink)]" />
            RUNNER CONSOLE OUTPUT // bash
          </span>
          <span className="text-[var(--ink)] font-semibold">{isRunning ? "STATUS: EXECUTING" : "STATUS: READY"}</span>
        </div>
        <div className="font-mono text-[11px] space-y-1 max-h-[170px] overflow-y-auto leading-relaxed text-[var(--ink)]">
          {consoleLogs.map((line, i) => (
            <div
              key={i}
              className={
                line.includes("PASS") || line.includes("SUCCESS") || line.includes("COMPLETED")
                  ? "text-[var(--ink)] font-semibold"
                  : line.includes("$ ")
                  ? "text-[var(--ink)] font-mono"
                  : "text-[var(--muted)]"
              }
            >
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
