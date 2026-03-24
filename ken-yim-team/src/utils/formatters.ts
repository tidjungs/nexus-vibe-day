import type { NavTimeRange } from '../types/portfolio';

export function formatCurrency(n: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

export function formatCurrencyShort(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}k`;
  return `$${n}`;
}

export function formatPct(n: number): string {
  const sign = n >= 0 ? '+' : '';
  return `${sign}${n.toFixed(2)}%`;
}

export function formatAxisDate(dateStr: string, range: NavTimeRange): string {
  const date = new Date(dateStr + 'T00:00:00');
  if (range === '1M') {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
  if (range === '3M') {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
  // 1Y and ALL: "Mar '25"
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const year = String(date.getFullYear()).slice(2);
  return `${month} '${year}`;
}

export function formatVolume(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}
