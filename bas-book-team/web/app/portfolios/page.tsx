import { mockPortfolios } from "@/data/mockPortfolios";
import PortfolioCard from "@/components/PortfolioCard";
import AggregateNavChart from "@/components/AggregateNavChart";
import AggregateAllocationChart from "@/components/AggregateAllocationChart";
import TopHoldingsTable from "@/components/TopHoldingsTable";

function fmt(v: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(v);
}

export default function PortfoliosPage() {
  const total = mockPortfolios.reduce((sum, p) => sum + p.nav, 0);
  const totalChange = mockPortfolios.reduce((sum, p) => sum + p.navChange, 0);
  const totalChangePct = (totalChange / (total - totalChange)) * 100;

  // Stats bar
  const totalGainLoss = mockPortfolios
    .flatMap((p) => p.holdings)
    .reduce((s, h) => s + h.gainLoss, 0);
  const totalCash = mockPortfolios.reduce((s, p) => s + p.cash, 0);
  const bestToday = mockPortfolios.reduce((b, p) =>
    p.navChangePct > b.navChangePct ? p : b
  );
  const worstToday = mockPortfolios.reduce((w, p) =>
    p.navChangePct < w.navChangePct ? p : w
  );

  // Aggregate NAV history
  const aggregateHistory = mockPortfolios[0].navHistory.map((_, i) => ({
    date: mockPortfolios[0].navHistory[i].date,
    value: mockPortfolios.reduce((s, p) => s + p.navHistory[i].value, 0),
  }));

  // Aggregate allocation
  const classMap: Record<string, { value: number; color: string }> = {};
  for (const p of mockPortfolios)
    for (const a of p.allocation)
      (classMap[a.class] ??= { value: 0, color: a.color }).value +=
        (a.pct / 100) * p.nav;
  const totalNav = mockPortfolios.reduce((s, p) => s + p.nav, 0);
  const allocationData = Object.entries(classMap).map(([cls, d]) => ({
    class: cls,
    value: d.value,
    pct: (d.value / totalNav) * 100,
    color: d.color,
  }));

  // Top holdings
  const holdingMap: Record<
    string,
    { symbol: string; name: string; value: number; gainLoss: number; costBasis: number }
  > = {};
  for (const p of mockPortfolios)
    for (const h of p.holdings) {
      holdingMap[h.symbol] ??= {
        symbol: h.symbol,
        name: h.name,
        value: 0,
        gainLoss: 0,
        costBasis: 0,
      };
      holdingMap[h.symbol].value += h.value;
      holdingMap[h.symbol].gainLoss += h.gainLoss;
      holdingMap[h.symbol].costBasis += h.costBasis;
    }
  const topHoldings = Object.values(holdingMap)
    .map((h) => ({ ...h, gainPct: (h.gainLoss / h.costBasis) * 100 }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);

  return (
    <div className="min-h-screen bg-[#0D1117] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Header */}
        <div className="mb-8">
          <p className="text-[#8b949e] text-sm font-medium uppercase tracking-widest mb-1">
            Total Assets Under Management
          </p>
          <h1 className="text-3xl sm:text-5xl font-bold tabular-nums mb-2">{fmt(total)}</h1>
          <div className="flex items-center gap-2">
            <span
              className={`text-lg font-semibold tabular-nums ${
                totalChange >= 0 ? "text-[#BDFF00]" : "text-red-400"
              }`}
            >
              {totalChange >= 0 ? "+" : ""}
              {fmt(totalChange)}
            </span>
            <span
              className={`text-sm px-2 py-0.5 rounded-full ${
                totalChange >= 0
                  ? "bg-[#BDFF00]/10 text-[#BDFF00]"
                  : "bg-red-400/10 text-red-400"
              }`}
            >
              {totalChange >= 0 ? "+" : ""}
              {totalChangePct.toFixed(2)}%
            </span>
            <span className="text-[#8b949e] text-sm">today</span>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-5">
            <p className="text-[#8b949e] text-xs font-medium uppercase tracking-wider mb-1">
              Unrealized Gain / Loss
            </p>
            <p
              className={`text-2xl font-bold tabular-nums ${
                totalGainLoss >= 0 ? "text-[#BDFF00]" : "text-red-400"
              }`}
            >
              {totalGainLoss >= 0 ? "+" : ""}
              {fmt(totalGainLoss)}
            </p>
          </div>

          <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-5">
            <p className="text-[#8b949e] text-xs font-medium uppercase tracking-wider mb-1">
              Total Cash
            </p>
            <p className="text-2xl font-bold tabular-nums text-white">{fmt(totalCash)}</p>
          </div>

          <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-5">
            <p className="text-[#8b949e] text-xs font-medium uppercase tracking-wider mb-1">
              Best Today
            </p>
            <p className="text-2xl font-bold tabular-nums text-[#BDFF00]">
              +{bestToday.navChangePct.toFixed(2)}%
            </p>
            <p className="text-[#8b949e] text-xs mt-1">{bestToday.name}</p>
          </div>

          <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-5">
            <p className="text-[#8b949e] text-xs font-medium uppercase tracking-wider mb-1">
              Worst Today
            </p>
            <p className="text-2xl font-bold tabular-nums text-red-400">
              {worstToday.navChangePct >= 0 ? "+" : ""}
              {worstToday.navChangePct.toFixed(2)}%
            </p>
            <p className="text-[#8b949e] text-xs mt-1">{worstToday.name}</p>
          </div>
        </div>

        {/* Aggregate NAV Chart */}
        <div className="mb-8">
          <AggregateNavChart data={aggregateHistory} />
        </div>

        {/* Portfolio grid */}
        <div className="mb-8">
          <h2 className="text-[#8b949e] text-sm font-medium uppercase tracking-widest mb-4">
            Portfolios ({mockPortfolios.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockPortfolios.map((portfolio) => (
              <PortfolioCard key={portfolio.id} portfolio={portfolio} />
            ))}
          </div>
        </div>

        {/* Bottom Row: Allocation + Top Holdings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AggregateAllocationChart data={allocationData} />
          <TopHoldingsTable holdings={topHoldings} totalNav={totalNav} />
        </div>
      </div>
    </div>
  );
}
