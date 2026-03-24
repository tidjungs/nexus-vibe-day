import { Routes, Route } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import PortfolioPage from './components/portfolio/PortfolioPage'
import MarketsPage from './components/markets/MarketsPage'

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AppShell>
            <PortfolioPage />
          </AppShell>
        }
      />
      <Route
        path="/markets"
        element={
          <AppShell>
            <MarketsPage />
          </AppShell>
        }
      />
    </Routes>
  )
}

export default App
