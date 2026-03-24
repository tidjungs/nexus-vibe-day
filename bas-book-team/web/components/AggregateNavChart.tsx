"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { NavPoint } from "@/data/mockPortfolios";

interface Props {
  data: NavPoint[];
}

export default function AggregateNavChart({ data }: Props) {
  return (
    <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-6">
      <h2 className="text-white font-semibold mb-4">Aggregate NAV — All Portfolios</h2>
      <ResponsiveContainer width="100%" height={160}>
        <AreaChart data={data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="aggNavGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#BDFF00" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#BDFF00" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" hide />
          <YAxis hide domain={["auto", "auto"]} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#161b22",
              border: "1px solid #21262d",
              borderRadius: "8px",
              color: "#f1f5f9",
            }}
            formatter={(value) =>
              new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
              }).format(Number(value))
            }
            labelFormatter={(label) => label}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#BDFF00"
            strokeWidth={2}
            fill="url(#aggNavGradient)"
            dot={false}
            activeDot={{ r: 4, fill: "#BDFF00" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
