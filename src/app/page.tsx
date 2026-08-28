"use client";

import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";
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
    <span className="inline-flex items-center justify-center rounded-[5px] border border-[#E0E0E0] px-2 py-1 text-[12px] font-bold leading-[10px] tracking-[1px] text-[#818181]">
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
  return (
    <div className="flex flex-col">
      {/* Card image placeholder */}
      <div
        className="w-full aspect-[530/328] rounded-[30px]"
        style={{ backgroundColor: bgColor }}
      />
      {/* Card info — title row + description */}
      <div className="mt-[56px] flex items-center justify-between">
        <h3 className="font-bold text-[48px] leading-[35px] tracking-[-1px] text-black">
          {title}
        </h3>
        <div className="flex items-center gap-3">
          {tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
      </div>
      <p className="mt-[19px] max-w-[394px] font-medium text-[16px] leading-[25px] tracking-[1px] text-[#818181]">
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
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
      <main className="w-full bg-[#F6F6F6] cursor-none">
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
          className="mx-auto max-w-[1440px] px-[143px] pt-[192px] pb-[508px]"
        >
          {/* "MY WORKS." heading */}
          <h2
            className="max-w-[798px] font-bold text-black text-right"
            style={{
              fontSize: "clamp(80px, 10.7vw, 154px)",
              lineHeight: "0.91em",
              letterSpacing: "-7px",
            }}
          >
            MY WORKS.
          </h2>

          {/* Subtitle */}
          <p className="mt-[56px] max-w-[464px] font-medium text-[22px] leading-[38px] tracking-[1px] text-[#818181]">
            A showcase of digital experiences shaped by creativity, detail, and
            intent.
          </p>

          {/* Project cards — 2-column grid */}
          <div className="mt-[84px] grid grid-cols-2 gap-x-[94px] gap-y-[94px]">
            <ProjectCard
              title="HOTERU"
              description="A seamless hotel booking experience designed to make finding and reserving."
              tags={["FIGMA"]}
              bgColor="#A9A9A9"
            />
            <ProjectCard
              title="Fathom. AI"
              description="An intuitive generative AI experience designed to turn ideas into creative results."
              tags={["FIGMA", "CODEX"]}
              bgColor="#FFFFFF"
            />
            <ProjectCard
              title="HOTERU"
              description="A seamless hotel booking experience designed to make finding and reserving."
              tags={["FIGMA"]}
              bgColor="#A9A9A9"
            />
            <ProjectCard
              title="Fathom. AI"
              description="An intuitive generative AI experience designed to turn ideas into creative results."
              tags={["FIGMA", "CODEX"]}
              bgColor="#FFFFFF"
            />
          </div>
        </section>
      </main>
    </ReactLenis>
  );
}
