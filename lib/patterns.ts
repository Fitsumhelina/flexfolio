import dynamic from "next/dynamic"

export type PatternId = "liquid-ether" | "light-rays" | string

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
]


