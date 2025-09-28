import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get all messages for a user
export const getMessages = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("messages")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

// Create a new message by username
export const createMessageByUsername = mutation({
  args: {
    username: v.string(),
    name: v.string(),
    email: v.string(),
    subject: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    // First, find the user by username
    const user = await ctx.db
      .query("users")
      .withIndex("by_username", (q) => q.eq("username", args.username))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    const messageId = await ctx.db.insert("messages", {
      userId: user._id,
      senderEmail: args.email,
      subject: args.subject,
      message: args.message,
      isRead: false,
      createdAt: Date.now(),
    });

    return messageId;
  },
});

// Create a new message
export const createMessage = mutation({
  args: {
    userId: v.id("users"),
    senderEmail: v.string(),
    subject: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const messageId = await ctx.db.insert("messages", {
      userId: args.userId,
      senderEmail: args.senderEmail,
      subject: args.subject,
      message: args.message,
      isRead: false,
      createdAt: Date.now(),
    });

    return messageId;
  },
});

// Mark message as read
export const markAsRead = mutation({
  args: { messageId: v.id("messages") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.messageId, { isRead: true });
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
