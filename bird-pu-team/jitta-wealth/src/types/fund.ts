export interface Fund {
  id: string
  name: string
  shortName: string
  category: 'money' | 'omni' | 'global-etf' | 'thematic' | 'ranking'
  riskLevel: 1 | 2 | 3 | 4 | 5
  nav: number
  navDate: string
  dailyChange: number
  dailyChangePercent: number
  ytdReturn: number
  oneYearReturn: number
  threeYearReturn: number | null
  minInvestment: number
  managementFee: number
  description: string
  topHoldings: string[]
}
