import type { Holding } from '../../types/portfolio';
import { formatCurrency, formatPct } from '../../utils/formatters';
import AllocationBar from './AllocationBar';

interface HoldingsRowProps {
  holding: Holding;
}

export default function HoldingsRow({ holding }: HoldingsRowProps) {
  const isPositive = holding.change24hPct >= 0;

  return (
    <tr className="border-b border-[var(--color-border-subtle)] hover:bg-[var(--color-bg-card-hover)] transition-colors">
      <td className="py-3 pr-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-[var(--color-bg-subtle)] flex items-center justify-center text-[var(--color-text-secondary)] text-xs font-mono">
            {holding.ticker.slice(0, 2)}
          </div>
          <div>
            <div className="text-[var(--color-text-primary)] text-sm font-medium">{holding.name}</div>
          </div>
        </div>
      </td>
      <td className="py-3 pr-4 text-[var(--color-text-secondary)] text-xs font-mono">{holding.ticker}</td>
      <td className="py-3 pr-4 text-[var(--color-text-secondary)] text-sm">
        {holding.quantity.toLocaleString()}
      </td>
      <td className="py-3 pr-4 text-[var(--color-text-primary)] text-sm font-medium">
        {formatCurrency(holding.currentValue)}
      </td>
      <td className="py-3 pr-4">
        <AllocationBar allocation={holding.allocation} category={holding.category} />
      </td>
      <td className="py-3 text-sm font-medium text-right" style={{ color: isPositive ? 'var(--color-positive)' : 'var(--color-negative)' }}>
        {formatPct(holding.change24hPct)}
      </td>
    </tr>
  );
}
