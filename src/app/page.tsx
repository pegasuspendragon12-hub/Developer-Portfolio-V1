"use client";

import { ReactLenis } from "lenis/react";
import { AboutSection, HeroSection, ServicesSection, SkillStackSection, WorksSection } from "@/components/sections";
import { Oneko } from "@/components/ui/oneko";
import { SmoothCursor } from "@/components/ui/smooth-cursor";

export default function Home() {
  return (
    <ReactLenis root options={{ lerp: 0.06, duration: 1.4, smoothWheel: true, wheelMultiplier: 0.85, touchMultiplier: 1 }}>
      <main className="w-full bg-white cursor-none">
        <SmoothCursor />
        <Oneko />
        <HeroSection />
        <AboutSection />
        <WorksSection />
        <ServicesSection />
        <SkillStackSection />
      </main>
    </ReactLenis>
  );
}
