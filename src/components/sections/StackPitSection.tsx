"use client";

import React, { useEffect, useRef, useState } from "react";
import { STACK_DATA, SKILL_GROUPS, TechItem } from "@/data/stack";
import { usePortfolioStore } from "@/lib/store";
import { RefreshCw, ArrowDown, ArrowUp, CircleSlash, LayoutGrid, Sparkles, X, Layers } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Matter from "matter-js";

export function StackPitSection() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);

  const [selectedTech, setSelectedTech] = useState<TechItem | null>(null);
  const [gravityMode, setGravityMode] = useState<"down" | "zero" | "up">("down");
  const [isListView, setIsListView] = useState(false);
  const [mounted, setMounted] = useState(false);

  const triggerStackPitRain = usePortfolioStore((s) => s.triggerStackPitRain);
  const setTriggerStackPitRain = usePortfolioStore((s) => s.setTriggerStackPitRain);
  const setActiveAccentColor = usePortfolioStore((s) => s.setActiveAccentColor);

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsListView(true);
      return;
    }

    if (!sceneRef.current) return;

    const width = sceneRef.current.clientWidth || 900;
    const height = 550;

    const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint, Events, Body } = Matter;

    const engine = Engine.create();
    engine.gravity.y = 0.9;
    engineRef.current = engine;

    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: width,
        height: height,
        wireframes: false,
        background: "transparent",
        pixelRatio: window.devicePixelRatio || 1,
      },
    });
    renderRef.current = render;

    // Boundaries: floor, left, right
    const wallOptions = { isStatic: true, render: { visible: false } };
    const ground = Bodies.rectangle(width / 2, height + 30, width + 200, 60, wallOptions);
    const leftWall = Bodies.rectangle(-30, height / 2, 60, height * 2, wallOptions);
    const rightWall = Bodies.rectangle(width + 30, height / 2, 60, height * 2, wallOptions);
    const ceiling = Bodies.rectangle(width / 2, -100, width + 200, 60, wallOptions);

    Composite.add(engine.world, [ground, leftWall, rightWall, ceiling]);

    // Spawn stack bodies
    const tileBodies: Matter.Body[] = [];
    const itemsToSpawn = STACK_DATA.slice(0, 48);

    itemsToSpawn.forEach((tech, i) => {
      const x = Math.random() * (width - 160) + 80;
      const y = -Math.random() * 400 - 30;
      const group = SKILL_GROUPS[tech.group] || SKILL_GROUPS.salesforce;

      const body = Bodies.rectangle(x, y, 96, 42, {
        chamfer: { radius: 6 },
        restitution: 0.65,
        friction: 0.25,
        render: {
          fillStyle: group.color,
          strokeStyle: "#FFFFFF",
          lineWidth: 1.5,
        },
        label: tech.id,
      });

      // @ts-expect-error Custom meta attached to Matter body
      body.techData = tech;
      tileBodies.push(body);
    });

    Composite.add(engine.world, tileBodies);

    // Mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });

    Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    // Handle click on body
    Events.on(mouseConstraint, "mousedown", (event) => {
      const mousePos = event.mouse.position;
      const clicked = Matter.Query.point(tileBodies, mousePos);
      if (clicked.length > 0) {
        // @ts-expect-error Custom meta
        const tech = clicked[0].techData as TechItem;
        if (tech) {
          setSelectedTech(tech);
          setActiveAccentColor(tech.color);
        }
      }
    });

    // Custom text drawing over canvas
    Events.on(render, "afterRender", () => {
      const context = render.context;
      if (!context) return;
      context.font = "bold 11px monospace";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillStyle = "#FFFFFF";

      tileBodies.forEach((body) => {
        // @ts-expect-error Custom meta
        const tech = body.techData as TechItem;
        if (!tech) return;

        context.save();
        context.translate(body.position.x, body.position.y);
        context.rotate(body.angle);
        context.fillText(tech.monogram, 0, 0);
        context.restore();
      });
    });

    Render.run(render);
    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      Composite.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [mounted, isListView, setActiveAccentColor]);

  // Rain easter egg reaction
  useEffect(() => {
    if (triggerStackPitRain && engineRef.current) {
      const { Bodies, Composite } = Matter;
      const extraBodies: Matter.Body[] = [];
      const width = sceneRef.current?.clientWidth || 800;

      STACK_DATA.forEach((tech) => {
        const x = Math.random() * width;
        const y = -Math.random() * 600 - 50;
        const group = SKILL_GROUPS[tech.group];
        const body = Bodies.rectangle(x, y, 90, 40, {
          restitution: 0.75,
          render: { fillStyle: group.color },
        });
        // @ts-expect-error Custom meta
        body.techData = tech;
        extraBodies.push(body);
      });

      Composite.add(engineRef.current.world, extraBodies);
      setTriggerStackPitRain(false);
    }
  }, [triggerStackPitRain, setTriggerStackPitRain]);

  // Physics control helpers
  const handleShake = () => {
    if (!engineRef.current) return;
    const bodies = Matter.Composite.allBodies(engineRef.current.world);
    bodies.forEach((body) => {
      if (!body.isStatic) {
        Matter.Body.applyForce(body, body.position, {
          x: (Math.random() - 0.5) * 0.08,
          y: -Math.random() * 0.12,
        });
      }
    });
  };

  const handleGravityChange = (mode: "down" | "zero" | "up") => {
    setGravityMode(mode);
    if (!engineRef.current) return;
    if (mode === "down") engineRef.current.gravity.y = 0.9;
    else if (mode === "zero") engineRef.current.gravity.y = 0;
    else if (mode === "up") engineRef.current.gravity.y = -0.7;
  };

  return (
    <section id="stack-pit" className="py-24 lg:py-36 border-b border-hairline bg-[#0B0B0D] text-[#F3F1EC] transition-colors relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 space-y-8">
        
        {/* Header & Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#8E8E93]">
              <span>INTERACTIVE PHYSICS</span>
              <span>&bull;</span>
              <span>Matter.js Engine</span>
            </div>
            <h2 className="font-serif text-[clamp(2.75rem,6vw,5.5rem)] font-normal tracking-tight text-[#F3F1EC] leading-[0.95]">
              The Stack <span className="italic">Pit</span>
            </h2>
            <p className="text-sm font-sans text-[#8E8E93] max-w-2xl leading-relaxed">
              Every production technology in my arsenal as physical bodies. Grab, fling, and stack them. Click any block to view where I implemented it in enterprise tracks.
            </p>
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <button
              onClick={handleShake}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-white/20 text-[#F3F1EC] hover:bg-white/10 transition-colors"
              title="Apply lateral impulse"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Shake Pit</span>
            </button>

            <button
              onClick={() => handleGravityChange("down")}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full border border-white/20 transition-colors ${
                gravityMode === "down" ? "bg-[#0176D3] text-white border-transparent" : "text-[#8E8E93] hover:text-white"
              }`}
            >
              <ArrowDown className="w-3.5 h-3.5" />
              <span>Gravity Normal</span>
            </button>

            <button
              onClick={() => handleGravityChange("zero")}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full border border-white/20 transition-colors ${
                gravityMode === "zero" ? "bg-[#6B4EFF] text-white border-transparent" : "text-[#8E8E93] hover:text-white"
              }`}
            >
              <CircleSlash className="w-3.5 h-3.5" />
              <span>Zero-G</span>
            </button>

            <button
              onClick={() => handleGravityChange("up")}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full border border-white/20 transition-colors ${
                gravityMode === "up" ? "bg-[#FF5A5F] text-white border-transparent" : "text-[#8E8E93] hover:text-white"
              }`}
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Invert Gravity</span>
            </button>

            <button
              onClick={() => setIsListView(!isListView)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-white/20 text-[#8E8E93] hover:text-white transition-colors ml-auto lg:ml-2"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>{isListView ? "Physics Canvas" : "List Grid"}</span>
            </button>
          </div>
        </div>

        {/* Physics Canvas Stage or Fallback List View */}
        {isListView ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 pt-4">
            {STACK_DATA.map((tech) => {
              const group = SKILL_GROUPS[tech.group];
              return (
                <div
                  key={tech.id}
                  onClick={() => {
                    setSelectedTech(tech);
                    setActiveAccentColor(tech.color);
                  }}
                  className="p-3.5 rounded-sm bg-[#141417] border border-white/10 hover:border-white/30 cursor-pointer transition-colors space-y-1.5 group"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="font-bold px-1.5 py-0.5 rounded-xs" style={{ backgroundColor: group.color, color: "#FFF" }}>
                      {tech.monogram}
                    </span>
                    <span className="text-[#8E8E93]">{group.name}</span>
                  </div>
                  <div className="font-sans font-medium text-xs text-[#F3F1EC] group-hover:text-[#4C8DFF] transition-colors">
                    {tech.name}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div
            data-cursor="drag"
            className="w-full h-[550px] rounded-sm bg-[#141417] border border-white/10 relative overflow-hidden select-none cursor-grab active:cursor-grabbing"
          >
            <div ref={sceneRef} className="w-full h-full" />
            <div className="absolute top-4 left-4 pointer-events-none text-[11px] font-mono text-white/40">
              Drag &bull; Throw &bull; Click block for implementation context
            </div>
          </div>
        )}

        {/* Tech Inspector Card Drawer */}
        <AnimatePresence>
          {selectedTech && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="p-6 rounded-sm bg-[#141417] border border-white/15 space-y-4"
            >
              <div className="flex items-start justify-between pb-3 border-b border-white/10">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="px-2 py-0.5 rounded-xs text-[10px] font-mono font-bold uppercase text-white"
                      style={{ backgroundColor: selectedTech.color }}
                    >
                      {selectedTech.monogram}
                    </span>
                    <span className="text-xs font-mono uppercase tracking-wider text-[#8E8E93]">
                      {SKILL_GROUPS[selectedTech.group].name}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl text-white font-normal">{selectedTech.name}</h3>
                </div>
                <button
                  onClick={() => setSelectedTech(null)}
                  className="p-1.5 rounded-full border border-white/20 text-[#8E8E93] hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="text-sm font-sans text-white/90 leading-relaxed">
                <span className="text-xs font-mono uppercase tracking-wider text-[#8E8E93] block mb-1">
                  Production Deployment &bull; ASSPL / Tenure
                </span>
                {selectedTech.note}
              </div>

              <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#8E8E93]">
                <span>Linked Projects: {selectedTech.usedIn.join(", ")}</span>
                <a href="#projects" className="text-[#4C8DFF] hover:underline">
                  Jump to Project Index &rarr;
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
