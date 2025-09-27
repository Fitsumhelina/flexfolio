import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get all messages for a user
export const getMessages = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("messages")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

// Create a new message
export const createMessage = mutation({
  args: {
    userId: v.id("users"),
    name: v.string(),
    email: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const messageId = await ctx.db.insert("messages", {
      userId: args.userId,
      name: args.name,
      email: args.email,
      message: args.message,
      createdAt: Date.now(),
    });

    return messageId;
  },
});

// Delete a message
export const deleteMessage = mutation({
  args: { messageId: v.id("messages") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.messageId);
  },
});

// Get a single message
export const getMessage = query({
  args: { messageId: v.id("messages") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.messageId);
  },
});
