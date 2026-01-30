```markdown
# Copilot Instructions — 365 Evergreen React App

Overview
- SPA: React + TypeScript built with Vite. App entry: [src/App.tsx](src/App.tsx#L1).
- UI: component-driven under [src/components](src/components#L1) using CSS Modules (*.module.css). Prefer local state and prop-drilling; avoid adding global state libraries.
- Theming: [src/fluent-theme.ts](src/fluent-theme.ts#L1) centralizes Fluent UI tokens and color tokens used across components.

Data & integrations
- WPGraphQL: network queries and mapping live in `src/lib/`. See [src/lib/useSiteFeatures.ts](src/lib/useSiteFeatures.ts#L1) and [src/lib/usePageBySlug.ts](src/lib/usePageBySlug.ts#L1). Hook outputs commonly use `Raw*` DTO suffixes — map to UI models inside hooks or small adapters.
- Azure Blob storage: static JSON is consumed by hooks (example: [src/lib/useAllAzureAccordions.ts](src/lib/useAllAzureAccordions.ts#L1)). Hooks are written to accept multiple payload shapes (array, `{ body: [...] }`, or a single object). Keep that tolerant parsing when adding new blob consumers.
- Local fixtures: root JSON files such as [page-components.json](page-components.json#L1) and [feature-buttons.json](feature-buttons.json#L1) are used as development fallbacks and should be updated when adding new content-driven components.

Developer workflows
- Start dev server (Vite HMR): `pnpm dev` — rapid iteration and UI debugging.
- Build: `pnpm build` — runs `tsc -b` then `vite build` (this surfaces TypeScript/bundle errors like CI).
- Preview production build: `pnpm preview`.
- Lint: `pnpm lint`.
- Type-check only: `tsc -b`.

Debugging notes
- Use `pnpm dev` + browser devtools for UI issues. Run `pnpm build` to reveal TypeScript/build errors that HMR may hide.

Codebase conventions (follow these exactly)
- Components: Place component files in `src/components/` as `MyName.tsx` and the component-specific styles in `src/MyName.module.css`.
- Hooks & data: Keep API/data logic in `src/lib/` and expose small, typed hooks. Use `Raw*` suffixes for fetched DTO types.
- No global state libs: Prefer prop-drilling or local hooks. If shared/global state is absolutely required, document the rationale in `docs/` and discuss in PR.
- Styling: Use CSS Modules (`*.module.css`) and avoid introducing global side-effect styles.
- Accessibility: Mirror ARIA and keyboard patterns already used in `src/components/DynamicAccordion.tsx` and `src/components/FloatingDrawer.tsx`.

Key files to inspect when changing behavior
- App entry: [src/App.tsx](src/App.tsx#L1)
- Theme tokens: [src/fluent-theme.ts](src/fluent-theme.ts#L1)
- AI example integration: [src/components/CopilotChat.tsx](src/components/CopilotChat.tsx#L1)
- Blob/fixture pattern: [src/lib/useAllAzureAccordions.ts](src/lib/useAllAzureAccordions.ts#L1)
- Fixtures: [page-components.json](page-components.json#L1), [feature-buttons.json](feature-buttons.json#L1)

Testing & validation
- There are no automated unit tests. Validate changes manually by running `pnpm dev` and exercising UI flows.
- Always run `pnpm lint` and `pnpm build` before opening a PR; `pnpm build` performs the TypeScript checks used by CI.

PR checklist
- Run `pnpm lint` and `pnpm build` locally.
- Keep PRs focused and follow component + CSS module patterns.
- Update root fixtures when adding CMS-driven content so reviewers can preview locally.
- Document any integration changes under `docs/` (examples: [docs/page-content.md](docs/page-content.md#L1)).

If any section needs more detail (examples, code snippets, or additional file pointers), tell me which area to expand.
```
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