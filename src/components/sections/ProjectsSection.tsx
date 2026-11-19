"use client";

import { useState, useEffect } from "react";
import { PROJECTS_LIST, PERSONAL_DATA } from "@/lib/data";
import { ArrowUpRight, ShieldCheck, X } from "lucide-react";
import { ProjectDiagram } from "@/components/diagrams/ProjectDiagrams";

export default function ProjectsSection() {
  const [activeModalId, setActiveModalId] = useState<string | null>(null);

  const selectedProject = PROJECTS_LIST.find((p) => p.id === activeModalId);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModalId(null);
      }
    };
    if (activeModalId) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalId]);

  return (
    <section id="projects" className="py-20 lg:py-28 border-b border-hairline">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 space-y-12">
        
        {/* Section Title */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">05 / PRODUCTION INDEX</span>
            <span className="text-xs font-mono text-[var(--muted)] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[var(--ink)]" />
              <span>{PERSONAL_DATA.privacyNotice}</span>
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-[var(--ink)]">Production Systems Index</h2>
          <p className="text-sm font-mono text-[var(--muted)] max-w-2xl">
            Index list of enterprise systems engineered at ASSPL. Click any row to inspect technical specifications and architecture diagrams.
          </p>
        </div>

        {/* Index Table List */}
        <div className="border-t border-hairline divide-y divide-hairline">
          {PROJECTS_LIST.map((project) => (
            <div
              key={project.id}
              onClick={() => setActiveModalId(project.id)}
              className="py-5 lg:py-6 grid grid-cols-12 gap-4 items-center group cursor-pointer hover:bg-[var(--surface)] transition-colors px-2 rounded-xs"
            >
              <div className="col-span-2 sm:col-span-1 font-mono text-xs text-[var(--muted)] font-semibold">
                {project.number}
              </div>

              <div className="col-span-10 sm:col-span-5 space-y-0.5">
                <h3 className="text-base sm:text-lg font-bold text-[var(--ink)] group-hover:underline transition-all">
                  {project.title}
                </h3>
                <span className="text-xs font-mono text-[var(--muted)] block">{project.subtitle}</span>
              </div>

              <div className="hidden sm:block sm:col-span-4 text-xs font-mono text-[var(--muted)]">
                {project.privacyBadge}
              </div>

              <div className="hidden lg:flex lg:col-span-2 items-center justify-end text-xs font-mono text-[var(--muted)] group-hover:text-[var(--ink)] gap-1">
                <span>Case Study</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Case Study Modal Drawer */}
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setActiveModalId(null)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="w-full max-w-3xl bg-[var(--surface)] border border-hairline rounded-sm p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto font-mono text-xs"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between pb-4 border-b border-hairline">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase text-[var(--muted)] font-bold">{selectedProject.privacyBadge}</span>
                  <h3 className="text-xl font-bold font-sans text-[var(--ink)]">{selectedProject.title}</h3>
                  <p className="text-[var(--muted)]">{selectedProject.subtitle}</p>
                </div>
                <button
                  onClick={() => setActiveModalId(null)}
                  className="p-1 border border-hairline rounded-sm text-[var(--muted)] hover:text-[var(--ink)]"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4 font-sans text-sm text-[var(--muted)] leading-relaxed">
                <div>
                  <h4 className="font-mono text-xs uppercase font-bold text-[var(--ink)] mb-1">Architectural Overview</h4>
                  <p>{selectedProject.description}</p>
                </div>

                <div className="p-4 bg-[var(--bg)] border border-hairline rounded-sm font-mono text-xs space-y-1 text-[var(--ink)]">
                  <div className="text-[10px] uppercase text-[var(--muted)]">Core Impact Metric:</div>
                  <div className="font-bold text-[var(--ink)]">{selectedProject.metrics}</div>
                </div>

                <div>
                  <h4 className="font-mono text-xs uppercase font-bold text-[var(--ink)] mb-2">Architecture Diagram</h4>
                  <ProjectDiagram projectId={selectedProject.id} />
                </div>

                <div>
                  <h4 className="font-mono text-xs uppercase font-bold text-[var(--ink)] mb-2">Technology Stack</h4>
                  <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                    {selectedProject.tech.map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 border border-hairline rounded-xs text-[var(--ink)]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 text-[11px] font-mono text-[var(--muted)] border-t border-hairline">
                  Notice: All production repositories and endpoints were built under ASSPL agreements and remain strictly confidential.
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
