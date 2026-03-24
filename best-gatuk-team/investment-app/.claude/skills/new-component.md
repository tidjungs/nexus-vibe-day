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
4. **Dark/light mode support is required for every component.** Follow these rules:
   - Every background color must include a `dark:` variant (e.g. `bg-white dark:bg-dark-card`).
   - Every text color must include a `dark:` variant (e.g. `text-navy dark:text-white`).
   - Every border color must include a `dark:` variant (e.g. `border-periwinkle-200 dark:border-dark-border`).
   - Use the project's dark theme tokens defined in `src/app.css`:
     - `dark-bg` (`#0b1120`) — page background
     - `dark-card` (`#111827`) — card/panel backgrounds
     - `dark-card-alt` (`#1a2236`) — nested/secondary backgrounds
     - `dark-border` (`#1e293b`) — borders
   - Use the project's light theme tokens:
     - `periwinkle-50/100/200/300` — light backgrounds and borders
     - `navy` / `navy-light` — dark text on light backgrounds
     - `vivid-blue` — primary accent
   - For gain/loss colors use paired variants: `text-green-600 dark:text-emerald-400` (positive) and `text-red-500 dark:text-red-400` (negative).
   - For muted/secondary text: `text-navy-light/50 dark:text-slate-500`.
   - Add `transition-colors` to elements that change background on theme switch for smooth transitions.
   - To read the current theme, import `getTheme` from `$lib/stores/theme.svelte`:
     ```ts
     import { getTheme } from '$lib/stores/theme.svelte';
     ```
     Use `getTheme()` (reactive) in templates when conditional rendering depends on theme.
5. Export any new types the component introduces from `src/lib/types.ts` (create the file if it doesn't exist).
6. Show the user how to import and use the component.

## Color Mapping Quick Reference

| Element              | Light                          | Dark                              |
|----------------------|--------------------------------|-----------------------------------|
| Page background      | `bg-periwinkle-100`            | `dark:bg-dark-bg`                 |
| Card background      | `bg-white`                     | `dark:bg-dark-card`               |
| Nested background    | `bg-periwinkle-50`             | `dark:bg-dark-card-alt`           |
| Primary text         | `text-navy`                    | `dark:text-white`                 |
| Secondary text       | `text-navy-light/60`           | `dark:text-slate-400`             |
| Muted text           | `text-navy-light/50`           | `dark:text-slate-500`             |
| Border               | `border-periwinkle-200`        | `dark:border-dark-border`         |
| Light border         | `border-periwinkle-100`        | `dark:border-dark-border`         |
| Hover background     | `hover:bg-periwinkle-50/60`    | `dark:hover:bg-dark-card-alt/60`  |
| Input background     | `bg-periwinkle-50`             | `dark:bg-dark-card-alt`           |
| Positive value       | `text-green-600`               | `dark:text-emerald-400`           |
| Negative value       | `text-red-500`                 | `dark:text-red-400`               |
| Positive badge bg    | `bg-green-50`                  | `dark:bg-emerald-900/30`          |
| Negative badge bg    | `bg-red-50`                    | `dark:bg-red-900/30`              |

## Component Template

```svelte
<script lang="ts">
  let {
    // props here
  }: {
    // type annotation here
  } = $props();
</script>

<!-- Always pair light and dark classes -->
<div class="rounded-2xl bg-white dark:bg-dark-card border border-periwinkle-200/60 dark:border-dark-border p-5 shadow-sm transition-colors">
  <p class="text-navy dark:text-white font-bold">Title</p>
  <p class="text-navy-light/60 dark:text-slate-400 text-sm">Subtitle</p>
</div>
```
