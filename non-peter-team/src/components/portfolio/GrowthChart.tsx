'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/cn';

const PERIODS = ['1W', '1M', '3M', '1Y', 'ALL'] as const;
type Period = (typeof PERIODS)[number];

const BAR_HEIGHTS: Record<Period, string[]> = {
  '1W': ['40%', '45%', '42%', '55%', '65%', '60%', '75%', '85%', '80%', '95%'],
  '1M': ['30%', '35%', '50%', '45%', '60%', '70%', '65%', '80%', '75%', '90%'],
  '3M': ['20%', '30%', '40%', '35%', '50%', '60%', '70%', '65%', '80%', '95%'],
  '1Y': ['25%', '40%', '35%', '55%', '50%', '70%', '65%', '80%', '90%', '95%'],
  ALL: ['10%', '20%', '30%', '45%', '40%', '60%', '70%', '75%', '85%', '95%'],
};

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT'];

export function GrowthChart() {
  const [activePeriod, setActivePeriod] = useState<Period>('1W');

  return (
    <section className="bg-surface-container-low p-8 rounded-lg relative overflow-hidden">
      <div className="flex justify-between items-center mb-10">
        <h3 className="font-headline text-2xl font-bold">Growth Projection</h3>
        <div className="flex gap-2">
          {PERIODS.map((period) => (
            <button
              key={period}
              onClick={() => setActivePeriod(period)}
              className={cn(
                'px-4 py-1 rounded-full text-xs font-bold transition-colors',
                activePeriod === period
                  ? 'bg-primary text-on-primary'
                  : 'bg-white text-on-surface-variant hover:bg-surface-variant'
              )}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Chart area */}
      <div className="h-64 w-full flex items-end gap-1 relative">
        {/* Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
          <div className="w-full h-px bg-on-surface" />
          <div className="w-full h-px bg-on-surface" />
          <div className="w-full h-px bg-on-surface" />
          <div className="w-full h-px bg-on-surface" />
        </div>
        {/* Bars */}
        {BAR_HEIGHTS[activePeriod].map((height, i) => (
          <div
            key={i}
            className="flex-1 bg-gradient-to-t from-primary/20 to-primary-container rounded-t-lg transition-all duration-500 hover:opacity-80"
            style={{ height }}
          />
        ))}
      </div>

      {/* Month labels */}
      <div className="flex justify-between mt-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest px-2">
        {MONTHS.map((month) => (
          <span key={month}>{month}</span>
        ))}
      </div>
    </section>
  );
}
