const technologies = [
  { name: "Figma", category: "UI Design" },
  { name: "Framer", category: "UI Design" },
  { name: "Git / GitHub", category: "Version Control" },
  { name: "MongoDB", category: "Database" },
  { name: "Supabase", category: "Cloud / Database" },
  { name: "Azure", category: "Cloud" },
  { name: "Vercel", category: "Hosting / Deployment" },
  { name: "Render", category: "Hosting / Deployment" },
  { name: "Netlify", category: "Hosting / Deployment" },
  { name: "n8n", category: "Automation" },
  { name: "GPT Codex", category: "AI / Development" },
  { name: "Claude Code", category: "AI / Development" },
];

export function SkillStackSection() {
  return (
    <section id="tech-stack" className="tech-stack-section">
      <div className="tech-stack-intro">
        <h2>SKILL STACK</h2>
        <p>A curated stack of tools and technologies I use to bring thoughtful, high-performance web experiences to life.</p>
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
