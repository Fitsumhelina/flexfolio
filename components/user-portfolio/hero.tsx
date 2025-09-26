"use client"

import { Button } from "@/components/ui/button"
import { Mail, ExternalLink } from "lucide-react"

interface HeroProps {
  aboutData: {
    name: string
    title: string
    heroTitle?: string
    heroDescription?: string
    heroBackgroundMode?: "gradient" | "image" | "pattern"
    heroGradientPreset?: 1 | 2 | 3 | 4
    heroBackgroundImageUrl?: string
    heroBackgroundBlurLevel?: 0 | 1 | 2 | 3 | 4
    heroPatternId?: string
    heroPatternProps?: Record<string, any>
    github?: string
    linkedin?: string
    x?: string
    telegram?: string
  }
}

export function UserHero({ aboutData }: HeroProps) {
  return (
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
        (() => {
          const mode = aboutData.heroBackgroundMode
          if (mode === 'pattern') {
            const id = aboutData.heroPatternId || 'liquid-ether'
            const props = aboutData.heroPatternProps || {}
            try {
              if (id === 'liquid-ether') {
                const Liquid = require("@/components/backgrounds/LiquidEther").default
                return (
                  <div className={`absolute inset-0 ${`hero-blur-${aboutData.heroBackgroundBlurLevel ?? 0}`}`}>
                    <Liquid {...props} />
                  </div>
                )
              } else if (id === 'light-rays') {
                const LightRays = require("@/components/backgrounds/LightRays").default
                return (
                  <div className={`absolute inset-0 ${`hero-blur-${aboutData.heroBackgroundBlurLevel ?? 0}`}`}>
                    <LightRays {...props} />
                  </div>
                )
              } else if (id === 'particles') {
                const Particles = require("@/components/backgrounds/Particles").default
                return (
                  <div className={`absolute inset-0 ${`hero-blur-${aboutData.heroBackgroundBlurLevel ?? 0}`}`}>
                    <Particles {...props} />
                  </div>
                )
              } else if (id === 'dot-grid') {
                const DotGrid = require("@/components/backgrounds/DotGrid").default
                // Merge saved props with updated defaults for tiny dots
                const mergedProps = {
                  dotSize: 5,
                  gap: 25,
                  proximity: 80,
                  shockRadius: 150,
                  shockStrength: 3,
                  ...props
                }
                return (
                  <div className={`absolute inset-0 ${`hero-blur-${aboutData.heroBackgroundBlurLevel ?? 0}`}`}>
                    <DotGrid {...mergedProps} />
                  </div>
                )
              }
            } catch {}
          }
          return (
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
          )
        })()
      )}

      <div className="relative z-10 max-w-3xl mx-auto text-center px-4">
        <h2 className="text-xl md:text-7xl font-medium text-blue-300 mb-2 tracking-wide animate-fade-in">
          Hi, I'm <span className="font-bold">{aboutData.name || "Developer"}</span>
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
              className="transition-transform hover:scale-110"
              aria-label="GitHub"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/270/270798.png"
                alt="GitHub"
                className="w-7 h-7"
              />
            </a>
          )}

          {aboutData.linkedin && (
            <a
              href={aboutData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-110"
              aria-label="LinkedIn"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                alt="LinkedIn"
                className="w-7 h-7"
              />
            </a>
          )}

          {aboutData.telegram && (
            <a
              href={aboutData.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-110"
              aria-label="Telegram"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg"
                alt="Telegram"
                className="w-7 h-7"
              />
            </a>
          )}

          {aboutData.x && (
            <a
              href={aboutData.x}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-110"
              aria-label="X"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/5969/5969020.png"
                alt="X"
                className="w-7 h-7"
              />
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
  )
}
