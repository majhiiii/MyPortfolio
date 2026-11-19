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

  // Calculations based on equipment standards
  const isPallet = rackType === "pallet";
  const capacityPerLevel = isPallet ? 5000 : 3500;
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
      rackType: isPallet ? "Teardrop Pallet Rack System" : "Heavy-Duty Cantilever Storage System",
      dimensionalSpecifications: {
        heightInches: frameHeight,
        widthInches: bayWidth,
        depthInches: uprightDepth,
        tiers: beamLevels,
      },
      calculatedWholesalePriceUSD: unitPrice,
      billOfMaterials: bom,
    };
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 font-mono text-xs text-white/90">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2 text-white/70">
          <Sliders className="w-4 h-4 text-[#E8A317]" />
          <span>Dimensional CPQ Quoting Tool</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setRackType("pallet")}
            className={`px-3 py-1.5 text-[11px] rounded-sm border transition-colors cursor-pointer ${
              isPallet
                ? "bg-white text-[#14182E] border-white font-bold"
                : "border-white/20 text-white/60 hover:text-white"
            }`}
          >
            Pallet Elevation
          </button>
          <button
            onClick={() => setRackType("cantilever")}
            className={`px-3 py-1.5 text-[11px] rounded-sm border transition-colors cursor-pointer ${
              !isPallet
                ? "bg-white text-[#14182E] border-white font-bold"
                : "border-white/20 text-white/60 hover:text-white"
            }`}
          >
            Cantilever Elevation
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-4 bg-[#181D38] border border-white/10 p-4 rounded-md">
          <div className="text-[10px] uppercase font-bold text-white/60 tracking-wider">
            Dimensional Parameters
          </div>

          {/* Width */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px]">
              <span className="text-white/60">Bay Span / Width:</span>
              <span className="font-bold text-white">{bayWidth / 12} ft ({bayWidth}&quot;)</span>
            </div>
            <input
              type="range"
              min={96}
              max={144}
              step={12}
              value={bayWidth}
              onChange={(e) => setBayWidth(Number(e.target.value))}
              className="w-full accent-[#E8A317] cursor-pointer"
            />
          </div>

          {/* Height */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px]">
              <span className="text-white/60">Column Height:</span>
              <span className="font-bold text-white">{frameHeight / 12} ft ({frameHeight}&quot;)</span>
            </div>
            <input
              type="range"
              min={144}
              max={288}
              step={24}
              value={frameHeight}
              onChange={(e) => setFrameHeight(Number(e.target.value))}
              className="w-full accent-[#E8A317] cursor-pointer"
            />
          </div>

          {/* Depth */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px]">
              <span className="text-white/60">Upright Depth / Arm:</span>
              <span className="font-bold text-white">{uprightDepth}&quot; ({uprightDepth / 12} ft)</span>
            </div>
            <input
              type="range"
              min={36}
              max={54}
              step={6}
              value={uprightDepth}
              onChange={(e) => setUprightDepth(Number(e.target.value))}
              className="w-full accent-[#E8A317] cursor-pointer"
            />
          </div>

          {/* Levels */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px]">
              <span className="text-white/60">Storage Tier Levels:</span>
              <span className="font-bold text-white">{beamLevels} Levels</span>
            </div>
            <input
              type="range"
              min={2}
              max={6}
              step={1}
              value={beamLevels}
              onChange={(e) => setBeamLevels(Number(e.target.value))}
              className="w-full accent-[#E8A317] cursor-pointer"
            />
          </div>

          {/* Summary Box */}
          <div className="pt-3 border-t border-white/10 space-y-2 text-[11px]">
            <div className="flex justify-between">
              <span className="text-white/60">Capacity / Level:</span>
              <span className="font-bold text-white">{capacityPerLevel.toLocaleString()} lbs</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Total Bay Rating:</span>
              <span className="font-bold text-[#E8A317]">{totalCapacity.toLocaleString()} lbs</span>
            </div>
            <div className="flex justify-between items-baseline pt-2 border-t border-white/10">
              <span className="text-white/60 font-semibold">Calculated Quote:</span>
              <span className="text-lg font-bold text-white">${unitPrice.toLocaleString()} USD</span>
            </div>
          </div>
        </div>

        {/* CAD Elevation & Bill of Materials */}
        <div className="lg:col-span-7 space-y-4">
          {/* Elevation Blueprint Canvas */}
          <div className="h-60 rounded-md bg-[#0F1326] border border-white/10 flex items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute top-2 left-3 text-[10px] text-white/40">
              CAD Schematic Elevation &bull; {isPallet ? "Pallet Rack" : "Cantilever"}
            </div>

            <svg
              className="w-full h-full max-h-48"
              viewBox="0 0 320 180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isPallet ? (
                <>
                  {/* Left Column */}
                  <rect x="50" y="20" width="8" height="140" fill="#E8A317" rx="1" />
                  {/* Right Column */}
                  <rect x="260" y="20" width="8" height="140" fill="#E8A317" rx="1" />
                  {/* Levels */}
                  {Array.from({ length: beamLevels }).map((_, i) => {
                    const y = 140 - (i * 110) / Math.max(beamLevels - 1, 1);
                    return (
                      <g key={i}>
                        <rect x="58" y={y} width="202" height="6" fill="#C8372D" rx="1" />
                        <line x1="58" y1={y + 3} x2="260" y2={y + 3} stroke="#FFF" strokeWidth="0.5" strokeDasharray="3 3" />
                      </g>
                    );
                  })}
                  {/* Diagonal X-bracing */}
                  <line x1="58" y1="20" x2="260" y2="160" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                  <line x1="58" y1="160" x2="260" y2="20" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                </>
              ) : (
                <>
                  {/* Center Column */}
                  <rect x="154" y="20" width="12" height="140" fill="#E8A317" rx="1" />
                  <rect x="100" y="155" width="120" height="8" fill="#8A4B2A" rx="1" />
                  {/* Cantilever Arms */}
                  {Array.from({ length: beamLevels }).map((_, i) => {
                    const y = 135 - (i * 100) / Math.max(beamLevels - 1, 1);
                    return (
                      <g key={i}>
                        <polygon points={`154,${y} 85,${y - 4} 85,${y + 4} 154,${y + 6}`} fill="#C8372D" />
                        <polygon points={`166,${y} 235,${y - 4} 235,${y + 4} 166,${y + 6}`} fill="#C8372D" />
                      </g>
                    );
                  })}
                </>
              )}
            </svg>
          </div>

          {/* Bill of Materials Table */}
          <div className="bg-[#181D38] border border-white/10 p-3.5 rounded-md space-y-2">
            <div className="flex items-center justify-between text-[10px] text-white/50">
              <span>GENERATED BILL OF MATERIALS (BOM)</span>
              <button
                onClick={handleCopyPayload}
                className="flex items-center gap-1 text-[#E8A317] hover:underline cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? "Copied JSON" : "Copy Payload"}</span>
              </button>
            </div>

            <div className="divide-y divide-white/10 text-[11px]">
              {bom.map((item, idx) => (
                <div key={idx} className="py-1.5 flex justify-between items-center text-white/80">
                  <div className="space-x-2">
                    <span className="font-semibold text-white">{item.part}</span>
                    <span className="text-white/50 text-[10px]">{item.spec}</span>
                  </div>
                  <span className="font-mono text-[#E8A317]">x{item.qty}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
