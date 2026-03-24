import { Stat } from '@/components/ui/Stat'
import { formatTHB, formatPercent, changeClass } from '@/utils/formatters'
import type { Portfolio } from '@/types/portfolio'

interface PortfolioSummaryProps {
  portfolio: Portfolio
}

export function PortfolioSummary({ portfolio: p }: PortfolioSummaryProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="card col-span-2 lg:col-span-1">
        <Stat
          label="Total Portfolio Value"
          value={formatTHB(p.totalValue)}
          sub={`Daily ${formatPercent(p.dailyChangePercent)} (${formatTHB(p.dailyChange, true)})`}
          subClass={changeClass(p.dailyChange)}
        />
      </div>
      <div className="card">
        <Stat
          label="Total Invested"
          value={formatTHB(p.totalInvested)}
          sub="Cost basis"
          subClass="text-brand-muted"
        />
      </div>
      <div className="card">
        <Stat
          label="Unrealized P&L"
          value={formatTHB(p.unrealizedPnL)}
          sub={formatPercent(p.unrealizedPnLPercent)}
          subClass={changeClass(p.unrealizedPnL)}
        />
      </div>
      <div className="card">
        <Stat
          label="Daily Change"
          value={formatTHB(p.dailyChange)}
          sub={formatPercent(p.dailyChangePercent)}
          subClass={changeClass(p.dailyChange)}
        />
      </div>
    </div>
  )
}
