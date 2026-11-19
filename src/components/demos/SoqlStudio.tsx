"use client";

import React, { useState } from "react";
import { Play, Copy, Check, Database } from "lucide-react";

interface MockRecord {
  [key: string]: string | number;
}

const SAMPLE_DATA: Record<string, MockRecord[]> = {
  Opportunity: [
    { Id: "0065g00000ABC1", Name: "Acme Corp B2B Expansion", StageName: "Closed Won", Amount: 145000, Probability: 100 },
    { Id: "0065g00000ABC2", Name: "Global Media Health Cloud Migration", StageName: "Negotiation", Amount: 85000, Probability: 80 },
    { Id: "0065g00000ABC3", Name: "Nordic Retail Storefront Licensing", StageName: "Closed Won", Amount: 220000, Probability: 100 },
    { Id: "0065g00000ABC4", Name: "Apex & Agentforce Automation Pilot", StageName: "Value Proposition", Amount: 42000, Probability: 50 },
  ],
  Contact: [
    { Id: "0035g00000CON1", FirstName: "Sarah", LastName: "Chen", Email: "s.chen@acme.com", Department: "Engineering", Title: "VP of Engineering" },
    { Id: "0035g00000CON2", FirstName: "David", LastName: "Miller", Email: "d.miller@global.com", Department: "Operations", Title: "Director of Ops" },
    { Id: "0035g00000CON3", FirstName: "Elena", LastName: "Rostova", Email: "e.rostova@nordic.com", Department: "Engineering", Title: "Lead Architect" },
  ],
  Agentforce_Log__c: [
    { Id: "a015g00000LOG1", Agent_Name__c: "Guided_Shopping_Agent", Session_Id__c: "sess_98410", Status__c: "SUCCESS", Latency_ms__c: 420 },
    { Id: "a015g00000LOG2", Agent_Name__c: "Debug_Log_Analyzer", Session_Id__c: "sess_98411", Status__c: "SUCCESS", Latency_ms__c: 310 },
    { Id: "a015g00000LOG3", Agent_Name__c: "Customer_Service_Bot", Session_Id__c: "sess_98412", Status__c: "SUCCESS", Latency_ms__c: 580 },
  ],
};

const PRESETS = [
  { label: "High Value Deals", query: "SELECT Id, Name, StageName, Amount FROM Opportunity WHERE Amount > 50000 ORDER BY Amount DESC" },
  { label: "Engineering Contacts", query: "SELECT Id, FirstName, LastName, Email, Title FROM Contact WHERE Department = 'Engineering'" },
  { label: "Agentforce Latency Logs", query: "SELECT Id, Agent_Name__c, Session_Id__c, Status__c, Latency_ms__c FROM Agentforce_Log__c WHERE Status__c = 'SUCCESS'" },
];

export function SoqlStudio() {
  const [query, setQuery] = useState(PRESETS[0].query);
  const [results, setResults] = useState<MockRecord[]>(SAMPLE_DATA.Opportunity);
  const [executionTime, setExecutionTime] = useState<number>(14);
  const [copied, setCopied] = useState(false);
  const [activePreset, setActivePreset] = useState(0);

  const handleRun = () => {
    const t0 = performance.now();
    const upper = query.toUpperCase();

    let targetObject = "Opportunity";
    if (upper.includes("FROM CONTACT")) targetObject = "Contact";
    else if (upper.includes("FROM AGENTFORCE_LOG__C")) targetObject = "Agentforce_Log__c";

    let records = [...(SAMPLE_DATA[targetObject] || SAMPLE_DATA.Opportunity)];

    if (upper.includes("WHERE AMOUNT > 50000")) {
      records = records.filter((r) => typeof r.Amount === "number" && r.Amount > 50000);
    } else if (upper.includes("DEPARTMENT = 'ENGINEERING'")) {
      records = records.filter((r) => r.Department === "Engineering");
    }

    if (upper.includes("ORDER BY AMOUNT DESC")) {
      records.sort((a, b) => Number(b.Amount || 0) - Number(a.Amount || 0));
    }

    setResults(records);
    setExecutionTime(Math.round(performance.now() - t0 + 12));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(results, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const headers = results.length > 0 ? Object.keys(results[0]) : [];

  return (
    <div className="space-y-4 font-mono text-xs">
      {/* Preset Pickers */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] text-[var(--muted)] flex items-center gap-1">
          <Database className="w-3 h-3 text-[var(--accent)]" /> Preset Queries:
        </span>
        {PRESETS.map((p, idx) => (
          <button
            key={idx}
            onClick={() => {
              setActivePreset(idx);
              setQuery(p.query);
            }}
            className={`px-2.5 py-1 text-[11px] rounded-xs border transition-colors ${
              activePreset === idx
                ? "border-[var(--accent)] bg-[var(--surface)] text-[var(--accent)] font-semibold"
                : "border-hairline text-[var(--muted)] hover:text-[var(--ink)]"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Code Editor Box */}
      <div className="border border-hairline rounded-sm bg-[var(--bg)] p-3 space-y-2">
        <div className="flex items-center justify-between text-[10px] text-[var(--muted)]">
          <span>SOQL EDITOR // USER_MODE SECURITY ENFORCED</span>
          <span>DIALECT: SALESFORCE SOQL 62.0</span>
        </div>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          rows={3}
          className="w-full bg-transparent font-mono text-xs text-[var(--ink)] focus:outline-hidden resize-none leading-relaxed"
          placeholder="Enter SOQL query..."
          spellCheck={false}
        />
        <div className="flex items-center justify-between pt-2 border-t border-hairline/60">
          <span className="text-[10px] text-[var(--muted)]">Ctrl/Cmd + Enter to run</span>
          <button
            onClick={handleRun}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--ink)] text-[var(--surface)] rounded-xs hover:opacity-90 font-medium transition-opacity"
          >
            <Play className="w-3 h-3 text-[var(--accent)] fill-current" />
            <span>Execute SOQL</span>
          </button>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-[11px] text-[var(--muted)] px-1">
        <div className="flex items-center gap-3">
          <span>Returned: <strong className="text-[var(--ink)]">{results.length}</strong> records</span>
          <span>•</span>
          <span>Latency: <strong className="text-[var(--accent)]">{executionTime}ms</strong></span>
          <span>•</span>
          <span>SOQL Limits: <strong>1 / 100</strong></span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 hover:text-[var(--ink)] transition-colors"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
          <span>{copied ? "Copied JSON" : "Copy JSON"}</span>
        </button>
      </div>

      {/* Table Results */}
      <div className="border border-hairline rounded-sm overflow-x-auto bg-[var(--surface)]">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-hairline bg-[var(--bg)] text-[10px] uppercase tracking-wider text-[var(--muted)]">
              {headers.map((h) => (
                <th key={h} className="py-2 px-3 font-semibold border-r border-hairline last:border-r-0">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {results.map((row, i) => (
              <tr key={i} className="hover:bg-[var(--bg)]/50 transition-colors">
                {headers.map((h) => (
                  <td key={h} className="py-2 px-3 text-[var(--ink)] border-r border-hairline last:border-r-0">
                    {String(row[h])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
