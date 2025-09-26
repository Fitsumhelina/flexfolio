"use client"

interface SkillsProps {
  skills: Array<{
    id: string
    name: string
    category: string
    proficiency: number
  }>
}

export function UserSkills({ skills }: SkillsProps) {
  if (!skills || skills.length === 0) return null

  // Group skills by category, including proficiency
  const groupedSkills: {
    [category: string]: {
      id: string
      name: string
      proficiency: number
    }[]
  } = {}
  skills.forEach((skill) => {
    if (!groupedSkills[skill.category]) {
      groupedSkills[skill.category] = []
    }
    groupedSkills[skill.category].push({
      id: skill.id,
      name: skill.name,
      proficiency: skill.proficiency ?? 0,
    })
  })

  // Define icons for each category
  const categoryIcons: { [category: string]: JSX.Element } = {
    Frontend: (
      <svg
        className="w-7 h-7 text-cyan-400"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <rect
          x="3"
          y="4"
          width="18"
          height="16"
          rx="2"
          className="stroke-cyan-400"
        />
        <path d="M3 8h18" className="stroke-cyan-400" />
        <circle cx="7" cy="6" r="1" className="fill-cyan-400" />
        <circle cx="11" cy="6" r="1" className="fill-cyan-400" />
      </svg>
    ),
    Backend: (
      <svg
        className="w-7 h-7 text-blue-400"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <ellipse
          cx="12"
          cy="7"
          rx="9"
          ry="4"
          className="stroke-blue-400"
        />
        <path
          d="M3 7v6c0 2.21 4.03 4 9 4s9-1.79 9-4V7"
          className="stroke-blue-400"
        />
        <path
          d="M3 13v4c0 2.21 4.03 4 9 4s9-1.79 9-4v-4"
          className="stroke-blue-400"
        />
      </svg>
    ),
    "Cloud & DevOps": (
      <svg
        className="w-7 h-7 text-teal-400"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <ellipse
          cx="12"
          cy="6"
          rx="9"
          ry="3"
          className="stroke-teal-400"
        />
        <path
          d="M3 6v6c0 1.66 4.03 3 9 3s9-1.34 9-3V6"
          className="stroke-teal-400"
        />
        <path
          d="M3 12v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6"
          className="stroke-teal-400"
        />
      </svg>
    ),
  }

  // Define display order and pretty names
  const displayCategories = [
    { key: "Frontend", label: "Frontend" },
    { key: "Backend", label: "Backend" },
    { key: "DevOps", label: "Cloud & DevOps" },
  ]

  // Helper to get color for proficiency bar based on category
  const getBarColor = (category: string) => {
    if (category === "Frontend") return "bg-cyan-400"
    if (category === "Backend") return "bg-blue-400"
    if (category === "DevOps") return "bg-teal-400"
    return "bg-gray-400"
  }

  return (
    <section
      id="skills"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
          My Technical Skills
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayCategories.map(({ key, label }) => (
            <div
              key={key}
              className={`bg-gray-900/60 border-2 transition-colors duration-200  ${
                key === "Frontend"
                  ? "border-cyan-400 hover:border-cyan-300"
                  : key === "Backend"
                  ? "border-blue-400 hover:border-blue-300"
                  : "border-teal-400 hover:border-teal-300"
              } rounded-xl p-8 shadow-lg flex flex-col`}
            >
              <div className="flex items-center mb-4">
                <div className="mr-3">{categoryIcons[key]}</div>
                <h3 className="text-xl font-semibold text-white">
                  {label}
                </h3>
              </div>
              <ul className="space-y-4 mt-2">
                {(groupedSkills[key] || []).map((skill) => (
                  <li key={skill.id} className="flex flex-col gap-1">
                    <div className="flex items-center text-gray-200 text-base pl-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 mr-3"></span>
                      {skill.name}
                    </div>
                    <div className="w-full h-3 bg-gray-800 rounded-full relative overflow-hidden">
                      <div
                        className={`${getBarColor(
                          key
                        )} h-3 rounded-full transition-all`}
                        style={{
                          width: `${Math.max(
                            0,
                            Math.min(skill.proficiency ?? 0, 100)
                          )}%`,
                          minWidth:
                            skill.proficiency > 0 ? "0.5rem" : "0",
                        }}
                      ></div>
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-300 font-medium select-none">
                        {typeof skill.proficiency === "number"
                          ? `${skill.proficiency}%`
                          : ""}
                      </span>
                    </div>
                  </li>
                ))}
                {/* If no skills in this category, show a subtle placeholder */}
                {(groupedSkills[key] || []).length === 0 && (
                  <li className="text-gray-500 italic">
                    No skills listed
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
