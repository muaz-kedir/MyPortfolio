type Props = { eyebrow?: string; title: React.ReactNode; subtitle?: string; id?: string; children: React.ReactNode };

export function Section({ eyebrow, title, subtitle, id, children }: Props) {
  return (
    <section id={id} className="px-6 py-24 relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 max-w-3xl">
          {eyebrow && (
            <div className="inline-flex items-center rounded-full border border-border bg-card/60 backdrop-blur px-3 py-1 text-xs text-muted-foreground mb-4">
              {eyebrow}
            </div>
          )}
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            {title}
          </h2>
          {subtitle && <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
