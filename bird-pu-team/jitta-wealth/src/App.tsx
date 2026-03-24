import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { LandingPage } from '@/pages/LandingPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { FundsPage } from '@/pages/FundsPage'
import { PortfolioPage } from '@/pages/PortfolioPage'
import { NAVPage } from '@/pages/NAVPage'
import { ROUTES } from '@/constants/routes'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.LANDING} element={<LandingPage />} />
        <Route element={<AppShell />}>
          <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
          <Route path={ROUTES.FUNDS} element={<FundsPage />} />
          <Route path={ROUTES.PORTFOLIO} element={<PortfolioPage />} />
          <Route path={ROUTES.NAV} element={<NAVPage />} />
        </Route>
        <Route path="*" element={<Navigate to={ROUTES.LANDING} replace />} />
      </Routes>
    </BrowserRouter>
  )
}
