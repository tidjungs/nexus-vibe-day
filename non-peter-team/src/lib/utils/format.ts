export const formatCurrency = (value: number, currency = 'THB'): string =>
  new Intl.NumberFormat('th-TH', { style: 'currency', currency }).format(value);

export const formatPercent = (value: number): string =>
  new Intl.NumberFormat('en', { style: 'percent', minimumFractionDigits: 2 }).format(value / 100);

export const formatCompact = (value: number): string =>
  new Intl.NumberFormat('en', { notation: 'compact' }).format(value);

export const formatDecimal = (value: number, fractionDigits = 2): string =>
  new Intl.NumberFormat('en', { minimumFractionDigits: fractionDigits, maximumFractionDigits: fractionDigits }).format(value);
