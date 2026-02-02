"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Create a context for authentication so we can use it anywhere
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // store logged-in user
  const [loading, setLoading] = useState(true); // loading state while checking login
  const router = useRouter();

  // Check if user is already logged in on page refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user"); // get user from localStorage
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // set the user if found
    }
    setLoading(false); // finished checking
  }, []);

  // Login function to validate email and password
  const login = async ({ email, password, remember }) => {
    // For now, hardcoding a valid user for testing
    const validUser = { email: "toyin95.olubayo@gmail.com", password: "Ifeoluwa@95" };

    // Check if entered email and password match
    if (email === validUser.email && password === validUser.password) {
      const authUser = { email }; // store minimal user info
      setUser(authUser);

      // Remember user in localStorage if checkbox is ticked
      if (remember) {
        localStorage.setItem("user", JSON.stringify(authUser));
      }

      router.push("/adminDashboard/dashboard"); // navigate to dashboard after login
      return true;
    } else {
      // throw error if credentials are wrong
      throw new Error("Invalid credentials");
    }
  };

  // Logout function to clear user data and redirect to login
  const logout = () => {
    setUser(null); // clear user from state
    localStorage.removeItem("user"); // remove user from localStorage
    router.push("/login"); // go back to login page
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth anywhere
export const useAuth = () => useContext(AuthContext);
