interface StatProps {
  label: string
  value: string
  sub?: string
  subClass?: string
}

export function Stat({ label, value, sub, subClass = '' }: StatProps) {
  return (
    <div>
      <p className="text-xs text-brand-muted mb-1">{label}</p>
      <p className="text-xl font-bold text-brand-text tabnum">{value}</p>
      {sub && <p className={`text-xs mt-0.5 tabnum ${subClass}`}>{sub}</p>}
    </div>
  )
}
