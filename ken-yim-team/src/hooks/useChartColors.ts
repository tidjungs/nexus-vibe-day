import { useThemeStore } from '../store/useThemeStore';

export function useChartColors() {
  // Subscribe to theme so component re-renders when theme changes
  useThemeStore((s) => s.theme);

  const style = getComputedStyle(document.documentElement);
  const get = (v: string) => style.getPropertyValue(v).trim();

  return {
    line: get('--color-chart-line'),
    grid: get('--color-chart-grid'),
    tick: get('--color-chart-tick'),
    tooltipBg: get('--color-chart-tooltip-bg'),
    tooltipBorder: get('--color-chart-tooltip-border'),
    tooltipText: get('--color-chart-tooltip-text'),
    tooltipLabel: get('--color-chart-tooltip-label'),
    gaugeTrack: get('--color-gauge-track'),
  };
}
