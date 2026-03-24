# Skills & Recipes

Common tasks for this project. Read `AGENTS.md` first for constraints.

---

## Add a new page

1. Create `web/app/<route>/page.tsx` as a server component (no `"use client"`)
2. Add mock data inline at the top of the file — do not import from `mockPortfolios` unless it's portfolio data
3. Use the standard page shell:
```tsx
export default function MyPage() {
  return (
    <div className="min-h-screen bg-[#0D1117] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* content */}
      </div>
    </div>
  );
}
```
4. The sidebar nav in `Sidebar.tsx` and `MobileHeader.tsx` already links to the route — no changes needed there

---

## Add a new portfolio

Edit `web/data/mockPortfolios.ts`:
1. Add a new object to `mockPortfolios` array with a unique `id` (e.g. `"p4"`)
2. Call `generateHistory(baseNav, 365, volatility, trend)` for `navHistory`
3. Allocation colors must use `#BF5AF2`, `#0A84FF`, `#8b949e` — no other colors

---

## Add a chart component

**Time-series (NAV-style):** Copy `NavChart.tsx` as a base. Key points:
- Dynamic import inside `useEffect`
- `AreaSeries` for filled gradient, `LineSeries` for plain line
- Lime (`#BDFF00`) primary, purple (`#BF5AF2`) secondary/benchmark

**Pie/donut:** Copy `AllocationChart.tsx`. Key points:
- `<ResponsiveContainer width="100%" height={260}>`
- `<Pie innerRadius={70} outerRadius={110}>` for donut
- Tooltip `contentStyle` must match dark theme

---

## Add a stat card

```tsx
<div className="bg-[#161b22] border border-[#21262d] rounded-xl p-5">
  <p className="text-[#8b949e] text-xs font-medium uppercase tracking-wider mb-1">
    Label
  </p>
  <p className="text-2xl font-bold tabular-nums text-white">
    {value}
  </p>
</div>
```

For a 4-up stats bar: `grid grid-cols-2 sm:grid-cols-4 gap-4`

---

## Add a responsive table

- Wrap in `<div className="overflow-x-auto">`
- Hide non-essential columns on mobile: `className="hidden sm:table-cell ..."`
- Keep at most 4 columns visible on mobile: symbol/name, primary value, and return %
- Sort state with `useState<SortKey>` + `useState<"asc"|"desc">` — see `HoldingsTable.tsx`

---

## Update design tokens

Tokens live in two places — update both:
1. `web/app/globals.css` — CSS custom properties
2. `AGENTS.md` — the token table (so agents use the right values)

---

## PR workflow

```bash
cd web && npm run build          # must pass
git add <specific files>
git commit -m "Add ..."
git push -u origin <branch>
gh pr create --title "..." --body "..."
```

Never `git add .` — stage files explicitly to avoid committing `.env`, build artifacts, or editor files.
