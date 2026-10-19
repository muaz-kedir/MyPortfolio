import { Section } from "./Section";

const groups = [
  { title: "Frontend", items: ["React.js", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML5", "CSS3", "Bootstrap"] },
  { title: "Backend", items: ["Node.js", "Express.js", "JavaScript", "Django"] },
  { title: "Database", items: ["PostgreSQL", "MySQL", "SQLite"] },
  { title: "Tools & Platforms", items: ["Git & GitHub", "Postman", "Docker", "Firebase", "Vercel", "Netlify"] },
  { title: "UI/UX & Design", items: ["Figma", "Responsive Design", "Dashboard Design", "Animation Libs", "Modern Web UI"] },
];

const bars = [
  { l: "React / Next.js", v: 94 },
  { l: "TypeScript", v: 88 },
  { l: "Node.js / Express", v: 86 },
  { l: "PostgreSQL", v: 82 },
  { l: "UI/UX Design", v: 78 },
];

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title={<>The <span className="text-gradient">tech stack</span> I build with.</>}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
          {groups.map((g) => (
            <div key={g.title} className="bg-gradient-card border border-border rounded-2xl p-6 card-shadow">
              <h3 className="font-semibold mb-4">{g.title}</h3>
              <div className="flex flex-wrap gap-2">
                {g.items.map((i) => (
                  <span
                    key={i}
                    className="text-xs rounded-full border border-border bg-background/40 px-3 py-1.5 text-muted-foreground hover:text-primary hover:border-primary/50 transition"
                  >
                    {i}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="bg-gradient-card border border-border rounded-2xl p-6 card-shadow">
          <h3 className="font-semibold mb-6">Proficiency</h3>
          <div className="space-y-5">
            {bars.map((b) => (
              <div key={b.l}>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-muted-foreground">{b.l}</span>
                  <span className="text-primary font-semibold">{b.v}%</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-[oklch(0.92_0.16_100)]"
                    style={{ width: `${b.v}%`, boxShadow: "0 0 12px oklch(0.88 0.18 95 / 0.6)" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
