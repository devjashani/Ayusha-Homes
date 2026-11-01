# AYUSHA – Health that Travels with You

> **Investor Concept & Pilot Showcase SPA**  
> "Your health record shouldn't stop at the border."

AYUSHA is the **continuity layer** around medical records for frequent travelers, expats, international students, and families with complex medical histories. Rather than attempting to replace disparate hospital EHRs, AYUSHA operates as an active, federated coordination bridge connecting systems across cities, borders, and emergency corridors.

---

## 🌟 Tech Stack & Architecture

- **Framework**: [React 18](https://react.dev/) + [Vite](https://vite.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with curated CSS design tokens (`--brand`, `--brand-2`, `--ink`, `--muted`, `--tint`, `--line`, etc.)
- **Animations & Motion**: [`motion`](https://motion.dev/) (Framer Motion v12) + [`lenis`](https://github.com/darkroomengineering/lenis) (Smooth Inertial Scrolling)
- **Icons**: [`lucide-react`](https://lucide.dev/)
- **Form Validation**: [`react-hook-form`](https://react-hook-form.com/) + [`zod`](https://zod.dev/)
- **Typography**: Self-hosted [`@fontsource/fraunces`](https://fontsource.org/fonts/fraunces) (Display Serif) & [`@fontsource/inter`](https://fontsource.org/fonts/inter) (Interface Sans)
- **Architecture**: Single Page Application (SPA), zero external routing dependencies, section-anchored smooth scrolling with `useScrollSpy` and active navigation layout lozenges.

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.0.0 (Tested on Node v22.15.0)
- npm >= 9.0.0

### Installation
```bash
# Clone or navigate into the project directory
cd Ayusha-Home

# Install dependencies
npm install
```

### Running Locally in Development
```bash
npm run dev
```
The application will launch locally at `http://127.0.0.1:5173/`.

### Production Build & Type Checking
```bash
npm run build
```
Builds optimized, minified production assets into the `dist/` folder.

### Local Production Preview
```bash
npm run preview
```

---

## ☁️ Deployment

### Vercel Deployment
1. Connect your repository to [Vercel](https://vercel.com/).
2. Framework Preset: **Vite**
3. Build Command: `npm run build`
4. Output Directory: `dist`

### Netlify Deployment
1. Connect repository to [Netlify](https://netlify.com/).
2. Build Command: `npm run build`
3. Publish Directory: `dist`

---

## 🎨 Liquid Glass Engine & Design System

The custom `<GlassPanel>` engine implements:
1. **Multi-layer Glassmorphism**: `backdrop-filter: blur(20px) saturate(175%) brightness(1.04)` over a soft aqua-to-ice gradient mesh with 4 drifting blurred ambient color orbs.
2. **Specular Light Cursor Tracking**: Dynamic CSS variables `--mx` and `--my` calculated via `requestAnimationFrame`-throttled pointer movements, casting a directional radial glare on hover (with a gentle idle loop fallback on touch screens).
3. **Card Tilt Engine**: 3D perspective transforms with a subtle ±5° tilt towards the cursor.
4. **Liquid Refraction**: Chromium SVG displacement filter (`feTurbulence` + `feDisplacementMap` + `feGaussianBlur`) mapped via `#liquid-glass` with automatic graceful fallback on Safari/Firefox.
5. **Accessibility Fallbacks**: Full support for `prefers-reduced-transparency` and `prefers-contrast: more` (switches to high-contrast opaque cards), as well as `prefers-reduced-motion`.

---

## 🛠️ What to Customize

### 1. All Copy and Content
All site copy, sourced stats, founder information, and clinical boundaries live strictly in:
👉 [`src/data/content.ts`](file:///Users/devjashani/Hollow%20Energy/src/lib/auth/Ayusha-Home/src/data/content.ts)
Modify headings, card descriptions, milestones, or metrics without touching JSX or markup.

### 2. Design Tokens & Palette
Color tokens and typography rules are defined in:
👉 [`src/styles/index.css`](file:///Users/devjashani/Hollow%20Energy/src/lib/auth/Ayusha-Home/src/styles/index.css) & [`src/styles/themes.ts`](file:///Users/devjashani/Hollow%20Energy/src/lib/auth/Ayusha-Home/src/styles/themes.ts)
- Source Palette: Sky Blue `#4391C6`, Soft Azure `#63A4CE`, Deep Lake Blue `#336E87`, Turquoise Teal `#549A98`, Sage Green `#7EA294`, Granite Grey `#B5BEBA`, Charcoal Slate `#344546`
- Global Tokens: `--ink: #1B2829`, `--muted: #4F6264`, `--on-dark: #EEF3F2`, `--on-dark-muted: #B5BEBA`, `--brand: #336E87`, `--brand-hover: #2D6177`, `--brand-soft: #4391C6`

### 3. Supabase Integration
Form submissions (both the "Join the pilot" registration and "Talk to us" inquiry) are handled in:
👉 [`src/lib/submitWaitlist.ts`](file:///Users/devjashani/Hollow%20Energy/src/lib/auth/Ayusha-Home/src/lib/submitWaitlist.ts) & [`src/lib/supabase.ts`](file:///Users/devjashani/Hollow%20Energy/src/lib/auth/Ayusha-Home/src/lib/supabase.ts)
Submissions are inserted directly into the `public.submissions` table with client-side validation, anti-spam safeguards (honeypot, mount-timing checks), and deduplication handling.

---

## 🔐 Supabase setup

1. **Database Schema**: Run `supabase/schema.sql` in the Supabase SQL Editor to create the `public.submissions` table, index, and row-level security policy.
2. **Local Environment**: Copy `.env.example` to `.env.local` and fill in both values:
   ```bash
   cp .env.example .env.local
   ```
   Add your credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
3. **Vercel Deployment**: In Vercel, go to **Settings** > **Environment Variables**, add the same two variables (`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`) for **Production**, **Preview**, and **Development**, then redeploy.

---

## 🎛️ Admin Dashboard

A secure, unlinked management dashboard is available at `/admin` for viewing, searching, filtering, annotating, and exporting pilot & investor submissions.

Follow these 5 steps to configure and access the dashboard:
1. **Create the owner user in Supabase Auth**: In the Supabase dashboard, go to **Authentication** > **Users** > click **Add user** (enter your email and a strong password, and check "Auto Confirm User").
2. **Disable sign-ups**: Go to **Authentication** > **Providers** > **Email**, and turn **"Allow new users to sign up" = OFF** to prevent public registrations.
3. **Put the owner email into `/supabase/admin.sql`**: Open [`supabase/admin.sql`](supabase/admin.sql) and replace `'OWNER_EMAIL_HERE'` with your exact Supabase Auth email.
4. **Run `/supabase/admin.sql` in the Supabase SQL Editor**: Execute the script to create the `admin_users` table, install the `is_admin()` security definer function, configure row-level security policies (SELECT, UPDATE, DELETE for admins only), and enable realtime replication.
5. **Navigate to `/admin` in the browser and sign in**: Go to `http://localhost:5173/admin` (or `https://your-domain.com/admin`) and sign in with your credentials.

---

## 🛡️ Clinical & Legal Safety Boundary
AYUSHA supports identification, information, routing, and notification. Qualified clinicians and local emergency services make all medical decisions. Steps 1–5 are AYUSHA's domain; step 6 sits outside our system by design.
