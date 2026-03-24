import Link from 'next/link';
import { StewardFAB } from '@/components/ui/StewardFAB';

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* SideNavBar */}
      <aside className="fixed left-0 top-0 h-screen w-64 flex flex-col p-6 z-50 bg-[#ffecf2] border-r-0 rounded-r-[2rem] shadow-[12px_0_40px_rgba(73,33,54,0.08)]">
        <div className="mb-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              shield
            </span>
          </div>
          <span className="text-xl font-bold text-[#492136] font-headline">The Steward</span>
        </div>

        <nav className="flex-1 space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 text-[#7c4d64] px-4 py-3 font-label font-semibold text-sm hover:bg-[#ffd0e3]/50 rounded-xl transition-all hover:translate-x-1 duration-200"
          >
            <span className="material-symbols-outlined">dashboard</span>
            Dashboard
          </Link>
          <Link
            href="/portfolio"
            className="flex items-center gap-3 bg-[#ffd0e3] text-[#b60051] rounded-xl px-4 py-3 shadow-sm font-label font-semibold text-sm translate-x-1 duration-200"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              account_balance_wallet
            </span>
            Portfolio
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 text-[#7c4d64] px-4 py-3 font-label font-semibold text-sm hover:bg-[#ffd0e3]/50 rounded-xl transition-all hover:translate-x-1 duration-200"
          >
            <span className="material-symbols-outlined">ads_click</span>
            Targets
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 text-[#7c4d64] px-4 py-3 font-label font-semibold text-sm hover:bg-[#ffd0e3]/50 rounded-xl transition-all hover:translate-x-1 duration-200"
          >
            <span className="material-symbols-outlined">settings</span>
            Settings
          </Link>
        </nav>

        <div className="mt-auto space-y-4">
          <button className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined">add_circle</span>
            Add Funds
          </button>
          <Link
            href="#"
            className="flex items-center gap-3 text-[#7c4d64] px-4 py-3 font-label font-semibold text-sm hover:bg-[#ffd0e3]/50 rounded-xl transition-all"
          >
            <span className="material-symbols-outlined">contact_support</span>
            Support
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64">
        {/* TopAppBar */}
        <header className="flex justify-between items-center w-full px-8 py-4 sticky top-0 bg-[#fff4f6]/80 backdrop-blur-md z-40 mb-8 rounded-b-lg">
          <h1 className="font-headline font-black text-primary text-2xl tracking-tighter">
            Steward Wealth
          </h1>
          <div className="flex items-center gap-8">
            <nav className="hidden md:flex items-center gap-6">
              <a
                href="#"
                className="text-primary border-b-2 border-primary pb-1 font-headline font-bold text-lg tracking-tight"
              >
                Markets
              </a>
              <a
                href="#"
                className="text-[#7c4d64] font-medium hover:text-primary-container transition-colors font-headline text-lg tracking-tight"
              >
                Insights
              </a>
              <a
                href="#"
                className="text-[#7c4d64] font-medium hover:text-primary-container transition-colors font-headline text-lg tracking-tight"
              >
                Help
              </a>
            </nav>
            <div className="flex items-center gap-4">
              <div className="bg-[#ffecf2] px-4 py-2 rounded-full flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">search</span>
                <input
                  className="bg-transparent border-none focus:ring-0 text-sm text-on-surface w-32 outline-none"
                  placeholder="Search markets..."
                  type="text"
                />
              </div>
              <span className="material-symbols-outlined text-on-surface-variant text-3xl">
                account_circle
              </span>
            </div>
          </div>
        </header>

        <div className="p-8">{children}</div>

        {/* Footer */}
        <footer className="w-full rounded-t-[2rem] mt-12 py-12 px-8 flex flex-col items-center justify-center gap-6 border-t border-[#d69db6]/15 bg-[#fff4f6]">
          <div className="flex gap-10">
            <a
              href="#"
              className="text-[#7c4d64] font-label text-xs uppercase tracking-widest hover:text-primary underline decoration-2 transition-opacity opacity-80 hover:opacity-100"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-[#7c4d64] font-label text-xs uppercase tracking-widest hover:text-primary underline decoration-2 transition-opacity opacity-80 hover:opacity-100"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-[#7c4d64] font-label text-xs uppercase tracking-widest hover:text-primary underline decoration-2 transition-opacity opacity-80 hover:opacity-100"
            >
              Cookie Settings
            </a>
          </div>
          <p className="text-[#7c4d64] font-label text-xs uppercase tracking-widest opacity-60">
            © 2024 Steward Financial. Stay Energetic!
          </p>
        </footer>
      </main>

      <StewardFAB />
    </div>
  );
}
