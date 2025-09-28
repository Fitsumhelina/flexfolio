import { action } from "./_generated/server";
import { v } from "convex/values";
import bcrypt from "bcryptjs";

// Hash a password
export const hashPassword = action({
  args: { password: v.string() },
  handler: async (ctx, args) => {
    try {
      // Generate a salt and hash the password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(args.password, saltRounds);
      return hashedPassword;
    } catch (error) {
      console.error("Error hashing password:", error);
      throw new Error("Failed to hash password");
    }
  },
});

// Verify a password against a hash
export const verifyPassword = action({
  args: { 
    password: v.string(),
    hash: v.string()
  },
  handler: async (ctx, args) => {
    try {
      const isValid = await bcrypt.compare(args.password, args.hash);
      return isValid;
    } catch (error) {
      console.error("Error verifying password:", error);
      throw new Error("Failed to verify password");
    }
  },
});
