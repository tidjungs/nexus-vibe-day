export type AssetClass = 'Equity' | 'Fixed Income' | 'Alternatives' | 'Cash';

export interface Holding {
	id: string;
	name: string;
	ticker: string;
	assetClass: AssetClass;
	units: number;
	avgCost: number;
	currentPrice: number;
	dayChange: number; // percent
}

export const holdings: Holding[] = [
	{
		id: '1',
		name: 'Apple Inc.',
		ticker: 'AAPL',
		assetClass: 'Equity',
		units: 120,
		avgCost: 145.5,
		currentPrice: 178.25,
		dayChange: 1.42
	},
	{
		id: '2',
		name: 'Microsoft Corp.',
		ticker: 'MSFT',
		assetClass: 'Equity',
		units: 85,
		avgCost: 280.0,
		currentPrice: 415.6,
		dayChange: -0.38
	},
	{
		id: '3',
		name: 'Nvidia Corp.',
		ticker: 'NVDA',
		assetClass: 'Equity',
		units: 60,
		avgCost: 420.0,
		currentPrice: 875.4,
		dayChange: 3.21
	},
	{
		id: '4',
		name: 'iShares Core US Agg Bond ETF',
		ticker: 'AGG',
		assetClass: 'Fixed Income',
		units: 200,
		avgCost: 95.0,
		currentPrice: 96.82,
		dayChange: 0.09
	},
	{
		id: '5',
		name: 'Vanguard Total Bond Market ETF',
		ticker: 'BND',
		assetClass: 'Fixed Income',
		units: 150,
		avgCost: 72.5,
		currentPrice: 73.15,
		dayChange: -0.12
	},
	{
		id: '6',
		name: 'Invesco QQQ Trust',
		ticker: 'QQQ',
		assetClass: 'Equity',
		units: 45,
		avgCost: 340.0,
		currentPrice: 448.7,
		dayChange: 0.87
	},
	{
		id: '7',
		name: 'SPDR Gold Shares',
		ticker: 'GLD',
		assetClass: 'Alternatives',
		units: 30,
		avgCost: 165.0,
		currentPrice: 215.3,
		dayChange: 0.55
	},
	{
		id: '8',
		name: 'iShares Bitcoin Trust',
		ticker: 'IBIT',
		assetClass: 'Alternatives',
		units: 100,
		avgCost: 28.0,
		currentPrice: 38.42,
		dayChange: -1.85
	},
	{
		id: '9',
		name: 'US Dollar Money Market',
		ticker: 'VMFXX',
		assetClass: 'Cash',
		units: 15000,
		avgCost: 1.0,
		currentPrice: 1.0,
		dayChange: 0.0
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
	const map: Record<AssetClass, number> = {
		Equity: 0,
		'Fixed Income': 0,
		Alternatives: 0,
		Cash: 0
	};
	for (const h of hs) {
		map[h.assetClass] += marketValue(h);
	}
	return (Object.entries(map) as [AssetClass, number][]).map(([cls, val]) => ({
		assetClass: cls,
		value: val,
		pct: (val / nav) * 100
	}));
}

export const assetClassColors: Record<AssetClass, string> = {
	Equity: '#6366f1',
	'Fixed Income': '#22d3ee',
	Alternatives: '#f59e0b',
	Cash: '#34d399'
};

export function fmt(n: number, decimals = 2) {
	return n.toLocaleString('en-US', {
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals
	});
}

export function fmtCurrency(n: number) {
	return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
}
