"use client"

import { PATTERNS } from "@/lib/patterns"

interface AboutForm {
  email: string
  phone: string
  location: string
  github: string
  x: string
  telegram: string
  linkedin: string
  heroTitle: string
  heroDescription: string
  heroBackgroundMode: "gradient" | "image" | "pattern"
  heroGradientPreset: 1 | 2 | 3 | 4
  heroBackgroundImageUrl: string
  heroBackgroundBlurLevel: 0 | 1 | 2 | 3 | 4
  heroPatternId: string
  heroPatternProps: Record<string, any>
  name: string
  title: string
  bio: string
  experience: string
  projectsCompleted: string
  profileImage: string
  profileImageBorderColor: string
}

interface HeroBackgroundPreviewProps {
  aboutForm: any
  setAboutForm?: React.Dispatch<React.SetStateAction<any>>
  showGradientSelector?: boolean
  height?: string
  showSocialLinks?: boolean
  showCTAButtons?: boolean
  showScrollIndicator?: boolean
}

export function HeroBackgroundPreview({
  aboutForm,
  setAboutForm,
  showGradientSelector = true,
  height = "h-96",
  showSocialLinks = true,
  showCTAButtons = true,
  showScrollIndicator = true
}: HeroBackgroundPreviewProps) {
  return (
    <div className="mt-6 space-y-3">
      <div className="text-sm text-white/80">Hero Preview</div>
      <div className={`relative ${height} rounded-lg overflow-hidden border border-white/20`}>
        {/* Background */}
        {aboutForm.heroBackgroundMode === 'image' && aboutForm.heroBackgroundImageUrl ? (
          <img 
            src={aboutForm.heroBackgroundImageUrl} 
            alt="preview" 
            className={`w-full h-full object-cover opacity-50 ${`hero-blur-${aboutForm.heroBackgroundBlurLevel}`}`} 
          />
        ) : aboutForm.heroBackgroundMode === 'pattern' ? (
          (() => {
            const entry = PATTERNS.find(p => p.id === aboutForm.heroPatternId)
            if (!entry) return null
            const Comp: any = entry.component
            const defaults = entry.defaults || {}
            let patternProps = { ...defaults, ...(aboutForm.heroPatternProps || {}) }
            if (aboutForm.heroPatternId === "liquid-ether") {
              if (typeof patternProps.autoSpeed === "undefined") {
                patternProps.autoSpeed = 1.5
              }
            }
            patternProps.style = { width: '100%', height: '100%', position: 'absolute', inset: 0 }
            return <Comp {...patternProps} />
          })()
        ) : (
          <div className={`hero-animated-bg ${aboutForm.heroGradientPreset===2?'hero-bg-2':aboutForm.heroGradientPreset===3?'hero-bg-3':aboutForm.heroGradientPreset===4?'hero-bg-4':'hero-bg-1'} ${`hero-blur-${aboutForm.heroBackgroundBlurLevel}`}`} />
        )}
        
        {/* Hero Content Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          {/* Hi, I'm [Name] */}
          <div className="text-2xl sm:text-3xl font-medium text-blue-300 mb-2">
            Hi, I'm {aboutForm.name || "John"}
          </div>
          
          {/* Full Stack Developer (gradient) */}
          <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {aboutForm.heroTitle || "Full Stack Developer"}
            </span>
          </div>
          
          {/* Description */}
          <div className="text-sm sm:text-base text-white/90 max-w-md leading-relaxed">
            {aboutForm.heroDescription || "I'm a passionate full-stack developer with over 5 years of experience building scalable web applications and digital solutions."}
          </div>

          {/* Social Links */}
          {showSocialLinks && (
            <div className="flex justify-center gap-4 mt-4">
              {aboutForm.github && (
                <a href={aboutForm.github} target="_blank" rel="noopener noreferrer">
                  <img src="https://cdn-icons-png.flaticon.com/128/270/270798.png" alt="GitHub" className="w-5 h-5" />
                </a>
              )}
              {aboutForm.linkedin && (
                <a href={aboutForm.linkedin} target="_blank" rel="noopener noreferrer">
                  <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" className="w-5 h-5" />
                </a>
              )}
              {aboutForm.x && (
                <a href={aboutForm.x} target="_blank" rel="noopener noreferrer">
                  <img src="https://cdn-icons-png.flaticon.com/128/5969/5969020.png" alt="X" className="w-5 h-5" />
                </a>
              )}
              {aboutForm.telegram && (
                <a href={aboutForm.telegram} target="_blank" rel="noopener noreferrer">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" alt="Telegram" className="w-5 h-5" />
                </a>
              )}
            </div>
          )}
          
          {/* CTA Buttons */}
          {showCTAButtons && (
            <div className="mt-4">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Get In Touch Button */}
                <button className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Get In Touch
                </button>
                
                {/* View Projects Button */}
                <button className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-500 to-yellow-500 hover:from-green-600 hover:to-yellow-600 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View Projects
                </button>
              </div>
            </div>
          )}
          
          {/* Scroll Indicator */}
          {showScrollIndicator && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <svg className="w-5 h-5 text-white/60 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          )}
        </div>
      </div>
      
      {/* Gradient Preset Selector */}
      {showGradientSelector && aboutForm.heroBackgroundMode === 'gradient' && setAboutForm && (
        <div className="grid grid-cols-4 gap-2">
          {[1,2,3,4].map(p => (
            <button 
              key={p} 
              type="button" 
              onClick={() => setAboutForm(prev => ({ ...prev, heroGradientPreset: p as 1|2|3|4 }))} 
              className={`h-10 rounded border ${aboutForm.heroGradientPreset===p?'border-white':'border-white/20'} relative overflow-hidden`}
            >
              <div className={`absolute inset-0 hero-animated-bg ${p===2?'hero-bg-2':p===3?'hero-bg-3':p===4?'hero-bg-4':'hero-bg-1'}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
