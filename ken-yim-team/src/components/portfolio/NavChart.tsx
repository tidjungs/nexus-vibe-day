import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useChartColors } from '../../hooks/useChartColors';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import type { NavTimeRange } from '../../types/portfolio';
import { formatAxisDate, formatCurrencyShort } from '../../utils/formatters';
import NavChartStats from './NavChartStats';

const ranges: NavTimeRange[] = ['1M', '3M', '1Y', 'ALL'];

// For longer ranges, thin out tick labels to avoid crowding
function getTickInterval(range: NavTimeRange): number {
  if (range === '1M') return 6;
  if (range === '3M') return 14;
  if (range === '1Y') return 7;
  return 5;
}

export default function NavChart() {
  const { activeNavRange, setActiveNavRange, navHistory } = usePortfolioStore();
  const data = navHistory[activeNavRange];
  const colors = useChartColors();

  return (
    <div className="rounded-xl bg-[var(--color-bg-card-inner)] border border-[var(--color-border)] p-6 col-span-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[var(--color-text-primary)] text-sm font-semibold">NAV Performance History</h3>
        <div className="flex items-center gap-1 bg-[var(--color-bg-subtle)] rounded-md p-0.5">
          {ranges.map((r) => (
            <button
              key={r}
              onClick={() => setActiveNavRange(r)}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                activeNavRange === r
                  ? 'bg-[var(--color-range-active-bg)] text-[var(--color-range-active-text)]'
                  : 'text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fill: colors.tick, fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            interval={getTickInterval(activeNavRange)}
            tickFormatter={(v: string) => formatAxisDate(v, activeNavRange)}
          />
          <YAxis
            tick={{ fill: colors.tick, fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => formatCurrencyShort(v)}
            domain={['auto', 'auto']}
            width={55}
          />
          <Tooltip
            contentStyle={{
              background: colors.tooltipBg,
              border: `1px solid ${colors.tooltipBorder}`,
              borderRadius: '8px',
              color: colors.tooltipText,
              fontSize: 12,
            }}
            labelStyle={{ color: colors.tooltipLabel, marginBottom: 4 }}
            formatter={(value) => [formatCurrencyShort(Number(value)), 'NAV']}
            labelFormatter={(label) => formatAxisDate(String(label), activeNavRange)}
          />
          <Line
            type="monotone"
            dataKey="nav"
            stroke={colors.line}
            strokeWidth={1.5}
            dot={false}
            activeDot={{ r: 4, fill: colors.line, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <NavChartStats />
    </div>
  );
}
