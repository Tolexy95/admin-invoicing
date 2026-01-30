"use client";

import { useAuth } from "@/app/context/AuthContext";
import { LogOut } from "lucide-react";

export default function Logout() {
  const { logout } = useAuth();

  return (
    <button
      onClick={logout}
      className="group/logout relative flex items-center gap-3 text-sm text-gray-500 hover:text-red-600 transition"
    >
      {/* Icon */}
      <LogOut className="h-4 w-4 shrink-0" />

      {/* Text – visible only when sidebar is expanded */}
      <span className="hidden md:inline">
        Log Out
      </span>

      {/* Tooltip – ONLY when icons-only */}
      <span
        className="
          pointer-events-none
          absolute left-14 top-1/2 -translate-y-1/2
          hidden group-hover/logout:block
          md:group-hover/logout:hidden
          whitespace-nowrap rounded-md bg-gray-900
          px-2 py-1 text-xs text-white shadow-lg
        "
      >
        Log Out
      </span>
    </button>
  );
}
