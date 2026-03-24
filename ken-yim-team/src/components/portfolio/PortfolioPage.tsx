import NavChart from './NavChart';
import HoldingsTable from './HoldingsTable';
import OverviewStats from './OverviewStats';

export default function PortfolioPage() {
  return (
    <div className="max-w-[1100px] mx-auto">
      {/* Page Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-tertiary)] mb-1">
            Executive Overview
          </p>
          <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">Portfolio</h1>
        </div>
        <div className="flex items-center gap-3 mt-1">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)] text-xs">
            <span>📅</span>
            <span>Past 30 Days</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[var(--color-range-active-bg)] text-[var(--color-range-active-text)] text-xs font-semibold rounded-lg hover:opacity-90 transition-opacity">
            <span>↓</span>
            Export Report
          </button>
        </div>
      </div>

      {/* Overview + Chart row */}
      <div className="grid grid-cols-5 gap-5">
        <OverviewStats />
        <NavChart />
      </div>

      {/* Holdings */}
      <HoldingsTable />
    </div>
  );
}
