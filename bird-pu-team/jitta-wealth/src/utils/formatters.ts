export function formatTHB(value: number, compact = false): string {
  if (compact && Math.abs(value) >= 1_000_000) {
    return `฿${(value / 1_000_000).toFixed(2)}M`
  }
  if (compact && Math.abs(value) >= 1_000) {
    return `฿${(value / 1_000).toFixed(1)}K`
  }
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export function formatPercent(value: number, digits = 2): string {
  const sign = value >= 0 ? '+' : ''
  return `${sign}${value.toFixed(digits)}%`
}

export function formatNAV(value: number): string {
  return value.toFixed(4)
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export function formatUnits(value: number): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export function changeClass(value: number): string {
  return value >= 0 ? 'text-positive' : 'text-negative'
}
