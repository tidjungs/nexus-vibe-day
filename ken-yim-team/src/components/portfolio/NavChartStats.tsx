import { usePortfolioStore } from '../../store/usePortfolioStore';
import { formatCurrencyShort, formatVolume } from '../../utils/formatters';

export default function NavChartStats() {
  const { activeNavRange, navChartMeta } = usePortfolioStore();
  const meta = navChartMeta[activeNavRange];

  const stats = [
    { label: 'Low', value: formatCurrencyShort(meta.low) },
    { label: 'High', value: formatCurrencyShort(meta.high) },
    { label: 'Vol', value: formatVolume(meta.vol) },
    { label: 'Avg', value: formatCurrencyShort(meta.avg) },
  ];

  return (
    <div className="flex items-center gap-6 mt-4 pt-4 border-t border-[var(--color-border-subtle)]">
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col gap-1">
          <span className="text-[10px] uppercase tracking-[0.15em] text-[var(--color-text-tertiary)]">{s.label}</span>
          <span className="text-sm font-medium text-[var(--color-text-primary)]">{s.value}</span>
        </div>
      ))}
    </div>
  );
}
