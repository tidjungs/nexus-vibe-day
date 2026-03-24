export interface MarketNewsItem {
  id: string;
  headline: string;
  summary: string;
  source: string;
  publishedAt: string; // e.g. "2h ago"
  category: 'equities' | 'crypto' | 'bonds' | 'macro' | 'realestate';
  sentiment: 'bullish' | 'bearish' | 'neutral';
  tickers?: string[];
}

export interface SentimentSector {
  label: string;
  category: string;
  score: number; // 0–100, where 50 = neutral
  signal: 'bullish' | 'bearish' | 'neutral';
  change: number; // delta from prior session
}

export interface MarketIndex {
  name: string;
  ticker: string;
  value: number;
  change: number;
  changePct: number;
}

export const marketIndices: MarketIndex[] = [
  { name: 'S&P 500', ticker: 'SPX', value: 5_214.08, change: 38.42, changePct: 0.74 },
  { name: 'Nasdaq 100', ticker: 'NDX', value: 18_312.44, change: 201.15, changePct: 1.11 },
  { name: 'MSCI World', ticker: 'MSCI', value: 3_482.10, change: -11.32, changePct: -0.32 },
  { name: 'US 10Y Yield', ticker: 'TNX', value: 4.29, change: -0.04, changePct: -0.92 },
  { name: 'Bitcoin', ticker: 'BTC', value: 87_440.00, change: 2_210.00, changePct: 2.59 },
  { name: 'Gold', ticker: 'XAU', value: 3_022.50, change: 15.80, changePct: 0.52 },
];

export const sentimentSectors: SentimentSector[] = [
  { label: 'Equities', category: 'equities', score: 68, signal: 'bullish', change: +4 },
  { label: 'Crypto', category: 'crypto', score: 74, signal: 'bullish', change: +9 },
  { label: 'Fixed Income', category: 'bonds', score: 44, signal: 'neutral', change: -2 },
  { label: 'Real Estate', category: 'realestate', score: 38, signal: 'bearish', change: -5 },
  { label: 'Commodities', category: 'macro', score: 58, signal: 'neutral', change: +1 },
  { label: 'FX & Macro', category: 'macro', score: 42, signal: 'neutral', change: -3 },
];

// Overall composite sentiment (weighted avg of above)
export const overallSentiment = {
  score: 62,
  signal: 'bullish' as const,
  label: 'Risk-On',
  description: 'Broad market sentiment is leaning bullish, driven by crypto momentum and equity strength. Bond markets remain cautious ahead of the Fed policy meeting.',
};

export const marketNews: MarketNewsItem[] = [
  {
    id: '1',
    headline: 'Fed Signals Potential Rate Pause as Inflation Data Cools',
    summary: 'Federal Reserve officials indicated they may hold rates steady at the upcoming FOMC meeting following softer-than-expected CPI data, easing pressure on risk assets.',
    source: 'Reuters',
    publishedAt: '42m ago',
    category: 'macro',
    sentiment: 'bullish',
    tickers: ['SPX', 'TNX'],
  },
  {
    id: '2',
    headline: 'Bitcoin Surges Past $87K Amid ETF Inflow Acceleration',
    summary: 'Spot Bitcoin ETFs recorded $620M in net inflows on Monday, the highest single-day figure in six weeks, pushing BTC to a three-week high.',
    source: 'CoinDesk',
    publishedAt: '1h ago',
    category: 'crypto',
    sentiment: 'bullish',
    tickers: ['IBTC', 'BTC'],
  },
  {
    id: '3',
    headline: 'Nasdaq Outperforms on AI Chip Demand Outlook Upgrade',
    summary: 'Analysts at two major investment banks raised their semiconductor sector targets, citing surging enterprise AI infrastructure spend. NDX gained 1.1% intraday.',
    source: 'Bloomberg',
    publishedAt: '2h ago',
    category: 'equities',
    sentiment: 'bullish',
    tickers: ['NDX', 'NQ100', 'SVGN'],
  },
  {
    id: '4',
    headline: 'European Real Estate Faces Renewed Pressure as ECB Holds',
    summary: 'The ECB maintained its deposit rate at 2.5%, disappointing property investors hoping for an additional cut. Eurozone REIT indices fell 1.8% on the session.',
    source: 'FT',
    publishedAt: '3h ago',
    category: 'realestate',
    sentiment: 'bearish',
    tickers: ['APRT', 'REIT'],
  },
  {
    id: '5',
    headline: 'US 10-Year Treasury Yield Dips Below 4.30% on Safe-Haven Demand',
    summary: 'Geopolitical tensions and a softer jobs print triggered a flight to duration, pulling the 10Y yield down 4 basis points to 4.29%.',
    source: 'WSJ',
    publishedAt: '4h ago',
    category: 'bonds',
    sentiment: 'neutral',
    tickers: ['USTB', 'TNX'],
  },
  {
    id: '6',
    headline: 'Ethereum Lags Bitcoin Rally as Staking Yield Compression Weighs',
    summary: 'ETH/BTC ratio hit a six-month low as network staking rewards declined for the third consecutive epoch, reducing yield-seeking demand for the asset.',
    source: 'The Block',
    publishedAt: '5h ago',
    category: 'crypto',
    sentiment: 'bearish',
    tickers: ['ETHV'],
  },
  {
    id: '7',
    headline: 'Emerging Market Equities Rally as Dollar Weakens',
    summary: 'A softer DXY provided tailwinds for EM stocks, with the MSCI EM index rising 0.9%. Flows into Latin America and Southeast Asia funds accelerated.',
    source: 'Bloomberg',
    publishedAt: '6h ago',
    category: 'equities',
    sentiment: 'bullish',
    tickers: ['EMKT'],
  },
  {
    id: '8',
    headline: 'Gold Holds Above $3,000 on Central Bank Accumulation Reports',
    summary: 'Central banks globally added a net 42 tonnes of gold in February per WGC data. Sovereign wealth funds cited reserve diversification as the primary driver.',
    source: 'Reuters',
    publishedAt: '8h ago',
    category: 'macro',
    sentiment: 'bullish',
    tickers: ['PAXG', 'XAU'],
  },
  {
    id: '9',
    headline: 'High-Yield Spreads Widen as Credit Concerns Resurface',
    summary: 'US HY corporate bond spreads widened 18bps on Monday after a cluster of downgrade warnings in the consumer discretionary sector, signaling rising credit risk.',
    source: 'FT',
    publishedAt: '10h ago',
    category: 'bonds',
    sentiment: 'bearish',
    tickers: ['HYCB'],
  },
  {
    id: '10',
    headline: 'Solana Ecosystem Sees Record DEX Volume in Q1 2026',
    summary: 'Decentralized exchanges on Solana processed over $180B in volume in Q1, surpassing Ethereum\'s layer-2 ecosystems combined, boosting SOL price momentum.',
    source: 'Messari',
    publishedAt: '12h ago',
    category: 'crypto',
    sentiment: 'bullish',
    tickers: ['SOLT'],
  },
];
