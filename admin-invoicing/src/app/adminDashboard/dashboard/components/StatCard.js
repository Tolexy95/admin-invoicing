import {
  BarChart2,
  Users,
  Wallet,
  Activity,
} from "lucide-react";

const ICONS = {
  chart: BarChart2,
  users: Users,
  wallet: Wallet,
  activity: Activity,
};

export default function StatCard({ title, value, icon, highlight }) {
  const Icon = ICONS[icon];

  return (
    <div
      className={`rounded-xl p-5 shadow-sm transition ${
        highlight
          ? "bg-indigo-600 text-white"
          : "bg-white"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-80">{title}</p>
          <h3 className="mt-1 text-xl font-semibold">
            {value}
          </h3>
        </div>
        <Icon className="h-6 w-6 opacity-80" />
      </div>
    </div>

    
  );
}


