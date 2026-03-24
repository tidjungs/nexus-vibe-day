import type { Holding } from '@/types/portfolio'
import type { Fund } from '@/types/fund'
import { formatTHB, formatUnits, changeClass } from '@/utils/formatters'

interface HoldingsTableProps {
  holdings: Holding[]
  funds: Fund[]
}

export function HoldingsTable({ holdings, funds }: HoldingsTableProps) {
  const fundMap = Object.fromEntries(funds.map(f => [f.id, f]))

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-brand-muted border-b border-brand-navyLight">
            <th className="pb-3 font-medium">Fund</th>
            <th className="pb-3 font-medium text-right tabnum">Units</th>
            <th className="pb-3 font-medium text-right tabnum hidden sm:table-cell">Avg Cost</th>
            <th className="pb-3 font-medium text-right tabnum">Current NAV</th>
            <th className="pb-3 font-medium text-right tabnum">Value</th>
            <th className="pb-3 font-medium text-right tabnum hidden md:table-cell">Unrealized P&L</th>
            <th className="pb-3 font-medium text-right tabnum">Alloc %</th>
          </tr>
        </thead>
        <tbody>
          {holdings.map(h => {
            const fund = fundMap[h.fundId]
            const value = h.units * h.currentNav
            const cost = h.units * h.averageCostPerUnit
            const pnl = value - cost
            const pnlPct = (pnl / cost) * 100
            return (
              <tr key={h.fundId} className="border-b border-brand-navyLight/50 hover:bg-brand-navyLight/20 transition-colors">
                <td className="py-3.5">
                  <p className="text-white font-medium">{fund?.shortName ?? h.fundId}</p>
                  <p className="text-brand-muted text-xs truncate max-w-[140px]">{fund?.name}</p>
                </td>
                <td className="py-3.5 text-right tabnum text-white">{formatUnits(h.units)}</td>
                <td className="py-3.5 text-right tabnum text-brand-muted hidden sm:table-cell">
                  {h.averageCostPerUnit.toFixed(4)}
                </td>
                <td className="py-3.5 text-right tabnum text-white">{h.currentNav.toFixed(4)}</td>
                <td className="py-3.5 text-right tabnum text-white font-medium">{formatTHB(value)}</td>
                <td className={`py-3.5 text-right tabnum hidden md:table-cell ${changeClass(pnl)}`}>
                  {pnl >= 0 ? '+' : ''}{formatTHB(pnl)} ({pnl >= 0 ? '+' : ''}{pnlPct.toFixed(2)}%)
                </td>
                <td className="py-3.5 text-right tabnum text-brand-muted">{h.allocationPercent.toFixed(1)}%</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
