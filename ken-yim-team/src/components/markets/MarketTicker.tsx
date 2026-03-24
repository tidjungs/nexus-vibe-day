import { marketIndices } from '../../data/mockMarkets';

function fmt(v: number, decimals = 2) {
  return v.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export default function MarketTicker() {
  return (
    <div className="grid grid-cols-3 gap-3 lg:grid-cols-6 mb-6">
      {marketIndices.map((idx) => {
        const positive = idx.changePct >= 0;
        return (
          <div
            key={idx.ticker}
            className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl px-4 py-3"
          >
            <p className="text-[10px] uppercase tracking-[0.15em] text-[var(--color-text-tertiary)] mb-1">{idx.ticker}</p>
            <p className="text-sm font-semibold text-[var(--color-text-primary)] leading-tight">{fmt(idx.value)}</p>
            <p className="text-[11px] mt-0.5 font-medium" style={{ color: positive ? 'var(--color-positive)' : 'var(--color-negative)' }}>
              {positive ? '+' : ''}{fmt(idx.changePct)}%
            </p>
          </div>
        );
      })}
    </div>
  );
}
