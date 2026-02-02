"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const router = useRouter();

  // Check if user is already logged in on page refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user"); // get user from localStorage
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // set the user if found
    }
    setLoading(false); 
  }, []);

  // Login function to validate email and password
  const login = async ({ email, password, remember }) => {
    // For now, hardcoding a valid user for testing
    const validUser = { email: "admin.demo@company.com", password: "AdminDemo@123" };

    // Check if entered email and password match
    if (email === validUser.email && password === validUser.password) {
      const authUser = { email }; 
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
    setUser(null); 
    localStorage.removeItem("user"); 
    router.push("/login"); 
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
