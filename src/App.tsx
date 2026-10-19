import { lazy, Suspense, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";

import { AuthProvider } from "./lib/auth";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { RequireAuth } from "./components/admin/RequireAuth";

const AdminLayout = lazy(() =>
  import("./components/admin/AdminLayout").then((m) => ({ default: m.AdminLayout })),
);
const AdminLogin = lazy(() =>
  import("./pages/admin/AdminLogin").then((m) => ({ default: m.AdminLogin })),
);
const AdminOverview = lazy(() =>
  import("./pages/admin/AdminOverview").then((m) => ({ default: m.AdminOverview })),
);
const AdminProjects = lazy(() =>
  import("./pages/admin/AdminProjects").then((m) => ({ default: m.AdminProjects })),
);
const AdminFeatures = lazy(() =>
  import("./pages/admin/AdminFeatures").then((m) => ({ default: m.AdminFeatures })),
);
const AdminSkills = lazy(() =>
  import("./pages/admin/AdminSkills").then((m) => ({ default: m.AdminSkills })),
);
const AdminTestimonials = lazy(() =>
  import("./pages/admin/AdminTestimonials").then((m) => ({ default: m.AdminTestimonials })),
);
const AdminSite = lazy(() =>
  import("./pages/admin/AdminSite").then((m) => ({ default: m.AdminSite })),
);

function RouteFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">
      Loading…
    </div>
  );
}

export function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60_000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin"
                element={
                  <RequireAuth>
                    <AdminLayout />
                  </RequireAuth>
                }
              >
                <Route index element={<AdminOverview />} />
                <Route path="projects" element={<AdminProjects />} />
                <Route path="features" element={<AdminFeatures />} />
                <Route path="skills" element={<AdminSkills />} />
                <Route path="testimonials" element={<AdminTestimonials />} />
                <Route path="site" element={<AdminSite />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
        <Toaster richColors position="top-right" />
      </AuthProvider>
    </QueryClientProvider>
  );
}