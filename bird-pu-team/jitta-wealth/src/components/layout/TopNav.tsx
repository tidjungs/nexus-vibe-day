import { Menu, Bell } from 'lucide-react'

interface TopNavProps {
  onMenuClick: () => void
  title: string
}

export function TopNav({ onMenuClick, title }: TopNavProps) {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-brand-navyLight bg-brand-navyMid lg:hidden">
      <button onClick={onMenuClick} className="text-brand-muted hover:text-white p-1">
        <Menu size={22} />
      </button>
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-md bg-brand-green flex items-center justify-center">
          <span className="text-brand-navy font-black text-xs">J</span>
        </div>
        <span className="text-white font-semibold text-sm">{title}</span>
      </div>
      <button className="text-brand-muted hover:text-white p-1 relative">
        <Bell size={20} />
        <span className="absolute top-1 right-1 w-2 h-2 bg-brand-green rounded-full" />
      </button>
    </header>
  )
}
