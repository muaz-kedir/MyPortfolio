import { Section } from "./Section";
import { useSkillBars, useSkillGroups } from "@/hooks/useContent";

export function Skills() {
  const { data: groups } = useSkillGroups();
  const { data: bars } = useSkillBars();

  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title={
        <>
          The <span className="text-gradient">tech stack</span> I build with.
        </>
      }
    >
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
          {groups.map((g) => (
            <div
              key={g.id}
              className="bg-gradient-card border border-border rounded-2xl p-6 card-shadow"
            >
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
              <div key={b.id}>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-muted-foreground">{b.label}</span>
                  <span className="text-primary font-semibold">{b.value}%</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-[oklch(0.92_0.16_100)]"
                    style={{
                      width: `${b.value}%`,
                      boxShadow: "0 0 12px oklch(0.88 0.18 95 / 0.6)",
                    }}
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
