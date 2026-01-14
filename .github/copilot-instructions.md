# Copilot Instructions for 365 Evergreen React App

## Architecture & Data Flow
- **Frontend only:** React (TypeScript) SPA built with Vite. No backend by default; integrates with WordPress (via GraphQL) and Azure services for content and workflows.
- **Main entry:** [src/App.tsx](src/App.tsx) orchestrates all UI logic and layout. Routing is minimal; most flows are single-page.
- **Component pattern:** All UI components live in [src/components/](src/components/), each with a matching CSS module in [src/].
- **Theme:** Use [src/fluent-theme.ts](src/fluent-theme.ts) for Fluent UI styling. Avoid inline styles and global CSS except [src/index.css](src/index.css).
- **Data:** Most data is static/local (JSON files in root or src/). For dynamic features, add your own API logic.
- **External integrations:** Azure Static Web Apps for hosting; WordPress for content (see [docs/prd.md](docs/prd.md)).

## Communication & State
- **Props-only:** Components communicate strictly via props. No Redux, Zustand, or React Context.
- **Local state:** All state is local to components. No global state management.
- **No service abstraction:** Data fetching logic is not present by default; add your own if needed.

## Developer Workflows
- **Build:** `pnpm build` (Vite)
- **Dev server:** `pnpm dev` (hot reload)
- **Lint:** `pnpm lint` (see [eslint.config.js](eslint.config.js))
- **Type-check:** `pnpm typecheck` (if configured)
- **No tests by default:** See [docs/QA.md](docs/QA.md) for manual/automated testing notes.
- **Accessibility:** Follow ARIA, keyboard navigation, and contrast guidelines ([docs/UI.md](docs/UI.md)).

## Conventions & Patterns
- **TypeScript:** Use `.tsx` for components, `.ts` for logic.
- **Component location:** Place new components in [src/components/](src/components/) and styles in [src/].
- **Theme usage:** Always import and use the Fluent theme from [src/fluent-theme.ts](src/fluent-theme.ts).
- **Assets:** Use [src/assets/](src/assets/) and [public/](public/) for static files.
- **ESLint:** Type-aware linting recommended; see [README.md](README.md) and [eslint.config.js](eslint.config.js).
- **Commit messages:** Follow any team guidelines if present ([docs/ONBOARDING.md](docs/ONBOARDING.md)).

## Integration Points
- **External dependencies:** Managed in [package.json](package.json), installed with pnpm.
- **WordPress content:** Consumed via GraphQL (see [docs/prd.md](docs/prd.md)).
- **Azure workflows:** Contact form posts to Dataverse via Power Automate ([docs/workflows.md](docs/workflows.md)).
- **Copilot chat:** [src/components/CopilotChat.tsx](src/components/CopilotChat.tsx) is the entry for AI chat integration.

## Examples
- **Add a feature section:**
  1. Create [src/components/NewFeature.tsx](src/components/NewFeature.tsx) and [src/NewFeature.css](src/NewFeature.css)
  2. Import and use in [src/App.tsx](src/App.tsx)
- **Update theme:** Edit [src/fluent-theme.ts](src/fluent-theme.ts) and re-import in components.
- **Add a workflow:** Document in [docs/workflows.md](docs/workflows.md) and update relevant UI/component.

## Key Files & Docs
- [src/App.tsx](src/App.tsx): Main app logic and layout
- [src/components/](src/components/): All UI components
- [src/fluent-theme.ts](src/fluent-theme.ts): Theme definitions
- [eslint.config.js](eslint.config.js): Linting rules
- [README.md](README.md): Project setup and conventions
- [docs/ONBOARDING.md](docs/ONBOARDING.md): Onboarding and troubleshooting
- [docs/UI.md](docs/UI.md): UI/UX and accessibility
- [docs/prd.md](docs/prd.md): Product requirements and integrations
- [docs/workflows.md](docs/workflows.md): Workflow and automation patterns

---
If conventions or patterns are unclear, ask the user for clarification before making assumptions.


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