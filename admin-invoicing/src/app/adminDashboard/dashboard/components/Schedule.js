import Link from "next/link";
import { ArrowRight } from "lucide-react";

const schedule = [
  {
    title: "Meet w/ Simmmple",
    time: "10:00 PM – 02:00 PM",
  },
  {
    title: "Fitness Training",
    time: "02:00 PM – 03:00 PM",
  },
  {
    title: "Reading time",
    time: "03:00 PM – 04:00 PM",
  },
];

export default function Schedule() {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm flex flex-col justify-between h-full">
      {/* Date */}
      <h3 className="text-3xl font-bold text-secondary-darkGrey-900 mb-4">27 May</h3>

      {/* Schedule Items */}
      <div className="space-y-4 flex-1">
        {schedule.map((item, index) => (
          <div key={index} className="border-l-4 border-primary pl-3">
            <p className="text-base font-bold text-secondary-darkGrey-900">{item.title}</p>
            <p className="text-xs text-secondary-grey-600 font-medium">{item.time}</p>
          </div>
        ))}
      </div>

      {/* View All Tasks Button */}
      <div className="mt-4 flex justify-end">
        <Link
          href="/adminDashboard/schedules"
          className="text-base text-primary flex font-bold items-center gap-1 hover:underline"
        >
          View all Tasks <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
