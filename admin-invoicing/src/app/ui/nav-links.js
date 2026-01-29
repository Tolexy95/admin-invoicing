"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Activity,
  ShieldCheck,
  Calendar,
  Wallet,
  Settings,
  Users,
} from "lucide-react";

const links = [
  { name: "Dashboard", href: "/adminDashboard/dashboard", icon: LayoutDashboard },
  { name: "Activity", href: "/adminDashboard/activity", icon: Activity },
  { name: "Security", href: "/adminDashboard/security", icon: ShieldCheck },
  { name: "Schedules", href: "/adminDashboard/schedules", icon: Calendar },
  { name: "Payouts", href: "/adminDashboard/payouts", icon: Wallet },
  { name: "Settings", href: "/adminDashboard/settings", icon: Settings },
  { name: "Clients", href: "/adminDashboard/client", icon: Users },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const Icon = link.icon;
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex items-center gap-4 rounded-md px-3 py-3 text-sm transition
              ${isActive
                ? "bg-primary text-white"
                : "text-secondary-grey-600 hover:bg-secondary-grey-300"
              }`}
          >
            <Icon className="h-4 w-4" />
            {link.name}
          </Link>
        );
      })}
    </>
  );
}
