"use client";

import { useState } from "react";
import { Holding } from "@/data/mockPortfolios";

interface Props {
  holdings: Holding[];
}

type SortKey = keyof Holding;
type SortDir = "asc" | "desc";

function fmt(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
}

function fmtPct(value: number) {
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
}

export default function HoldingsTable({ holdings }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>("value");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  const sorted = [...holdings].sort((a, b) => {
    const av = a[sortKey];
    const bv = b[sortKey];
    if (typeof av === "number" && typeof bv === "number") {
      return sortDir === "asc" ? av - bv : bv - av;
    }
    if (typeof av === "string" && typeof bv === "string") {
      return sortDir === "asc"
        ? av.localeCompare(bv)
        : bv.localeCompare(av);
    }
    return 0;
  });

  const cols: { key: SortKey; label: string; align: "left" | "right"; mobileHidden?: boolean }[] = [
    { key: "symbol", label: "Symbol", align: "left" },
    { key: "name", label: "Name", align: "left", mobileHidden: true },
    { key: "qty", label: "Qty", align: "right", mobileHidden: true },
    { key: "price", label: "Price", align: "right", mobileHidden: true },
    { key: "value", label: "Mkt Value", align: "right" },
    { key: "gainLoss", label: "Gain / Loss", align: "right" },
    { key: "gainPct", label: "Return", align: "right" },
  ];

  return (
    <div className="bg-[#161b22] border border-[#21262d] rounded-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-[#21262d]">
        <h2 className="text-white font-semibold">Holdings</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#21262d]">
              {cols.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className={`px-4 py-3 font-medium text-[#8b949e] cursor-pointer hover:text-white select-none ${
                    col.align === "right" ? "text-right" : "text-left"
                  } ${col.mobileHidden ? "hidden sm:table-cell" : ""}`}
                >
                  <span className="flex items-center gap-1 justify-end">
                    {col.align === "left" && col.label}
                    {sortKey === col.key && (
                      <span className="text-[#BDFF00]">
                        {sortDir === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                    {col.align === "right" && col.label}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((h) => (
              <tr
                key={h.symbol}
                className="border-b border-[#21262d]/50 hover:bg-slate-700/30 transition-colors"
              >
                <td className="px-4 py-3 font-bold text-white tabular-nums">
                  {h.symbol}
                </td>
                <td className="hidden sm:table-cell px-4 py-3 text-slate-300">{h.name}</td>
                <td className="hidden sm:table-cell px-4 py-3 text-right text-slate-300 tabular-nums">
                  {h.qty.toLocaleString()}
                </td>
                <td className="hidden sm:table-cell px-4 py-3 text-right text-slate-300 tabular-nums">
                  {fmt(h.price)}
                </td>
                <td className="px-4 py-3 text-right text-white font-medium tabular-nums">
                  {fmt(h.value)}
                </td>
                <td
                  className={`px-4 py-3 text-right font-medium tabular-nums ${
                    h.gainLoss >= 0 ? "text-[#BDFF00]" : "text-red-400"
                  }`}
                >
                  {h.gainLoss >= 0 ? "+" : ""}
                  {fmt(h.gainLoss)}
                </td>
                <td
                  className={`px-4 py-3 text-right font-medium tabular-nums ${
                    h.gainPct >= 0 ? "text-[#BDFF00]" : "text-red-400"
                  }`}
                >
                  {fmtPct(h.gainPct)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
