import { Portfolio } from "@/data/mockPortfolios";

interface Props {
  portfolio: Portfolio;
}

function fmt(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
}

function fmtPct(value: number) {
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
}

interface MetricProps {
  label: string;
  value: string;
  sub?: string;
  positive?: boolean;
  neutral?: boolean;
}

function Metric({ label, value, sub, positive, neutral }: MetricProps) {
  const valueColor = neutral
    ? "text-white"
    : positive
    ? "text-emerald-400"
    : "text-red-400";

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
      <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className={`text-2xl font-bold tabular-nums ${valueColor}`}>{value}</p>
      {sub && <p className="text-slate-500 text-xs mt-1">{sub}</p>}
    </div>
  );
}

export default function PerformanceMetrics({ portfolio }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <Metric
        label="Total Return"
        value={fmtPct(portfolio.totalReturnPct)}
        sub={`${portfolio.totalReturn >= 0 ? "+" : ""}${fmt(portfolio.totalReturn)}`}
        positive={portfolio.totalReturn >= 0}
      />
      <Metric
        label="YTD Return"
        value={fmtPct(portfolio.ytdReturnPct)}
        sub={`${portfolio.ytdReturn >= 0 ? "+" : ""}${fmt(portfolio.ytdReturn)}`}
        positive={portfolio.ytdReturn >= 0}
      />
      <Metric
        label="Today's Change"
        value={fmtPct(portfolio.navChangePct)}
        sub={`${portfolio.navChange >= 0 ? "+" : ""}${fmt(portfolio.navChange)}`}
        positive={portfolio.navChange >= 0}
      />
      <Metric
        label="Available Cash"
        value={fmt(portfolio.cash)}
        neutral
      />
    </div>
  );
}
