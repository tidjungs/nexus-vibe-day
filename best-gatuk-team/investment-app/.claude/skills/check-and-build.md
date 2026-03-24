# Skill: check-and-build

Run type checking and a production build to verify the project is error-free.

## Steps

1. Run type checking:

```bash
npm run check
```

2. Fix any TypeScript or Svelte compiler errors reported before proceeding.

3. Run the production build:

```bash
npm run build
```

4. If the build fails, read the Vite error output carefully:
   - **Transform errors** — usually a Svelte syntax or runes issue in a `.svelte` file.
   - **Type errors** — fix in source; re-run `npm run check` first to get clearer output.
   - **Missing module** — check `$lib` alias usage; ensure the file exists under `src/lib/`.

5. On success, optionally preview the production build:

```bash
npm run preview
```

## Pass Criteria

- `npm run check` exits with no errors.
- `npm run build` completes with `✓ built` for both client and SSR environments.
