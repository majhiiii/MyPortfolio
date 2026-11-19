"use client";

import React from "react";
import {
  SiReact,
  SiNextdotjs,
  SiPython,
  SiJavascript,
  SiFastapi,
  SiPostgresql,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiPostman,
  SiStripe,
  SiPaypal,
  SiQuickbooks,
  SiGooglesheets,
  SiTailwindcss,
  SiMysql,
} from "@icons-pack/react-simple-icons";

interface TechGlyphProps {
  techId: string;
  color: string;
  size?: number;
  className?: string;
}

export function TechGlyph({ techId, color, size = 20, className = "" }: TechGlyphProps) {
  // 1. Third-party brand icons from simple-icons
  switch (techId) {
    case "react":
      return <SiReact size={size} color={color} className={className} />;
    case "nextjs":
      return <SiNextdotjs size={size} color={color} className={className} />;
    case "python":
      return <SiPython size={size} color={color} className={className} />;
    case "javascript":
      return <SiJavascript size={size} color={color} className={className} />;
    case "fastapi":
      return <SiFastapi size={size} color={color} className={className} />;
    case "postgresql":
      return <SiPostgresql size={size} color={color} className={className} />;
    case "git":
      return <SiGit size={size} color={color} className={className} />;
    case "github":
      return <SiGithub size={size} color={color} className={className} />;
    case "github-actions":
      return <SiGithubactions size={size} color={color} className={className} />;
    case "postman":
      return <SiPostman size={size} color={color} className={className} />;
    case "stripe":
      return <SiStripe size={size} color={color} className={className} />;
    case "paypal":
      return <SiPaypal size={size} color={color} className={className} />;
    case "quickbooks":
      return <SiQuickbooks size={size} color={color} className={className} />;
    case "google-sheets":
      return <SiGooglesheets size={size} color={color} className={className} />;
    case "mysql":
      return <SiMysql size={size} color={color} className={className} />;
    case "tailwind":
      return <SiTailwindcss size={size} color={color} className={className} />;
  }

  // 2. High-precision geometric SVGs tailored for each technology
  
  // Apex (Classes, Triggers, Invocable) - Lightning trigger pipeline with compiler brackets
  if (techId.includes("apex")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="13 2 4 13 11 13 10 22 20 11 13 11 13 2" fill={`${color}22`} />
      </svg>
    );
  }

  // LWC - Modular nested component blocks with reactive data node
  if (techId === "lwc") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="3" y="3" width="8" height="8" rx="2" fill={`${color}20`} />
        <rect x="13" y="3" width="8" height="8" rx="2" />
        <rect x="3" y="13" width="8" height="8" rx="2" />
        <rect x="13" y="13" width="8" height="8" rx="2" fill={`${color}20`} />
        <circle cx="12" cy="12" r="2" fill={color} />
      </svg>
    );
  }

  // Flow Builder - Decision diamond branching graph
  if (techId === "flow" || techId.includes("flow")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="5" cy="6" r="2.5" fill={`${color}30`} />
        <circle cx="19" cy="6" r="2.5" />
        <circle cx="19" cy="18" r="2.5" fill={`${color}30`} />
        <path d="M7.5 6h9M5 8.5v7a2.5 2.5 0 0 0 2.5 2.5h9" />
      </svg>
    );
  }

  // Agentforce / AI / Einstein Bots - Autonomous intelligence star nucleus
  if (techId.includes("agent") || techId.includes("einstein") || techId.includes("ai") || techId === "chatgpt-api") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="12 2 15.5 8.5 22 12 15.5 15.5 12 22 8.5 15.5 2 12 8.5 8.5 12 2" fill={`${color}25`} />
        <circle cx="12" cy="12" r="2.5" fill={color} />
      </svg>
    );
  }

  // B2B Commerce - Commerce cart with fast checkout arrow
  if (techId.includes("commerce") || techId === "b2b-commerce") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="8" cy="20" r="1.5" />
        <circle cx="18" cy="20" r="1.5" />
        <path d="M2 3h3.5l2.2 11.2a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L22 7H7" fill={`${color}15`} />
      </svg>
    );
  }

  // SOQL / SOSL - Relational DB cylinder with filter lens
  if (techId.includes("soql") || techId === "sql") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <ellipse cx="12" cy="5" rx="8" ry="3" fill={`${color}25`} />
        <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
        <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
      </svg>
    );
  }

  // Platform Events - Real-time streaming broadcast waves
  if (techId.includes("events")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4 11a8 8 0 0 1 16 0" />
        <path d="M7 14a5 5 0 0 1 10 0" />
        <circle cx="12" cy="17" r="1.5" fill={color} />
        <line x1="12" y1="18.5" x2="12" y2="22" />
      </svg>
    );
  }

  // Salesforce Clouds (Sales, Service, Experience, Health, Data)
  if (techId.includes("cloud")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M17.5 19H7a5 5 0 0 1-.9-9.92 6.5 6.5 0 0 1 12.8 0A5 5 0 0 1 17.5 19z" fill={`${color}22`} />
      </svg>
    );
  }

  // AWS Lambda - Serverless Greek Lambda symbol
  if (techId === "aws-lambda") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="12 2 21 7 21 17 12 22 3 17 3 7 12 2" fill={`${color}15`} />
        <path d="M8 17l4.5-9L16 17" strokeWidth="2.2" />
        <path d="M11 13h5" strokeWidth="2" />
      </svg>
    );
  }

  // AWS S3 - Tiered object storage bucket
  if (techId === "aws-s3") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4 6l2 14h12l2-14H4z" fill={`${color}20`} />
        <ellipse cx="12" cy="6" rx="8" ry="3" />
        <line x1="7" y1="11" x2="17" y2="11" />
        <line x1="8" y1="15" x2="16" y2="15" />
      </svg>
    );
  }

  // AWS CloudFront - Global CDN edge network
  if (techId === "aws-cloudfront") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="9" fill={`${color}15`} />
        <line x1="3" y1="12" x2="21" y2="12" />
        <path d="M12 3a14 14 0 0 1 0 18" />
        <path d="M12 3a14 14 0 0 0 0 18" />
      </svg>
    );
  }

  // AWS Route 53 - Global DNS routing tree
  if (techId === "aws-route53") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="9" y="3" width="6" height="4" rx="1" fill={`${color}30`} />
        <rect x="3" y="17" width="6" height="4" rx="1" />
        <rect x="15" y="17" width="6" height="4" rx="1" />
        <path d="M12 7v5M6 17v-3a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3" />
      </svg>
    );
  }

  // AWS RDS & MySQL - Managed relational DB cluster
  if (techId === "aws-rds") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <ellipse cx="12" cy="5" rx="7" ry="2.5" fill={`${color}30`} />
        <path d="M5 5v14c0 1.38 3.13 2.5 7 2.5s7-1.12 7-2.5V5" />
        <path d="M5 12c0 1.38 3.13 2.5 7 2.5s7-1.12 7-2.5" />
      </svg>
    );
  }

  // AWS ACM / Security / OAuth / MFA - Cryptographic Shield & Key
  if (techId === "aws-acm" || techId.includes("oauth") || techId.includes("security") || techId.includes("connected") || techId.includes("mfa")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill={`${color}20`} />
        <circle cx="12" cy="11" r="2" fill={color} />
        <path d="M12 13v3" />
      </svg>
    );
  }

  // AWS Amplify - Cloud Rocket deployment launch
  if (techId === "aws-amplify") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" fill={`${color}30`} />
        <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      </svg>
    );
  }

  // Amazon Connect - Contact center headset with live audio wave
  if (techId.includes("amazon-connect") || techId.includes("connect") || techId === "contactcenter") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" fill={`${color}25`} />
      </svg>
    );
  }

  // REST APIs & Webhooks - Bidirectional JSON transfer nodes
  if (techId === "rest-api" || techId.includes("webhook")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="5" cy="12" r="2.5" fill={color} />
        <circle cx="19" cy="12" r="2.5" fill={color} />
        <path d="M7.5 9.5l4-3 4 3M15.5 14.5l-4 3-4-3" />
      </svg>
    );
  }

  // PDF Data Extraction - OCR Document Scan
  if (techId.includes("pdf")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill={`${color}15`} />
        <polyline points="14 2 14 8 20 8" />
        <line x1="8" y1="13" x2="16" y2="13" strokeWidth="2" />
        <line x1="8" y1="17" x2="13" y2="17" />
      </svg>
    );
  }

  // Default clean geometric chip with monogram aesthetic
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="4" fill={`${color}20`} />
      <circle cx="12" cy="12" r="3" fill={color} />
    </svg>
  );
}
