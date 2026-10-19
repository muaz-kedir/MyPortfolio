import { Section } from "./Section";

const quotes = [
  { q: "Muaz delivers modern and functional systems with excellent UI design and strong backend logic.", a: "Client" },
  { q: "Very dedicated developer with strong attention to detail and performance.", a: "Client" },
];

export function Testimonials() {
  return (
    <Section
      eyebrow="Testimonials"
      title={<>What people <span className="text-gradient">say.</span></>}
    >
      <div className="grid md:grid-cols-2 gap-6">
        {quotes.map((t, i) => (
          <figure key={i} className="bg-gradient-card border border-border rounded-3xl p-8 card-shadow">
            <div className="text-primary text-5xl leading-none mb-2">"</div>
            <blockquote className="text-lg leading-relaxed text-foreground/90">{t.q}</blockquote>
            <figcaption className="mt-6 text-sm text-muted-foreground">— {t.a}</figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
