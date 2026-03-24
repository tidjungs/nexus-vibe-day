import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { TopNav } from './TopNav'
import { MobileNav } from './MobileNav'
import { ROUTES } from '@/constants/routes'

const titles: Record<string, string> = {
  [ROUTES.DASHBOARD]: 'Dashboard',
  [ROUTES.FUNDS]: 'Funds',
  [ROUTES.PORTFOLIO]: 'Portfolio',
  [ROUTES.NAV]: 'NAV History',
}

export function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { pathname } = useLocation()

  return (
    <div className="flex h-screen bg-brand-bg overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex w-60 flex-shrink-0">
        <div className="w-full">
          <Sidebar />
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-60 z-50">
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopNav onMenuClick={() => setSidebarOpen(true)} title={titles[pathname] ?? 'Jitta WOW!'} />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
        <MobileNav />
      </div>
    </div>
  )
}
