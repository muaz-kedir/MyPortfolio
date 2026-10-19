import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, Sparkles, Star, Wrench } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFeatures, useProjects, useSkillGroups, useTestimonials } from "@/hooks/useContent";

export function AdminOverview() {
  const { data: projects } = useProjects();
  const { data: features } = useFeatures();
  const { data: skillGroups } = useSkillGroups();
  const { data: testimonials } = useTestimonials();

  const cards = [
    { to: "/admin/projects", label: "Projects", count: projects.length, icon: Briefcase },
    { to: "/admin/features", label: "Features", count: features.length, icon: Sparkles },
    { to: "/admin/skills", label: "Skill groups", count: skillGroups.length, icon: Wrench },
    { to: "/admin/testimonials", label: "Testimonials", count: testimonials.length, icon: Star },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Overview</h1>
        <p className="text-sm text-muted-foreground">
          Manage every section of the portfolio. Changes appear on the live site immediately.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Link key={card.to} to={card.to}>
            <Card className="transition-colors hover:border-primary/40">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.label}
                </CardTitle>
                <card.icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{card.count}</div>
                <div className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
                  Manage <ArrowRight className="h-3 w-3" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
