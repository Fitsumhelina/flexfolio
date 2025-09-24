"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { User, Mail, Phone, MapPin, ExternalLink, Send } from "lucide-react";

interface UserData {
  _id: string;
  name: string;
  email: string;
  username: string;
  portfolioData?: {
    about?: {
      name: string;
      title: string;
      bio: string;
      experience: string;
      projectsCompleted: string;
      email: string;
      phone: string;
      location: string;
      profileImage?: string;
      github?: string;
      linkedin?: string;
      x?: string;
      telegram?: string;
      heroTitle?: string;
      heroDescription?: string;
      heroBackgroundMode?: "gradient" | "image";
      heroGradientPreset?: 1 | 2 | 3 | 4;
      heroBackgroundImageUrl?: string;
      heroBackgroundBlurLevel?: 0 | 1 | 2 | 3 | 4;
    };
    projects?: Array<{
      id: string;
      title: string;
      description: string;
      tech: string[];
      image?: string;
      github?: string;
      live?: string;
      status: string;
    }>;
    skills?: Array<{
      id: string;
      name: string;
      category: string;
      proficiency: number;
    }>;
  };
}

interface UserPortfolioProps {
  username: string;
}

export function UserPortfolio({ username }: UserPortfolioProps) {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/users/${username}`);
        const data = await response.json();

        if (response.ok) {
          setUser(data.user);
        } else {
          setError(data.error || "User not found");
        }
      } catch (error) {
        setError("Failed to load portfolio");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  if (isLoading) {
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
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Card className="bg-gray-900/50 border-gray-700 max-w-md">
          <CardContent className="p-8 text-center">
            <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">
              Page Not Found
            </h1>
            <p className="text-gray-400 mb-6">
              The portfolio you're looking for doesn't exist or has been
              removed.
            </p>
            <Button
              onClick={() => router.push(ROUTES.HOME)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Go Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const portfolioData = user.portfolioData || {};
  const aboutData = portfolioData.about || {
    name: user.name,
    title: "Full Stack Developer",
    bio: "your bio here.",
    experience: "1+",
    projectsCompleted: "5+",
    email: user.email,
    phone: "",
    location: "",
    profileImage: "",
    heroTitle: "Your Title here",
    heroDescription: "your bio here",
    heroBackgroundMode: "gradient",
    heroGradientPreset: 1,
    heroBackgroundImageUrl: "",
    heroBackgroundBlurLevel: 0,
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Enhanced Hero Section with User Data */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Animated/Custom Background based on user preference */}
        {aboutData.heroBackgroundMode === 'image' && aboutData.heroBackgroundImageUrl ? (
          <img
            src={aboutData.heroBackgroundImageUrl}
            alt="hero background"
            className={`absolute inset-0 w-full h-full object-cover opacity-40 ${`hero-blur-${aboutData.heroBackgroundBlurLevel ?? 0}`}`}
          />
        ) : (
          <div
            className={`hero-animated-bg ${
              (aboutData.heroGradientPreset as number) === 2
                ? 'hero-bg-2'
                : (aboutData.heroGradientPreset as number) === 3
                ? 'hero-bg-3'
                : (aboutData.heroGradientPreset as number) === 4
                ? 'hero-bg-4'
                : 'hero-bg-1'
            } ${`hero-blur-${aboutData.heroBackgroundBlurLevel ?? 0}`}`}
          />
        )}

        <div className="relative z-10 max-w-3xl mx-auto text-center px-4">
          <h2 className="text-xl md:text-7xl font-medium text-blue-300 mb-2 tracking-wide animate-fade-in">
            Hi, I'm <span className="font-bold">{aboutData.name}</span>
          </h2>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 via-purple-300 to-pink-300 bg-clip-text text-transparent drop-shadow-lg animate-gradient-x">
            {aboutData.heroTitle || aboutData.title || "Full Stack Developer"}
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 mb-8 leading-relaxed animate-fade-in-slow">
            {aboutData.heroDescription}
          </p>

          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-8">
            {aboutData.github && (
              <a
                href={aboutData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <svg
                  className="w-7 h-7"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 2.92-.39c.99 0 1.99.13 2.92.39 2.22-1.49 3.2-1.18 3.2-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.27 5.7.42.36.79 1.09.79 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.68.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z" />
                </svg>
              </a>
            )}
            {aboutData.linkedin && (
              <a
                href={aboutData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-7 h-7"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.88v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z" />
                </svg>
              </a>
            )}
            {aboutData.email && (
              <a
                href={`mailto:${aboutData.email}`}
                className="text-gray-400 hover:text-pink-400 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-7 h-7" />
              </a>
            )}
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4 shadow-lg transition-all"
              onClick={() => {
                const contact = document.getElementById("contact");
                if (contact) contact.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Mail className="mr-2 h-5 w-5" />
              Get In Touch
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-gray-600 text-white text-lg px-8 py-4 shadow-lg transition-all bg-button-gradient-multicolor hover:brightness-110"
              onClick={() => {
                const projects = document.getElementById("projects");
                if (projects) projects.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <ExternalLink className="mr-2 h-5 w-5" />
              View Projects
            </Button>
          </div>

          {/* Animated Down Arrow */}
          <div className="mt-10 flex justify-center">
            <button
              aria-label="Scroll to About"
              onClick={() => {
                const about = document.getElementById("about");
                if (about) about.scrollIntoView({ behavior: "smooth" });
              }}
              className="animate-bounce text-gray-400 hover:text-blue-400 transition-colors text-3xl"
              style={{ background: "none", border: "none", outline: "none" }}
            >
              <svg
                className="w-8 h-8 mx-auto"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* About Section (match demo) */}
      <section
        id="about"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-10">
                {aboutData.bio}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-8 text-center">
                    <div className="text-4xl md:text-5xl font-extrabold text-blue-300 mb-2">
                      {aboutData.projectsCompleted}
                    </div>
                    <div className="text-gray-300">Projects Completed</div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-8 text-center">
                    <div className="text-4xl md:text-5xl font-extrabold text-purple-300 mb-2">
                      {aboutData.experience}
                    </div>
                    <div className="text-gray-300">Years Experience</div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-center w-full">
                <div
                  className={`
                    relative w-72 h-72 sm:w-96 sm:h-96 rounded-full overflow-hidden flex items-center justify-center
                    border-4 border-blue-500
                    shadow-[0_0_40px_10px_rgba(99,102,241,0.5),0_0_80px_20px_rgba(168,85,247,0.3)]
                    transition-shadow duration-300
                    hover:shadow-[0_0_60px_20px_rgba(59,130,246,0.7),0_0_120px_40px_rgba(168,85,247,0.5)]
                  `}
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

      {/* Projects Section */}
      {portfolioData.projects && portfolioData.projects.length > 0 && (
        <section
          id="projects"
          className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black"
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioData.projects.map((project) => (
                <Card
                  key={project.id}
                  className="bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-all duration-300 group"
                >
                  <CardHeader className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={
                          project.image ||
                          "/placeholder.svg?height=200&width=400"
                        }
                        alt={project.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <CardTitle className="text-xl mb-3 text-white">
                      {project.title}
                    </CardTitle>
                    <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      {project.github && project.github !== "#" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                          onClick={() =>
                            window.open(project.github as string, "_blank")
                          }
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          GitHub
                        </Button>
                      )}
                      {project.live && project.live !== "#" && (
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                          onClick={() =>
                            window.open(project.live as string, "_blank")
                          }
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Live Demo
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Skills Section - "My Technical Arsenal" */}
      {portfolioData.skills &&
        portfolioData.skills.length > 0 &&
        (() => {
          // Group skills by category, including proficiency
          const groupedSkills: {
            [category: string]: {
              id: string;
              name: string;
              proficiency: number;
            }[];
          } = {};
          (portfolioData.skills || []).forEach((skill) => {
            if (!groupedSkills[skill.category]) {
              groupedSkills[skill.category] = [];
            }
            groupedSkills[skill.category].push({
              id: skill.id,
              name: skill.name,
              proficiency: skill.proficiency ?? 0,
            });
          });

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
          };

          // Define display order and pretty names
          const displayCategories = [
            { key: "Frontend", label: "Frontend" },
            { key: "Backend", label: "Backend" },
            { key: "DevOps", label: "Cloud & DevOps" },
          ];

          // Helper to get color for proficiency bar based on category
          const getBarColor = (category: string) => {
            if (category === "Frontend") return "bg-cyan-400";
            if (category === "Backend") return "bg-blue-400";
            if (category === "DevOps") return "bg-teal-400";
            return "bg-gray-400";
          };

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
          );
        })()}

      {/* Contact Section - matches demo */}
      <section
        id="contact"
        className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Let's Work Together
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  I'm always interested in new opportunities and exciting
                  projects. Whether you have a question or just want to say hi,
                  I'll try my best to get back to you!
                </p>
              </div>

              <div className="space-y-4">
                {aboutData.email && (
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Mail className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Email</p>
                      <p className="text-gray-300">{aboutData.email}</p>
                    </div>
                  </div>
                )}

                {aboutData.phone && (
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <Phone className="h-6 w-6 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Phone</p>
                      <p className="text-gray-300">{aboutData.phone}</p>
                    </div>
                  </div>
                )}

                {aboutData.location && (
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-green-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Location</p>
                      <p className="text-gray-300">{aboutData.location}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Send Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <form
                  onSubmit={async (e) => {
                    e.preventDefault()
                    const form = e.currentTarget as any
                    const formData = new FormData(form)
                    const payload = {
                      toUsername: user.username,
                      fromName: String(formData.get('name') || ''),
                      fromEmail: String(formData.get('email') || ''),
                      subject: String(formData.get('subject') || ''),
                      body: String(formData.get('message') || ''),
                    }
                    try {
                      const res = await fetch('/api/messages', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload),
                      })
                      if (res.ok) {
                        form.reset()
                        alert('Message sent!')
                      } else {
                        const data = await res.json()
                        alert(data?.error || 'Failed to send')
                      }
                    } catch (err) {
                      alert('Network error')
                    }
                  }}
                  className="space-y-4"
                >
                  <Input name="name" placeholder="Your Name" className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400" />
                  <Input name="email" placeholder="Email Address" type="email" className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400" />
                  <Input name="subject" placeholder="Subject" className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400" />
                  <Textarea name="message" placeholder="Your Message" rows={5} className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400" />
                  <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
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
    </div>
  );
}
