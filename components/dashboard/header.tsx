"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, Star, ExternalLink, LogOut } from "lucide-react"
import { ROUTES } from "@/lib/routes"

interface User {
  _id: string
  name: string
  email: string
  username: string
  isActive?: boolean
}

interface DashboardHeaderProps {
  user: User
  onLogout: () => void
  onViewPortfolio: () => void
}

export function DashboardHeader({ user, onLogout, onViewPortfolio }: DashboardHeaderProps) {
  const router = useRouter()

  return (
    <header className="border-b border-gray-800/50 bg-black/30 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 flex items-center space-x-3">
              {/* Logo */}
              <div className="w-8 h-8 flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="flexfolio logo"
                  className="w-8 h-10 object-contain"
                />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">FlexFolio</span>
              <p className="text-xs text-gray-400">Dashboard</p>
            </div>
          </div>
          
          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-1">
         
            <Button 
              variant="ghost" 
              onClick={() => router.push(ROUTES.DEMO)}
              className="text-gray-300 hover:text-white hover:bg-gray-800/50"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View Demo page 
            </Button>
          </nav>

          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-2 bg-gray-800/50 rounded-lg px-3 py-1">
              <div className={`w-2 h-2 rounded-full animate-pulse ${user.isActive !== false ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className={`text-sm ${user.isActive !== false ? 'text-gray-300' : 'text-red-400'}`}>
                {user.isActive !== false ? 'Live' : 'Down'}
              </span>
            </div>
            <Button 
              variant="outline" 
              onClick={onViewPortfolio}
              className=" text-white/80  bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:text-white"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Portfolio
            </Button>
            <Button 
              variant="ghost" 
              onClick={onLogout}
              className="text-gray-300 hover:text-white hover:bg-gray-800/50"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
