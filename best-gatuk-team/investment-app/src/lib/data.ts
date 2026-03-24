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
