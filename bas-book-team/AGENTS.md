# Agent Rules

## Next.js 16

This app uses **Next.js 16 with App Router and Turbopack**. APIs and conventions differ from your training data.

- Read `web/node_modules/next/dist/docs/` before writing routing or data-fetching code
- Server components are the default — only add `"use client"` when you need interactivity or browser APIs
- No `getServerSideProps`, `getStaticProps`, or `pages/` directory — everything is App Router

## Charting libraries

Two charting libraries are in use — use the right one for each context:

| Library | Used for |
|---------|---------|
| `lightweight-charts` v5 (TradingView) | NAV time-series charts (`NavChart.tsx`) |
| `recharts` v3 | Pie/donut charts, sparklines (`AllocationChart`, `AggregateNavChart`) |

`lightweight-charts` is imported **dynamically** (`await import("lightweight-charts")`) inside `useEffect` because it requires the browser. Do not import it at the top level.

## Design system — non-negotiable

All UI must use the Neon Ledger palette. Never introduce new colors.

| Token | Value | Use |
|-------|-------|-----|
| Background | `#0D1117` | Page bg, sidebar |
| Surface | `#161b22` | Cards |
| Border | `#21262d` | Card borders, dividers, grid lines |
| Primary / Lime | `#BDFF00` | Positive values, CTAs, active nav |
| Secondary / Purple | `#BF5AF2` | Benchmark line, allocation accent |
| Tertiary / Blue | `#0A84FF` | Secondary allocation, badges |
| Muted | `#8b949e` | Labels, inactive text |
| Negative | `text-red-400` | Losses, negative returns |

Card pattern (always use this):
```tsx
<div className="bg-[#161b22] border border-[#21262d] rounded-xl p-6">
```

## Responsive design

All new pages and components must be mobile-first:

- Page container: `max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10`
- Big headings: `text-3xl sm:text-5xl`
- Grids: start with `grid-cols-1` or `grid-cols-2`, expand at `sm:` / `md:` / `lg:`
- Tables: hide non-essential columns on mobile with `hidden sm:table-cell`
- The sidebar is `hidden md:flex` — mobile users see `MobileHeader` instead

## Data

All data lives in `web/data/mockPortfolios.ts`. There is no API, no database, no fetch calls.

- Add mock data directly to that file
- Do not create separate data files for new pages — hardcode inline in the page component if data is page-specific

## Verification

Always run `cd web && npm run build` before declaring a task complete. A clean build means:
- TypeScript passes
- No missing imports
- No invalid JSX
