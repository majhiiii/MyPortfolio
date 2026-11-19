"use client";

import React, { useState } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Network, Info, Play, RotateCcw } from "lucide-react";

interface NodeDetails {
  type: string;
  config: string;
  inputs: Record<string, string>;
  limitsImpact: string;
}

const NODE_METADATA: Record<string, NodeDetails> = {
  "1": {
    type: "Record-Triggered Flow Trigger",
    config: "Object: Order · Trigger: Actions & Related Records (After Save) · Filter: Status = 'Submitted'",
    inputs: { "$Record.Id": "Current Order Id", "$Record.TotalAmount": "Currency Field", "$Record.AccountId": "Account Reference" },
    limitsImpact: "0 SOQL · Consumes 1 Flow Execution Context",
  },
  "2": {
    type: "Decision Gateway",
    config: "Outcome 1: High_Value (Amount > $10,000) · Default: Standard_Processing",
    inputs: { "Condition": "$Record.TotalAmount > 10000.00" },
    limitsImpact: "In-memory evaluation · 0 SOQL / 0 DML",
  },
  "3": {
    type: "Apex Invocable Action",
    config: "Class: OrderRiskAssessmentInvocable.cls · Method: evaluateOrderRisk()",
    inputs: { "orderId": "$Record.Id", "billingState": "$Record.BillingState", "totalAmount": "$Record.TotalAmount" },
    limitsImpact: "1 SOQL (Cache check) · Agentforce Intent Dispatch · 18ms CPU",
  },
  "4": {
    type: "Update Records (DML Fast Path)",
    config: "Object: Order · Target: Current Record · Set Fraud_Check_Status__c = 'Auto-Approved'",
    inputs: { "Id": "$Record.Id", "Fraud_Check_Status__c": "'Auto-Approved'" },
    limitsImpact: "1 DML Statement · Queued for After-Save Commit",
  },
  "5": {
    type: "Publish Platform Event",
    config: "Event: OrderNotification__e · Channel: High-Throughput Bus",
    inputs: { "Order_Id__c": "$Record.Id", "Status__c": "'Cleared'", "Channel__c": "'Logistics_WMS'" },
    limitsImpact: "EventBus.publish() · Asynchronous unblocking delivery",
  },
};

const INITIAL_NODES: Node[] = [
  {
    id: "1",
    position: { x: 30, y: 70 },
    data: {
      label: "Trigger: Record-Triggered",
      sub: "Object: Order · When Submitted",
      badge: "START",
    },
    style: {
      border: "1px solid var(--hairline)",
      borderRadius: "4px",
      padding: "10px 14px",
      background: "var(--surface)",
      color: "var(--ink)",
      fontFamily: "var(--font-geist-mono)",
      fontSize: "11px",
      width: 220,
    },
  },
  {
    id: "2",
    position: { x: 310, y: 70 },
    data: {
      label: "Decision: High Value Check",
      sub: "Condition: TotalAmount > $10,000",
      badge: "DECISION",
    },
    style: {
      border: "1px solid var(--hairline)",
      borderRadius: "4px",
      padding: "10px 14px",
      background: "var(--surface)",
      color: "var(--ink)",
      fontFamily: "var(--font-geist-mono)",
      fontSize: "11px",
      width: 220,
    },
  },
  {
    id: "3",
    position: { x: 590, y: 15 },
    data: {
      label: "Agentforce Invocable Apex",
      sub: "Risk Assessment & Fraud Topic",
      badge: "APEX ACTION",
    },
    style: {
      border: "1px solid var(--ink)",
      borderRadius: "4px",
      padding: "10px 14px",
      background: "var(--surface)",
      color: "var(--ink)",
      fontFamily: "var(--font-geist-mono)",
      fontSize: "11px",
      width: 230,
      fontWeight: "600",
    },
  },
  {
    id: "4",
    position: { x: 590, y: 145 },
    data: {
      label: "Update Records: Fast Path",
      sub: "Status = 'Auto-Approved'",
      badge: "DML",
    },
    style: {
      border: "1px solid var(--hairline)",
      borderRadius: "4px",
      padding: "10px 14px",
      background: "var(--surface)",
      color: "var(--ink)",
      fontFamily: "var(--font-geist-mono)",
      fontSize: "11px",
      width: 230,
    },
  },
  {
    id: "5",
    position: { x: 890, y: 70 },
    data: {
      label: "Publish Platform Event",
      sub: "OrderNotification__e Event",
      badge: "EVENT BUS",
    },
    style: {
      border: "1px solid var(--hairline)",
      borderRadius: "4px",
      padding: "10px 14px",
      background: "var(--surface)",
      color: "var(--ink)",
      fontFamily: "var(--font-geist-mono)",
      fontSize: "11px",
      width: 220,
    },
  },
];

const INITIAL_EDGES: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true, style: { stroke: "var(--ink)" } },
  { id: "e2-3", source: "2", target: "3", label: "Amount > $10,000", labelStyle: { fontSize: 8, fontFamily: "var(--font-geist-mono)", fill: "var(--ink)", fontWeight: "600" }, style: { stroke: "var(--ink)", strokeWidth: 1.5 } },
  { id: "e2-4", source: "2", target: "4", label: "Default (< $10k)", labelStyle: { fontSize: 8, fontFamily: "var(--font-geist-mono)", fill: "var(--muted)" }, style: { stroke: "var(--hairline)" } },
  { id: "e3-5", source: "3", target: "5", animated: true, style: { stroke: "var(--ink)", strokeWidth: 1.5 } },
  { id: "e4-5", source: "4", target: "5", style: { stroke: "var(--hairline)" } },
];

export function FlowCanvas() {
  const [nodes, , onNodesChange] = useNodesState(INITIAL_NODES);
  const [edges, , onEdgesChange] = useEdgesState(INITIAL_EDGES);
  const [selectedNodeId, setSelectedNodeId] = useState<string>("3");
  const [testTracing, setTestTracing] = useState<boolean>(false);

  const selectedDetails = NODE_METADATA[selectedNodeId] || NODE_METADATA["3"];
  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[2];

  const triggerExecutionTrace = () => {
    setTestTracing(true);
    setTimeout(() => {
      setTestTracing(false);
    }, 2400);
  };

  return (
    <div className="space-y-4 font-mono text-xs">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-[var(--muted)]">
        <div className="flex items-center gap-2">
          <Network className="w-4 h-4 text-[var(--ink)]" />
          <span>Interactive Flow Canvas · Select any node to inspect execution bindings</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={triggerExecutionTrace}
            disabled={testTracing}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-[var(--ink)] text-[var(--surface)] rounded-xs hover:opacity-90 font-medium transition-opacity"
          >
            <Play className={`w-3 h-3 ${testTracing ? "animate-pulse" : "fill-current"}`} />
            <span>{testTracing ? "Tracing Active Path..." : "Trace High-Value Path"}</span>
          </button>
        </div>
      </div>

      {/* Canvas Viewport */}
      <div className="border border-hairline rounded-sm h-[360px] w-full bg-[var(--bg)] relative overflow-hidden">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={(_, node) => setSelectedNodeId(node.id)}
          fitView
          fitViewOptions={{ padding: 0.15 }}
        >
          <Background variant={BackgroundVariant.Dots} gap={16} size={1} color="var(--hairline)" />
          <Controls showInteractive={false} className="bg-[var(--surface)] border border-hairline text-[var(--ink)]" />
        </ReactFlow>
      </div>

      {/* Deep Node Inspector Drawer */}
      <div className="border border-hairline rounded-sm p-4 bg-[var(--surface)] space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-hairline text-[11px]">
          <div className="flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-[var(--ink)]" />
            <span className="font-bold text-[var(--ink)]">{String(selectedNode.data.label)}</span>
            <span className="text-[var(--muted)]">— {selectedDetails.type}</span>
          </div>
          <span className="px-2 py-0.5 border border-hairline rounded-xs text-[10px] text-[var(--ink)] font-bold bg-[var(--bg)]">
            {String(selectedNode.data.badge)}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px]">
          <div className="space-y-1">
            <span className="text-[10px] uppercase text-[var(--muted)] font-bold">Configuration Parameters:</span>
            <div className="p-2 bg-[var(--bg)] border border-hairline rounded-xs text-[var(--ink)]">
              {selectedDetails.config}
            </div>
            <div className="text-[10px] text-[var(--muted)] pt-0.5">
              Governor Impact: <strong className="text-[var(--ink)]">{selectedDetails.limitsImpact}</strong>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] uppercase text-[var(--muted)] font-bold">Input / Context Variables:</span>
            <div className="p-2 bg-[var(--bg)] border border-hairline rounded-xs space-y-1">
              {Object.entries(selectedDetails.inputs).map(([k, v]) => (
                <div key={k} className="flex justify-between text-[10px]">
                  <span className="text-[var(--muted)]">{k}:</span>
                  <span className="text-[var(--ink)] font-semibold">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
