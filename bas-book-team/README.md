# Nexus Vibe Day — Book Team

Investment portfolio management dashboard built for the Nexus Vibe Day hackathon. Displays NAV history, asset allocation, and holdings across multiple mock portfolios with a dark "Neon Ledger" design system.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2 (App Router, Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| NAV charts | [lightweight-charts](https://github.com/tradingview/lightweight-charts) v5 (TradingView) |
| Allocation / sparkline charts | [Recharts](https://recharts.org) v3 |
| Client state | [Zustand](https://zustand-demo.pmnd.rs) v5 |
| Fonts | Geist Sans / Geist Mono (via `next/font`) |
| Backend | None — all data is static mock data |

---

## Design System — Neon Ledger

| Token | Hex | Usage |
|---|---|---|
| Background | `#0D1117` | Page background, sidebar |
| Surface | `#161b22` | Cards, inputs, dropdowns |
| Border | `#21262d` | Card borders, dividers |
| Primary / Lime | `#BDFF00` | Active nav indicator, positive returns, CTA button |
| Secondary / Purple | `#BF5AF2` | Allocation slices, accent charts |
| Tertiary / Blue | `#0A84FF` | Allocation slices, accent charts |
| Muted | `#8b949e` | Labels, secondary text, inactive nav items |

Tokens are declared as CSS custom properties in `app/globals.css` and consumed via inline Tailwind arbitrary values (e.g. `bg-[#161b22]`).

---

## Architecture

### App Router structure

```
app/
  layout.tsx               # Root layout: Sidebar + MobileHeader + <main>
  page.tsx                 # Redirects / → /portfolios
  globals.css              # Design tokens + Tailwind import
  portfolios/
    page.tsx               # Aggregate dashboard
    [id]/
      page.tsx             # Portfolio detail (client component)
```

The sidebar is rendered once in the root layout and persists across all routes. On mobile, `MobileHeader` replaces it.

### Components

| Component | Description |
|---|---|
| `Sidebar` | Fixed 220 px left nav with route-aware active state; nav items: Market, Portfolio, Signals, Academy, Vault |
| `MobileHeader` | Collapsed header shown below `md` breakpoint |
| `NavChart` | TradingView `lightweight-charts` area/line chart for a single portfolio's NAV history; supports optional benchmark overlay and time-range buttons (1D / 1W / 1M / YTD / 1Y / All) |
| `AggregateNavChart` | Recharts `AreaChart` sparkline of combined NAV across all portfolios |
| `AllocationChart` | Recharts `PieChart` for a single portfolio's asset class breakdown |
| `AggregateAllocationChart` | Recharts `PieChart` for cross-portfolio allocation weighted by NAV |
| `HoldingsTable` | Sortable table of holdings for a single portfolio (symbol, qty, price, value, gain/loss) |
| `TopHoldingsTable` | Aggregate top-8 holdings ranked by total market value across all portfolios |
| `PortfolioCard` | Summary card linking to `/portfolios/[id]`; shows NAV, daily change, and a mini allocation legend |
| `PerformanceMetrics` | Stat strip on the detail page: total return, YTD return, cash position |

### Data layer — `data/mockPortfolios.ts`

All application data lives in a single file. No API calls are made at runtime.

**Interfaces**

```ts
NavPoint   { date: string; value: number }
Holding    { symbol, name, qty, price, value, costBasis, gainLoss, gainPct }
Allocation { class: string; pct: number; color: string }
Portfolio  { id, name, nav, navChange, navChangePct, cash,
             totalReturn, totalReturnPct, ytdReturn, ytdReturnPct,
             navHistory: NavPoint[], holdings: Holding[], allocation: Allocation[] }
```

**`generateHistory(baseValue, days, volatility, trend)`** — produces a synthetic daily NAV series starting 2025-01-01 using a geometric random walk (`value *= 1 + trend/365 + rand * volatility`).

Three portfolios are exported: **Growth Portfolio** (p1), **Conservative Income** (p2), **Tech Focused** (p3).

### State — `store/portfolioStore.ts`

A single Zustand store. Holds only UI state — no data fetching.

```ts
{ timeRange: TimeRange; setTimeRange: (r) => void }
// TimeRange = "1D" | "1W" | "1M" | "YTD" | "1Y" | "All"
```

`selectedPortfolioId` is also stored but routing via Next.js dynamic segments (`[id]`) is the source of truth for which portfolio is displayed.

---

## How to Run

**Prerequisites:** Node 18+, npm.

```bash
cd web
npm install
npm run dev        # → http://localhost:3000
```

To verify a production build:

```bash
npm run build
```

---

## Pages

| Route | Description |
|---|---|
| `/portfolios` | Aggregate dashboard — total AUM, daily change, stats bar (unrealized G/L, cash, best/worst today), aggregate NAV area chart, portfolio card grid, cross-portfolio allocation pie, top holdings table |
| `/portfolios/[id]` | Portfolio detail — NAV header, performance metrics, interactive NAV chart with benchmark overlay and time-range controls, allocation pie, full holdings table, portfolio switcher dropdown |
| `/market` | Market overview — indices, movers, sectors, news (sidebar link present; page implementation pending) |
