"use client"

import { createContext, useContext, useEffect, useState } from "react"

interface SessionContextType {
  user: any | null
  session: any | null
  isLoading: boolean
  signOut: () => Promise<void>
  refreshSession: () => Promise<void>
}

const SessionContext = createContext<SessionContextType | undefined>(undefined)

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null)
  const [session, setSession] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  console.log('SessionProvider: Component mounted')

  useEffect(() => {
    console.log('SessionProvider: useEffect triggered')
    
    const getSession = async () => {
      console.log('SessionProvider: Starting session check')
      try {
        // Use custom session API with HTTP-only cookies
        console.log('SessionProvider: Fetching session from /api/auth/session')
        const response = await fetch('/api/auth/session', {
          credentials: 'include' // Important: include cookies
        })
        const data = await response.json()
        console.log('SessionProvider: Session API response:', { ok: response.ok, user: data.user ? 'exists' : 'null' })
        
        if (response.ok && data.user) {
          console.log('SessionProvider: Setting user session')
          setSession({ data: { user: data.user } })
          setUser(data.user)
        } else {
          console.log('SessionProvider: No user session found')
          setSession(null)
          setUser(null)
        }
      } catch (error) {
        console.error("SessionProvider: Session error:", error)
        setSession(null)
        setUser(null)
      } finally {
        console.log('SessionProvider: Session check complete')
        setIsLoading(false)
      }
    }

    // Add a small delay to ensure the component is fully mounted
    setTimeout(() => {
      getSession()
    }, 100)

    // Note: Better Auth doesn't have onSessionChange, we'll handle session updates manually
    // return () => unsubscribe()
  }, [])

  const refreshSession = async () => {
    console.log('SessionProvider: Refreshing session')
    try {
      const response = await fetch('/api/auth/session', {
        credentials: 'include'
      })
      const data = await response.json()
      
      if (response.ok && data.user) {
        console.log('SessionProvider: Session refreshed, user found')
        setSession({ data: { user: data.user } })
        setUser(data.user)
      } else {
        console.log('SessionProvider: Session refreshed, no user')
        setSession(null)
        setUser(null)
      }
    } catch (error) {
      console.error("Session refresh error:", error)
      setSession(null)
      setUser(null)
    }
  }

  const signOut = async () => {
    try {
      // Use custom logout API
      await fetch('/api/auth/logout', { 
        method: 'POST',
        credentials: 'include'
      })
      
      setSession(null)
      setUser(null)
    } catch (error) {
      console.error("Sign out error:", error)
    }
  }

  return (
    <SessionContext.Provider value={{ user, session, isLoading, signOut, refreshSession }}>
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
