"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface AllocationEntry {
  class: string;
  value: number;
  pct: number;
  color: string;
}

interface Props {
  data: AllocationEntry[];
}

function fmt(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(value);
}

export default function AggregateAllocationChart({ data }: Props) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
      <h2 className="text-white font-semibold mb-4">Aggregate Allocation</h2>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
            nameKey="class"
          >
            {data.map((entry) => (
              <Cell key={entry.class} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "1px solid #334155",
              borderRadius: "8px",
              color: "#f1f5f9",
            }}
            formatter={(value, name) => [fmt(Number(value)), String(name)]}
          />
        </PieChart>
      </ResponsiveContainer>
      <table className="w-full text-sm mt-2">
        <tbody>
          {data.map((entry) => (
            <tr key={entry.class} className="border-t border-slate-700/50">
              <td className="py-1.5 pr-2">
                <span
                  className="inline-block w-2.5 h-2.5 rounded-full mr-2"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-slate-300">{entry.class}</span>
              </td>
              <td className="py-1.5 text-right text-white tabular-nums">{fmt(entry.value)}</td>
              <td className="py-1.5 text-right text-slate-400 tabular-nums pl-4">
                {entry.pct.toFixed(1)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
