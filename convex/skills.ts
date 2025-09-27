import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get all skills for a user
export const getSkills = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("skills")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

// Create a new skill
export const createSkill = mutation({
  args: {
    userId: v.id("users"),
    name: v.string(),
    category: v.string(),
    proficiency: v.number(),
  },
  handler: async (ctx, args) => {
    const skillId = await ctx.db.insert("skills", {
      userId: args.userId,
      name: args.name,
      category: args.category,
      proficiency: args.proficiency,
    });

    return skillId;
  },
});

// Update a skill
export const updateSkill = mutation({
  args: {
    skillId: v.id("skills"),
    name: v.optional(v.string()),
    category: v.optional(v.string()),
    proficiency: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { skillId, ...updates } = args;
    
    // Remove undefined values
    const cleanUpdates = Object.fromEntries(
      Object.entries(updates).filter(([_, value]) => value !== undefined)
    );

    await ctx.db.patch(skillId, cleanUpdates);
    return skillId;
  },
});

// Delete a skill
export const deleteSkill = mutation({
  args: { skillId: v.id("skills") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.skillId);
  },
});

// Get skills by category
export const getSkillsByCategory = query({
  args: { 
    userId: v.id("users"),
    category: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("skills")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("category"), args.category))
      .collect();
  },
});
