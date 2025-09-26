import { createAuthClient } from "better-auth/client"
import { usernameClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001",
  plugins: [
    usernameClient()
  ]
})

export type Session = typeof authClient.$Infer.Session
export type User = typeof authClient.$Infer.Session.user
