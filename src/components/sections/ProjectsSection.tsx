"use client";

import { useState, useEffect } from "react";
import { PROJECTS_LIST, PERSONAL_DATA } from "@/lib/data";
import { ArrowUpRight, ShieldCheck, X, CheckCircle2 } from "lucide-react";
import { ProjectDiagram } from "@/components/diagrams/ProjectDiagrams";
import { motion, AnimatePresence, useSpring } from "framer-motion";

export default function ProjectsSection() {
  const [activeModalId, setActiveModalId] = useState<string | null>(null);
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  const selectedProject = PROJECTS_LIST.find((p) => p.id === activeModalId);
  const hoveredProject = PROJECTS_LIST.find((p) => p.id === hoveredProjectId);

  // Esc key closes modal
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

  // Cursor-following preview position
  const springX = useSpring(0, { stiffness: 220, damping: 22 });
  const springY = useSpring(0, { stiffness: 220, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent) => {
    springX.set(e.clientX + 24);
    springY.set(e.clientY - 80);
  };

  return (
    <section
      id="projects"
      onMouseMove={handleMouseMove}
      className="py-24 lg:py-36 border-b border-hairline bg-[var(--bg)] relative"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 space-y-16">
        
        {/* Section Header */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">
              05 / PRODUCTION INDEX
            </span>
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--muted)]">
              <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>{PERSONAL_DATA.privacyNotice}</span>
            </div>
          </div>
          <h2 className="font-serif text-[clamp(2.75rem,6vw,5.5rem)] font-normal tracking-tight text-[var(--ink)] leading-[0.95]">
            Engineered <span className="italic">Systems</span>
          </h2>
          <p className="text-base font-sans text-[var(--muted)] max-w-2xl">
            Selected enterprise deployments engineered during my tenure at ASSPL. Click any row to expand technical architectures, governor limit protections, and verification traces.
          </p>
        </div>

        {/* Index Table List with Huge Titles */}
        <div className="border-t border-hairline divide-y divide-hairline">
          {PROJECTS_LIST.map((project) => {
            const isHovered = hoveredProjectId === project.id;
            const isFaded = hoveredProjectId !== null && !isHovered;

            return (
              <div
                key={project.id}
                data-cursor="view"
                onMouseEnter={() => setHoveredProjectId(project.id)}
                onMouseLeave={() => setHoveredProjectId(null)}
                onClick={() => setActiveModalId(project.id)}
                className={`py-8 sm:py-10 grid grid-cols-12 gap-4 items-center group cursor-pointer transition-opacity duration-200 px-2 ${
                  isFaded ? "opacity-30" : "opacity-100"
                }`}
              >
                {/* Number */}
                <div className="col-span-2 sm:col-span-1 font-mono text-xs text-[var(--muted)]">
                  {project.number}
                </div>

                {/* Huge Title */}
                <div className="col-span-10 sm:col-span-7 space-y-2">
                  <h3 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[var(--ink)] tracking-tight group-hover:italic group-hover:translate-x-2 transition-all duration-300">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[var(--muted)]">
                    <span className="font-medium text-[var(--ink)]">{project.subtitle}</span>
                    <span>&bull;</span>
                    <span className="text-[var(--accent)]">{project.companyBadge}</span>
                  </div>
                </div>

                {/* Platform Tag */}
                <div className="hidden sm:block sm:col-span-3 text-right sm:text-left text-xs font-mono text-[var(--muted)]">
                  <div className="flex flex-wrap gap-1.5 justify-end sm:justify-start">
                    {project.tech.slice(0, 3).map((t, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-full border border-hairline bg-[var(--surface)] text-[var(--ink)] text-[10px]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <div className="hidden lg:flex lg:col-span-1 items-center justify-end text-xs font-mono text-[var(--muted)] group-hover:text-[var(--ink)]">
                  <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating Preview Card that follows cursor on Desktop */}
        <AnimatePresence>
          {hoveredProject && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.18 }}
              style={{ x: springX, y: springY }}
              className="fixed top-0 left-0 pointer-events-none z-50 hidden lg:block w-80 p-4 rounded-sm bg-[var(--surface)] border border-hairline shadow-2xl"
            >
              <div className="space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between text-[10px] text-[var(--muted)]">
                  <span className="text-[var(--accent)] font-semibold">{hoveredProject.companyBadge}</span>
                  <span>{hoveredProject.number}</span>
                </div>
                <div className="font-serif text-lg font-medium text-[var(--ink)] leading-snug">
                  {hoveredProject.title}
                </div>
                <p className="text-xs font-sans text-[var(--muted)] line-clamp-3">
                  {hoveredProject.description}
                </p>
                <div className="pt-2 border-t border-hairline flex items-center justify-between text-[10px] text-[var(--muted)]">
                  <span>Click to expand architecture</span>
                  <span className="text-[var(--ink)] font-bold">&rarr;</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Full-Screen Shared-Element Case Study Drawer */}
        <AnimatePresence>
          {selectedProject && (
            <div
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
              onClick={() => setActiveModalId(null)}
              role="dialog"
              aria-modal="true"
            >
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-4xl bg-[var(--surface)] border border-hairline rounded-sm p-6 sm:p-10 space-y-8 max-h-[92vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-start justify-between pb-6 border-b border-hairline">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--accent)] px-2.5 py-0.5 rounded-full border border-hairline bg-[var(--bg)] font-medium">
                        {selectedProject.companyBadge}
                      </span>
                      <span className="text-xs font-mono text-[var(--muted)]">
                        Production Architecture &bull; {selectedProject.number}
                      </span>
                    </div>
                    <h3 className="font-serif text-3xl sm:text-4xl font-normal text-[var(--ink)] leading-snug">
                      {selectedProject.title}
                    </h3>
                    <p className="text-sm font-sans text-[var(--muted)] max-w-2xl">
                      {selectedProject.subtitle}
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveModalId(null)}
                    className="p-2 border border-hairline rounded-full text-[var(--muted)] hover:text-[var(--ink)] hover:border-[var(--ink)] transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Architecture Technical SVG */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-[var(--muted)]">
                    <span className="uppercase tracking-widest">Architectural Blueprint</span>
                    <span>ASSPL Verified Flow</span>
                  </div>
                  <div className="border border-hairline rounded-sm p-4 bg-[var(--bg)] overflow-hidden">
                    <ProjectDiagram projectId={selectedProject.id} />
                  </div>
                </div>

                {/* Technical Description & Impact */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm font-sans pt-2">
                  <div className="space-y-2 p-5 rounded-sm bg-[var(--bg)] border border-hairline">
                    <span className="text-xs font-mono uppercase tracking-wider text-[var(--muted)] block">
                      Architectural Deliverable
                    </span>
                    <p className="text-[var(--ink)] leading-relaxed text-sm">
                      {selectedProject.description}
                    </p>
                  </div>

                  <div className="space-y-2 p-5 rounded-sm bg-[var(--bg)] border border-hairline">
                    <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent)] block">
                      Quantitative Metric / Result
                    </span>
                    <p className="text-[var(--ink)] leading-relaxed text-sm">
                      {selectedProject.metrics}
                    </p>
                  </div>
                </div>

                {/* Tech Badges & Footer */}
                <div className="pt-6 border-t border-hairline flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.tech.map((t, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-full border border-hairline text-[var(--ink)] bg-[var(--bg)] text-[11px]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="text-[var(--muted)] text-[11px]">
                    Private Client IP &bull; Built &amp; Maintained at ASSPL
                  </span>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
