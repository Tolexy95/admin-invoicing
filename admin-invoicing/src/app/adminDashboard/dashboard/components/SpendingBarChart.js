"use client";

import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from "recharts";
import Image from "next/image";

export const monthlySpending = [
  { month: "Jan", amount: 58 },
  { month: "Feb", amount: 142 },
  { month: "Mar", amount: 98 },
  { month: "Apr", amount: 112 },
  { month: "May", amount: 90 },
  { month: "Jun", amount: 161 },
  { month: "Jul", amount: 78 },
  { month: "Aug", amount: 142 },
  { month: "Sep", amount: 39 },
  { month: "Oct", amount: 112 },
  { month: "Nov", amount: 63 },
  { month: "Dec", amount: 98 },
];

export default function SpendingBarChart() {
  const highlightMonth = "Jun";
  const referenceValue = 161;

  return (
    <div className="bg-white rounded-[20px] shadow-sm p-3 w-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-sm text-secondary-grey-600 font-medium">Total Spent</p>
          <h3 className="text-[34px] leading-[42px] font-bold text-secondary-darkGrey-900">$682.5</h3>
        </div>

        {/* Icon */}
        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
          <Image
            src="/Icon.png"
            alt="stats"
            width={16}
            height={16}
          />
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-52 min-w-0 min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={monthlySpending}
            margin={{ top: 10, right: 16, left: -8, bottom: 0 }}
          >
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#A3AED0", fontSize: 12 }}
            />

            <ReferenceLine
              y={referenceValue}
              stroke="#4318FF"
              strokeDasharray="6 6"
              label={{
                value: "$179",
                position: "insideRight",
                fill: "#4318FF",
                fontSize: 12,
                dx: 10,
              }}
            />

            <Tooltip cursor={{ fill: "transparent" }} />

            <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
              {monthlySpending.map((entry) => (
                <Cell
                  key={entry.month}
                  fill={entry.month === highlightMonth ? "#4318FF" : "#E9EDF7"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

      </div>
    </div>
  );
}
