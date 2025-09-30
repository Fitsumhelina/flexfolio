import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Track a page view for a user's portfolio
export const trackPageView = mutation({
  args: {
    userId: v.id("users"),
    visitorIP: v.optional(v.string()),
    userAgent: v.optional(v.string()),
    referrer: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const pageViewId = await ctx.db.insert("pageViews", {
      userId: args.userId,
      visitorIP: args.visitorIP,
      userAgent: args.userAgent,
      referrer: args.referrer,
      timestamp: Date.now(),
    });

    return pageViewId;
  },
});

// Get total page views for a user
export const getTotalPageViews = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const pageViews = await ctx.db
      .query("pageViews")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    return pageViews.length;
  },
});

// Get page views for a user by username
export const getTotalPageViewsByUsername = query({
  args: { username: v.string() },
  handler: async (ctx, args) => {
    // First get the user by username
    const user = await ctx.db
      .query("users")
      .withIndex("by_username", (q) => q.eq("username", args.username))
      .first();

    if (!user) {
      return 0;
    }

    // Then get page views for that user
    const pageViews = await ctx.db
      .query("pageViews")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();

    return pageViews.length;
  },
});

// Get page views for a specific time period
export const getPageViewsInPeriod = query({
  args: {
    userId: v.id("users"),
    startTime: v.number(),
    endTime: v.number(),
  },
  handler: async (ctx, args) => {
    const pageViews = await ctx.db
      .query("pageViews")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .filter((q) => 
        q.and(
          q.gte(q.field("timestamp"), args.startTime),
          q.lte(q.field("timestamp"), args.endTime)
        )
      )
      .collect();

    return pageViews.length;
  },
});

// Get recent page views (last 7 days)
export const getRecentPageViews = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
    
    const pageViews = await ctx.db
      .query("pageViews")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .filter((q) => q.gte(q.field("timestamp"), sevenDaysAgo))
      .collect();

    return pageViews.length;
  },
});

// Get page views by username for recent period
export const getRecentPageViewsByUsername = query({
  args: { username: v.string() },
  handler: async (ctx, args) => {
    // First get the user by username
    const user = await ctx.db
      .query("users")
      .withIndex("by_username", (q) => q.eq("username", args.username))
      .first();

    if (!user) {
      return 0;
    }

    const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
    
    const pageViews = await ctx.db
      .query("pageViews")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .filter((q) => q.gte(q.field("timestamp"), sevenDaysAgo))
      .collect();

    return pageViews.length;
  },
});
