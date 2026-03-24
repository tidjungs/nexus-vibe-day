import { create } from "zustand";

export type TimeRange = "1D" | "1W" | "1M" | "YTD" | "1Y" | "All";

interface PortfolioStore {
  selectedPortfolioId: string;
  timeRange: TimeRange;
  setSelectedPortfolioId: (id: string) => void;
  setTimeRange: (range: TimeRange) => void;
}

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  selectedPortfolioId: "p1",
  timeRange: "1Y",
  setSelectedPortfolioId: (id) => set({ selectedPortfolioId: id }),
  setTimeRange: (range) => set({ timeRange: range }),
}));
