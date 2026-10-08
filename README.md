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
👉 [`src/styles/index.css`](file:///Users/devjashani/Hollow%20Energy/src/lib/auth/Ayusha-Home/src/styles/index.css)
- Primary Brand: `--brand: #1E6FA8`
- Secondary Cyan: `--brand-2: #4FA8E0`
- Teal Accent: `--teal-accent: #6FC7C9`
- Deep Ink: `--ink: #15202B`
- Soft Tint: `--tint: #E7F3FB`

### 3. Production Waitlist API
The waitlist submission stub lives in:
👉 [`src/lib/submitWaitlist.ts`](file:///Users/devjashani/Hollow%20Energy/src/lib/auth/Ayusha-Home/src/lib/submitWaitlist.ts)
Currently logs submissions to `console` and saves them to `localStorage`. Replace the stub with your backend REST endpoint or serverless function (`fetch('/api/waitlist', ...)`).

---

## 🛡️ Clinical & Legal Safety Boundary
AYUSHA supports identification, information, routing, and notification. Qualified clinicians and local emergency services make all medical decisions. Steps 1–5 are AYUSHA's domain; step 6 sits outside our system by design.
