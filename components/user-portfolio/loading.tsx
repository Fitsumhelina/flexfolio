"use client"

import { Navigation } from "./navigation"

export function UserPortfolioLoading() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero skeleton */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 w-full">
          <div className="h-6 w-64 bg-gray-800/60 rounded mx-auto mb-6 animate-pulse" />
          <div className="h-12 w-3/4 bg-gray-800/60 rounded mx-auto mb-6 animate-pulse" />
          <div className="h-4 w-2/3 bg-gray-800/60 rounded mx-auto mb-8 animate-pulse" />
          <div className="flex gap-4 justify-center">
            <div className="h-10 w-32 bg-gray-800/60 rounded animate-pulse" />
            <div className="h-10 w-32 bg-gray-800/60 rounded animate-pulse" />
          </div>
        </div>
      </section>

      {/* About skeleton */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="h-10 w-64 bg-gray-800/60 rounded mx-auto mb-16 animate-pulse" />
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <div className="h-4 w-full bg-gray-800/60 rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-gray-800/60 rounded animate-pulse" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="h-28 bg-gray-800/50 border border-gray-700 rounded animate-pulse" />
                <div className="h-28 bg-gray-800/50 border border-gray-700 rounded animate-pulse" />
              </div>
            </div>
            <div className="h-[420px] bg-gray-800/40 border border-gray-700 rounded-xl animate-pulse" />
          </div>
        </div>
      </section>

      {/* Projects skeleton */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto">
          <div className="h-10 w-72 bg-gray-800/60 rounded mx-auto mb-16 animate-pulse" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-gray-800/50 border border-gray-700 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </section>

      {/* Skills skeleton */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="h-10 w-72 bg-gray-800/60 rounded mx-auto mb-16 animate-pulse" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-40 bg-gray-800/50 border border-gray-700 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
