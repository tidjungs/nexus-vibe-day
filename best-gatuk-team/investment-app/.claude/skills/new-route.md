# Skill: new-route

Scaffold a new SvelteKit page route.

## Steps

1. Determine the route path from the user's request (e.g. `/holdings/[id]`).
2. Create the route directory under `src/routes/`.
3. Decide which files are needed:
   - `+page.svelte` — always required (UI).
   - `+page.ts` — when the page needs client-side data loading (public API, reruns on navigation).
   - `+page.server.ts` — when data must stay server-side (DB queries, secrets) or mutations are needed (form actions).
   - `+error.svelte` — when custom error handling for this segment is needed.
   - `+layout.svelte` / `+layout.ts` — only when this segment introduces a persistent shell.
4. In `+page.svelte` receive server data via `$props()`:

```svelte
<script lang="ts">
  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();
</script>
```

5. Derive/transform data with `$derived`, never in `load`.
6. Link to the new route from the nav or relevant parent page.
7. Run `npm run check` to confirm no type errors.
