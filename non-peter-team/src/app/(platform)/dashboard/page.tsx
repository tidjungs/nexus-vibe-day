import { MetricCard } from '@/components/ui/MetricCard';
import { formatCurrency, formatPercent } from '@/lib/utils/format';

export default function DashboardPage() {
  // TODO: Replace with actual data from API
  const totalValue = 1250000;
  const totalCostBasis = 1100000;
  const totalGainLoss = 150000;
  const totalGainLossPercent = 13.64;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-2 text-slate-600">Overview of your investment portfolio</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Total Portfolio Value"
          value={formatCurrency(totalValue)}
          change={`${formatCurrency(totalGainLoss)} (${formatPercent(totalGainLossPercent)})`}
          isPositive={totalGainLoss >= 0}
        />
        <MetricCard
          label="Total Cost Basis"
          value={formatCurrency(totalCostBasis)}
        />
        <MetricCard
          label="Total Gain/Loss"
          value={formatCurrency(totalGainLoss)}
          isPositive={totalGainLoss >= 0}
        />
        <MetricCard
          label="Return"
          value={formatPercent(totalGainLossPercent)}
          isPositive={totalGainLoss >= 0}
        />
      </div>

      {/* Placeholder for charts and additional content */}
      <div className="rounded-xl border border-slate-200 bg-white p-8">
        <h2 className="text-lg font-semibold text-slate-900">Performance Chart</h2>
        <p className="mt-4 text-slate-600">Chart placeholder - implement with Recharts or Tremor</p>
      </div>
    </div>
  );
}
