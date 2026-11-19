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
              I am a Salesforce Developer specializing in custom Apex engineering, Lightning Web Components, B2B Commerce (CloudCraze), and enterprise API integrations. Over the past 2 years at Abacus System & Solution Pvt. Ltd. (ASSPL), I have worked on production client platforms spanning custom quoting configurators, logistics APIs, and automated billing reconciliations.
            </p>
            <p>
              I focus on clean code and reliable architecture: treating governor limits, unit test isolation (&gt;85% coverage gate), and field-level security (USER_MODE) as fundamental requirements. In addition to daily feature development, I review pull requests for junior developers and collaborate directly with US and international stakeholders in Agile sprints.
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
                      <span className="w-2 h-2 rounded-xs bg-[var(--ink)]"></span>
                      <span className="font-bold text-sm text-[var(--ink)]">{cert.title}</span>
                    </div>
                    <p className="text-[var(--muted)] text-xs font-sans max-w-xl">{cert.summary}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[11px] text-[var(--ink)] font-semibold block">{cert.status}</span>
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
