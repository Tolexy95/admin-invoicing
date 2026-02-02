"use client";

import { useContext } from "react"; 

import StatCard from "./components/StatCard";
import SpendingBarChart from "./components/SpendingBarChart";
import Transactions from "./components/Transactions";
import ProfileCard from "./components/ProfileCard";
import Schedule from "./components/Schedule";
import MonthlySpendCard from "./components/MonthlySpendCard";
import { stats } from "./data/mock";
import SearchBox from "./components/SearchBox";
import { ClientContext } from "@/app/context/ClientContext";

export default function DashboardPage() {
  const { clients } = useContext(ClientContext);

  return (
    <div className="">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center pb-4 justify-between font-bold">
        <div className="">
          <p className="text-sm text-secondary-grey-700 font-bold tracking-[-0.02em]">
            Hi Andrei,
          </p>
          <h1 className="text-2xl sm:text-3xl lg:text-[32px] leading-tight tracking-[-0.02em]">
            Welcome to Venus!
          </h1>
        </div>
        <div className="mt-5 lg:w-[361px]">
          <SearchBox />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          if (item.title === "New clients") {
            return (
              <StatCard
                key={item.title}
                {...item}
                value={clients?.length || 0} 
              />
            );
          }

          return <StatCard key={item.title} {...item} />;
        })}
      </div>

      {/* Main Grid */}
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-3 my-4 gap-3 items-stretch">
          <div className="md:col-span-2 min-h-[260px]">
            <SpendingBarChart />
          </div>

          <div className="md:col-span-1">
            <ProfileCard />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mt-5 ">
          <MonthlySpendCard />
          <Transactions />
          <Schedule />
        </div>
      </div>
    </div>
  );
}
