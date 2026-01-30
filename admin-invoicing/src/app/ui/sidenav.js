"use client";

import NavLinks from "./nav-links";
import Logout from "./logout";
import Image from "next/image";
import { poppins } from "./fonts";

export default function SideNav() {
  return (
   <aside className="fixed flex h-screen w-20 md:w-72 flex-col border-r bg-white px-4 md:px-8 py-6 transition-all duration-300">

      {/* Logo */}
      <div className="mb-8 flex items-center gap-4">
        <div className="h-10 w-10 shrink-0">
          <Image
            src="/Venus.png"
            alt="venus_icon"
            width={120}
            height={32}
            priority
          />
        </div>

        {/* Logo text (desktop only) */}
        <div className="hidden md:flex flex-col items-start">
          <p
            className={`${poppins.className} font-bold text-[26px] leading-[100%] tracking-[0%] text-primary`}
          >
            VENUS
          </p>
          <p className="text-xs text-blue-500 pl-1">DASHBOARD</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-1">
        <NavLinks />
      </nav>

      {/* Logout */}
      <div className="mt-6 pt-4 px-2">
        <Logout />
      </div>
    </aside>
  );
}
