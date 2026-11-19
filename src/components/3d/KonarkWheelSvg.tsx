import React from "react";

export function KonarkWheelSvg({ size = 280, className = "" }: { size?: number; className?: string }) {
  const spokesCount = 24;
  const majorSpokes = [0, 3, 6, 9, 12, 15, 18, 21];
  const groupColors = [
    "#0176D3", // Salesforce
    "#6B4EFF", // Agentforce
    "#00A38C", // Integrations
    "#E8A317", // Fullstack / Turmeric
    "#8A4B2A", // AWS / Clay
    "#C8372D", // Delivery / Vermilion
    "#3C6E47", // Admin / Leaf
    "#1F2A5C", // Contact Center / Indigo
  ];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer Rim with Beads */}
      <circle cx="100" cy="100" r="92" stroke="#1A1410" strokeWidth="2.5" fill="#FFFBF2" />
      <circle cx="100" cy="100" r="86" stroke="#1A1410" strokeWidth="1.2" strokeDasharray="3 3" />
      <circle cx="100" cy="100" r="80" stroke="#1A1410" strokeWidth="1.8" />

      {/* 24 Spokes */}
      {Array.from({ length: spokesCount }).map((_, i) => {
        const angle = (i * 360) / spokesCount;
        const rad = (angle * Math.PI) / 180;
        const isMajor = majorSpokes.includes(i);
        const majorIdx = majorSpokes.indexOf(i);
        const spokeColor = isMajor ? groupColors[majorIdx] : "#8A4B2A";

        const x1 = 100 + 26 * Math.cos(rad);
        const y1 = 100 + 26 * Math.sin(rad);
        const x2 = 100 + 80 * Math.cos(rad);
        const y2 = 100 + 80 * Math.sin(rad);

        const midX = 100 + 53 * Math.cos(rad);
        const midY = 100 + 53 * Math.sin(rad);

        return (
          <g key={i}>
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={spokeColor}
              strokeWidth={isMajor ? 2.5 : 1.2}
            />
            {isMajor && (
              <circle cx={midX} cy={midY} r="3.5" fill={spokeColor} stroke="#1A1410" strokeWidth="0.8" />
            )}
          </g>
        );
      })}

      {/* Inner Central Hub (Axle Medallion) */}
      <circle cx="100" cy="100" r="26" fill="#8A4B2A" stroke="#1A1410" strokeWidth="2" />
      <circle cx="100" cy="100" r="18" fill="#E8A317" stroke="#1A1410" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="8" fill="#1F2A5C" stroke="#1A1410" strokeWidth="1" />
    </svg>
  );
}
