import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get all projects for a user
export const getProjects = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("projects")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

// Get published projects for a user
export const getPublishedProjects = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("projects")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("status"), "Published"))
      .collect();
  },
});

// Create a new project
export const createProject = mutation({
  args: {
    userId: v.id("users"),
    title: v.string(),
    description: v.string(),
    tech: v.array(v.string()),
    image: v.optional(v.string()),
    github: v.optional(v.string()),
    live: v.optional(v.string()),
    status: v.union(v.literal("Published"), v.literal("Draft")),
  },
  handler: async (ctx, args) => {
    const projectId = await ctx.db.insert("projects", {
      userId: args.userId,
      title: args.title,
      description: args.description,
      tech: args.tech,
      image: args.image,
      github: args.github,
      live: args.live,
      status: args.status,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return projectId;
  },
});

// Update a project
export const updateProject = mutation({
  args: {
    projectId: v.id("projects"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    tech: v.optional(v.array(v.string())),
    image: v.optional(v.string()),
    github: v.optional(v.string()),
    live: v.optional(v.string()),
    status: v.optional(v.union(v.literal("Published"), v.literal("Draft"))),
  },
  handler: async (ctx, args) => {
    const { projectId, ...updates } = args;
    
    // Remove undefined values
    const cleanUpdates = Object.fromEntries(
      Object.entries(updates).filter(([_, value]) => value !== undefined)
    );

    await ctx.db.patch(projectId, {
      ...cleanUpdates,
      updatedAt: Date.now(),
    });

    return projectId;
  },
});

// Delete a project
export const deleteProject = mutation({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.projectId);
  },
});

// Get a single project
export const getProject = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.projectId);
  },
});
