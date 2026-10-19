import { BrainCircuit, Cpu, Layers, MousePointerClick, Network, Rocket } from "lucide-react";
import { Section } from "./Section";
import MagicBento, { type MagicBentoItem } from "./MagicBento";

const reasons = [
  {
    t: "Problem-Solving Mindset",
    d: "I break down complex requirements into clean, shippable systems.",
    icon: BrainCircuit,
  },
  {
    t: "Clean & Scalable Code",
    d: "Architectures that grow with your business — no tech debt traps.",
    icon: Layers,
  },
  {
    t: "Fast Learner",
    d: "I pick up new stacks and domains quickly, with strong fundamentals.",
    icon: Rocket,
  },
  {
    t: "User Experience First",
    d: "Every interaction is designed to feel intuitive and effortless.",
    icon: MousePointerClick,
  },
  {
    t: "Modern Web Tech",
    d: "React, Next.js, TypeScript, Django, PostgreSQL — and always evolving.",
    icon: Cpu,
  },
  {
    t: "System Architecture",
    d: "Strong understanding of multi-tenant, role-based, and real-time systems.",
    icon: Network,
  },
];

const items: MagicBentoItem[] = reasons.map((r, i) => {
  const Icon = r.icon;
  return {
    label: `0${i + 1}`,
    title: r.t,
    description: r.d,
    visual: (
      <div className="flex w-full flex-1 items-center justify-center">
        <Icon size={46} strokeWidth={1.25} className="text-primary/70" />
      </div>
    ),
  };
});

export function WhyMe() {
  return (
    <Section
      eyebrow="Why Work With Me"
      title={
        <>
          Built to <span className="text-gradient">deliver value.</span>
        </>
      }
    >
      <MagicBento
        items={items}
        columns={3}
        rowHeight={210}
        gap={16}
        radius={24}
        theme="dark"
        glowColor="#fdd506"
      />

      <div className="mt-16 bg-gradient-card border border-border rounded-3xl p-8 md:p-10 card-shadow">
        <div className="text-xs uppercase tracking-widest text-primary mb-2">Experience</div>
        <h3 className="text-2xl font-bold mb-2">Freelance Full-Stack Developer</h3>
        <p className="text-muted-foreground mb-6">
          Worked on multiple web-based systems and SaaS platforms — scalable backends, responsive
          frontends, and clean user experiences.
        </p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm">
          {[
            "Building APIs",
            "Responsive dashboards",
            "Database architecture",
            "Authentication systems",
            "UI/UX implementation",
            "Deployment & hosting",
          ].map((r) => (
            <div key={r} className="flex items-center gap-2 text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              {r}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
