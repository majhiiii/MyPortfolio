"use client";

import React, { useState } from "react";
import { Cpu, AlertTriangle, RotateCcw, ShieldCheck, Zap } from "lucide-react";

interface LimitsState {
  soql: number;
  maxSoql: number;
  dml: number;
  maxDml: number;
  cpu: number;
  maxCpu: number;
  heap: number;
  maxHeap: number;
  isAsync: boolean;
  exception: string | null;
}

const INITIAL_LIMITS: LimitsState = {
  soql: 1,
  maxSoql: 100,
  dml: 1,
  maxDml: 150,
  cpu: 140,
  maxCpu: 10000,
  heap: 450,
  maxHeap: 6000,
  isAsync: false,
  exception: null,
};

export function GovernorGame() {
  const [limits, setLimits] = useState<LimitsState>(INITIAL_LIMITS);
  const [log, setLog] = useState<string>("Initialized synchronous transaction context.");

  const resetLimits = () => {
    setLimits(INITIAL_LIMITS);
    setLog("Context reset. Fresh synchronous execution context.");
  };

  const runBulkified = () => {
    if (limits.exception) return;
    setLimits((prev) => ({
      ...prev,
      soql: prev.soql + 1,
      dml: prev.dml + 1,
      cpu: prev.cpu + 80,
      heap: prev.heap + 120,
    }));
    setLog("SUCCESS: Bulkified query with Map<Id, SObject>. Processed 200 records with 1 SOQL and 1 DML.");
  };

  const runAntiPattern = () => {
    setLimits((prev) => ({
      ...prev,
      soql: 101,
      cpu: prev.cpu + 1800,
      exception: "System.LimitException: Too many SOQL queries: 101 at OrderTriggerHandler.cls:line 42",
    }));
    setLog("CRITICAL FAILURE: Anti-pattern executed. SOQL statement inside for-loop exceeded synchronous governor limit (100). Entire transaction rolled back!");
  };

  const offloadToQueueable = () => {
    setLimits({
      soql: 0,
      maxSoql: 200, // Async gets 200 SOQL
      dml: 0,
      maxDml: 200,
      cpu: 0,
      maxCpu: 60000, // Async gets 60,000ms CPU
      heap: 0,
      maxHeap: 12000, // Async gets 12MB heap
      isAsync: true,
      exception: null,
    });
    setLog("SYSTEM: System.enqueueJob(new QueueableOrderProcessor()) executed. New asynchronous context created with doubled limits (200 SOQL / 60,000ms CPU / 12MB Heap).");
  };

  const getMeterColor = (val: number, max: number) => {
    const pct = (val / max) * 100;
    if (pct > 99) return "bg-red-500";
    if (pct > 70) return "bg-[var(--amber)]";
    return "bg-[var(--accent)]";
  };

  return (
    <div className="space-y-4 font-mono text-xs">
      {/* Header */}
      <div className="flex items-center justify-between text-[11px] text-[var(--muted)]">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-[var(--accent)]" />
          <span>Apex Governor Limits Simulation · Live Execution Context</span>
        </div>
        <span className="font-semibold text-[var(--ink)]">
          MODE: {limits.isAsync ? "ASYNCHRONOUS (QUEUEABLE)" : "SYNCHRONOUS"}
        </span>
      </div>

      {/* Exception Banner */}
      {limits.exception && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 rounded-sm space-y-1">
          <div className="flex items-center gap-2 font-bold text-xs">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>TRANSACTION FATAL ERROR</span>
          </div>
          <div className="font-mono text-[10px]">{limits.exception}</div>
        </div>
      )}

      {/* 4 Limits Gauges */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* SOQL Queries */}
        <div className="p-3 border border-hairline rounded-sm bg-[var(--surface)] space-y-2">
          <div className="flex items-center justify-between text-[10px] text-[var(--muted)]">
            <span>SOQL QUERIES</span>
            <span className={limits.soql > limits.maxSoql ? "text-red-500 font-bold" : "text-[var(--ink)]"}>
              {limits.soql} / {limits.maxSoql}
            </span>
          </div>
          <div className="w-full h-1.5 bg-[var(--bg)] rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${getMeterColor(limits.soql, limits.maxSoql)}`}
              style={{ width: `${Math.min(100, (limits.soql / limits.maxSoql) * 100)}%` }}
            />
          </div>
        </div>

        {/* DML Statements */}
        <div className="p-3 border border-hairline rounded-sm bg-[var(--surface)] space-y-2">
          <div className="flex items-center justify-between text-[10px] text-[var(--muted)]">
            <span>DML STATEMENTS</span>
            <span className="text-[var(--ink)]">{limits.dml} / {limits.maxDml}</span>
          </div>
          <div className="w-full h-1.5 bg-[var(--bg)] rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${getMeterColor(limits.dml, limits.maxDml)}`}
              style={{ width: `${Math.min(100, (limits.dml / limits.maxDml) * 100)}%` }}
            />
          </div>
        </div>

        {/* CPU Time */}
        <div className="p-3 border border-hairline rounded-sm bg-[var(--surface)] space-y-2">
          <div className="flex items-center justify-between text-[10px] text-[var(--muted)]">
            <span>CPU TIME (MS)</span>
            <span className="text-[var(--ink)]">{limits.cpu} / {limits.maxCpu}ms</span>
          </div>
          <div className="w-full h-1.5 bg-[var(--bg)] rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${getMeterColor(limits.cpu, limits.maxCpu)}`}
              style={{ width: `${Math.min(100, (limits.cpu / limits.maxCpu) * 100)}%` }}
            />
          </div>
        </div>

        {/* Heap Size */}
        <div className="p-3 border border-hairline rounded-sm bg-[var(--surface)] space-y-2">
          <div className="flex items-center justify-between text-[10px] text-[var(--muted)]">
            <span>HEAP SIZE (KB)</span>
            <span className="text-[var(--ink)]">{limits.heap} / {limits.maxHeap}KB</span>
          </div>
          <div className="w-full h-1.5 bg-[var(--bg)] rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${getMeterColor(limits.heap, limits.maxHeap)}`}
              style={{ width: `${Math.min(100, (limits.heap / limits.maxHeap) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <button
          onClick={runBulkified}
          disabled={!!limits.exception}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--surface)] border border-hairline hover:border-[var(--accent)] text-[var(--ink)] rounded-xs transition-colors disabled:opacity-50"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Execute Bulkified Logic</span>
        </button>

        <button
          onClick={runAntiPattern}
          disabled={!!limits.exception}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--surface)] border border-red-500/30 text-red-500 hover:bg-red-500/10 rounded-xs transition-colors disabled:opacity-50"
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Trigger SOQL in Loop (Anti-Pattern)</span>
        </button>

        <button
          onClick={offloadToQueueable}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--ink)] text-[var(--surface)] rounded-xs hover:opacity-90 transition-opacity"
        >
          <Zap className="w-3.5 h-3.5 text-[var(--accent)]" />
          <span>Enqueue Queueable Apex (Async Reset)</span>
        </button>

        <button
          onClick={resetLimits}
          className="flex items-center gap-1 text-[var(--muted)] hover:text-[var(--ink)] ml-auto transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Context</span>
        </button>
      </div>

      {/* Console log */}
      <div className="p-3 bg-[var(--bg)] border border-hairline rounded-sm font-mono text-[11px] text-[var(--muted)] space-y-1">
        <div className="text-[10px] uppercase text-[var(--muted)]/70">Console Output:</div>
        <div className="text-[var(--ink)]">{log}</div>
      </div>
    </div>
  );
}
