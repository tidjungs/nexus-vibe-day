"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

interface MetricData {
  label: string;
  value: string;
  change?: string;
  isPositive?: boolean;
}

interface Props {
  metrics: MetricData[];
}

export function DashboardAnimated({ metrics }: Props) {
  const headingRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      headingRef.current,
      { opacity: 0, y: -24 },
      { opacity: 1, y: 0, duration: 0.5 }
    )
      .fromTo(
        metricsRef.current!.children,
        { opacity: 0, y: 32, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1 },
        "-=0.2"
      )
      .fromTo(
        navRef.current!.children,
        { opacity: 0, x: -24 },
        { opacity: 1, x: 0, duration: 0.45, stagger: 0.12 },
        "-=0.2"
      )
      .fromTo(
        chartRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4 },
        "-=0.15"
      );
  }, []);

  return (
    <div className="space-y-8">
      {/* Heading */}
      <div ref={headingRef}>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-2 text-slate-600">Overview of your investment portfolio</p>
      </div>

      {/* Key Metrics */}
      <div ref={metricsRef} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-medium uppercase tracking-widest text-slate-500">{m.label}</p>
            <p className="mt-1 font-mono text-3xl font-semibold tabular-nums text-slate-900">
              {m.value}
            </p>
            {m.change && (
              <p
                className={`mt-1 text-sm font-mono tabular-nums ${
                  m.isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {m.change}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Quick Navigation */}
      <div ref={navRef} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Link
          href="/portfolio/1"
          className="group flex items-center gap-5 rounded-xl border border-outline-variant/30 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-on-primary">
            <span className="material-symbols-outlined">account_balance_wallet</span>
          </div>
          <div>
            <p className="font-headline font-bold text-on-surface">Portfolio</p>
            <p className="mt-0.5 text-sm text-on-surface-variant">Net asset value &amp; growth projection</p>
          </div>
          <span className="material-symbols-outlined ml-auto text-on-surface-variant transition-transform group-hover:translate-x-1">
            chevron_right
          </span>
        </Link>

        <Link
          href="/assets"
          className="group flex items-center gap-5 rounded-xl border border-outline-variant/30 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-on-primary">
            <span className="material-symbols-outlined">candlestick_chart</span>
          </div>
          <div>
            <p className="font-headline font-bold text-on-surface">Assets</p>
            <p className="mt-0.5 text-sm text-on-surface-variant">Browse and filter all holdings</p>
          </div>
          <span className="material-symbols-outlined ml-auto text-on-surface-variant transition-transform group-hover:translate-x-1">
            chevron_right
          </span>
        </Link>
      </div>

      {/* Chart placeholder */}
      <div ref={chartRef} className="rounded-xl border border-slate-200 bg-white p-8">
        <h2 className="text-lg font-semibold text-slate-900">Performance Chart</h2>
        <p className="mt-4 text-slate-600">Chart placeholder - implement with Recharts or Tremor</p>
      </div>
    </div>
  );
}
