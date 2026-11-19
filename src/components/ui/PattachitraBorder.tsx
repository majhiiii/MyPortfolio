import React from "react";

export function PattachitraBorder({ className = "" }: { className?: string }) {
  return (
    <div
      className={`w-full h-3 overflow-hidden select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="repeat-x"
        viewBox="0 0 120 12"
      >
        <defs>
          <pattern id="pattachitra-creeper" width="40" height="12" patternUnits="userSpaceOnUse">
            {/* Base guide lines */}
            <line x1="0" y1="0.5" x2="40" y2="0.5" stroke="#1A1410" strokeWidth="0.8" />
            <line x1="0" y1="11.5" x2="40" y2="11.5" stroke="#1A1410" strokeWidth="0.8" />
            {/* Sinusoidal vine stem */}
            <path
              d="M 0,6 Q 10,2 20,6 T 40,6"
              fill="none"
              stroke="#1A1410"
              strokeWidth="1"
            />
            {/* Turmeric & Vermilion Stylized Lotus Petals */}
            <path
              d="M 10,4 C 8,1 12,1 10,4 Z"
              fill="#C8372D"
              stroke="#1A1410"
              strokeWidth="0.6"
            />
            <path
              d="M 30,8 C 28,11 32,11 30,8 Z"
              fill="#E8A317"
              stroke="#1A1410"
              strokeWidth="0.6"
            />
            {/* Leaf nodes */}
            <ellipse cx="6" cy="7" rx="2" ry="1.2" fill="#3C6E47" stroke="#1A1410" strokeWidth="0.5" />
            <ellipse cx="26" cy="5" rx="2" ry="1.2" fill="#3C6E47" stroke="#1A1410" strokeWidth="0.5" />
            <circle cx="20" cy="6" r="1.2" fill="#E8A317" stroke="#1A1410" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="12" fill="url(#pattachitra-creeper)" />
      </svg>
    </div>
  );
}
