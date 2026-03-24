@AGENTS.md
@RULES.md

# Nexus Vibe Day — Book Team

Investment portfolio dashboard. Dark "Neon Ledger" design system. No backend — all data is mock.

## Repo layout

```
bas-book-team/
  web/          # Next.js 16 app — all code lives here
  README.md     # Tech stack, architecture, how to run
  AGENTS.md     # AI agent rules (this file imports it)
  RULES.md      # Coding standards
  SKILLS.md     # Common tasks / recipes
```

## Before writing any code

1. Read `web/AGENTS.md` — Next.js 16 has breaking changes vs training data
2. Run `npm run build` inside `web/` to verify — never claim done without a clean build
3. Check `README.md` for the current component/page inventory

## Key files

| File | Purpose |
|------|---------|
| `web/data/mockPortfolios.ts` | All app data — portfolios, holdings, history |
| `web/store/portfolioStore.ts` | Zustand store — UI state only (timeRange) |
| `web/app/layout.tsx` | Root layout: Sidebar (desktop) + MobileHeader (mobile) + main |
| `web/components/NavChart.tsx` | TradingView lightweight-charts area chart with benchmark overlay |
| `web/app/globals.css` | Design tokens as CSS custom properties |

## Working directory

All `npm` commands run inside `web/`:
```bash
cd web && npm run dev    # dev server → localhost:3000
cd web && npm run build  # production build + type check
```
