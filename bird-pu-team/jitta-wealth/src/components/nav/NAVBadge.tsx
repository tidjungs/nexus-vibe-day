import { TrendingUp, TrendingDown } from 'lucide-react'
import { formatPercent } from '@/utils/formatters'

interface NAVBadgeProps {
  value: number
  showIcon?: boolean
  className?: string
}

export function NAVBadge({ value, showIcon = true, className = '' }: NAVBadgeProps) {
  const positive = value >= 0
  const cls = positive
    ? 'bg-brand-green/10 text-brand-green'
    : 'bg-brand-red/10 text-brand-red'
  const Icon = positive ? TrendingUp : TrendingDown

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${cls} ${className}`}>
      {showIcon && <Icon size={12} />}
      {formatPercent(value)}
    </span>
  )
}
