# Stellar Dev Portfolio

i wanna you to use these two designs and build for me good and cool portfolio. the content of my portfolio should be this one: # Hero Section

## Hi, I’m Muaz Kedir

### Full-Stack Developer | SaaS Builder | UI/UX Enthusiast

I build modern, scalable, and user-focused web applications with clean design and powerful functionality. I enjoy transforming ideas into real digital products — from school systems and auction platforms to SaaS solutions and management dashboards.

I focus on creating systems that are fast, responsive, secure, and easy to use.

---

# About Me

I am a passionate software developer who enjoys solving real-world problems using technology. I specialize in building full-stack web applications with modern frameworks and scalable architectures.

I have experience developing:

- Multi-tenant SaaS platforms
- School management systems
- Online bidding & auction systems
- Dashboard & admin panels
- Payment integrations
- Scheduling & management systems

I continuously learn new technologies and improve my skills in backend development, frontend design, system architecture, and user experience.

---

# Skills

## Frontend

- React.js
- Next.js
- JavaScript
- TypeScript
- HTML5
- CSS3
- Tailwind CSS
- Bootstrap

## Backend

- JavaScript
- Node.js
- Express.js

## Database

- PostgreSQL
- MySQL
- SQLite

## Tools & Platforms

- Git & GitHub
- Postman
- Docker
- Firebase
- Vercel
- Netlify

## UI/UX & Design

- Figma
- Responsive Design
- Dashboard Design
- Animation Libraries
- Modern Web UI

---

# Featured Projects

## Multi-Cafeteria SaaS Platform

A SaaS-based cafeteria management platform where a super admin can manage multiple cafeteria admins. Each cafeteria has its own dashboard for menus, orders, blogs, and customer management.

### Features

- Multi-tenancy architecture
- Role-based authentication
- Order management
- Blog management
- Admin hierarchy
- Responsive dashboard UI

### Technologies

React, Django REST Framework, PostgreSQL, Tailwind CSS

---

## Online Auction & Bidding Platform

A modern auction platform with live bidding, wallet system, escrow payments, dispute management, and winner celebration UI.

### Features

- Real-time bidding
- Wallet management
- Escrow payment flow
- Dispute handling
- Animated winner celebration
- Multi-language support

### Technologies

React, Django, PostgreSQL, Anime.js, Tailwind CSS

---

## School Management System

A complete school management platform designed for administrators, teachers, students, and parents.

### Features

- Student management
- Schedule management
- Attendance tracking
- Assignment system
- Parent dashboard
- Teacher portal

### Technologies

Django REST Framework, React, PostgreSQL

---

## Nejah Online Quran Learning System

An online Quran learning platform designed for managing students, teachers, classes, schedules, and online learning activities.

### Features

- Student registration
- Teacher management
- Live class scheduling
- Learning progress tracking
- Responsive dashboard

### Technologies

React, Django, PostgreSQL

---

# Experience

## Freelance Full-Stack Developer

Worked on multiple web-based systems and SaaS platforms focusing on scalable backend systems, responsive frontend interfaces, and clean user experiences.

### Responsibilities

- Building APIs
- Creating responsive dashboards
- Database architecture
- Authentication systems
- UI/UX implementation
- Deployment & hosting

---

# Why Work With Me?

- Strong problem-solving mindset
- Clean and scalable code
- Fast learner
- Focused on user experience
- Passionate about modern web technologies
- Good understanding of system architecture

---

# Testimonials

> “Muaz delivers modern and functional systems with excellent UI design and strong backend logic.”

> “Very dedicated developer with strong attention to detail and performance.”

---

# Contact Section

## Let’s Build Something Amazing Together

- Email: [muaz@example.com](mailto:muaz@example.com)
- GitHub: github.com/yourusername
- LinkedIn: linkedin.com/in/yourusername
- Portfolio: yourportfolio.com

---

# Short Bio Version

Full-stack developer passionate about building scalable SaaS platforms, modern dashboards, and user-friendly web applications using React, Django, and PostgreSQL. Experienced in developing management systems, auction platforms, and responsive UI/UX solutions.

## Tech stack

- **React + Vite** single-page app (no SSR)
- **React Router** for routing (`/` portfolio, `/admin` dashboard)
- **TanStack Query** for data fetching and caching
- **Tailwind CSS v4** + shadcn/ui components
- **Firebase** — Auth (admin login) and Firestore (content database)
- **Cloudinary** — image storage, uploaded through a signed Cloudflare Pages Function
- **Cloudflare Pages** — static hosting + Functions

## Local development

You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
cp .env.example .env   # then fill in your Firebase values
npm run dev
```

The portfolio works without any configuration (it falls back to the bundled default
content in `src/lib/content/defaults.ts`). The dashboard requires Firebase.

To test Cloudinary uploads locally, run the app through the Cloudflare dev server so the
Pages Function is available:

```sh
cp .dev.vars.example .dev.vars   # fill in Cloudinary secrets
npm run build
npx wrangler pages dev dist
```

## 1. Firebase setup

1. Create a project at https://console.firebase.google.com.
2. **Build → Authentication → Get started**, then enable **Email/Password**.
3. In **Users**, add your admin user (email + password). Copy the email.
4. **Build → Firestore Database → Create database**.
5. **Project settings → Your apps → Web app** and copy the config values into `.env`
   (`VITE_FIREBASE_*`).
6. Deploy the rules and lock the admin email:
   ```sh
   # edit firestore.rules and replace "you@example.com" with your admin email
   npx firebase-tools deploy --only firestore:rules
   ```

### Collections

| Collection                  | Contents                                 |
| --------------------------- | ---------------------------------------- |
| `site/main`                 | Hero, about, experience and contact copy |
| `projects`                  | Project cards                            |
| `features`                  | "Why Work With Me" cards                 |
| `skillGroups` / `skillBars` | Tech stack groups and proficiency bars   |
| `testimonials`              | Client quotes                            |

If a collection is empty, the site shows the bundled defaults and the dashboard lets you
edit them; saving writes them to Firestore.

## 2. Cloudinary setup

1. Create an account at https://cloudinary.com and note your **cloud name**, **API key**
   and **API secret**.
2. Put the cloud name in `.env` (`VITE_CLOUDINARY_CLOUD_NAME`).
3. Add the secrets as Cloudflare Pages environment variables (and `.dev.vars` locally):
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
   - `FIREBASE_WEB_API_KEY` (optional, but recommended — enables token checks on the sign endpoint)
   - `ALLOWED_ADMIN_EMAIL` (optional — restricts signing to one admin email)

Uploads are signed server-side by `functions/api/cloudinary/sign.ts`; the API secret is
never exposed to the browser.

## 3. Deploying to Cloudflare Pages

- **Build command**: `npm run build`
- **Output directory**: `dist`
- Add the `VITE_FIREBASE_*` and `VITE_CLOUDINARY_CLOUD_NAME` variables to the build
  environment (they are public and baked into the client bundle).
- Add the Cloudinary secrets as encrypted environment variables (server-only).
- Add your Pages domain to Firebase **Authentication → Settings → Authorized domains**.
- `public/_redirects` already configures the SPA fallback.

## Admin dashboard

Visit `/admin` and sign in with the Firebase email/password account. From there you can
create, edit, reorder, publish/unpublish and delete projects, features, skills,
testimonials, and edit all site copy.
