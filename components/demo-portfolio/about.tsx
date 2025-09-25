"use client"

import { Card, CardContent } from "@/components/ui/card"
import { demoUserData } from "@/lib/demo-data"

export function About() {
  return (
    <section id="about" className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          About Me
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {demoUserData.title}
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed">{demoUserData.bio}</p>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">{demoUserData.projectsCompleted}</div>
                  <div className="text-gray-300">Projects Completed</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">{demoUserData.experience}</div>
                  <div className="text-gray-300">Years Experience</div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="relative">
            <div 
              className="w-full h-96 rounded-lg overflow-hidden flex items-center justify-center border-4"
              style={{ borderColor: demoUserData.profileImageBorderColor }}
            >
              <img
                src={demoUserData.profileImage}
                alt={demoUserData.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
