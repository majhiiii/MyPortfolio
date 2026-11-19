"use client";

import React, { useState } from "react";
import { Terminal, Check, AlertTriangle, ShieldCheck } from "lucide-react";

const UNHARDENED_DRAFT_CODE = `// Unhardened Draft (Naive Implementation)
public class OrderService {
    public static void processOrders(List<Order> orders) {
        for (Order o : orders) {
            // DEFECT 1: SOQL query inside iteration loop (Governor limit breach)
            Account acc = [SELECT Id, Tier__c FROM Account WHERE Id = :o.AccountId];
            
            // DEFECT 2: Missing WITH USER_MODE or field-level security check
            // DEFECT 3: Unhandled NullPointerException if acc is null
            if (acc.Tier__c == 'Tier 1') {
                o.Discount_Rate__c = 0.15;
            }
            
            // DEFECT 4: DML inside loop (150 DML statement limit breach)
            update o;
        }
    }
}`;

const PRODUCTION_HARDENED_CODE = `// Rakesh's Production-Hardened Implementation @ ASSPL
public inherited sharing class OrderService {
    public static void processOrders(List<Order> orders) {
        if (orders == null || orders.isEmpty()) return;

        // 1. Bulkify & extract unique account IDs in one pass
        Set<Id> accountIds = new Set<Id>();
        for (Order o : orders) {
            if (o.AccountId != null) accountIds.add(o.AccountId);
        }

        // 2. Single bulk SOQL query outside loop with USER_MODE security
        Map<Id, Account> accountMap = new Map<Id, Account>([
            SELECT Id, Tier__c 
            FROM Account 
            WHERE Id IN :accountIds 
            WITH USER_MODE
        ]);

        List<Order> ordersToUpdate = new List<Order>();

        // 3. In-memory iteration with defensive null guards
        for (Order o : orders) {
            Account acc = accountMap.get(o.AccountId);
            if (acc != null && 'Tier 1'.equalsIgnoreCase(acc.Tier__c)) {
                ordersToUpdate.add(new Order(
                    Id = o.Id,
                    Discount_Rate__c = 0.15
                ));
            }
        }

        // 4. Single bulk DML with partial success handling (allOrNone = false)
        if (!ordersToUpdate.isEmpty()) {
            Database.SaveResult[] results = Database.update(ordersToUpdate, false, AccessLevel.USER_MODE);
            Logger.logDatabaseErrors(results, 'OrderService.processOrders');
        }
    }
}`;

const HARDENING_POINTS = [
  {
    title: "Governor Limit Bulkification",
    desc: "Replaced 100+ separate SOQL and DML transactions inside the loop with 1 single query and 1 bulkified Database.update() call.",
  },
  {
    title: "Salesforce Security (USER_MODE)",
    desc: "Enforced WITH USER_MODE and AccessLevel.USER_MODE to respect object-level and field-level permissions (FLS) per enterprise standards.",
  },
  {
    title: "Defensive Null-Safety",
    desc: "Added defensive input guards and null checks to prevent transaction aborts on empty lists or missing related account lookups.",
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
          <Terminal className="w-4 h-4 text-[var(--ink)]" />
          <span>Code Review Inspector // Enterprise Hardening Standards</span>
        </div>
        <div className="flex items-center gap-1 border border-hairline rounded-xs p-0.5 bg-[var(--surface)]">
          <button
            onClick={() => setView("comparison")}
            className={`px-2 py-1 rounded-xs transition-colors ${view === "comparison" ? "bg-[var(--ink)] text-[var(--surface)] font-bold" : "text-[var(--muted)] hover:text-[var(--ink)]"}`}
          >
            Side-by-Side
          </button>
          <button
            onClick={() => setView("draft")}
            className={`px-2 py-1 rounded-xs transition-colors ${view === "draft" ? "bg-[var(--ink)] text-[var(--surface)] font-bold" : "text-[var(--muted)] hover:text-[var(--ink)]"}`}
          >
            Unhardened Draft
          </button>
          <button
            onClick={() => setView("production")}
            className={`px-2 py-1 rounded-xs transition-colors ${view === "production" ? "bg-[var(--ink)] text-[var(--surface)] font-bold" : "text-[var(--muted)] hover:text-[var(--ink)]"}`}
          >
            Hardened Code
          </button>
        </div>
      </div>

      {/* Code Viewer */}
      {view === "comparison" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Draft */}
          <div className="border border-dashed border-hairline rounded-sm bg-[var(--bg)] p-3 space-y-2">
            <div className="flex items-center justify-between text-[10px] font-bold text-[var(--muted)] pb-2 border-b border-hairline/60">
              <span className="flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-[var(--ink)]" /> UNHARDENED IMPLEMENTATION
              </span>
              <span>4 CRITICAL DEFECTS</span>
            </div>
            <pre className="font-mono text-[11px] text-[var(--muted)] leading-relaxed overflow-x-auto whitespace-pre">
              {UNHARDENED_DRAFT_CODE}
            </pre>
          </div>

          {/* Hardened */}
          <div className="border border-[var(--ink)] rounded-sm bg-[var(--surface)] p-3 space-y-2">
            <div className="flex items-center justify-between text-[10px] font-bold text-[var(--ink)] pb-2 border-b border-hairline">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> RAKESH'S REVIEW (PRODUCTION HARDENED)
              </span>
              <span>100% BULKIFIED · USER_MODE</span>
            </div>
            <pre className="font-mono text-[11px] text-[var(--ink)] leading-relaxed overflow-x-auto whitespace-pre font-medium">
              {PRODUCTION_HARDENED_CODE}
            </pre>
          </div>
        </div>
      )}

      {view === "draft" && (
        <div className="border border-dashed border-hairline rounded-sm bg-[var(--bg)] p-4 space-y-2">
          <div className="text-[10px] text-[var(--muted)] font-bold">UNHARDENED DRAFT (NON-BULKIFIED)</div>
          <pre className="font-mono text-xs text-[var(--muted)] leading-relaxed overflow-x-auto whitespace-pre">
            {UNHARDENED_DRAFT_CODE}
          </pre>
        </div>
      )}

      {view === "production" && (
        <div className="border border-[var(--ink)] rounded-sm bg-[var(--surface)] p-4 space-y-2">
          <div className="text-[10px] font-bold text-[var(--ink)]">PRODUCTION HARDENED (ASSPL STANDARDS)</div>
          <pre className="font-mono text-xs text-[var(--ink)] leading-relaxed overflow-x-auto whitespace-pre font-medium">
            {PRODUCTION_HARDENED_CODE}
          </pre>
        </div>
      )}

      {/* Hardening Checklist Callouts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        {HARDENING_POINTS.map((pt, i) => (
          <div key={i} className="p-3 border border-hairline rounded-sm bg-[var(--surface)] space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--ink)]">
              <Check className="w-3.5 h-3.5 text-[var(--ink)] shrink-0" />
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
