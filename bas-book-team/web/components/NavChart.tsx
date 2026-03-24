"use client";

import { useEffect, useRef } from "react";
import { NavPoint } from "@/data/mockPortfolios";
import { TimeRange } from "@/store/portfolioStore";

interface Props {
  history: NavPoint[];
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
}

const TIME_RANGES: TimeRange[] = ["1D", "1W", "1M", "YTD", "1Y", "All"];

function filterHistory(history: NavPoint[], range: TimeRange): NavPoint[] {
  const now = new Date(history[history.length - 1]?.date ?? new Date());
  switch (range) {
    case "1D":
      return history.slice(-1);
    case "1W":
      return history.slice(-7);
    case "1M":
      return history.slice(-30);
    case "YTD": {
      const ytdStart = new Date(now.getFullYear(), 0, 1)
        .toISOString()
        .split("T")[0];
      return history.filter((p) => p.date >= ytdStart);
    }
    case "1Y":
      return history.slice(-365);
    case "All":
    default:
      return history;
  }
}

export default function NavChart({ history, timeRange, onTimeRangeChange }: Props) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chartRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const seriesRef = useRef<any>(null);

  useEffect(() => {
    let cleanupFn: (() => void) | undefined;

    async function initChart() {
      if (!chartContainerRef.current) return;

      const lc = await import("lightweight-charts");
      const { createChart, ColorType, LineStyle, LineSeries } = lc;

      const chart = createChart(chartContainerRef.current, {
        layout: {
          background: { type: ColorType.Solid, color: "transparent" },
          textColor: "#94a3b8",
        },
        grid: {
          vertLines: { color: "#1e293b", style: LineStyle.Dotted },
          horzLines: { color: "#1e293b", style: LineStyle.Dotted },
        },
        crosshair: {
          vertLine: { color: "#475569" },
          horzLine: { color: "#475569" },
        },
        rightPriceScale: {
          borderColor: "#334155",
        },
        timeScale: {
          borderColor: "#334155",
          timeVisible: true,
        },
        width: chartContainerRef.current.clientWidth,
        height: 280,
      });

      const lineSeries = chart.addSeries(LineSeries, {
        color: "#3b82f6",
        lineWidth: 2,
        priceLineVisible: false,
        lastValueVisible: true,
      });

      chartRef.current = chart;
      seriesRef.current = lineSeries;

      const filtered = filterHistory(history, timeRange);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      lineSeries.setData(filtered.map((p) => ({ time: p.date as any, value: p.value })));
      chart.timeScale().fitContent();

      const resizeObserver = new ResizeObserver(() => {
        if (chartContainerRef.current && chartRef.current) {
          chartRef.current.applyOptions({
            width: chartContainerRef.current.clientWidth,
          });
        }
      });
      resizeObserver.observe(chartContainerRef.current);

      cleanupFn = () => resizeObserver.disconnect();
    }

    initChart();

    return () => {
      cleanupFn?.();
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
        seriesRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!seriesRef.current || !chartRef.current) return;
    const filtered = filterHistory(history, timeRange);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    seriesRef.current.setData(filtered.map((p) => ({ time: p.date as any, value: p.value })));
    chartRef.current.timeScale().fitContent();
  }, [history, timeRange]);

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-semibold">NAV Performance</h2>
        <div className="flex gap-1">
          {TIME_RANGES.map((r) => (
            <button
              key={r}
              onClick={() => onTimeRangeChange(r)}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                timeRange === r
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:text-white hover:bg-slate-700"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      <div ref={chartContainerRef} className="w-full" />
    </div>
  );
}
