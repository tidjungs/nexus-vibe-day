import { useState } from 'react'
import { NAVCard } from '@/components/nav/NAVCard'
import { NAVLineChart } from '@/components/charts/NAVLineChart'
import { NAVHistoryTable } from '@/components/nav/NAVHistoryTable'
import { funds } from '@/data/funds'
import { historyByFund } from '@/data/navHistory'

export function NAVPage() {
  const [selectedId, setSelectedId] = useState('RANKING')
  const selectedFund = funds.find(f => f.id === selectedId) ?? funds[0]
  const history = historyByFund[selectedId] ?? []

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-brand-text hidden lg:block mb-1">NAV History</h1>
        <p className="text-brand-muted text-sm">Track fund net asset values over time</p>
      </div>

      {/* Fund Selector */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {funds.filter(f => historyByFund[f.id]).map(f => (
          <button
            key={f.id}
            onClick={() => setSelectedId(f.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              selectedId === f.id
                ? 'bg-brand-green text-white shadow-sm'
                : 'bg-brand-surface border border-brand-border text-brand-muted hover:text-brand-text hover:border-brand-green'
            }`}
          >
            {f.shortName}
          </button>
        ))}
      </div>

      {/* NAV Card */}
      <NAVCard fund={selectedFund} large />

      {/* Chart */}
      <div className="card">
        <h2 className="text-sm font-semibold text-brand-text mb-4">{selectedFund.name} — NAV Chart</h2>
        <NAVLineChart data={history} />
      </div>

      {/* Table */}
      <div className="card">
        <h2 className="text-sm font-semibold text-brand-text mb-5">Historical Data</h2>
        <NAVHistoryTable data={history} />
      </div>
    </div>
  )
}
