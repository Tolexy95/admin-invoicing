import StatCard from "./components/StatCard";
import BarChart from "./components/BarChart";
import Transactions from "./components/Transactions";
import ProfileCard from "./components/ProfileCard";
import Schedule from "./components/Schedule";
import MonthlySpendCard from "./components/MonthlySpendCard";
import { stats } from "./data/mock";
import SearchBox from "./components/SearchBox";

export default function DashboardPage() {
    return (
        <div className="">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center pb-4 justify-between font-bold">
                <div className="">
                    <p className="text-sm text-secondary-grey-700 font-bold tracking-[-0.02em]">Hi Andrei,</p>
                    <h1 className=" text-[36px] leading-[42px] text-secondary-grey-900 tracking-[-0.02em]">Welcome to Venus!</h1>
                </div>
                <div>
                    <SearchBox />
                </div>

            </div>


            {/* Stats */}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                {stats.map((item) => (
                    <StatCard key={item.title} {...item} />
                ))}
            </div>

            {/* Main Grid */}
            <div className="">
                <div className="grid grid-cols-1 lg:grid-cols-3 mt-4 gap-3 items-stretch">
                    <div className="md:col-span-2">
                        <BarChart />
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
