"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail, ExternalLink } from "lucide-react"
import { demoUserData } from "@/lib/demo-data"
import dynamic from "next/dynamic"

const Particles = dynamic(() => import("@/components/backgrounds/Particles").then(m => m.default), { ssr: false })

export function Hero() {
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

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <div className="mb-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-300">Hi, I'm {demoUserData.name}</h2>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
          {demoUserData.heroTitle}
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          {demoUserData.heroDescription}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button
            size="lg"
            onClick={scrollToProjects}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
          >
            <ExternalLink className="h-5 w-5 mr-2" />
            View My Work
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={scrollToContact}
            className="border-white/20 text-white hover:bg-white/10 bg-transparent"
          >
            <Mail className="h-5 w-5 mr-2" />
            Get In Touch
          </Button>
        </div>

        <div className="flex justify-center space-x-6">
          {demoUserData.github && (
            <a
              href={demoUserData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Github className="h-6 w-6" />
            </a>
          )}
          {demoUserData.linkedin && (
            <a
              href={demoUserData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Linkedin className="h-6 w-6" />
            </a>
          )}
          {demoUserData.email && (
            <a href={`mailto:${demoUserData.email}`} className="text-gray-400 hover:text-white transition-colors">
              <Mail className="h-6 w-6" />
            </a>
          )}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-gray-400" />
      </div>
    </section>
  )
}
