"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail, ExternalLink } from "lucide-react"
import { demoUserData } from "@/lib/demo-data"
import dynamic from "next/dynamic"

const Particles = dynamic(() => import("@/components/backgrounds/Particles").then(m => m.default), { ssr: false })

export function DemoHero() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />

      {/* Particles Background */}
      <div className="absolute inset-0">
        <Particles 
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleColors={['#ffffff', '#ffffff']}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
          particleHoverFactor={1}
          sizeRandomness={1}
          cameraDistance={20}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center px-4">
        <h2 className="text-xl md:text-7xl font-medium text-blue-300 mb-2 tracking-wide animate-fade-in">
          Hi, I'm <span className="font-bold">{demoUserData.name}</span>
        </h2>
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 via-purple-300 to-pink-300 bg-clip-text text-transparent drop-shadow-lg animate-gradient-x">
          {demoUserData.heroTitle}
        </h1>
        <p className="text-lg md:text-2xl text-gray-200 mb-8 leading-relaxed animate-fade-in-slow">
          {demoUserData.heroDescription}
        </p>

       {/* Social Links */}
        <div className="flex justify-center gap-4 mb-8">
          {demoUserData.github && (
            <a
              href={demoUserData.github}
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

          {demoUserData.linkedin && (
            <a
              href={demoUserData.linkedin}
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

          {demoUserData.telegram && (
            <a
              href={demoUserData.telegram}
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

          {demoUserData.x && (
            <a
              href={demoUserData.x}
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
