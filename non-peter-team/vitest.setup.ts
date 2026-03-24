import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock Intl.NumberFormat for consistent test results
vi.mock('lib/utils/format', async () => {
  const actual = await vi.importActual('lib/utils/format');
  return {
    ...actual,
    formatCurrency: (value: number) => `THB ${value.toLocaleString()}`,
    formatPercent: (value: number) => `${value.toFixed(2)}%`,
  };
});
