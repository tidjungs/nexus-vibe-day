type Variant = 'green' | 'red' | 'gold' | 'muted' | 'blue' | 'purple'

const styles: Record<Variant, string> = {
  green: 'bg-brand-green/15 text-brand-green',
  red: 'bg-brand-red/15 text-brand-red',
  gold: 'bg-brand-gold/15 text-brand-gold',
  muted: 'bg-brand-navyLight text-brand-muted',
  blue: 'bg-blue-500/15 text-blue-400',
  purple: 'bg-purple-500/15 text-purple-400',
}

interface BadgeProps {
  children: React.ReactNode
  variant?: Variant
  className?: string
}

export function Badge({ children, variant = 'muted', className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[variant]} ${className}`}>
      {children}
    </span>
  )
}
