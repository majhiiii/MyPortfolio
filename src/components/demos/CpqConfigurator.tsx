"use client";

import React, { useState } from "react";
import { Sliders, Copy, Check, FileText } from "lucide-react";

export function CpqConfigurator() {
  const [rackType, setRackType] = useState<"pallet" | "cantilever">("pallet");
  const [bayWidth, setBayWidth] = useState<number>(96); // inches (8 ft)
  const [frameHeight, setFrameHeight] = useState<number>(192); // inches (16 ft)
  const [uprightDepth, setUprightDepth] = useState<number>(42); // inches
  const [beamLevels, setBeamLevels] = useState<number>(3);
  const [copied, setCopied] = useState<boolean>(false);

  // Calculations
  const capacityPerLevel = 5000; // lbs
  const totalCapacity = beamLevels * capacityPerLevel;
  const unitPrice = 340 + beamLevels * 110 + (frameHeight > 192 ? 85 : 0) + (bayWidth > 96 ? 60 : 0);

  const bom = [
    { part: "Upright Frame", spec: `${frameHeight}"H x ${uprightDepth}"D Industrial Steel`, qty: 2 },
    { part: "Step Beam Pair", spec: `${bayWidth}" Span · 5,000 lbs Capacity`, qty: beamLevels },
    { part: "Wire Mesh Decking", spec: `${bayWidth / 2}" x ${uprightDepth}" Galvanized`, qty: beamLevels * 2 },
    { part: "Floor Anchors & Shims", spec: '1/2" x 4-1/4" Wedge Anchor', qty: 4 },
  ];

  const handleCopyPayload = () => {
    const payload = {
      productFamily: "Industrial Storage Solutions",
      rackType,
      dimensions: {
        heightInches: frameHeight,
        widthInches: bayWidth,
        depthInches: uprightDepth,
        levels: beamLevels,
      },
      engineeringMetrics: {
        totalBayCapacityLbs: totalCapacity,
        calculatedPriceUSD: unitPrice,
      },
      billOfMaterials: bom,
      generatedTimestamp: new Date().toISOString(),
    };
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Header bar */}
      <div className="flex items-center justify-between text-[11px] text-[var(--muted)] border-b border-hairline pb-3">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[var(--ink)]" />
          <span>Interactive CPQ Visual Configurator · Dimensional Quoting Engine</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setRackType("pallet")}
            className={`px-2.5 py-1 text-[10px] rounded-xs border transition-colors ${
              rackType === "pallet"
                ? "bg-[var(--ink)] text-[var(--surface)] border-[var(--ink)] font-bold"
                : "border-hairline text-[var(--muted)] hover:text-[var(--ink)]"
            }`}
          >
            Pallet Rack
          </button>
          <button
            onClick={() => setRackType("cantilever")}
            className={`px-2.5 py-1 text-[10px] rounded-xs border transition-colors ${
              rackType === "cantilever"
                ? "bg-[var(--ink)] text-[var(--surface)] border-[var(--ink)] font-bold"
                : "border-hairline text-[var(--muted)] hover:text-[var(--ink)]"
            }`}
          >
            Cantilever Rack
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-4 bg-[var(--surface)] border border-hairline p-4 rounded-sm">
          <div className="text-[10px] uppercase font-bold text-[var(--ink)] tracking-wider">
            Dimensional Parameters
          </div>

          {/* Width */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px]">
              <span className="text-[var(--muted)]">Bay Width:</span>
              <span className="font-bold text-[var(--ink)]">{bayWidth / 12} ft ({bayWidth}&quot;)</span>
            </div>
            <input
              type="range"
              min={96}
              max={144}
              step={12}
              value={bayWidth}
              onChange={(e) => setBayWidth(Number(e.target.value))}
              className="w-full accent-[var(--ink)] cursor-pointer"
            />
          </div>

          {/* Height */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px]">
              <span className="text-[var(--muted)]">Frame Height:</span>
              <span className="font-bold text-[var(--ink)]">{frameHeight / 12} ft ({frameHeight}&quot;)</span>
            </div>
            <input
              type="range"
              min={144}
              max={288}
              step={24}
              value={frameHeight}
              onChange={(e) => setFrameHeight(Number(e.target.value))}
              className="w-full accent-[var(--ink)] cursor-pointer"
            />
          </div>

          {/* Depth */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px]">
              <span className="text-[var(--muted)]">Upright Depth:</span>
              <span className="font-bold text-[var(--ink)]">{uprightDepth}&quot;</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[36, 42, 48].map((d) => (
                <button
                  key={d}
                  onClick={() => setUprightDepth(d)}
                  className={`py-1 text-[10px] rounded-xs border transition-colors ${
                    uprightDepth === d
                      ? "bg-[var(--ink)] text-[var(--surface)] border-[var(--ink)] font-bold"
                      : "border-hairline text-[var(--muted)] hover:text-[var(--ink)]"
                  }`}
                >
                  {d}&quot;
                </button>
              ))}
            </div>
          </div>

          {/* Levels */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px]">
              <span className="text-[var(--muted)]">Beam Levels:</span>
              <span className="font-bold text-[var(--ink)]">{beamLevels} Tiers</span>
            </div>
            <input
              type="range"
              min={2}
              max={6}
              step={1}
              value={beamLevels}
              onChange={(e) => setBeamLevels(Number(e.target.value))}
              className="w-full accent-[var(--ink)] cursor-pointer"
            />
          </div>

          {/* Quoting Summary */}
          <div className="pt-3 border-t border-hairline space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-[var(--muted)]">Max Bay Capacity:</span>
              <span className="font-bold text-[var(--ink)]">{totalCapacity.toLocaleString()} lbs</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-[var(--muted)]">Calculated Unit Price:</span>
              <span className="font-bold text-sm text-[var(--ink)]">${unitPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Blueprint SVG Schematic Column */}
        <div className="lg:col-span-7 space-y-4">
          <div className="border border-hairline rounded-sm p-4 bg-[var(--surface)] flex flex-col justify-between min-h-[300px]">
            <div className="flex items-center justify-between text-[10px] uppercase text-[var(--muted)] mb-2">
              <span>Technical Elevation Schematic (Scale 1:24)</span>
              <span>GRID // ISO-2D</span>
            </div>

            {/* Dynamic Scaled SVG Blueprint */}
            <div className="w-full flex items-center justify-center py-4 bg-[var(--bg)] border border-hairline rounded-xs">
              <svg
                className="w-full max-w-[380px] h-[220px]"
                viewBox="0 0 380 220"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Floor Line */}
                <line x1="20" y1="200" x2="360" y2="200" stroke="currentColor" strokeWidth="1.5" />
                <text x="360" y="214" textAnchor="end" fontSize="8" fontFamily="var(--font-geist-mono)" fill="var(--muted)">0.00 FLOOR</text>

                {/* Left Upright Frame */}
                <rect x="60" y="30" width="12" height="170" stroke="currentColor" strokeWidth="1.5" fill="var(--surface)" />
                {/* Diagonal Bracing */}
                <line x1="60" y1="50" x2="72" y2="80" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" />
                <line x1="60" y1="110" x2="72" y2="140" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" />
                <line x1="60" y1="170" x2="72" y2="200" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" />

                {/* Right Upright Frame */}
                <rect x="300" y="30" width="12" height="170" stroke="currentColor" strokeWidth="1.5" fill="var(--surface)" />
                <line x1="300" y1="50" x2="312" y2="80" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" />
                <line x1="300" y1="110" x2="312" y2="140" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" />
                <line x1="300" y1="170" x2="312" y2="200" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" />

                {/* Dynamic Beam Levels */}
                {Array.from({ length: beamLevels }).map((_, i) => {
                  const spacing = 150 / (beamLevels + 0.5);
                  const y = 190 - (i + 1) * spacing;
                  return (
                    <g key={i}>
                      {/* Step Beam */}
                      <rect x="72" y={y} width="228" height="8" stroke="currentColor" strokeWidth="1.2" fill="var(--surface)" />
                      {/* Level Load Annotation */}
                      <text x="186" y={y - 3} textAnchor="middle" fontSize="7" fontFamily="var(--font-geist-mono)" fill="var(--muted)">
                        LEVEL {i + 1}: 5,000 LBS
                      </text>
                    </g>
                  );
                })}

                {/* Dimensional Annotations */}
                <line x1="72" y1="210" x2="300" y2="210" stroke="currentColor" strokeWidth="0.8" />
                <text x="186" y="218" textAnchor="middle" fontSize="8" fontFamily="var(--font-geist-mono)" fill="currentColor">
                  {bayWidth}&quot; SPAN
                </text>

                <line x1="45" y1="30" x2="45" y2="200" stroke="currentColor" strokeWidth="0.8" />
                <text x="38" y="115" textAnchor="middle" fontSize="8" fontFamily="var(--font-geist-mono)" fill="currentColor" transform="rotate(-90 38 115)">
                  {frameHeight}&quot; OVERALL HEIGHT
                </text>
              </svg>
            </div>

            {/* Bill of Materials Output */}
            <div className="pt-3 border-t border-hairline space-y-1.5">
              <div className="flex items-center justify-between text-[10px] uppercase text-[var(--muted)]">
                <span>Calculated Bill of Materials (BOM)</span>
                <button
                  onClick={handleCopyPayload}
                  className="flex items-center gap-1 hover:text-[var(--ink)] transition-colors"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? "Copied JSON" : "Copy Spec Payload"}</span>
                </button>
              </div>

              <div className="divide-y divide-hairline border-y border-hairline text-[10px]">
                {bom.map((item, idx) => (
                  <div key={idx} className="py-1 flex justify-between">
                    <span className="text-[var(--ink)] font-semibold">{item.qty}x {item.part}</span>
                    <span className="text-[var(--muted)]">{item.spec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
