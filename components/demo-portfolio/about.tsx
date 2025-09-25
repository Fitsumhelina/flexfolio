"use client"

import { Card, CardContent } from "@/components/ui/card"
import { demoUserData } from "@/lib/demo-data"
import ShinyText from "../ui/ShinyText"

export function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
        About Me
      </h2>
      <div className="max-w-6xl mx-auto">
        <ShinyText text="you better hear it from me right?" className="mb-2" />
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold  mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {demoUserData.title}
            </h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-10">
              {demoUserData.bio}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl md:text-3xl font-extrabold text-blue-300 mb-1">
                    {demoUserData.projectsCompleted}
                  </div>
                  <div className="text-gray-300 text-sm">Projects Completed</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl md:text-3xl font-extrabold text-purple-300 mb-1">
                    {demoUserData.experience}
                  </div>
                  <div className="text-gray-300 text-sm">Years Experience</div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-center w-full">
              <div
                className={`
                  relative w-72 h-72 sm:w-96 sm:h-96 rounded-full overflow-hidden flex items-center justify-center
                  border-4
                  transition-shadow duration-300
                `}
                style={{
                  borderColor: demoUserData.profileImageBorderColor || '#3B82F6',
                  boxShadow: `
                    0 0 40px 10px ${demoUserData.profileImageBorderColor || 'rgba(99,102,241,0.5)'},
                    0 0 80px 20px ${demoUserData.profileImageBorderColor ? demoUserData.profileImageBorderColor + '55' : 'rgba(168,85,247,0.3)'}
                  `,
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `
                    0 0 60px 20px ${demoUserData.profileImageBorderColor || 'rgba(59,130,246,0.7)'},
                    0 0 120px 40px ${demoUserData.profileImageBorderColor ? demoUserData.profileImageBorderColor + '88' : 'rgba(168,85,247,0.5)'}
                  `;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `
                    0 0 40px 10px ${demoUserData.profileImageBorderColor || 'rgba(99,102,241,0.5)'},
                    0 0 80px 20px ${demoUserData.profileImageBorderColor ? demoUserData.profileImageBorderColor + '55' : 'rgba(168,85,247,0.3)'}
                  `;
                }}
              >
                {demoUserData.profileImage ? (
                  <img
                    src={demoUserData.profileImage}
                    alt={demoUserData.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center w-full h-full">
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full mb-4" />
                    <p className="text-gray-400">Profile Image</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
