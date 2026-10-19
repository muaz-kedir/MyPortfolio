import { Section } from "./Section";

const services = [
  "Multi-tenant SaaS platforms",
  "School management systems",
  "Online bidding & auction systems",
  "Dashboard & admin panels",
  "Payment integrations",
  "Scheduling & management systems",
];

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title={<>Solving real problems<br />with <span className="text-gradient">clean code</span>.</>}
      subtitle="I'm a passionate software developer who specializes in building full-stack web applications with modern frameworks and scalable architectures."
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-card border border-border rounded-3xl p-8 card-shadow">
          <h3 className="text-xl font-semibold mb-4">My Approach</h3>
          <p className="text-muted-foreground leading-relaxed">
            I focus on creating systems that are fast, responsive, secure, and easy to use.
            I continuously learn new technologies to improve in backend development, frontend
            design, system architecture, and user experience.
          </p>
        </div>
        <div className="bg-gradient-card border border-border rounded-3xl p-8 card-shadow">
          <h3 className="text-xl font-semibold mb-4">What I Build</h3>
          <ul className="space-y-2">
            {services.map((s) => (
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
