import { NavLink } from 'react-router-dom'
import { LayoutDashboard, BarChart2, BriefcaseBusiness, TrendingUp, X } from 'lucide-react'
import { ROUTES } from '@/constants/routes'

const links = [
  { to: ROUTES.DASHBOARD, icon: LayoutDashboard, label: 'Dashboard' },
  { to: ROUTES.FUNDS, icon: BarChart2, label: 'Funds' },
  { to: ROUTES.PORTFOLIO, icon: BriefcaseBusiness, label: 'Portfolio' },
  { to: ROUTES.NAV, icon: TrendingUp, label: 'NAV History' },
]

interface SidebarProps {
  onClose?: () => void
}

export function Sidebar({ onClose }: SidebarProps) {
  return (
    <aside className="flex flex-col h-full bg-brand-navyMid border-r border-brand-navyLight">
      {/* Logo */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-brand-navyLight">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand-green flex items-center justify-center">
            <span className="text-brand-navy font-black text-sm">J</span>
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-none">Jitta</p>
            <p className="text-brand-muted text-xs">Wealth</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-brand-muted hover:text-white p-1 lg:hidden">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-brand-green/15 text-brand-green'
                  : 'text-brand-muted hover:text-white hover:bg-brand-navyLight'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div className="px-4 py-4 border-t border-brand-navyLight">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-brand-navyLight flex items-center justify-center text-xs font-bold text-brand-green">
            JW
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white font-medium truncate">Investor</p>
            <p className="text-xs text-brand-muted truncate">Premium Plan</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
