import { cn } from '@/lib/utils/cn';

export interface MetricCardProps {
  label: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  className?: string;
}

export function MetricCard({ label, value, change, isPositive, className }: MetricCardProps) {
  return (
    <div className={cn('rounded-xl border border-slate-200 bg-white p-5', className)}>
      <p className="text-xs font-medium uppercase tracking-widest text-slate-500">
        {label}
      </p>
      <p className="mt-1 font-mono text-3xl font-semibold tabular-nums text-slate-900">
        {value}
      </p>
      {change && (
        <p
          className={cn(
            'mt-1 text-sm font-mono tabular-nums',
            isPositive ? 'text-green-600' : 'text-red-600'
          )}
        >
          {change}
        </p>
      )}
    </div>
  );
}
