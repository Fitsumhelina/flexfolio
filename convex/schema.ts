import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    username: v.string(),
    password: v.string(), // hashed password
    createdAt: v.number(),
    updatedAt: v.number(),
    portfolioData: v.optional(v.object({
      about: v.optional(v.object({
        name: v.string(),
        title: v.string(),
        bio: v.string(),
        experience: v.string(),
        projectsCompleted: v.string(),
        email: v.string(),
        phone: v.string(),
        location: v.string(),
        profileImage: v.optional(v.string()),
      })),
      projects: v.optional(v.array(v.object({
        id: v.string(),
        title: v.string(),
        description: v.string(),
        tech: v.array(v.string()),
        image: v.optional(v.string()),
        github: v.optional(v.string()),
        live: v.optional(v.string()),
        status: v.union(v.literal("Published"), v.literal("Draft")),
        createdAt: v.string(),
        updatedAt: v.string(),
      }))),
      skills: v.optional(v.array(v.object({
        id: v.string(),
        name: v.string(),
        category: v.string(),
        proficiency: v.number(),
      }))),
    })),
  })
    .index("by_email", ["email"])
    .index("by_username", ["username"]),

  projects: defineTable({
    userId: v.id("users"),
    title: v.string(),
    description: v.string(),
    tech: v.array(v.string()),
    image: v.optional(v.string()),
    github: v.optional(v.string()),
    live: v.optional(v.string()),
    status: v.union(v.literal("Published"), v.literal("Draft")),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_status", ["status"]),

  skills: defineTable({
    userId: v.id("users"),
    name: v.string(),
    category: v.string(),
    proficiency: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_category", ["category"]),

  about: defineTable({
    userId: v.id("users"),
    name: v.string(),
    title: v.string(),
    bio: v.string(),
    experience: v.string(),
    projectsCompleted: v.string(),
    email: v.string(),
    phone: v.string(),
    location: v.string(),
    profileImage: v.optional(v.string()),
    profileImageBorderColor: v.optional(v.string()),
    github: v.optional(v.string()),
    x: v.optional(v.string()),
    telegram: v.optional(v.string()),
    linkedin: v.optional(v.string()),
    heroTitle: v.optional(v.string()),
    heroDescription: v.optional(v.string()),
    heroBackgroundMode: v.optional(v.union(v.literal("gradient"), v.literal("image"), v.literal("pattern"))),
    heroGradientPreset: v.optional(v.union(v.literal(1), v.literal(2), v.literal(3), v.literal(4))),
    heroBackgroundImageUrl: v.optional(v.string()),
    heroBackgroundBlurLevel: v.optional(v.union(v.literal(0), v.literal(1), v.literal(2), v.literal(3), v.literal(4))),
    heroPatternId: v.optional(v.string()),
    heroPatternProps: v.optional(v.any()),
  })
    .index("by_user", ["userId"]),

  messages: defineTable({
    userId: v.id("users"),
    senderEmail: v.string(),
    subject: v.string(),
    message: v.string(),
    isRead: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_userId", ["userId"]),
});
