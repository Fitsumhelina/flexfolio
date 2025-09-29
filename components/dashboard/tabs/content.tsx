"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, CheckCircle } from "lucide-react"
import { PATTERNS } from "@/lib/patterns"
import { HeroBackgroundPreview } from "@/components/ui/hero-background-preview"

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

interface DashboardContentProps {
  aboutForm: AboutForm
  handleAboutInput: (e: React.ChangeEvent<HTMLInputElement>) => void
  setAboutForm: React.Dispatch<React.SetStateAction<AboutForm>>
  handleSaveHero: () => void
  handleSaveSocial: () => void
  handleSaveAbout: () => void
  isSavingHero: boolean
  isSavingSocial: boolean
  isSavingAbout: boolean
  heroMessage: string | null
  socialMessage: string | null
  aboutMessage: string | null
}

export function DashboardContent({ 
  aboutForm, 
  handleAboutInput, 
  setAboutForm, 
  handleSaveHero, 
  handleSaveSocial, 
  handleSaveAbout,
  isSavingHero,
  isSavingSocial,
  isSavingAbout,
  heroMessage,
  socialMessage,
  aboutMessage
}: DashboardContentProps) {
  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-card-gradient-content-about border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <User className="h-5 w-5 mr-2 text-white/80" />
              Hero Section
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/80 mb-4">Customize your hero section.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-white/80 mb-1">Name</label>
                <input
                  name="name"
                  value={aboutForm.name}
                  onChange={handleAboutInput}
                  placeholder="e.g. John Doe"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder:text-white/40"
                />
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">Hero Title</label>
                <input
                  name="heroTitle"
                  value={aboutForm.heroTitle}
                  onChange={handleAboutInput}
                  placeholder="e.g. Full Stack Developer"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder:text-white/40"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-white/80 mb-1">Hero Description</label>
                <input
                  name="heroDescription"
                  value={aboutForm.heroDescription}
                  onChange={handleAboutInput}
                  placeholder="Short intro shown under the title"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder:text-white/40"
                />
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">Background Mode</label>
                <select
                  name="heroBackgroundMode"
                  value={aboutForm.heroBackgroundMode}
                  onChange={handleAboutInput as any}
                  className="w-full bg-black border border-white/20 rounded-lg px-3 py-2 text-white"
                >
                  <option value="gradient">Gradient</option>
                  <option value="image">Image</option>
                  <option value="pattern">Pattern</option>
                </select>
              </div>
              {aboutForm.heroBackgroundMode === 'gradient' ? (
                <div>
                  <label className="block text-sm text-white/80 mb-1">Gradient Preset</label>
                  <select
                    name="heroGradientPreset"
                    value={aboutForm.heroGradientPreset}
                    onChange={(e) => setAboutForm(prev => ({ ...prev, heroGradientPreset: Number(e.target.value) as 1|2|3|4 }))}
                    className="w-full bg-black border border-white/20 rounded-lg px-3 py-2 text-white"
                  >
                    <option value={1}>Preset 1</option>
                    <option value={2}>Preset 2</option>
                    <option value={3}>Preset 3</option>
                    <option value={4}>Preset 4</option>
                  </select>
                </div>
              ) : aboutForm.heroBackgroundMode === 'image' ? (
                <div>
                  <label className="block text-sm text-white/80 mb-1">Background Image URL</label>
                  <input
                    name="heroBackgroundImageUrl"
                    value={aboutForm.heroBackgroundImageUrl}
                    onChange={handleAboutInput}
                    placeholder="https://example.com/hero.jpg"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder:text-white/40"
                  />
                </div>
              ) : aboutForm.heroBackgroundMode === 'pattern' ? (
                <>
                  <div>
                    <label className="block text-sm text-white/80 mb-1">Pattern</label>
                    <select
                      value={aboutForm.heroPatternId}
                      onChange={(e) => setAboutForm(prev => ({ ...prev, heroPatternId: e.target.value }))}
                      className="w-full bg-black border border-white/20 rounded-lg px-3 py-2 text-white"
                    >
                      {PATTERNS.map(p => (
                        <option key={p.id} value={p.id}>{p.label}</option>
                      ))}
                    </select>
                  </div>
                  {/* Pattern controls: Only for liquid-ether */}
                  {aboutForm.heroPatternId === "liquid-ether" && (
                    <div className="md:col-span-2 mt-4">
                      <div className="flex flex-col md:flex-row md:items-end gap-6">
                        <div className="flex flex-col gap-3 min-w-[220px]">
                          <div>
                            <label className="block text-sm text-white/80 mb-1">Cursor Size</label>
                            <input
                              type="number"
                              value={(aboutForm.heroPatternProps?.cursorSize as number) ?? 100}
                              onChange={(e) =>
                                setAboutForm((prev) => ({
                                  ...prev,
                                  heroPatternProps: {
                                    ...prev.heroPatternProps,
                                    cursorSize: Number(e.target.value),
                                  },
                                }))
                              }
                              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-white/80 mb-1">Animation Speed</label>
                            <input
                              type="number"
                              step="0.1"
                              value={(aboutForm.heroPatternProps?.autoSpeed as number) ?? 1.5}
                              onChange={(e) =>
                                setAboutForm((prev) => ({
                                  ...prev,
                                  heroPatternProps: {
                                    ...prev.heroPatternProps,
                                    autoSpeed: Number(e.target.value),
                                  },
                                }))
                              }
                              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                            />
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <input
                              id="autodemo"
                              type="checkbox"
                              checked={(aboutForm.heroPatternProps?.autoDemo as boolean) ?? true}
                              onChange={(e) =>
                                setAboutForm((prev) => ({
                                  ...prev,
                                  heroPatternProps: {
                                    ...prev.heroPatternProps,
                                    autoDemo: e.target.checked,
                                  },
                                }))
                              }
                              className="accent-white"
                            />
                            <label htmlFor="autodemo" className="text-sm text-white/80">
                              Auto Demo
                            </label>
                          </div>
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm text-white/80 mb-2">Colors</label>
                          {(() => {
                            const entry = PATTERNS.find((p) => p.id === aboutForm.heroPatternId);
                            const defaults = (entry?.defaults?.colors as string[]) || [];
                            const currentColors: string[] = (aboutForm.heroPatternProps?.colors as string[]) || defaults;
                            const normalized =
                              Array.isArray(currentColors) && currentColors.length > 0
                                ? currentColors
                                : defaults;
                            return (
                              <div className="flex flex-col gap-2">
                                {normalized.map((c, idx) => (
                                  <div key={idx} className="flex items-center gap-3">
                                    <input
                                      type="color"
                                      value={/^#/.test(c) ? c : `#${c.replace(/[^0-9a-fA-F]/g, "")}`}
                                      onChange={(e) => {
                                        const hex = e.target.value;
                                        setAboutForm((prev) => {
                                          const arr = [
                                            ...((prev.heroPatternProps?.colors as string[]) || defaults),
                                          ];
                                          arr[idx] = hex;
                                          return {
                                            ...prev,
                                            heroPatternProps: {
                                              ...(prev.heroPatternProps || {}),
                                              colors: arr,
                                            },
                                          };
                                        });
                                      }}
                                      className="h-10 w-14 bg-transparent border border-white/20 rounded"
                                    />
                                    <span className="text-xs text-white/70">{c}</span>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setAboutForm((prev) => {
                                          const arr = [
                                            ...((prev.heroPatternProps?.colors as string[]) || defaults),
                                          ];
                                          if (arr.length <= 1) return prev;
                                          arr.splice(idx, 1);
                                          return {
                                            ...prev,
                                            heroPatternProps: {
                                              ...(prev.heroPatternProps || {}),
                                              colors: arr,
                                            },
                                          };
                                        })
                                      }
                                      className="text-xs text-red-400 hover:text-red-300"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                ))}
                                <button
                                  type="button"
                                  onClick={() =>
                                    setAboutForm((prev) => {
                                      const arr = [
                                        ...((prev.heroPatternProps?.colors as string[]) || defaults),
                                      ];
                                      if (arr.length >= 6) return prev;
                                      return {
                                        ...prev,
                                        heroPatternProps: {
                                          ...(prev.heroPatternProps || {}),
                                          colors: [...arr, "#FFFFFF"],
                                        },
                                      };
                                    })
                                  }
                                  className="text-xs text-blue-300 hover:text-blue-200"
                                >
                                  + Add color
                                </button>
                              </div>
                            );
                          })()}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : null}

              {(aboutForm.heroBackgroundMode === 'gradient' || aboutForm.heroBackgroundMode === 'image') && (
                <div>
                  <label className="block text-sm text-white/80 mb-1">Background Blur Level</label>
                  <select
                    name="heroBackgroundBlurLevel"
                    value={aboutForm.heroBackgroundBlurLevel}
                    onChange={(e) => setAboutForm(prev => ({ ...prev, heroBackgroundBlurLevel: Number(e.target.value) as 0|1|2|3|4 }))}
                    className="w-full bg-black border border-white/20 rounded-lg px-3 py-2 text-white"
                  >
                    <option value={0}>None</option>
                    <option value={1}>Low</option>
                    <option value={2}>Medium</option>
                    <option value={3}>High</option>
                    <option value={4}>Ultra</option>
                  </select>
                </div>
              )}
            </div>
            {/* Hero Preview Section */}
            <HeroBackgroundPreview 
              aboutForm={aboutForm}
              setAboutForm={setAboutForm}
              showGradientSelector={true}
              height="h-96"
              showSocialLinks={true}
              showCTAButtons={true}
              showScrollIndicator={true}
            />

            <div className="flex items-center gap-3 mt-4">
              <Button onClick={handleSaveHero} disabled={isSavingHero} className="bg-green-500 hover:bg-green-600 text-white">
                {isSavingHero ? "Saving..." : "Save Hero"}
              </Button>
              {heroMessage && (
                <span className={`text-sm flex items-center gap-1 ${
                  heroMessage.includes('successfully') ? 'text-green-400' : 'text-red-400'
                }`}>
                  <CheckCircle className="h-4 w-4" />
                  {heroMessage}
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card-gradient-content-about border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <User className="h-5 w-5 mr-2 text-white/80" />
              Social media Section
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/80 mb-4">
              Manage your contact details and social links. These appear on your public portfolio.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-white/80 mb-1">GitHub URL</label>
                <input
                  name="github"
                  value={aboutForm.github}
                  onChange={handleAboutInput}
                  placeholder="https://github.com/username"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder:text-white/40"
                />
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">X (Twitter) URL</label>
                <input
                  name="x"
                  value={aboutForm.x}
                  onChange={handleAboutInput}
                  placeholder="https://x.com/username"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder:text-white/40"
                />
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">Telegram URL</label>
                <input
                  name="telegram"
                  value={aboutForm.telegram}
                  onChange={handleAboutInput}
                  placeholder="https://t.me/username"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder:text-white/40"
                />
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">LinkedIn URL</label>
                <input
                  name="linkedin"
                  value={aboutForm.linkedin}
                  onChange={handleAboutInput}
                  placeholder="https://www.linkedin.com/in/username"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder:text-white/40"
                />
              </div>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <Button
                onClick={handleSaveSocial}
                disabled={isSavingSocial}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                {isSavingSocial ? "Saving..." : "Save Social"}
              </Button>
              {socialMessage && (
                <span className={`text-sm flex items-center gap-1 ${
                  socialMessage.includes('successfully') ? 'text-green-400' : 'text-red-400'
                }`}>
                  <CheckCircle className="h-4 w-4" />
                  {socialMessage}
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* About Section */}
        <Card className="bg-card-gradient-content-about border-0 shadow-lg" data-card="about-section">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <User className="h-5 w-5 mr-2 text-white/80" />
              About Section
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/80 mb-4">
              Manage your personal information and professional details. These appear in your about section.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
              <div>
                <label className="block text-sm text-white/80 mb-1">Bio </label>
                <input
                  name="title"
                  value={aboutForm.title}
                  onChange={handleAboutInput}
                  placeholder="Full Stack Developer"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder:text-white/40"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-white/80 mb-1">Bio</label>
                <textarea
                  name="bio"
                  value={aboutForm.bio}
                  onChange={handleAboutInput as any}
                  placeholder="Tell us about yourself..."
                  rows={4}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder:text-white/40 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">Years of Experience</label>
                <input
                  name="experience"
                  value={aboutForm.experience}
                  onChange={handleAboutInput}
                  placeholder="5+"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder:text-white/40"
                />
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">Projects Completed</label>
                <input
                  name="projectsCompleted"
                  value={aboutForm.projectsCompleted}
                  onChange={handleAboutInput}
                  placeholder="50+"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder:text-white/40"
                />
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">Profile Image URL</label>
                <input
                  name="profileImage"
                  value={aboutForm.profileImage}
                  onChange={handleAboutInput}
                  placeholder="https://example.com/profile.jpg"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder:text-white/40"
                />
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">Image Border Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={aboutForm.profileImageBorderColor}
                    onChange={(e) => setAboutForm(prev => ({ ...prev, profileImageBorderColor: e.target.value }))}
                    className="h-10 w-16 bg-transparent border border-white/20 rounded cursor-pointer"
                  />
                  <span className="text-xs text-white/70">{aboutForm.profileImageBorderColor}</span>
                  <button
                    type="button"
                    onClick={() => setAboutForm(prev => ({ ...prev, profileImageBorderColor: "#3B82F6" }))}
                    className="text-xs text-blue-300 hover:text-blue-200 px-2 py-1 border border-blue-300/30 rounded hover:bg-blue-300/10 transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
            
            {/* Image Preview */}
            {aboutForm.profileImage && (
              <div className="mt-6">
                <label className="block text-sm text-white/80 mb-2">Image Preview</label>
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4" style={{ borderColor: aboutForm.profileImageBorderColor }}>
                  <img 
                    src={aboutForm.profileImage} 
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none'
                    }}
                  />
                </div>
              </div>
            )}
            <div className="flex items-center gap-3 mt-4">
              <Button
                onClick={handleSaveAbout}
                disabled={isSavingAbout}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                {isSavingAbout ? "Saving..." : "Save About"}
              </Button>
              {aboutMessage && (
                <span className={`text-sm flex items-center gap-1 ${
                  aboutMessage.includes('successfully') ? 'text-green-400' : 'text-red-400'
                }`}>
                  <CheckCircle className="h-4 w-4" />
                  {aboutMessage}
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
