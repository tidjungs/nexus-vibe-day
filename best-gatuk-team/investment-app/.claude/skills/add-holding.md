# Skill: add-holding

Add one or more new holdings to the portfolio dataset.

## Steps

1. Open `src/lib/data.ts`.
2. Add new `Holding` objects to the `holdings` array. Each holding requires:

```ts
{
  id: string,          // unique, increment from last entry
  name: string,        // full security name
  ticker: string,      // exchange ticker symbol
  assetClass: AssetClass,  // 'Equity' | 'Fixed Income' | 'Alternatives' | 'Cash'
  units: number,
  avgCost: number,     // USD per unit
  currentPrice: number,// USD per unit
  dayChange: number    // percent (e.g. 1.5 means +1.5%)
}
```

3. Verify the new entry is consistent with the `Holding` interface — run `npm run check`.
4. The portfolio page will automatically reflect the new holdings (NAV, allocation, table) because all computed values derive from the `holdings` array.

## Notes

- `assetClassColors` in `data.ts` already maps all four `AssetClass` values to colors — no update needed unless adding a new class.
- `allocationByClass` groups by `assetClass`; if adding a new class, add it to the `AssetClass` union type, the `map` initializer in `allocationByClass`, and `assetClassColors`.
