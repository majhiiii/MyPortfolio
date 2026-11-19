"use client";

import React, { useState } from "react";
import { Sparkles, Bot, Shield, CheckCircle, Play } from "lucide-react";

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
  const [isExecuting, setIsExecuting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const activePreset = AGENT_PRESETS[selectedAgentIndex];

  const runPipeline = () => {
    setIsExecuting(true);
    setCurrentStep(1);

    setTimeout(() => {
      setCurrentStep(2);
      setTimeout(() => {
        setCurrentStep(3);
        setTimeout(() => {
          setCurrentStep(4);
          setIsExecuting(false);
        }, 600);
      }, 600);
    }, 600);
  };

  return (
    <div className="space-y-4 font-mono text-xs text-white">
      {/* Header bar */}
      <div className="flex items-center justify-between text-[11px] text-white/70 border-b border-white/10 pb-2.5">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-[#E8A317]" />
          <span className="font-medium text-white/90">Agentforce Execution Trace · 4 Production Agents Deployed at ASSPL</span>
        </div>
        <span className="font-semibold text-emerald-400 font-mono tracking-wider text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-600/40">
          CERTIFIED AGENTFORCE SPECIALIST
        </span>
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
            className={`px-3 py-1.5 text-[11px] rounded-[6px] border transition-colors cursor-pointer ${
              selectedAgentIndex === idx
                ? "border-amber-400 bg-amber-400/20 text-white font-bold shadow-xs"
                : "border-white/20 text-white/70 hover:text-white hover:border-white/40 bg-white/5"
            }`}
          >
            {p.agentName}
          </button>
        ))}
      </div>

      {/* User Prompt Box */}
      <div className="border border-white/15 rounded-[12px] p-4 bg-[#0D111F] space-y-3 shadow-inner">
        <div className="flex items-center justify-between text-[10px] text-white/60">
          <span className="font-semibold tracking-wider text-amber-400">INCOMING EXPERIENCE CLOUD USER QUERY</span>
          <span>CHANNEL: CHAT / EMBEDDED SERVICE</span>
        </div>
        <div className="p-3 bg-[#14182E] border border-white/10 rounded-[8px] text-white font-mono text-xs leading-relaxed">
          &ldquo;{activePreset.query}&rdquo;
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
          <span className="text-[11px] text-white/60">Inspect trust evaluation, topic routing, and Invocable Apex execution</span>
          <button
            onClick={runPipeline}
            disabled={isExecuting}
            className="flex items-center justify-center gap-1.5 px-4 py-2 bg-[#E8A317] text-[#100C09] rounded-[8px] hover:bg-amber-300 font-bold transition-colors disabled:opacity-50 cursor-pointer shadow-xs"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isExecuting ? "Executing Pipeline..." : "Execute Action Flow"}</span>
          </button>
        </div>
      </div>

      {/* 4-Step Orchestration Pipeline */}
      {currentStep > 0 && (
        <div className="border border-white/15 rounded-[12px] p-4 bg-[#0D111F] space-y-3 shadow-inner">
          <div className="text-[10px] uppercase text-white/50 tracking-wider font-semibold">
            Execution Trace Log
          </div>

          <div className="space-y-2 text-[11px]">
            {/* Step 1 */}
            <div className={`p-3 rounded-[8px] border ${currentStep >= 1 ? "border-white/15 bg-[#14182E] text-white" : "opacity-30"}`}>
              <div className="flex items-center justify-between font-bold mb-1">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" /> Step 1: Einstein Trust Layer Guardrail
                </span>
                <span className="text-[10px] font-mono text-white/50 px-2 py-0.5 rounded bg-black/40">MASKED PII AUDIT</span>
              </div>
              <p className="text-[11px] text-white/80 font-mono break-all pt-1">
                {activePreset.piiMaskedQuery}
              </p>
            </div>

            {/* Step 2 */}
            {currentStep >= 2 && (
              <div className="p-3 rounded-[8px] border border-white/15 bg-[#14182E] text-white">
                <div className="flex items-center justify-between font-bold mb-1">
                  <span className="text-purple-400">Step 2: Topic Routing Matrix</span>
                  <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-black/40">CONFIDENCE: 98.4%</span>
                </div>
                <div className="text-[11px] text-white/80 pt-1">
                  Dispatched to topic: <code className="text-[#E8A317] font-bold px-1.5 py-0.5 rounded bg-black/40">{activePreset.topic}</code>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {currentStep >= 3 && (
              <div className="p-3 rounded-[8px] border border-white/15 bg-[#14182E] text-white">
                <div className="flex items-center justify-between font-bold mb-1">
                  <span className="text-sky-400">Step 3: Invocable Apex Action Dispatched</span>
                  <span className="text-[10px] font-mono text-sky-400 px-2 py-0.5 rounded bg-black/40">LATENCY: 42ms</span>
                </div>
                <div className="text-[11px] text-white/80 space-y-1 pt-1 font-mono">
                  <div>Invoking: <code className="text-white font-bold">{activePreset.invocableAction}</code></div>
                  <div>Result: <code className="text-emerald-300">{activePreset.actionOutput}</code></div>
                </div>
              </div>
            )}

            {/* Step 4 */}
            {currentStep >= 4 && (
              <div className="p-3.5 rounded-[8px] border border-emerald-500/40 bg-emerald-950/30 text-white space-y-1.5">
                <div className="flex items-center justify-between text-emerald-400 font-bold">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    Step 4: Grounded Response Returned
                  </span>
                  <span className="text-[10px] font-mono text-emerald-300">200 OK</span>
                </div>
                <div className="font-sans text-xs sm:text-[13px] text-white/95 leading-relaxed pt-1 border-t border-white/10">
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
