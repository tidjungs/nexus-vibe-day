import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

interface PerformanceData {
  period: string
  return: number
}

interface PerformanceBarProps {
  data: PerformanceData[]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  const val: number = payload[0].value
  return (
    <div className="bg-brand-surface border border-brand-border rounded-xl px-4 py-3 shadow-lg text-sm">
      <p className="text-brand-muted mb-1">{label}</p>
      <p className={`font-bold tabnum ${val >= 0 ? 'text-brand-green' : 'text-brand-red'}`}>
        {val >= 0 ? '+' : ''}{val.toFixed(2)}%
      </p>
    </div>
  )
}

export function PerformanceBar({ data }: PerformanceBarProps) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#DDE6F0" vertical={false} />
        <XAxis
          dataKey="period"
          tickLine={false}
          axisLine={false}
          tick={{ fill: '#94A3B8', fontSize: 11 }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tick={{ fill: '#94A3B8', fontSize: 11 }}
          tickFormatter={v => `${v}%`}
          width={42}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="return" radius={[4, 4, 0, 0]}>
          {data.map((d, i) => (
            <Cell key={i} fill={d.return >= 0 ? '#059669' : '#DC2626'} fillOpacity={0.85} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
