// Market Overview — server component (no interactivity needed)

// ── Mock data ─────────────────────────────────────────────────────────────────

const indices = [
  { label: "S&P 500", value: 5234.18, changePct: 0.87 },
  { label: "NASDAQ", value: 16742.39, changePct: 1.24 },
  { label: "DOW", value: 38996.39, changePct: -0.12 },
  { label: "VIX", value: 14.82, changePct: -3.21, invertSentiment: true },
];

const gainers = [
  { symbol: "NVDA", price: 924.11, changePct: 6.43 },
  { symbol: "META", price: 514.77, changePct: 4.12 },
  { symbol: "SMCI", price: 876.22, changePct: 3.87 },
  { symbol: "AMD", price: 178.56, changePct: 3.41 },
  { symbol: "PANW", price: 312.09, changePct: 2.98 },
];

const losers = [
  { symbol: "INTC", price: 31.44, changePct: -4.22 },
  { symbol: "PFE", price: 26.81, changePct: -3.17 },
  { symbol: "BA", price: 178.33, changePct: -2.74 },
  { symbol: "CVS", price: 53.97, changePct: -2.41 },
  { symbol: "WBA", price: 17.62, changePct: -2.09 },
];

const sectors = [
  { name: "Technology", changePct: 1.84 },
  { name: "Communication Services", changePct: 1.31 },
  { name: "Consumer Discretionary", changePct: 0.92 },
  { name: "Industrials", changePct: 0.47 },
  { name: "Financials", changePct: 0.21 },
  { name: "Real Estate", changePct: -0.18 },
  { name: "Healthcare", changePct: -0.63 },
  { name: "Consumer Staples", changePct: -0.89 },
  { name: "Utilities", changePct: -1.14 },
  { name: "Energy", changePct: -1.52 },
];

const news = [
  {
    title: "Fed Holds Rates Steady, Signals Two Cuts Still Possible in 2025",
    source: "Reuters",
    time: "2h ago",
    description:
      "The Federal Reserve kept its benchmark rate unchanged at 5.25–5.50%, while Chair Powell reiterated that the committee needs more confidence that inflation is sustainably moving toward 2%.",
  },
  {
    title: "NVIDIA Surges After Record Data-Center Revenue Beat",
    source: "Bloomberg",
    time: "4h ago",
    description:
      "NVIDIA reported quarterly data-center revenue of $22.6 billion, exceeding analyst estimates by nearly 12% and driving its stock to fresh all-time highs in pre-market trading.",
  },
  {
    title: "Apple Eyes On-Device AI Rollout for iPhone 17 Line",
    source: "The Verge",
    time: "5h ago",
    description:
      "Leaked supply-chain documents suggest Apple's upcoming iPhone 17 series will ship with a dedicated neural-engine chip capable of running large language models entirely offline.",
  },
  {
    title: "Oil Slides as OPEC+ Signals Output Increase Ahead of Schedule",
    source: "WSJ",
    time: "6h ago",
    description:
      "Crude futures fell more than 2% after sources familiar with OPEC+ deliberations indicated the cartel may unwind voluntary production cuts earlier than the June target date.",
  },
  {
    title: "Treasury Yields Ease as Bond Market Prices in Soft-Landing Scenario",
    source: "FT",
    time: "8h ago",
    description:
      "The 10-year Treasury yield dipped to 4.31% as investors grew more optimistic that the U.S. economy can achieve a soft landing, reducing demand for safe-haven assets.",
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmtPrice(v: number) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(v);
}

function changeColor(pct: number, invertSentiment = false) {
  const positive = invertSentiment ? pct < 0 : pct >= 0;
  return positive ? "text-[#BDFF00]" : "text-red-400";
}

function changeBadgeClass(pct: number, invertSentiment = false) {
  const positive = invertSentiment ? pct < 0 : pct >= 0;
  return positive
    ? "bg-[#BDFF00]/10 text-[#BDFF00]"
    : "bg-red-400/10 text-red-400";
}

// Max absolute value across all sectors — used to scale bars
const maxSectorAbs = Math.max(...sectors.map((s) => Math.abs(s.changePct)));

// ── Page ──────────────────────────────────────────────────────────────────────

export default function MarketPage() {
  const dateStr = new Date("2026-03-24").toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-[#0D1117] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">

        {/* ── Header ────────────────────────────────────────────────────── */}
        <div className="mb-8">
          <p className="text-[#8b949e] text-sm font-medium uppercase tracking-widest mb-1">
            {dateStr}
          </p>
          <h1 className="text-3xl sm:text-5xl font-bold">Market Overview</h1>
        </div>

        {/* ── Market Indices Bar ────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {indices.map((idx) => {
            const positive = idx.invertSentiment
              ? idx.changePct < 0
              : idx.changePct >= 0;
            return (
              <div
                key={idx.label}
                className="bg-[#161b22] border border-[#21262d] rounded-xl p-6"
              >
                <p className="text-[#8b949e] text-xs font-medium uppercase tracking-wider mb-2">
                  {idx.label}
                </p>
                <p className="text-2xl font-bold tabular-nums mb-1">
                  {fmtPrice(idx.value)}
                </p>
                <span
                  className={`text-sm px-2 py-0.5 rounded-full font-medium tabular-nums ${changeBadgeClass(
                    idx.changePct,
                    idx.invertSentiment
                  )}`}
                >
                  {positive ? "+" : ""}
                  {idx.changePct.toFixed(2)}%
                </span>
              </div>
            );
          })}
        </div>

        {/* ── Top Movers ───────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {/* Gainers */}
          <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-6">
            <h2 className="text-[#8b949e] text-xs font-medium uppercase tracking-widest mb-4">
              Top Gainers
            </h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[#8b949e] text-xs border-b border-[#21262d]">
                  <th className="text-left pb-2 font-medium">Symbol</th>
                  <th className="text-right pb-2 font-medium">Price</th>
                  <th className="text-right pb-2 font-medium">Change %</th>
                </tr>
              </thead>
              <tbody>
                {gainers.map((s) => (
                  <tr key={s.symbol} className="border-b border-[#21262d]/50 last:border-0">
                    <td className="py-3 font-semibold">{s.symbol}</td>
                    <td className="py-3 text-right tabular-nums">{fmtPrice(s.price)}</td>
                    <td className={`py-3 text-right tabular-nums font-semibold ${changeColor(s.changePct)}`}>
                      +{s.changePct.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Losers */}
          <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-6">
            <h2 className="text-[#8b949e] text-xs font-medium uppercase tracking-widest mb-4">
              Top Losers
            </h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[#8b949e] text-xs border-b border-[#21262d]">
                  <th className="text-left pb-2 font-medium">Symbol</th>
                  <th className="text-right pb-2 font-medium">Price</th>
                  <th className="text-right pb-2 font-medium">Change %</th>
                </tr>
              </thead>
              <tbody>
                {losers.map((s) => (
                  <tr key={s.symbol} className="border-b border-[#21262d]/50 last:border-0">
                    <td className="py-3 font-semibold">{s.symbol}</td>
                    <td className="py-3 text-right tabular-nums">{fmtPrice(s.price)}</td>
                    <td className={`py-3 text-right tabular-nums font-semibold ${changeColor(s.changePct)}`}>
                      {s.changePct.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Sector Performance ───────────────────────────────────────── */}
        <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-6 mb-8">
          <h2 className="text-[#8b949e] text-xs font-medium uppercase tracking-widest mb-6">
            Sector Performance
          </h2>
          <div className="space-y-3">
            {sectors.map((sector) => {
              const positive = sector.changePct >= 0;
              // Bar width as % of the container half (0–50%), centered
              const barWidthPct = (Math.abs(sector.changePct) / maxSectorAbs) * 48;
              return (
                <div key={sector.name} className="flex items-center gap-3">
                  {/* Label */}
                  <span className="text-sm text-[#8b949e] w-44 shrink-0 truncate">
                    {sector.name}
                  </span>

                  {/* Bar track — split into negative (left) and positive (right) halves */}
                  <div className="flex flex-1 h-5 rounded overflow-hidden bg-[#0D1117]">
                    {/* Negative half */}
                    <div className="flex flex-1 justify-end">
                      {!positive && (
                        <div
                          className="h-full rounded-l bg-red-500/70"
                          style={{ width: `${barWidthPct}%` }}
                        />
                      )}
                    </div>
                    {/* Center divider */}
                    <div className="w-px bg-[#21262d] shrink-0" />
                    {/* Positive half */}
                    <div className="flex flex-1 justify-start">
                      {positive && (
                        <div
                          className="h-full rounded-r bg-[#BDFF00]/70"
                          style={{ width: `${barWidthPct}%` }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Value */}
                  <span
                    className={`text-sm tabular-nums font-semibold w-16 text-right shrink-0 ${
                      positive ? "text-[#BDFF00]" : "text-red-400"
                    }`}
                  >
                    {positive ? "+" : ""}
                    {sector.changePct.toFixed(2)}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Market News ──────────────────────────────────────────────── */}
        <div>
          <h2 className="text-[#8b949e] text-xs font-medium uppercase tracking-widest mb-4">
            Market News
          </h2>
          <div className="space-y-3">
            {news.map((item) => (
              <div
                key={item.title}
                className="bg-[#161b22] border border-[#21262d] rounded-xl p-6"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#0A84FF] text-xs font-semibold uppercase tracking-wider">
                    {item.source}
                  </span>
                  <span className="text-[#21262d]">·</span>
                  <span className="text-[#8b949e] text-xs">{item.time}</span>
                </div>
                <p className="text-white font-semibold text-sm leading-snug mb-1">
                  {item.title}
                </p>
                <p className="text-[#8b949e] text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
