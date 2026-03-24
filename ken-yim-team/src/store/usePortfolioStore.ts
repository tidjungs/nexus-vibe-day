import { create } from 'zustand';
import {
  generatePortfolioData,
  holdings as initialHoldings,
  navChartMeta as initialNavChartMeta,
  navHistory as initialNavHistory,
  portfolioStats as initialStats,
} from '../data/mockPortfolio';
import type { Holding, NavChartMeta, NavDataPoint, NavTimeRange, PortfolioStats } from '../types/portfolio';

interface PortfolioStore {
  activeNavRange: NavTimeRange;
  setActiveNavRange: (range: NavTimeRange) => void;
  showAllHoldings: boolean;
  toggleShowAllHoldings: () => void;
  portfolioStats: PortfolioStats;
  navHistory: Record<NavTimeRange, NavDataPoint[]>;
  navChartMeta: Record<NavTimeRange, NavChartMeta>;
  holdings: Holding[];
  regenerateData: () => void;
}

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  activeNavRange: '1M',
  setActiveNavRange: (range) => set({ activeNavRange: range }),
  showAllHoldings: false,
  toggleShowAllHoldings: () => set((s) => ({ showAllHoldings: !s.showAllHoldings })),
  portfolioStats: initialStats,
  navHistory: initialNavHistory,
  navChartMeta: initialNavChartMeta,
  holdings: initialHoldings,
  regenerateData: () => {
    const data = generatePortfolioData();
    set({
      portfolioStats: data.portfolioStats,
      navHistory: data.navHistory,
      navChartMeta: data.navChartMeta,
      holdings: data.holdings,
    });
  },
}));
