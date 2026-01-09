# Copilot Instructions for 365 Evergreen React App

## Project Overview
- **Stack:** React (TypeScript), Vite, CSS modules
- **Entry Point:** src/main.tsx (mounts App.tsx)
- **Component Structure:** All UI components are in src/components/, each with its own CSS file in src/.
- **Theme:** Custom Fluent theme in src/fluent-theme.ts

## Architecture & Patterns
- **Single-page app:** No routing by default; all logic is in App.tsx and child components.
- **Component communication:** Props are the only pattern; there is no global state manager (Redux, Zustand, etc.) or React Context.
- **Styling:** Use CSS modules (e.g., Header.css, Features.css). Avoid inline styles and global CSS except for index.css.
- **Assets:** Static files are in src/assets/ and public/.
- **Theme:** All UI should use the Fluent theme from src/fluent-theme.ts for consistency.

## Developer Workflows
- **Build:** pnpm build (uses Vite)
- **Dev server:** pnpm dev (hot reload)
- **Lint:** pnpm lint (ESLint, see eslint.config.js)
- **Type-check:** pnpm typecheck (if configured)
- **No test setup** by default; add your own if needed.

## Conventions & Practices
- **TypeScript:** All components and logic use TypeScript (.tsx for components).
- **Component location:** Place new components in src/components/ and their styles in src/ as [Component].css.
- **Theme usage:** Always import and use the Fluent theme from src/fluent-theme.ts.
- **No React Compiler:** Not enabled for performance reasons (see README.md for details).
- **ESLint:** Type-aware linting is recommended; see README.md for expanding config.
- **No backend/API integration** is present; add your own data fetching logic as needed.
- **No global state or context provider**; use props for all data flow.

## Integration Points
- **External dependencies:** Managed via package.json and installed with pnpm.
- **No API layer or service abstraction**; all data is local or static unless you add your own logic.

## Examples
- To add a new feature section:
  1. Create src/components/NewFeature.tsx and src/NewFeature.css.
  2. Import and use in App.tsx.
- To update the theme, edit src/fluent-theme.ts and re-import in components.

## Key Files
- src/App.tsx: Main app logic and layout
- src/components/: All UI components
- src/fluent-theme.ts: Theme definitions
- eslint.config.js: Linting rules
- README.md: Project setup and conventions

---
If you encounter unclear or missing conventions, ask the user for clarification before making assumptions.