"use client";

import React, { useEffect } from "react";
import { X, Download, Printer, ExternalLink, Award, CheckCircle, Mail, Phone, MapPin, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const resumeUrl = `${basePath}/assets/Rakesh_Majhi_Resume.pdf`;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-black/70 backdrop-blur-sm">
        
        {/* Backdrop click area */}
        <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative w-full max-w-4xl bg-white text-slate-900 rounded-[20px] shadow-2xl border border-slate-200 overflow-hidden z-10 flex flex-col max-h-[92vh]"
        >
          {/* Action Bar Header */}
          <div className="bg-[#1F2A5C] text-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm sm:text-base tracking-tight">Rakesh Majhi · Executive Resume</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-medium transition-colors cursor-pointer"
                title="Print or Save as PDF via Browser"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Print / Save</span>
              </button>

              <a
                href={resumeUrl}
                download="Rakesh_Majhi_Resume.pdf"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E8A317] hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </a>

              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-white/15 text-white/80 hover:text-white transition-colors cursor-pointer ml-1"
                aria-label="Close resume preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Resume Document Body */}
          <div id="printable-resume" className="p-6 sm:p-10 overflow-y-auto space-y-6 text-xs sm:text-[13px] leading-relaxed font-sans bg-white selection:bg-amber-100 selection:text-amber-900">
            
            {/* Header with Photo */}
            <div className="border-b-2 border-[#1F2A5C] pb-4 flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="shrink-0">
                <img
                  src={`${basePath}/assets/rakesh_photo.jpg`}
                  alt="Rakesh Majhi"
                  className="w-20 h-24 sm:w-24 sm:h-28 object-cover object-top rounded-lg border-2 border-[#1F2A5C] shadow-sm"
                />
              </div>

              <div className="flex-1 text-center sm:text-left space-y-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F2A5C] tracking-tight">
                  RAKESH MAJHI
                </h1>
                <p className="text-sm font-semibold text-[#8A4B2A]">
                  Salesforce Developer &amp; Administrator · Apex, LWC &amp; Flow · Integrations · Agentforce &amp; AI Automation
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-xs text-slate-600 pt-1 font-mono">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#1F2A5C]" /> Bhubaneswar, India
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-[#1F2A5C]" /> +91 8342849764
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3 text-[#1F2A5C]" />
                    <a href="mailto:rakeshmajhi.connect@gmail.com" className="text-[#1F2A5C] hover:underline">
                      rakeshmajhi.connect@gmail.com
                    </a>
                  </span>
                  <a href="https://linkedin.com/in/rakeshmajhi57" target="_blank" rel="noopener noreferrer" className="text-[#1F2A5C] hover:underline">
                    linkedin.com/in/rakeshmajhi57
                  </a>
                  <a href="https://github.com/majhiiii" target="_blank" rel="noopener noreferrer" className="text-[#1F2A5C] hover:underline">
                    github.com/majhiiii
                  </a>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-1.5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#1F2A5C] border-b border-slate-200 pb-1">
                Professional Summary
              </h2>
              <p className="text-slate-700 leading-normal text-justify">
                Salesforce Developer with 2 years of experience delivering Apex, Visualforce, Lightning Web Components (LWC), and Flow solutions across Sales Cloud, Service Cloud, Experience Cloud, and B2B Commerce. Delivered 10+ enterprise integrations over REST/SOAP and OAuth (Stripe, PayPal, QuickBooks, CyberSource, GoHighLevel, Power BI), deployed 4 production Agentforce agents on Experience Cloud, and manages automated release pipelines via GitHub CI/CD across 3 concurrent projects. Solid expertise in Salesforce administration, security architecture, and Agile teamwork with US stakeholders.
              </p>
            </div>

            {/* Core Skills */}
            <div className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#1F2A5C] border-b border-slate-200 pb-1">
                Core Technical Skills
              </h2>
              <div className="space-y-1 text-slate-700">
                <p>
                  <strong className="text-[#1F2A5C]">Salesforce Development:</strong> Apex (Classes, Triggers, Batch, Queueable, Unit Testing &gt;85%), LWC, Aura Components, Visualforce, SOQL, SOSL, Platform Events, Connected Apps, SFDX CLI.
                </p>
                <p>
                  <strong className="text-[#1F2A5C]">Platforms:</strong> Sales Cloud, Service Cloud, Experience Cloud (Partner/Customer Communities), B2B Commerce (CloudCraze/VFP &amp; Lightning), Health Cloud, Data Cloud.
                </p>
                <p>
                  <strong className="text-[#1F2A5C]">Admin &amp; Automation:</strong> Flow Builder (Record-triggered, Screen, Autolaunched), Validation Rules, Approval Processes, Security Model (Profiles, Permission Sets, Sharing Rules, Roles), Reports &amp; Dashboards, MFA/SSO coordination.
                </p>
                <p>
                  <strong className="text-[#1F2A5C]">Integrations &amp; Middleware:</strong> REST/SOAP APIs, OAuth 2.0 PKCE, Signed Webhooks, FastAPI (Python), Office.js (Outlook Add-ins), Google Tag Manager.
                </p>
                <p>
                  <strong className="text-[#1F2A5C]">AI &amp; Automation:</strong> Agentforce (Agent Builder, Topics, Guardrails, Invocable Apex), Einstein Bots, PDF Extraction Pipelines, ChatGPT API.
                </p>
                <p>
                  <strong className="text-[#1F2A5C]">Full-Stack &amp; Cloud:</strong> Python, JavaScript (ES6+), React.js, Next.js, HTML5/CSS3, AWS (Amplify, EC2, Lambda, RDS, S3, CloudFront), PostgreSQL, MySQL.
                </p>
                <p>
                  <strong className="text-[#1F2A5C]">Delivery &amp; Tools:</strong> Git, GitHub Actions CI/CD, VS Code, Postman, Workbench, Zeplin, Agile/Scrum.
                </p>
              </div>
            </div>

            {/* Professional Experience */}
            <div className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#1F2A5C] border-b border-slate-200 pb-1">
                Professional Experience
              </h2>

              {/* Role 1 */}
              <div className="space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <span className="font-bold text-slate-900">
                    Software Developer – Salesforce &amp; AI Integrations
                  </span>
                  <span className="text-xs font-mono font-semibold text-slate-500">
                    Nov 2024 – Present
                  </span>
                </div>
                <div className="text-xs font-semibold text-[#8A4B2A]">
                  Abacus System &amp; Solution Pvt. Ltd. (ASSPL) · Bhubaneswar, India
                </div>
                <ul className="list-disc list-outside pl-4 space-y-1 text-slate-700">
                  <li>Technical developer on 3 concurrent client projects spanning B2B Commerce (CloudCraze), Experience Cloud, and custom multi-tenant CRM integrations for US-based stakeholders.</li>
                  <li>Engineered 15+ custom Lightning Web Components (LWC) pixel-matched from Zeplin designs, modernizing legacy Visualforce pages into responsive Lightning experiences.</li>
                  <li>Overrode CloudCraze core pricing hooks (ccServiceCart, cc_hk_Order) with single-pass Apex logic to support tiered volume pricing and order splitting within governor limits.</li>
                  <li>Configured and deployed 4 production Agentforce agents on Experience Cloud (Guided Shopping, Employee, Debug Log Analysis, Customer Care) with custom @InvocableMethod Apex actions and Einstein Trust Layer guardrails.</li>
                  <li>Engineered automated PDF document extraction pipeline parsing unstructured invoices directly into Salesforce Lead and Case records.</li>
                  <li>Delivered 10+ bidirectional integrations via REST/SOAP with Stripe, PayPal, QuickBooks Online, CyberSource, GoHighLevel, and Power BI dashboards, eliminating ~5 hours/week of manual sync.</li>
                  <li>Built an in-house Office.js Outlook add-in using OAuth 2.0 PKCE and dynamic describeSObjects REST queries with 1-click email logging to Tasks and EmailMessages.</li>
                  <li>Managed Salesforce administration: org security, permission set groups, sharing rules, validation rules, screen flows, and quarterly security audits.</li>
                  <li>Configured GitHub Actions CI/CD pipeline automating metadata validation, unit test execution, and scratch/sandbox deployment. Mentored 4 junior developers.</li>
                </ul>
              </div>

              {/* Role 2 */}
              <div className="space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <span className="font-bold text-slate-900">
                    Web Development Intern
                  </span>
                  <span className="text-xs font-mono font-semibold text-slate-500">
                    Mar 2024 – Oct 2024
                  </span>
                </div>
                <div className="text-xs font-semibold text-[#8A4B2A]">
                  Briskode Technology · Bhubaneswar, India
                </div>
                <ul className="list-disc list-outside pl-4 space-y-1 text-slate-700">
                  <li>Built responsive client-facing web application components using React.js, Next.js, and modern CSS frameworks.</li>
                  <li>Connected frontend state to backend REST APIs, handled asynchronous error states, and implemented token authentication flows.</li>
                  <li>Participated in daily Agile standups, code reviews, and Git version control across a 5-member development team.</li>
                </ul>
              </div>

              {/* Role 3 */}
              <div className="space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <span className="font-bold text-slate-900">
                    Software Developer Trainee (Python Full Stack)
                  </span>
                  <span className="text-xs font-mono font-semibold text-slate-500">
                    Sep 2023 – Feb 2024
                  </span>
                </div>
                <div className="text-xs font-semibold text-[#8A4B2A]">
                  Abacus System &amp; Solution Pvt. Ltd. · Bhubaneswar, India
                </div>
                <ul className="list-disc list-outside pl-4 space-y-1 text-slate-700">
                  <li>Completed intensive 6-month full-stack engineering program covering Python, FastAPI/Django, PostgreSQL schema design, and REST APIs.</li>
                  <li>Developed solid fundamentals in relational data modeling, query optimization, and test-driven development applied directly in production client solutions.</li>
                </ul>
              </div>

            </div>

            {/* Education & Certifications */}
            <div className="space-y-3 pt-1">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#1F2A5C] border-b border-slate-200 pb-1">
                Education &amp; Certifications
              </h2>
              
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                <div>
                  <span className="font-bold text-slate-900">
                    Bachelor of Technology (B.Tech) in Computer Science &amp; Engineering
                  </span>
                  <p className="text-slate-500 text-xs">Raajdhani Engineering College (BPUT), Bhubaneswar</p>
                </div>
                <span className="text-xs font-mono font-semibold text-slate-500">2019 – 2023</span>
              </div>

              <div className="pt-1">
                <span className="font-bold text-[#1F2A5C] block mb-1.5">Salesforce Certifications:</span>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 border border-blue-200 text-blue-900 font-semibold">
                    <Award className="w-3.5 h-3.5 text-[#1F2A5C]" /> Salesforce Certified Agentforce Specialist
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-purple-50 border border-purple-200 text-purple-900 font-semibold">
                    <Award className="w-3.5 h-3.5 text-purple-700" /> Salesforce Certified AI Associate
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Modal Footer */}
          <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex items-center justify-between text-xs text-slate-500 shrink-0">
            <span>Rakesh Majhi · Verified Production Experience</span>
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="px-3 py-1 rounded border border-slate-300 hover:bg-slate-100 text-slate-700 font-medium transition-colors cursor-pointer"
              >
                Close
              </button>
              <a
                href={resumeUrl}
                download="Rakesh_Majhi_Resume.pdf"
                className="px-3 py-1 rounded bg-[#1F2A5C] hover:bg-[#151D42] text-white font-semibold transition-colors flex items-center gap-1"
              >
                <Download className="w-3 h-3" />
                <span>Save PDF</span>
              </a>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
