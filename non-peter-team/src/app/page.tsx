import Link from 'next/link';

const NAV_ITEMS = [
  {
    href: '/dashboard',
    icon: 'dashboard',
    label: 'Dashboard',
    description: 'Overview of your financial health',
  },
  {
    href: '/portfolio/1',
    icon: 'account_balance_wallet',
    label: 'Portfolio',
    description: 'Net asset value & growth projection',
  },
  {
    href: '/assets',
    icon: 'candlestick_chart',
    label: 'Assets',
    description: 'Browse and filter all holdings',
  },
  {
    href: '/login',
    icon: 'login',
    label: 'Login',
    description: 'Sign in to your account',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      {/* Brand */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-on-primary">
          <span
            className="material-symbols-outlined text-2xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            shield
          </span>
        </div>
        <h1 className="font-headline font-black text-primary text-3xl tracking-tighter">
          Steward Wealth
        </h1>
      </div>

      <p className="text-on-surface-variant text-sm mb-12 font-label">
        Your intelligent investment companion
      </p>

      {/* Nav menu */}
      <nav className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl">
        {NAV_ITEMS.map(({ href, icon, label, description }) => (
          <Link
            key={href}
            href={href}
            className="group flex items-center gap-4 bg-surface-container-low hover:bg-[#ffd0e3]/60 border border-outline-variant/30 rounded-xl p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-on-primary transition-colors text-primary">
              <span className="material-symbols-outlined">{icon}</span>
            </div>
            <div>
              <p className="font-headline font-bold text-on-surface text-sm">{label}</p>
              <p className="text-on-surface-variant text-xs mt-0.5">{description}</p>
            </div>
          </Link>
        ))}
      </nav>
    </main>
  );
}
