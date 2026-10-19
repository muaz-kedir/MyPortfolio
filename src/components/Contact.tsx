import { Sparkle } from "./Sparkle";
import { useSiteContent } from "@/hooks/useContent";

export function Contact() {
  const { data } = useSiteContent();
  const { contact } = data;

  return (
    <section id="contact" className="px-6 py-24 relative">
      <div className="max-w-5xl mx-auto relative">
        <div className="relative bg-gradient-card border border-border rounded-3xl p-10 md:p-16 card-shadow overflow-hidden text-center">
          <div className="absolute -top-10 -left-10 animate-float opacity-70">
            <Sparkle size={80} />
          </div>
          <div className="absolute -bottom-6 right-10 animate-twinkle">
            <Sparkle size={50} />
          </div>

          <div className="inline-flex items-center rounded-full border border-border bg-background/50 backdrop-blur px-3 py-1 text-xs text-muted-foreground mb-5">
            Contact
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight max-w-3xl mx-auto">
            Let's build something <span className="text-gradient">amazing</span> together.
          </h2>
          <p className="mt-5 text-muted-foreground max-w-xl mx-auto">
            Have a project in mind, or want to chat about an idea? I'd love to hear from you.
          </p>

          <a
            href={`mailto:${contact.email}`}
            className="mt-8 inline-flex rounded-full bg-primary text-primary-foreground px-8 py-3.5 font-semibold glow hover:opacity-90 transition"
          >
            Start a Project →
          </a>

          <div className="mt-12 grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-left">
            {contact.links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="block bg-background/40 border border-border rounded-2xl p-4 hover:border-primary/40 transition"
              >
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  {l.label}
                </div>
                <div className="text-sm mt-1 truncate">{l.value}</div>
              </a>
            ))}
          </div>
        </div>

        <footer className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <div>
            © {new Date().getFullYear()} {data.hero.name}. Built with care.
          </div>
          <div>{contact.footerNote}</div>
        </footer>
      </div>
    </section>
  );
}
