import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const transactions = [
  {
    title: "Public Transport",
    date: "22 September 2020",
    icon: "/icon-2.png",
  },
  {
    title: "Grocery Store",
    date: "18 September 2020",
    icon: "/icon-1.png",
  },
  {
    title: "Public Transport",
    date: "22 September 2020",
    icon: "/icon-3.png",
  },
];

export default function Transactions() {
  return (
    <div className="rounded-[20px] bg-white p-6 shadow-sm flex flex-col">
      <div className="mb-5">
        <h3 className="text-xl font-bold text-secondary-darkGrey-900">
          Your transactions
        </h3>
      </div>

      <div className="space-y-4">
        {transactions.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center">
              <Image
                src={item.icon}
                alt={item.title}
                width={48}
                height={48}
              />
            </div>

            <div>
              <p className="text-base font-bold text-secondary-darkGrey-900">
                {item.title}
              </p>
              <p className="text-xs font-medium text-secondary-grey-600">
                {item.date}
              </p>
            </div>
          </div>
        ))}
      </div>

      
      <div className="mt-4 flex justify-end">
        <Link
          href="/transactions"
          className="flex items-center gap-1 text-base font-bold text-primary hover:underline"
        >
          View all <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
