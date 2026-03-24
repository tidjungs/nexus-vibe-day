# Skill: new-component

Create a new reusable Svelte 5 component for this project.

## Steps

1. Determine the component name (PascalCase) and its purpose from the user's request.
2. Create the file at `src/lib/components/<ComponentName>.svelte`.
3. Follow the Svelte 5 runes rules in `.claude/rules/svelte-architecture.md`:
   - Use `$props()` with explicit TypeScript type annotation.
   - Use `$state` / `$derived` / `$effect` — never legacy Options API.
   - Use Tailwind CSS utility classes for styling (no `<style>` blocks unless CSS variables are needed).
   - Color-code with the `assetClassColors` palette from `$lib/data.ts` when displaying asset class data.
4. Export any new types the component introduces from `src/lib/types.ts` (create the file if it doesn't exist).
5. Show the user how to import and use the component.

## Component Template

```svelte
<script lang="ts">
  let {
    // props here
  }: {
    // type annotation here
  } = $props();
</script>

<!-- markup here -->
```
