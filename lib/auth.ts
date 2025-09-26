import { betterAuth } from "better-auth"
import { username } from "better-auth/plugins"
import { getDatabase } from "./mongodb"

export const auth = betterAuth({
  database: {
    provider: "mongodb",
    url: process.env.MONGODB_URI || "mongodb://localhost:27017/flexfolio",
  },
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001",
  emailAndPassword: {
    enabled: true,
    autoSignIn: false, // We'll handle sign-in manually
  },
  plugins: [
    username({
      minUsernameLength: 3,
      maxUsernameLength: 30,
      usernameValidator: (username) => {
        // Only allow alphanumeric characters, underscores, and dots
        return /^[a-zA-Z0-9_.]+$/.test(username)
      },
    })
  ],
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  user: {
    additionalFields: {
      username: {
        type: "string",
        required: true,
        unique: true,
      },
      displayUsername: {
        type: "string",
        required: true,
        unique: true,
      },
    },
  },
})
