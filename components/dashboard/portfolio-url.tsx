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
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2 flex items-center">
              <Globe className="h-5 w-5 mr-2 text-blue-400" />
              Your Portfolio URL
            </h3>
            <p className="text-gray-400 mb-3">
              Your portfolio is live and accessible at:
            </p>
            <div className="flex items-center space-x-3">
              <code className="bg-gray-800/80 px-4 py-2 rounded-lg text-blue-300 border border-gray-600 font-mono">
                {typeof window !== 'undefined' ? window.location.origin : 'localhost:3000'}/{user.username}
              </code>
              <Button 
                size="sm"
                variant="outline"
                onClick={() => {
                  const url = `${typeof window !== 'undefined' ? window.location.origin : 'localhost:3000'}/${user.username}`
                  navigator.clipboard.writeText(url)
                }}
                className="text-white/80 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:text-white"
              >
                Copy
              </Button>
            </div>
          </div>
          <Button 
            onClick={onViewPortfolio}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Visit Portfolio
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
