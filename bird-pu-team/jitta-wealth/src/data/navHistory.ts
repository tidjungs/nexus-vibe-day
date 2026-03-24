import type { NAVDataPoint } from '@/types/nav'

function generateNAVHistory(
  baseNav: number,
  days: number,
  volatility: number,
  annualDrift: number,
): NAVDataPoint[] {
  const points: NAVDataPoint[] = []
  // Start from a lower NAV and grow toward baseNav
  const dailyDrift = annualDrift / 252
  let nav = baseNav * 0.78
  const now = new Date('2026-03-21')

  for (let i = days; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    const dayOfWeek = d.getDay()
    if (dayOfWeek === 0 || dayOfWeek === 6) continue

    const shock = (Math.random() - 0.48) * volatility
    const change = nav * (dailyDrift + shock)
    nav = Math.max(nav + change, 1)
    const changePercent = (change / (nav - change)) * 100

    points.push({
      date: d.toISOString().slice(0, 10),
      nav: Math.round(nav * 10000) / 10000,
      change: Math.round(change * 10000) / 10000,
      changePercent: Math.round(changePercent * 100) / 100,
    })
  }
  return points
}

// Jitta Money — very low volatility, T-bill returns
export const jmoneyHistory = generateNAVHistory(10.8342, 730, 0.0015, 0.0367)

// Omni Fund — moderate volatility, balanced global
export const omniHistory = generateNAVHistory(12.8850, 730, 0.008, 0.0788)

// Global ETF — moderate-high volatility, global equity
export const getfHistory = generateNAVHistory(14.5231, 730, 0.012, 0.0997)

// Thematic Optimize — high volatility, mega-trend sectors
export const thematicHistory = generateNAVHistory(11.2740, 365, 0.022, 0.1532)

// Jitta Ranking — highest volatility, stock picking
export const rankingHistory = generateNAVHistory(19.4561, 730, 0.018, 0.2415)

export const historyByFund: Record<string, NAVDataPoint[]> = {
  JMONEY: jmoneyHistory,
  OMNI: omniHistory,
  GETF: getfHistory,
  THEMATIC: thematicHistory,
  RANKING: rankingHistory,
}
