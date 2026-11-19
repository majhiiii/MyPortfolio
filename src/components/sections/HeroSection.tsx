import { PERSONAL_DATA } from "@/lib/data";
import { ArrowDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col justify-between border-b border-hairline py-16 lg:py-24">
      
      {/* 12-Column Grid Container */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full grid grid-cols-12 gap-6 lg:gap-8 items-center">
        
        {/* Left Column (Editorial Typography) */}
        <div className="col-span-12 lg:col-span-7 space-y-8 z-10">
          
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">01 / HERO</span>
            <h1 className="text-[clamp(2.75rem,7vw,6.5rem)] font-bold tracking-tight leading-[1.02] text-[var(--ink)]">
              Rakesh Majhi
            </h1>
          </div>

          <div className="space-y-4 max-w-2xl">
            <p className="text-lg lg:text-xl font-normal text-[var(--muted)] leading-relaxed">
              Salesforce Developer focused on custom Apex, Lightning Web Components, and enterprise integrations. Experienced in B2B Commerce, custom CPQ configurators, and <span className="text-[var(--ink)] font-semibold underline underline-offset-4">Agentforce</span> automation at ASSPL.
            </p>
            <p className="text-sm font-mono text-[var(--muted)] leading-relaxed">
              2 years production experience · B2B Commerce & CloudCraze · REST/SOAP APIs · GitHub CI/CD releases.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-6 text-xs font-mono">
            <a
              href="#experience"
              className="px-4 py-2 bg-[var(--ink)] text-[var(--surface)] font-medium rounded-sm hover:opacity-90 transition-opacity"
            >
              Experience Console (04)
            </a>
            <a
              href="#projects"
              className="px-4 py-2 border border-hairline text-[var(--ink)] hover:border-[var(--ink)] transition-colors rounded-sm"
            >
              Production Index (05)
            </a>
            <a
              href="#playground"
              className="px-4 py-2 border border-hairline text-[var(--ink)] hover:border-[var(--ink)] transition-colors rounded-sm"
            >
              Developer Tools (06)
            </a>
            <a
              href="mailto:rakeshmajhi.connect@gmail.com"
              className="text-[var(--muted)] hover:text-[var(--ink)] transition-colors underline underline-offset-4"
            >
              Contact Direct
            </a>
          </div>

        </div>

        {/* Right Column: 3D Object Staging Area */}
        <div className="col-span-12 lg:col-span-5 min-h-[300px] lg:min-h-[460px] relative pointer-events-none flex items-center justify-center">
          <div className="w-full h-full border border-hairline/40 rounded-sm p-4 relative flex flex-col justify-between text-[11px] font-mono text-[var(--muted)]/70">
            {/* Architectural corner crosshairs */}
            <span className="absolute -top-1.5 -left-1.5 text-hairline leading-none">+</span>
            <span className="absolute -top-1.5 -right-1.5 text-hairline leading-none">+</span>
            <span className="absolute -bottom-1.5 -left-1.5 text-hairline leading-none">+</span>
            <span className="absolute -bottom-1.5 -right-1.5 text-hairline leading-none">+</span>

            <div className="flex items-center justify-between text-[10px] tracking-wider uppercase">
              <span>SYSTEM // 3D MODEL</span>
              <span className="flex items-center gap-1.5 text-[var(--ink)] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--ink)]"></span>
                ACTIVE · DRAGGABLE
              </span>
            </div>

            <div className="flex items-end justify-between text-[10px] tracking-wider">
              <span>SCROLL-LINKED MORPH</span>
              <span>12 PROCEDURAL NODES</span>
            </div>
          </div>
        </div>

      </div>

      {/* Hero Bottom Bar */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full pt-12">
        <div className="border-t border-hairline pt-4 grid grid-cols-12 gap-4 text-xs font-mono text-[var(--muted)]">
          <div className="col-span-12 sm:col-span-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--ink)]" aria-hidden="true"></span>
            <span className="text-[var(--ink)] font-medium">Available</span>
            <span>— {PERSONAL_DATA.status}</span>
          </div>
          <div className="col-span-12 sm:col-span-4 text-left sm:text-center">
            {PERSONAL_DATA.location}
          </div>
          <div className="col-span-12 sm:col-span-4 text-left sm:text-right flex items-center justify-start sm:justify-end gap-1.5">
            <span>Scroll down</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </div>
        </div>
      </div>

    </section>
  );
}
