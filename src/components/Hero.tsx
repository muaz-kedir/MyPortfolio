import { Sparkle } from "./Sparkle";
import muazPhoto from "@/assets/muaz.jpg";

export function Hero() {
  return (
    <section id="top" className="relative pt-36 pb-24 px-6 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="absolute top-32 right-10 animate-float hidden lg:block">
        <Sparkle size={96} className="opacity-90" />
      </div>
      <div className="absolute top-72 right-48 animate-twinkle hidden lg:block">
        <Sparkle size={42} />
      </div>

      <div className="max-w-7xl mx-auto relative grid lg:grid-cols-[1fr_auto] gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur px-4 py-1.5 text-xs text-muted-foreground mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Available for freelance work
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] max-w-4xl">
            Hi, I'm <span className="text-gradient">Muaz Kedir</span>
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-muted-foreground max-w-2xl">
            Full-Stack Developer · SaaS Builder · UI/UX Enthusiast
          </p>
          <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            I build modern, scalable, user-focused web applications — from school systems
            and auction platforms to SaaS dashboards. Fast, responsive, secure, and easy to use.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-full bg-primary text-primary-foreground px-7 py-3 font-semibold glow hover:opacity-90 transition"
            >
              View My Work →
            </a>
            <a
              href="#contact"
              className="rounded-full border border-border bg-card/60 backdrop-blur px-7 py-3 font-semibold hover:bg-card transition"
            >
              Get in Touch
            </a>
            <a
              href="/Muaz-Kedir-CV.pdf"
              download
              className="rounded-full border border-primary/40 bg-card/60 backdrop-blur px-7 py-3 font-semibold hover:bg-primary/10 hover:border-primary transition inline-flex items-center gap-2"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download CV
            </a>
          </div>
        </div>

        <div className="relative justify-self-center lg:justify-self-end order-first lg:order-last">
          <div className="absolute -inset-4 bg-gradient-primary rounded-full blur-2xl opacity-40" />
          <div className="relative w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-2 border-primary/40 card-shadow">
            <img
              src={muazPhoto}
              alt="Portrait of Muaz Kedir, full-stack developer"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
          <div className="absolute -top-4 -right-2 animate-twinkle">
            <Sparkle size={36} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { v: "20+", l: "Projects Built" },
          { v: "5+", l: "SaaS Platforms" },
          { v: "10k+", l: "Lines of Code/wk" },
          { v: "100%", l: "Client Focused" },
        ].map((s) => (
          <div key={s.l} className="bg-gradient-card border border-border rounded-2xl p-5 card-shadow">
            <div className="text-3xl font-bold text-gradient">{s.v}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
