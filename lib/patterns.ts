import dynamic from "next/dynamic"

export type PatternId = "liquid-ether" | string

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
    component: dynamic(() => import("@/components/LiquidEther").then(m => m.default), { ssr: false }) as any,
    defaults: {
      colors: ["#5227FF", "#FF9FFC", "#B19EEF"],
      autoDemo: true,
      autoSpeed: 0.5,
      cursorSize: 100,
    },
  },
]


