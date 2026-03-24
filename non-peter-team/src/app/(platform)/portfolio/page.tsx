import Link from 'next/link';

export default function PortfolioPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Portfolios</h1>
          <p className="mt-2 text-slate-600">View and manage your investment portfolios</p>
        </div>
        <button className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700">
          Create Portfolio
        </button>
      </div>

      {/* Empty State */}
      <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
        <h3 className="text-lg font-semibold text-slate-900">No portfolios yet</h3>
        <p className="mt-2 text-slate-600">
          Create your first portfolio to start tracking your investments.
        </p>
        <button className="mt-4 rounded-lg bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700">
          Create Portfolio
        </button>
      </div>
    </div>
  );
}
