type Variant = 'green' | 'red' | 'gold' | 'muted' | 'blue' | 'purple'

const styles: Record<Variant, string> = {
  green: 'bg-brand-green/10 text-brand-green',
  red: 'bg-brand-red/10 text-brand-red',
  gold: 'bg-brand-gold/10 text-brand-gold',
  muted: 'bg-slate-100 text-brand-muted',
  blue: 'bg-blue-50 text-blue-600',
  purple: 'bg-purple-50 text-purple-600',
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
