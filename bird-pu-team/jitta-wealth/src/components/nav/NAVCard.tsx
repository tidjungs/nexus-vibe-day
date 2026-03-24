import { TrendingUp, TrendingDown } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { formatNAV, formatDate, changeClass } from '@/utils/formatters'
import type { Fund } from '@/types/fund'

interface NAVCardProps {
  fund: Fund
  large?: boolean
}

export function NAVCard({ fund, large }: NAVCardProps) {
  const positive = fund.dailyChange >= 0
  const Icon = positive ? TrendingUp : TrendingDown

  return (
    <Card className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-brand-muted font-medium uppercase tracking-wider">{fund.shortName}</span>
        <span className="text-xs text-brand-muted">{formatDate(fund.navDate)}</span>
      </div>
      <p className="text-brand-muted text-xs truncate">{fund.name}</p>
      <div className="flex items-end justify-between gap-2 mt-1">
        <p className={`font-bold tabnum ${large ? 'text-4xl' : 'text-2xl'} text-brand-text`}>
          ฿{formatNAV(fund.nav)}
        </p>
        <div className={`flex items-center gap-1 text-sm font-semibold tabnum ${changeClass(fund.dailyChange)}`}>
          <Icon size={16} />
          <span>{positive ? '+' : ''}{formatNAV(fund.dailyChange)}</span>
          <span>({positive ? '+' : ''}{fund.dailyChangePercent.toFixed(2)}%)</span>
        </div>
      </div>
    </Card>
  )
}
