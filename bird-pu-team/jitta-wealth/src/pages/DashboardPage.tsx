import { Bell, RefreshCw } from 'lucide-react'
import { PortfolioSummary } from '@/components/portfolio/PortfolioSummary'
import { NAVCard } from '@/components/nav/NAVCard'
import { NAVLineChart } from '@/components/charts/NAVLineChart'
import { AllocationDonut } from '@/components/charts/AllocationDonut'
import { PerformanceBar } from '@/components/charts/PerformanceBar'
import { portfolio } from '@/data/portfolio'
import { funds } from '@/data/funds'
import { rankingHistory } from '@/data/navHistory'
import { formatDate } from '@/utils/formatters'

const performanceData = [
  { period: 'Oct', return: 3.21 },
  { period: 'Nov', return: -1.45 },
  { period: 'Dec', return: 5.67 },
  { period: 'Jan', return: 2.34 },
  { period: 'Feb', return: -0.87 },
  { period: 'Mar', return: 4.12 },
]

export function DashboardPage() {
  const fundMap = Object.fromEntries(funds.map(f => [f.id, f]))

  const allocationData = portfolio.holdings.map(h => ({
    name: fundMap[h.fundId]?.shortName ?? h.fundId,
    value: h.units * h.currentNav,
    percent: h.allocationPercent,
  }))

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-brand-text hidden lg:block">Dashboard</h1>
          <p className="text-brand-muted text-xs">As of {formatDate(portfolio.lastUpdated.slice(0, 10))}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-xl text-brand-muted hover:text-brand-text hover:bg-brand-border transition-colors">
            <RefreshCw size={16} />
          </button>
          <button className="p-2 rounded-xl text-brand-muted hover:text-brand-text hover:bg-brand-border transition-colors relative">
            <Bell size={16} />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-brand-green rounded-full" />
          </button>
        </div>
      </div>

      {/* Portfolio Summary */}
      <PortfolioSummary portfolio={portfolio} />

      {/* NAV Cards */}
      <div>
        <h2 className="text-sm font-semibold text-brand-muted uppercase tracking-wider mb-3">Fund NAVs</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {funds.slice(0, 3).map(f => (
            <NAVCard key={f.id} fund={f} />
          ))}
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 card">
          <h2 className="text-sm font-semibold text-brand-text mb-4">Jitta Ranking — NAV History</h2>
          <NAVLineChart data={rankingHistory} />
        </div>
        <div className="card">
          <h2 className="text-sm font-semibold text-brand-text mb-4">Portfolio Allocation</h2>
          <AllocationDonut data={allocationData} />
        </div>
      </div>

      {/* Performance */}
      <div className="card">
        <h2 className="text-sm font-semibold text-brand-text mb-4">Monthly Portfolio Return</h2>
        <PerformanceBar data={performanceData} />
      </div>
    </div>
  )
}
