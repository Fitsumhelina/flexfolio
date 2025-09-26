"use client"

interface User {
  name: string
  isActive?: boolean
}

interface DashboardWelcomeProps {
  user: User
}

export function DashboardWelcome({ user }: DashboardWelcomeProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-400 text-lg">
            Manage your portfolio and customize your online presence
          </p>
        </div>
        <div className="hidden lg:flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-gray-400">Status</p>
            <div className="flex items-center justify-end gap-2">
              <span className={`w-2 h-2 rounded-full ${user.isActive !== false ? 'bg-green-500' : 'bg-red-500'}`}></span>
              <span className="text-sm text-white">{user.isActive !== false ? 'Active' : 'Inactive'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
