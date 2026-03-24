import { PortfolioSummary } from '@/components/portfolio/PortfolioSummary'
import { HoldingsTable } from '@/components/portfolio/HoldingsTable'
import { AllocationDonut } from '@/components/charts/AllocationDonut'
import { portfolio } from '@/data/portfolio'
import { funds } from '@/data/funds'

export function PortfolioPage() {
  const fundMap = Object.fromEntries(funds.map(f => [f.id, f]))

  const allocationData = portfolio.holdings.map(h => ({
    name: fundMap[h.fundId]?.shortName ?? h.fundId,
    value: h.units * h.currentNav,
    percent: h.allocationPercent,
  }))

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-brand-text hidden lg:block mb-1">Portfolio</h1>
        <p className="text-brand-muted text-sm">Your investment summary</p>
      </div>

      <PortfolioSummary portfolio={portfolio} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 card">
          <h2 className="text-sm font-semibold text-brand-text mb-5">Holdings</h2>
          <HoldingsTable holdings={portfolio.holdings} funds={funds} />
        </div>
        <div className="card">
          <h2 className="text-sm font-semibold text-brand-text mb-5">Allocation</h2>
          <AllocationDonut data={allocationData} />
        </div>
      </div>
    </div>
  )
}
