"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface Skill {
  id: string
  name: string
  category: string
  proficiency: number
}

export function Skills() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch("/api/skills")
        if (response.ok) {
          const data = await response.json()
          setSkills(data)
        }
      } catch (error) {
        console.error("Error fetching skills:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSkills()
  }, [])

  // Group skills by category
  const skillsByCategory = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill)
      return acc
    },
    {} as Record<string, Skill[]>,
  )

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "frontend":
        return "💻"
      case "backend":
        return "⚙️"
      case "cloud & devops":
        return "☁️"
      case "tools & others":
        return "🛠️"
      default:
        return "📚"
    }
  }

  if (loading) {
    return (
      <section id="skills" className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-800/50 border border-gray-700 rounded-lg h-64 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="skills" className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Skills & Technologies
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
            <Card
              key={category}
              className="bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">{getCategoryIcon(category)}</div>
                  <h3 className="text-xl font-semibold text-white">{category}</h3>
                </div>

                <div className="space-y-3">
                  {categorySkills.map((skill) => (
                    <div key={skill.id} className="flex items-center justify-between">
                      <span className="text-gray-300">{skill.name}</span>
                      <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
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

        {Object.keys(skillsByCategory).length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-400">No skills available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  )
}
