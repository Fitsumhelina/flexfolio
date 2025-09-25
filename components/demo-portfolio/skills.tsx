"use client"

import { Card, CardContent } from "@/components/ui/card"

const demoSkillsByCategory: Record<string, { id: string; name: string; proficiency: number }[]> = {
  Frontend: [
    { id: "s-fe-1", name: "React", proficiency: 90 },
    { id: "s-fe-2", name: "Next.js", proficiency: 85 },
    { id: "s-fe-3", name: "Tailwind CSS", proficiency: 88 },
  ],
  Backend: [
    { id: "s-be-1", name: "Node.js", proficiency: 86 },
    { id: "s-be-2", name: "Prisma", proficiency: 80 },
    { id: "s-be-3", name: "MongoDB", proficiency: 78 },
  ],
  "Cloud & DevOps": [
    { id: "s-dev-1", name: "Docker", proficiency: 75 },
    { id: "s-dev-2", name: "Vercel", proficiency: 82 },
    { id: "s-dev-3", name: "GitHub Actions", proficiency: 70 },
  ],
};

export function Skills() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Skills & Technologies
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(demoSkillsByCategory).map(([category, skills]) => (
            <Card
              key={category}
              className="bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-white">{category}</h3>
                </div>
                <div className="space-y-3">
                  {skills.map((skill) => (
                    <div key={skill.id} className="flex items-center justify-between">
                      <span className="text-gray-300">{skill.name}</span>
                      <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
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
      </div>
    </section>
  );
}
