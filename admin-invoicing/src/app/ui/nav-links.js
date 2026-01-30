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
  // { name: "Clients", href: "/adminDashboard/client", icon: Users },
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
            className={`group/link relative flex items-center gap-4 rounded-md px-3 py-3 text-sm transition
              ${
                isActive
                  ? "bg-primary text-white"
                  : "text-secondary-grey-600 hover:bg-secondary-grey-300"
              }`}
          >
            {/* Icon */}
            <Icon className="h-4 w-4 shrink-0" />

            {/* Text – only when sidebar is expanded */}
            <span className="hidden md:inline">
              {link.name}
            </span>

            {/* Tooltip – ONLY when text is hidden */}
            <span
              className="
                pointer-events-none
                absolute left-14 top-1/2 -translate-y-1/2
                hidden group-hover/link:block
                md:group-hover/link:hidden
                whitespace-nowrap rounded-md bg-gray-900
                px-2 py-1 text-xs text-white shadow-lg
              "
            >
              {link.name}
            </span>
          </Link>
        );
      })}
    </>
  );
}
