import { describe, it, expect } from 'vitest';
import {
	marketValue,
	costBasis,
	gainLoss,
	gainLossPct,
	totalNAV,
	totalCost,
	allocationByClass,
	fmt,
	fmtCurrency,
	assetClassColors,
	riskColors,
	type Holding,
	type FundCategory
} from './data';

// ---------------------------------------------------------------------------
// Test factory
// ---------------------------------------------------------------------------

function makeHolding(overrides: Partial<Holding> = {}): Holding {
	return {
		id: '1',
		name: 'Test Fund',
		ticker: 'TF',
		assetClass: 'Balanced',
		units: 100,
		avgCost: 10.0,
		currentPrice: 12.0,
		dayChange: 1.0,
		riskLevel: 'Medium',
		expectedReturn: '5% p.a.',
		...overrides
	};
}

// ---------------------------------------------------------------------------
// marketValue
// ---------------------------------------------------------------------------

describe('marketValue', () => {
	it('returns units × currentPrice', () => {
		expect(marketValue(makeHolding({ units: 100, currentPrice: 12 }))).toBe(1200);
	});

	it('handles fractional prices (Jitta Money scale)', () => {
		const h = makeHolding({ units: 200_000, currentPrice: 10.03 });
		expect(marketValue(h)).toBeCloseTo(2_006_000, 2);
	});

	it('returns 0 when units are 0', () => {
		expect(marketValue(makeHolding({ units: 0, currentPrice: 15 }))).toBe(0);
	});

	it('returns 0 when currentPrice is 0', () => {
		expect(marketValue(makeHolding({ units: 100, currentPrice: 0 }))).toBe(0);
	});
});

// ---------------------------------------------------------------------------
// costBasis
// ---------------------------------------------------------------------------

describe('costBasis', () => {
	it('returns units × avgCost', () => {
		expect(costBasis(makeHolding({ units: 100, avgCost: 10 }))).toBe(1000);
	});

	it('handles fractional avg cost', () => {
		const h = makeHolding({ units: 50_000, avgCost: 10.8 });
		expect(costBasis(h)).toBeCloseTo(540_000, 2);
	});
});

// ---------------------------------------------------------------------------
// gainLoss
// ---------------------------------------------------------------------------

describe('gainLoss', () => {
	it('returns positive value when currentPrice > avgCost', () => {
		const h = makeHolding({ units: 100, avgCost: 10, currentPrice: 15 });
		expect(gainLoss(h)).toBeCloseTo(500, 5);
	});

	it('returns negative value when currentPrice < avgCost (unrealised loss)', () => {
		const h = makeHolding({ units: 25_000, avgCost: 12, currentPrice: 11.2 });
		expect(gainLoss(h)).toBeCloseTo(-20_000, 2);
	});

	it('returns 0 when currentPrice equals avgCost (breakeven)', () => {
		const h = makeHolding({ units: 500, avgCost: 10, currentPrice: 10 });
		expect(gainLoss(h)).toBe(0);
	});
});

// ---------------------------------------------------------------------------
// gainLossPct
// ---------------------------------------------------------------------------

describe('gainLossPct', () => {
	it('returns correct positive percentage', () => {
		// avgCost 10 → currentPrice 15: +50%
		const h = makeHolding({ units: 100, avgCost: 10, currentPrice: 15 });
		expect(gainLossPct(h)).toBeCloseTo(50, 5);
	});

	it('returns correct negative percentage', () => {
		// avgCost 12 → currentPrice 11.2: −6.67%
		const h = makeHolding({ units: 1, avgCost: 12, currentPrice: 11.2 });
		expect(gainLossPct(h)).toBeCloseTo(-6.667, 2);
	});

	it('returns 0 at breakeven', () => {
		const h = makeHolding({ units: 100, avgCost: 10, currentPrice: 10 });
		expect(gainLossPct(h)).toBe(0);
	});

	it('returns 100% for a doubled investment', () => {
		const h = makeHolding({ units: 100, avgCost: 10, currentPrice: 20 });
		expect(gainLossPct(h)).toBeCloseTo(100, 5);
	});
});

// ---------------------------------------------------------------------------
// totalNAV
// ---------------------------------------------------------------------------

describe('totalNAV', () => {
	it('sums market values of all holdings', () => {
		const hs = [
			makeHolding({ id: '1', units: 100, currentPrice: 10 }),  // 1 000
			makeHolding({ id: '2', units: 200, currentPrice: 5 })    // 1 000
		];
		expect(totalNAV(hs)).toBe(2000);
	});

	it('returns 0 for an empty array', () => {
		expect(totalNAV([])).toBe(0);
	});

	it('returns market value of a single holding', () => {
		const h = makeHolding({ units: 50_000, currentPrice: 11.45 });
		expect(totalNAV([h])).toBeCloseTo(572_500, 2);
	});

	it('matches expected total for the full Jitta Wealth portfolio', () => {
		// JR: 10 000 × 15.23 = 152 300
		// GETF: 50 000 × 11.45 = 572 500
		// THEME: 25 000 × 11.20 = 280 000
		// OMNI: 100 000 × 10.05 = 1 005 000
		// JM: 200 000 × 10.03 = 2 006 000
		// Total = 4 015 800
		const hs: Holding[] = [
			makeHolding({ id: '1', assetClass: 'Value Equity',  units: 10_000,  currentPrice: 15.23 }),
			makeHolding({ id: '2', assetClass: 'Diversified',   units: 50_000,  currentPrice: 11.45 }),
			makeHolding({ id: '3', assetClass: 'Thematic',      units: 25_000,  currentPrice: 11.20 }),
			makeHolding({ id: '4', assetClass: 'Balanced',      units: 100_000, currentPrice: 10.05 }),
			makeHolding({ id: '5', assetClass: 'Money Market',  units: 200_000, currentPrice: 10.03 })
		];
		expect(totalNAV(hs)).toBeCloseTo(4_015_800, 0);
	});
});

// ---------------------------------------------------------------------------
// totalCost
// ---------------------------------------------------------------------------

describe('totalCost', () => {
	it('sums cost bases of all holdings', () => {
		const hs = [
			makeHolding({ id: '1', units: 100, avgCost: 10 }),  // 1 000
			makeHolding({ id: '2', units: 50,  avgCost: 20 })   // 1 000
		];
		expect(totalCost(hs)).toBe(2000);
	});

	it('returns 0 for an empty array', () => {
		expect(totalCost([])).toBe(0);
	});
});

// ---------------------------------------------------------------------------
// allocationByClass
// ---------------------------------------------------------------------------

describe('allocationByClass', () => {
	it('returns one entry per FundCategory', () => {
		const result = allocationByClass([makeHolding()]);
		const categories: FundCategory[] = ['Value Equity', 'Diversified', 'Thematic', 'Balanced', 'Money Market'];
		expect(result.map((r) => r.assetClass)).toEqual(categories);
	});

	it('calculates correct value and pct for a single holding', () => {
		// 100 units @ 12 = 1 200, 100% in Balanced
		const h = makeHolding({ assetClass: 'Balanced', units: 100, currentPrice: 12 });
		const result = allocationByClass([h]);
		const balanced = result.find((r) => r.assetClass === 'Balanced')!;
		expect(balanced.value).toBeCloseTo(1200, 5);
		expect(balanced.pct).toBeCloseTo(100, 5);
	});

	it('assigns 0 value and 0% to unrepresented categories', () => {
		const h = makeHolding({ assetClass: 'Balanced', units: 100, currentPrice: 12 });
		const result = allocationByClass([h]);
		const equity = result.find((r) => r.assetClass === 'Value Equity')!;
		expect(equity.value).toBe(0);
		expect(equity.pct).toBe(0);
	});

	it('percentages sum to 100 across all categories', () => {
		const hs: Holding[] = [
			makeHolding({ id: '1', assetClass: 'Value Equity',  units: 10_000,  currentPrice: 15.23 }),
			makeHolding({ id: '2', assetClass: 'Diversified',   units: 50_000,  currentPrice: 11.45 }),
			makeHolding({ id: '3', assetClass: 'Thematic',      units: 25_000,  currentPrice: 11.20 }),
			makeHolding({ id: '4', assetClass: 'Balanced',      units: 100_000, currentPrice: 10.05 }),
			makeHolding({ id: '5', assetClass: 'Money Market',  units: 200_000, currentPrice: 10.03 })
		];
		const result = allocationByClass(hs);
		const total = result.reduce((sum, r) => sum + r.pct, 0);
		expect(total).toBeCloseTo(100, 5);
	});

	it('splits value proportionally between two categories', () => {
		const hs: Holding[] = [
			makeHolding({ id: '1', assetClass: 'Balanced',     units: 100, currentPrice: 10 }), // 1 000
			makeHolding({ id: '2', assetClass: 'Money Market', units: 100, currentPrice: 10 })  // 1 000
		];
		const result = allocationByClass(hs);
		const balanced    = result.find((r) => r.assetClass === 'Balanced')!;
		const moneyMarket = result.find((r) => r.assetClass === 'Money Market')!;
		expect(balanced.pct).toBeCloseTo(50, 5);
		expect(moneyMarket.pct).toBeCloseTo(50, 5);
	});
});

// ---------------------------------------------------------------------------
// fmt
// ---------------------------------------------------------------------------

describe('fmt', () => {
	it('formats with 2 decimal places by default', () => {
		expect(fmt(1234.5)).toBe('1,234.50');
	});

	it('formats with custom decimal places', () => {
		expect(fmt(1234.5678, 3)).toBe('1,234.568');
	});

	it('formats 0 decimals (integer display)', () => {
		expect(fmt(10000, 0)).toBe('10,000');
	});

	it('adds thousand separators', () => {
		expect(fmt(1_000_000, 0)).toBe('1,000,000');
	});

	it('handles zero', () => {
		expect(fmt(0)).toBe('0.00');
	});

	it('handles negative numbers', () => {
		expect(fmt(-500.5)).toBe('-500.50');
	});
});

// ---------------------------------------------------------------------------
// fmtCurrency
// ---------------------------------------------------------------------------

describe('fmtCurrency', () => {
	it('prepends the ฿ symbol', () => {
		expect(fmtCurrency(1000)).toMatch(/^฿/);
	});

	it('formats amount with 2 decimal places', () => {
		expect(fmtCurrency(1000)).toBe('฿1,000.00');
	});

	it('formats zero correctly', () => {
		expect(fmtCurrency(0)).toBe('฿0.00');
	});

	it('formats fractional amounts correctly', () => {
		expect(fmtCurrency(152_300.5)).toBe('฿152,300.50');
	});

	it('formats large portfolio values', () => {
		expect(fmtCurrency(4_015_800)).toBe('฿4,015,800.00');
	});
});

// ---------------------------------------------------------------------------
// assetClassColors
// ---------------------------------------------------------------------------

describe('assetClassColors', () => {
	it('defines a colour for every FundCategory', () => {
		const categories: FundCategory[] = ['Value Equity', 'Diversified', 'Thematic', 'Balanced', 'Money Market'];
		for (const cat of categories) {
			expect(assetClassColors[cat]).toMatch(/^#[0-9a-f]{6}$/i);
		}
	});
});

// ---------------------------------------------------------------------------
// riskColors
// ---------------------------------------------------------------------------

describe('riskColors', () => {
	it('defines a colour for every risk level', () => {
		const levels: Holding['riskLevel'][] = ['Low', 'Medium', 'High', 'Very High'];
		for (const level of levels) {
			expect(riskColors[level]).toMatch(/^#[0-9a-f]{6}$/i);
		}
	});
});
