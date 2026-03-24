import { ArrowRight } from 'lucide-react'
import type { Fund } from '@/types/fund'
import { Badge } from '@/components/ui/Badge'
import { NAVBadge } from '@/components/nav/NAVBadge'
import { formatTHB, formatNAV } from '@/utils/formatters'

const categoryLabel: Record<Fund['category'], string> = {
  'global-equity': 'Global Equity',
  'thai-equity': 'Thai Equity',
  'fixed-income': 'Fixed Income',
  mixed: 'Balanced',
}

const riskColors = ['', 'green', 'green', 'gold', 'gold', 'red'] as const

interface FundCardProps {
  fund: Fund
  onClick: (fund: Fund) => void
}

export function FundCard({ fund, onClick }: FundCardProps) {
  return (
    <button
      onClick={() => onClick(fund)}
      className="card text-left w-full hover:border-brand-green/50 hover:bg-brand-navyMid transition-all duration-150 group"
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex-1 min-w-0">
          <p className="text-white font-semibold text-sm truncate">{fund.name}</p>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="muted">{categoryLabel[fund.category]}</Badge>
            <Badge variant={riskColors[fund.riskLevel]}>Risk {fund.riskLevel}</Badge>
          </div>
        </div>
        <ArrowRight size={16} className="text-brand-muted group-hover:text-brand-green mt-1 flex-shrink-0 transition-colors" />
      </div>
      <div className="flex items-end justify-between gap-2">
        <div>
          <p className="text-xs text-brand-muted mb-0.5">NAV (THB)</p>
          <p className="text-xl font-bold text-white tabnum">฿{formatNAV(fund.nav)}</p>
        </div>
        <NAVBadge value={fund.dailyChangePercent} />
      </div>
      <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-brand-navyLight">
        <div>
          <p className="text-xs text-brand-muted mb-0.5">YTD</p>
          <p className={`text-sm font-semibold tabnum ${fund.ytdReturn >= 0 ? 'text-brand-green' : 'text-brand-red'}`}>
            {fund.ytdReturn >= 0 ? '+' : ''}{fund.ytdReturn.toFixed(2)}%
          </p>
        </div>
        <div>
          <p className="text-xs text-brand-muted mb-0.5">1Y Return</p>
          <p className={`text-sm font-semibold tabnum ${fund.oneYearReturn >= 0 ? 'text-brand-green' : 'text-brand-red'}`}>
            {fund.oneYearReturn >= 0 ? '+' : ''}{fund.oneYearReturn.toFixed(2)}%
          </p>
        </div>
        <div>
          <p className="text-xs text-brand-muted mb-0.5">Min Invest</p>
          <p className="text-sm font-medium text-white tabnum">{formatTHB(fund.minInvestment, true)}</p>
        </div>
      </div>
    </button>
  )
}
