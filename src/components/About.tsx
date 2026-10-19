import { Section } from "./Section";
import { useSiteContent } from "@/hooks/useContent";

export function About() {
  const { data } = useSiteContent();
  const { about } = data;

  return (
    <Section
      id="about"
      eyebrow="About"
      title={
        <>
          Solving real problems
          <br />
          with <span className="text-gradient">clean code</span>.
        </>
      }
      subtitle="I'm a passionate software developer who specializes in building full-stack web applications with modern frameworks and scalable architectures."
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-card border border-border rounded-3xl p-8 card-shadow">
          <h3 className="text-xl font-semibold mb-4">My Approach</h3>
          <p className="text-muted-foreground leading-relaxed">{about.approach}</p>
        </div>
        <div className="bg-gradient-card border border-border rounded-3xl p-8 card-shadow">
          <h3 className="text-xl font-semibold mb-4">What I Build</h3>
          <ul className="space-y-2">
            {about.whatIBuild.map((s) => (
              <li key={s} className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
