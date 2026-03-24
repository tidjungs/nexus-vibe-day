import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Badge } from '@/components/ui/Badge'

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>Risk 3</Badge>)
    expect(screen.getByText('Risk 3')).toBeInTheDocument()
  })

  it('applies green variant classes', () => {
    render(<Badge variant="green">Active</Badge>)
    const el = screen.getByText('Active')
    expect(el).toHaveClass('text-brand-green')
  })

  it('applies red variant classes', () => {
    render(<Badge variant="red">Loss</Badge>)
    const el = screen.getByText('Loss')
    expect(el).toHaveClass('text-brand-red')
  })

  it('defaults to muted variant', () => {
    render(<Badge>Default</Badge>)
    const el = screen.getByText('Default')
    expect(el).toHaveClass('text-brand-muted')
  })

  it('merges custom className', () => {
    render(<Badge className="custom-class">Tag</Badge>)
    expect(screen.getByText('Tag')).toHaveClass('custom-class')
  })
})
