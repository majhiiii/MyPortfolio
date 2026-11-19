"use client";

import React, { useState } from "react";
import { PattachitraBorder } from "@/components/ui/PattachitraBorder";
import { KonarkWheelCanvas } from "@/components/3d/KonarkWheelCanvas";
import { KonarkWheelSvg } from "@/components/3d/KonarkWheelSvg";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Download, Mail, Award, GraduationCap, MapPin, Briefcase, Sparkles, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SkillGroupId } from "@/data/stack";

interface PathStage {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  badge: string;
  isCurrent?: boolean;
}

const PATH_STAGES: PathStage[] = [
  {
    id: "learning",
    title: "Python Full Stack",
    subtitle: "Abacus Systems (Sep 2023 – Feb 2024)",
    badge: "Foundation",
    summary: "Intensive training in Python, FastAPI/Django, PostgreSQL, relational modeling, and REST architectural patterns.",
  },
  {
    id: "briskode",
    title: "Web Dev Intern",
    subtitle: "Briskode (Mar 2024 – Oct 2024)",
    badge: "React & Next.js",
    summary: "Built and shipped responsive client UI components and web pages using React.js and Next.js, integrating backend REST APIs.",
  },
  {
    id: "asspl",
    title: "Developer at ASSPL",
    subtitle: "Nov 2024 – Present",
    badge: "Salesforce & AI",
    summary: "Leading technical delivery across 3 concurrent production projects: B2B Commerce, Health Cloud, 4 production Agentforce agents, and 10+ integrations.",
    isCurrent: true,
  },
  {
    id: "next",
    title: "Next Role",
    subtitle: "Open to opportunities",
    badge: "Forward",
    summary: "Targeting high-impact Salesforce Developer & Administrator roles with Apex, LWC, enterprise integrations, and Agentforce automation scope.",
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
    <section id="overview" className="space-y-4 pt-1">
      
      {/* Highlights Panel (Raised Glass, with Pattachitra strip inside top edge) */}
      <GlassPanel tier="raised" radius="panel" className="p-0">
        {/* Pattachitra Creeper Strip directly inside the panel's top edge */}
        <PattachitraBorder />

        <div className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-center">
          
          {/* Record Identity & Compact Fields */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Record Identity Header */}
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full border border-[var(--glass-base-border)] bg-[var(--surface-tint-solid)] p-1 shrink-0 flex items-center justify-center shadow-xs">
                <KonarkWheelSvg size={38} />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[var(--muted)] font-medium">
                    Salesforce developer record
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  <span className="text-xs text-emerald-900 dark:text-emerald-200 font-semibold">
                    Available for roles
                  </span>
                </div>
                <div className="flex flex-wrap items-baseline gap-2.5">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink)]">
                    Rakesh Majhi
                  </h1>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[var(--indigo)] text-[#FFFBF2] shadow-2xs">
                    Salesforce Developer &amp; Administrator
                  </span>
                </div>
              </div>
            </div>

            {/* Compact 3-Field Row on Solid Readable Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 pt-3 border-t border-[var(--hairline)] text-xs">
              <div className="sm:col-span-3 p-2.5 rounded-[14px] bg-[var(--surface-tint-solid)] border border-[var(--hairline)] space-y-0.5 shadow-2xs">
                <span className="text-[11px] text-[var(--muted)] block">Location</span>
                <span className="font-semibold text-[var(--ink)] text-xs sm:text-sm block truncate">Bhubaneswar, India</span>
              </div>
              <div className="sm:col-span-6 p-2.5 rounded-[14px] bg-[var(--surface-tint-solid)] border border-[var(--hairline)] space-y-0.5 shadow-2xs">
                <span className="text-[11px] text-[var(--muted)] block">Focus</span>
                <span className="font-semibold text-[var(--ink)] text-xs sm:text-sm block truncate" title="Salesforce CRM · AI Integrations · AWS">
                  Salesforce CRM · AI Integrations · AWS
                </span>
              </div>
              <div className="sm:col-span-3 p-2.5 rounded-[14px] bg-[var(--surface-tint-solid)] border border-[var(--hairline)] space-y-0.5 shadow-2xs">
                <span className="text-[11px] text-[var(--muted)] block">Status</span>
                <span className="font-semibold text-[var(--ink)] text-xs sm:text-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[var(--turmeric)]" />
                  <span>Open to roles</span>
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <a
                href="/assets/Rakesh_Majhi_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--indigo)] text-white text-xs font-semibold hover:opacity-95 transition-opacity shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download resume</span>
              </a>

              <a
                href="mailto:rakeshmajhi.connect@gmail.com?subject=Salesforce%20Opportunity"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[var(--glass-base-border)] bg-[var(--surface-tint-solid)] text-[var(--ink)] text-xs font-medium hover:border-[var(--indigo)] hover:text-[var(--indigo)] transition-colors shadow-2xs"
              >
                <Mail className="w-3.5 h-3.5 text-[var(--indigo)]" />
                <span>Email me</span>
              </a>

              <a
                href="https://linkedin.com/in/rakeshmajhi57"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[var(--glass-base-border)] bg-[var(--surface-tint-solid)] text-[var(--muted)] text-xs font-mono hover:text-[var(--indigo)] transition-colors shadow-2xs"
              >
                <span>linkedin.com/in/rakeshmajhi57</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>

          {/* Right Column: Hero 3D Konark Sun Wheel Stage (Properly sized, centered, not cropped) */}
          <div className="lg:col-span-4 flex items-center justify-center">
            <div className="w-[230px] h-[230px] sm:w-[250px] sm:h-[250px] aspect-square flex items-center justify-center relative">
              <KonarkWheelCanvas onSelectGroup={handleSpokeClick} />
            </div>
          </div>

        </div>
      </GlassPanel>

      {/* Career Path Component (Base Glass, Chevron Stages) */}
      <GlassPanel tier="base" tintColor="#E8A317" radius="panel" className="p-3.5 sm:p-4 space-y-2.5">
        <div className="flex items-center justify-between text-xs text-[var(--muted)]">
          <span className="font-semibold text-[var(--ink)]">Career journey</span>
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
                className={`text-left p-3 rounded-[14px] border transition-all cursor-pointer relative ${
                  isCurrent
                    ? "bg-[var(--surface-tint-solid)] border-[var(--turmeric)] shadow-[0_0_16px_-2px_rgba(232,163,23,0.45)] text-[var(--ink)]"
                    : isSelected
                    ? "bg-[var(--surface-tint-solid)] border-[var(--indigo)] text-[var(--ink)]"
                    : "bg-[var(--surface-tint-solid)]/70 border-[var(--hairline)] text-[var(--muted)] hover:border-slate-400 hover:text-[var(--ink)]"
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-xs text-[var(--ink)]">{stage.title}</span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                      isCurrent
                        ? "bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-200 dark:border-amber-700"
                        : "bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700"
                    }`}
                  >
                    {stage.badge}
                  </span>
                </div>
                <span className="text-[11px] opacity-80 block mt-1 truncate font-normal">
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
            className="p-3 rounded-[14px] bg-[var(--surface-tint-solid)] border border-[var(--hairline)] text-xs text-[var(--ink)] leading-relaxed flex items-center gap-2 shadow-2xs"
          >
            <span className="font-semibold shrink-0 text-[var(--indigo)]">
              {activeStageData.title}:
            </span>
            <span>{activeStageData.summary}</span>
          </motion.div>
        </AnimatePresence>
      </GlassPanel>

      {/* Two-Column Record Body: About (Left) + Certifications & Quick Facts (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
        
        {/* Main Column: About in human voice + Real photo frame */}
        <div className="lg:col-span-8">
          <GlassPanel tier="base" radius="panel" className="p-5 sm:p-6 space-y-4">
            <div className="border-b border-[var(--hairline)] pb-3">
              <h2 className="text-lg font-bold text-[var(--ink)] tracking-tight">
                About &amp; background
              </h2>
              <p className="text-xs text-[var(--muted)]">
                Salesforce Developer &bull; Abacus System &amp; Solution (ASSPL), Bhubaneswar
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              
              {/* Photo frame with Pattachitra vermilion border */}
              <div className="md:col-span-4 flex justify-center">
                <div className="relative p-1.5 rounded-[18px] border-2 border-[var(--turmeric)] bg-[var(--surface-tint-solid)] shadow-xs">
                  <div className="w-34 h-40 rounded-[14px] bg-[var(--surface-tint-solid)] border border-[var(--hairline)] flex flex-col items-center justify-center text-center p-3 relative">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div className="w-16 h-16 rounded-full border-2 border-[var(--indigo)]/30 bg-[var(--indigo)]/10 text-[var(--indigo)] dark:text-blue-300 flex items-center justify-center text-xl font-mono font-bold shadow-2xs">
                        RM
                      </div>
                      <div>
                        <div className="text-[12px] font-bold text-[var(--ink)]">
                          Rakesh Majhi
                        </div>
                        <div className="text-[10px] font-mono text-[var(--muted)]">
                          ASSPL · Bhubaneswar
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Plain Human Copy sitting on near-solid readable surface */}
              <div className="md:col-span-8 surface-solid-reading p-4 border border-[var(--hairline)] space-y-2 text-sm leading-relaxed text-[var(--ink)] shadow-2xs">
                <p>
                  I am a Salesforce Developer with 2 years of experience at Abacus System &amp; Solution (ASSPL) in Bhubaneswar, building custom Apex, Visualforce, Lightning Web Components (LWC), and Flow solutions across Sales Cloud, Service Cloud, Experience Cloud, and B2B Commerce.
                </p>
                <p>
                  I have delivered 10+ integrations over REST/SOAP and OAuth (Stripe, PayPal, QuickBooks, CyberSource, GoHighLevel, Power BI), deployed 4 production Agentforce agents on Experience Cloud, and lead technical releases through GitHub CI/CD for 3 concurrent projects.
                </p>
                <p>
                  Prior to ASSPL, I interned at Briskode building responsive React and Next.js client products. I hold a B.Tech in Computer Science from Raajdhani Engineering College and am certified as a Salesforce Agentforce Specialist and AI Associate.
                </p>
              </div>

            </div>
          </GlassPanel>
        </div>

        {/* Right Sidebar: Certifications Card & Real Education */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Certifications Card */}
          <GlassPanel tier="base" radius="panel" className="p-4 space-y-3">
            <div className="flex items-center gap-2 pb-2.5 border-b border-[var(--hairline)]">
              <Award className="w-4 h-4 text-[var(--indigo)]" />
              <h3 className="text-xs font-bold text-[var(--ink)]">
                Salesforce certifications
              </h3>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-[14px] bg-[var(--surface-tint-solid)] border border-[var(--hairline)] space-y-1 shadow-2xs">
                <div className="font-semibold text-purple-900 dark:text-purple-200 text-xs">
                  Salesforce Certified Agentforce Specialist
                </div>
                <p className="text-[11px] text-[var(--muted)]">
                  Autonomous Agent Builder topics &amp; actions, Invocable Apex, and Einstein Trust Layer guardrails.
                </p>
              </div>

              <div className="p-3 rounded-[14px] bg-[var(--surface-tint-solid)] border border-[var(--hairline)] space-y-1 shadow-2xs">
                <div className="font-semibold text-blue-900 dark:text-blue-200 text-xs">
                  Salesforce Certified AI Associate
                </div>
                <p className="text-[11px] text-[var(--muted)]">
                  Generative AI fundamentals, CRM prompt grounding, model governance, and ethical AI deployment.
                </p>
              </div>
            </div>
          </GlassPanel>

          {/* Quick Facts Card with Real Education from Resume */}
          <GlassPanel tier="base" radius="panel" className="p-4 space-y-2.5 text-xs">
            <h3 className="text-xs font-bold text-[var(--ink)] pb-2 border-b border-[var(--hairline)]">
              Education &amp; background
            </h3>

            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5">
                <GraduationCap className="w-4 h-4 text-[var(--indigo)] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[var(--ink)] block">Raajdhani Engineering College</span>
                  <span className="text-[11px] text-[var(--muted)]">B.Tech in Computer Science · 2019–2023</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[var(--turmeric)] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[var(--ink)] block">Abacus Systems Training</span>
                  <span className="text-[11px] text-[var(--muted)]">Python Full Stack &amp; Data Science · 2023–2024</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Briefcase className="w-4 h-4 text-[var(--leaf)] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[var(--ink)] block">Leadership &amp; Mentoring</span>
                  <span className="text-[11px] text-[var(--muted)]">3 Concurrent Projects · Mentoring 4 Junior Devs</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[var(--vermilion)] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[var(--ink)] block">Location &amp; Direct</span>
                  <span className="text-[11px] text-[var(--muted)]">Bhubaneswar, India · +91 8342849764</span>
                </div>
              </div>
            </div>
          </GlassPanel>

        </div>

      </div>

    </section>
  );
}
