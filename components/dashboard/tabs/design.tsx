"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Palette } from "lucide-react"

export function DashboardDesign() {
  return (
    <Card className="bg-black border-2 border-gradient-to-r from-purple-500/10 to-purple-600/10 border-purple-500/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Palette className="h-5 w-5 mr-2 text-purple-400" />
          Design & Themes
        </CardTitle>
        <p className="text-gray-400">
          Customize the look and feel of your portfolio with beautiful themes.
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border-2 border-blue-500/50 rounded-xl p-4 hover:border-blue-500 cursor-pointer transition-all duration-300 bg-gradient-to-br from-gray-800/50 to-gray-900/50">
            <div className="w-full h-32 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg mb-3 relative">
              <div className="absolute top-2 right-2">
                <Badge className="bg-blue-500 text-white">Active</Badge>
              </div>
            </div>
            <h4 className="font-semibold text-white mb-1">Dark Theme</h4>
            <p className="text-sm text-gray-400">Professional and modern</p>
          </div>
          <div className="border border-gray-600 rounded-xl p-4 hover:border-gray-500 cursor-pointer transition-all duration-300 bg-gradient-to-br from-gray-800/50 to-gray-900/50 opacity-60">
            <div className="w-full h-32 bg-gradient-to-br from-white to-gray-100 rounded-lg mb-3 relative">
              <div className="absolute top-2 right-2">
                <Badge variant="outline" className="border-gray-500 text-gray-400">Soon</Badge>
              </div>
            </div>
            <h4 className="font-semibold text-white mb-1">Light Theme</h4>
            <p className="text-sm text-gray-400">Clean and minimal</p>
          </div>
          <div className="border border-gray-600 rounded-xl p-4 hover:border-gray-500 cursor-pointer transition-all duration-300 bg-gradient-to-br from-gray-800/50 to-gray-900/50 opacity-60">
            <div className="w-full h-32 bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg mb-3 relative">
              <div className="absolute top-2 right-2">
                <Badge variant="outline" className="border-white text-white">Soon</Badge>
              </div>
            </div>
            <h4 className="font-semibold text-white mb-1">Blue Theme</h4>
            <p className="text-sm text-gray-400">Vibrant and energetic</p>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-gray-800/50 rounded-lg">
          <h5 className="font-medium text-white mb-2">Customization Options</h5>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Primary Color</span>
              <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-gray-600"></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Font Size</span>
              <Badge variant="outline" className="border-gray-500 text-gray-400">Medium</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
