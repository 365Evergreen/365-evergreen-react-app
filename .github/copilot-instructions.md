
# Copilot Instructions for 365 Evergreen React App ✅

## Quick summary
- SPA frontend built with React (TypeScript) and Vite. Uses **pnpm** as the package manager.
- Single-page UI: `src/App.tsx` is the entrypoint; components live under `src/components/` and use matching CSS modules under `src/`.
- Data comes from two places:
  - WPGraphQL API: `https://365evergreen.com/graphql` (various hooks in `src/lib/`)
  - Azure Blob static JSON: base `https://365evergreendev.blob.core.windows.net/365-evergreen/` (e.g., `accordions.json`, `components/page-components.json`)

---

## When you start coding 🔧
- Read `src/App.tsx` and examples in `src/components/` to understand render patterns and where features are mounted.
- Follow the **props-only** rule: components communicate via props. Do not introduce global state (no React Context, Redux, or Zustand).
- Keep UI state local to components and put data-fetching logic in `src/lib/*.ts` hooks.
- Use `src/fluent-theme.ts` for theming; avoid inline styles except in `src/index.css`.

## Common integration patterns (copy-paste friendly) 🔗
- GraphQL hooks: `useSiteFeatures.ts`, `usePageBySlug.ts`, `usePageBlocks.ts`, `useGlobalNav.ts`, `useLatestPosts.ts`, `useWhatWeDoPage.ts` — they fetch from `https://365evergreen.com/graphql` and expect standard WPGraphQL responses.
- Blob hooks: `useAllAzureAccordions.ts`, `useFeatureButtons.ts`, and `useLatestPosts.ts` (components URL constant). Blob responses may be either an array, an object with `{ body: [...] }`, or a single object — hooks include fallbacks (see `useAllAzureAccordions.ts`). Mirror those patterns when adding new hooks.

## File & component conventions 📁
- Components: `src/components/MyComponent.tsx` and `src/MyComponent.css` (or `*.module.css`).
- Hooks & logic: `src/lib/*.ts` (use `Raw*` interfaces for fetched raw content).
- Assets: `src/assets/` and `public/`.
- Use TypeScript types and prefer explicit interfaces for props and fetched data.

## Developer workflows & commands ⚙️
- Local dev: `pnpm dev` (Vite with HMR)
- Build: `pnpm build` (runs `tsc -b` then `vite build`) — use this to catch type errors before PRs
- Preview built site: `pnpm preview`
- Lint: `pnpm lint` (ESLint)
- If adding types or project refs, run `tsc -b` locally to verify

## PR checklist ✅
1. Run `pnpm lint` and `pnpm build` locally.
2. Verify the component uses props-only and local state.
3. If adding remote data, add or update a hook in `src/lib/` following existing fetch/fallback patterns.
4. Update `page-components.json` or other static JSON if your change adds content-driven components.
5. Add or update docs in `docs/` (especially `docs/prd.md` or `docs/workflows.md`) when integrations change.
6. Include manual accessibility checks (keyboard & ARIA where applicable).

## Debugging & tips 💡
- tsc errors are surfaced during `pnpm build` — use `tsc -b` for more direct diagnostics.
- Many hooks fetch remote endpoints; if the network or blob storage is unavailable, use local JSON files in the repo root (e.g., `accordions.json`) as a quick mock.
- For Azure blob JSON, expect different shapes (array vs `{ body: [...] }`) — follow hook examples.
- Copilot/AI integration lives in `src/components/CopilotChat.tsx`. Changes to AI behavior should be done client-side here and documented.

## Testing & QA
- This repo has no automated tests by default. See `docs/QA.md` for existing QA guidance and add test instructions there if you introduce automated tests.

---

If any section above is unclear or you'd like more examples (e.g., a new hook or a component scaffold), tell me which area and I'll add a brief snippet and checklist. 🔁