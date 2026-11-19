"use client";

import React, { useState } from "react";
import { Cloud, Globe, Shield, Database, Server, HardDrive, ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface StepData {
  step: number;
  title: string;
  badge: string;
  service: string;
  description: string;
  codeSnippet: string;
}

const STEPS: StepData[] = [
  {
    step: 1,
    title: "DNS Resolution & ACM Certificate Handshake",
    badge: "Edge Security",
    service: "AWS Route 53 & ACM",
    description: "Route 53 resolves public DNS queries via Alias records pointing to CloudFront edge distribution. ACM supplies a free, auto-renewing TLS certificate securing all HTTPS traffic.",
    codeSnippet: `// Route 53 Record Configuration
Type: "A (IPv4 Address)"
AliasTarget: {
  DNSName: "d111111abcdef8.cloudfront.net",
  EvaluateTargetHealth: false
}
CertificateArn: "arn:aws:acm:us-east-1:123456789012:certificate/abc-123"`,
  },
  {
    step: 2,
    title: "Amplify Hosting & CloudFront Edge Caching",
    badge: "CDN Distribution",
    service: "AWS Amplify & CloudFront",
    description: "Next.js static assets and SSR bundles are deployed via AWS Amplify CI/CD, automatically distributed to 450+ CloudFront edge locations with Gzip/Brotli compression.",
    codeSnippet: `// amplify.yml Build Spec
frontend:
  phases:
    build:
      commands:
        - pnpm install
        - pnpm build
  artifacts:
    baseDirectory: out
    files:
      - '**/*'`,
  },
  {
    step: 3,
    title: "API Gateway & Serverless Lambda Microservices",
    badge: "Compute Layer",
    service: "API Gateway & AWS Lambda",
    description: "REST endpoints route through API Gateway into containerized Python FastAPI or Node.js Lambda functions with sub-50ms cold start times and automated scale-to-zero.",
    codeSnippet: `from fastapi import FastAPI
from mangum import Mangum

app = FastAPI(title="Middleware Sync")

@app.post("/api/v1/sync/salesforce")
async def sync_payload(data: dict):
    # Verify HMAC signature and process async
    return {"status": "dispatched", "records": len(data.get("items", []))}

handler = Mangum(app)`,
  },
  {
    step: 4,
    title: "AWS RDS MySQL / PostgreSQL Database",
    badge: "Data Persistence",
    service: "Amazon RDS (MySQL)",
    description: "Multi-AZ relational database instance storing structured transactional records with automated daily snapshots, read replicas, and SSL connection encryption.",
    codeSnippet: `-- MySQL Schema Setup (RDS Multi-AZ)
CREATE TABLE client_sync_logs (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  salesforce_id VARCHAR(18) NOT NULL,
  sync_status ENUM('PENDING', 'SUCCESS', 'FAILED') DEFAULT 'PENDING',
  payload JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_sf_id (salesforce_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,
  },
  {
    step: 5,
    title: "S3 Object Storage for Secure Assets",
    badge: "Asset Store",
    service: "Amazon S3",
    description: "Private bucket storage for customer-uploaded PDF specifications, CAD layouts, and invoices, accessible exclusively through expiring presigned URLs.",
    codeSnippet: `// S3 Presigned URL Generation
const s3Params = {
  Bucket: 'client-cad-specifications',
  Key: \`uploads/\${fileId}.pdf\`,
  Expires: 300, // 5 minute validity
  ContentType: 'application/pdf'
};
const uploadUrl = await s3.getSignedUrlPromise('putObject', s3Params);`,
  },
];

export function AwsDeployWalkthrough() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep = STEPS[currentStepIndex];

  return (
    <div className="space-y-6 font-mono text-xs text-[#F3F1EC]">
      
      {/* Subheader Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-[#FF8A1F] font-bold">
            AWS PRODUCTION BLUEPRINT
          </span>
          <h3 className="text-base font-bold text-white font-sans mt-0.5">
            Full-Stack Next.js &amp; Cloud Infrastructure Deployment
          </h3>
        </div>
        <span className="text-[10px] px-2.5 py-1 rounded-full border border-white/20 bg-white/5 text-[#8E8E93]">
          Illustrative Architecture &bull; Generic Reference Model
        </span>
      </div>

      {/* Stepper Rail */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {STEPS.map((s, idx) => {
          const isActive = currentStepIndex === idx;
          const isDone = currentStepIndex > idx;

          return (
            <button
              key={s.step}
              onClick={() => setCurrentStepIndex(idx)}
              className={`p-3 rounded-sm border text-left transition-all flex flex-col justify-between h-20 ${
                isActive
                  ? "border-[#FF8A1F] bg-[#FF8A1F]/10 text-white"
                  : isDone
                  ? "border-white/20 bg-white/5 text-white/90"
                  : "border-white/10 text-white/40 hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-bold">STEP 0{s.step}</span>
                {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-[#2E9E5B]" />}
              </div>
              <span className="text-[11px] font-sans font-medium line-clamp-1">
                {s.service}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Stage Inspection */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
        
        {/* Left: Interactive Context & Explanation */}
        <div className="lg:col-span-6 space-y-4">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-xs bg-[#FF8A1F] text-black font-bold">
              {currentStep.badge}
            </span>
            <h4 className="font-serif text-2xl font-normal text-white pt-1">
              {currentStep.title}
            </h4>
          </div>

          <p className="text-sm font-sans text-white/80 leading-relaxed">
            {currentStep.description}
          </p>

          <div className="p-4 rounded-sm bg-black/40 border border-white/10 space-y-2 text-[11px]">
            <div className="text-white/50 uppercase tracking-wider text-[10px]">
              Tenure Application &bull; Briskode &amp; ASSPL
            </div>
            <p className="text-white/90 font-sans leading-relaxed">
              Implemented for high-traffic web storefronts with automated GitHub branch previews, zero downtime deployment, and isolated VPC database security groups.
            </p>
          </div>

          {/* Stepper Navigation Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              disabled={currentStepIndex === 0}
              onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
              className="px-4 py-2 rounded-full border border-white/20 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
            >
              &larr; Previous Stage
            </button>
            <button
              disabled={currentStepIndex === STEPS.length - 1}
              onClick={() => setCurrentStepIndex((prev) => Math.min(STEPS.length - 1, prev + 1))}
              className="px-5 py-2 rounded-full bg-[#FF8A1F] text-black font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 transition-opacity flex items-center gap-1.5"
            >
              <span>Next Stage</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Technical Code & Configuration Spec */}
        <div className="lg:col-span-6">
          <div className="p-4 rounded-sm bg-[#0C0C0E] border border-white/10 h-full flex flex-col justify-between">
            <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[10px] text-white/40 mb-3">
              <span>CONFIG SPECIFICATION</span>
              <span className="text-[#FF8A1F]">{currentStep.service}</span>
            </div>
            <pre className="text-[11px] font-mono text-emerald-400 overflow-x-auto p-2 bg-black/50 rounded leading-relaxed flex-1">
              <code>{currentStep.codeSnippet}</code>
            </pre>
            <div className="pt-3 border-t border-white/10 text-[10px] text-white/40 flex items-center justify-between">
              <span>Production Infrastructure Pattern</span>
              <span className="text-[#2E9E5B] flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Verified Architecture</span>
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
