import { formatCurrency, formatPercent } from '@/lib/utils/format';
import { DashboardAnimated } from './DashboardAnimated';

export default function DashboardPage() {
  // TODO: Replace with actual data from API
  const totalValue = 1250000;
  const totalCostBasis = 1100000;
  const totalGainLoss = 150000;
  const totalGainLossPercent = 13.64;

  const metrics = [
    {
      label: "Total Portfolio Value",
      value: formatCurrency(totalValue),
      change: `${formatCurrency(totalGainLoss)} (${formatPercent(totalGainLossPercent)})`,
      isPositive: totalGainLoss >= 0,
    },
    {
      label: "Total Cost Basis",
      value: formatCurrency(totalCostBasis),
    },
    {
      label: "Total Gain/Loss",
      value: formatCurrency(totalGainLoss),
      isPositive: totalGainLoss >= 0,
    },
    {
      label: "Return",
      value: formatPercent(totalGainLossPercent),
      isPositive: totalGainLoss >= 0,
    },
  ];

  return <DashboardAnimated metrics={metrics} />;
}
