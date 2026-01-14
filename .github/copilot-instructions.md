
# Copilot Instructions for 365 Evergreen React App

## Project Architecture
- **SPA Frontend:** React (TypeScript) app built with Vite. No backend; integrates with WordPress (GraphQL) and Azure services for content/workflows.
- **Main entry:** [src/App.tsx](src/App.tsx) orchestrates all UI and layout. Routing is minimal; most flows are single-page.
- **Component pattern:** All UI components in [src/components/](src/components/), each with a matching CSS module in [src/].
- **Theme:** Use [src/fluent-theme.ts](src/fluent-theme.ts) for Fluent UI styling. Avoid inline styles and global CSS except [src/index.css](src/index.css).
- **Data:** Most data is static/local (JSON in root or src/). Dynamic content is fetched from WordPress GraphQL (see [src/lib/useSiteFeatures.ts](src/lib/useSiteFeatures.ts)).
- **Integrations:**
  - **WordPress:** Content via GraphQL ([docs/prd.md](docs/prd.md))
  - **Azure:** Contact form posts to Dataverse via Power Automate ([docs/workflows.md](docs/workflows.md))
  - **Copilot Chat:** [src/components/CopilotChat.tsx](src/components/CopilotChat.tsx) (AI chat UI)

## Communication & State
- **Props-only:** Components communicate strictly via props. No Redux, Zustand, or React Context.
- **Local state only:** All state is local to components.
- **No service abstraction:** Data fetching logic is colocated or in simple hooks (see [src/lib/]).

## Developer Workflows
- **Build:** `pnpm build` (Vite)
- **Dev server:** `pnpm dev` (hot reload)
- **Lint:** `pnpm lint` ([eslint.config.js](eslint.config.js))
- **Type-check:** `pnpm typecheck` (if configured)
- **No tests by default:** See [docs/QA.md](docs/QA.md) for manual/automated testing notes.
- **Accessibility:** Follow ARIA, keyboard navigation, and contrast guidelines ([docs/UI.md](docs/UI.md)).

## Conventions & Patterns
- **TypeScript:** Use `.tsx` for components, `.ts` for logic.
- **Component location:** Place new components in [src/components/], styles in [src/].
- **Theme usage:** Always import and use the Fluent theme from [src/fluent-theme.ts](src/fluent-theme.ts).
- **Assets:** Use [src/assets/] and [public/] for static files.
- **ESLint:** Type-aware linting ([README.md](README.md), [eslint.config.js](eslint.config.js)).
- **Commit messages:** Follow any team guidelines ([docs/ONBOARDING.md](docs/ONBOARDING.md)).

## Integration Points & Examples
- **WordPress GraphQL:** See [src/lib/useSiteFeatures.ts](src/lib/useSiteFeatures.ts) for query pattern.
- **Contact Form:** [src/components/ContactForm.tsx](src/components/ContactForm.tsx) posts to Power Automate (see [docs/workflows.md](docs/workflows.md)).
- **Copilot Chat:** [src/components/CopilotChat.tsx](src/components/CopilotChat.tsx) is the AI chat entry point.
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
- [docs/ONBOARDING.md](docs/ONBOARDING.md): Onboarding/troubleshooting
- [docs/UI.md](docs/UI.md): UI/UX and accessibility
- [docs/prd.md](docs/prd.md): Product requirements/integrations
- [docs/workflows.md](docs/workflows.md): Workflow/automation patterns

---
If conventions or patterns are unclear, ask the user for clarification before making assumptions.