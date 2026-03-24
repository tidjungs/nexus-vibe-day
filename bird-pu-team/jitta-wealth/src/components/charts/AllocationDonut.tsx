import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { formatTHB, formatPercent } from '@/utils/formatters'

const COLORS = ['#00C896', '#3B82F6', '#F5A623', '#A855F7', '#E84545', '#06B6D4']

interface AllocationItem {
  name: string
  value: number
  percent: number
}

interface AllocationDonutProps {
  data: AllocationItem[]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload as AllocationItem
  return (
    <div className="bg-brand-navyMid border border-brand-navyLight rounded-xl px-4 py-3 shadow-xl text-sm">
      <p className="text-white font-medium">{d.name}</p>
      <p className="text-brand-muted tabnum">{formatTHB(d.value)}</p>
      <p className="text-brand-green tabnum">{formatPercent(d.percent, 1)}</p>
    </div>
  )
}

export function AllocationDonut({ data }: AllocationDonutProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      <div className="w-48 h-48 flex-shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={56}
              outerRadius={76}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex-1 space-y-2.5 w-full">
        {data.map((item, i) => (
          <div key={item.name} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
              <span className="text-sm text-white truncate">{item.name}</span>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="text-sm font-medium text-white tabnum">{item.percent.toFixed(1)}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
