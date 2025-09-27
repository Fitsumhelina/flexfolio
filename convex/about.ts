import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get about data for a user
export const getAbout = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const about = await ctx.db
      .query("about")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();

    if (!about) {
      // Return default data if none exists (don't create it in query)
      return {
        userId: args.userId,
        name: "John Developer",
        title: "Full Stack Developer",
        bio: "I'm a passionate full-stack developer with over 5 years of experience building scalable web applications and digital solutions. I specialize in modern JavaScript frameworks and cloud technologies.",
        experience: "5+",
        projectsCompleted: "50+",
        email: "hello@developer.com",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
        profileImage: "",
        profileImageBorderColor: "#3B82F6",
        github: "",
        x: "",
        telegram: "",
        linkedin: "",
        heroTitle: "Full Stack Developer",
        heroDescription: "I'm a passionate full-stack developer with over 5 years of experience building scalable web applications and digital solutions.",
        heroBackgroundMode: "gradient",
        heroGradientPreset: 1,
        heroBackgroundImageUrl: "",
        heroBackgroundBlurLevel: 0,
        heroPatternId: "liquid-ether",
        heroPatternProps: {},
      };
    }

    return about;
  },
});

// Create default about data for a user
export const createDefaultAbout = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const existingAbout = await ctx.db
      .query("about")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();

    if (!existingAbout) {
      const defaultData = {
        userId: args.userId,
        name: "John Developer",
        title: "Full Stack Developer",
        bio: "I'm a passionate full-stack developer with over 5 years of experience building scalable web applications and digital solutions. I specialize in modern JavaScript frameworks and cloud technologies.",
        experience: "5+",
        projectsCompleted: "50+",
        email: "hello@developer.com",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
        profileImage: "",
        profileImageBorderColor: "#3B82F6",
        github: "",
        x: "",
        telegram: "",
        linkedin: "",
        heroTitle: "Full Stack Developer",
        heroDescription: "I'm a passionate full-stack developer with over 5 years of experience building scalable web applications and digital solutions.",
        heroBackgroundMode: "gradient",
        heroGradientPreset: 1,
        heroBackgroundImageUrl: "",
        heroBackgroundBlurLevel: 0,
        heroPatternId: "liquid-ether",
        heroPatternProps: {},
      };

      const aboutId = await ctx.db.insert("about", defaultData);
      return { ...defaultData, _id: aboutId };
    }

    return existingAbout;
  },
});

// Update about data
export const updateAbout = mutation({
  args: {
    userId: v.id("users"),
    name: v.optional(v.string()),
    title: v.optional(v.string()),
    bio: v.optional(v.string()),
    experience: v.optional(v.string()),
    projectsCompleted: v.optional(v.string()),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    location: v.optional(v.string()),
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
  },
  handler: async (ctx, args) => {
    const { userId, ...updates } = args;
    
    // Remove undefined values
    const cleanUpdates = Object.fromEntries(
      Object.entries(updates).filter(([_, value]) => value !== undefined)
    );

    // Check if about data exists
    const existingAbout = await ctx.db
      .query("about")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    if (existingAbout) {
      await ctx.db.patch(existingAbout._id, cleanUpdates);
      return existingAbout._id;
    } else {
      // Create default about data first, then update it
      const defaultData = {
        userId,
        name: "John Developer",
        title: "Full Stack Developer",
        bio: "I'm a passionate full-stack developer with over 5 years of experience building scalable web applications and digital solutions. I specialize in modern JavaScript frameworks and cloud technologies.",
        experience: "5+",
        projectsCompleted: "50+",
        email: "hello@developer.com",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
        profileImage: "",
        profileImageBorderColor: "#3B82F6",
        github: "",
        x: "",
        telegram: "",
        linkedin: "",
        heroTitle: "Full Stack Developer",
        heroDescription: "I'm a passionate full-stack developer with over 5 years of experience building scalable web applications and digital solutions.",
        heroBackgroundMode: "gradient",
        heroGradientPreset: 1,
        heroBackgroundImageUrl: "",
        heroBackgroundBlurLevel: 0,
        heroPatternId: "liquid-ether",
        heroPatternProps: {},
      };

      // Merge default data with updates
      const mergedData = { ...defaultData, ...cleanUpdates };
      
      const aboutId = await ctx.db.insert("about", mergedData);
      return aboutId;
    }
  },
});
