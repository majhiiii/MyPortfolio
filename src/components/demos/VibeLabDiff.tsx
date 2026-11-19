"use client";

import React, { useState } from "react";
import { Terminal, Check, AlertTriangle, ArrowRight, ShieldCheck } from "lucide-react";

const AI_DRAFT_CODE = `// AI-Generated Draft (Naive Implementation)
public class OrderService {
    public static void processOrders(List<Order> orders) {
        for (Order o : orders) {
            // BUG 1: SOQL query inside iteration loop (Governor limit breach)
            Account acc = [SELECT Id, Tier__c FROM Account WHERE Id = :o.AccountId];
            
            // BUG 2: Missing WITH USER_MODE or FLS check
            // BUG 3: Unhandled NullPointerException if acc is null
            if (acc.Tier__c == 'Tier 1') {
                o.Discount_Rate__c = 0.15;
            }
            
            // BUG 4: DML inside loop (Governor limit breach)
            update o;
        }
    }
}`;

const PRODUCTION_CODE = `// Rakesh's Production-Hardened Implementation
public inherited sharing class OrderService {
    public static void processOrders(List<Order> orders) {
        if (orders == null || orders.isEmpty()) return;

        // 1. Bulkify & extract unique account IDs
        Set<Id> accountIds = new Set<Id>();
        for (Order o : orders) {
            if (o.AccountId != null) accountIds.add(o.AccountId);
        }

        // 2. Single SOQL query outside loop with USER_MODE security
        Map<Id, Account> accountMap = new Map<Id, Account>([
            SELECT Id, Tier__c 
            FROM Account 
            WHERE Id IN :accountIds 
            WITH USER_MODE
        ]);

        List<Order> ordersToUpdate = new List<Order>();

        // 3. Safe in-memory iteration with null-safe navigation
        for (Order o : orders) {
            Account acc = accountMap.get(o.AccountId);
            if (acc != null && 'Tier 1'.equalsIgnoreCase(acc.Tier__c)) {
                ordersToUpdate.add(new Order(
                    Id = o.Id,
                    Discount_Rate__c = 0.15
                ));
            }
        }

        // 4. Single bulk DML with partial success error logging
        if (!ordersToUpdate.isEmpty()) {
            Database.SaveResult[] results = Database.update(ordersToUpdate, false, AccessLevel.USER_MODE);
            Logger.logDatabaseErrors(results, 'OrderService.processOrders');
        }
    }
}`;

const HARDENING_POINTS = [
  {
    title: "Governor Limit Protection",
    desc: "Replaced 100+ separate SOQL and DML transactions inside the loop with 1 single SOQL query and 1 bulkified Database.update() call.",
  },
  {
    title: "Salesforce Security (USER_MODE)",
    desc: "Enforced WITH USER_MODE and AccessLevel.USER_MODE to respect object-level and field-level permissions (FLS) per enterprise security standards.",
  },
  {
    title: "Null-Safety & Null Pointer Guards",
    desc: "Added defensive input guards and null checks to prevent transaction aborts on corrupted or partial input payloads.",
  },
  {
    title: "Partial Success & Structured Logging",
    desc: "Replaced allOrNone DML with Database.update(..., false) so one bad record does not block 199 valid records, feeding errors into a centralized Logger.",
  },
];

export function VibeLabDiff() {
  const [view, setView] = useState<"comparison" | "production" | "draft">("comparison");

  return (
    <div className="space-y-4 font-mono text-xs">
      {/* Header */}
      <div className="flex items-center justify-between text-[11px] text-[var(--muted)]">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[var(--accent)]" />
          <span>Vibe Lab Review // AI Speed + Production Engineering Hardening</span>
        </div>
        <div className="flex items-center gap-1 border border-hairline rounded-xs p-0.5 bg-[var(--surface)]">
          <button
            onClick={() => setView("comparison")}
            className={`px-2 py-1 rounded-xs transition-colors ${view === "comparison" ? "bg-[var(--ink)] text-[var(--surface)]" : "text-[var(--muted)] hover:text-[var(--ink)]"}`}
          >
            Side-by-Side
          </button>
          <button
            onClick={() => setView("draft")}
            className={`px-2 py-1 rounded-xs transition-colors ${view === "draft" ? "bg-[var(--ink)] text-[var(--surface)]" : "text-[var(--muted)] hover:text-[var(--ink)]"}`}
          >
            Raw AI Draft
          </button>
          <button
            onClick={() => setView("production")}
            className={`px-2 py-1 rounded-xs transition-colors ${view === "production" ? "bg-[var(--ink)] text-[var(--surface)]" : "text-[var(--muted)] hover:text-[var(--ink)]"}`}
          >
            Hardened Code
          </button>
        </div>
      </div>

      {/* Code Viewer */}
      {view === "comparison" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Draft */}
          <div className="border border-red-500/30 rounded-sm bg-[var(--bg)] p-3 space-y-2">
            <div className="flex items-center justify-between text-[10px] text-red-500 font-bold pb-2 border-b border-hairline/60">
              <span className="flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> RAW AI DRAFT (FAILS GATES)
              </span>
              <span>4 CRITICAL ISSUES</span>
            </div>
            <pre className="font-mono text-[11px] text-[var(--ink)]/80 leading-relaxed overflow-x-auto whitespace-pre">
              {AI_DRAFT_CODE}
            </pre>
          </div>

          {/* Hardened */}
          <div className="border border-emerald-500/40 rounded-sm bg-[var(--bg)] p-3 space-y-2">
            <div className="flex items-center justify-between text-[10px] text-emerald-600 dark:text-emerald-400 font-bold pb-2 border-b border-hairline/60">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> RAKESH'S REVIEW (PRODUCTION)
              </span>
              <span>100% BULKIFIED · USER_MODE</span>
            </div>
            <pre className="font-mono text-[11px] text-[var(--ink)] leading-relaxed overflow-x-auto whitespace-pre">
              {PRODUCTION_CODE}
            </pre>
          </div>
        </div>
      )}

      {view === "draft" && (
        <div className="border border-red-500/30 rounded-sm bg-[var(--bg)] p-4 space-y-2">
          <div className="text-[10px] text-red-500 font-bold">RAW AI DRAFT (UNHARDENED)</div>
          <pre className="font-mono text-xs text-[var(--ink)] leading-relaxed overflow-x-auto whitespace-pre">
            {AI_DRAFT_CODE}
          </pre>
        </div>
      )}

      {view === "production" && (
        <div className="border border-emerald-500/40 rounded-sm bg-[var(--bg)] p-4 space-y-2">
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">PRODUCTION HARDENED IMPLEMENTATION</div>
          <pre className="font-mono text-xs text-[var(--ink)] leading-relaxed overflow-x-auto whitespace-pre">
            {PRODUCTION_CODE}
          </pre>
        </div>
      )}

      {/* Hardening Checklist Callouts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        {HARDENING_POINTS.map((pt, i) => (
          <div key={i} className="p-3 border border-hairline rounded-sm bg-[var(--surface)] space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--ink)]">
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>{pt.title}</span>
            </div>
            <p className="text-[11px] text-[var(--muted)] leading-relaxed pl-5 font-sans">
              {pt.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
