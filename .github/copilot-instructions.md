

# Copilot Instructions for 365 Evergreen React App

## Overview & Architecture
- **Stack:** React (TypeScript), Vite, CSS Modules, Fluent UI theme
- **SPA:** No routing; all logic flows through [src/App.tsx](src/App.tsx) and its children
- **Component Structure:** All UI components in [src/components/](src/components/), each with a matching CSS module in [src/](src/)
- **Theme:** Use [src/fluent-theme.ts](src/fluent-theme.ts) for all UI styling; do not use inline styles or global CSS except [src/index.css](src/index.css)
- **Data:** No backend/API by default; all data is local or static unless you add your own logic

## Communication & Patterns
- **Props-only:** Components communicate strictly via props; no Redux, Zustand, or React Context
- **No global state:** All state is local to components
- **No service abstraction:** Data fetching logic is not present; add your own if needed
- **No React Compiler:** Not enabled (see [README.md](README.md))

## Developer Workflows
- **Build:** `pnpm build` (Vite)
- **Dev server:** `pnpm dev` (hot reload)
- **Lint:** `pnpm lint` (see [eslint.config.js](eslint.config.js))
- **Type-check:** `pnpm typecheck` (if configured)
- **No tests:** No test setup by default

## Conventions & Practices
- **TypeScript:** Use `.tsx` for components, `.ts` for logic
- **Component location:** Place new components in [src/components/](src/components/) and styles in [src/](src/)
- **Theme usage:** Always import and use the Fluent theme from [src/fluent-theme.ts](src/fluent-theme.ts)
- **Assets:** Use [src/assets/](src/assets/) and [public/](public/) for static files
- **ESLint:** Type-aware linting recommended; see [README.md](README.md) for config

## Integration Points
- **External dependencies:** Managed in [package.json](package.json), installed with pnpm
- **No API/service layer:** All data is local/static unless you add your own

## Examples
- **Add a feature section:**
  1. Create [src/components/NewFeature.tsx](src/components/NewFeature.tsx) and [src/NewFeature.css](src/NewFeature.css)
  2. Import and use in [src/App.tsx](src/App.tsx)
- **Update theme:** Edit [src/fluent-theme.ts](src/fluent-theme.ts) and re-import in components

## Key Files
- [src/App.tsx](src/App.tsx): Main app logic and layout
- [src/components/](src/components/): All UI components
- [src/fluent-theme.ts](src/fluent-theme.ts): Theme definitions
- [eslint.config.js](eslint.config.js): Linting rules
- [README.md](README.md): Project setup and conventions

---
If conventions or patterns are unclear, ask the user for clarification before making assumptions.