"use client";

import { useEffect, useRef } from "react";
import { NavPoint } from "@/data/mockPortfolios";
import { TimeRange } from "@/store/portfolioStore";

interface Props {
  history: NavPoint[];
  benchmarkHistory?: NavPoint[];
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

class GradientLinePrimitive {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _chart: any = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _series: any = null;
  private _data: { time: string; value: number }[] = [];
  private _requestUpdate: (() => void) | null = null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attached(param: any) {
    this._chart = param.chart;
    this._series = param.series;
    this._requestUpdate = param.requestUpdate;
  }

  detached() {
    this._chart = null;
    this._series = null;
    this._requestUpdate = null;
  }

  updateData(data: { time: string; value: number }[]) {
    this._data = data;
    this._requestUpdate?.();
  }

  paneViews() {
    const chart = this._chart;
    const series = this._series;
    const data = this._data;

    return [
      {
        renderer: () => ({
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          draw: (target: any) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            target.useBitmapCoordinateSpace(({ context: ctx, horizontalPixelRatio, verticalPixelRatio }: any) => {
              if (!chart || !series || data.length < 2) return;

              const points = data
                .map((d) => ({
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  x: chart.timeScale().timeToCoordinate(d.time as any),
                  y: series.priceToCoordinate(d.value),
                }))
                .filter((p) => p.x !== null && p.y !== null)
                .map((p) => ({
                  x: p.x! * horizontalPixelRatio,
                  y: p.y! * verticalPixelRatio,
                }));

              if (points.length < 2) return;

              const grad = ctx.createLinearGradient(
                points[0].x,
                0,
                points[points.length - 1].x,
                0
              );
              grad.addColorStop(0, "#a855f7");
              grad.addColorStop(1, "#BDFF00");

              ctx.beginPath();
              ctx.moveTo(points[0].x, points[0].y);
              for (let i = 1; i < points.length - 1; i++) {
                const mx = (points[i].x + points[i + 1].x) / 2;
                const my = (points[i].y + points[i + 1].y) / 2;
                ctx.quadraticCurveTo(points[i].x, points[i].y, mx, my);
              }
              ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);

              ctx.strokeStyle = grad;
              ctx.lineWidth = 2 * horizontalPixelRatio;
              ctx.lineJoin = "round";
              ctx.lineCap = "round";
              ctx.stroke();
            });
          },
        }),
      },
    ];
  }
}

export default function NavChart({ history, benchmarkHistory, timeRange, onTimeRangeChange }: Props) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chartRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const seriesRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const benchmarkSeriesRef = useRef<any>(null);
  const primitiveRef = useRef<GradientLinePrimitive | null>(null);

  useEffect(() => {
    let cleanupFn: (() => void) | undefined;

    async function initChart() {
      if (!chartContainerRef.current) return;

      const lc = await import("lightweight-charts");
      const { createChart, ColorType, LineStyle, AreaSeries } = lc;

      const chart = createChart(chartContainerRef.current, {
        layout: {
          background: { type: ColorType.Solid, color: "transparent" },
          textColor: "#94a3b8",
        },
        grid: {
          vertLines: { color: "#21262d", style: LineStyle.Dotted },
          horzLines: { color: "#21262d", style: LineStyle.Dotted },
        },
        crosshair: {
          vertLine: { color: "#475569" },
          horzLine: { color: "#475569" },
        },
        rightPriceScale: {
          borderColor: "#21262d",
        },
        timeScale: {
          borderColor: "#21262d",
          timeVisible: true,
        },
        width: chartContainerRef.current.clientWidth,
        height: 280,
      });

      const areaSeries = chart.addSeries(AreaSeries, {
        lineColor: "transparent",
        topColor: "rgba(168, 85, 247, 0.08)",
        bottomColor: "rgba(189, 255, 0, 0)",
        lineWidth: 2,
        priceLineVisible: false,
        lastValueVisible: true,
      });

      const primitive = new GradientLinePrimitive();
      areaSeries.attachPrimitive(primitive);
      primitiveRef.current = primitive;

      chartRef.current = chart;
      seriesRef.current = areaSeries;

      if (benchmarkHistory && benchmarkHistory.length > 0) {
        const benchmarkSeries = chart.addSeries(AreaSeries, {
          lineColor: "#BF5AF2",
          topColor: "rgba(191, 90, 242, 0.12)",
          bottomColor: "rgba(191, 90, 242, 0)",
          lineWidth: 2,
          priceLineVisible: false,
          lastValueVisible: false,
        });
        benchmarkSeriesRef.current = benchmarkSeries;
        const filteredBenchmark = filterHistory(benchmarkHistory, timeRange);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        benchmarkSeries.setData(filteredBenchmark.map((p) => ({ time: p.date as any, value: p.value })));
      }

      const filtered = filterHistory(history, timeRange);
      const mappedData = filtered.map((p) => ({ time: p.date, value: p.value }));
      primitive.updateData(mappedData);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      areaSeries.setData(filtered.map((p) => ({ time: p.date as any, value: p.value })));
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
        benchmarkSeriesRef.current = null;
        primitiveRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!seriesRef.current || !chartRef.current) return;
    const filtered = filterHistory(history, timeRange);
    const mappedData = filtered.map((p) => ({ time: p.date, value: p.value }));
    primitiveRef.current?.updateData(mappedData);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    seriesRef.current.setData(filtered.map((p) => ({ time: p.date as any, value: p.value })));
    if (benchmarkSeriesRef.current && benchmarkHistory) {
      const filteredBenchmark = filterHistory(benchmarkHistory, timeRange);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      benchmarkSeriesRef.current.setData(filteredBenchmark.map((p) => ({ time: p.date as any, value: p.value })));
    }
    chartRef.current.timeScale().fitContent();
  }, [history, benchmarkHistory, timeRange]);

  return (
    <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-4 sm:p-6">
      <div className="flex items-start sm:items-center justify-between gap-2 mb-4">
        <h2 className="text-white font-semibold shrink-0">NAV Performance</h2>
        <div className="flex flex-wrap justify-end gap-1">
          {TIME_RANGES.map((r) => (
            <button
              key={r}
              onClick={() => onTimeRangeChange(r)}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                timeRange === r
                  ? "bg-[#BDFF00] text-black"
                  : "text-[#8b949e] hover:text-white hover:bg-[#161b22]"
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
