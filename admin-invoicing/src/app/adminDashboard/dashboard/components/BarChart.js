export default function BarChart() {
  const data = [
    { month: "Jan", value: 30 },
    { month: "Feb", value: 45 },
    { month: "Mar", value: 40 },
    { month: "Apr", value: 55 },
    { month: "May", value: 70 },
    { month: "Jun", value: 90 }, 
    { month: "Jul", value: 50 },
    { month: "Aug", value: 65 },
    { month: "Sep", value: 35 },
    { month: "Oct", value: 60 },
    { month: "Nov", value: 45 },
    { month: "Dec", value: 55 },
  ];

  const totalSpent = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Total Spent</h3>
          <p className="text-2xl font-semibold mt-1">${totalSpent}</p>
        </div>
        {/* Icon placeholder */}
        <div className="text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
        </div>
      </div>
 {/* Optional reference line */}
      <div className="relative mt-4">
        <div className="absolute top-0 right-0 h-px w-full bg-gray-200" />
        <span className="absolute -top-3 right-0 text-xs text-gray-400">$179</span>
      </div>
      {/* Bars */}
      <div className="flex items-end h-40 gap-2 w-full">
        {data.map((item, index) => {
          const isHighlight = item.month === "Jun";
          return (
            <div key={index} className="flex flex-col items-center w-full">
              <div
                className={`w-2 rounded-t-md transition-all duration-300 ${
                  isHighlight ? "bg-indigo-600" : "bg-gray-200"
                }`}
                style={{ height: `${item.value}%` }}
              />
              <span className="text-xs text-gray-400 mt-1">{item.month}</span>
            </div>
          );
        })}
      </div>

     
    </div>
  );
}
