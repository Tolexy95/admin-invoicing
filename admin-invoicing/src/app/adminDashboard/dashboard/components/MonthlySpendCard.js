import { ArrowUpRight } from "lucide-react";

export default function MonthlySpendCard() {
  const bars = [60, 40, 55, 45, 65, 80, 50];

  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">
          Spent this month
        </p>
        <span className="flex items-center text-xs font-medium text-green-600">
          <ArrowUpRight className="mr-1 h-3 w-3" />
          +2.45%
        </span>
      </div>

      {/* Amount */}
      <h3 className="mt-1 text-xl font-semibold">
        $682.5
      </h3>

      {/* Status */}
      <div className="mt-1 flex items-center gap-2 text-xs text-green-600">
        <span className="h-2 w-2 rounded-full bg-green-500" />
        On track
      </div>

      {/* Mini Chart */}
      <div className="mt-4 flex h-20 items-end gap-2">
        {bars.map((height, index) => (
          <div
            key={index}
            className={`w-full rounded-md ${
              index === 4
                ? "bg-indigo-600"
                : "bg-gray-200"
            }`}
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    </div>
  );
}
