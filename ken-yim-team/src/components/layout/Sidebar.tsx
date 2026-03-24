import { NavLink } from 'react-router-dom';
import ThemeToggle from '../ui/ThemeToggle';

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: '▦' },
  { label: 'Portfolio', path: '/', icon: '◎' },
  { label: 'Markets', path: '/markets', icon: '↗' },
  { label: 'Analytics', path: '/analytics', icon: '∿' },
  { label: 'Reports', path: '/reports', icon: '☰' },
];

export default function Sidebar() {
  return (
    <aside className="w-[200px] shrink-0 flex flex-col bg-[var(--color-bg-sidebar)] border-r border-[var(--color-border)] px-4 py-6">
      {/* Logo */}
      <div className="mb-8 px-2">
        <div className="text-[var(--color-text-primary)] font-semibold text-base tracking-widest uppercase">
          Sovereign
        </div>
        <div className="text-[var(--color-text-tertiary)] text-[10px] tracking-[0.2em] uppercase mt-0.5">
          Private Wealth
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                isActive
                  ? 'text-[var(--color-nav-active-text)] bg-[var(--color-nav-active-bg)]'
                  : 'text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-nav-hover-bg)]'
              }`
            }
          >
            <span className="text-[13px] w-4 text-center">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="mt-auto flex flex-col gap-2">
        <button className="w-full bg-[var(--color-bg-input)] border border-[var(--color-border-medium)] text-[var(--color-text-primary)] text-sm font-semibold py-2 rounded-md hover:bg-[var(--color-nav-hover-bg)] transition-colors">
          New Trade
        </button>
        <div className="flex flex-col gap-1 mt-2">
          <ThemeToggle />
          <button className="flex items-center gap-2 px-3 py-1.5 text-[var(--color-text-tertiary)] text-sm hover:text-[var(--color-text-secondary)] transition-colors rounded-md">
            <span className="text-xs">?</span> Support
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 text-[var(--color-text-tertiary)] text-sm hover:text-[var(--color-text-secondary)] transition-colors rounded-md">
            <span className="text-xs">→</span> Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
}
