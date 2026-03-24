"use client";

import { useParams, useRouter } from "next/navigation";
import { mockPortfolios } from "@/data/mockPortfolios";
import { usePortfolioStore } from "@/store/portfolioStore";
import NavChart from "@/components/NavChart";
import AllocationChart from "@/components/AllocationChart";
import HoldingsTable from "@/components/HoldingsTable";
import PerformanceMetrics from "@/components/PerformanceMetrics";

function fmt(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
}

export default function PortfolioDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { timeRange, setTimeRange } = usePortfolioStore();

  const id = params.id as string;
  const portfolio = mockPortfolios.find((p) => p.id === id);

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-[#0D1117] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#8b949e] text-lg">Portfolio not found</p>
          <button
            onClick={() => router.push("/portfolios")}
            className="mt-4 text-[#BDFF00] hover:text-[#d4ff33]"
          >
            ← Back to portfolios
          </button>
        </div>
      </div>
    );
  }

  const isPositive = portfolio.navChange >= 0;

  return (
    <div className="min-h-screen bg-[#0D1117] text-white">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8">
          <button
            onClick={() => router.push("/portfolios")}
            className="text-[#8b949e] hover:text-white text-sm transition-colors"
          >
            ← Portfolios
          </button>
          <span className="text-slate-600">/</span>
          <span className="text-slate-300 text-sm">{portfolio.name}</span>
        </div>

        {/* Portfolio header + switcher */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-[#8b949e] text-sm font-medium uppercase tracking-widest mb-1">
              {portfolio.name}
            </p>
            <h1 className="text-5xl font-bold tabular-nums mb-2">
              {fmt(portfolio.nav)}
            </h1>
            <div className="flex items-center gap-2">
              <span
                className={`text-lg font-semibold tabular-nums ${
                  isPositive ? "text-[#BDFF00]" : "text-red-400"
                }`}
              >
                {isPositive ? "+" : ""}
                {fmt(portfolio.navChange)}
              </span>
              <span
                className={`text-sm px-2 py-0.5 rounded-full ${
                  isPositive
                    ? "bg-[#BDFF00]/10 text-[#BDFF00]"
                    : "bg-red-400/10 text-red-400"
                }`}
              >
                {isPositive ? "+" : ""}
                {portfolio.navChangePct.toFixed(2)}%
              </span>
              <span className="text-[#8b949e] text-sm">today</span>
            </div>
          </div>

          {/* Portfolio switcher */}
          <select
            value={portfolio.id}
            onChange={(e) => router.push(`/portfolios/${e.target.value}`)}
            className="bg-[#161b22] border border-[#21262d] text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#BDFF00] cursor-pointer"
          >
            {mockPortfolios.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* Performance metrics */}
        <div className="mb-6">
          <PerformanceMetrics portfolio={portfolio} />
        </div>

        {/* NAV Chart */}
        <div className="mb-6">
          <NavChart
            history={portfolio.navHistory}
            timeRange={timeRange}
            onTimeRangeChange={setTimeRange}
          />
        </div>

        {/* Allocation + Holdings side by side on large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-1">
            <AllocationChart allocation={portfolio.allocation} />
          </div>
          <div className="lg:col-span-2">
            <HoldingsTable holdings={portfolio.holdings} />
          </div>
        </div>
      </div>
    </div>
  );
}
