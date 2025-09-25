"use client"

export function DashboardFooter() {
  return (
    <footer className="border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex-shrink-0 flex items-center space-x-3">
          {/* Logo */}
          <div className="w-8 h-8 flex items-center justify-center">
            <img
              src="/logo.png"
              alt="flexfolio logo"
              className="w-8 h-10 object-contain"
            />
          </div>

          {/* Title */}
          <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            <a href="https://flexfolio.com" target="_blank" rel="noopener noreferrer">flexfolio.</a>
          </h1>
        </div>
          <div className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} made via <a href="https://flexfolio.com" target="_blank" rel="noopener noreferrer">FlexFolio</a>.
          </div>
        </div>
      </div>
    </footer>
  )
}
