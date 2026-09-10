"use client";

import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { ReactLenis, useLenis } from "lenis/react";
import { Oneko } from "@/components/ui/oneko";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*";

function ScrambleLink({ text, href }: { text: string; href: string }) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startScramble = useCallback(() => {
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return text[index];
            }
            return SCRAMBLE_CHARS[
              Math.floor(Math.random() * SCRAMBLE_CHARS.length)
            ];
          })
          .join("")
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
      }

      iteration += 1 / 2;
    }, 28);
  }, [text]);

  const handleMouseEnter = () => {
    startScramble();
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <a
      href={href}
      onMouseEnter={handleMouseEnter}
      className="font-bold text-[24px] leading-[24px] tracking-[-0.5px] text-[#F6F6F6] text-right transition-colors duration-150 hover:text-white inline-block select-none"
    >
      {displayText}
    </a>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '3px 7px',
        border: '1px solid #E0E0E0',
        borderRadius: 4,
        fontFamily: "'Clash Grotesk', sans-serif",
        fontWeight: 700,
        fontSize: 10,
        lineHeight: '10px',
        letterSpacing: 0.5,
        color: '#818181',
        boxSizing: 'border-box',
      }}
    >
      {label}
    </span>
  );
}

function ProjectCard({
  title,
  description,
  tags,
  bgColor,
}: {
  title: string;
  description: string;
  tags: string[];
  bgColor: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card image with zoom in effect and smooth white circle cursor */}
      <div
        onMouseMove={handleMouseMove}
        style={{
          width: '100%',
          aspectRatio: '16 / 9',
          borderRadius: 24,
          overflow: 'hidden',
          backgroundColor: bgColor,
          position: 'relative',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: bgColor,
            borderRadius: 24,
            transform: isHovered ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
          }}
        />

        {/* Big border-only white circle following cursor */}
        <motion.div
          initial={false}
          animate={{
            x: mousePos.x,
            y: mousePos.y,
            scale: isHovered ? 1 : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{
            type: "spring",
            damping: 24,
            stiffness: 300,
            mass: 0.35,
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 88,
            height: 88,
            marginLeft: -44,
            marginTop: -44,
            borderRadius: "50%",
            border: "2px solid rgba(255, 255, 255, 0.95)",
            pointerEvents: "none",
            zIndex: 10,
            boxShadow: "0 0 20px rgba(255, 255, 255, 0.15)",
          }}
        />

        {/* Centered "View Details" badge with perfect vertical & horizontal alignment */}
        <motion.div
          initial={false}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.85,
          }}
          transition={{
            type: "spring",
            damping: 22,
            stiffness: 280,
            mass: 0.4,
          }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            translateX: "-50%",
            translateY: "-50%",
            height: 38,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            padding: "0 6px 0 16px",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.25)",
            borderRadius: 9999,
            pointerEvents: "none",
            zIndex: 15,
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.35)",
            boxSizing: "border-box",
          }}
        >
          <span
            style={{
              fontFamily: "'Clash Grotesk', sans-serif",
              fontWeight: 600,
              fontSize: 12,
              lineHeight: 1,
              letterSpacing: 1.2,
              color: "#FFFFFF",
              textTransform: "uppercase",
              userSelect: "none",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            View Details
          </span>
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: "50%",
              backgroundColor: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.5 6H9.5M9.5 6L6 2.5M9.5 6L6 9.5"
                stroke="#000000"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Title row — tighter spacing to image and turns purple when hovered */}
      <div
        style={{
          marginTop: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h3
          style={{
            fontFamily: "'Clash Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 28,
            lineHeight: '26px',
            letterSpacing: -0.5,
            color: isHovered ? '#8B5CF6' : '#000000',
            transition: 'color 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
            margin: 0,
          }}
        >
          {title}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
      </div>

      {/* Description — smaller font and tighter spacing to title */}
      <p
        style={{
          marginTop: 6,
          maxWidth: 380,
          fontFamily: "'Clash Grotesk', sans-serif",
          fontWeight: 500,
          fontSize: 13.5,
          lineHeight: '20px',
          letterSpacing: 0.5,
          color: '#818181',
        }}
      >
        {description}
      </p>
    </div>
  );
}

function PixelCat() {
  return (
    <div className="absolute top-[60px] right-[65px] select-none pointer-events-none z-10">
      <Image
        src="/images/cat-hoppip-transparent.gif"
        alt="Cat pixel art"
        width={180}
        height={180}
        unoptimized
        className="w-[180px] h-[180px] object-contain"
      />
    </div>
  );
}

function ScrollServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const services = [
    { title: "UI/UX DESIGN" },
    { title: "GRAPHIC DESIGN" },
    { title: "FIGMA TO CODE" },
    { title: "WEB DEVELOPMENT" },
    { title: "DEV OPS" },
  ];

  const updateProgress = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const scrollableDistance = Math.max(1, container.offsetHeight - window.innerHeight);
    const nextProgress = Math.max(
      0,
      Math.min(1, -rect.top / scrollableDistance)
    );

    setProgress(nextProgress);
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
      <section
        id="services"
        className="sticky top-0 flex h-screen flex-col overflow-hidden"
        style={{
          width: '100%',
          maxWidth: 1440,
          margin: '0 auto',
          paddingTop: 40,
          paddingBottom: 48,
          paddingLeft: 48,
          paddingRight: 48,
          background: 'rgb(255, 255, 255)',
          boxSizing: 'border-box',
        }}
      >
        <h2
          style={{
            fontFamily: "'Clash Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(72px, 10vw, 154px)',
            lineHeight: '0.91em',
            letterSpacing: '-6px',
            textAlign: 'left',
            color: '#000000',
            margin: 0,
          }}
        >
          SERVICES.
        </h2>

        <div
          style={{
            width: '100%',
            height: 0,
            marginTop: 12,
            marginBottom: 54,
            border: '1px solid #000000',
          }}
        />

        <div
          className="flex flex-1 flex-col"
          style={{ gap: 34, paddingTop: 18 }}
        >
          {services.map((service, index) => {
            const isFirst = index === 0;
            const isLast = index === services.length - 1;
            const revealStart = isLast ? 0.76 : 0.16 + (index - 1) * 0.2;
            const revealEnd = isLast ? 0.94 : revealStart + 0.18;
            const itemProgress = isFirst
              ? 1
              : Math.max(0, Math.min(1, (progress - revealStart) / (revealEnd - revealStart)));

            return (
              <motion.h3
                key={index}
                initial={false}
                animate={{
                  opacity: isFirst ? 1 : Math.max(0, Math.min(1, itemProgress)),
                  y: isFirst ? 0 : 80 * (1 - Math.max(0, Math.min(1, itemProgress))),
                  filter: isFirst ? 'blur(0px)' : `blur(${(1 - Math.max(0, Math.min(1, itemProgress))) * 12}px)`,
                }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  fontFamily: "'Clash Grotesk', sans-serif",
                  fontStyle: 'normal',
                  fontWeight: 700,
                  fontSize: 'clamp(32px, 4vw, 52px)',
                  lineHeight: '1.18',
                  textAlign: 'left',
                  letterSpacing: '-2px',
                  color: '#000000',
                  margin: 0,
                  visibility: isFirst || itemProgress > 0.01 ? "visible" : "hidden",
                  willChange: "opacity, transform, filter",
                  display: 'block',
                }}
              >
                {service.title}
              </motion.h3>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function TechStackSection() {
  const technologies = [
    { name: "Figma", category: "UI Design" },
    { name: "Mongo DB", category: "Database" },
    { name: "Vercel", category: "Hosting" },
    { name: "Framer", category: "UI Design" },
    { name: "Render", category: "Hosting" },
    { name: "Azure", category: "Cloud" },
    { name: "Netlify", category: "Cloud" },
    { name: "Supabase", category: "Cloud/DB" },
    { name: "N8N", category: "Cloud/Automation" },
    { name: "GPT Codex", category: "AI" },
    { name: "Git/Github", category: "Version Control" },
    { name: "Claude Code", category: "AI" },
  ];

  return (
    <section id="tech-stack" className="tech-stack-section">
      <div className="tech-stack-intro">
        <h2>SKILL STACK</h2>
        <p>
          A curated stack of tools and technologies I use to bring thoughtful,
          high-performance web experiences to life.
        </p>
      </div>

      <div className="tech-stack-list">
        {technologies.map((technology, index) => (
          <div className="tech-stack-row" key={technology.name}>
            <span className="tech-stack-index">{index + 1}</span>
            <strong>{technology.name}</strong>
            <span className="tech-stack-category">{technology.category}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ScrollRevealSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const bioText =
    "Hey, I'm Pegasus — I don't just design interfaces, I make them come alive. I'm obsessed with clean UI, creative experiences, coding, and a little AI magic. I design interfaces from scratch, bring ideas to life in Figma, and turn those pretty pixels into real, living, breathing websites. Basically, I design it, code it, and make it work.";
  const words = bioText.split(" ");

  useLenis(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const containerHeight = container.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrollableDistance = containerHeight - viewportHeight;

    // How far the top of the container has scrolled past the top of the viewport
    const scrolled = -rect.top;
    const p = Math.max(0, Math.min(1, scrolled / scrollableDistance));
    setProgress(p);
  });

  return (
    // Tall wrapper creates the scroll distance for the pinned effect
    <div ref={containerRef} style={{ height: "300vh" }}>
      <section
        id="me"
        className="sticky top-0 mx-auto max-w-[1440px] h-screen flex flex-col justify-end relative"
        style={{ paddingLeft: "65px", paddingRight: "49px", paddingBottom: "75px" }}
      >
        {/* Pixel Art Cat in top right corner */}
        <PixelCat />

        <div>
          {/* "ABOUT ME" label */}
          <p
            className="font-bold text-[14px] leading-[20px] tracking-[1.5px]"
            style={{
              color: progress > 0 ? "#818181" : "#E0E0E0",
              transition: "color 0.3s ease",
            }}
          >
            ABOUT ME
          </p>

          {/* Bio paragraph — word-by-word reveal */}
          <p className="mt-[36px] lg:mt-[48px] max-w-[1066px] font-bold text-[22px] sm:text-[27px] lg:text-[31px] leading-[1.3] lg:leading-[40px] tracking-[-0.01em]">
            {words.map((word, i) => {
              // Smooth per-word interpolation with a sliding window
              const spread = 0.12; // width of the fade zone
              // Scale positions so last word finishes exactly at progress=1
              const wordStart = (i / words.length) * (1 - spread);
              const t = Math.max(0, Math.min(1, (progress - wordStart) / spread));

              // Interpolate from #E0E0E0 (224) to #000000 (0)
              const channel = Math.round(224 * (1 - t));
              const color = `rgb(${channel}, ${channel}, ${channel})`;

              return (
                <span
                  key={i}
                  style={{ color }}
                >
                  {word}
                  {i < words.length - 1 ? " " : ""}
                </span>
              );
            })}
          </p>
        </div>
      </section>
    </div>
  );
}

export default function Home() {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.06,
        duration: 1.4,
        smoothWheel: true,
        wheelMultiplier: 0.85,
        touchMultiplier: 1,
      }}
    >
      <main className="w-full bg-white cursor-none">
        <SmoothCursor />
        <Oneko />
        {/* ============================================= */}
        {/* HERO SECTION — full viewport height            */}
        {/* ============================================= */}
        <section className="relative h-screen w-full overflow-hidden">
          {/* Left half — image panel (no blur) */}
          <div className="absolute left-0 top-0 h-full w-1/2 overflow-hidden">
            <Image
              src="/images/hero-cat.jpg"
              alt="Hero cat"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center grayscale contrast-[1.05]"
              priority
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/20" />

            {/* Navigation links — lower-right area of left half */}
            <nav
              className="absolute z-30 flex flex-col items-end"
              style={{
                bottom: "7.4%",
                right: "6.4%",
                gap: "18px",
              }}
            >
              {["HOME", "ME", "WORKS", "SERVICES", "GET IN TOUCH"].map(
                (item) => (
                  <ScrambleLink
                    key={item}
                    text={item}
                    href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  />
                )
              )}
            </nav>
          </div>

          {/* "DESIGNER & DEVELOPER" heading — Base black text */}
          <h1
            className="absolute font-bold text-black text-right leading-[0.88em] tracking-[-0.0455em] z-10 select-none"
            style={{
              top: "1.5%",
              right: "2%",
              width: "max-content",
              maxWidth: "80%",
              fontSize: "clamp(72px, 9.75vw, 176px)",
            }}
          >
            <span className="block whitespace-nowrap">DESIGNER</span>
            <span className="block whitespace-nowrap mt-2">& DEVELOPER</span>
          </h1>

          {/* "DESIGNER & DEVELOPER" heading — Inverted white text masked to left 50% (over hero image) */}
          <div
            aria-hidden="true"
            className="absolute inset-0 h-full w-full pointer-events-none select-none z-20"
            style={{ clipPath: "inset(0 50% 0 0)" }}
          >
            <h1
              className="absolute font-bold text-[#F6F6F6] text-right leading-[0.88em] tracking-[-0.0455em]"
              style={{
                top: "1.5%",
                right: "2%",
                width: "max-content",
                maxWidth: "80%",
                fontSize: "clamp(72px, 9.75vw, 176px)",
              }}
            >
              <span className="block whitespace-nowrap">DESIGNER</span>
              <span className="block whitespace-nowrap mt-2">& DEVELOPER</span>
            </h1>
          </div>

          {/* Status indicator + Intro paragraph — right side */}
          <div
            className="absolute flex flex-col items-start gap-[12px]"
            style={{
              left: "65%",
              top: "58%",
              width: "32%",
              maxWidth: "462px",
            }}
          >
            {/* Open to Work indicator */}
            <div
              className="inline-flex items-center rounded-full border border-green-200 bg-green-50/50 backdrop-blur-sm"
              style={{
                paddingLeft: "10px",
                paddingRight: "10px",
                paddingTop: "8px",
                paddingBottom: "8px",
                gap: "8px",
              }}
            >
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
              </span>
              <span
                className="font-bold text-green-700 uppercase select-none"
                style={{
                  fontSize: "12px",
                  letterSpacing: "1.5px",
                  lineHeight: "1",
                }}
              >
                Open to Work
              </span>
            </div>

            {/* Intro text */}
            <p
              className="font-medium text-[16px] leading-[28px] tracking-[1px] text-[#818181]"
            >
              I&apos;m Pegasus. I don&apos;t just design interfaces—
              <br />I design experiences that people remember.
            </p>
          </div>
        </section>

        {/* ============================================= */}
        {/* ME / ABOUT SECTION — scroll-pinned word reveal */}
        {/* ============================================= */}
        <ScrollRevealSection />

        {/* ============================================= */}
        {/* MY WORKS SECTION                              */}
        {/* ============================================= */}
        <section
          id="works"
          style={{
            width: '100%',
            maxWidth: 1440,
            margin: '0 auto',
            paddingTop: 40,
            paddingBottom: 240,
            paddingLeft: 48,
            paddingRight: 48,
            background: 'rgb(255, 255, 255)',
            boxSizing: 'border-box',
          }}
        >
          {/* "MY WORKS." heading — flush to the left wall */}
          <h2
            style={{
              fontFamily: "'Clash Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(72px, 10vw, 154px)',
              lineHeight: '0.91em',
              letterSpacing: '-6px',
              textAlign: 'left',
              color: '#000000',
              margin: 0,
            }}
          >
            MY WORKS.
          </h2>

          {/* Subtitle — moved closer to heading with 18px font size and clean line spacing */}
          <p
            style={{
              marginTop: 18,
              maxWidth: 440,
              fontFamily: "'Clash Grotesk', sans-serif",
              fontWeight: 500,
              fontSize: 18,
              lineHeight: '26px',
              letterSpacing: 1,
              color: '#818181',
              textAlign: 'left',
            }}
          >
            A showcase of digital experiences shaped by creativity, detail, and
            intent.
          </p>

          {/* Project cards — 2x2 grid spanning edge-to-edge */}
          <div
            style={{
              marginTop: 56,
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              columnGap: 40,
              rowGap: 64,
            }}
          >
            <ProjectCard
              title="HOTERU"
              description="A seamless hotel booking experience designed to make finding and reserving."
              tags={["FIGMA"]}
              bgColor="#000000"
            />
            <ProjectCard
              title="Fathom. AI"
              description="An intuitive generative AI experience designed to turn ideas into creative results."
              tags={["FIGMA", "CODEX"]}
              bgColor="#000000"
            />
            <ProjectCard
              title="HOTERU"
              description="A seamless hotel booking experience designed to make finding and reserving."
              tags={["FIGMA"]}
              bgColor="#000000"
            />
            <ProjectCard
              title="Fathom. AI"
              description="An intuitive generative AI experience designed to turn ideas into creative results."
              tags={["FIGMA", "CODEX"]}
              bgColor="#000000"
            />
          </div>
        </section>

        {/* ============================================= */}
        {/* SERVICES SECTION — scroll reveal animation     */}
        {/* ============================================= */}
        <ScrollServicesSection />

        {/* ============================================= */}
        {/* TECH STACK SECTION                             */}
        {/* ============================================= */}
        <TechStackSection />
      </main>
    </ReactLenis>
  );
}
