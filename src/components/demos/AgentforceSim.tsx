"use client";

import React, { useState } from "react";
import { Sparkles, Bot, Shield, CheckCircle, ArrowRight, CornerDownLeft } from "lucide-react";

interface AgentPreset {
  agentName: string;
  query: string;
  topic: string;
  invocableAction: string;
  piiMaskedQuery: string;
  actionOutput: string;
  agentResponse: string;
}

const AGENT_PRESETS: AgentPreset[] = [
  {
    agentName: "Guided Shopping Agent (B2B Commerce)",
    query: "Can you check if product SKU-9941 is in stock and what tier pricing applies for account customer Acme Corp (email: procurement@acme.com)?",
    piiMaskedQuery: "Can you check if product SKU-9941 is in stock and what tier pricing applies for account customer [REDACTED_ACCOUNT] (email: [REDACTED_EMAIL])?",
    topic: "B2B_Inventory_And_Pricing_Topic",
    invocableAction: "B2BCommercePricingInvocable.getPriceTiers(sku='SKU-9941')",
    actionOutput: "{ stock: 450, unitPrice: '$84.00', tierDiscount: '15% for Volume > 100' }",
    agentResponse: "Product SKU-9941 is in stock (450 units available). For Acme Corp's tier level, the price is $84.00/unit with a 15% discount for bulk orders above 100 units.",
  },
  {
    agentName: "Debug Log Analysis Agent",
    query: "Analyze this transaction: user got System.LimitException: Too many SOQL queries: 101 on invoice generation trigger line 48.",
    piiMaskedQuery: "Analyze this transaction: user got System.LimitException: Too many SOQL queries: 101 on invoice generation trigger line 48.",
    topic: "Apex_Diagnostic_Log_Topic",
    invocableAction: "ApexLogAnalyzerInvocable.diagnoseStackTrace(logSnippet='line 48')",
    actionOutput: "{ violation: 'SOQL in for-loop', class: 'InvoiceTriggerHandler', recommendedFix: 'Map<Id, Invoice__c> bulkification' }",
    agentResponse: "The governor limit was triggered by an unbulkified SOQL query inside an iteration block at InvoiceTriggerHandler:48. Move the query outside the loop into a pre-populated Map<Id, Record> to resolve.",
  },
  {
    agentName: "Customer Service Agent (Experience Cloud)",
    query: "Where is order #ORD-84192 shipped to 124 Main Street? Phone: +1 555-0199.",
    piiMaskedQuery: "Where is order #ORD-84192 shipped to [REDACTED_ADDRESS]? Phone: [REDACTED_PHONE].",
    topic: "Order_Fulfillment_Inquiry_Topic",
    invocableAction: "OrderServiceInvocable.getTracking(orderNumber='ORD-84192')",
    actionOutput: "{ status: 'In Transit', carrier: 'FedEx Freight', estDelivery: 'Tomorrow, 2:00 PM' }",
    agentResponse: "Order #ORD-84192 is in transit via FedEx Freight and scheduled for delivery tomorrow by 2:00 PM.",
  },
];

export function AgentforceSim() {
  const [selectedAgentIndex, setSelectedAgentIndex] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const activePreset = AGENT_PRESETS[selectedAgentIndex];

  const runSimulation = () => {
    setIsSimulating(true);
    setCurrentStep(1);

    setTimeout(() => {
      setCurrentStep(2);
      setTimeout(() => {
        setCurrentStep(3);
        setTimeout(() => {
          setCurrentStep(4);
          setIsSimulating(false);
        }, 600);
      }, 600);
    }, 600);
  };

  return (
    <div className="space-y-4 font-mono text-xs">
      {/* Header bar */}
      <div className="flex items-center justify-between text-[11px] text-[var(--muted)]">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-[var(--accent)]" />
          <span>Agentforce Autonomous Simulator · 4 Production Agents Deployed at ASSPL</span>
        </div>
        <span className="text-[var(--accent)] font-semibold">CERTIFIED AGENTFORCE SPECIALIST</span>
      </div>

      {/* Preset Pickers */}
      <div className="flex flex-wrap gap-2">
        {AGENT_PRESETS.map((p, idx) => (
          <button
            key={idx}
            onClick={() => {
              setSelectedAgentIndex(idx);
              setCurrentStep(0);
            }}
            className={`px-3 py-1.5 text-[11px] rounded-xs border transition-colors ${
              selectedAgentIndex === idx
                ? "border-[var(--accent)] bg-[var(--surface)] text-[var(--accent)] font-semibold"
                : "border-hairline text-[var(--muted)] hover:text-[var(--ink)]"
            }`}
          >
            {p.agentName}
          </button>
        ))}
      </div>

      {/* User Prompt Box */}
      <div className="border border-hairline rounded-sm p-4 bg-[var(--bg)] space-y-3">
        <div className="flex items-center justify-between text-[10px] text-[var(--muted)]">
          <span>INCOMING EXPERIENCE CLOUD USER QUERY</span>
          <span>CHANNEL: CHAT BOT / EMBEDDED SERVICE</span>
        </div>
        <div className="p-3 bg-[var(--surface)] border border-hairline rounded-xs text-[var(--ink)] font-mono text-xs leading-relaxed">
          &ldquo;{activePreset.query}&rdquo;
        </div>
        <div className="flex items-center justify-between pt-1">
          <span className="text-[10px] text-[var(--muted)]">Click simulate to step through agent reasoning</span>
          <button
            onClick={runSimulation}
            disabled={isSimulating}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--ink)] text-[var(--surface)] rounded-xs hover:opacity-90 font-medium transition-opacity disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>{isSimulating ? "Evaluating Pipeline..." : "Simulate Agentforce Pipeline"}</span>
          </button>
        </div>
      </div>

      {/* 4-Step Orchestration Pipeline */}
      {currentStep > 0 && (
        <div className="border border-hairline rounded-sm p-4 bg-[var(--surface)] space-y-3">
          <div className="text-[10px] uppercase text-[var(--muted)] tracking-wider">
            Execution Trace Log
          </div>

          <div className="space-y-2 text-[11px]">
            {/* Step 1 */}
            <div className={`p-2.5 rounded-xs border ${currentStep >= 1 ? "border-hairline bg-[var(--bg)] text-[var(--ink)]" : "opacity-30"}`}>
              <div className="flex items-center justify-between font-bold mb-1">
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <Shield className="w-3 h-3" /> Step 1: Einstein Trust Layer Guardrail
                </span>
                <span className="text-[10px] text-[var(--muted)]">MASKED PII AUDIT</span>
              </div>
              <p className="text-[10px] text-[var(--muted)] font-mono break-all">
                {activePreset.piiMaskedQuery}
              </p>
            </div>

            {/* Step 2 */}
            {currentStep >= 2 && (
              <div className="p-2.5 rounded-xs border border-hairline bg-[var(--bg)] text-[var(--ink)]">
                <div className="flex items-center justify-between font-bold mb-1">
                  <span className="text-[var(--accent)]">Step 2: Topic Routing Matrix</span>
                  <span className="text-[10px] text-emerald-600">CONFIDENCE: 98.4%</span>
                </div>
                <div className="text-[10px] text-[var(--muted)]">
                  Dispatched to topic: <code className="text-[var(--ink)] font-bold">{activePreset.topic}</code>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {currentStep >= 3 && (
              <div className="p-2.5 rounded-xs border border-hairline bg-[var(--bg)] text-[var(--ink)]">
                <div className="flex items-center justify-between font-bold mb-1">
                  <span>Step 3: Invocable Apex Action Dispatched</span>
                  <span className="text-[10px] text-[var(--muted)]">LATENCY: 42ms</span>
                </div>
                <div className="text-[10px] text-[var(--muted)] space-y-0.5">
                  <div>Invoking: <code className="text-[var(--accent)]">{activePreset.invocableAction}</code></div>
                  <div>Result: <code className="text-[var(--ink)]">{activePreset.actionOutput}</code></div>
                </div>
              </div>
            )}

            {/* Step 4 */}
            {currentStep >= 4 && (
              <div className="p-3 rounded-xs border border-emerald-500/30 bg-emerald-500/5 text-[var(--ink)] space-y-1">
                <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                  <span>Step 4: Grounded Natural Language Response Generated</span>
                  <CheckCircle className="w-3.5 h-3.5" />
                </div>
                <div className="font-sans text-xs text-[var(--ink)] leading-relaxed pt-1">
                  &ldquo;{activePreset.agentResponse}&rdquo;
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
