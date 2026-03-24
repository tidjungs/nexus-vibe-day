import { X, Shield } from 'lucide-react'
import type { Fund } from '@/types/fund'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { NAVBadge } from '@/components/nav/NAVBadge'
import { NAVLineChart } from '@/components/charts/NAVLineChart'
import { historyByFund } from '@/data/navHistory'
import { formatTHB, formatNAV, formatDate } from '@/utils/formatters'

const categoryLabel: Record<Fund['category'], string> = {
  money: 'Jitta Money',
  omni: 'Omni Fund',
  'global-etf': 'Global ETF',
  thematic: 'Thematic',
  ranking: 'Jitta Ranking',
}

interface FundDetailModalProps {
  fund: Fund | null
  onClose: () => void
}

export function FundDetailModal({ fund, onClose }: FundDetailModalProps) {
  if (!fund) return null

  const history = historyByFund[fund.id] ?? []

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full sm:max-w-2xl bg-brand-surface border border-brand-border rounded-t-3xl sm:rounded-2xl shadow-2xl max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between px-6 py-4 border-b border-brand-border bg-brand-surface rounded-t-3xl sm:rounded-t-2xl z-10">
          <div>
            <p className="text-brand-text font-bold">{fund.name}</p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="muted">{categoryLabel[fund.category]}</Badge>
              <Badge variant="muted">Fee {fund.managementFee}%/yr</Badge>
            </div>
          </div>
          <button onClick={onClose} className="text-brand-muted hover:text-brand-text p-2 rounded-xl hover:bg-brand-bg transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-6">
          {/* NAV */}
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-brand-muted text-xs mb-1">NAV as of {formatDate(fund.navDate)}</p>
              <p className="text-4xl font-bold text-brand-text tabnum">฿{formatNAV(fund.nav)}</p>
            </div>
            <NAVBadge value={fund.dailyChangePercent} className="text-base px-3 py-2" />
          </div>

          {/* Returns */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'YTD', value: fund.ytdReturn },
              { label: '1 Year', value: fund.oneYearReturn },
              { label: '3 Years', value: fund.threeYearReturn },
            ].map(({ label, value }) => (
              <div key={label} className="bg-brand-bg rounded-xl p-3 text-center border border-brand-border">
                <p className="text-brand-muted text-xs mb-1">{label}</p>
                {value != null ? (
                  <p className={`font-bold text-lg tabnum ${value >= 0 ? 'text-brand-green' : 'text-brand-red'}`}>
                    {value >= 0 ? '+' : ''}{value.toFixed(2)}%
                  </p>
                ) : (
                  <p className="text-brand-muted text-sm">N/A</p>
                )}
              </div>
            ))}
          </div>

          {/* Chart */}
          {history.length > 0 && (
            <div className="bg-brand-bg border border-brand-border rounded-2xl p-4">
              <p className="text-brand-text font-semibold text-sm mb-4">NAV History</p>
              <NAVLineChart data={history} />
            </div>
          )}

          {/* Description */}
          <div>
            <p className="text-brand-muted text-sm leading-relaxed">{fund.description}</p>
          </div>

          {/* Top Holdings */}
          <div>
            <p className="text-brand-text font-semibold text-sm mb-3">Top Holdings</p>
            <div className="space-y-2">
              {fund.topHoldings.map((h, i) => (
                <div key={h} className="flex items-center gap-3">
                  <span className="text-brand-muted text-xs w-4">{i + 1}</span>
                  <span className="text-brand-text text-sm">{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-4 py-4 border-t border-brand-border text-sm">
            <div>
              <p className="text-brand-muted text-xs mb-0.5">Minimum Investment</p>
              <p className="text-brand-text font-medium">{formatTHB(fund.minInvestment)}</p>
            </div>
            <div>
              <p className="text-brand-muted text-xs mb-0.5">Management Fee</p>
              <p className="text-brand-text font-medium">{fund.managementFee}% per year</p>
            </div>
            <div>
              <p className="text-brand-muted text-xs mb-0.5">Risk Level</p>
              <div className="flex items-center gap-1 mt-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 w-5 rounded-full ${i < fund.riskLevel ? 'bg-brand-green' : 'bg-brand-border'}`}
                  />
                ))}
                <span className="text-brand-muted text-xs ml-1">{fund.riskLevel}/5</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield size={14} className="text-brand-green" />
              <span className="text-brand-muted text-xs">SEC Approved Fund</span>
            </div>
          </div>

          <Button className="w-full" size="lg">Invest in {fund.shortName}</Button>
        </div>
      </div>
    </div>
  )
}
