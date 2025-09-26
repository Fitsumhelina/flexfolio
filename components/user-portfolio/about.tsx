"use client"

import { Card, CardContent } from "@/components/ui/card"
import ShinyText from "../ui/ShinyText"

interface AboutProps {
  aboutData: {
    name: string
    title: string
    bio: string
    experience: string
    projectsCompleted: string
    profileImage?: string
    profileImageBorderColor?: string
  }
}

export function UserAbout({ aboutData }: AboutProps) {
  return (
    <section
      id="about"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
        About Me
      </h2>
      <div className="max-w-6xl mx-auto">
        <ShinyText text="you better hear it from me right?" className="mb-2" />
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold  mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {aboutData.title}
            </h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-10">
              {aboutData.bio}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl md:text-3xl font-extrabold text-blue-300 mb-1">
                    {aboutData.projectsCompleted}
                  </div>
                  <div className="text-gray-300 text-sm">Projects Completed</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl md:text-3xl font-extrabold text-purple-300 mb-1">
                    {aboutData.experience}
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
                  borderColor: aboutData.profileImageBorderColor,
                  boxShadow: `
                    0 0 40px 10px ${aboutData.profileImageBorderColor},
                    0 0 80px 20px ${aboutData.profileImageBorderColor}55
                  `,
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `
                    0 0 60px 20px ${aboutData.profileImageBorderColor},
                    0 0 120px 40px ${aboutData.profileImageBorderColor}88
                  `;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `
                    0 0 40px 10px ${aboutData.profileImageBorderColor},
                    0 0 80px 20px ${aboutData.profileImageBorderColor}55
                  `;
                }}
              >
                {aboutData.profileImage ? (
                  <img
                    src={aboutData.profileImage}
                    alt={aboutData.name}
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
