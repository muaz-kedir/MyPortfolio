import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  BarChart3,
  Briefcase,
  ExternalLink,
  LogOut,
  Sparkles,
  Star,
  Wrench,
  LayoutDashboard,
} from "lucide-react";

import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/admin/projects", label: "Projects", icon: Briefcase },
  { to: "/admin/features", label: "Features (Why Me)", icon: Sparkles },
  { to: "/admin/skills", label: "Skills / Tech Stack", icon: Wrench },
  { to: "/admin/testimonials", label: "Testimonials", icon: Star },
  { to: "/admin/site", label: "Site Content", icon: BarChart3 },
];

export function AdminLayout() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut();
    navigate("/admin/login", { replace: true });
  }

  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="border-b border-border lg:border-b-0 lg:border-r lg:min-h-screen lg:sticky lg:top-0 lg:self-start">
        <div className="flex items-center gap-2 px-6 py-5 font-bold">
          <Sparkles className="h-5 w-5 text-primary" />
          <span>Content Studio</span>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:overflow-visible lg:pb-6">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 whitespace-nowrap rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-card hover:text-foreground",
                )
              }
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex min-h-screen flex-col">
        <header className="flex items-center justify-between gap-4 border-b border-border px-6 py-4">
          <div className="min-w-0">
            <div className="text-sm font-medium">Dashboard</div>
            <div className="truncate text-xs text-muted-foreground">{user?.email}</div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <a href="/" target="_blank" rel="noreferrer">
                <ExternalLink className="h-4 w-4" />
                View site
              </a>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4" />
              Sign out
            </Button>
          </div>
        </header>
        <main className="flex-1 px-6 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
