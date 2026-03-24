export interface Holding {
  fundId: string
  units: number
  averageCostPerUnit: number
  currentNav: number
  allocationPercent: number
}

export interface Portfolio {
  id: string
  totalValue: number
  totalInvested: number
  unrealizedPnL: number
  unrealizedPnLPercent: number
  dailyChange: number
  dailyChangePercent: number
  holdings: Holding[]
  lastUpdated: string
}
