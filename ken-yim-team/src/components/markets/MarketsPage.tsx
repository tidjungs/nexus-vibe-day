import MarketTicker from './MarketTicker';
import SentimentPanel from './SentimentPanel';
import NewsFeed from './NewsFeed';

export default function MarketsPage() {
  return (
    <div className="max-w-[1100px] mx-auto">
      {/* Page Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-tertiary)] mb-1">
            Global Intelligence
          </p>
          <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">Markets</h1>
        </div>
        <div className="flex items-center gap-3 mt-1">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)] text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Live · Mar 24, 2026</span>
          </div>
        </div>
      </div>

      {/* Index Ticker */}
      <MarketTicker />

      {/* Sentiment + News */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-5">
        <div className="flex flex-col gap-5">
          <SentimentPanel />
        </div>
        <NewsFeed />
      </div>
    </div>
  );
}
