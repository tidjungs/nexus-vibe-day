import type { Portfolio } from '@/types/portfolio'

export const portfolio: Portfolio = {
  id: 'port-001',
  totalValue: 512_840.50,
  totalInvested: 450_000.00,
  unrealizedPnL: 62_840.50,
  unrealizedPnLPercent: 13.96,
  dailyChange: 2_134.20,
  dailyChangePercent: 0.42,
  lastUpdated: '2026-03-21T16:00:00+07:00',
  holdings: [
    {
      fundId: 'JGEF',
      units: 14_820.5,
      averageCostPerUnit: 15.32,
      currentNav: 18.4732,
      allocationPercent: 53.4,
    },
    {
      fundId: 'JTQF',
      units: 12_200.0,
      averageCostPerUnit: 13.10,
      currentNav: 14.2150,
      allocationPercent: 33.8,
    },
    {
      fundId: 'JIP',
      units: 11_450.0,
      averageCostPerUnit: 10.95,
      currentNav: 11.0821,
      allocationPercent: 12.8,
    },
  ],
}
