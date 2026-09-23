import { ProjectCard } from "@/components/site/project-card";

export function WorksSection() {
  return (
    <section id="works" style={{ width: "100%", maxWidth: 1440, margin: "0 auto", paddingTop: 40, paddingBottom: 240, paddingLeft: 48, paddingRight: 48, background: "rgb(255, 255, 255)", boxSizing: "border-box" }}>
      <h2 style={{ fontFamily: "'Clash Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(72px, 10vw, 154px)", lineHeight: "0.91em", letterSpacing: "-6px", textAlign: "left", color: "#000000", margin: 0 }}>MY WORKS.</h2>
      <p style={{ marginTop: 18, maxWidth: 440, fontFamily: "'Clash Grotesk', sans-serif", fontWeight: 500, fontSize: 18, lineHeight: "26px", letterSpacing: 1, color: "#818181", textAlign: "left" }}>A showcase of digital experiences shaped by creativity, detail, and intent.</p>
      <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", columnGap: 40, rowGap: 64 }}>
        <ProjectCard title="HOTERU" description="A seamless hotel booking experience designed to make finding and reserving." tags={["FIGMA"]} bgColor="#000000" />
        <ProjectCard title="Fathom. AI" description="An intuitive generative AI experience designed to turn ideas into creative results." tags={["FIGMA", "CODEX"]} bgColor="#000000" />
        <ProjectCard title="HOTERU" description="A seamless hotel booking experience designed to make finding and reserving." tags={["FIGMA"]} bgColor="#000000" />
        <ProjectCard title="Fathom. AI" description="An intuitive generative AI experience designed to turn ideas into creative results." tags={["FIGMA", "CODEX"]} bgColor="#000000" />
      </div>
    </section>
  );
}
