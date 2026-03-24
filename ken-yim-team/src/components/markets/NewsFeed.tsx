import { useState } from 'react';
import { marketNews, type MarketNewsItem } from '../../data/mockMarkets';

const CATEGORY_LABELS: Record<string, string> = {
  equities: 'Equities',
  crypto: 'Crypto',
  bonds: 'Fixed Income',
  realestate: 'Real Estate',
  macro: 'Macro',
};

const CATEGORY_COLORS: Record<string, string> = {
  equities: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
  crypto: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
  bonds: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  realestate: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
  macro: 'text-slate-400 bg-slate-500/10 border-slate-500/20',
};

const SENTIMENT_STYLES: Record<string, string> = {
  bullish: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  bearish: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
  neutral: 'text-[var(--color-text-tertiary)] bg-[var(--color-bg-subtle)] border-[var(--color-border)]',
};

const SENTIMENT_ICON: Record<string, string> = {
  bullish: '↑',
  bearish: '↓',
  neutral: '→',
};

type FilterKey = 'all' | MarketNewsItem['category'];

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'macro', label: 'Macro' },
  { key: 'equities', label: 'Equities' },
  { key: 'crypto', label: 'Crypto' },
  { key: 'bonds', label: 'Fixed Income' },
  { key: 'realestate', label: 'Real Estate' },
];

export default function NewsFeed() {
  const [filter, setFilter] = useState<FilterKey>('all');

  const filtered = filter === 'all' ? marketNews : marketNews.filter((n) => n.category === filter);

  return (
    <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-tertiary)]">Market News</p>
        <span className="text-[10px] text-[var(--color-text-muted)]">{filtered.length} stories</span>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`text-[11px] px-3 py-1 rounded-lg border transition-colors ${
              filter === f.key
                ? 'bg-[var(--color-range-active-bg)] text-[var(--color-range-active-text)] border-transparent font-semibold'
                : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-medium)]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* News list */}
      <div className="flex flex-col divide-y divide-[var(--color-border-subtle)]">
        {filtered.map((item) => (
          <article key={item.id} className="py-4 first:pt-0 last:pb-0">
            <div className="flex items-start gap-3">
              {/* Sentiment indicator */}
              <div className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-[13px] font-bold border ${SENTIMENT_STYLES[item.sentiment]}`}>
                {SENTIMENT_ICON[item.sentiment]}
              </div>

              <div className="flex-1 min-w-0">
                {/* Tags row */}
                <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                  <span className={`text-[10px] uppercase tracking-[0.12em] font-semibold px-1.5 py-0.5 rounded border ${CATEGORY_COLORS[item.category]}`}>
                    {CATEGORY_LABELS[item.category]}
                  </span>
                  {item.tickers?.map((t) => (
                    <span key={t} className="text-[10px] font-mono text-[var(--color-text-muted)] bg-[var(--color-bg-subtle)] border border-[var(--color-border-subtle)] px-1.5 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Headline */}
                <h3 className="text-sm font-semibold text-[var(--color-text-primary)] leading-snug mb-1">
                  {item.headline}
                </h3>

                {/* Summary */}
                <p className="text-[12px] text-[var(--color-text-secondary)] leading-relaxed mb-2">
                  {item.summary}
                </p>

                {/* Footer */}
                <div className="flex items-center gap-2 text-[11px] text-[var(--color-text-muted)]">
                  <span className="font-medium text-[var(--color-text-tertiary)]">{item.source}</span>
                  <span>·</span>
                  <span>{item.publishedAt}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
