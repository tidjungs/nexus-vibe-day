import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { NAVDataPoint } from '@/types/nav'
import { formatDate, changeClass } from '@/utils/formatters'

interface NAVHistoryTableProps {
  data: NAVDataPoint[]
}

const PAGE_SIZE = 15

export function NAVHistoryTable({ data }: NAVHistoryTableProps) {
  const [page, setPage] = useState(0)
  const sorted = [...data].reverse()
  const total = Math.ceil(sorted.length / PAGE_SIZE)
  const rows = sorted.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-brand-muted border-b border-brand-navyLight">
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium text-right tabnum">NAV (THB)</th>
              <th className="pb-3 font-medium text-right tabnum">Change</th>
              <th className="pb-3 font-medium text-right tabnum">Change %</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.date} className="border-b border-brand-navyLight/50 hover:bg-brand-navyLight/20 transition-colors">
                <td className="py-3 text-brand-muted text-xs">{formatDate(row.date)}</td>
                <td className="py-3 text-right text-white tabnum font-medium">{row.nav.toFixed(4)}</td>
                <td className={`py-3 text-right tabnum ${changeClass(row.change)}`}>
                  {row.change >= 0 ? '+' : ''}{row.change.toFixed(4)}
                </td>
                <td className={`py-3 text-right tabnum ${changeClass(row.changePercent)}`}>
                  {row.changePercent >= 0 ? '+' : ''}{row.changePercent.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {total > 1 && (
        <div className="flex items-center justify-between mt-4">
          <span className="text-xs text-brand-muted">Page {page + 1} of {total}</span>
          <div className="flex gap-2">
            <button
              disabled={page === 0}
              onClick={() => setPage(p => p - 1)}
              className="p-1.5 rounded-lg border border-brand-navyLight text-brand-muted hover:text-white hover:border-brand-green disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              disabled={page === total - 1}
              onClick={() => setPage(p => p + 1)}
              className="p-1.5 rounded-lg border border-brand-navyLight text-brand-muted hover:text-white hover:border-brand-green disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
