"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";

const services = ["UI/UX DESIGN", "GRAPHIC DESIGN", "FIGMA TO CODE", "WEB DEVELOPMENT", "DEV OPS"];

export function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const updateProgress = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const distance = Math.max(1, container.offsetHeight - window.innerHeight);
    setProgress(Math.max(0, Math.min(1, -rect.top / distance)));
  }, []);

  useEffect(() => {
    updateProgress();
    window.addEventListener("resize", updateProgress);
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => {
      window.removeEventListener("resize", updateProgress);
      window.removeEventListener("scroll", updateProgress);
    };
  }, [updateProgress]);

  useLenis(updateProgress);

  return (
    <div ref={containerRef} style={{ height: "330vh" }}>
      <section id="services" className="sticky top-0 flex h-screen flex-col overflow-hidden" style={{ width: "100%", maxWidth: 1440, margin: "0 auto", padding: "40px 48px 48px", background: "rgb(255, 255, 255)", boxSizing: "border-box" }}>
        <h2 style={{ fontFamily: "'Clash Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(72px, 10vw, 154px)", lineHeight: "0.91em", letterSpacing: "-6px", textAlign: "left", color: "#000000", margin: 0 }}>SERVICES.</h2>
        <div style={{ width: "100%", height: 0, marginTop: 12, marginBottom: 54, border: "1px solid #000000" }} />
        <div className="flex flex-1 flex-col" style={{ gap: 34, paddingTop: 18 }}>
          {services.map((title, index) => {
            const isFirst = index === 0;
            const isLast = index === services.length - 1;
            const revealStart = isLast ? 0.76 : 0.16 + (index - 1) * 0.2;
            const revealEnd = isLast ? 0.94 : revealStart + 0.18;
            const itemProgress = isFirst ? 1 : Math.max(0, Math.min(1, (progress - revealStart) / (revealEnd - revealStart)));
            const clamped = Math.max(0, Math.min(1, itemProgress));
            return (
              <motion.h3 key={title} initial={false} animate={{ opacity: isFirst ? 1 : clamped, y: isFirst ? 0 : 80 * (1 - clamped), filter: isFirst ? "blur(0px)" : `blur(${(1 - clamped) * 12}px)` }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} style={{ fontFamily: "'Clash Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(32px, 4vw, 52px)", lineHeight: "1.18", letterSpacing: "-2px", color: "#000000", margin: 0, visibility: isFirst || itemProgress > 0.01 ? "visible" : "hidden", willChange: "opacity, transform, filter" }}>{title}</motion.h3>
            );
          })}
        </div>
      </section>
    </div>
  );
}
