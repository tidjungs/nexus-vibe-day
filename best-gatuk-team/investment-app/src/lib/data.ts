export type FundCategory = 'Value Equity' | 'Diversified' | 'Thematic' | 'Balanced' | 'Money Market';

// Keep AssetClass as alias so existing code still compiles
export type AssetClass = FundCategory;

export interface Holding {
	id: string;
	name: string;
	ticker: string;        // short fund code
	assetClass: FundCategory;
	units: number;
	avgCost: number;       // avg NAV per unit (THB)
	currentPrice: number;  // current NAV per unit (THB)
	dayChange: number;     // percent
	riskLevel: 'Low' | 'Medium' | 'High' | 'Very High';
	expectedReturn: string;
}

export const holdings: Holding[] = [
	{
		id: '1',
		name: 'Jitta Ranking',
		ticker: 'JR',
		assetClass: 'Value Equity',
		units: 10000,
		avgCost: 13.50,
		currentPrice: 15.23,
		dayChange: 2.10,
		riskLevel: 'Very High',
		expectedReturn: '7–24% p.a.'
	},
	{
		id: '2',
		name: 'Global ETF',
		ticker: 'GETF',
		assetClass: 'Diversified',
		units: 50000,
		avgCost: 10.80,
		currentPrice: 11.45,
		dayChange: 0.52,
		riskLevel: 'Medium',
		expectedReturn: '4–8% p.a.'
	},
	{
		id: '3',
		name: 'Thematic',
		ticker: 'THEME',
		assetClass: 'Thematic',
		units: 25000,
		avgCost: 12.00,
		currentPrice: 11.20,
		dayChange: -0.84,
		riskLevel: 'High',
		expectedReturn: 'Varies'
	},
	{
		id: '4',
		name: 'Omni Fund',
		ticker: 'OMNI',
		assetClass: 'Balanced',
		units: 100000,
		avgCost: 9.20,
		currentPrice: 10.05,
		dayChange: 0.20,
		riskLevel: 'Medium',
		expectedReturn: '7.88% p.a.'
	},
	{
		id: '5',
		name: 'Jitta Money',
		ticker: 'JM',
		assetClass: 'Money Market',
		units: 200000,
		avgCost: 10.00,
		currentPrice: 10.03,
		dayChange: 0.01,
		riskLevel: 'Low',
		expectedReturn: '3.67% p.a.'
	}
];

export function marketValue(h: Holding) {
	return h.units * h.currentPrice;
}

export function costBasis(h: Holding) {
	return h.units * h.avgCost;
}

export function gainLoss(h: Holding) {
	return marketValue(h) - costBasis(h);
}

export function gainLossPct(h: Holding) {
	return (gainLoss(h) / costBasis(h)) * 100;
}

export function totalNAV(hs: Holding[]) {
	return hs.reduce((sum, h) => sum + marketValue(h), 0);
}

export function totalCost(hs: Holding[]) {
	return hs.reduce((sum, h) => sum + costBasis(h), 0);
}

export function allocationByClass(hs: Holding[]) {
	const nav = totalNAV(hs);
	const map: Record<FundCategory, number> = {
		'Value Equity': 0,
		Diversified: 0,
		Thematic: 0,
		Balanced: 0,
		'Money Market': 0
	};
	for (const h of hs) {
		map[h.assetClass] += marketValue(h);
	}
	return (Object.entries(map) as [FundCategory, number][]).map(([cls, val]) => ({
		assetClass: cls,
		value: val,
		pct: (val / nav) * 100
	}));
}

export const assetClassColors: Record<FundCategory, string> = {
	'Value Equity': '#3b5bff',
	Diversified: '#06b6d4',
	Thematic: '#f59e0b',
	Balanced: '#22c55e',
	'Money Market': '#a855f7'
};

export const riskColors: Record<Holding['riskLevel'], string> = {
	Low: '#22c55e',
	Medium: '#f59e0b',
	High: '#f97316',
	'Very High': '#ef4444'
};

export function fmt(n: number, decimals = 2) {
	return n.toLocaleString('en-US', {
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals
	});
}

export function fmtCurrency(n: number) {
	return '฿' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// =============================================================================
// Price History
// =============================================================================

export type Duration = '1D' | '1W' | '1M' | '3M' | '6M' | 'YTD' | 'All';

export interface PricePoint {
	date: string; // YYYY-MM-DD
	nav: number;  // NAV per unit (THB)
}

function generatePriceHistory(
	startNav: number,
	endNav: number,
	daysBack: number,
	volatility: number,
	seed: number
): PricePoint[] {
	const ref = new Date('2026-03-24');
	const points: PricePoint[] = [];
	for (let i = daysBack; i >= 0; i--) {
		const d = new Date(ref);
		d.setDate(d.getDate() - i);
		const t = daysBack > 0 ? (daysBack - i) / daysBack : 1;
		const trend = startNav + (endNav - startNav) * t;
		const noise =
			Math.sin(i * 0.23 + seed) * volatility +
			Math.sin(i * 0.11 + seed * 1.7) * volatility * 0.5 +
			Math.sin(i * 0.97 + seed * 0.3) * volatility * 0.15;
		points.push({
			date: d.toISOString().split('T')[0],
			nav: parseFloat(Math.max(0.01, trend + noise).toFixed(4))
		});
	}
	return points;
}

export const priceHistory: Record<string, PricePoint[]> = {
	'1': generatePriceHistory(10.80, 15.23, 730, 0.60, 1.0), // JR: volatile growth
	'2': generatePriceHistory(9.90,  11.45, 730, 0.20, 2.3), // GETF: steady growth
	'3': generatePriceHistory(13.50, 11.20, 730, 0.55, 3.7), // THEME: declining
	'4': generatePriceHistory(8.90,  10.05, 730, 0.12, 5.1), // OMNI: smooth growth
	'5': generatePriceHistory(9.95,  10.03, 730, 0.02, 7.2), // JM: near-flat
};

export function getFilteredHistory(holdingId: string, duration: Duration): PricePoint[] {
	const all = priceHistory[holdingId] ?? [];
	if (duration === 'All') return all;
	const ref = new Date('2026-03-24');
	let cutoff: Date;
	switch (duration) {
		case '1D':  cutoff = new Date(ref); cutoff.setDate(ref.getDate() - 1);       break;
		case '1W':  cutoff = new Date(ref); cutoff.setDate(ref.getDate() - 7);       break;
		case '1M':  cutoff = new Date(ref); cutoff.setMonth(ref.getMonth() - 1);     break;
		case '3M':  cutoff = new Date(ref); cutoff.setMonth(ref.getMonth() - 3);     break;
		case '6M':  cutoff = new Date(ref); cutoff.setMonth(ref.getMonth() - 6);     break;
		case 'YTD': cutoff = new Date(ref.getFullYear(), 0, 1);                       break;
	}
	const cutoffStr = cutoff!.toISOString().split('T')[0];
	return all.filter(p => p.date >= cutoffStr);
}

// =============================================================================
// Transactions
// =============================================================================

export type TransactionType = 'deposit' | 'buy' | 'sell' | 'withdraw';

export interface Transaction {
	id: string;
	holdingId: string;
	type: TransactionType;
	date: string;       // YYYY-MM-DD
	units: number;      // 0 for deposit / withdraw
	navPerUnit: number; // 0 for deposit / withdraw
	amount: number;     // THB
}

export const transactions: Transaction[] = [
	// Jitta Ranking (id='1')
	{ id: 't1',  holdingId: '1', type: 'deposit',  date: '2024-03-20', units: 0,      navPerUnit: 0,     amount: 140000  },
	{ id: 't2',  holdingId: '1', type: 'buy',       date: '2024-03-20', units: 10000,  navPerUnit: 13.50, amount: 135000  },
	// Global ETF (id='2') — all four transaction types
	{ id: 't3',  holdingId: '2', type: 'deposit',  date: '2024-03-15', units: 0,      navPerUnit: 0,     amount: 600000  },
	{ id: 't4',  holdingId: '2', type: 'buy',       date: '2024-03-15', units: 50000,  navPerUnit: 10.80, amount: 540000  },
	{ id: 't5',  holdingId: '2', type: 'deposit',  date: '2024-08-10', units: 0,      navPerUnit: 0,     amount: 60000   },
	{ id: 't6',  holdingId: '2', type: 'buy',       date: '2024-08-10', units: 5000,   navPerUnit: 11.10, amount: 55500   },
	{ id: 't7',  holdingId: '2', type: 'sell',      date: '2025-01-10', units: 5000,   navPerUnit: 11.35, amount: 56750   },
	{ id: 't8',  holdingId: '2', type: 'withdraw',  date: '2025-01-10', units: 0,      navPerUnit: 0,     amount: 56750   },
	// Thematic (id='3')
	{ id: 't9',  holdingId: '3', type: 'deposit',  date: '2024-06-01', units: 0,      navPerUnit: 0,     amount: 300000  },
	{ id: 't10', holdingId: '3', type: 'buy',       date: '2024-06-01', units: 25000,  navPerUnit: 12.00, amount: 300000  },
	// Omni Fund (id='4') — two rounds of purchase
	{ id: 't11', holdingId: '4', type: 'deposit',  date: '2024-01-10', units: 0,      navPerUnit: 0,     amount: 500000  },
	{ id: 't12', holdingId: '4', type: 'buy',       date: '2024-01-10', units: 50000,  navPerUnit: 9.00,  amount: 450000  },
	{ id: 't13', holdingId: '4', type: 'deposit',  date: '2024-08-20', units: 0,      navPerUnit: 0,     amount: 500000  },
	{ id: 't14', holdingId: '4', type: 'buy',       date: '2024-08-20', units: 50000,  navPerUnit: 9.40,  amount: 470000  },
	// Jitta Money (id='5')
	{ id: 't15', holdingId: '5', type: 'deposit',  date: '2024-02-01', units: 0,      navPerUnit: 0,     amount: 2000000 },
	{ id: 't16', holdingId: '5', type: 'buy',       date: '2024-02-01', units: 200000, navPerUnit: 10.00, amount: 2000000 },
];

export function getTransactionsForHolding(holdingId: string): Transaction[] {
	return transactions
		.filter(t => t.holdingId === holdingId)
		.sort((a, b) => b.date.localeCompare(a.date));
}

export function holdingById(id: string): Holding | undefined {
	return holdings.find(h => h.id === id);
}

export const transactionTypeColors: Record<TransactionType, string> = {
	deposit:  '#22c55e',
	buy:      '#3b5bff',
	sell:     '#f59e0b',
	withdraw: '#ef4444',
};
