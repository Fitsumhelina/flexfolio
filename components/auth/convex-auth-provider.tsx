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
      console.log("Auth provider: Attempting login for", email);
      const userData = await loginMutation({ email, password });
      console.log("Auth provider: Login successful", userData);
      setUser(userData);
      localStorage.setItem("flexfolio-user", JSON.stringify(userData));
    } catch (error: any) {
      console.error("Auth provider: Login error", error);
      
      // Extract meaningful error message
      let errorMessage = "Login failed";
      
      if (error?.message) {
        errorMessage = error.message;
      } else if (error?.error) {
        errorMessage = error.error;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      // Create a new error with the extracted message
      const loginError = new Error(errorMessage);
      throw loginError;
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
