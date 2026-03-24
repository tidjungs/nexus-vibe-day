import { usePortfolioStore } from '../../store/usePortfolioStore';
import HoldingsRow from './HoldingsRow';

const legend = [
  { label: 'Equities', color: 'bg-[var(--color-text-primary)]' },
  { label: 'Bonds', color: 'bg-blue-400' },
  { label: 'Digital', color: 'bg-emerald-400' },
];

export default function HoldingsTable() {
  const { showAllHoldings, toggleShowAllHoldings, holdings } = usePortfolioStore();
  const visible = showAllHoldings ? holdings : holdings.slice(0, 4);

  return (
    <div className="rounded-xl bg-[var(--color-bg-card-inner)] border border-[var(--color-border)] p-6 mt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[var(--color-text-primary)] text-lg font-semibold">Core Asset Holdings</h2>
        <div className="flex items-center gap-4">
          {legend.map((l) => (
            <div key={l.label} className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${l.color}`} />
              <span className="text-[var(--color-text-secondary)] text-xs">{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--color-border)]">
            <th className="pb-3 text-left text-[10px] uppercase tracking-[0.12em] text-[var(--color-text-tertiary)] font-medium pr-4">
              Asset Name
            </th>
            <th className="pb-3 text-left text-[10px] uppercase tracking-[0.12em] text-[var(--color-text-tertiary)] font-medium pr-4">
              Ticker
            </th>
            <th className="pb-3 text-left text-[10px] uppercase tracking-[0.12em] text-[var(--color-text-tertiary)] font-medium pr-4">
              Quantity
            </th>
            <th className="pb-3 text-left text-[10px] uppercase tracking-[0.12em] text-[var(--color-text-tertiary)] font-medium pr-4">
              Current Value
            </th>
            <th className="pb-3 text-left text-[10px] uppercase tracking-[0.12em] text-[var(--color-text-tertiary)] font-medium pr-4">
              Allocation
            </th>
            <th className="pb-3 text-right text-[10px] uppercase tracking-[0.12em] text-[var(--color-text-tertiary)] font-medium">
              24H Change
            </th>
          </tr>
        </thead>
        <tbody>
          {visible.map((h) => (
            <HoldingsRow key={h.id} holding={h} />
          ))}
        </tbody>
      </table>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-[var(--color-border-subtle)]">
        <span className="text-[var(--color-text-tertiary)] text-xs">
          Showing {visible.length} of {holdings.length} assets
        </span>
        <button
          onClick={toggleShowAllHoldings}
          className="text-[var(--color-text-secondary)] text-xs font-medium tracking-wider uppercase hover:text-[var(--color-text-primary)] transition-colors"
        >
          {showAllHoldings ? 'Show Less' : 'View All Assets'}
        </button>
      </div>
    </div>
  );
}
