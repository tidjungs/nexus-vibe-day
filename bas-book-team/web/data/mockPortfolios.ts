export interface NavPoint {
  date: string;
  value: number;
}

export interface Holding {
  symbol: string;
  name: string;
  qty: number;
  price: number;
  value: number;
  costBasis: number;
  gainLoss: number;
  gainPct: number;
}

export interface Allocation {
  class: string;
  pct: number;
  color: string;
}

export interface Portfolio {
  id: string;
  name: string;
  nav: number;
  navChange: number;
  navChangePct: number;
  cash: number;
  totalReturn: number;
  totalReturnPct: number;
  ytdReturn: number;
  ytdReturnPct: number;
  navHistory: NavPoint[];
  holdings: Holding[];
  allocation: Allocation[];
}

function generateHistory(
  baseValue: number,
  days: number,
  volatility: number,
  trend: number
): NavPoint[] {
  const history: NavPoint[] = [];
  let value = baseValue * 0.75;
  const start = new Date("2025-01-01");
  for (let i = 0; i < days; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    value = value * (1 + trend / 365 + (Math.random() - 0.5) * volatility);
    history.push({
      date: date.toISOString().split("T")[0],
      value: Math.round(value * 100) / 100,
    });
  }
  return history;
}

export const mockPortfolios: Portfolio[] = [
  {
    id: "p1",
    name: "Growth Portfolio",
    nav: 124350.0,
    navChange: 1230.5,
    navChangePct: 1.0,
    cash: 5200.0,
    totalReturn: 24350.0,
    totalReturnPct: 24.35,
    ytdReturn: 8120.0,
    ytdReturnPct: 7.0,
    navHistory: generateHistory(124350, 365, 0.015, 0.18),
    holdings: [
      {
        symbol: "AAPL",
        name: "Apple Inc.",
        qty: 50,
        price: 210.5,
        value: 10525,
        costBasis: 9350,
        gainLoss: 1175,
        gainPct: 12.57,
      },
      {
        symbol: "MSFT",
        name: "Microsoft Corp.",
        qty: 30,
        price: 415.2,
        value: 12456,
        costBasis: 10500,
        gainLoss: 1956,
        gainPct: 18.63,
      },
      {
        symbol: "NVDA",
        name: "NVIDIA Corp.",
        qty: 20,
        price: 875.0,
        value: 17500,
        costBasis: 12000,
        gainLoss: 5500,
        gainPct: 45.83,
      },
      {
        symbol: "GOOGL",
        name: "Alphabet Inc.",
        qty: 15,
        price: 178.4,
        value: 2676,
        costBasis: 2250,
        gainLoss: 426,
        gainPct: 18.93,
      },
      {
        symbol: "AMZN",
        name: "Amazon.com Inc.",
        qty: 25,
        price: 195.8,
        value: 4895,
        costBasis: 4100,
        gainLoss: 795,
        gainPct: 19.39,
      },
      {
        symbol: "AGG",
        name: "iShares Core US Agg Bond",
        qty: 200,
        price: 98.5,
        value: 19700,
        costBasis: 21000,
        gainLoss: -1300,
        gainPct: -6.19,
      },
      {
        symbol: "BND",
        name: "Vanguard Total Bond ETF",
        qty: 150,
        price: 74.2,
        value: 11130,
        costBasis: 12000,
        gainLoss: -870,
        gainPct: -7.25,
      },
      {
        symbol: "VTI",
        name: "Vanguard Total Stock ETF",
        qty: 100,
        price: 242.0,
        value: 24200,
        costBasis: 19500,
        gainLoss: 4700,
        gainPct: 24.1,
      },
    ],
    allocation: [
      { class: "Equities", pct: 65, color: "#3b82f6" },
      { class: "Bonds", pct: 25, color: "#6366f1" },
      { class: "Cash", pct: 10, color: "#94a3b8" },
    ],
  },
  {
    id: "p2",
    name: "Conservative Income",
    nav: 87420.0,
    navChange: -320.0,
    navChangePct: -0.37,
    cash: 12500.0,
    totalReturn: 7420.0,
    totalReturnPct: 9.28,
    ytdReturn: -980.0,
    ytdReturnPct: -1.11,
    navHistory: generateHistory(87420, 365, 0.008, 0.06),
    holdings: [
      {
        symbol: "BND",
        name: "Vanguard Total Bond ETF",
        qty: 400,
        price: 74.2,
        value: 29680,
        costBasis: 31200,
        gainLoss: -1520,
        gainPct: -4.87,
      },
      {
        symbol: "TLT",
        name: "iShares 20+ Year Treasury",
        qty: 150,
        price: 92.3,
        value: 13845,
        costBasis: 15600,
        gainLoss: -1755,
        gainPct: -11.25,
      },
      {
        symbol: "VYM",
        name: "Vanguard High Div Yield ETF",
        qty: 100,
        price: 118.5,
        value: 11850,
        costBasis: 10200,
        gainLoss: 1650,
        gainPct: 16.18,
      },
      {
        symbol: "JNJ",
        name: "Johnson & Johnson",
        qty: 60,
        price: 152.3,
        value: 9138,
        costBasis: 9600,
        gainLoss: -462,
        gainPct: -4.81,
      },
      {
        symbol: "PG",
        name: "Procter & Gamble",
        qty: 45,
        price: 165.8,
        value: 7461,
        costBasis: 7200,
        gainLoss: 261,
        gainPct: 3.63,
      },
    ],
    allocation: [
      { class: "Bonds", pct: 55, color: "#6366f1" },
      { class: "Equities", pct: 30, color: "#3b82f6" },
      { class: "Cash", pct: 15, color: "#94a3b8" },
    ],
  },
  {
    id: "p3",
    name: "Tech Focused",
    nav: 215800.0,
    navChange: 4320.0,
    navChangePct: 2.04,
    cash: 3100.0,
    totalReturn: 115800.0,
    totalReturnPct: 115.8,
    ytdReturn: 32500.0,
    ytdReturnPct: 17.74,
    navHistory: generateHistory(215800, 365, 0.025, 0.35),
    holdings: [
      {
        symbol: "NVDA",
        name: "NVIDIA Corp.",
        qty: 80,
        price: 875.0,
        value: 70000,
        costBasis: 28000,
        gainLoss: 42000,
        gainPct: 150.0,
      },
      {
        symbol: "AAPL",
        name: "Apple Inc.",
        qty: 200,
        price: 210.5,
        value: 42100,
        costBasis: 34000,
        gainLoss: 8100,
        gainPct: 23.82,
      },
      {
        symbol: "MSFT",
        name: "Microsoft Corp.",
        qty: 100,
        price: 415.2,
        value: 41520,
        costBasis: 32000,
        gainLoss: 9520,
        gainPct: 29.75,
      },
      {
        symbol: "META",
        name: "Meta Platforms Inc.",
        qty: 80,
        price: 512.0,
        value: 40960,
        costBasis: 28000,
        gainLoss: 12960,
        gainPct: 46.29,
      },
      {
        symbol: "TSLA",
        name: "Tesla Inc.",
        qty: 60,
        price: 312.0,
        value: 18720,
        costBasis: 22800,
        gainLoss: -4080,
        gainPct: -17.89,
      },
    ],
    allocation: [
      { class: "Technology", pct: 88, color: "#3b82f6" },
      { class: "Consumer", pct: 8, color: "#8b5cf6" },
      { class: "Cash", pct: 4, color: "#94a3b8" },
    ],
  },
];
