export type AssetCategory = 'equities' | 'bonds' | 'digital' | 'realestate';
export type NavTimeRange = '1M' | '3M' | '1Y' | 'ALL';

export interface Holding {
  id: string;
  name: string;
  ticker: string;
  quantity: number;
  currentValue: number;
  allocation: number;
  change24hUsd: number;
  change24hPct: number;
  category: AssetCategory;
}

export interface NavDataPoint {
  date: string;
  nav: number;
}

export interface PortfolioStats {
  totalNav: number;
  change24hUsd: number;
  change24hPct: number;
  annualizedReturn: number;
  riskVariance: number;
  riskLabel: 'Low' | 'Medium' | 'High';
  alphaSignalQuote: string;
}

export interface NavChartMeta {
  low: number;
  high: number;
  vol: number;
  avg: number;
}
