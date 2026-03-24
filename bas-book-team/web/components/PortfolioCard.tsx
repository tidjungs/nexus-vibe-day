import Link from "next/link";
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

export default function PortfolioCard({ portfolio }: Props) {
  const isPositive = portfolio.navChange >= 0;

  return (
    <Link href={`/portfolios/${portfolio.id}`}>
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-blue-500 hover:bg-slate-750 transition-all cursor-pointer group">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">
              {portfolio.name}
            </h3>
            <p className="text-white text-3xl font-bold tabular-nums mt-1">
              {fmt(portfolio.nav)}
            </p>
          </div>
          <span className="text-blue-400 text-xs bg-blue-400/10 px-2 py-1 rounded-md group-hover:bg-blue-400/20 transition-colors">
            View →
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`text-sm font-semibold tabular-nums ${
              isPositive ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {isPositive ? "+" : ""}
            {fmt(portfolio.navChange)}
          </span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              isPositive
                ? "bg-emerald-400/10 text-emerald-400"
                : "bg-red-400/10 text-red-400"
            }`}
          >
            {isPositive ? "+" : ""}
            {portfolio.navChangePct.toFixed(2)}%
          </span>
          <span className="text-slate-500 text-xs">today</span>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-700 grid grid-cols-3 gap-4">
          <div>
            <p className="text-slate-500 text-xs">Total Return</p>
            <p
              className={`text-sm font-semibold tabular-nums ${
                portfolio.totalReturn >= 0 ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {portfolio.totalReturn >= 0 ? "+" : ""}
              {portfolio.totalReturnPct.toFixed(1)}%
            </p>
          </div>
          <div>
            <p className="text-slate-500 text-xs">YTD</p>
            <p
              className={`text-sm font-semibold tabular-nums ${
                portfolio.ytdReturn >= 0 ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {portfolio.ytdReturn >= 0 ? "+" : ""}
              {portfolio.ytdReturnPct.toFixed(1)}%
            </p>
          </div>
          <div>
            <p className="text-slate-500 text-xs">Cash</p>
            <p className="text-sm font-semibold text-slate-300 tabular-nums">
              {fmt(portfolio.cash)}
            </p>
          </div>
        </div>

        <div className="mt-4 flex gap-1.5">
          {portfolio.allocation.map((a) => (
            <div
              key={a.class}
              className="h-1.5 rounded-full"
              style={{ width: `${a.pct}%`, backgroundColor: a.color }}
              title={`${a.class}: ${a.pct}%`}
            />
          ))}
        </div>
      </div>
    </Link>
  );
}
