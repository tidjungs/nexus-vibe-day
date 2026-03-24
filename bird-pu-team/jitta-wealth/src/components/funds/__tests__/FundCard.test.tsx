import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FundCard } from '@/components/funds/FundCard'
import type { Fund } from '@/types/fund'

const mockFund: Fund = {
  id: 'RANKING',
  name: 'Jitta Ranking',
  shortName: 'Jitta Ranking',
  category: 'ranking',
  riskLevel: 5,
  nav: 19.4561,
  navDate: '2026-03-21',
  dailyChange: 0.3842,
  dailyChangePercent: 2.01,
  ytdReturn: 18.76,
  oneYearReturn: 24.15,
  threeYearReturn: 72.43,
  minInvestment: 500_000,
  managementFee: 0.5,
  description: 'Test fund',
  topHoldings: ['Apple Inc. (AAPL)'],
}

describe('FundCard', () => {
  it('renders fund name', () => {
    render(<FundCard fund={mockFund} onClick={vi.fn()} />)
    expect(screen.getAllByText('Jitta Ranking').length).toBeGreaterThan(0)
  })

  it('renders NAV value', () => {
    render(<FundCard fund={mockFund} onClick={vi.fn()} />)
    expect(screen.getByText('฿19.4561')).toBeInTheDocument()
  })

  it('renders category badge', () => {
    render(<FundCard fund={mockFund} onClick={vi.fn()} />)
    // category badge and fund name both show "Jitta Ranking"
    expect(screen.getAllByText('Jitta Ranking').length).toBeGreaterThanOrEqual(2)
  })

  it('renders YTD return', () => {
    render(<FundCard fund={mockFund} onClick={vi.fn()} />)
    expect(screen.getByText('+18.76%')).toBeInTheDocument()
  })

  it('calls onClick with the fund when clicked', async () => {
    const handleClick = vi.fn()
    render(<FundCard fund={mockFund} onClick={handleClick} />)
    await userEvent.click(screen.getAllByText('Jitta Ranking')[0])
    expect(handleClick).toHaveBeenCalledOnce()
    expect(handleClick).toHaveBeenCalledWith(mockFund)
  })
})
