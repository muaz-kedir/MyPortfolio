import { Section } from "./Section";
import { useTestimonials } from "@/hooks/useContent";

export function Testimonials() {
  const { data } = useTestimonials();
  const visible = data.filter((t) => t.published !== false);

  return (
    <Section
      eyebrow="Testimonials"
      title={
        <>
          What people <span className="text-gradient">say.</span>
        </>
      }
    >
      <div className="grid md:grid-cols-2 gap-6">
        {visible.map((t) => (
          <figure
            key={t.id}
            className="bg-gradient-card border border-border rounded-3xl p-8 card-shadow"
          >
            <div className="text-primary text-5xl leading-none mb-2">"</div>
            <blockquote className="text-lg leading-relaxed text-foreground/90">
              {t.quote}
            </blockquote>
            <figcaption className="mt-6 text-sm text-muted-foreground">
              — {t.author}
              {t.role ? `, ${t.role}` : ""}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
