import { usePortfolioStore } from '../../store/usePortfolioStore';
import { formatCurrency, formatPct } from '../../utils/formatters';

export default function OverviewStats() {
  const s = usePortfolioStore((st) => st.portfolioStats);
  const isPositive = s.change24hUsd >= 0;

  return (
    <div className="rounded-xl bg-[var(--color-bg-card-inner)] border border-[var(--color-border)] p-6 col-span-2">
      {/* Total NAV */}
      <div className="mb-5">
        <p className="text-[10px] uppercase tracking-[0.15em] text-[var(--color-text-tertiary)] mb-1">
          Total Net Asset Value
        </p>
        <p className="text-4xl font-bold text-[var(--color-text-primary)] font-mono tracking-tight">
          {formatCurrency(s.totalNav)}
        </p>
      </div>

      {/* 24h Change */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[var(--color-text-secondary)] text-xs">24h Change</span>
        <span className={`flex items-center gap-1 text-sm font-medium`} style={{ color: isPositive ? 'var(--color-positive)' : 'var(--color-negative)' }}>
          <span>{isPositive ? '↑' : '↓'}</span>
          {isPositive ? '+' : ''}{formatCurrency(s.change24hUsd)} ({formatPct(s.change24hPct)})
        </span>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-[var(--color-bg-subtle)] rounded-lg p-3">
          <p className="text-[10px] uppercase tracking-[0.12em] text-[var(--color-text-tertiary)] mb-1">
            Annualized Return
          </p>
          <p className="text-sm font-semibold" style={{ color: 'var(--color-positive)' }}>+{s.annualizedReturn}%</p>
        </div>
        <div className="bg-[var(--color-bg-subtle)] rounded-lg p-3">
          <p className="text-[10px] uppercase tracking-[0.12em] text-[var(--color-text-tertiary)] mb-1">
            Risk Variance
          </p>
          <p className="text-sm font-semibold text-[var(--color-text-primary)]">
            {s.riskLabel} (σ {s.riskVariance})
          </p>
        </div>
      </div>

      {/* Alpha Signal */}
      <div className="border border-[var(--color-border)] rounded-lg p-3">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[var(--color-text-tertiary)] mb-2">
          Alpha Signal
        </p>
        <p className="text-[var(--color-text-secondary)] text-xs italic leading-relaxed">
          "{s.alphaSignalQuote}"
        </p>
      </div>
    </div>
  );
}
