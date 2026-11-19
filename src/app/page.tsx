import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import { StackPitSection } from "@/components/sections/StackPitSection";
import { ArchitectureBuilder } from "@/components/sections/ArchitectureBuilder";
import PlaygroundSection from "@/components/sections/PlaygroundSection";
import MetricsSection from "@/components/sections/MetricsSection";
import ContactSection from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <div className="w-full flex flex-col">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <StackPitSection />
      <ArchitectureBuilder />
      <PlaygroundSection />
      <MetricsSection />
      <ContactSection />
    </div>
  );
}
