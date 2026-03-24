import type { NAVDataPoint } from '@/types/nav'

function generateNAVHistory(
  baseNav: number,
  days: number,
  volatility: number
): NAVDataPoint[] {
  const points: NAVDataPoint[] = []
  let nav = baseNav - (Math.random() * 3 + 1)
  const now = new Date('2026-03-21')

  for (let i = days; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    const dayOfWeek = d.getDay()
    if (dayOfWeek === 0 || dayOfWeek === 6) continue

    const change = (Math.random() - 0.48) * volatility
    nav = Math.max(nav + change, baseNav * 0.5)
    const prevNav = nav - change
    const changeAmount = nav - prevNav
    const changePercent = (changeAmount / prevNav) * 100

    points.push({
      date: d.toISOString().slice(0, 10),
      nav: Math.round(nav * 10000) / 10000,
      change: Math.round(changeAmount * 10000) / 10000,
      changePercent: Math.round(changePercent * 100) / 100,
    })
  }
  return points
}

export const jgefHistory = generateNAVHistory(18.4732, 365, 0.18)
export const jtqfHistory = generateNAVHistory(14.2150, 365, 0.14)
export const jipHistory = generateNAVHistory(11.0821, 365, 0.03)
export const jbfHistory = generateNAVHistory(12.6540, 365, 0.10)
export const juseHistory = generateNAVHistory(22.1345, 365, 0.22)

export const historyByFund: Record<string, NAVDataPoint[]> = {
  JGEF: jgefHistory,
  JTQF: jtqfHistory,
  JIP: jipHistory,
  JBF: jbfHistory,
  JUSE: juseHistory,
}
