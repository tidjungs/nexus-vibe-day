import { useThemeStore } from '../../store/useThemeStore';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="flex items-center gap-2.5 px-3 py-1.5 rounded-md w-full transition-colors hover:bg-[var(--color-nav-hover-bg)]"
    >
      <div
        className="relative w-8 h-4 rounded-full flex-shrink-0 transition-colors duration-200"
        style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)' }}
      >
        <div
          className="absolute top-0.5 w-3 h-3 rounded-full transition-transform duration-200"
          style={{
            backgroundColor: 'var(--color-text-primary)',
            transform: isDark ? 'translateX(17px)' : 'translateX(2px)',
          }}
        />
      </div>
      <span className="text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
        {isDark ? 'Dark' : 'Light'}
      </span>
    </button>
  );
}
