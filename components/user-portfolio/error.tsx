"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { User } from "lucide-react"
import { ROUTES } from "@/lib/routes"

interface ErrorProps {
  error?: string
}

export function UserPortfolioError({ error }: ErrorProps) {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <Card className="bg-gray-900/50 border-gray-700 max-w-md">
        <CardContent className="p-8 text-center">
          <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">
            Page Not Found
          </h1>
          <p className="text-gray-400 mb-6">
            {error || "The portfolio you're looking for doesn't exist or has been removed."}
          </p>
          <Button
            onClick={() => router.push(ROUTES.HOME)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Go Home
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
