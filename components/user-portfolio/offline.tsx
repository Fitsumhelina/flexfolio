"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ROUTES } from "@/lib/routes"

export function UserPortfolioOffline() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <Card className="bg-gray-900/60 border-gray-700 max-w-lg w-full">
        <CardContent className="p-8 text-center space-y-4">
          <div className="text-3xl font-bold text-red-500">This portfolio is currently offline</div>
          <p className="text-gray-300">Please check back later. The owner has set the status to inactive.</p>
          <Button onClick={() => router.push(ROUTES.HOME)} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            Go Home
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
