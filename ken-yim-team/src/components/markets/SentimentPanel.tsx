import { overallSentiment, sentimentSectors } from '../../data/mockMarkets';

function SignalBadge({ signal }: { signal: 'bullish' | 'bearish' | 'neutral' }) {
  const styles = {
    bullish: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
    bearish: 'bg-rose-500/15 text-rose-400 border-rose-500/20',
    neutral: 'bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)] border-[var(--color-border)]',
  };
  return (
    <span className={`text-[10px] uppercase tracking-[0.12em] font-semibold px-2 py-0.5 rounded-md border ${styles[signal]}`}>
      {signal}
    </span>
  );
}

function SentimentBar({ score }: { score: number }) {
  const color = score >= 60 ? '#34d399' : score <= 40 ? '#fb7185' : '#a3a3a3';
  return (
    <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-gauge-track)' }}>
      <div
        className="h-full rounded-full transition-all"
        style={{ width: `${score}%`, backgroundColor: color }}
      />
    </div>
  );
}

// Arc gauge for overall sentiment (SVG-based)
function SentimentGauge({ score }: { score: number }) {
  const radius = 52;
  const cx = 70;
  const cy = 70;
  const startAngle = -210;
  const totalArc = 240;
  const angle = startAngle + (score / 100) * totalArc;

  function polar(angleDeg: number, r: number) {
    const rad = (angleDeg * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  function arc(a1: number, a2: number, r: number) {
    const p1 = polar(a1, r);
    const p2 = polar(a2, r);
    const large = Math.abs(a2 - a1) > 180 ? 1 : 0;
    return `M ${p1.x} ${p1.y} A ${r} ${r} 0 ${large} 1 ${p2.x} ${p2.y}`;
  }

  const needleTip = polar(angle, radius - 6);
  const needleBase1 = polar(angle + 90, 5);
  const needleBase2 = polar(angle - 90, 5);

  const activeColor = score >= 60 ? '#34d399' : score <= 40 ? '#fb7185' : '#a3a3a3';

  return (
    <svg viewBox="0 0 140 90" className="w-36 h-24">
      {/* Track */}
      <path d={arc(startAngle, startAngle + totalArc, radius)} fill="none" style={{ stroke: 'var(--color-gauge-track)' }} strokeWidth="8" strokeLinecap="round" />
      {/* Fill */}
      <path d={arc(startAngle, angle, radius)} fill="none" stroke={activeColor} strokeWidth="8" strokeLinecap="round" />
      {/* Needle */}
      <polygon
        points={`${needleTip.x},${needleTip.y} ${needleBase1.x},${needleBase1.y} ${needleBase2.x},${needleBase2.y}`}
        fill={activeColor}
        opacity={0.9}
      />
      <circle cx={cx} cy={cy} r={4} fill={activeColor} />
      {/* Score text */}
      <text x={cx} y={cy + 18} textAnchor="middle" fontSize="13" fontWeight="700" style={{ fill: 'var(--color-text-primary)' }}>{score}</text>
    </svg>
  );
}

export default function SentimentPanel() {
  return (
    <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-5 mb-5">
      <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-tertiary)] mb-4">Market Sentiment</p>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Overall gauge */}
        <div className="flex flex-col items-center justify-center min-w-[180px] border-b lg:border-b-0 lg:border-r border-[var(--color-border)] pb-5 lg:pb-0 lg:pr-6">
          <SentimentGauge score={overallSentiment.score} />
          <p className="text-lg font-bold text-[var(--color-text-primary)] mt-1">{overallSentiment.label}</p>
          <SignalBadge signal={overallSentiment.signal} />
          <p className="text-[11px] text-[var(--color-text-tertiary)] text-center mt-3 leading-relaxed max-w-[160px]">
            {overallSentiment.description}
          </p>
        </div>

        {/* Sector breakdown */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 content-start">
          {sentimentSectors.map((s) => (
            <div key={s.category + s.label}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-[var(--color-text-secondary)] font-medium">{s.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-medium" style={{ color: s.change >= 0 ? 'var(--color-positive)' : 'var(--color-negative)' }}>
                    {s.change >= 0 ? '+' : ''}{s.change}
                  </span>
                  <SignalBadge signal={s.signal} />
                </div>
              </div>
              <SentimentBar score={s.score} />
              <div className="flex justify-between mt-1">
                <span className="text-[10px] text-[var(--color-text-muted)]">Bearish</span>
                <span className="text-[10px] text-[var(--color-text-muted)]">Bullish</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
