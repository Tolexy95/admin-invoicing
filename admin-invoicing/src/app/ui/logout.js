import { LogOut } from "lucide-react";

export default function Logout() {
  const handleLogout = () => {
    // TODO: add your auth logout logic here
    console.log("User logged out");
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-3 text-sm text-gray-500 hover:text-red-600 transition"
    >
      <LogOut className="h-4 w-4" />
      Log Out
    </button>
  );
}
