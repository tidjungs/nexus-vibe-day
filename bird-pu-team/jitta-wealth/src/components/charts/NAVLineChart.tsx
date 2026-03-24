import { useState, useMemo } from 'react'
import {
  ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Area, AreaChart,
} from 'recharts'
import type { NAVDataPoint } from '@/types/nav'
import { formatDate } from '@/utils/formatters'

type Range = '1M' | '3M' | '1Y' | 'ALL'
const ranges: Range[] = ['1M', '3M', '1Y', 'ALL']
const dayMap: Record<Range, number> = { '1M': 22, '3M': 66, '1Y': 252, ALL: 99999 }

interface NAVLineChartProps {
  data: NAVDataPoint[]
  fundName?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  const d: NAVDataPoint = payload[0].payload
  return (
    <div className="bg-brand-surface border border-brand-border rounded-xl px-4 py-3 shadow-lg text-sm">
      <p className="text-brand-muted mb-1">{formatDate(label)}</p>
      <p className="text-brand-text font-bold tabnum">NAV {d.nav.toFixed(4)}</p>
      <p className={d.change >= 0 ? 'text-brand-green' : 'text-brand-red'}>
        {d.change >= 0 ? '+' : ''}{d.change.toFixed(4)} ({d.change >= 0 ? '+' : ''}{d.changePercent.toFixed(2)}%)
      </p>
    </div>
  )
}

export function NAVLineChart({ data, fundName }: NAVLineChartProps) {
  const [range, setRange] = useState<Range>('1Y')

  const sliced = useMemo(() => {
    const n = dayMap[range]
    return data.slice(-n)
  }, [data, range])

  const isPositive = sliced.length > 1 && sliced[sliced.length - 1].nav >= sliced[0].nav
  const color = isPositive ? '#059669' : '#DC2626'

  const minNav = Math.min(...sliced.map(d => d.nav))
  const maxNav = Math.max(...sliced.map(d => d.nav))
  const padding = (maxNav - minNav) * 0.1

  return (
    <div>
      {fundName && <p className="text-brand-muted text-xs mb-3">{fundName}</p>}
      <div className="flex items-center gap-1 mb-4">
        {ranges.map(r => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              range === r
                ? 'bg-brand-green/10 text-brand-green'
                : 'text-brand-muted hover:text-brand-text hover:bg-brand-border'
            }`}
          >
            {r}
          </button>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={sliced} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id={`navGrad-${fundName ?? 'main'}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.15} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#DDE6F0" vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#94A3B8', fontSize: 11 }}
            interval="preserveStartEnd"
            tickFormatter={v => v.slice(5)}
          />
          <YAxis
            domain={[minNav - padding, maxNav + padding]}
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#94A3B8', fontSize: 11 }}
            tickFormatter={v => v.toFixed(2)}
            width={52}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="nav"
            stroke={color}
            strokeWidth={2}
            fill={`url(#navGrad-${fundName ?? 'main'})`}
            dot={false}
            activeDot={{ r: 4, fill: color, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
