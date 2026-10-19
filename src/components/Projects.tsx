import { Section } from "./Section";
import MagicBento, { type MagicBentoItem } from "./MagicBento";
import { useProjects } from "@/hooks/useContent";
import type { Project } from "@/lib/content/types";

function projectContent(p: Project, index: number) {
  return (
    <div className="group relative flex min-h-0 flex-1 flex-col">
      {!p.imageUrl && (
        <div
          className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full opacity-20 blur-3xl transition-opacity duration-300 group-hover:opacity-30"
          style={{
            backgroundImage: `linear-gradient(to bottom right, ${p.accentFrom}, ${p.accentTo})`,
          }}
        />
      )}
      <div className="relative flex min-h-0 flex-1 flex-col">
        <div className="text-xs text-muted-foreground mb-2">Project 0{index + 1}</div>
        <h3 className="text-xl font-bold mb-3">{p.name}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>

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
  );
}

export function Projects() {
  const { data: projects } = useProjects();
  const visible = projects.filter((p) => p.published !== false);

  const items: MagicBentoItem[] = visible.map((p, i) => ({
    id: p.id,
    title: p.name,
    image: p.imageUrl,
    content: projectContent(p, i),
  }));

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
      {items.length > 0 ? (
        <MagicBento
          items={items}
          columns={2}
          rowHeight={340}
          gap={20}
          radius={24}
          theme="dark"
          glowColor="#fdd506"
        />
      ) : (
        <p className="text-muted-foreground">No projects published yet.</p>
      )}
    </Section>
  );
}
