"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Save, Database, Shield, Bell, Palette } from "lucide-react"

export default function AdminSettingsPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400">Configure your portfolio settings</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Database Settings */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Database className="h-5 w-5 mr-2" />
              Database
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="dbUrl" className="text-gray-300">
                MongoDB Connection String
              </Label>
              <Input
                id="dbUrl"
                type="password"
                value="mongodb+srv://devfitsum:***@cms-portfolio.efbmyh1.mongodb.net/"
                className="bg-gray-700/50 border-gray-600 text-white"
                readOnly
              />
              <p className="text-xs text-gray-500 mt-1">Connection string is configured via environment variables</p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-gray-300">Auto Backup</Label>
                <p className="text-xs text-gray-500">Automatically backup data daily</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="currentPassword" className="text-gray-300">
                Current Password
              </Label>
              <Input id="currentPassword" type="password" className="bg-gray-700/50 border-gray-600 text-white" />
            </div>
            <div>
              <Label htmlFor="newPassword" className="text-gray-300">
                New Password
              </Label>
              <Input id="newPassword" type="password" className="bg-gray-700/50 border-gray-600 text-white" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-gray-300">Two-Factor Authentication</Label>
                <p className="text-xs text-gray-500">Add extra security to your account</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-gray-300">Email Notifications</Label>
                <p className="text-xs text-gray-500">Receive updates via email</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-gray-300">Contact Form Alerts</Label>
                <p className="text-xs text-gray-500">Get notified of new messages</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-gray-300">Weekly Reports</Label>
                <p className="text-xs text-gray-500">Portfolio analytics summary</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Theme Settings */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Palette className="h-5 w-5 mr-2" />
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="theme" className="text-gray-300">
                Admin Theme
              </Label>
              <select className="w-full mt-1 bg-gray-700/50 border border-gray-600 text-white rounded-md px-3 py-2">
                <option value="dark">Dark (Current)</option>
                <option value="light">Light</option>
                <option value="auto">Auto</option>
              </select>
            </div>
            <div>
              <Label htmlFor="accentColor" className="text-gray-300">
                Accent Color
              </Label>
              <div className="flex gap-2 mt-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full border-2 border-white cursor-pointer"></div>
                <div className="w-8 h-8 bg-purple-600 rounded-full cursor-pointer"></div>
                <div className="w-8 h-8 bg-green-600 rounded-full cursor-pointer"></div>
                <div className="w-8 h-8 bg-red-600 rounded-full cursor-pointer"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-gray-300">Compact Mode</Label>
                <p className="text-xs text-gray-500">Reduce spacing and padding</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
