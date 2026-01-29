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
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-medium">
          27 May
        </h3>
        <button className="text-sm text-indigo-600">
          View all Tasks
        </button>
      </div>

      <div className="space-y-4">
        {schedule.map((item, index) => (
          <div
            key={index}
            className="border-l-4 border-indigo-600 pl-3"
          >
            <p className="text-sm font-medium">
              {item.title}
            </p>
            <p className="text-xs text-gray-400">
              {item.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
