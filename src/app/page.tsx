import React from "react";
import { OverviewSection } from "@/components/record/OverviewSection";
import { WorkSection } from "@/components/record/WorkSection";
import { PlaygroundConsole } from "@/components/record/PlaygroundConsole";
import { SkillsMatrix } from "@/components/record/SkillsMatrix";
import { ContactActivitySection } from "@/components/record/ContactActivitySection";

export default function RecordPage() {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-20 py-6 sm:py-10">
      {/* SCREEN 1: Overview (The Record Header) */}
      <OverviewSection />

      {/* SCREEN 2: Work (Related List: Projects) */}
      <WorkSection />

      {/* SCREEN 3: Playground (Developer Console) */}
      <PlaygroundConsole />

      {/* SCREEN 4: Skills (Core Arsenal Matrix) */}
      <SkillsMatrix />

      {/* SCREEN 5: Contact (Activity / Log Area) */}
      <ContactActivitySection />
    </div>
  );
}
