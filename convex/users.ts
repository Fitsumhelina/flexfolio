import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Register a new user
export const register = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    username: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const existingUsername = await ctx.db
      .query("users")
      .withIndex("by_username", (q) => q.eq("username", args.username))
      .first();

    if (existingUsername) {
      throw new Error("Username already taken");
    }

    // For now, store password as plain text (we'll implement proper auth later)
    // In production, you should use Convex Auth or handle password hashing in an action
    const userId = await ctx.db.insert("users", {
      name: args.name,
      email: args.email,
      username: args.username,
      password: args.password, // Store as plain text for now
      createdAt: Date.now(),
      updatedAt: Date.now(),
      portfolioData: {
        about: {
          name: args.name,
          title: "Full Stack Developer",
          bio: "I'm a passionate developer who loves creating amazing digital experiences.",
          experience: "1+",
          projectsCompleted: "5+",
          email: args.email,
          phone: "",
          location: "",
          profileImage: "",
        },
        projects: [],
        skills: [],
      },
    });

    return userId;
  },
});

// Login user
export const login = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!user) {
      throw new Error("Invalid email or password");
    }

    // For now, compare plain text passwords
    // In production, you should use Convex Auth or handle password verification in an action
    if (user.password !== args.password) {
      throw new Error("Invalid email or password");
    }

    // Return user without password
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },
});

// Get user by ID
export const getUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) return null;
    
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },
});

// Get user by username
export const getUserByUsername = query({
  args: { username: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_username", (q) => q.eq("username", args.username))
      .first();

    if (!user) return null;
    
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },
});

// Check if email exists - as query for real-time checking
export const checkEmailExists = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    try {
      const user = await ctx.db
        .query("users")
        .withIndex("by_email", (q) => q.eq("email", args.email))
        .first();
      
      return !!user;
    } catch (error) {
      console.error("Error checking email:", error);
      return false;
    }
  },
});

// Get all users (for debugging)
export const getAllUsers = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

// Check if username exists - as query for real-time checking
export const checkUsernameExists = query({
  args: { username: v.string() },
  handler: async (ctx, args) => {
    try {
      const user = await ctx.db
        .query("users")
        .withIndex("by_username", (q) => q.eq("username", args.username))
        .first();
      
      return !!user;
    } catch (error) {
      console.error("Error checking username:", error);
      return false;
    }
  },
});
