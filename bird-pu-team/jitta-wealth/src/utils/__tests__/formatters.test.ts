import { describe, it, expect } from 'vitest'
import { formatTHB, formatPercent, formatNAV, formatUnits, changeClass } from '@/utils/formatters'

describe('formatTHB', () => {
  it('formats positive THB value', () => {
    expect(formatTHB(1234.56)).toContain('1,234.56')
  })
  it('formats compact millions', () => {
    expect(formatTHB(1_500_000, true)).toBe('฿1.50M')
  })
  it('formats compact thousands', () => {
    expect(formatTHB(2500, true)).toBe('฿2.5K')
  })
  it('formats zero', () => {
    expect(formatTHB(0)).toContain('0.00')
  })
})

describe('formatPercent', () => {
  it('adds + sign for positive values', () => {
    expect(formatPercent(5.25)).toBe('+5.25%')
  })
  it('keeps - sign for negative values', () => {
    expect(formatPercent(-2.5)).toBe('-2.50%')
  })
  it('formats zero as +0.00%', () => {
    expect(formatPercent(0)).toBe('+0.00%')
  })
  it('respects custom decimal digits', () => {
    expect(formatPercent(3.1415, 1)).toBe('+3.1%')
  })
})

describe('formatNAV', () => {
  it('formats to 4 decimal places', () => {
    expect(formatNAV(18.4732)).toBe('18.4732')
    expect(formatNAV(10)).toBe('10.0000')
  })
})

describe('formatUnits', () => {
  it('formats with 2 decimal places', () => {
    expect(formatUnits(14820.5)).toBe('14,820.50')
  })
})

describe('changeClass', () => {
  it('returns positive class for positive values', () => {
    expect(changeClass(1)).toBe('text-positive')
    expect(changeClass(0)).toBe('text-positive')
  })
  it('returns negative class for negative values', () => {
    expect(changeClass(-0.01)).toBe('text-negative')
  })
})
