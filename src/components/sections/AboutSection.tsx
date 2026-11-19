import { FACTS, CERTIFICATIONS } from "@/lib/data";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-28 border-b border-hairline">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-12 gap-8 lg:gap-12">
        
        {/* Sticky Left Label */}
        <div className="col-span-12 lg:col-span-3">
          <div className="lg:sticky lg:top-24 space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">02 / ABOUT</span>
            <h2 className="text-2xl font-bold tracking-tight text-[var(--ink)]">Background & Discipline</h2>
          </div>
        </div>

        {/* Right Content */}
        <div className="col-span-12 lg:col-span-9 space-y-12">
          
          {/* Paragraphs */}
          <div className="space-y-6 max-w-3xl text-base lg:text-lg text-[var(--muted)] leading-relaxed">
            <p>
              I am a Salesforce Developer and Administrator specializing in custom Apex engineering, Lightning Web Components, and autonomous Agentforce workflows. Over the past 2 years at Abacus System & Solution Pvt. Ltd. (ASSPL), I have focused on solving high-concurrency billing, multi-cloud synchronization, and enterprise release lifecycles.
            </p>
            <p>
              My approach blends rigorous engineering discipline with emerging AI automation: treating governor limits, unit test isolation (&gt;85% coverage), and field-level security as mandatory baseline standards. I mentor 4 junior engineers on daily pull requests, unblocking sprint deliverables across concurrent Health Cloud and B2B Commerce tracks.
            </p>
          </div>

          {/* Hairline Facts Table */}
          <div className="border-t border-hairline pt-6">
            <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--muted)] mb-4">Quick Facts</h3>
            <div className="divide-y divide-hairline border-y border-hairline">
              {FACTS.map((fact, idx) => (
                <div key={idx} className="py-3.5 grid grid-cols-12 gap-4 text-xs font-mono">
                  <span className="col-span-12 sm:col-span-4 text-[var(--muted)]">{fact.label}</span>
                  <span className="col-span-12 sm:col-span-8 text-[var(--ink)] font-medium">{fact.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications: Clean Plain Text Rows, Original Minimal Marks */}
          <div className="border-t border-hairline pt-6">
            <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--muted)] mb-4">Verified Credentials</h3>
            <div className="space-y-4">
              {CERTIFICATIONS.map((cert, idx) => (
                <div
                  key={idx}
                  className="p-5 border border-hairline rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-xs bg-[var(--accent)]"></span>
                      <span className="font-bold text-sm text-[var(--ink)]">{cert.title}</span>
                    </div>
                    <p className="text-[var(--muted)] text-xs font-sans max-w-xl">{cert.summary}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold block">{cert.status}</span>
                    <span className="text-[10px] text-[var(--muted)] block">{cert.issuer}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
