"use client";

import React, { useState } from "react";
import { Layers, CheckCircle2, RefreshCw, Send } from "lucide-react";

interface NodeItem {
  id: string;
  name: string;
  protocol: string;
  type: string;
  latency: number;
  status: "ONLINE" | "SYNCHRONIZING";
  direction: "Bidirectional" | "Inbound" | "Outbound";
}

const NODES_DATA: NodeItem[] = [
  { id: "b2b", name: "B2B Storefront", protocol: "CloudCraze / Apex", type: "Wholesale Portal", latency: 14, status: "ONLINE", direction: "Bidirectional" },
  { id: "ups", name: "UPS Logistics API", protocol: "REST & SOAP XML", type: "Shipping Engine", latency: 32, status: "ONLINE", direction: "Outbound" },
  { id: "avalara", name: "Avalara AvaTax", protocol: "REST API", type: "Tax Compliance", latency: 28, status: "ONLINE", direction: "Outbound" },
  { id: "nacha", name: "Banking NACHA Engine", protocol: "Batch Apex", type: "ACH Settlement", latency: 19, status: "ONLINE", direction: "Bidirectional" },
  { id: "stripe", name: "Stripe Billing", protocol: "REST / Webhooks", type: "Payment Gateway", latency: 24, status: "ONLINE", direction: "Inbound" },
  { id: "quickbooks", name: "QuickBooks Online", protocol: "OAuth 2.0 / REST", type: "Accounting ERP", latency: 38, status: "ONLINE", direction: "Bidirectional" },
  { id: "outlook", name: "Outlook Add-in", protocol: "OAuth PKCE / SOQL", type: "Internal Client Tool", latency: 18, status: "ONLINE", direction: "Bidirectional" },
  { id: "agentforce", name: "Agentforce Bots", protocol: "Apex Invocables", type: "AI Runtime", latency: 15, status: "ONLINE", direction: "Bidirectional" },
];

export function IntegrationMap() {
  const [nodes, setNodes] = useState<NodeItem[]>(NODES_DATA);
  const [selectedNode, setSelectedNode] = useState<NodeItem>(NODES_DATA[0]);
  const [pinging, setPinging] = useState(false);
  const [lastPayload, setLastPayload] = useState<string | null>(null);

  const testPing = () => {
    setPinging(true);
    setTimeout(() => {
      setNodes((prev) =>
        prev.map((n) => ({
          ...n,
          latency: Math.floor(Math.random() * 25) + 12,
        }))
      );
      setPinging(false);
    }, 500);
  };

  const dispatchTestEvent = (node: NodeItem) => {
    setLastPayload(`[200 OK] Handshake verified with ${node.name} over ${node.protocol} · Transaction Ack: 0x${Math.random().toString(16).slice(2, 8).toUpperCase()}`);
  };

  return (
    <div className="space-y-4 font-mono text-xs">
      {/* Header */}
      <div className="flex items-center justify-between text-[11px] text-[var(--muted)]">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[var(--ink)]" />
          <span>Hub-and-Spoke Enterprise Architecture · Center: Salesforce Core Org</span>
        </div>
        <button
          onClick={testPing}
          disabled={pinging}
          className="flex items-center gap-1.5 text-[var(--ink)] hover:underline font-medium"
        >
          <RefreshCw className={`w-3 h-3 ${pinging ? "animate-spin" : ""}`} />
          <span>{pinging ? "Pinging Hub..." : "Ping Network"}</span>
        </button>
      </div>

      {/* Grid of Nodes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {nodes.map((n) => {
          const isSelected = selectedNode.id === n.id;
          return (
            <div
              key={n.id}
              onClick={() => setSelectedNode(n)}
              className={`p-3.5 border rounded-sm cursor-pointer transition-all ${
                isSelected
                  ? "border-[var(--ink)] bg-[var(--surface)] shadow-xs"
                  : "border-hairline bg-[var(--bg)] hover:border-[var(--ink)]"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-[var(--ink)] text-xs">{n.name}</span>
                <span className="flex items-center gap-1 text-[10px] text-[var(--ink)] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--ink)]"></span>
                  {n.status}
                </span>
              </div>
              <div className="text-[10px] text-[var(--muted)] space-y-0.5">
                <div>Proto: {n.protocol}</div>
                <div>Flow: {n.direction}</div>
                <div className="text-[var(--ink)] font-semibold mt-1">Latency: {n.latency}ms</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Node Inspector Bar */}
      <div className="border border-hairline rounded-sm p-4 bg-[var(--surface)] space-y-3">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase text-[var(--muted)]">Selected Node Inspector</span>
            <h4 className="text-sm font-bold text-[var(--ink)] flex items-center gap-2">
              <span>{selectedNode.name}</span>
              <span className="px-2 py-0.5 text-[10px] rounded-xs border border-hairline bg-[var(--bg)] text-[var(--ink)]">
                {selectedNode.type}
              </span>
            </h4>
          </div>
          <button
            onClick={() => dispatchTestEvent(selectedNode)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--ink)] text-[var(--surface)] rounded-xs hover:opacity-90 font-medium transition-opacity"
          >
            <Send className="w-3 h-3" />
            <span>Verify Live Handshake</span>
          </button>
        </div>

        {lastPayload && (
          <div className="p-2.5 bg-[var(--bg)] border border-hairline text-[var(--ink)] rounded-xs text-[11px] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{lastPayload}</span>
          </div>
        )}
      </div>
    </div>
  );
}
