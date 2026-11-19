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
import { Network, Info } from "lucide-react";

const INITIAL_NODES: Node[] = [
  {
    id: "1",
    position: { x: 50, y: 80 },
    data: {
      label: "Trigger: Record-Triggered",
      sub: "Object: Order · When Created",
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
    position: { x: 340, y: 80 },
    data: {
      label: "Decision: TotalAmount",
      sub: "Condition: Amount > $10,000",
      badge: "ROUTER",
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
    position: { x: 630, y: 20 },
    data: {
      label: "Agentforce Invocable Apex",
      sub: "Run AI Fraud & Risk Topic",
      badge: "AI ACTION",
    },
    style: {
      border: "1px solid var(--accent)",
      borderRadius: "4px",
      padding: "10px 14px",
      background: "var(--surface)",
      color: "var(--accent)",
      fontFamily: "var(--font-geist-mono)",
      fontSize: "11px",
      width: 230,
    },
  },
  {
    id: "4",
    position: { x: 630, y: 150 },
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
    position: { x: 930, y: 80 },
    data: {
      label: "Action: Notification Hub",
      sub: "Publish OrderNotification__e",
      badge: "PLATFORM EVENT",
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
  { id: "e1-2", source: "1", target: "2", animated: true, style: { stroke: "var(--muted)" } },
  { id: "e2-3", source: "2", target: "3", label: "High Value (> $10k)", labelStyle: { fontSize: 9, fontFamily: "var(--font-geist-mono)", fill: "var(--muted)" }, style: { stroke: "var(--accent)" } },
  { id: "e2-4", source: "2", target: "4", label: "Standard Value", labelStyle: { fontSize: 9, fontFamily: "var(--font-geist-mono)", fill: "var(--muted)" }, style: { stroke: "var(--hairline)" } },
  { id: "e3-5", source: "3", target: "5", animated: true, style: { stroke: "var(--accent)" } },
  { id: "e4-5", source: "4", target: "5", style: { stroke: "var(--hairline)" } },
];

export function FlowCanvas() {
  const [nodes, , onNodesChange] = useNodesState(INITIAL_NODES);
  const [edges, , onEdgesChange] = useEdgesState(INITIAL_EDGES);
  const [selectedNode, setSelectedNode] = useState<Node | null>(INITIAL_NODES[2]);

  return (
    <div className="space-y-4 font-mono text-xs">
      {/* Top Banner */}
      <div className="flex items-center justify-between text-[11px] text-[var(--muted)]">
        <div className="flex items-center gap-2">
          <Network className="w-4 h-4 text-[var(--accent)]" />
          <span>Interactive React Flow Canvas · Drag nodes, zoom, or select node to inspect metadata</span>
        </div>
        <span>FLOW TYPE: RECORD-TRIGGERED (AFTER SAVE)</span>
      </div>

      {/* Canvas Viewport */}
      <div className="border border-hairline rounded-sm h-[380px] w-full bg-[var(--bg)] relative overflow-hidden">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={(_, node) => setSelectedNode(node)}
          fitView
          fitViewOptions={{ padding: 0.2 }}
        >
          <Background variant={BackgroundVariant.Dots} gap={16} size={1} color="var(--hairline)" />
          <Controls showInteractive={false} className="bg-[var(--surface)] border border-hairline text-[var(--ink)]" />
        </ReactFlow>
      </div>

      {/* Selected Node Details Drawer */}
      {selectedNode && (
        <div className="border border-hairline rounded-sm p-3 bg-[var(--surface)] flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span className="font-bold text-[var(--ink)]">{String(selectedNode.data.label)}</span>
            <span className="text-[var(--muted)]">— {String(selectedNode.data.sub)}</span>
          </div>
          <span className="px-2 py-0.5 border border-hairline rounded-xs text-[10px] text-[var(--accent)] font-semibold">
            {String(selectedNode.data.badge)}
          </span>
        </div>
      )}
    </div>
  );
}
