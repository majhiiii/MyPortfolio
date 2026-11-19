"use client";

import React, { useState } from "react";
import { Sliders, Copy, Check } from "lucide-react";

export function CpqConfigurator() {
  const [rackType, setRackType] = useState<"pallet" | "cantilever">("pallet");
  const [bayWidth, setBayWidth] = useState<number>(96); // inches (8 ft)
  const [frameHeight, setFrameHeight] = useState<number>(192); // inches (16 ft)
  const [uprightDepth, setUprightDepth] = useState<number>(42); // inches
  const [beamLevels, setBeamLevels] = useState<number>(3);
  const [copied, setCopied] = useState<boolean>(false);

  // Accurate Calculations based on Industrial Equipment Standards
  const isPallet = rackType === "pallet";
  const capacityPerLevel = isPallet ? 5000 : 3500; // lbs per beam pair or arm set
  const totalCapacity = beamLevels * capacityPerLevel;

  const basePrice = isPallet ? 340 : 580;
  const levelPrice = isPallet ? 110 : 160;
  const unitPrice = basePrice + beamLevels * levelPrice + (frameHeight > 192 ? 95 : 0) + (bayWidth > 96 ? 75 : 0);

  const bom = isPallet
    ? [
        { part: "Upright Frame", spec: `${frameHeight}"H x ${uprightDepth}"D Industrial Steel Column`, qty: 2 },
        { part: "Step Beam Pair", spec: `${bayWidth}" Span · ${capacityPerLevel.toLocaleString()} lbs Capacity`, qty: beamLevels },
        { part: "Wire Mesh Decking", spec: `${bayWidth / 2}" x ${uprightDepth}" Galvanized Panels`, qty: beamLevels * 2 },
        { part: "Floor Anchors & Shims", spec: '1/2" x 4-1/4" Heavy-Duty Wedge Anchors', qty: 4 },
      ]
    : [
        { part: "Cantilever Structural Column", spec: `${frameHeight}"H Double-Sided Heavy I-Beam`, qty: 1 },
        { part: "Cantilever Arm Pair", spec: `${uprightDepth}" Length with 3" Removable Pipe Stops`, qty: beamLevels },
        { part: "Structural Base Plate", spec: `${uprightDepth + 12}" Base with Leveling Studs`, qty: 1 },
        { part: "X-Brace Set & Hardware", spec: `${bayWidth}" Center-to-Center Galvanized Struts`, qty: 1 },
      ];

  const handleCopyPayload = () => {
    const payload = {
      systemCategory: "Industrial Warehouse Storage Solutions",
      rackType: isPallet ? "Teardrop Pallet Rack System" : "Heavy-Duty Cantilever Storage System",
      dimensionalSpecifications: {
        heightInches: frameHeight,
        widthInches: bayWidth,
        depthInches: uprightDepth,
        tiers: beamLevels,
      },
      structuralEngineering: {
        capacityPerLevelLbs: capacityPerLevel,
        totalBayCapacityLbs: totalCapacity,
        calculatedWholesalePriceUSD: unitPrice,
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
          <span>Interactive Dimensional CPQ Engine · LWC Quoting Module</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setRackType("pallet")}
            className={`px-3 py-1.5 text-[11px] rounded-xs border transition-colors ${
              isPallet
                ? "bg-[var(--ink)] text-[var(--surface)] border-[var(--ink)] font-bold"
                : "border-hairline text-[var(--muted)] hover:text-[var(--ink)]"
            }`}
          >
            Pallet Rack Elevation
          </button>
          <button
            onClick={() => setRackType("cantilever")}
            className={`px-3 py-1.5 text-[11px] rounded-xs border transition-colors ${
              !isPallet
                ? "bg-[var(--ink)] text-[var(--surface)] border-[var(--ink)] font-bold"
                : "border-hairline text-[var(--muted)] hover:text-[var(--ink)]"
            }`}
          >
            Cantilever Rack Elevation
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
              <span className="text-[var(--muted)]">Bay Span / Width:</span>
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
              <span className="text-[var(--muted)]">Column Height:</span>
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
              <span className="text-[var(--muted)]">Arm / Frame Depth:</span>
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
              <span className="text-[var(--muted)]">Load Tiers / Levels:</span>
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
              <span className="text-[var(--muted)]">Total Structural Capacity:</span>
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
              <span>TYPE: {isPallet ? "PALLET RACK" : "CANTILEVER RACK"}</span>
            </div>

            {/* Dynamic Scaled SVG Blueprint */}
            <div className="w-full flex items-center justify-center py-4 bg-[var(--bg)] border border-hairline rounded-xs">
              {isPallet ? (
                // Pallet Rack Blueprint
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
                        <rect x="72" y={y} width="228" height="8" stroke="currentColor" strokeWidth="1.2" fill="var(--surface)" />
                        <text x="186" y={y - 3} textAnchor="middle" fontSize="7" fontFamily="var(--font-geist-mono)" fill="var(--muted)">
                          TIER {i + 1}: {capacityPerLevel.toLocaleString()} LBS
                        </text>
                      </g>
                    );
                  })}

                  {/* Annotations */}
                  <line x1="72" y1="210" x2="300" y2="210" stroke="currentColor" strokeWidth="0.8" />
                  <text x="186" y="218" textAnchor="middle" fontSize="8" fontFamily="var(--font-geist-mono)" fill="currentColor">
                    {bayWidth}&quot; SPAN
                  </text>
                  <line x1="45" y1="30" x2="45" y2="200" stroke="currentColor" strokeWidth="0.8" />
                  <text x="38" y="115" textAnchor="middle" fontSize="8" fontFamily="var(--font-geist-mono)" fill="currentColor" transform="rotate(-90 38 115)">
                    {frameHeight}&quot; HEIGHT
                  </text>
                </svg>
              ) : (
                // Cantilever Rack Blueprint
                <svg
                  className="w-full max-w-[380px] h-[220px]"
                  viewBox="0 0 380 220"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line x1="20" y1="200" x2="360" y2="200" stroke="currentColor" strokeWidth="1.5" />
                  <text x="360" y="214" textAnchor="end" fontSize="8" fontFamily="var(--font-geist-mono)" fill="var(--muted)">0.00 FLOOR</text>

                  {/* Base Plate */}
                  <rect x="130" y="190" width="120" height="10" stroke="currentColor" strokeWidth="1.5" fill="var(--surface)" />

                  {/* Central Column */}
                  <rect x="180" y="30" width="20" height="160" stroke="currentColor" strokeWidth="1.5" fill="var(--surface)" />
                  <line x1="190" y1="30" x2="190" y2="190" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" />

                  {/* Dynamic Cantilever Arms */}
                  {Array.from({ length: beamLevels }).map((_, i) => {
                    const spacing = 140 / (beamLevels + 0.5);
                    const y = 180 - (i + 1) * spacing;
                    return (
                      <g key={i}>
                        {/* Left Arm */}
                        <path d={`M180 ${y} L100 ${y - 4} L100 ${y + 6} L180 ${y + 8} Z`} stroke="currentColor" strokeWidth="1.2" fill="var(--surface)" />
                        <rect x="96" y={y - 8} width="4" height="12" stroke="currentColor" strokeWidth="1" fill="currentColor" />

                        {/* Right Arm */}
                        <path d={`M200 ${y} L280 ${y - 4} L280 ${y + 6} L200 ${y + 8} Z`} stroke="currentColor" strokeWidth="1.2" fill="var(--surface)" />
                        <rect x="280" y={y - 8} width="4" height="12" stroke="currentColor" strokeWidth="1" fill="currentColor" />

                        <text x="190" y={y - 6} textAnchor="middle" fontSize="7" fontFamily="var(--font-geist-mono)" fill="var(--muted)">
                          {capacityPerLevel.toLocaleString()} LBS / ARM
                        </text>
                      </g>
                    );
                  })}

                  <line x1="310" y1="30" x2="310" y2="200" stroke="currentColor" strokeWidth="0.8" />
                  <text x="325" y="115" textAnchor="middle" fontSize="8" fontFamily="var(--font-geist-mono)" fill="currentColor" transform="rotate(90 325 115)">
                    {frameHeight}&quot; COLUMN HEIGHT
                  </text>
                </svg>
              )}
            </div>

            {/* Bill of Materials Output */}
            <div className="pt-3 border-t border-hairline space-y-1.5">
              <div className="flex items-center justify-between text-[10px] uppercase text-[var(--muted)]">
                <span>Calculated Bill of Materials (BOM)</span>
                <button
                  onClick={handleCopyPayload}
                  className="flex items-center gap-1 hover:text-[var(--ink)] transition-colors font-semibold"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? "Copied Spec Payload" : "Copy Spec Payload (JSON)"}</span>
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
