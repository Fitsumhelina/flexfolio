"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Try Better Auth first, fallback to custom API
        try {
          const session = await authClient.getSession()
          if (session?.data?.user) {
            setIsAuthenticated(true)
            setUser(session.data.user)
            return
          }
        } catch (betterAuthError) {
          console.log('Better Auth session failed, trying custom API:', betterAuthError)
        }
        
        // Fallback to custom session API
        const response = await fetch('/api/auth/session', {
          credentials: 'include' // Important: include cookies
        })
        const data = await response.json()
        
        if (response.ok && data.user) {
          setIsAuthenticated(true)
          setUser(data.user)
        } else {
          setIsAuthenticated(false)
          router.push("/login")
        }
      } catch (error) {
        console.error("Auth check error:", error)
        setIsAuthenticated(false)
        router.push("/login")
      }
    }

    checkAuth()
  }, [router])

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}