# Project Analysis: accessible-learning (خطوة همة)

> **Analysis Date:** July 6, 2026
> **Repository:** `/home/omar/projects/accessible-learning`

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Directory Structure](#2-directory-structure)
3. [Tech Stack](#3-tech-stack)
4. [Architecture](#4-architecture)
5. [Dependencies](#5-dependencies)
6. [Configuration Files](#6-configuration-files)
7. [Key Files & Modules](#7-key-files--modules)
8. [Testing](#8-testing)
9. [Available Scripts](#9-available-scripts)
10. [Code Patterns & Conventions](#10-code-patterns--conventions)
11. [Observations & Recommendations](#11-observations--recommendations)

---

## 1. Project Overview

| Field | Value |
|-------|-------|
| **Name** | `accessible-learning` (Brand: **خطوة همة** / Khotwat Hemma) |
| **Subtitle** | "Education Without Barriers" |
| **Description** | Arabic-language (RTL) educational platform for learners of all abilities, including those with disabilities. Features personalized learning paths, educational games, community support, and dashboards for 4 user roles. |
| **Version** | `0.0.0` (pre-release) |
| **License** | MIT |
| **Status** | Early-stage prototype (7 commits, no testing, mock data only) |

---

## 2. Directory Structure

```
accessible-learning/
├── .claude/
├── .git/
├── .gitignore
├── .npmrc                          # legacy-peer-deps=true
├── SKILL.md                        # Design system guidelines
├── index.html                      # Entry HTML (ar, RTL)
├── netlify.toml                    # Netlify deployment config
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── dist/                           # Build output
│   ├── assets/                     # Bundled JS, CSS, fonts, images
│   ├── favicon.svg
│   ├── icons.svg
│   └── index.html
├── node_modules/
├── public/
│   ├── favicon.svg
│   └── icons.svg
└── src/
    ├── main.tsx                    # React entry point
    ├── App.tsx                     # Root component with routing
    ├── vite-env.d.ts               # TypeScript declarations
    ├── assets/
    │   ├── fonts/Almarai-Bold.ttf
    │   ├── hero.json               # Lottie animation
    │   ├── hero.png
    │   ├── icons/
    │   ├── typescript.svg
    │   └── vite.svg
    ├── context/
    │   └── ThemeContext.tsx         # Light/dark theme
    ├── styles/
    │   ├── global.css              # Global / base styles
    │   └── variables.css           # CSS custom properties
    ├── utils/
    │   └── messagesStore.ts        # Mock contact messages
    ├── components/
    │   ├── auth/
    │   │   └── AuthForm.tsx
    │   ├── common/                 # (empty)
    │   ├── home/
    │   │   ├── Categories/
    │   │   ├── Community/
    │   │   ├── Contact/
    │   │   ├── courses/
    │   │   ├── Features/
    │   │   ├── Games/
    │   │   ├── Hero/
    │   │   ├── QA/
    │   │   ├── Reviews/
    │   │   └── Subscription/
    │   ├── layout/
    │   │   ├── Footer/
    │   │   └── Navbar/
    │   └── ui/
    │       ├── Button.tsx
    │       ├── Chatbot.tsx
    │       ├── GlassCard.tsx
    │       └── common.module.css
    ├── pages/
    │   ├── AdminDashboard.tsx
    │   ├── AuthPage.tsx
    │   ├── CommunityPage.tsx
    │   ├── GameDetailsPage.tsx
    │   ├── InstructorDashboard.tsx
    │   ├── StudentDashboard.tsx
    │   └── SupportDashboard.tsx
    ├── admin/
    │   ├── index.ts                # Barrel re-exports
    │   ├── layouts/AdminLayout.tsx
    │   └── pages/                  # 21 pages
    ├── instructor/
    │   ├── index.ts                # Barrel re-exports
    │   ├── layouts/InstructorLayout.tsx
    │   └── pages/                  # 11 pages
    ├── student/
    │   ├── index.ts                # Barrel re-exports
    │   ├── layouts/
    │   └── pages/                  # 10 pages
    └── support/
        ├── index.ts                # Barrel re-exports
        ├── layouts/SupportLayout.tsx
        └── pages/                  # 5 pages
```

---

## 3. Tech Stack

### Languages
| Language | Version | Notes |
|----------|---------|-------|
| TypeScript | 5.9.x | Strict mode enabled |
| CSS | -- | CSS Modules + Custom Properties |
| HTML5 | -- | RTL (`dir="rtl"`), `lang="ar"` |

### Frontend
| Library | Version | Purpose |
|---------|---------|---------|
| React | 18.3.1 | UI framework |
| react-router-dom | 7.15.1 | Routing (installed, **not actively used**) |
| framer-motion | 12.38.0 | Animations |
| bootstrap | 5.3.8 | CSS grid & utilities |
| react-icons | 5.6.0 | Icon set (FA) |
| @emotion/react | 11.14.0 | CSS-in-JS (configured as jsxImportSource) |

### 3D & Animation
| Library | Version | Purpose |
|---------|---------|---------|
| three | 0.184.0 | 3D engine |
| @react-three/fiber | 8.18.0 | React renderer for Three.js |
| @react-three/drei | 9.122.0 | Three.js utilities |
| lottie-web | 5.13.0 | Lottie animation player |

### Build Tooling
| Tool | Version | Purpose |
|------|---------|---------|
| Vite | 8.0.14 | Dev server & build |
| @vitejs/plugin-react | 6.0.2 | React plugin |
| @vitejs/plugin-react-oxc | 0.4.3 | Rust-based compiler plugin |
| esbuild | 0.28.0 | Bundler |
| TypeScript | 5.9.3 | Type checking |

---

## 4. Architecture

### Application Shell

```
index.html
  └── <div id="root">
       └── src/main.tsx
            ├── React.StrictMode
            └── ThemeProvider (ThemeContext)
                 └── App.tsx (manual path-based routing)
```

### Routing (src/App.tsx)

The app uses **manual routing** via `window.location.pathname` + `window.history.pushState()` rather than react-router-dom.

| Path | Component | Lazy |
|------|-----------|------|
| `/auth` | `AuthPage` | Yes |
| `/game/:id` | `GameDetailsPage` | Yes |
| `/community` | `CommunityPage` | Yes |
| `/admin/*` | `AdminDashboard` | Yes |
| `/instructor/*` | `InstructorDashboard` | Yes |
| `/support/*` | `SupportDashboard` | Yes |
| `/student/*` | `StudentDashboard` | Yes |
| `/` | Landing page (Hero, Features, Courses, Games, Community, QA, Contact) | No |

### Feature Organization (4 Roles)

| Role | Directory | Pages | Description |
|------|-----------|-------|-------------|
| **Student** | `src/student/` | 10 | Courses, schedule, progress, games, live sessions, notifications, plans, treatment protocols, community |
| **Instructor** | `src/instructor/` | 11 | Home, courses, students, notifications, analytics, live sessions, settings, notes, calendar, salary |
| **Support** | `src/support/` | 5 | Chats, students, docs, settings, analytics |
| **Admin** | `src/admin/` | 21 | Full system administration |

### Data Flow
- **No backend/API** — all data is mock/hardcoded
- **No state management library** — uses `useState`, `useEffect`, and React Context only
- **ThemeContext** persists theme to `localStorage`
- **messagesStore.ts** — simulates CRUD with `console.log`
- **SessionManager.ts** — class-based mock data for sessions/appointments

### Layout Architecture

Each role has a dedicated layout component:
- **StudentLayout** — Sticky horizontal header + mobile drawer sidebar, search bar, theme toggle
- **InstructorLayout** — Fixed sidebar + top header bar
- **SupportLayout** — WhatsApp-style conversation sidebar + header
- **AdminLayout** — Comprehensive sidebar with categorized sections

---

## 5. Dependencies

### Production (`dependencies`)

| Package | Version | Purpose |
|---------|---------|---------|
| `@emotion/react` | ^11.14.0 | CSS-in-JS styling |
| `@react-three/drei` | ^9.122.0 | Three.js helper components |
| `@react-three/fiber` | ^8.18.0 | React renderer for Three.js |
| `bootstrap` | ^5.3.8 | CSS framework |
| `framer-motion` | ^12.38.0 | Animation library |
| `lottie-web` | ^5.13.0 | Lottie animation player |
| `react` | 18.3.1 | UI library (peer of react-dom) |
| `react-dom` | 18.3.1 | React DOM renderer |
| `react-icons` | ^5.6.0 | Icon library |
| `react-router-dom` | ^7.15.1 | Client-side routing |
| `three` | ^0.184.0 | 3D engine |

### Dev Dependencies (`devDependencies`)

| Package | Version | Purpose |
|---------|---------|---------|
| `@types/react` | ^18.3.28 | React type definitions |
| `@types/react-dom` | ^18.3.7 | ReactDOM type definitions |
| `@vitejs/plugin-react` | ^6.0.2 | Vite React plugin |
| `@vitejs/plugin-react-oxc` | ^0.4.3 | Rust-based compiler plugin |
| `esbuild` | ^0.28.0 | JavaScript bundler |
| `typescript` | ^5.9.3 | TypeScript compiler |
| `vite` | ^8.0.14 | Build tool |

---

## 6. Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Project metadata, scripts, dependencies |
| `tsconfig.json` | TS strict mode, JSX with emotion, bundler resolution |
| `tsconfig.node.json` | TS config for Vite config file (composite reference) |
| `vite.config.ts` | Vite config: React plugin, base path `/` |
| `netlify.toml` | Netlify deployment: SPA redirect (all paths → `index.html`) |
| `.gitignore` | Ignored: `node_modules`, `dist`, logs, editor files |
| `.npmrc` | `legacy-peer-deps=true` |
| `SKILL.md` | Design system guidelines (Lingo-inspired, accessibility-focused) |

---

## 7. Key Files & Modules

### Entry Points
| File | Role |
|------|------|
| `index.html` | HTML shell: `lang="ar"`, `dir="rtl"`, inline theme detection |
| `src/main.tsx` | React root — renders `App` inside `StrictMode` + `ThemeProvider` |
| `src/App.tsx` | Root component — manual path-based routing to all pages |

### Context
| File | Role |
|------|------|
| `src/context/ThemeContext.tsx` | Light/dark theme with `localStorage` persistence |

### Styles
| File | Role |
|------|------|
| `src/styles/variables.css` | CSS custom properties: colors, spacing, typography, light/dark variants |
| `src/styles/global.css` | Base styles: font-face, body, scrollbar, reduced-motion support |
| `src/components/ui/common.module.css` | Shared UI component styles (Button variants) |

### Home Page Components
| Component | Description |
|-----------|-------------|
| `Hero.tsx` + `ThreeJSHero.tsx` | Full-screen hero with Arabic typewriter effect, 3D wheelchair particle scene |
| `Features.tsx` + `DisabilityTypes.tsx` | 4 feature cards + interactive accessibility accordion |
| `RecommendedCourses.tsx` + `CourseCard.tsx` | Horizontal scrollable course carousel |
| `GamesShowcase.tsx` + `GameCard.tsx` | 4-game grid showcase |
| `Community.tsx` | Stats display, CTA, avatar stack |
| `QA.tsx` | Accordion FAQ (6 items) |
| `Navbar.tsx` | Fixed navbar: scroll-aware background, progress bar, mobile menu |
| `Footer.tsx` | 4-column footer: social, legal, WCAG note |

### Dashboard Pages
| File | Type | Pages Managed |
|------|------|---------------|
| `src/pages/StudentDashboard.tsx` | Controller | 10 sub-pages |
| `src/pages/InstructorDashboard.tsx` | Controller | 10 sub-pages |
| `src/pages/SupportDashboard.tsx` | Controller | 5 sub-pages |
| `src/pages/AdminDashboard.tsx` | Controller | 20+ sub-pages |

### Other Pages
| File | Purpose |
|------|---------|
| `src/pages/AuthPage.tsx` | Login/Register wrapper |
| `src/pages/CommunityPage.tsx` | Full social community (posts, likes, comments, image upload) |
| `src/pages/GameDetailsPage.tsx` | Game detail view with tabs (overview, skills, dev, reviews) |

### Reusable UI
| Component | Props | Features |
|-----------|-------|----------|
| `Button.tsx` | `variant`, `size`, `fullWidth`, `iconOnly` | ForwardRef, 3D tactile borders |
| `GlassCard.tsx` | `hoverEffect`, `glowEffect`, `as` | ForwardRef, glassmorphism |
| `Chatbot.tsx` | — | Floating assistant with TTS, expandable sections |

### Data Stores
| File | Content |
|------|---------|
| `src/utils/messagesStore.ts` | Mock CRUD for 5 contact messages |
| `src/instructor/pages/SessionManager.ts` | Class-based store for 5 sessions + 5 appointments |

---

## 8. Testing

**Status: ❌ No testing infrastructure exists.**

- No test runners (Vitest, Jest, etc.) in dependencies
- No test files (`.test.*`, `.spec.*`) anywhere
- No test configuration
- No testing scripts in `package.json`

---

## 9. Available Scripts

| Script | Command | Status |
|--------|---------|--------|
| `npm run dev` | `vite` | ✅ Works |
| `npm run build` | `tsc && vite build` | ✅ Works (type-check + build) |
| `npm run preview` | `vite preview` | ✅ Works |
| `npm run lint` | `eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0` | ❌ **Broken** — ESLint not installed |

---

## 10. Code Patterns & Conventions

### Naming
| Pattern | Convention | Examples |
|---------|-----------|---------|
| Components | PascalCase | `StudentLayout`, `GameCard` |
| Files | PascalCase (components), camelCase (utils) | `Button.tsx`, `messagesStore.ts` |
| CSS Modules | `*.module.css` | `common.module.css` |
| Layouts | `*Layout.tsx` | `AdminLayout.tsx` |
| Pages | `*Page.tsx` or descriptive | `AuthPage.tsx`, `StudentCoursesPage.tsx` |
| Barrel files | `index.ts` | `src/admin/index.ts` |

### Component Architecture
- Functional components with hooks only
- Props interface defined above component
- Default exports for all components
- `forwardRef` on reusable primitives
- No `React.memo` usage

### Styling
- **CSS Modules** (`*.module.css`) for scoped styles
- **CSS Custom Properties** (`variables.css`) for design tokens
- **Inline styles** used extensively in dashboards
- **Bootstrap utility classes** (`d-flex`, `row`, `col-*`, `btn`)
- **Framer Motion** for animations (`motion.div`, `whileInView`)

### Accessibility
- Skip-to-content link (`#main-content`)
- `aria-label`, `aria-current="page"`, `aria-expanded`
- `role` attributes (tablist, progressbar)
- `sr-only` class for screen-reader-only text
- Semantic HTML (`<nav>`, `<main>`, `<section>`, `<footer>`)
- WCAG 2.1 AA compliance mentioned in footer
- `prefers-reduced-motion` respected
- Focus ring CSS variable
- ResponsiveVoice TTS integration

### State Management
- **React Context**: ThemeContext (light/dark mode)
- **useState**: Component-local state
- **useEffect**: Side effects (scroll, path sync)
- No Redux, Zustand, or external state library

### Routing (Custom Implementation)
- `window.location.pathname` checks
- `window.history.pushState()` for navigation
- `popstate` listener for back/forward buttons
- `React.lazy()` for route-based code splitting

### RTL / Arabic
- `dir="rtl"` on `<html>`
- All UI text in Arabic
- Icons flipped with `transform: rotate(180deg)` where needed

### Mock Data Pattern
- Defined as `const` arrays/objects in-component or separate files
- No real API calls
- CRUD operations log to console only

---

## 11. Observations & Recommendations

### Critical Issues
| Issue | Severity | Recommendation |
|-------|----------|---------------|
| No testing setup | 🔴 High | Add Vitest + React Testing Library |
| `lint` script broken (ESLint missing) | 🟡 Medium | Install ESLint + React plugin, or remove script |
| react-router-dom installed but not used | 🟡 Medium | Either migrate to react-router or remove dependency |
| No error boundaries | 🟡 Medium | Add React error boundaries around dashboards |
| `common/` directory empty | 🟢 Low | Remove or populate |

### Architecture Suggestions
| Observation | Recommendation |
|-------------|---------------|
| Manual routing is fragile | Migrate to react-router-dom for standard SPA routing |
| No API layer | Create service/API abstraction layer |
| Mock data scattered across files | Centralize mock data in a `data/` directory |
| Inline styles in dashboards | Extract to CSS Modules for consistency |
| No TypeScript strict checks on some files | Ensure `strict: true` catches all issues |

### Potential Improvements
- Add a proper state management solution (Zustand or Context)
- Implement test infrastructure as a priority
- Create a shared types directory (`src/types/`)
- Add CI/CD pipeline configuration
- Implement responsive design testing
- Consider i18n for future multi-language support
- Add loading skeletons / placeholders for lazy-loaded routes
- Create Storybook for UI component documentation
- Add proper form validation (react-hook-form or similar)

### Feature Completeness
- **Landing page**: Well-developed with animations, 3D, accessibility features
- **Student dashboard**: Most complete role with 10 pages
- **Instructor dashboard**: Moderate completeness
- **Support dashboard**: Minimal (5 pages), but well-designed
- **Admin dashboard**: Most extensive (21 pages), but many are stubs
- **Authentication**: Auth UI exists but no real auth logic
- **Data persistence**: None — all data resets on refresh
