import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, username } = await request.json();

    // Validate required fields
    if (!email || !password || !name || !username) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long" },
        { status: 400 }
      );
    }

    // Validate username format
    if (!/^[a-zA-Z0-9_.]+$/.test(username)) {
      return NextResponse.json(
        { error: "Username can only contain letters, numbers, underscores, and dots" },
        { status: 400 }
      );
    }

    // Validate username length
    if (username.length < 3 || username.length > 30) {
      return NextResponse.json(
        { error: "Username must be between 3 and 30 characters" },
        { status: 400 }
      );
    }

    const db = await getDatabase();

    // Check if email already exists
    const existingEmail = await db.collection("users").findOne({ email });
    if (existingEmail) {
      return NextResponse.json(
        { error: "Email is already registered" },
        { status: 400 }
      );
    }

    // Check if username already exists
    const existingUsername = await db.collection("users").findOne({ 
      $or: [
        { username: username.toLowerCase() },
        { displayUsername: username }
      ]
    });
    if (existingUsername) {
      return NextResponse.json(
        { error: "Username is already taken" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = {
      email,
      password: hashedPassword,
      name,
      username: username.toLowerCase(),
      displayUsername: username,
      isActive: true,
      portfolioData: {
        about: {},
        projects: [],
        skills: []
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection("users").insertOne(user);

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      message: "Registration successful",
      user: {
        ...userWithoutPassword,
        _id: result.insertedId.toString(),
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
