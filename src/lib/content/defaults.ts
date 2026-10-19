import type { Feature, Project, SiteContent, SkillBar, SkillGroup, Testimonial } from "./types";

export const defaultSiteContent: SiteContent = {
  hero: {
    badge: "Available for freelance work",
    name: "Muaz Kedir",
    roles: "Full-Stack Developer · SaaS Builder · UI/UX Enthusiast",
    bio: "I build modern, scalable, user-focused web applications — from school systems and auction platforms to SaaS dashboards. Fast, responsive, secure, and easy to use.",
    stats: [
      { value: "20+", label: "Projects Built" },
      { value: "5+", label: "SaaS Platforms" },
      { value: "10k+", label: "Lines of Code/wk" },
      { value: "100%", label: "Client Focused" },
    ],
  },
  about: {
    approach:
      "I focus on creating systems that are fast, responsive, secure, and easy to use. I continuously learn new technologies to improve in backend development, frontend design, system architecture, and user experience.",
    whatIBuild: [
      "Multi-tenant SaaS platforms",
      "School management systems",
      "Online bidding & auction systems",
      "Dashboard & admin panels",
      "Payment integrations",
      "Scheduling & management systems",
    ],
  },
  experience: {
    role: "Freelance Full-Stack Developer",
    description:
      "Worked on multiple web-based systems and SaaS platforms — scalable backends, responsive frontends, and clean user experiences.",
    responsibilities: [
      "Building APIs",
      "Responsive dashboards",
      "Database architecture",
      "Authentication systems",
      "UI/UX implementation",
      "Deployment & hosting",
    ],
  },
  contact: {
    email: "muaz@example.com",
    links: [
      { label: "Email", value: "muaz@example.com", href: "mailto:muaz@example.com" },
      {
        label: "GitHub",
        value: "github.com/yourusername",
        href: "https://github.com/yourusername",
      },
      {
        label: "LinkedIn",
        value: "linkedin.com/in/yourusername",
        href: "https://linkedin.com/in/yourusername",
      },
      { label: "Portfolio", value: "yourportfolio.com", href: "https://yourportfolio.com" },
    ],
    footerNote: "Full-stack developer · React · Django · PostgreSQL",
  },
};

export const defaultProjects: Project[] = [
  {
    id: "multi-cafeteria-saas",
    order: 0,
    published: true,
    name: "Multi-Cafeteria SaaS Platform",
    description:
      "SaaS where a super admin manages multiple cafeteria admins. Each cafeteria gets its own dashboard for menus, orders, blogs, and customers.",
    features: [
      "Multi-tenancy",
      "Role-based auth",
      "Order management",
      "Blog CMS",
      "Admin hierarchy",
    ],
    tech: ["React", "Django REST", "PostgreSQL", "Tailwind"],
    accentFrom: "#fdd506",
    accentTo: "#e07a1f",
  },
  {
    id: "online-auction-bidding",
    order: 1,
    published: true,
    name: "Online Auction & Bidding Platform",
    description:
      "Modern auction with live bidding, wallet, escrow payments, dispute management, and an animated winner celebration UI.",
    features: [
      "Real-time bidding",
      "Wallet system",
      "Escrow flow",
      "Dispute handling",
      "Multi-language",
    ],
    tech: ["React", "Django", "PostgreSQL", "Anime.js"],
    accentFrom: "#2dd4bf",
    accentTo: "#3b82f6",
  },
  {
    id: "school-management-system",
    order: 2,
    published: true,
    name: "School Management System",
    description:
      "Complete platform for administrators, teachers, students, and parents — attendance, schedules, assignments, and dashboards.",
    features: ["Student mgmt", "Schedules", "Attendance", "Assignments", "Parent dashboard"],
    tech: ["Django REST", "React", "PostgreSQL"],
    accentFrom: "#4ade80",
    accentTo: "#06b6d4",
  },
  {
    id: "nejah-quran-learning",
    order: 3,
    published: true,
    name: "Nejah Online Quran Learning",
    description:
      "Online Quran learning platform managing students, teachers, classes, schedules, and live online learning activities.",
    features: ["Student registration", "Teacher mgmt", "Live classes", "Progress tracking"],
    tech: ["React", "Django", "PostgreSQL"],
    accentFrom: "#d8b4fe",
    accentTo: "#ec4899",
  },
];

export const defaultFeatures: Feature[] = [
  {
    id: "problem-solving",
    order: 0,
    published: true,
    title: "Problem-Solving Mindset",
    description: "I break down complex requirements into clean, shippable systems.",
    icon: "brain",
  },
  {
    id: "clean-scalable-code",
    order: 1,
    published: true,
    title: "Clean & Scalable Code",
    description: "Architectures that grow with your business — no tech debt traps.",
    icon: "layers",
  },
  {
    id: "fast-learner",
    order: 2,
    published: true,
    title: "Fast Learner",
    description: "I pick up new stacks and domains quickly, with strong fundamentals.",
    icon: "rocket",
  },
  {
    id: "ux-first",
    order: 3,
    published: true,
    title: "User Experience First",
    description: "Every interaction is designed to feel intuitive and effortless.",
    icon: "pointer",
  },
  {
    id: "modern-web-tech",
    order: 4,
    published: true,
    title: "Modern Web Tech",
    description: "React, Next.js, TypeScript, Django, PostgreSQL — and always evolving.",
    icon: "cpu",
  },
  {
    id: "system-architecture",
    order: 5,
    published: true,
    title: "System Architecture",
    description: "Strong understanding of multi-tenant, role-based, and real-time systems.",
    icon: "network",
  },
];

export const defaultSkillGroups: SkillGroup[] = [
  {
    id: "frontend",
    order: 0,
    title: "Frontend",
    items: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "HTML5",
      "CSS3",
      "Bootstrap",
    ],
  },
  {
    id: "backend",
    order: 1,
    title: "Backend",
    items: ["Node.js", "Express.js", "JavaScript", "Django"],
  },
  {
    id: "database",
    order: 2,
    title: "Database",
    items: ["PostgreSQL", "MySQL", "SQLite"],
  },
  {
    id: "tools",
    order: 3,
    title: "Tools & Platforms",
    items: ["Git & GitHub", "Postman", "Docker", "Firebase", "Vercel", "Netlify"],
  },
  {
    id: "ui-ux",
    order: 4,
    title: "UI/UX & Design",
    items: ["Figma", "Responsive Design", "Dashboard Design", "Animation Libs", "Modern Web UI"],
  },
];

export const defaultSkillBars: SkillBar[] = [
  { id: "react-next", order: 0, label: "React / Next.js", value: 94 },
  { id: "typescript", order: 1, label: "TypeScript", value: 88 },
  { id: "node-express", order: 2, label: "Node.js / Express", value: 86 },
  { id: "postgresql", order: 3, label: "PostgreSQL", value: 82 },
  { id: "ui-ux-design", order: 4, label: "UI/UX Design", value: 78 },
];

export const defaultTestimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    order: 0,
    published: true,
    quote:
      "Muaz delivers modern and functional systems with excellent UI design and strong backend logic.",
    author: "Client",
  },
  {
    id: "testimonial-2",
    order: 1,
    published: true,
    quote: "Very dedicated developer with strong attention to detail and performance.",
    author: "Client",
  },
];
