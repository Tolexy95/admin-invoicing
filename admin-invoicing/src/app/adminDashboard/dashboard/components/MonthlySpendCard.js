import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function MonthlySpendCard() {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      
      <div className="flex items-center justify-between">
        <p className="text-sm text-secondary-grey-600 font-medium">Spent this month</p>
        <span className="flex items-center text-xs font-medium text-green-600">
          <ArrowUpRight className="mr-1 h-3 w-3" />
          +2.45%
        </span>
      </div>

      
      <h3 className="mt-1 text-3xl font-bold text-secondary-darkGrey-900">$682.5</h3>

     
      <div className="mt-1 flex items-center gap-2 text-xs text-[#05CD99]">
        <span className="h-2 w-2 rounded-full bg-[#05CD99]" />
        On track
      </div>

     
      <div className="mt-10 h-20 w-full relative">
        <Image
          src="/Group 50.png"
          alt="Monthly spending chart"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}
