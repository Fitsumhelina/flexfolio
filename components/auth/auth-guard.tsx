"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check authentication status
    const authStatus = localStorage.getItem("isAuthenticated")
    if (authStatus === "true") {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
      router.push("/login")
    }
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
