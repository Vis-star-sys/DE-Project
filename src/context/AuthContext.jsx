"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // ✅ Fetch logged-in user on initial load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include", // send cookie for auth
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user); // set user from response
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("AuthContext: Failed to fetch user", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // ✅ Set user manually after login (if needed)
  const login = (userData) => {
    setUser(userData);
  };

  // ✅ Clear user and cookie on logout
  const logout = async () => {
    try {
      await fetch("/api/logout", { method: "POST", credentials: "include" });
    } catch (err) {
      console.error("AuthContext: Logout failed", err);
    } finally {
      setUser(null);
      router.push("/auth/login");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// ✅ Hook to access auth state
export const useAuth = () => useContext(AuthContext);
