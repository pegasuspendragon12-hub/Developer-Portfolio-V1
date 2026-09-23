"use client";

import { motion } from "framer-motion";
import { useState } from "react";

function Tag({ label }: { label: string }) {
  return (
    <span style={{ display: "inline-flex", justifyContent: "center", alignItems: "center", padding: "3px 7px", border: "1px solid #E0E0E0", borderRadius: 4, fontFamily: "'Clash Grotesk', sans-serif", fontWeight: 700, fontSize: 10, lineHeight: "10px", letterSpacing: 0.5, color: "#818181", boxSizing: "border-box" }}>
      {label}
    </span>
  );
}

export function ProjectCard({ title, description, tags, bgColor }: { title: string; description: string; tags: string[]; bgColor: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMousePos({ x: event.clientX - rect.left, y: event.clientY - rect.top });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div onMouseMove={handleMouseMove} style={{ width: "100%", aspectRatio: "16 / 9", borderRadius: 24, overflow: "hidden", backgroundColor: bgColor, position: "relative" }}>
        <div style={{ width: "100%", height: "100%", backgroundColor: bgColor, borderRadius: 24, transform: isHovered ? "scale(1.06)" : "scale(1)", transition: "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)" }} />
        <motion.div initial={false} animate={{ x: mousePos.x, y: mousePos.y, scale: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }} transition={{ type: "spring", damping: 24, stiffness: 300, mass: 0.35 }} style={{ position: "absolute", top: 0, left: 0, width: 88, height: 88, marginLeft: -44, marginTop: -44, borderRadius: "50%", border: "2px solid rgba(255, 255, 255, 0.95)", pointerEvents: "none", zIndex: 10, boxShadow: "0 0 20px rgba(255, 255, 255, 0.15)" }} />
        <motion.div initial={false} animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.85 }} transition={{ type: "spring", damping: 22, stiffness: 280, mass: 0.4 }} style={{ position: "absolute", top: "50%", left: "50%", translateX: "-50%", translateY: "-50%", height: 38, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "0 6px 0 16px", backgroundColor: "rgba(0, 0, 0, 0.5)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.25)", borderRadius: 9999, pointerEvents: "none", zIndex: 15, boxShadow: "0 8px 24px rgba(0, 0, 0, 0.35)", boxSizing: "border-box" }}>
          <span style={{ fontFamily: "'Clash Grotesk', sans-serif", fontWeight: 600, fontSize: 12, lineHeight: 1, letterSpacing: 1.2, color: "#FFFFFF", textTransform: "uppercase", userSelect: "none", display: "inline-flex", alignItems: "center" }}>View Details</span>
          <div style={{ width: 26, height: 26, borderRadius: "50%", backgroundColor: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 6H9.5M9.5 6L6 2.5M9.5 6L6 9.5" stroke="#000000" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
        </motion.div>
      </div>
      <div style={{ marginTop: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h3 style={{ fontFamily: "'Clash Grotesk', sans-serif", fontWeight: 700, fontSize: 28, lineHeight: "26px", letterSpacing: -0.5, color: isHovered ? "#8B5CF6" : "#000000", transition: "color 0.3s cubic-bezier(0.25, 1, 0.5, 1)", margin: 0 }}>{title}</h3>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>{tags.map((tag) => <Tag key={tag} label={tag} />)}</div>
      </div>
      <p style={{ marginTop: 6, maxWidth: 380, fontFamily: "'Clash Grotesk', sans-serif", fontWeight: 500, fontSize: 13.5, lineHeight: "20px", letterSpacing: 0.5, color: "#818181" }}>{description}</p>
    </div>
  );
}
