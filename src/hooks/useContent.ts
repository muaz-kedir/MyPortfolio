import { useQuery, useQueryClient } from "@tanstack/react-query";

import { isFirebaseConfigured } from "@/lib/firebase";
import {
  fetchFeatures,
  fetchProjects,
  fetchSiteContent,
  fetchSkillBars,
  fetchSkillGroups,
  fetchTestimonials,
} from "@/lib/content/api";
import {
  defaultFeatures,
  defaultProjects,
  defaultSiteContent,
  defaultSkillBars,
  defaultSkillGroups,
  defaultTestimonials,
} from "@/lib/content/defaults";

export const contentKeys = {
  all: ["content"] as const,
  projects: ["content", "projects"] as const,
  features: ["content", "features"] as const,
  skillGroups: ["content", "skillGroups"] as const,
  skillBars: ["content", "skillBars"] as const,
  testimonials: ["content", "testimonials"] as const,
  site: ["content", "site"] as const,
};

/** Public portfolio queries: instant defaults, then live Firestore data. */
export function useProjects() {
  return useQuery({
    queryKey: contentKeys.projects,
    queryFn: fetchProjects,
    initialData: defaultProjects,
    enabled: isFirebaseConfigured,
    staleTime: 5 * 60_000,
  });
}

export function useFeatures() {
  return useQuery({
    queryKey: contentKeys.features,
    queryFn: fetchFeatures,
    initialData: defaultFeatures,
    enabled: isFirebaseConfigured,
    staleTime: 5 * 60_000,
  });
}

export function useSkillGroups() {
  return useQuery({
    queryKey: contentKeys.skillGroups,
    queryFn: fetchSkillGroups,
    initialData: defaultSkillGroups,
    enabled: isFirebaseConfigured,
    staleTime: 5 * 60_000,
  });
}

export function useSkillBars() {
  return useQuery({
    queryKey: contentKeys.skillBars,
    queryFn: fetchSkillBars,
    initialData: defaultSkillBars,
    enabled: isFirebaseConfigured,
    staleTime: 5 * 60_000,
  });
}

export function useTestimonials() {
  return useQuery({
    queryKey: contentKeys.testimonials,
    queryFn: fetchTestimonials,
    initialData: defaultTestimonials,
    enabled: isFirebaseConfigured,
    staleTime: 5 * 60_000,
  });
}

export function useSiteContent() {
  return useQuery({
    queryKey: contentKeys.site,
    queryFn: fetchSiteContent,
    initialData: defaultSiteContent,
    enabled: isFirebaseConfigured,
    staleTime: 5 * 60_000,
  });
}

/** Invalidates all content queries so the dashboard and site refresh together. */
export function useInvalidateContent() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: contentKeys.all });
}
