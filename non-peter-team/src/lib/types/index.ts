// Asset types
export type AssetType = 'stock' | 'bond' | 'fund' | 'crypto' | 'commodity' | 'real_estate';

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  type: AssetType;
  currentPrice: number;
  currency: string;
  lastUpdated: Date;
}

export interface AssetHolding {
  id: string;
  portfolioId: string;
  assetId: string;
  asset: Asset;
  quantity: number;
  costBasis: number;
  purchaseDate: Date;
  currentValue: number;
  gainLoss: number;
  gainLossPercent: number;
}

// Portfolio types
export interface Portfolio {
  id: string;
  userId: string;
  name: string;
  description?: string;
  totalValue: number;
  totalCostBasis: number;
  totalGainLoss: number;
  totalGainLossPercent: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PortfolioSummary extends Portfolio {
  holdings: AssetHolding[];
  holdingCount: number;
  assetTypeDistribution: Record<AssetType, number>;
}

// Performance types
export interface PerformanceMetric {
  date: Date;
  value: number;
  change: number;
  changePercent: number;
}

export interface PerformanceSeries {
  portfolioId: string;
  period: 'day' | 'week' | 'month' | 'quarter' | 'year' | 'all';
  metrics: PerformanceMetric[];
  startValue: number;
  endValue: number;
}

// User types
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
