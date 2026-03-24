import { NavLink } from 'react-router-dom'
import { LayoutDashboard, BarChart2, BriefcaseBusiness, TrendingUp } from 'lucide-react'
import { ROUTES } from '@/constants/routes'

const tabs = [
  { to: ROUTES.DASHBOARD, icon: LayoutDashboard, label: 'Dashboard' },
  { to: ROUTES.FUNDS, icon: BarChart2, label: 'Funds' },
  { to: ROUTES.PORTFOLIO, icon: BriefcaseBusiness, label: 'Portfolio' },
  { to: ROUTES.NAV, icon: TrendingUp, label: 'NAV' },
]

export function MobileNav() {
  return (
    <nav className="flex items-center justify-around bg-brand-navyMid border-t border-brand-navyLight px-2 py-1 lg:hidden safe-area-bottom">
      {tabs.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
              isActive ? 'text-brand-green' : 'text-brand-muted'
            }`
          }
        >
          <Icon size={20} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
