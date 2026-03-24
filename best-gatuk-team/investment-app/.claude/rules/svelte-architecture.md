# Svelte Best-Practice Architecture Rules

## Svelte 5 Runes — Always use runes, never legacy reactivity

Runes mode is enforced globally in this project. `export let`, `$:`, and `createEventDispatcher` will not work.

```svelte
<!-- CORRECT -->
<script lang="ts">
  let count = $state(0);
  let doubled = $derived(count * 2);
  let { title, items = [] }: { title: string; items: string[] } = $props();
</script>

<!-- WRONG -->
<script lang="ts">
  export let title: string;
  let count = 0;
  $: doubled = count * 2;
</script>
```

### `$state`
- Primitives are reactive as-is. Objects/arrays are deeply reactive — mutate in place.
- Use `$state.raw(value)` for large read-only datasets or external class instances where deep reactivity is wasteful.
- Use `$state.snapshot(value)` to get a plain non-reactive copy for serialization or logging.

### `$derived`
- Shorthand `$derived(expr)` for single expressions.
- Long-form `$derived(() => { ... })` only when multiple statements are needed (e.g. filter + sort).
- Never put side effects inside `$derived`. No writes to `$state` inside `$derived`.

### `$effect`
- Use for DOM interactions, subscriptions, and logging — not for computing state.
- Always return a cleanup function when setting up subscriptions or timers.
- Avoid writing to `$state` inside `$effect`; it creates reactive cycles.

```svelte
<script lang="ts">
  $effect(() => {
    const id = setInterval(() => tick(), 1000);
    return () => clearInterval(id);
  });
</script>
```

### `$props`
- Always destructure with an explicit TypeScript type annotation.
- Provide default values inline: `let { items = [] } = $props()`.
- Use `$bindable()` only when two-way binding is genuinely needed.
- Optional callbacks default to `undefined`; call with optional chaining: `onclick?.()`.

```svelte
<script lang="ts">
  let {
    label,
    value = $bindable(''),
    onchange
  }: {
    label: string;
    value?: string;
    onchange?: (v: string) => void;
  } = $props();
</script>
```

---

## Component Design

**Single responsibility.** Extract a new component when:
- A section of markup is reused in more than one place.
- A section has its own non-trivial local state.
- A section exceeds ~150 lines of markup.

**Co-locate state with its owner.** Lift state up only when a sibling genuinely needs it. Prefer props down / callback props up over a shared store for local UI state.

**Snippet over component for minor variants.** Use `{#snippet}` / `{@render}` for template fragments that vary within a single file.

```svelte
{#snippet badge(color: string, label: string)}
  <span class="px-2 py-0.5 rounded text-xs" style="color:{color}">{label}</span>
{/snippet}

{@render badge('#6366f1', 'Equity')}
```

**Avoid prop drilling beyond two levels.** Use `setContext`/`getContext` or a shared `.svelte.ts` state module for deeply nested data.

---

## State Management

| Scope | Solution |
|---|---|
| Local UI state | `$state` in the component |
| Shared cross-component state | `.svelte.ts` module exporting `$state` |
| Server/fetched data | SvelteKit `load` function → `data` prop |

**Shared state module pattern:**
```ts
// src/lib/stores/portfolio.svelte.ts
export const selectedId = $state<string | null>(null);
export const filterClass = $state<string>('All');
```
Import and mutate directly — no store subscription boilerplate.

**Server data via `load`, not client fetch:**
```ts
// src/routes/+page.ts
export async function load({ fetch }) {
  return { holdings: await fetch('/api/holdings').then(r => r.json()) };
}
```
```svelte
<script lang="ts">
  let { data } = $props();
  const sorted = $derived(data.holdings.toSorted(...));
</script>
```

---

## File & Module Organisation

```
src/
  lib/
    components/       # Reusable UI components (PascalCase.svelte)
    stores/           # Shared reactive state (camelCase.svelte.ts)
    utils/            # Pure functions with no Svelte dependency (camelCase.ts)
    types.ts          # Shared TypeScript interfaces/types
  routes/
    +layout.svelte    # Global shell — imports app.css exactly once here
    +layout.ts        # Root load (auth, session, global data)
    (group)/          # Route groups for shared layouts without URL segments
      feature/
        +page.svelte
        +page.ts
        +page.server.ts
        +error.svelte  # Co-locate error boundary with its route segment
```

**Naming:**
- Components: `PascalCase.svelte`
- Shared reactive modules: `camelCase.svelte.ts`
- Pure utility modules: `camelCase.ts`
- Route files: SvelteKit conventions (`+page.svelte`, `+layout.svelte`, `+server.ts`)

---

## TypeScript

- All `$props()` destructures must be explicitly typed — no implicit `any`.
- Use `interface` for object shapes that may be extended; `type` for unions and mapped types.
- Keep domain types in `src/lib/types.ts`. Do not scatter type definitions across route files.
- Use `satisfies` to validate object literals without widening:

```ts
export const colors = {
  Equity: '#6366f1',
  'Fixed Income': '#22d3ee',
} satisfies Record<AssetClass, string>;
```

---

## SvelteKit Conventions

- Use **form actions** (`+page.server.ts`) for mutations — they work without JS.
- Use `+page.server.ts` `load` for data that must stay server-side (DB, secrets).
- Use `+page.ts` `load` for public data that reruns on client navigation.
- Use `$app/navigation` (`goto`, `invalidate`) — never `window.location`.
- Invalidate specific data keys with `invalidate('key')` rather than `invalidateAll()` to avoid unnecessary refetches.

---

## Performance

- Never create objects/arrays inside `{#each}` expressions — derive them above with `$derived`.
- Always key `{#each}` when the list can reorder: `{#each items as item (item.id)}`.
- Use `{#await}` for async rendering rather than manual loading-state flags.
- Prefer CSS `transition:` / `animate:` directives over JS-driven animation for simple show/hide.
- Lazy-load heavy components via dynamic `import()` in a load function or `$effect`.
