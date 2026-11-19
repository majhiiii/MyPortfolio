"use client";

import React, { useState } from "react";
import { PattachitraBorder } from "@/components/ui/PattachitraBorder";
import { KonarkWheelCanvas } from "@/components/3d/KonarkWheelCanvas";
import { KonarkWheelSvg } from "@/components/3d/KonarkWheelSvg";
import { Download, Mail, ChevronRight, Award, GraduationCap, MapPin, Briefcase, Sparkles, ExternalLink, Rocket } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SkillGroupId } from "@/data/stack";

interface PathStage {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  badge: string;
  badgeColor: string;
  isCurrent?: boolean;
}

const PATH_STAGES: PathStage[] = [
  {
    id: "learning",
    title: "Full-Stack Training",
    subtitle: "Abacus Systems (Sep 2023 – Feb 2024)",
    badge: "Foundation",
    badgeColor: "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300",
    summary: "Intensive training in Python, full-stack web architectures, relational database schemas, and data science fundamentals.",
  },
  {
    id: "briskode",
    title: "Intern at Briskode",
    subtitle: "Mar 2024 – Oct 2024",
    badge: "React & Next.js",
    badgeColor: "bg-orange-100 text-orange-800 dark:bg-orange-950/60 dark:text-orange-300",
    summary: "Built and shipped 10+ responsive client UI components and web pages using React.js and Next.js, integrating backend REST APIs.",
  },
  {
    id: "asspl",
    title: "Developer at ASSPL",
    subtitle: "Nov 2024 – Present",
    badge: "Salesforce & AI",
    badgeColor: "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300",
    summary: "Leading technical delivery across 3 concurrent projects: Pantero B2B Commerce, Health Cloud, 4 production Agentforce agents, and 10+ integrations.",
    isCurrent: true,
  },
  {
    id: "biznusoft-alt",
    title: "Building Biznusoft Alt",
    subtitle: "Cloud ERP & Equipment Rental",
    badge: "Building Now",
    badgeColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300",
    summary: "Architecting a modern cloud alternative to Biznusoft for equipment rental lifecycle, inventory tracking, and automated CPQ quoting.",
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
    <section id="overview" className="space-y-4 pt-2">
      
      {/* Highlights Panel (Salesforce Record Header Style - Colorful & Compact) */}
      <div className="rounded-lg bg-[var(--surface)] border border-hairline overflow-hidden shadow-xs transition-colors">
        {/* Top Pattachitra Border Strip */}
        <PattachitraBorder />

        <div className="p-4 sm:p-5 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-center">
          
          {/* Record Identity & Compact Fields */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Record Identity Header */}
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/40 p-1 shrink-0 flex items-center justify-center">
                <KonarkWheelSvg size={38} />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--muted)]">
                    Salesforce Record // Candidate
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold uppercase">
                    Available for hire
                  </span>
                </div>
                <div className="flex flex-wrap items-baseline gap-2.5">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink)]">
                    Rakesh Majhi
                  </h1>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    Salesforce Developer &amp; Administrator
                  </span>
                </div>
              </div>
            </div>

            {/* Compact 4-Field Row with Clean Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 border-t border-hairline text-xs">
              <div className="p-2 rounded-md bg-[var(--surface-alt)] border border-hairline space-y-0.5">
                <span className="font-mono text-[10px] text-[var(--muted)] block uppercase">Company</span>
                <span className="font-semibold text-[var(--ink)] text-xs sm:text-sm block">ASSPL &bull; 2 Yrs</span>
              </div>
              <div className="p-2 rounded-md bg-[var(--surface-alt)] border border-hairline space-y-0.5">
                <span className="font-mono text-[10px] text-[var(--muted)] block uppercase">Location</span>
                <span className="font-semibold text-[var(--ink)] text-xs sm:text-sm block">Bhubaneswar, IN</span>
              </div>
              <div className="p-2 rounded-md bg-[var(--surface-alt)] border border-hairline space-y-0.5">
                <span className="font-mono text-[10px] text-[var(--muted)] block uppercase">Core Focus</span>
                <span className="font-semibold text-[var(--ink)] text-xs sm:text-sm block truncate">Apex &bull; LWC &bull; AI</span>
              </div>
              <div className="p-2 rounded-md bg-[var(--surface-alt)] border border-hairline space-y-0.5">
                <span className="font-mono text-[10px] text-[var(--muted)] block uppercase">Active Project</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm block truncate">
                  Biznusoft Alt
                </span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <a
                href="/assets/Rakesh_Majhi_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#0176D3] text-white text-xs font-semibold hover:bg-[#015ba4] transition-colors shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download resume</span>
              </a>

              <a
                href="mailto:rakeshmajhi.connect@gmail.com?subject=Salesforce%20Opportunity"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-[var(--surface)] text-[var(--ink)] text-xs font-medium hover:border-[#0176D3] hover:text-[#0176D3] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Email me</span>
              </a>

              <a
                href="https://linkedin.com/in/rakeshmajhi57"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-[var(--surface)] text-[var(--muted)] text-xs font-mono hover:text-[#0176D3] transition-colors"
              >
                <span>linkedin.com/in/rakeshmajhi57</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>

          {/* Right Column: Hero 3D Konark Wheel Stage (Compact, dedicated) */}
          <div className="lg:col-span-4 h-[190px] sm:h-[210px] flex items-center justify-center relative">
            <KonarkWheelCanvas onSelectGroup={handleSpokeClick} />
          </div>

        </div>
      </div>

      {/* Path Component (Chevron Stages of Career Journey - Compact & Colorful) */}
      <div className="rounded-lg bg-[var(--surface)] border border-hairline p-3.5 sm:p-4 space-y-2.5 transition-colors shadow-xs">
        <div className="flex items-center justify-between text-[11px] font-mono text-[var(--muted)]">
          <span className="uppercase tracking-wider">Career Path &bull; Production Stages</span>
          <span>Click stage to review milestones</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
          {PATH_STAGES.map((stage) => {
            const isSelected = selectedStage === stage.id;
            const isCurrent = stage.isCurrent;

            return (
              <button
                key={stage.id}
                onClick={() => setSelectedStage(stage.id)}
                className={`text-left p-2.5 rounded-md border transition-all cursor-pointer relative ${
                  isCurrent
                    ? "bg-blue-50/70 dark:bg-blue-950/40 border-blue-500 text-blue-950 dark:text-blue-100 font-medium shadow-2xs"
                    : isSelected
                    ? "bg-[var(--surface-alt)] border-slate-700 text-[var(--ink)] font-medium"
                    : "bg-[var(--surface)] border-hairline text-[var(--muted)] hover:border-slate-400 hover:text-[var(--ink)]"
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-xs">{stage.title}</span>
                  <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded-xs font-semibold ${stage.badgeColor}`}>
                    {stage.badge}
                  </span>
                </div>
                <span className="text-[11px] opacity-75 block mt-0.5 truncate font-normal">
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
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            transition={{ duration: 0.18 }}
            className="p-2.5 sm:p-3 rounded-md bg-[var(--surface-alt)] border border-hairline text-xs font-sans text-[var(--ink)] leading-relaxed flex items-center gap-2"
          >
            <span className="font-semibold shrink-0 text-blue-600 dark:text-blue-400">
              {activeStageData.title}:
            </span>
            <span>{activeStageData.summary}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Two-Column Record Body: About & Photo Frame (Left) + Certifications & Quick Facts (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
        
        {/* Main Column: About in human voice + Real photo frame */}
        <div className="lg:col-span-8 rounded-lg bg-[var(--surface)] border border-hairline p-5 sm:p-6 space-y-4 transition-colors shadow-xs">
          <div className="flex items-center justify-between border-b border-hairline pb-3">
            <div>
              <h2 className="text-lg font-bold text-[var(--ink)] tracking-tight">
                About &amp; Current Focus
              </h2>
              <p className="text-xs text-[var(--muted)]">
                Salesforce Developer &bull; Abacus System &amp; Solution (ASSPL)
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
              <Rocket className="w-3.5 h-3.5" />
              <span>Building Biznusoft Alt</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            
            {/* Real photo frame with Pattachitra border */}
            <div className="md:col-span-4 flex justify-center">
              <div className="relative p-1.5 rounded-lg border-2 border-[var(--turmeric)] bg-[var(--surface-alt)] shadow-xs">
                <div className="w-34 h-42 rounded-md bg-[var(--surface)] border border-hairline flex flex-col items-center justify-center text-center p-3 overflow-hidden relative">
                  <img
                    src="/assets/rakesh.jpg"
                    alt="Rakesh Majhi"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="flex flex-col items-center justify-center space-y-1.5 z-0">
                    <div className="w-14 h-14 rounded-full border border-blue-200 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 flex items-center justify-center text-lg font-mono font-bold">
                      RM
                    </div>
                    <span className="text-[10px] font-mono text-[var(--muted)]">
                      [PHOTO_URL]
                    </span>
                    <span className="text-[11px] font-semibold text-[var(--ink)]">
                      Rakesh Majhi
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Plain Human Copy (4-5 sentences, exact resume truth) */}
            <div className="md:col-span-8 space-y-2.5 text-sm sm:text-[14.5px] leading-relaxed text-[var(--ink)] font-normal prose-measure">
              <p>
                I am a Salesforce Developer with 2 years of experience at Abacus System &amp; Solution (ASSPL) in Bhubaneswar, building custom Apex, Visualforce, Lightning Web Components (LWC), and Flow solutions across Sales Cloud, Service Cloud, Experience Cloud, and B2B Commerce.
              </p>
              <p>
                I have shipped 10+ integrations over REST/SOAP and OAuth (Stripe, PayPal, QuickBooks, CyberSource, GoHighLevel, Power BI), deployed 4 production Agentforce agents on Experience Cloud, and manage releases through GitHub CI/CD for 3 concurrent projects.
              </p>
              <p>
                Currently, alongside my work at ASSPL, I am actively building a modern cloud alternative to Biznusoft &mdash; targeting equipment rental workflows, real-time availability, and automated CPQ quoting.
              </p>
              <p>
                Prior to ASSPL, I interned at Briskode building responsive React and Next.js client products. I hold a B.Tech in Computer Science from Raajdhani Engineering College and am certified as a Salesforce Agentforce Specialist and AI Associate.
              </p>
            </div>

          </div>
        </div>

        {/* Right Sidebar: Certifications Card & Real Education */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Certifications Card */}
          <div className="rounded-lg bg-[var(--surface)] border border-hairline p-4 space-y-3 transition-colors shadow-xs">
            <div className="flex items-center justify-between pb-2.5 border-b border-hairline">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#0176D3]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
                  Salesforce Certifications
                </h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">Official</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-2.5 rounded-md bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/60 space-y-1">
                <div className="font-semibold text-purple-900 dark:text-purple-200 text-xs">
                  Salesforce Certified Agentforce Specialist
                </div>
                <p className="text-[11px] text-[var(--muted)]">
                  Agent Builder Topics &amp; Actions, Invocable Apex, Einstein Trust Layer.
                </p>
                <a
                  href="https://trailhead.salesforce.com/credentials/verification"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-[10px] text-purple-700 dark:text-purple-400 hover:underline font-mono"
                >
                  [CREDENTIAL_URL]
                </a>
              </div>

              <div className="p-2.5 rounded-md bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 space-y-1">
                <div className="font-semibold text-blue-900 dark:text-blue-200 text-xs">
                  Salesforce Certified AI Associate
                </div>
                <p className="text-[11px] text-[var(--muted)]">
                  Generative AI ethics, CRM prompt grounding, and model governance.
                </p>
                <a
                  href="https://trailhead.salesforce.com/credentials/verification"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-[10px] text-blue-700 dark:text-blue-400 hover:underline font-mono"
                >
                  [CREDENTIAL_URL]
                </a>
              </div>
            </div>
          </div>

          {/* Quick Facts Card with Real Education from Resume */}
          <div className="rounded-lg bg-[var(--surface)] border border-hairline p-4 space-y-2.5 transition-colors text-xs shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--ink)] pb-2 border-b border-hairline">
              Verified Background
            </h3>

            <div className="space-y-2">
              <div className="flex items-start gap-2.5">
                <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[var(--ink)] block">Raajdhani Engineering College</span>
                  <span className="text-[11px] text-[var(--muted)]">B.Tech in Computer Science &bull; 2019–2023</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[var(--ink)] block">Abacus Systems Training</span>
                  <span className="text-[11px] text-[var(--muted)]">Python Full Stack &amp; Data Science &bull; 2023–2024</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Briefcase className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[var(--ink)] block">Leadership &amp; Mentoring</span>
                  <span className="text-[11px] text-[var(--muted)]">3 Concurrent Projects &bull; Mentoring 4 Junior Devs</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[var(--ink)] block">Location &amp; Direct</span>
                  <span className="text-[11px] text-[var(--muted)]">Bhubaneswar, India &bull; +91 8342849764</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
