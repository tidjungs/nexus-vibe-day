import Link from 'next/link';

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-200 bg-white p-6">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900">Portfolio</h2>
        </div>

        <nav className="space-y-2">
          <Link
            href="/dashboard"
            className="block rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          >
            Dashboard
          </Link>
          <Link
            href="/portfolio"
            className="block rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          >
            My Portfolios
          </Link>
          <Link
            href="/assets"
            className="block rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          >
            Assets
          </Link>
        </nav>

        <div className="mt-auto border-t border-slate-200 pt-6">
          <button className="w-full rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200">
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <div className="border-b border-slate-200 bg-white px-8 py-6">
          <h1 className="text-2xl font-semibold text-slate-900">Investment Platform</h1>
        </div>
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
