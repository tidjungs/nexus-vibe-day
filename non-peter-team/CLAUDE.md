# CLAUDE.md — Investment Platform

> This file guides Claude when working on this codebase. Read it fully before writing any code.

---

## Project Overview

An investment platform for viewing and managing assets. Users can monitor portfolio performance, track holdings, and analyze financial data across asset classes.

**Stack:** Next.js (App Router) · Tailwind CSS · TypeScript

---

## Architecture

### Directory Structure

```
src/
├── app/                        # Next.js App Router
│   ├── (auth)/                 # Auth route group
│   │   ├── login/
│   │   └── register/
│   ├── (platform)/             # Authenticated app shell
│   │   ├── layout.tsx          # Sidebar + nav shell
│   │   ├── dashboard/
│   │   ├── portfolio/
│   │   │   └── [id]/
│   │   └── assets/
│   └── api/                    # Route handlers
│       └── [...]/
├── components/
│   ├── ui/                     # Primitive, reusable components
│   ├── charts/                 # Chart-specific components
│   ├── portfolio/              # Domain: portfolio views
│   └── assets/                 # Domain: asset views
├── lib/
│   ├── api/                    # API client functions
│   ├── hooks/                  # Custom React hooks
│   ├── utils/                  # Pure utility functions
│   └── types/                  # Shared TypeScript types
└── stores/                     # Client state (Zustand or Context)
```

### Key Patterns

**Server vs Client Components**
- Default to Server Components. Add `"use client"` only when needed (interactivity, hooks, browser APIs).
- Data fetching belongs in Server Components or route handlers — never in client components directly.
- Keep client component trees shallow. Pass data down as props from server boundaries.

**Data Fetching**
- Use Next.js `fetch` with appropriate caching strategies (`cache: 'no-store'` for live prices, `next: { revalidate: 60 }` for slower-moving data).
- Collocate fetching with the component that needs the data — avoid prop drilling data fetched at root.
- Always handle loading and error states explicitly with `loading.tsx` and `error.tsx`.

**State Management**
- URL state (search params) for filters, date ranges, and selected views — makes state shareable and bookmarkable.
- React `useState` for ephemeral local UI state (dropdowns, modals, hover).
- Zustand or React Context only for genuinely global client state (user preferences, sidebar collapse).
- Never put server data in client state — use SWR or React Query if real-time sync is needed.

**Type Safety**
- All financial values typed as `number` (never `string`). Store and compute in minor units or use a decimal library for precision.
- Define domain types in `lib/types/` and import them everywhere — no inline `any` or loose object types.
- API responses must be validated with Zod before use.

---

## UI & UX Guidelines

### Design Philosophy

This is a **data-dense, trust-critical** interface. Users are making financial decisions. Every design choice should communicate clarity, precision, and reliability.

- Prioritize scannability over decoration
- Negative space is intentional — don't fill it
- No animations that delay access to data
- Err on the side of showing more context, not less

### Visual Hierarchy

1. **Key metric** (portfolio value, daily P&L) — largest, most prominent
2. **Supporting context** (% change, benchmark comparison) — secondary, muted
3. **Actions** (buy, filter, export) — clearly afforded but never louder than data

### Color Usage

```
Financial semantics — use consistently everywhere:
  Positive / gain:   green-600  (#16a34a)
  Negative / loss:   red-600    (#dc2626)
  Neutral / flat:    slate-500  (#64748b)
  Pending / loading: amber-500  (#f59e0b)

Never use red/green for anything other than financial P&L.
```

### Typography

- Numerical data: always `font-mono tabular-nums` to prevent layout shift
- Large headline numbers: `text-3xl font-semibold tracking-tight`
- Labels above metrics: `text-xs uppercase tracking-widest text-slate-500`
- Body / descriptions: `text-sm text-slate-600`

### Component Patterns

**Metric Card**
```tsx
// Standard pattern for any KPI display
<div className="rounded-xl border border-slate-200 bg-white p-5">
  <p className="text-xs font-medium uppercase tracking-widest text-slate-500">
    {label}
  </p>
  <p className="mt-1 font-mono text-3xl font-semibold tabular-nums text-slate-900">
    {formattedValue}
  </p>
  <p className={cn("mt-1 text-sm font-mono tabular-nums", isPositive ? "text-green-600" : "text-red-600")}>
    {changeLabel}
  </p>
</div>
```

**Data Tables**
- Always use `table-fixed` with explicit column widths
- Numerical columns: right-aligned, `font-mono tabular-nums`
- Row hover: `hover:bg-slate-50` — subtle, never distracting
- Sticky header when table exceeds viewport height
- Always include a loading skeleton, not a spinner

**Charts**
- Use Recharts or Tremor for financial charts
- Always label axes; never rely on tooltips alone for meaning
- Provide a text summary below any chart (e.g., "Up 12.4% over 30 days")
- Accessible: include `aria-label` on chart containers

**Empty States**
- Every list/table must have an empty state — never render an empty container
- Empty state should explain why it's empty and what to do

### Responsive Behavior

- Mobile: single column, key metrics stacked, charts collapsed to sparklines
- Tablet: 2-column grid, sidebar hidden behind hamburger
- Desktop: full sidebar + main content layout (default design target)

### Loading States

- Use skeleton screens (not spinners) for any content-heavy area
- Show stale data immediately, then update — never blank the screen during refresh
- Financial data should show "as of [timestamp]" to set freshness expectations

### Accessibility

- All interactive elements keyboard-navigable
- Color alone never conveys meaning (always pair with icon or label for P&L)
- `aria-live="polite"` on regions that update with new price data
- Minimum contrast ratio 4.5:1 for all text

---

## Code Style

### General Rules

- TypeScript strict mode — no `any`, no `as` casts without comment explaining why
- Named exports only — no default exports except for Next.js pages and layouts
- Co-locate styles, tests, and types with the component they belong to
- No `console.log` left in committed code

### Naming Conventions

```
Components:       PascalCase        PortfolioSummaryCard.tsx
Hooks:            camelCase         usePortfolioData.ts
Utilities:        camelCase         formatCurrency.ts
Types:            PascalCase        AssetHolding, PortfolioSummary
Constants:        SCREAMING_SNAKE   MAX_HOLDINGS_DISPLAY
Route handlers:   lowercase         route.ts (Next.js convention)
```

### Financial Formatting

Always use a shared utility — never format inline:

```ts
// lib/utils/format.ts
export const formatCurrency = (value: number, currency = "THB") =>
  new Intl.NumberFormat("th-TH", { style: "currency", currency }).format(value);

export const formatPercent = (value: number) =>
  new Intl.NumberFormat("en", { style: "percent", minimumFractionDigits: 2 }).format(value / 100);

export const formatCompact = (value: number) =>
  new Intl.NumberFormat("en", { notation: "compact" }).format(value);
```

### Tailwind

- No arbitrary values (`w-[137px]`) unless unavoidable — prefer scale values
- Extract repeated class combinations into a component, not a CSS file
- Use `cn()` (clsx + tailwind-merge) for conditional classes — never string concatenation

---

## What Claude Should Always Do

- Ask about data freshness requirements before choosing a caching strategy
- Use `Intl.NumberFormat` for all financial number display — never manual string formatting
- Add loading and error boundaries to every async data region
- Prefer URL state over client state for anything a user might want to share or bookmark
- Write components that are narrow in responsibility — one concern per file

## What Claude Should Never Do

- Never store raw API responses in component state — always transform to domain types first
- Never use `useEffect` to fetch data — use Server Components or SWR/React Query
- Never hardcode currency symbols or locales — use `Intl` APIs
- Never render financial data without confirming its unit (is this in satang? baht? USD?)
- Never use red or green for anything that isn't gain/loss — it trains users to misread UI
