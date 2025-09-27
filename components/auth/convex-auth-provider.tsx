"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

interface User {
  _id: Id<"users">;
  name: string;
  email: string;
  username: string;
  createdAt: number;
  updatedAt: number;
  portfolioData?: {
    about?: any;
    projects?: any[];
    skills?: any[];
  };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function ConvexAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loginMutation = useMutation(api.users.login);
  const registerMutation = useMutation(api.users.register);

  useEffect(() => {
    // Check for existing session in localStorage
    const savedUser = localStorage.getItem("flexfolio-user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error parsing saved user:", error);
        localStorage.removeItem("flexfolio-user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const userData = await loginMutation({ email, password });
      setUser(userData);
      localStorage.setItem("flexfolio-user", JSON.stringify(userData));
    } catch (error) {
      throw error;
    }
  };

  const register = async (name: string, email: string, username: string, password: string) => {
    try {
      const userId = await registerMutation({ name, email, username, password });
      // After registration, automatically log in
      await login(email, password);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("flexfolio-user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a ConvexAuthProvider");
  }
  return context;
}
