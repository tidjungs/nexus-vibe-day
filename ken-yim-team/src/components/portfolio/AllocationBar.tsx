import type { AssetCategory } from '../../types/portfolio';

const categoryColor: Record<AssetCategory, string> = {
  equities: 'bg-[var(--color-text-primary)]',
  bonds: 'bg-blue-400',
  digital: 'bg-emerald-400',
  realestate: 'bg-amber-400',
};

interface AllocationBarProps {
  allocation: number;
  category: AssetCategory;
}

export default function AllocationBar({ allocation, category }: AllocationBarProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-24 h-1.5 rounded-full bg-[var(--color-border)] overflow-hidden">
        <div
          className={`h-full rounded-full ${categoryColor[category]}`}
          style={{ width: `${Math.min(allocation, 100)}%` }}
        />
      </div>
      <span className="text-[var(--color-text-secondary)] text-xs w-10 text-right">{allocation.toFixed(1)}%</span>
    </div>
  );
}
