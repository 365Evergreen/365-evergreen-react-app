# Copilot Instructions for 365 Evergreen React App ✅

## Overview & Architecture
- SPA frontend built with React (TypeScript) and Vite. Entry: src/App.tsx
- Components: src/components/, styled via CSS modules (*.module.css)
- Data sources:
  - WPGraphQL API (https://365evergreen.com/graphql): hooks in src/lib/ (e.g., useSiteFeatures.ts, usePageBySlug.ts)
  - Azure Blob static JSON (https://365evergreendev.blob.core.windows.net/365-evergreen/): hooks like useAllAzureAccordions.ts, useFeatureButtons.ts
- Props-only communication: No global state (no Context, Redux, Zustand). Local state per component.
- Theming via src/fluent-theme.ts. Avoid inline styles except in src/index.css

## Developer Workflows
- Local dev: pnpm dev (Vite HMR)
- Build: pnpm build (runs tsc -b then vite build)
- Preview: pnpm preview
- Lint: pnpm lint
- Type check: tsc -b
- Use local JSON files in repo root for mocking remote data if endpoints are unavailable

## Patterns & Conventions
- Components: src/components/MyComponent.tsx + src/MyComponent.module.css
- Data hooks: src/lib/*.ts, use explicit TypeScript interfaces (Raw* for fetched data)
- Blob hooks handle arrays, { body: [...] }, or single objects—mirror fallback logic from existing hooks
- Update static JSON (e.g., page-components.json) if adding content-driven components
- Document integration changes in docs/ (see docs/prd.md, docs/workflows.md)
- Accessibility: Manual keyboard & ARIA checks required for new UI

## Integration Points
- WPGraphQL: Use provided hooks, expect standard WPGraphQL responses
- Azure Blob: Use hooks with fallback logic for different JSON shapes
- AI/Copilot: Client-side logic in src/components/CopilotChat.tsx

## Examples
- See src/lib/useAllAzureAccordions.ts for blob fetch/fallback pattern
- See src/components/ for props-only component design
- See src/fluent-theme.ts for theming

## PR Checklist
1. Run pnpm lint and pnpm build
2. Use props-only and local state
3. Add/update hooks in src/lib/ for remote data
4. Update static JSON if needed
5. Update docs for integrations
6. Manual accessibility checks

---

If any section is unclear or missing, request feedback to iterate and improve instructions.