import type { Portfolio } from '@/types/portfolio'

export const portfolio: Portfolio = {
  id: 'port-001',
  totalValue: 524_318.75,
  totalInvested: 450_000.00,
  unrealizedPnL: 74_318.75,
  unrealizedPnLPercent: 16.52,
  dailyChange: 2_341.80,
  dailyChangePercent: 0.45,
  lastUpdated: '2026-03-21T16:00:00+07:00',
  holdings: [
    {
      // Jitta Ranking — high conviction, highest allocation
      fundId: 'RANKING',
      units: 14_250.0,
      averageCostPerUnit: 15.80,
      currentNav: 19.4561,
      allocationPercent: 52.9,
    },
    {
      // Global ETF — core diversified position
      fundId: 'GETF',
      units: 18_500.0,
      averageCostPerUnit: 12.40,
      currentNav: 14.5231,
      allocationPercent: 51.2,
    },
    {
      // Jitta Money — cash parking / low risk buffer
      fundId: 'JMONEY',
      units: 50_000.0,
      averageCostPerUnit: 10.55,
      currentNav: 10.8342,
      allocationPercent: 10.3,
    },
  ],
}
