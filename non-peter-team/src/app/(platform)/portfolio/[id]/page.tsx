import { GrowthChart } from '@/components/portfolio/GrowthChart';

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await params;

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20">
      {/* NAV Overview & Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
        <div className="lg:col-span-2 space-y-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-3 text-on-surface-variant">
            <span className="bg-surface-container-highest px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              Portfolio Details
            </span>
            <span className="text-sm font-semibold">/ Equities Growth Fund</span>
          </div>

          <h2 className="font-headline text-5xl font-extrabold text-on-surface leading-tight">
            Net Asset Value
          </h2>

          <div className="flex items-baseline gap-4">
            <span className="text-[5rem] font-headline font-black text-primary leading-none tracking-tighter">
              ฿4,282,150
            </span>
            <div className="flex items-center bg-secondary-container text-on-secondary-container px-4 py-2 rounded-full font-bold text-lg animate-pulse">
              <span className="material-symbols-outlined">trending_up</span>
              +12.4%
            </div>
          </div>
        </div>

        {/* Mascot Interaction Card */}
        <div className="relative">
          <div className="glass-card p-6 rounded-lg shadow-xl border border-white/20 relative z-10">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-white p-1 shrink-0 shadow-inner flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-primary text-4xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  support_agent
                </span>
              </div>
              <div className="space-y-2">
                <p className="text-on-surface font-semibold leading-relaxed">
                  ยอดเยี่ยมครับพอร์ต Equities ของคุณเติบโตอย่างสดใส!
                  <span className="block text-sm font-normal text-on-surface-variant mt-1">
                    Shall we rebalance to capture these gains?
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10" />
        </div>
      </section>

      {/* Interactive Chart Section */}
      <GrowthChart />

      {/* Asset Breakdown Bento Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-headline text-2xl font-bold">Asset Breakdown</h3>
          <button className="text-tertiary font-bold flex items-center gap-1 hover:underline">
            Explore Full Universe{' '}
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Global Tech */}
          <div className="bg-surface-container-lowest p-8 rounded-lg shadow-sm border-l-8 border-primary relative overflow-hidden group hover:-translate-y-1 transition-transform">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-3xl">terminal</span>
              </div>
              <span className="text-4xl font-black text-on-surface/5 absolute -right-2 -top-2 select-none group-hover:text-primary/10 transition-colors">
                45%
              </span>
            </div>
            <h4 className="font-headline text-xl font-bold mb-1">Global Tech</h4>
            <p className="text-on-surface-variant text-sm mb-6">High-growth software &amp; AI</p>
            <div className="space-y-1 mb-8">
              <span className="text-2xl font-black text-on-surface">฿1,926,967</span>
              <div className="w-full h-1 bg-surface-container rounded-full overflow-hidden">
                <div className="w-[45%] h-full bg-primary" />
              </div>
            </div>
            <button className="w-full py-3 bg-surface-container text-primary font-bold rounded-xl hover:bg-primary hover:text-on-primary transition-colors">
              View Details
            </button>
          </div>

          {/* Sustainable Energy */}
          <div className="bg-surface-container-lowest p-8 rounded-lg shadow-sm border-l-8 border-secondary-fixed relative overflow-hidden group hover:-translate-y-1 transition-transform">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-on-secondary-container text-3xl">
                  eco
                </span>
              </div>
              <span className="text-4xl font-black text-on-surface/5 absolute -right-2 -top-2 select-none group-hover:text-secondary/10 transition-colors">
                30%
              </span>
            </div>
            <h4 className="font-headline text-xl font-bold mb-1">Sustainable Energy</h4>
            <p className="text-on-surface-variant text-sm mb-6">
              Wind, Solar &amp; EV Infrastructure
            </p>
            <div className="space-y-1 mb-8">
              <span className="text-2xl font-black text-on-surface">฿1,284,645</span>
              <div className="w-full h-1 bg-surface-container rounded-full overflow-hidden">
                <div className="w-[30%] h-full bg-secondary" />
              </div>
            </div>
            <button className="w-full py-3 bg-secondary-container text-on-secondary-container font-bold rounded-xl hover:bg-secondary hover:text-on-secondary transition-colors">
              View Details
            </button>
          </div>

          {/* Emerging Markets */}
          <div className="bg-surface-container-lowest p-8 rounded-lg shadow-sm border-l-8 border-tertiary relative overflow-hidden group hover:-translate-y-1 transition-transform">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-xl bg-tertiary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-on-tertiary-container text-3xl">
                  public
                </span>
              </div>
              <span className="text-4xl font-black text-on-surface/5 absolute -right-2 -top-2 select-none group-hover:text-tertiary/10 transition-colors">
                25%
              </span>
            </div>
            <h4 className="font-headline text-xl font-bold mb-1">Emerging Markets</h4>
            <p className="text-on-surface-variant text-sm mb-6">
              SEA &amp; LATAM growth stocks
            </p>
            <div className="space-y-1 mb-8">
              <span className="text-2xl font-black text-on-surface">฿1,070,538</span>
              <div className="w-full h-1 bg-surface-container rounded-full overflow-hidden">
                <div className="w-[25%] h-full bg-tertiary" />
              </div>
            </div>
            <button className="w-full py-3 bg-tertiary-container text-on-tertiary-container font-bold rounded-xl hover:bg-tertiary hover:text-on-tertiary transition-colors">
              View Details
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
