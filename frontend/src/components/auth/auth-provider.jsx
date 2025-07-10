"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authAPI } from "@/lib/api";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await authAPI.login(email, password);
      // Save token and user to localStorage if needed
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);

      switch (res.data.user.role) {
        case "admin":
          router.push("/admin");
          break;
        case "interviewer":
          router.push("/interviewer");
          break;
        default:
          router.push("/candidate");
      }
    } catch (error) {
      throw new Error("Login failed");
    }
  };

  const register = async (email, password, name, role) => {
    try {
      const mockUser = {
        id: Date.now().toString(),
        email,
        name,
        role,
      };

      const mockToken = "mock-jwt-token";

      localStorage.setItem("token", mockToken);
      localStorage.setItem("user", JSON.stringify(mockUser));
      setUser(mockUser);

      switch (mockUser.role) {
        case "admin":
          router.push("/admin");
          break;
        case "interviewer":
          router.push("/interviewer");
          break;
        default:
          router.push("/candidate");
      }
    } catch (error) {
      throw new Error("Registration failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
