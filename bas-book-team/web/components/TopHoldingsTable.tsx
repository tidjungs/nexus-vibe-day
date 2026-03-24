interface TopHolding {
  symbol: string;
  name: string;
  value: number;
  gainLoss: number;
  gainPct: number;
}

interface Props {
  holdings: TopHolding[];
  totalNav: number;
}

function fmt(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(value);
}

function fmtPct(value: number) {
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
}

export default function TopHoldingsTable({ holdings, totalNav }: Props) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-700">
        <h2 className="text-white font-semibold">Top Holdings</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="px-4 py-3 text-left text-slate-400 font-medium">Symbol</th>
              <th className="px-4 py-3 text-left text-slate-400 font-medium">Name</th>
              <th className="px-4 py-3 text-right text-slate-400 font-medium">Mkt Value</th>
              <th className="px-4 py-3 text-right text-slate-400 font-medium">Gain / Loss</th>
              <th className="px-4 py-3 text-right text-slate-400 font-medium">Return %</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((h) => {
              const sharePct = (h.value / totalNav) * 100;
              return (
                <tr
                  key={h.symbol}
                  className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="font-bold text-white tabular-nums">{h.symbol}</div>
                    <div className="mt-1 h-1 w-full bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${Math.min(sharePct, 100)}%` }}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-300">{h.name}</td>
                  <td className="px-4 py-3 text-right text-white font-medium tabular-nums">
                    {fmt(h.value)}
                  </td>
                  <td
                    className={`px-4 py-3 text-right font-medium tabular-nums ${
                      h.gainLoss >= 0 ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {h.gainLoss >= 0 ? "+" : ""}
                    {fmt(h.gainLoss)}
                  </td>
                  <td
                    className={`px-4 py-3 text-right font-medium tabular-nums ${
                      h.gainPct >= 0 ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {fmtPct(h.gainPct)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
