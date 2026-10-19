import { Section } from "./Section";
import MagicBento, { type MagicBentoItem } from "./MagicBento";

const projects = [
  {
    name: "Multi-Cafeteria SaaS Platform",
    desc: "SaaS where a super admin manages multiple cafeteria admins. Each cafeteria gets its own dashboard for menus, orders, blogs, and customers.",
    features: [
      "Multi-tenancy",
      "Role-based auth",
      "Order management",
      "Blog CMS",
      "Admin hierarchy",
    ],
    tech: ["React", "Django REST", "PostgreSQL", "Tailwind"],
    accent: "from-[oklch(0.88_0.18_95)] to-[oklch(0.7_0.2_60)]",
  },
  {
    name: "Online Auction & Bidding Platform",
    desc: "Modern auction with live bidding, wallet, escrow payments, dispute management, and an animated winner celebration UI.",
    features: [
      "Real-time bidding",
      "Wallet system",
      "Escrow flow",
      "Dispute handling",
      "Multi-language",
    ],
    tech: ["React", "Django", "PostgreSQL", "Anime.js"],
    accent: "from-[oklch(0.75_0.18_180)] to-[oklch(0.55_0.2_240)]",
  },
  {
    name: "School Management System",
    desc: "Complete platform for administrators, teachers, students, and parents — attendance, schedules, assignments, and dashboards.",
    features: ["Student mgmt", "Schedules", "Attendance", "Assignments", "Parent dashboard"],
    tech: ["Django REST", "React", "PostgreSQL"],
    accent: "from-[oklch(0.78_0.18_140)] to-[oklch(0.6_0.2_180)]",
  },
  {
    name: "Nejah Online Quran Learning",
    desc: "Online Quran learning platform managing students, teachers, classes, schedules, and live online learning activities.",
    features: ["Student registration", "Teacher mgmt", "Live classes", "Progress tracking"],
    tech: ["React", "Django", "PostgreSQL"],
    accent: "from-[oklch(0.8_0.18_310)] to-[oklch(0.6_0.22_350)]",
  },
];

const items: MagicBentoItem[] = projects.map((p, i) => ({
  id: p.name,
  title: p.name,
  content: (
    <div className="group relative flex min-h-0 flex-1 flex-col">
      <div
        className={`pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-br ${p.accent} opacity-20 blur-3xl transition-opacity duration-300 group-hover:opacity-30`}
      />
      <div className="relative flex min-h-0 flex-1 flex-col">
        <div className="text-xs text-muted-foreground mb-2">Project 0{i + 1}</div>
        <h3 className="text-xl font-bold mb-3">{p.name}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>

        <div className="mt-5">
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
            Key Features
          </div>
          <div className="flex flex-wrap gap-2">
            {p.features.map((f) => (
              <span
                key={f}
                className="text-xs rounded-full bg-background/50 border border-border px-3 py-1"
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 pt-4 border-t border-border">
          {p.tech.map((t, idx) => (
            <span key={t} className="text-xs text-primary font-medium">
              {idx > 0 && <span className="text-muted-foreground mr-2">·</span>}
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  ),
}));

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Featured Projects"
      title={
        <>
          Real products that <span className="text-gradient">deliver results.</span>
        </>
      }
      subtitle="A selection of full-stack systems and SaaS platforms I've designed and shipped."
    >
      <MagicBento
        items={items}
        columns={2}
        rowHeight={340}
        gap={20}
        radius={24}
        theme="dark"
        glowColor="#fdd506"
      />
    </Section>
  );
}
