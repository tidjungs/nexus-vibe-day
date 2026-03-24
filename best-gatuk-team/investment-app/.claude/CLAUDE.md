# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server at http://localhost:5173
npm run build        # Production build (outputs to .svelte-kit/output)
npm run preview      # Preview production build locally
npm run check        # TypeScript + Svelte type checking
npm run check:watch  # Type checking in watch mode
npm test             # Run unit tests (Vitest, single pass)
npm run test:watch   # Run unit tests in watch mode
```

**Test runner: Vitest** — configured in `vite.config.ts` (`test.include: src/**/*.{test,spec}.ts`). Tests run in `node` environment (no DOM/jsdom needed for pure utility functions). Test files live next to the module they test: `src/lib/data.test.ts`.

## Architecture

**Stack:** SvelteKit 2 · Svelte 5 (runes mode) · TypeScript · Tailwind CSS v4 · Vite 7

**Runes mode is enforced globally** via `svelte.config.js` `dynamicCompileOptions` — all `.svelte` files outside `node_modules` compile with `{ runes: true }`. Use `$state`, `$derived`, `$props` etc.; the legacy Options API reactivity (`export let`, `$:`) will not work.

**Tailwind v4** is loaded via `@tailwindcss/vite` plugin (not PostCSS). The single entry point is `src/app.css` (`@import "tailwindcss"`), imported in `+layout.svelte`. There is no `tailwind.config.*` file — configuration is done in CSS if needed.

**All domain data and business logic lives in `src/lib/data.ts`** — types (`Holding`, `AssetClass`), the mock holdings array, and pure utility functions (`marketValue`, `gainLoss`, `totalNAV`, `allocationByClass`, `fmtCurrency`, etc.). The single route `src/routes/+page.svelte` imports from there and owns all UI state (`$state`/`$derived`).

**`$lib` alias** resolves to `src/lib/` (SvelteKit default).

## Key Patterns

- `$derived(() => { ... })` with an explicit function body is used (not the shorthand `$derived(expr)`) for derived values that contain filtering/sorting logic in `+page.svelte`.
- The donut chart is pure SVG — no chart library dependency.
- Responsive breakpoints follow a mobile-first pattern: mobile card layout (`md:hidden`) and desktop table (`hidden md:block`) are rendered simultaneously, toggled by CSS.
