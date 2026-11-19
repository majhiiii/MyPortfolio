"use client";

import React, { useState } from "react";
import { PattachitraBorder } from "@/components/ui/PattachitraBorder";
import { KonarkWheelCanvas } from "@/components/3d/KonarkWheelCanvas";
import { KonarkWheelSvg } from "@/components/3d/KonarkWheelSvg";
import { Download, Mail, ChevronRight, Award, GraduationCap, MapPin, Briefcase, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SkillGroupId } from "@/data/stack";

interface PathStage {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  isCurrent?: boolean;
}

const PATH_STAGES: PathStage[] = [
  {
    id: "learning",
    title: "Learning",
    subtitle: "Python Full Stack (2023–24)",
    summary: "Built foundations in Python, JavaScript, relational database design, and web architecture before entering enterprise software.",
  },
  {
    id: "briskode",
    title: "Intern at Briskode",
    subtitle: "Mar 2024 – Oct 2024",
    summary: "Built responsive React and Next.js client frontends, integrated REST APIs, and delivered production UI components.",
  },
  {
    id: "asspl",
    title: "Developer at ASSPL",
    subtitle: "Nov 2024 – Present",
    summary: "Engineered high-throughput B2B Commerce quoting, 10+ third-party billing/logistics integrations, and 4 production Agentforce autonomous agents.",
    isCurrent: true,
  },
  {
    id: "next-role",
    title: "Next Role",
    subtitle: "Open to opportunities",
    summary: "Targeting impactful Salesforce Developer and platform engineering roles building robust, high-volume cloud architectures.",
  },
];

export function OverviewSection() {
  const [selectedStage, setSelectedStage] = useState<string>("asspl");

  const activeStageData = PATH_STAGES.find((s) => s.id === selectedStage) || PATH_STAGES[2];

  const handleSpokeClick = (groupId: SkillGroupId) => {
    const el = document.getElementById("skills");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="overview" className="space-y-6 pt-6 pb-12">
      
      {/* Highlights Panel (Salesforce Record Header Style) */}
      <div className="rounded-lg bg-[var(--surface)] border border-hairline overflow-hidden shadow-2xs transition-colors">
        {/* Top Pattachitra Creeper Border Strip */}
        <PattachitraBorder />

        <div className="p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Record Identity & Compact Fields */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Record Identity Header */}
            <div className="flex items-center gap-4">
              <div className="w-13 h-13 rounded-full border border-hairline bg-[var(--bg)] p-1 shrink-0 flex items-center justify-center">
                <KonarkWheelSvg size={42} />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--muted)]">
                    Contact Record
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--turmeric)]" />
                  <span className="text-[11px] font-mono text-[var(--turmeric)] font-semibold">Active</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--ink)]">
                  Rakesh Majhi
                </h1>
                <p className="text-sm font-medium text-[var(--muted)]">
                  Salesforce Developer
                </p>
              </div>
            </div>

            {/* Compact 4-Field Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-hairline text-xs">
              <div className="space-y-1">
                <span className="font-mono text-[11px] text-[var(--muted)] block">Company</span>
                <span className="font-medium text-[var(--ink)] text-sm block">ASSPL</span>
              </div>
              <div className="space-y-1">
                <span className="font-mono text-[11px] text-[var(--muted)] block">Location</span>
                <span className="font-medium text-[var(--ink)] text-sm block">Bhubaneswar, India</span>
              </div>
              <div className="space-y-1">
                <span className="font-mono text-[11px] text-[var(--muted)] block">Focus</span>
                <span className="font-medium text-[var(--ink)] text-sm block">Apex, LWC, Agentforce</span>
              </div>
              <div className="space-y-1">
                <span className="font-mono text-[11px] text-[var(--muted)] block">Status</span>
                <span className="font-medium text-[var(--ink)] text-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[var(--turmeric)]" />
                  Open to roles
                </span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="/assets/Rakesh_Majhi_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[var(--indigo)] text-[#FFFBF2] text-xs font-medium hover:opacity-90 transition-opacity shadow-2xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download resume</span>
              </a>

              <a
                href="mailto:rakeshmajhi.connect@gmail.com?subject=Salesforce%20Opportunity"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-hairline bg-[var(--surface)] text-[var(--ink)] text-xs font-medium hover:border-[var(--indigo)] hover:text-[var(--indigo)] transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email me</span>
              </a>
            </div>

          </div>

          {/* Right Column: Hero 3D Konark Wheel Stage (Dedicated space, never behind text) */}
          <div className="lg:col-span-4 h-[240px] sm:h-[260px] flex items-center justify-center relative">
            <KonarkWheelCanvas onSelectGroup={handleSpokeClick} />
          </div>

        </div>
      </div>

      {/* Path Component (Chevron Stages of Career Journey) */}
      <div className="rounded-lg bg-[var(--surface)] border border-hairline p-4 sm:p-5 space-y-3 transition-colors">
        <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--muted)]">
          Stage // Career Path
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
          {PATH_STAGES.map((stage) => {
            const isSelected = selectedStage === stage.id;
            const isCurrent = stage.isCurrent;

            return (
              <button
                key={stage.id}
                onClick={() => setSelectedStage(stage.id)}
                className={`text-left p-3 rounded-md border transition-all cursor-pointer relative ${
                  isCurrent
                    ? "bg-[#FFF4D1] dark:bg-[#2A2315] border-[var(--turmeric)] text-[#1A1410] dark:text-[#F3E9D6] font-semibold"
                    : isSelected
                    ? "bg-[var(--bg)] border-[var(--ink)] text-[var(--ink)]"
                    : "bg-[var(--surface)] border-hairline text-[var(--muted)] hover:border-[var(--muted)]"
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold">{stage.title}</span>
                  {isCurrent && (
                    <span className="w-2 h-2 rounded-full bg-[var(--turmeric)]" />
                  )}
                </div>
                <span className="text-[11px] opacity-80 block mt-0.5 font-normal">
                  {stage.subtitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail Reveal */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStageData.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="p-3.5 rounded-md bg-[var(--bg)] border border-hairline text-xs font-sans text-[var(--ink)] leading-relaxed"
          >
            <span className="font-semibold mr-1.5">{activeStageData.title}:</span>
            {activeStageData.summary}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Two-Column Record Body: About & Photo Frame (Left) + Certifications & Quick Facts (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Main Column: About in human voice + Real photo frame */}
        <div className="lg:col-span-8 rounded-lg bg-[var(--surface)] border border-hairline p-6 sm:p-8 space-y-6 transition-colors">
          <div className="space-y-1 border-b border-hairline pb-4">
            <h2 className="text-xl font-semibold text-[var(--ink)] tracking-tight">
              About
            </h2>
            <p className="text-xs font-mono text-[var(--muted)]">
              Engineering summary &bull; In my own words
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Real photo frame with Pattachitra-style border frame */}
            <div className="md:col-span-4 flex justify-center">
              <div className="relative p-2 rounded-lg border-2 border-[var(--turmeric)] bg-[var(--bg)] shadow-xs">
                {/* Decorative border corners */}
                <div className="w-38 h-48 rounded-md bg-[var(--surface)] border border-hairline flex flex-col items-center justify-center text-center p-4 overflow-hidden relative">
                  {/* Photo Slot Placeholder with actual image fallback */}
                  <img
                    src="/assets/rakesh.jpg"
                    alt="Rakesh Majhi"
                    onError={(e) => {
                      // Fallback gracefully to monogram portrait placeholder
                      (e.target as HTMLElement).style.display = "none";
                    }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="flex flex-col items-center justify-center space-y-2 z-0">
                    <div className="w-16 h-16 rounded-full border border-hairline bg-[var(--bg)] flex items-center justify-center text-xl font-mono text-[var(--ink)]">
                      RM
                    </div>
                    <span className="text-[11px] font-mono text-[var(--muted)]">
                      [PHOTO_URL]
                    </span>
                    <span className="text-[10px] font-medium text-[var(--ink)]">
                      Rakesh Majhi
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Plain Human Copy (4-5 sentences, no hype) */}
            <div className="md:col-span-8 space-y-3.5 text-[15.5px] sm:text-[16.5px] leading-relaxed text-[var(--ink)] font-normal prose-measure">
              <p>
                I am a Salesforce Developer based in Bhubaneswar, Odisha, currently engineering production systems at Abacus System &amp; Solution (ASSPL).
              </p>
              <p>
                Over the past two years, my focus has been on custom Apex triggers and classes, Lightning Web Components, CloudCraze B2B Commerce, and connecting Salesforce with external financial gateways and cloud backends.
              </p>
              <p>
                Recently, I have spent significant time deploying autonomous Agentforce agents and Einstein chatbots on Experience Cloud to streamline customer support.
              </p>
              <p>
                Prior to ASSPL, I worked at Briskode building modern React and Next.js web applications. I care deeply about clean code structure, solid test isolation, and building reliable tools people actually use.
              </p>
            </div>

          </div>
        </div>

        {/* Right Sidebar: Certifications Card & Quick Facts */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Certifications Card (Plain text, credentials, no "Verified" label) */}
          <div className="rounded-lg bg-[var(--surface)] border border-hairline p-5 space-y-4 transition-colors">
            <div className="flex items-center justify-between pb-3 border-b border-hairline">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[var(--indigo)]" />
                <h3 className="text-sm font-semibold text-[var(--ink)]">
                  Certifications
                </h3>
              </div>
              <span className="text-[11px] font-mono text-[var(--muted)]">Salesforce</span>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <div className="font-medium text-[var(--ink)] text-sm flex items-center justify-between">
                  <span>Salesforce Certified Agentforce Specialist</span>
                </div>
                <p className="text-[11px] text-[var(--muted)]">
                  Autonomous agents, Agent Builder topics, invocable actions, and Einstein Trust Layer.
                </p>
                <a
                  href="https://trailhead.salesforce.com/credentials/verification"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-[11px] text-[var(--indigo)] hover:underline font-mono"
                >
                  [CREDENTIAL_URL]
                </a>
              </div>

              <div className="pt-2 border-t border-hairline space-y-1">
                <div className="font-medium text-[var(--ink)] text-sm flex items-center justify-between">
                  <span>Salesforce Certified AI Associate</span>
                </div>
                <p className="text-[11px] text-[var(--muted)]">
                  Generative AI ethics, data cloud integration, prompt grounding, and model governance.
                </p>
                <a
                  href="https://trailhead.salesforce.com/credentials/verification"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-[11px] text-[var(--indigo)] hover:underline font-mono"
                >
                  [CREDENTIAL_URL]
                </a>
              </div>
            </div>
          </div>

          {/* Quick Facts Card */}
          <div className="rounded-lg bg-[var(--surface)] border border-hairline p-5 space-y-3 transition-colors text-xs">
            <h3 className="text-sm font-semibold text-[var(--ink)] pb-2 border-b border-hairline">
              Quick Facts
            </h3>

            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5">
                <GraduationCap className="w-4 h-4 text-[var(--muted)] shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-[var(--ink)] block">Education</span>
                  <span className="text-[11px] text-[var(--muted)]">B.Tech in Computer Science &bull; 2024</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Briefcase className="w-4 h-4 text-[var(--muted)] shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-[var(--ink)] block">Tenure</span>
                  <span className="text-[11px] text-[var(--muted)]">2+ Years in Production Environments</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[var(--muted)] shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-[var(--ink)] block">Base</span>
                  <span className="text-[11px] text-[var(--muted)]">Bhubaneswar, Odisha, India</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
