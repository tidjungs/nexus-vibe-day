# Skill: refactor-state

Extract local component state into a shared `.svelte.ts` state module so multiple components or routes can access it.

## When to use

- The same piece of state is needed in more than one route or component.
- Prop drilling has exceeded two levels.

## Steps

1. Create (or add to) `src/lib/stores/<feature>.svelte.ts`.
2. Declare the state at module scope using `$state`:

```ts
// src/lib/stores/portfolio.svelte.ts
import type { AssetClass } from '$lib/data';

export const filterClass = $state<AssetClass | 'All'>('All');
export const searchQuery = $state('');
export const selectedHoldingId = $state<string | null>(null);
```

3. In each consuming component, import the module and read/mutate the exported variables directly — no `.subscribe()`, no `$store` prefix:

```svelte
<script lang="ts">
  import { filterClass, searchQuery } from '$lib/stores/portfolio.svelte';
</script>

<input bind:value={searchQuery} />
```

4. Remove the now-redundant local `$state` declarations from the original component.
5. Run `npm run check` to confirm no type errors.

## Notes

- `.svelte.ts` files support runes (`$state`, `$derived`) at module scope.
- Plain `.ts` files do NOT support runes — they must be `.svelte.ts`.
- Derived values that depend on the shared state can also live in the store module:

```ts
export const filterClass = $state<string>('All');
export const filtered = $derived(
  holdings.filter(h => filterClass === 'All' || h.assetClass === filterClass)
);
```
