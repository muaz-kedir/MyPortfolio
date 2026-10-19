export type Stat = {
  value: string;
  label: string;
};

export type HeroContent = {
  badge: string;
  name: string;
  roles: string;
  bio: string;
  stats: Stat[];
};

export type AboutContent = {
  approach: string;
  whatIBuild: string[];
};

export type ExperienceContent = {
  role: string;
  description: string;
  responsibilities: string[];
};

export type ContactLink = {
  label: string;
  value: string;
  href: string;
};

export type ContactContent = {
  email: string;
  links: ContactLink[];
  footerNote: string;
};

export type SiteContent = {
  hero: HeroContent;
  about: AboutContent;
  experience: ExperienceContent;
  contact: ContactContent;
};

export type Project = {
  id: string;
  order: number;
  published: boolean;
  name: string;
  description: string;
  features: string[];
  tech: string[];
  accentFrom: string;
  accentTo: string;
  imageUrl?: string;
  imagePublicId?: string;
  liveUrl?: string;
  repoUrl?: string;
};

export type Feature = {
  id: string;
  order: number;
  published: boolean;
  title: string;
  description: string;
  icon: string;
};

export type SkillGroup = {
  id: string;
  order: number;
  title: string;
  items: string[];
};

export type SkillBar = {
  id: string;
  order: number;
  label: string;
  value: number;
};

export type Testimonial = {
  id: string;
  order: number;
  published: boolean;
  quote: string;
  author: string;
  role?: string;
};

export type CollectionName = "projects" | "features" | "skillGroups" | "skillBars" | "testimonials";

export type ContentEntity = Project | Feature | SkillGroup | SkillBar | Testimonial;

export type EntityWithMeta = {
  order: number;
  published?: boolean;
};
