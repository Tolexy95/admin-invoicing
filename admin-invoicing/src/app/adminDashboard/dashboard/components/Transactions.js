const transactions = [
  {
    title: "Public Transport",
    date: "22 September 2020",
    amount: "-$15.00",
  },
  {
    title: "Grocery Store",
    date: "18 September 2020",
    amount: "-$76.45",
  },
  {
    title: "Public Transport",
    date: "22 September 2020",
    amount: "-$15.00",
  },
];

export default function Transactions() {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-medium">
          Your transactions
        </h3>
        <button className="text-sm text-indigo-600">
          View all
        </button>
      </div>

      <div className="space-y-4">
        {transactions.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between"
          >
            <div>
              <p className="text-sm font-medium">
                {item.title}
              </p>
              <p className="text-xs text-gray-400">
                {item.date}
              </p>
            </div>
            <p className="text-sm font-semibold">
              {item.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
