"use client"

import { Card, CardContent } from "@/components/ui/card"
import { demoSkills } from "@/lib/demo-data"

export function Skills() {
  // Group skills by category
  const groupedSkills: { [category: string]: typeof demoSkills } = {}
  demoSkills.forEach((skill) => {
    if (!groupedSkills[skill.category]) {
      groupedSkills[skill.category] = []
    }
    groupedSkills[skill.category].push(skill)
  })

  // Define icons for each category
  const categoryIcons: { [category: string]: JSX.Element } = {
    Frontend: (
      <svg className="w-7 h-7 text-cyan-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="16" rx="2" className="stroke-cyan-400" />
        <path d="M3 8h18" className="stroke-cyan-400" />
        <circle cx="7" cy="6" r="1" className="fill-cyan-400" />
        <circle cx="11" cy="6" r="1" className="fill-cyan-400" />
      </svg>
    ),
    Backend: (
      <svg className="w-7 h-7 text-green-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M4 7V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Z" className="stroke-green-400" />
        <polyline points="16,2 20,6 16,6" className="stroke-green-400" />
        <path d="M8 12h8" className="stroke-green-400" />
        <path d="M8 16h8" className="stroke-green-400" />
      </svg>
    ),
    Database: (
      <svg className="w-7 h-7 text-yellow-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <ellipse cx="12" cy="5" rx="9" ry="3" className="stroke-yellow-400" />
        <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" className="stroke-yellow-400" />
        <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" className="stroke-yellow-400" />
      </svg>
    ),
    "Cloud & DevOps": (
      <svg className="w-7 h-7 text-orange-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10Z" className="stroke-orange-400" />
      </svg>
    ),
    Mobile: (
      <svg className="w-7 h-7 text-pink-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" className="stroke-pink-400" />
        <line x1="12" y1="18" x2="12.01" y2="18" className="stroke-pink-400" />
      </svg>
    ),
    "AI & ML": (
      <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547Z" className="stroke-purple-400" />
      </svg>
    ),
    Blockchain: (
      <svg className="w-7 h-7 text-indigo-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" className="stroke-indigo-400" />
      </svg>
    ),
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Skills & Technologies
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Object.entries(groupedSkills).map(([category, skills]) => (
            <Card
              key={category}
              className="bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="flex justify-center mb-3">
                    {categoryIcons[category] || (
                      <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-500 rounded" />
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-white">{category}</h3>
                </div>
                <div className="space-y-3">
                  {skills.map((skill) => (
                    <div key={skill.id} className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm">{skill.name}</span>
                      <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000"
                          style={{ width: `${skill.proficiency}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
