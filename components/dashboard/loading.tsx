"use client"

export function DashboardLoading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex flex-col items-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse flex items-center justify-center">
          <svg className="w-8 h-8 text-white animate-spin" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        </div>
        <div className="w-64 h-6 bg-gray-800 rounded mb-2 animate-pulse" />
        <div className="w-48 h-4 bg-gray-800 rounded animate-pulse" />
        <div className="w-40 h-4 bg-gray-800 rounded animate-pulse" />
      </div>
    </div>
  )
}
