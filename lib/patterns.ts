import dynamic from "next/dynamic"

export type PatternId = "liquid-ether" | "light-rays" | "particles" | "dot-grid" | string

export type PatternEntry = {
  id: PatternId
  label: string
  // dynamically loaded component to avoid SSR issues
  component: React.ComponentType<any>
  // minimal preview props and defaults
  defaults?: Record<string, any>
}

export const PATTERNS: PatternEntry[] = [
  {
    id: "liquid-ether",
    label: "Liquid Ether",
    component: dynamic(() => import("@/components/backgrounds/LiquidEther").then(m => m.default), { ssr: false }) as any,
    defaults: {
      colors: ["#5227FF", "#FF9FFC", "#B19EEF"],
      autoDemo: true,
      autoSpeed: 0.5,
      cursorSize: 100,
    },
  },
  {
    id: "light-rays",
    label: "Light Rays",
    component: dynamic(() => import("@/components/backgrounds/LightRays").then(m => m.default), { ssr: false }) as any,
    defaults: {
      raysOrigin: "top-center",
      raysColor: "#00ffff",
      raysSpeed: 1.5,
      lightSpread: 0.8,
      rayLength: 1.2,
      followMouse: true,
      mouseInfluence: 0.1,
      noiseAmount: 0.1,
      distortion: 0.05,
      pulsating: false,
      fadeDistance: 1.0,
      saturation: 1.0,
    },
  },
  {
    id: "particles",
    label: "Particles",
    component: dynamic(() => import("@/components/backgrounds/Particles").then(m => m.default), { ssr: false }) as any,
    defaults: {
      particleColors: ['#ffffff', '#ffffff'],
      particleCount: 200,
      particleSpread: 10,
      speed: 0.1,
      particleBaseSize: 100,
      moveParticlesOnHover: true,
      alphaParticles: false,
      disableRotation: false,
      particleHoverFactor: 1,
      sizeRandomness: 1,
      cameraDistance: 20,
    },
  },
  {
    id: "dot-grid",
    label: "Dot Grid",
    component: dynamic(() => import("@/components/backgrounds/DotGrid").then(m => m.default), { ssr: false }) as any,
    defaults: {
      dotSize: 3,
      gap: 8,
      baseColor: "#5227FF",
      activeColor: "#5227FF",
      proximity: 80,
      shockRadius: 150,
      shockStrength: 3,
      resistance: 750,
      returnDuration: 1.5,
      speedTrigger: 0.5,
      maxSpeed: 2,
    },
  },
]


