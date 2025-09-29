"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useQuery, useMutation, useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

interface SessionData {
  userId: Id<"users">;
  name: string;
  username: string;
  // Exclude sensitive data like email, createdAt, updatedAt, portfolioData
}

interface AuthContextType {
  user: SessionData | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function ConvexAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loginAction = useAction(api.users.login);
  const registerAction = useAction(api.users.register);

  useEffect(() => {
    // Clear any old session data for security
    localStorage.removeItem("flexfolio-user");
    
    // Check for existing session in localStorage
    const savedSession = localStorage.getItem("flexfolio-session");
    if (savedSession) {
      try {
        const sessionData = JSON.parse(savedSession);
        // Validate session data structure - only allow minimal session data
        if (sessionData.userId && sessionData.username && sessionData.name && 
            !sessionData.email && !sessionData.portfolioData && !sessionData.createdAt) {
          setUser(sessionData);
        } else {
          // Invalid session data (contains sensitive info), remove it
          console.log("Removing invalid session data containing sensitive information");
          localStorage.removeItem("flexfolio-session");
        }
      } catch (error) {
        console.error("Error parsing saved session:", error);
        localStorage.removeItem("flexfolio-session");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      console.log("Auth provider: Attempting login for", email);
      
      // Add timeout to prevent hanging
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Login request timed out")), 10000);
      });
      
      const loginPromise = loginAction({ email, password });
      
      const sessionData = await Promise.race([loginPromise, timeoutPromise]);
      console.log("Auth provider: Login successful", sessionData);
      setUser(sessionData);
      localStorage.setItem("flexfolio-session", JSON.stringify(sessionData));
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
      
      // Handle specific connection errors
      if (errorMessage.includes("Connection lost") || errorMessage.includes("timed out")) {
        errorMessage = "Connection to server lost. Please check your internet connection and try again.";
      }
      
      // Create a new error with the extracted message
      const loginError = new Error(errorMessage);
      throw loginError;
    }
  };

  const register = async (name: string, email: string, username: string, password: string) => {
    try {
      console.log("Auth provider: Attempting registration for", email);
      
      // Add timeout to prevent hanging
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Registration request timed out")), 15000);
      });
      
      const registerPromise = registerAction({ name, email, username, password });
      
      const userId = await Promise.race([registerPromise, timeoutPromise]);
      console.log("Auth provider: Registration successful", userId);
      
      // After registration, automatically log in
      await login(email, password);
    } catch (error: any) {
      console.error("Auth provider: Registration error", error);
      
      // Handle specific connection errors
      if (error?.message?.includes("Connection lost") || error?.message?.includes("timed out")) {
        throw new Error("Connection to server lost. Please check your internet connection and try again.");
      }
      
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("flexfolio-session");
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
