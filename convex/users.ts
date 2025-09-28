import { mutation, query, action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

// Register a new user
export const register = action({
  args: {
    name: v.string(),
    email: v.string(),
    username: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args): Promise<string> => {
    // Check if user already exists
    const existingUser = await ctx.runQuery(api.users.checkEmailExists, { email: args.email });
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const existingUsername = await ctx.runQuery(api.users.checkUsernameExists, { username: args.username });
    if (existingUsername) {
      throw new Error("Username already taken");
    }

    // Hash the password using the password action
    const hashedPassword: string = await ctx.runAction(api.password.hashPassword, { password: args.password });

    // Insert user with hashed password
    const userId: string = await ctx.runMutation(api.users.insertUser, {
      name: args.name,
      email: args.email,
      username: args.username,
      password: hashedPassword,
    });

    return userId;
  },
});

// Internal mutation to insert user (called by register action)
export const insertUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    username: v.string(),
    password: v.string(), // This will be the hashed password
  },
  handler: async (ctx, args) => {
    const userId = await ctx.db.insert("users", {
      name: args.name,
      email: args.email,
      username: args.username,
      password: args.password, // Store hashed password
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
export const login = action({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args): Promise<any> => {
    try {
      // Validate input
      if (!args.email || !args.password) {
        throw new Error("Email and password are required");
      }

      // Get user by email
      const user: any = await ctx.runQuery(api.users.getUserByEmail, { email: args.email });

      if (!user) {
        // For debugging: log that email was not found
        console.log(`Login attempt failed: Email '${args.email}' not found in database`);
        throw new Error("Invalid email or password");
      }

      // Verify password using the password action
      const isPasswordValid: boolean = await ctx.runAction(api.password.verifyPassword, {
        password: args.password,
        hash: user.password,
      });

      if (!isPasswordValid) {
        // For debugging: log that password was incorrect
        console.log(`Login attempt failed: Incorrect password for email '${args.email}'`);
        throw new Error("Invalid email or password");
      }

      // Return minimal session data (no sensitive information)
      const sessionData = {
        userId: user._id,
        username: user.username,
        name: user.name,
        // Exclude email, createdAt, updatedAt, and portfolioData for security
      };
      console.log(`Login successful for user: ${user.email}`);
      return sessionData;
    } catch (error) {
      // Log the error for debugging
      console.error("Login error:", error);
      
      // Re-throw with a more user-friendly message
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unexpected error occurred during login");
      }
    }
  },
});

// Internal query to get user by email (including password for login verification)
export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    return user; // Return user with password for login verification
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

// Update user information
export const updateUser = mutation({
  args: {
    userId: v.id("users"),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    username: v.optional(v.string()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { userId, ...updates } = args;
    
    // Remove undefined values
    const cleanUpdates = Object.fromEntries(
      Object.entries(updates).filter(([_, value]) => value !== undefined)
    );

    // Check if username is being changed and if it's available
    if (updates.username) {
      const username = updates.username;
      const existingUser = await ctx.db
        .query("users")
        .withIndex("by_username", (q) => q.eq("username", username))
        .first();

      if (existingUser && existingUser._id !== userId) {
        throw new Error("Username already taken");
      }
    }

    // Check if email is being changed and if it's available
    if (updates.email) {
      const email = updates.email;
      const existingUser = await ctx.db
        .query("users")
        .withIndex("by_email", (q) => q.eq("email", email))
        .first();

      if (existingUser && existingUser._id !== userId) {
        throw new Error("Email already taken");
      }
    }

    await ctx.db.patch(userId, {
      ...cleanUpdates,
      updatedAt: Date.now(),
    });

    // Return updated user
    const updatedUser = await ctx.db.get(userId);
    if (!updatedUser) throw new Error("User not found");
    
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  },
});

// Change password
export const changePassword = action({
  args: {
    userId: v.id("users"),
    oldPassword: v.string(),
    newPassword: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      // Validate input
      if (!args.oldPassword || !args.newPassword) {
        throw new Error("Old password and new password are required");
      }

      // Get user with password for verification
      const user = await ctx.runQuery(api.users.getUserWithPassword, { userId: args.userId });
      if (!user) {
        console.log(`Password change failed: User ${args.userId} not found`);
        throw new Error("User not found");
      }

      // Verify old password
      const isOldPasswordValid = await ctx.runAction(api.password.verifyPassword, {
        password: args.oldPassword,
        hash: user.password,
      });

      if (!isOldPasswordValid) {
        console.log(`Password change failed: Incorrect password for user ${user.email}`);
        throw new Error("Current password is incorrect");
      }

      // Hash the new password
      const hashedNewPassword = await ctx.runAction(api.password.hashPassword, { password: args.newPassword });

      // Update password with hash
      await ctx.runMutation(api.users.updateUserPassword, {
        userId: args.userId,
        password: hashedNewPassword,
      });

      console.log(`Password changed successfully for user: ${user.email}`);
      return { success: true };
    } catch (error) {
      console.error("Change password error:", error);
      
      // Re-throw with a more user-friendly message
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unexpected error occurred while changing password");
      }
    }
  },
});

// Internal query to get user with password (for password change verification)
export const getUserWithPassword = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    return user; // Return user with password for verification
  },
});

// Internal mutation to update user password
export const updateUserPassword = mutation({
  args: {
    userId: v.id("users"),
    password: v.string(), // This will be the hashed password
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, {
      password: args.password,
      updatedAt: Date.now(),
    });
  },
});

// Get all users (for debugging)
export const getAllUsers = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

// Debug function to check user by email (for debugging login issues)
export const debugUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
    
    if (!user) {
      return { 
        found: false, 
        message: "User not found - this email is not registered",
        suggestion: "Try registering a new account with this email"
      };
    }
    
    // Return user info without password for debugging
    const { password, ...userInfo } = user;
    return { 
      found: true, 
      message: "User found - email is registered",
      user: userInfo,
      hasPassword: !!password,
      passwordLength: password?.length || 0,
      suggestion: password ? "User has password set - check if password is correct" : "User has no password - this is an error"
    };
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
