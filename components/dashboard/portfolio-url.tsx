"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Globe, ExternalLink } from "lucide-react"

interface User {
  username: string
}

interface PortfolioUrlProps {
  user: User
  onViewPortfolio: () => void
}

export function PortfolioUrl({ user, onViewPortfolio }: PortfolioUrlProps) {
  return (
    <Card className="bg-gray-900/50 border-gray-700 hover:border-blue-500/50 transition-all duration-300 mb-4">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1 w-full">
            <h3 className="text-xl font-semibold mb-2 flex items-center">
              <Globe className="h-5 w-5 mr-2 text-blue-400" />
              Your Portfolio URL
            </h3>
            <p className="text-gray-400 mb-3">
              Your portfolio is live and accessible at:
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              <code className="bg-gray-800/80 px-4 py-2 rounded-lg text-blue-300 border border-gray-600 font-mono break-all">
                {typeof window !== 'undefined' ? window.location.origin : 'localhost:3000'}/{user.username}
              </code>
              <Button 
                size="sm"
                variant="outline"
                onClick={() => {
                  const url = `${typeof window !== 'undefined' ? window.location.origin : 'localhost:3000'}/${user.username}`
                  navigator.clipboard.writeText(url)
                }}
                className="text-white/80 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:text-white w-full sm:w-auto"
              >
                Copy
              </Button>
            </div>
          </div>
          <Button 
            onClick={onViewPortfolio}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg w-full md:w-auto mt-4 md:mt-0"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Visit Portfolio
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
