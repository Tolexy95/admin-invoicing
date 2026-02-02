"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import SideNav from "../ui/sidenav";
import { ClientProvider } from "../context/ClientContext";

export default function DashboardLayout({ children }) {
  const { user, loading } = useAuth(); // get user and loading state from auth context
  const router = useRouter();

  // Protect the route: redirect to login if not logged in
  useEffect(() => {
    if (!loading && !user) {
      // if not loading and no user is logged in
      router.push("/login"); // send user to login page
    }
  }, [loading, user, router]);

  // While auth is loading, show nothing or a loader
  if (loading || !user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // Wrap children with ClientProvider and SideNav
  return (
    <ClientProvider>
      <div className="flex min-h-screen bg-secondary-grey-300">
        <SideNav className="fixed left-0 top-0" />
        <main className="flex-1 ml-20 md:ml-72 p-6">{children}</main>
      </div>
    </ClientProvider>
  );
}
