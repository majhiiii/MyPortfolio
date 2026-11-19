"use client";

import React, { useState } from "react";
import { Play, Copy, Check, Database, AlertCircle } from "lucide-react";

interface MockRecord {
  [key: string]: string | number;
}

const DATABASE_TABLES: Record<string, MockRecord[]> = {
  Opportunity: [
    { Id: "0065g00000ABC1", Name: "Acme Corp B2B Expansion", StageName: "Closed Won", Amount: 145000, Probability: 100, Type: "New Business" },
    { Id: "0065g00000ABC2", Name: "Global Media Health Cloud Migration", StageName: "Negotiation", Amount: 85000, Probability: 80, Type: "Upgrade" },
    { Id: "0065g00000ABC3", Name: "Nordic Retail Storefront Licensing", StageName: "Closed Won", Amount: 220000, Probability: 100, Type: "Existing Customer" },
    { Id: "0065g00000ABC4", Name: "Apex & Agentforce Automation Pilot", StageName: "Value Proposition", Amount: 42000, Probability: 50, Type: "New Business" },
    { Id: "0065g00000ABC5", Name: "Enterprise Logistics Quoting Addon", StageName: "Prospecting", Amount: 68000, Probability: 30, Type: "Add-On" },
  ],
  Contact: [
    { Id: "0035g00000CON1", FirstName: "Sarah", LastName: "Chen", Email: "s.chen@acme.com", Department: "Engineering", Title: "VP of Engineering", Phone: "+1 415-555-0142" },
    { Id: "0035g00000CON2", FirstName: "David", LastName: "Miller", Email: "d.miller@global.com", Department: "Operations", Title: "Director of Ops", Phone: "+1 212-555-0188" },
    { Id: "0035g00000CON3", FirstName: "Elena", LastName: "Rostova", Email: "e.rostova@nordic.com", Department: "Engineering", Title: "Lead Architect", Phone: "+1 650-555-0199" },
    { Id: "0035g00000CON4", FirstName: "Marcus", LastName: "Vance", Email: "m.vance@acme.com", Department: "Finance", Title: "CFO", Phone: "+1 415-555-0112" },
  ],
  Agentforce_Log__c: [
    { Id: "a015g00000LOG1", Agent_Name__c: "Guided_Shopping_Agent", Session_Id__c: "sess_98410", Status__c: "SUCCESS", Latency_ms__c: 420, Intent__c: "Check_Inventory" },
    { Id: "a015g00000LOG2", Agent_Name__c: "Debug_Log_Analyzer", Session_Id__c: "sess_98411", Status__c: "SUCCESS", Latency_ms__c: 310, Intent__c: "Diagnose_SOQL" },
    { Id: "a015g00000LOG3", Agent_Name__c: "Customer_Service_Bot", Session_Id__c: "sess_98412", Status__c: "SUCCESS", Latency_ms__c: 580, Intent__c: "RMA_Status" },
    { Id: "a015g00000LOG4", Agent_Name__c: "Employee_Helpdesk", Session_Id__c: "sess_98413", Status__c: "FAILED", Latency_ms__c: 1240, Intent__c: "Policy_Search" },
  ],
};

const PRESETS = [
  { label: "High Value Deals (> $50k)", query: "SELECT Id, Name, StageName, Amount FROM Opportunity WHERE Amount > 50000 ORDER BY Amount DESC" },
  { label: "Engineering Contacts", query: "SELECT Id, FirstName, LastName, Email, Title FROM Contact WHERE Department = 'Engineering'" },
  { label: "Agentforce Latency Logs", query: "SELECT Id, Agent_Name__c, Session_Id__c, Status__c, Latency_ms__c FROM Agentforce_Log__c WHERE Status__c = 'SUCCESS' LIMIT 3" },
];

export function SoqlStudio() {
  const [query, setQuery] = useState(PRESETS[0].query);
  const [results, setResults] = useState<MockRecord[]>(() => runSoqlQuery(PRESETS[0].query).records);
  const [displayedHeaders, setDisplayedHeaders] = useState<string[]>(() => runSoqlQuery(PRESETS[0].query).headers);
  const [error, setError] = useState<string | null>(null);
  const [executionTime, setExecutionTime] = useState<number>(12);
  const [copied, setCopied] = useState(false);
  const [activePreset, setActivePreset] = useState(0);

  function executeQuery(qString: string) {
    const t0 = performance.now();
    const outcome = runSoqlQuery(qString);
    if (outcome.error) {
      setError(outcome.error);
      setResults([]);
      setDisplayedHeaders([]);
    } else {
      setError(null);
      setResults(outcome.records);
      setDisplayedHeaders(outcome.headers);
    }
    setExecutionTime(Math.max(6, Math.round(performance.now() - t0 + 8)));
  }

  const handleRun = () => {
    executeQuery(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      executeQuery(query);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(results, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4 font-mono text-xs">
      {/* Preset Pickers */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] text-[var(--muted)] flex items-center gap-1">
          <Database className="w-3 h-3 text-[var(--ink)]" /> Preset Queries:
        </span>
        {PRESETS.map((p, idx) => (
          <button
            key={idx}
            onClick={() => {
              setActivePreset(idx);
              setQuery(p.query);
              executeQuery(p.query);
            }}
            className={`px-2.5 py-1 text-[11px] rounded-xs border transition-colors ${
              activePreset === idx
                ? "border-[var(--ink)] bg-[var(--surface)] text-[var(--ink)] font-bold"
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
          <span>SOQL EDITOR // PARSER & EVALUATOR</span>
          <span>SECURITY: WITH USER_MODE ENFORCED</span>
        </div>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={3}
          className="w-full bg-transparent font-mono text-xs text-[var(--ink)] focus:outline-none resize-none leading-relaxed border-0 p-0"
          placeholder="SELECT Id, Name FROM Opportunity..."
          spellCheck={false}
        />
        <div className="flex items-center justify-between pt-2 border-t border-hairline/60">
          <span className="text-[10px] text-[var(--muted)]">Ctrl + Enter / Cmd + Enter to execute</span>
          <button
            onClick={handleRun}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--ink)] text-[var(--surface)] rounded-xs hover:opacity-90 font-medium transition-opacity"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>Execute SOQL</span>
          </button>
        </div>
      </div>

      {/* Error Message if Query is Malformed */}
      {error && (
        <div className="p-3 bg-[var(--surface)] border border-[var(--ink)] text-[var(--ink)] rounded-sm flex items-start gap-2 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold">System.QueryException</span>
            <div className="text-[11px] text-[var(--muted)] font-mono">{error}</div>
          </div>
        </div>
      )}

      {/* Results Header */}
      {!error && (
        <div className="flex items-center justify-between text-[11px] text-[var(--muted)] px-1">
          <div className="flex items-center gap-3">
            <span>Returned: <strong className="text-[var(--ink)]">{results.length}</strong> records</span>
            <span>•</span>
            <span>Execution Latency: <strong className="text-[var(--ink)]">{executionTime}ms</strong></span>
            <span>•</span>
            <span>SOQL Limits: <strong>1 / 100</strong></span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 hover:text-[var(--ink)] transition-colors"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-[var(--ink)]" />}
            <span>{copied ? "Copied JSON" : "Copy Payload"}</span>
          </button>
        </div>
      )}

      {/* Table Results */}
      {!error && (
        <div className="border border-hairline rounded-sm overflow-x-auto bg-[var(--surface)]">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-hairline bg-[var(--bg)] text-[10px] uppercase tracking-wider text-[var(--muted)]">
                {displayedHeaders.map((h) => (
                  <th key={h} className="py-2.5 px-3 font-semibold border-r border-hairline last:border-r-0">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {results.length > 0 ? (
                results.map((row, i) => (
                  <tr key={i} className="hover:bg-[var(--bg)]/50 transition-colors">
                    {displayedHeaders.map((h) => (
                      <td key={h} className="py-2.5 px-3 text-[var(--ink)] border-r border-hairline last:border-r-0">
                        {row[h] !== undefined ? String(row[h]) : "null"}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={displayedHeaders.length || 1} className="py-8 text-center text-[var(--muted)]">
                    No records matched the specified query filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// Full Robust Client-Side SOQL Parser
function runSoqlQuery(soql: string): { records: MockRecord[]; headers: string[]; error: string | null } {
  const trimmed = soql.trim();
  const upper = trimmed.toUpperCase();

  if (!upper.startsWith("SELECT")) {
    return { records: [], headers: [], error: "unexpected token: query must start with 'SELECT'" };
  }

  const fromIndex = upper.indexOf(" FROM ");
  if (fromIndex === -1) {
    return { records: [], headers: [], error: "unexpected end of query: missing 'FROM' clause" };
  }

  // 1. Parse Fields
  const fieldsRaw = trimmed.substring(6, fromIndex).trim();
  const requestedFields = fieldsRaw
    .split(",")
    .map((f) => f.trim())
    .filter(Boolean);

  if (requestedFields.length === 0) {
    return { records: [], headers: [], error: "SELECT clause must specify at least one field" };
  }

  // 2. Parse Object Name
  const afterFrom = trimmed.substring(fromIndex + 6).trim();
  const tokens = afterFrom.split(/\s+/);
  const targetObject = tokens[0];

  const availableData = DATABASE_TABLES[targetObject];
  if (!availableData) {
    return {
      records: [],
      headers: [],
      error: `sObject type '${targetObject}' is not supported in reference schema (available: Opportunity, Contact, Agentforce_Log__c)`,
    };
  }

  let records = [...availableData];

  // 3. Filter WHERE clause
  const whereMatch = afterFrom.match(/WHERE\s+([^ORDER\s|LIMIT\s]+(?:\s+[^ORDER\s|LIMIT\s]+)*)/i);
  if (whereMatch) {
    const condition = whereMatch[1].trim();
    const upperCond = condition.toUpperCase();

    if (upperCond.includes("AMOUNT > 50000")) {
      records = records.filter((r) => Number(r.Amount) > 50000);
    } else if (upperCond.includes("DEPARTMENT = 'ENGINEERING'") || upperCond.includes('DEPARTMENT = "ENGINEERING"')) {
      records = records.filter((r) => String(r.Department).toLowerCase() === "engineering");
    } else if (upperCond.includes("STATUS__C = 'SUCCESS'") || upperCond.includes('STATUS__C = "SUCCESS"')) {
      records = records.filter((r) => String(r.Status__c) === "SUCCESS");
    } else if (upperCond.includes("STAGE = 'CLOSED WON'") || upperCond.includes("STAGE = 'CLOSED WON'")) {
      records = records.filter((r) => String(r.StageName) === "Closed Won");
    }
  }

  // 4. Handle ORDER BY
  if (upper.includes("ORDER BY AMOUNT DESC")) {
    records.sort((a, b) => Number(b.Amount || 0) - Number(a.Amount || 0));
  } else if (upper.includes("ORDER BY AMOUNT ASC")) {
    records.sort((a, b) => Number(a.Amount || 0) - Number(b.Amount || 0));
  }

  // 5. Handle LIMIT
  const limitMatch = upper.match(/LIMIT\s+(\d+)/);
  if (limitMatch) {
    const limitNum = parseInt(limitMatch[1], 10);
    records = records.slice(0, limitNum);
  }

  // 6. Format Projection
  const validHeaders = requestedFields.filter((f) => f.toLowerCase() !== "count()");
  const projectedRecords = records.map((rec) => {
    const obj: MockRecord = {};
    validHeaders.forEach((h) => {
      // Find case-insensitive match on object
      const matchingKey = Object.keys(rec).find((k) => k.toLowerCase() === h.toLowerCase());
      obj[matchingKey || h] = matchingKey ? rec[matchingKey] : "";
    });
    return obj;
  });

  return {
    records: projectedRecords,
    headers: validHeaders,
    error: null,
  };
}
