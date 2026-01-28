# Copilot Instructions — 365 Evergreen React App

Overview
- SPA: React + TypeScript built with Vite. App entry: [src/App.tsx](src/App.tsx#L1).
- UI: component-driven under [src/components](src/components) using CSS Modules (*.module.css) and local state only — avoid adding global state.
- Theming: [`src/fluent-theme.ts`](src/fluent-theme.ts#L1) centralizes Fluent UI tokens.

Data & integrations
- WPGraphQL: queries/hooks live in `src/lib/` (examples: `useSiteFeatures.ts`, `usePageBySlug.ts`). Treat responses as WPGraphQL shapes and map to `Raw*` interfaces.
- Azure Blob: static JSON is fetched by hooks like `useAllAzureAccordions.ts` and `useFeatureButtons.ts`. Handlers accept multiple payload shapes (array, { body: [...] }, or single object).
- Local static fixtures: top-level JSON files (e.g., `page-components.json`, `feature-buttons.json`) are used as fallbacks/mocks during development.

Developer workflows (commands found in `package.json`)
- Start dev server (Vite HMR): `pnpm dev`
- Build: `pnpm build` (runs `tsc -b` then `vite build`)
- Preview production build: `pnpm preview`
- Lint: `pnpm lint`
- Type-check only: `tsc -b`

Project conventions for code changes
- Components: `src/components/MyName.tsx` with styles `src/MyName.module.css`.
- Hooks: place API/data logic in `src/lib/` and export small, typed hooks. Use `Raw*` suffix for fetched DTO types.
- No global state libraries: prefer prop-drilling or local hooks. If cross-cutting state is needed, document rationale in `docs/` first.
- Accessibility: follow existing patterns (ARIA attributes, keyboard handling). Run manual checks for interactive components (accordions, drawers).

Key files to inspect when making changes
- `src/App.tsx` — app initialization and routing.
- `src/components/CopilotChat.tsx` — example AI/Copilot integration pattern.
- `src/lib/useAllAzureAccordions.ts` — blob-fetch fallback patterns.
- `page-components.json` and other root JSON files — content-driven component fixtures.

Testing & validation notes
- There are no automated unit tests in the repo. Validate changes by running `pnpm dev` and exercising UI flows.
- Run `pnpm lint` and `pnpm build` before opening PRs.

PR checklist (minimal)
- Run `pnpm lint` and `pnpm build` locally.
- Keep changes focused and follow component + CSS module pattern.
- Update or add fixtures in root JSON files if new content-driven components are introduced.
- Update docs under `docs/` for any integration changes.

If something is unclear or you want this expanded (examples, code snippets, or more files listed), tell me which area to expand.