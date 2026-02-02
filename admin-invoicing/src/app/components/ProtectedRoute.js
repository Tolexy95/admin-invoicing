"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// ProtectedRoute component to prevent access if not logged in
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth(); // get user and loading state from context
  const router = useRouter();

  useEffect(() => {
    // If loading finished and there is no user, redirect to login
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // Show loading while checking auth or if user is not logged in
  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // If user is logged in, show the protected content
  return children;
}
