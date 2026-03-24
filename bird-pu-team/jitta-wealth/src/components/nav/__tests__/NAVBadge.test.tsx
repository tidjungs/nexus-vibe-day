import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NAVBadge } from '@/components/nav/NAVBadge'

describe('NAVBadge', () => {
  it('shows + sign and green color for positive value', () => {
    render(<NAVBadge value={1.23} />)
    const el = screen.getByText('+1.23%')
    expect(el.closest('span')).toHaveClass('text-brand-green')
  })

  it('shows - sign and red color for negative value', () => {
    render(<NAVBadge value={-0.59} />)
    const el = screen.getByText('-0.59%')
    expect(el.closest('span')).toHaveClass('text-brand-red')
  })

  it('handles zero as positive', () => {
    render(<NAVBadge value={0} />)
    expect(screen.getByText('+0.00%')).toBeInTheDocument()
  })

  it('hides icon when showIcon=false', () => {
    const { container } = render(<NAVBadge value={2.5} showIcon={false} />)
    expect(container.querySelector('svg')).not.toBeInTheDocument()
  })

  it('shows icon by default', () => {
    const { container } = render(<NAVBadge value={2.5} />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })
})
