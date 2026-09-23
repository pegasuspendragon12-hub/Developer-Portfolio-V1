import Image from "next/image";
import { ScrambleLink } from "@/components/site/scramble-link";

export function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute left-0 top-0 h-full w-1/2 overflow-hidden">
        <Image src="/images/hero/hero-cat.jpg" alt="Hero cat" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-center grayscale contrast-[1.05]" priority />
        <div className="absolute inset-0 bg-black/20" />
        <nav className="absolute z-30 flex flex-col items-end" style={{ bottom: "7.4%", right: "6.4%", gap: "18px" }}>
          {["HOME", "ME", "WORKS", "SERVICES", "GET IN TOUCH"].map((item) => <ScrambleLink key={item} text={item} href={`#${item.toLowerCase().replace(/\s+/g, "-")}`} />)}
        </nav>
      </div>
      <h1 className="absolute font-bold text-black text-right leading-[0.88em] tracking-[-0.0455em] z-10 select-none" style={{ top: "1.5%", right: "2%", width: "max-content", maxWidth: "80%", fontSize: "clamp(72px, 9.75vw, 176px)" }}>
        <span className="block whitespace-nowrap">DESIGNER</span><span className="block whitespace-nowrap mt-2">&amp; DEVELOPER</span>
      </h1>
      <div aria-hidden="true" className="absolute inset-0 h-full w-full pointer-events-none select-none z-20" style={{ clipPath: "inset(0 50% 0 0)" }}>
        <h1 className="absolute font-bold text-[#F6F6F6] text-right leading-[0.88em] tracking-[-0.0455em]" style={{ top: "1.5%", right: "2%", width: "max-content", maxWidth: "80%", fontSize: "clamp(72px, 9.75vw, 176px)" }}>
          <span className="block whitespace-nowrap">DESIGNER</span><span className="block whitespace-nowrap mt-2">&amp; DEVELOPER</span>
        </h1>
      </div>
      <div className="absolute flex flex-col items-start gap-[12px]" style={{ left: "65%", top: "58%", width: "32%", maxWidth: "462px" }}>
        <div className="inline-flex items-center rounded-full border border-green-200 bg-green-50/50 backdrop-blur-sm" style={{ padding: "8px 10px", gap: "8px" }}>
          <span className="relative flex h-2.5 w-2.5 shrink-0"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" /><span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" /></span>
          <span className="font-bold text-green-700 uppercase select-none" style={{ fontSize: "12px", letterSpacing: "1.5px", lineHeight: "1" }}>Open to Work</span>
        </div>
        <p className="font-medium text-[16px] leading-[28px] tracking-[1px] text-[#818181]">I&apos;m Pegasus. I don&apos;t just design interfaces—<br />I design experiences that people remember.</p>
      </div>
    </section>
  );
}
