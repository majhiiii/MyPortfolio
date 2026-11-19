import React from "react";

export function FallbackPoster() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 dark:opacity-20 transition-opacity"
      aria-hidden="true"
    >
      <svg
        className="w-[420px] h-[340px] text-hairline"
        viewBox="0 0 420 340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="210" cy="170" r="80" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="150" cy="180" r="60" stroke="currentColor" strokeWidth="1" />
        <circle cx="270" cy="185" r="55" stroke="currentColor" strokeWidth="1" />
        <circle cx="180" cy="130" r="50" stroke="currentColor" strokeWidth="1" />
        <circle cx="240" cy="135" r="48" stroke="currentColor" strokeWidth="1" />
        <circle cx="210" cy="170" r="3" fill="currentColor" />
      </svg>
    </div>
  );
}
