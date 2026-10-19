import { Section } from "./Section";
import MagicBento, { type MagicBentoItem } from "./MagicBento";
import { useFeatures, useSiteContent } from "@/hooks/useContent";
import { resolveFeatureIcon } from "@/lib/icons";

export function WhyMe() {
  const { data: features } = useFeatures();
  const { data: site } = useSiteContent();
  const visible = features.filter((f) => f.published !== false);

  const items: MagicBentoItem[] = visible.map((f, i) => {
    const Icon = resolveFeatureIcon(f.icon);
    return {
      id: f.id,
      label: `0${i + 1}`,
      title: f.title,
      description: f.description,
      visual: (
        <div className="flex w-full flex-1 items-center justify-center">
          <Icon size={46} strokeWidth={1.25} className="text-primary/70" />
        </div>
      ),
    };
  });

  return (
    <Section
      eyebrow="Why Work With Me"
      title={
        <>
          Built to <span className="text-gradient">deliver value.</span>
        </>
      }
    >
      {items.length > 0 && (
        <MagicBento
          items={items}
          columns={3}
          rowHeight={210}
          gap={16}
          radius={24}
          theme="dark"
          glowColor="#fdd506"
        />
      )}

      <div className="mt-16 bg-gradient-card border border-border rounded-3xl p-8 md:p-10 card-shadow">
        <div className="text-xs uppercase tracking-widest text-primary mb-2">Experience</div>
        <h3 className="text-2xl font-bold mb-2">{site.experience.role}</h3>
        <p className="text-muted-foreground mb-6">{site.experience.description}</p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm">
          {site.experience.responsibilities.map((r) => (
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
