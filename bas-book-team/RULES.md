# Coding Rules

## General

- TypeScript strict mode — no `any` without an eslint-disable comment explaining why
- No default exports from data/utility files — only from components and pages
- No external dependencies without discussion — the dep tree is intentionally small
- No backend code, API routes, or database connections — this is a static mock app

## Components

- One component per file, filename matches the export name (`NavChart.tsx` → `export default function NavChart`)
- Client components (`"use client"`) only when necessary: state, effects, browser APIs, event handlers
- Props interfaces defined inline at the top of the file, not in a separate types file
- Do not add `className` props to components unless the design genuinely varies at the call site

## Styling

- Tailwind only — no CSS modules, no inline `style={{}}` except for dynamic values (chart colors, bar widths derived from data)
- Arbitrary values (`bg-[#161b22]`) are correct and intentional — do not replace them with Tailwind palette colors
- No `!important`, no `@apply` outside of `globals.css`
- Responsive prefix order: base → `sm:` → `md:` → `lg:` — do not skip breakpoints

## TypeScript

- Prefer `interface` over `type` for object shapes
- Avoid `as` casts except for lightweight-charts time values (`p.date as any` is the established pattern)
- `eslint-disable` comments are allowed for the `@typescript-eslint/no-explicit-any` rule on chart refs — this is intentional due to library typing gaps

## Charts

**lightweight-charts (NavChart):**
- Always initialize inside `async function initChart()` called from `useEffect([], [])`
- Store chart and series in `useRef` — never in state
- Always disconnect `ResizeObserver` in the cleanup function
- Series data format: `{ time: string (YYYY-MM-DD), value: number }`

**Recharts:**
- Always wrap in `<ResponsiveContainer width="100%">` — never set a fixed pixel width
- Use `contentStyle` on `<Tooltip>` to match the dark theme

## Commits

- Imperative mood: "Add market page" not "Added market page"
- One logical change per commit
- Always run `npm run build` before committing
