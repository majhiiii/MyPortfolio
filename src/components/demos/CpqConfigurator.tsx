"use client";

import React, { useState } from "react";
import { Sliders, Copy, Check, Box, Eye, Layers } from "lucide-react";

export function CpqConfigurator() {
  const [rackType, setRackType] = useState<"pallet" | "cantilever">("pallet");
  const [viewMode, setViewMode] = useState<"3d" | "2d">("3d");
  const [bayWidth, setBayWidth] = useState<number>(96); // inches (8 ft)
  const [frameHeight, setFrameHeight] = useState<number>(192); // inches (16 ft)
  const [uprightDepth, setUprightDepth] = useState<number>(42); // inches
  const [beamLevels, setBeamLevels] = useState<number>(3);
  const [copied, setCopied] = useState<boolean>(false);

  // Engineering calculations based on industrial storage standards
  const isPallet = rackType === "pallet";
  const capacityPerLevel = isPallet ? 5000 : 3500;
  const totalCapacity = beamLevels * capacityPerLevel;

  const basePrice = isPallet ? 340 : 580;
  const levelPrice = isPallet ? 110 : 160;
  const unitPrice =
    basePrice +
    beamLevels * levelPrice +
    (frameHeight > 192 ? 95 : 0) +
    (bayWidth > 96 ? 75 : 0);

  const bom = isPallet
    ? [
        {
          part: "Upright Frame",
          spec: `${frameHeight}"H x ${uprightDepth}"D Industrial Steel Column`,
          qty: 2,
        },
        {
          part: "Step Beam Pair",
          spec: `${bayWidth}" Span · ${capacityPerLevel.toLocaleString()} lbs Capacity`,
          qty: beamLevels,
        },
        {
          part: "Wire Mesh Decking",
          spec: `${bayWidth / 2}" x ${uprightDepth}" Galvanized Panels`,
          qty: beamLevels * 2,
        },
        {
          part: "Floor Anchors & Shims",
          spec: '1/2" x 4-1/4" Heavy-Duty Wedge Anchors',
          qty: 4,
        },
      ]
    : [
        {
          part: "Cantilever Structural Column",
          spec: `${frameHeight}"H Double-Sided Heavy I-Beam`,
          qty: 1,
        },
        {
          part: "Cantilever Arm Pair",
          spec: `${uprightDepth}" Length with 3" Removable Pipe Stops`,
          qty: beamLevels,
        },
        {
          part: "Structural Base Plate",
          spec: `${uprightDepth + 12}" Base with Leveling Studs`,
          qty: 1,
        },
        {
          part: "X-Brace Set & Hardware",
          spec: `${bayWidth}" Center-to-Center Galvanized Struts`,
          qty: 1,
        },
      ];

  const handleCopyPayload = () => {
    const payload = {
      systemType: isPallet ? "Teardrop Pallet Rack System" : "Heavy-Duty Cantilever Storage System",
      viewMode: viewMode === "3d" ? "3D Isometric Perspective" : "2D Orthographic Elevation",
      dimensionalSpecifications: {
        heightInches: frameHeight,
        widthInches: bayWidth,
        depthInches: uprightDepth,
        tiers: beamLevels,
      },
      engineeringRatings: {
        capacityPerLevelLbs: capacityPerLevel,
        totalBayCapacityLbs: totalCapacity,
        seismicZoneRating: "Zone 4 Seismic Rated",
      },
      calculatedWholesalePriceUSD: unitPrice,
      billOfMaterials: bom,
    };
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 3D Isometric Projection Helper
  const originX = 135;
  const originY = 165;
  const scale = 0.58;

  const toIso = (x: number, y: number, z: number) => {
    // x = width, y = height, z = depth
    const isoX = originX + (x - z * 0.6) * scale;
    const isoY = originY - (y * scale) - (z * 0.3) * scale;
    return { x: isoX, y: isoY };
  };

  // Scaled dimensions for CAD viewport
  const w = bayWidth * 1.5;
  const h = (frameHeight / 192) * 200;
  const d = uprightDepth * 1.8;

  const pFL_bottom = toIso(0, 0, 0);
  const pFL_top = toIso(0, h, 0);
  const pFR_bottom = toIso(w, 0, 0);
  const pFR_top = toIso(w, h, 0);

  const pRL_bottom = toIso(0, 0, d);
  const pRL_top = toIso(0, h, d);
  const pRR_bottom = toIso(w, 0, d);
  const pRR_top = toIso(w, h, d);

  return (
    <div className="space-y-4 font-mono text-xs text-white/90">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2 text-white/80">
          <Sliders className="w-4 h-4 text-[#E8A317]" />
          <span className="font-semibold text-sm">Dimensional CPQ 3D Configurator</span>
        </div>
        <div className="flex items-center gap-2">
          {/* 3D vs 2D View Switcher */}
          <button
            onClick={() => setViewMode(viewMode === "3d" ? "2d" : "3d")}
            className="px-2.5 py-1 rounded border border-white/20 bg-white/5 hover:bg-white/15 text-[11px] text-white/80 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Box className="w-3.5 h-3.5 text-[#E8A317]" />
            <span>{viewMode === "3d" ? "3D Isometric" : "2D Blueprint"}</span>
          </button>

          <button
            onClick={() => setRackType("pallet")}
            className={`px-3 py-1 text-[11px] rounded border transition-colors cursor-pointer ${
              isPallet
                ? "bg-white text-[#14182E] border-white font-bold"
                : "border-white/20 text-white/60 hover:text-white"
            }`}
          >
            Pallet Rack
          </button>
          <button
            onClick={() => setRackType("cantilever")}
            className={`px-3 py-1 text-[11px] rounded border transition-colors cursor-pointer ${
              !isPallet
                ? "bg-white text-[#14182E] border-white font-bold"
                : "border-white/20 text-white/60 hover:text-white"
            }`}
          >
            Cantilever
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-3.5 bg-[#14182E] border border-white/10 p-4 rounded-[14px] shadow-sm">
          <div className="text-[10px] uppercase font-bold text-white/60 tracking-wider flex items-center justify-between">
            <span>Dimensional Parameters</span>
            <span className="text-[#E8A317]">Real-Time CPQ</span>
          </div>

          {/* Width */}
          <div className="space-y-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-white/60">Bay Span / Width:</span>
              <span className="font-bold text-white">{bayWidth / 12} ft ({bayWidth}&quot;)</span>
            </div>
            <input
              type="range"
              min={72}
              max={144}
              step={12}
              value={bayWidth}
              onChange={(e) => setBayWidth(Number(e.target.value))}
              className="w-full accent-[#E8A317] cursor-pointer"
            />
          </div>

          {/* Height */}
          <div className="space-y-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-white/60">Column Height:</span>
              <span className="font-bold text-white">{frameHeight / 12} ft ({frameHeight}&quot;)</span>
            </div>
            <input
              type="range"
              min={120}
              max={288}
              step={24}
              value={frameHeight}
              onChange={(e) => setFrameHeight(Number(e.target.value))}
              className="w-full accent-[#E8A317] cursor-pointer"
            />
          </div>

          {/* Depth */}
          <div className="space-y-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-white/60">Upright Depth / Arm:</span>
              <span className="font-bold text-white">{uprightDepth}&quot; ({(uprightDepth / 12).toFixed(1)} ft)</span>
            </div>
            <input
              type="range"
              min={36}
              max={60}
              step={6}
              value={uprightDepth}
              onChange={(e) => setUprightDepth(Number(e.target.value))}
              className="w-full accent-[#E8A317] cursor-pointer"
            />
          </div>

          {/* Beam Levels */}
          <div className="space-y-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-white/60">Storage Tier Levels:</span>
              <span className="font-bold text-white">{beamLevels} Levels</span>
            </div>
            <input
              type="range"
              min={2}
              max={5}
              step={1}
              value={beamLevels}
              onChange={(e) => setBeamLevels(Number(e.target.value))}
              className="w-full accent-[#E8A317] cursor-pointer"
            />
          </div>

          {/* Summary Box */}
          <div className="pt-3 border-t border-white/10 space-y-1.5 text-[11px]">
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

        {/* 3D CAD Isometric Blueprint & Bill of Materials */}
        <div className="lg:col-span-7 space-y-3.5">
          {/* 3D Isometric Viewport */}
          <div className="h-64 rounded-[14px] bg-[#0A0D1A] border border-white/15 flex items-center justify-center p-3 relative overflow-hidden shadow-inner">
            <div className="absolute top-2.5 left-3 text-[10px] text-white/50 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>
                {viewMode === "3d" ? "3D Isometric Viewport" : "2D Orthographic CAD Blueprint"} &bull;{" "}
                {isPallet ? "Pallet Rack" : "Cantilever"}
              </span>
            </div>

            <svg
              className="w-full h-full max-h-56"
              viewBox="0 0 340 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {viewMode === "3d" && isPallet ? (
                <>
                  {/* Floor Grid Guidelines */}
                  <line x1={pFL_bottom.x} y1={pFL_bottom.y} x2={pRL_bottom.x} y2={pRL_bottom.y} stroke="rgba(255,255,255,0.12)" strokeDasharray="3 3" />
                  <line x1={pFR_bottom.x} y1={pFR_bottom.y} x2={pRR_bottom.x} y2={pRR_bottom.y} stroke="rgba(255,255,255,0.12)" strokeDasharray="3 3" />
                  <line x1={pRL_bottom.x} y1={pRL_bottom.y} x2={pRR_bottom.x} y2={pRR_bottom.y} stroke="rgba(255,255,255,0.12)" strokeDasharray="3 3" />

                  {/* Rear Uprights (Deep Amber #C68200) */}
                  <line x1={pRL_bottom.x} y1={pRL_bottom.y} x2={pRL_top.x} y2={pRL_top.y} stroke="#B36B00" strokeWidth="4.5" strokeLinecap="round" />
                  <line x1={pRR_bottom.x} y1={pRR_bottom.y} x2={pRR_top.x} y2={pRR_top.y} stroke="#B36B00" strokeWidth="4.5" strokeLinecap="round" />

                  {/* Rear X-Bracing */}
                  <line x1={pRL_bottom.x} y1={pRL_bottom.y} x2={pRR_top.x} y2={pRR_top.y} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                  <line x1={pRR_bottom.x} y1={pRR_bottom.y} x2={pRL_top.x} y2={pRL_top.y} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

                  {/* 3D Tier Shelves, Wire Mesh & Pallets */}
                  {Array.from({ length: beamLevels }).map((_, i) => {
                    const levelY = (h / (beamLevels + 0.3)) * (i + 1);
                    const pFL = toIso(0, levelY, 0);
                    const pFR = toIso(w, levelY, 0);
                    const pRL = toIso(0, levelY, d);
                    const pRR = toIso(w, levelY, d);

                    // Wooden Pallet Cargo in Isometric Perspective
                    const pP1 = toIso(w * 0.2, levelY + 6, d * 0.5);
                    const pP2 = toIso(w * 0.8, levelY + 6, d * 0.5);

                    return (
                      <g key={i}>
                        {/* Wire Mesh Decking Plane (Translucent Hatch) */}
                        <polygon
                          points={`${pFL.x},${pFL.y} ${pFR.x},${pFR.y} ${pRR.x},${pRR.y} ${pRL.x},${pRL.y}`}
                          fill="rgba(31, 42, 92, 0.45)"
                          stroke="rgba(255,255,255,0.25)"
                          strokeWidth="0.8"
                        />

                        {/* Pallet Cargo Box on Tier */}
                        <g opacity="0.9">
                          <polygon
                            points={`${pP1.x - 12},${pP1.y} ${pP1.x + 12},${pP1.y} ${pP1.x + 16},${pP1.y - 10} ${pP1.x - 8},${pP1.y - 10}`}
                            fill="#E8A317"
                            stroke="#8A4B2A"
                            strokeWidth="0.8"
                          />
                          <polygon
                            points={`${pP1.x - 8},${pP1.y - 10} ${pP1.x + 16},${pP1.y - 10} ${pP1.x + 16},${pP1.y - 20} ${pP1.x - 8},${pP1.y - 20}`}
                            fill="#FBBF24"
                            stroke="#8A4B2A"
                            strokeWidth="0.8"
                          />
                        </g>

                        {/* Rear Step Beam (Darker Red) */}
                        <line x1={pRL.x} y1={pRL.y} x2={pRR.x} y2={pRR.y} stroke="#9B261E" strokeWidth="3" />

                        {/* Left & Right Side Depth Cross-Ties */}
                        <line x1={pFL.x} y1={pFL.y} x2={pRL.x} y2={pRL.y} stroke="#8A4B2A" strokeWidth="2" />
                        <line x1={pFR.x} y1={pFR.y} x2={pRR.x} y2={pRR.y} stroke="#8A4B2A" strokeWidth="2" />

                        {/* Front Step Beam (Bright Vermilion #C8372D) */}
                        <line x1={pFL.x} y1={pFL.y} x2={pFR.x} y2={pFR.y} stroke="#C8372D" strokeWidth="3.5" strokeLinecap="round" />
                      </g>
                    );
                  })}

                  {/* Left Frame Side Cross-Bracing */}
                  <line x1={pFL_bottom.x} y1={pFL_bottom.y} x2={pRL_top.x} y2={pRL_top.y} stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
                  <line x1={pRL_bottom.x} y1={pRL_bottom.y} x2={pFL_top.x} y2={pFL_top.y} stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />

                  {/* Front Uprights (Vibrant Turmeric #E8A317) */}
                  <line x1={pFL_bottom.x} y1={pFL_bottom.y} x2={pFL_top.x} y2={pFL_top.y} stroke="#E8A317" strokeWidth="5" strokeLinecap="round" />
                  <line x1={pFR_bottom.x} y1={pFR_bottom.y} x2={pFR_top.x} y2={pFR_top.y} stroke="#E8A317" strokeWidth="5" strokeLinecap="round" />

                  {/* Top Tie Beam */}
                  <line x1={pFL_top.x} y1={pFL_top.y} x2={pFR_top.x} y2={pFR_top.y} stroke="#C8372D" strokeWidth="2.5" />
                </>
              ) : viewMode === "3d" && !isPallet ? (
                /* Cantilever 3D Isometric View */
                <>
                  {/* Heavy Structural Base in 3D */}
                  <polygon
                    points={`${originX - 30},${originY} ${originX + 30},${originY} ${originX + 45},${originY - 14} ${originX - 15},${originY - 14}`}
                    fill="#8A4B2A"
                    stroke="#D97706"
                    strokeWidth="1.2"
                  />
                  {/* Central I-Beam Column */}
                  <line x1={originX} y1={originY} x2={originX} y2={originY - h * 0.85} stroke="#E8A317" strokeWidth="8" strokeLinecap="round" />

                  {/* Cantilever Arms with Pipe Stops */}
                  {Array.from({ length: beamLevels }).map((_, i) => {
                    const armY = originY - (h * 0.75 / (beamLevels + 0.3)) * (i + 1);
                    return (
                      <g key={i}>
                        {/* Left Arm */}
                        <polygon
                          points={`${originX - 4},${armY} ${originX - 55},${armY + 8} ${originX - 55},${armY + 16} ${originX - 4},${armY + 6}`}
                          fill="#C8372D"
                          stroke="#9B261E"
                          strokeWidth="1"
                        />
                        {/* Right Arm */}
                        <polygon
                          points={`${originX + 4},${armY} ${originX + 55},${armY - 8} ${originX + 55},${armY} ${originX + 4},${armY + 6}`}
                          fill="#C8372D"
                          stroke="#9B261E"
                          strokeWidth="1"
                        />
                      </g>
                    );
                  })}
                </>
              ) : (
                /* 2D Blueprint Elevation View */
                <>
                  <rect x="40" y="25" width="8" height="145" fill="#E8A317" rx="1" />
                  <rect x="270" y="25" width="8" height="145" fill="#E8A317" rx="1" />
                  {Array.from({ length: beamLevels }).map((_, i) => {
                    const y = 145 - (i * 110) / Math.max(beamLevels - 1, 1);
                    return (
                      <g key={i}>
                        <rect x="48" y={y} width="222" height="6" fill="#C8372D" rx="1" />
                        <line x1="48" y1={y + 3} x2="270" y2={y + 3} stroke="#FFF" strokeWidth="0.5" strokeDasharray="3 3" />
                      </g>
                    );
                  })}
                  <line x1="48" y1="25" x2="270" y2="170" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                  <line x1="48" y1="170" x2="270" y2="25" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                </>
              )}
            </svg>
          </div>

          {/* Bill of Materials Table */}
          <div className="bg-[#14182E] border border-white/10 p-3.5 rounded-[14px] space-y-2">
            <div className="flex items-center justify-between text-[10px] text-white/50">
              <span className="font-semibold text-white/80">GENERATED BILL OF MATERIALS (BOM)</span>
              <button
                onClick={handleCopyPayload}
                className="flex items-center gap-1 text-[#E8A317] hover:underline cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
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
                  <span className="font-mono text-emerald-400 font-semibold">{item.qty} pcs</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
