"use client";

import { useLenis } from "lenis/react";
import { useRef, useState } from "react";
import { PixelCat } from "@/components/effects/pixel-cat";

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const bioText = "Hey, I'm Pegasus — I don't just design interfaces, I make them come alive. I'm obsessed with clean UI, creative experiences, coding, and a little AI magic. I design interfaces from scratch, bring ideas to life in Figma, and turn those pretty pixels into real, living, breathing websites. Basically, I design it, code it, and make it work.";
  const words = bioText.split(" ");

  useLenis(() => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const scrollableDistance = container.offsetHeight - window.innerHeight;
    setProgress(Math.max(0, Math.min(1, -rect.top / scrollableDistance)));
  });

  return (
    <div ref={containerRef} style={{ height: "300vh" }}>
      <section id="me" className="sticky top-0 mx-auto max-w-[1440px] h-screen flex flex-col justify-end relative" style={{ paddingLeft: "65px", paddingRight: "49px", paddingBottom: "75px" }}>
        <PixelCat />
        <div>
          <p className="font-bold text-[14px] leading-[20px] tracking-[1.5px]" style={{ color: progress > 0 ? "#818181" : "#E0E0E0", transition: "color 0.3s ease" }}>ABOUT ME</p>
          <p className="mt-[36px] lg:mt-[48px] max-w-[1066px] font-bold text-[22px] sm:text-[27px] lg:text-[31px] leading-[1.3] lg:leading-[40px] tracking-[-0.01em]">
            {words.map((word, index) => { const spread = 0.12; const wordStart = (index / words.length) * (1 - spread); const t = Math.max(0, Math.min(1, (progress - wordStart) / spread)); const channel = Math.round(224 * (1 - t)); return <span key={index} style={{ color: `rgb(${channel}, ${channel}, ${channel})` }}>{word}{index < words.length - 1 ? " " : ""}</span>; })}
          </p>
        </div>
      </section>
    </div>
  );
}
