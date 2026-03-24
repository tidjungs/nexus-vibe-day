import type { Holding, NavChartMeta, NavDataPoint, NavTimeRange, PortfolioStats } from '../types/portfolio';

const alphaSignalQuotes = [
  'Portfolio performance remains consistent with the quarterly benchmark, buoyed by the tech exposure.',
  'Digital asset allocation continues to generate alpha above the risk-adjusted benchmark.',
  'Fixed income positions provide a stability buffer amid elevated equity market volatility.',
  'Real estate holdings are outperforming sector averages, driven by industrial REIT momentum.',
  'Cross-asset correlation is at a 12-month low, improving overall portfolio diversification.',
  'Momentum signals favor maintaining current equity overweight into the next reporting period.',
];

export const portfolioStats: PortfolioStats = {
  totalNav: 4_281_092.48,
  change24hUsd: 12_402.10,
  change24hPct: 0.29,
  annualizedReturn: 14.2,
  riskVariance: 0.42,
  riskLabel: 'Low',
  alphaSignalQuote: alphaSignalQuotes[0],
};

// 1M: 30 daily points (Feb 23 – Mar 24 2026)
function genDaily(): NavDataPoint[] {
  const points: NavDataPoint[] = [];
  const start = new Date('2026-02-23');
  let nav = 4_120_000;
  for (let i = 0; i < 30; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    nav += (Math.random() - 0.44) * 18_000;
    points.push({ date: d.toISOString().slice(0, 10), nav: Math.round(nav) });
  }
  return points;
}

// 3M: ~90 daily points (Dec 25 2025 – Mar 24 2026)
function genThreeMonth(): NavDataPoint[] {
  const points: NavDataPoint[] = [];
  const start = new Date('2025-12-25');
  let nav = 4_050_000;
  for (let i = 0; i < 90; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    nav += (Math.random() - 0.43) * 16_000;
    points.push({ date: d.toISOString().slice(0, 10), nav: Math.round(nav) });
  }
  return points;
}

// 1Y: 52 weekly points (Mar 2025 – Mar 2026)
function genOneYear(): NavDataPoint[] {
  const points: NavDataPoint[] = [];
  const start = new Date('2025-03-24');
  let nav = 3_750_000;
  for (let i = 0; i < 52; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i * 7);
    nav += (Math.random() - 0.40) * 30_000;
    points.push({ date: d.toISOString().slice(0, 10), nav: Math.round(nav) });
  }
  return points;
}

// ALL: 36 monthly points (Mar 2023 – Feb 2026)
function genAll(): NavDataPoint[] {
  const points: NavDataPoint[] = [];
  const start = new Date('2023-03-01');
  let nav = 3_100_000;
  for (let i = 0; i < 36; i++) {
    const d = new Date(start.getFullYear(), start.getMonth() + i, 1);
    nav += (Math.random() - 0.38) * 55_000;
    points.push({ date: d.toISOString().slice(0, 10), nav: Math.round(nav) });
  }
  return points;
}

const _1m = genDaily();
const _3m = genThreeMonth();
const _1y = genOneYear();
const _all = genAll();

function metaOf(pts: NavDataPoint[]): NavChartMeta {
  const navs = pts.map((p) => p.nav);
  return {
    low: Math.min(...navs),
    high: Math.max(...navs),
    vol: Math.round(navs.reduce((a, b) => a + b, 0) / navs.length / 1000),
    avg: Math.round(navs.reduce((a, b) => a + b, 0) / navs.length),
  };
}

export const navHistory: Record<NavTimeRange, NavDataPoint[]> = {
  '1M': _1m,
  '3M': _3m,
  '1Y': _1y,
  ALL: _all,
};

export const navChartMeta: Record<NavTimeRange, NavChartMeta> = {
  '1M': metaOf(_1m),
  '3M': metaOf(_3m),
  '1Y': metaOf(_1y),
  ALL: metaOf(_all),
};

export const holdings: Holding[] = [
  {
    id: '1',
    name: 'Sovereign S&P ETF',
    ticker: 'SVGN',
    quantity: 4120,
    currentValue: 1_245_600,
    allocation: 29.1,
    change24hUsd: 15_326,
    change24hPct: 1.24,
    category: 'equities',
  },
  {
    id: '2',
    name: 'Digital Reserve Gold',
    ticker: 'PAXG',
    quantity: 18.42,
    currentValue: 642_810,
    allocation: 15.0,
    change24hUsd: -2_893,
    change24hPct: -0.45,
    category: 'digital',
  },
  {
    id: '3',
    name: 'Bitcoin Sovereign Trust',
    ticker: 'IBTC',
    quantity: 4.82,
    currentValue: 482_901,
    allocation: 11.3,
    change24hUsd: 22_212,
    change24hPct: 4.82,
    category: 'digital',
  },
  {
    id: '4',
    name: 'Global Real Estate REIT',
    ticker: 'REIT',
    quantity: 12050,
    currentValue: 310_240,
    allocation: 7.2,
    change24hUsd: 0,
    change24hPct: 0,
    category: 'realestate',
  },
  {
    id: '5',
    name: 'US Treasury Bond 2030',
    ticker: 'USTB',
    quantity: 500,
    currentValue: 498_000,
    allocation: 11.6,
    change24hUsd: 1_200,
    change24hPct: 0.24,
    category: 'bonds',
  },
  {
    id: '6',
    name: 'Nasdaq 100 Growth Fund',
    ticker: 'NQ100',
    quantity: 2200,
    currentValue: 388_000,
    allocation: 9.1,
    change24hUsd: 5_800,
    change24hPct: 1.52,
    category: 'equities',
  },
  {
    id: '7',
    name: 'Ethereum Custody Vault',
    ticker: 'ETHV',
    quantity: 62,
    currentValue: 187_000,
    allocation: 4.4,
    change24hUsd: -3_100,
    change24hPct: -1.63,
    category: 'digital',
  },
  {
    id: '8',
    name: 'European Bond Index',
    ticker: 'EUBO',
    quantity: 300,
    currentValue: 144_000,
    allocation: 3.4,
    change24hUsd: 320,
    change24hPct: 0.22,
    category: 'bonds',
  },
  {
    id: '9',
    name: 'Healthcare Sector ETF',
    ticker: 'HLTH',
    quantity: 900,
    currentValue: 135_000,
    allocation: 3.2,
    change24hUsd: -1_890,
    change24hPct: -1.38,
    category: 'equities',
  },
  {
    id: '10',
    name: 'Emerging Markets Fund',
    ticker: 'EMKT',
    quantity: 1400,
    currentValue: 112_000,
    allocation: 2.6,
    change24hUsd: 2_240,
    change24hPct: 2.04,
    category: 'equities',
  },
  {
    id: '11',
    name: 'Infrastructure Bond 2028',
    ticker: 'INBO',
    quantity: 200,
    currentValue: 98_000,
    allocation: 2.3,
    change24hUsd: 490,
    change24hPct: 0.50,
    category: 'bonds',
  },
  {
    id: '12',
    name: 'Solana Growth Trust',
    ticker: 'SOLT',
    quantity: 800,
    currentValue: 72_000,
    allocation: 1.7,
    change24hUsd: 3_600,
    change24hPct: 5.26,
    category: 'digital',
  },
  {
    id: '13',
    name: 'Energy Sector Fund',
    ticker: 'ENRG',
    quantity: 650,
    currentValue: 65_000,
    allocation: 1.5,
    change24hUsd: -975,
    change24hPct: -1.48,
    category: 'equities',
  },
  {
    id: '14',
    name: 'Municipal Bond Portfolio',
    ticker: 'MUNI',
    quantity: 150,
    currentValue: 60_000,
    allocation: 1.4,
    change24hUsd: 180,
    change24hPct: 0.30,
    category: 'bonds',
  },
  {
    id: '15',
    name: 'Consumer Staples ETF',
    ticker: 'CONS',
    quantity: 700,
    currentValue: 56_000,
    allocation: 1.3,
    change24hUsd: 560,
    change24hPct: 1.01,
    category: 'equities',
  },
  {
    id: '16',
    name: 'Asia Pacific REIT',
    ticker: 'APRT',
    quantity: 4200,
    currentValue: 50_400,
    allocation: 1.2,
    change24hUsd: -252,
    change24hPct: -0.50,
    category: 'realestate',
  },
  {
    id: '17',
    name: 'Polkadot Reserve Fund',
    ticker: 'PDOT',
    quantity: 3200,
    currentValue: 44_800,
    allocation: 1.0,
    change24hUsd: 1_344,
    change24hPct: 3.09,
    category: 'digital',
  },
  {
    id: '18',
    name: 'Financial Sector ETF',
    ticker: 'FINS',
    quantity: 550,
    currentValue: 41_250,
    allocation: 1.0,
    change24hUsd: 825,
    change24hPct: 2.04,
    category: 'equities',
  },
  {
    id: '19',
    name: 'High Yield Corporate Bond',
    ticker: 'HYCB',
    quantity: 100,
    currentValue: 38_000,
    allocation: 0.9,
    change24hUsd: -380,
    change24hPct: -0.99,
    category: 'bonds',
  },
  {
    id: '20',
    name: 'Industrial REIT Fund',
    ticker: 'INRT',
    quantity: 2800,
    currentValue: 33_600,
    allocation: 0.8,
    change24hUsd: 336,
    change24hPct: 1.01,
    category: 'realestate',
  },
  {
    id: '21',
    name: 'Utilities Income ETF',
    ticker: 'UTIL',
    quantity: 600,
    currentValue: 30_000,
    allocation: 0.7,
    change24hUsd: -150,
    change24hPct: -0.50,
    category: 'equities',
  },
  {
    id: '22',
    name: 'Ripple XRP Custody',
    ticker: 'XRPC',
    quantity: 18000,
    currentValue: 27_000,
    allocation: 0.6,
    change24hUsd: 810,
    change24hPct: 3.09,
    category: 'digital',
  },
  {
    id: '23',
    name: 'Inflation-Linked Bond',
    ticker: 'ILNK',
    quantity: 80,
    currentValue: 24_000,
    allocation: 0.6,
    change24hUsd: 240,
    change24hPct: 1.01,
    category: 'bonds',
  },
  {
    id: '24',
    name: 'Materials Sector ETF',
    ticker: 'MATL',
    quantity: 450,
    currentValue: 22_500,
    allocation: 0.5,
    change24hUsd: -225,
    change24hPct: -0.99,
    category: 'equities',
  },
  {
    id: '25',
    name: 'Residential REIT',
    ticker: 'RSRT',
    quantity: 1800,
    currentValue: 19_800,
    allocation: 0.5,
    change24hUsd: 198,
    change24hPct: 1.01,
    category: 'realestate',
  },
  {
    id: '26',
    name: 'Chainlink Oracle Fund',
    ticker: 'LNKF',
    quantity: 2500,
    currentValue: 17_500,
    allocation: 0.4,
    change24hUsd: 525,
    change24hPct: 3.09,
    category: 'digital',
  },
  {
    id: '27',
    name: 'Technology Growth Bond',
    ticker: 'TGBO',
    quantity: 60,
    currentValue: 15_000,
    allocation: 0.4,
    change24hUsd: 150,
    change24hPct: 1.01,
    category: 'bonds',
  },
  {
    id: '28',
    name: 'Telecom Sector ETF',
    ticker: 'TELC',
    quantity: 400,
    currentValue: 12_000,
    allocation: 0.3,
    change24hUsd: -120,
    change24hPct: -0.99,
    category: 'equities',
  },
];

export interface PortfolioData {
  portfolioStats: PortfolioStats;
  navHistory: Record<NavTimeRange, NavDataPoint[]>;
  navChartMeta: Record<NavTimeRange, NavChartMeta>;
  holdings: Holding[];
}

function pickRiskLabel(): PortfolioStats['riskLabel'] {
  const r = Math.random();
  if (r < 0.4) return 'Low';
  if (r < 0.75) return 'Medium';
  return 'High';
}

export function generatePortfolioData(): PortfolioData {
  const newNavHistory = {
    '1M': genDaily(),
    '3M': genThreeMonth(),
    '1Y': genOneYear(),
    ALL: genAll(),
  } satisfies Record<NavTimeRange, NavDataPoint[]>;

  const newNavChartMeta = {
    '1M': metaOf(newNavHistory['1M']),
    '3M': metaOf(newNavHistory['3M']),
    '1Y': metaOf(newNavHistory['1Y']),
    ALL: metaOf(newNavHistory.ALL),
  } satisfies Record<NavTimeRange, NavChartMeta>;

  const totalNav = 3_800_000 + Math.random() * 900_000;
  const change24hUsd = (Math.random() - 0.4) * 40_000;
  const change24hPct = (change24hUsd / totalNav) * 100;

  const newStats: PortfolioStats = {
    totalNav: Math.round(totalNav * 100) / 100,
    change24hUsd: Math.round(change24hUsd * 100) / 100,
    change24hPct: Math.round(change24hPct * 100) / 100,
    annualizedReturn: Math.round((8 + Math.random() * 14) * 10) / 10,
    riskVariance: Math.round((0.2 + Math.random() * 0.6) * 100) / 100,
    riskLabel: pickRiskLabel(),
    alphaSignalQuote: alphaSignalQuotes[Math.floor(Math.random() * alphaSignalQuotes.length)],
  };

  const newHoldings: Holding[] = holdings.map((h) => {
    const valueMult = 0.7 + Math.random() * 0.6;
    const newValue = Math.round(h.currentValue * valueMult);
    const chgUsd = Math.round((Math.random() - 0.45) * newValue * 0.06 * 100) / 100;
    const chgPct = Math.round((chgUsd / newValue) * 10000) / 100;
    return { ...h, currentValue: newValue, change24hUsd: chgUsd, change24hPct: chgPct };
  });

  return { portfolioStats: newStats, navHistory: newNavHistory, navChartMeta: newNavChartMeta, holdings: newHoldings };
}
