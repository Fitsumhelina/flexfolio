"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { authClient } from "@/lib/auth-client"

interface SessionContextType {
  user: any | null
  session: any | null
  isLoading: boolean
  signOut: () => Promise<void>
}

const SessionContext = createContext<SessionContextType | undefined>(undefined)

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null)
  const [session, setSession] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getSession = async () => {
      try {
        // Try Better Auth first, fallback to custom API
        try {
          const sessionData = await authClient.getSession()
          setSession(sessionData)
          setUser(sessionData?.data?.user || null)
        } catch (betterAuthError) {
          console.log('Better Auth session failed, trying custom API:', betterAuthError)
          
          // Fallback to custom session API
          console.log('Fetching session from /api/auth/session')
          const response = await fetch('/api/auth/session')
          const data = await response.json()
          console.log('Session API response:', { ok: response.ok, user: data.user ? 'exists' : 'null' })
          
          if (response.ok && data.user) {
            console.log('Setting user session')
            setSession({ data: { user: data.user } })
            setUser(data.user)
          } else {
            console.log('No user session found')
            setSession(null)
            setUser(null)
          }
        }
      } catch (error) {
        console.error("Session error:", error)
        setSession(null)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    getSession()

    // Note: Better Auth doesn't have onSessionChange, we'll handle session updates manually
    // return () => unsubscribe()
  }, [])

  const signOut = async () => {
    try {
      // Try Better Auth first, fallback to custom API
      try {
        await authClient.signOut()
      } catch (betterAuthError) {
        console.log('Better Auth logout failed, trying custom API:', betterAuthError)
        
        // Fallback to custom logout API
        await fetch('/api/auth/logout', { method: 'POST' })
      }
      
      setSession(null)
      setUser(null)
    } catch (error) {
      console.error("Sign out error:", error)
    }
  }

  return (
    <SessionContext.Provider value={{ user, session, isLoading, signOut }}>
      {children}
    </SessionContext.Provider>
  )
}

export function useSession() {
  const context = useContext(SessionContext)
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider")
  }
  return context
}
