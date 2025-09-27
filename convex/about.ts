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
      // Create new about data
      const aboutId = await ctx.db.insert("about", {
        userId,
        ...cleanUpdates,
      });
      return aboutId;
    }
  },
});
