import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";

export interface User {
  _id?: string;
  id: string;
  name: string;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  portfolioData?: {
    about?: any;
    projects?: any[];
    skills?: any[];
  };
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, username, password } = await request.json();

    // Validate required fields
    if (!name || !email || !username || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate username format
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return NextResponse.json(
        {
          error: "Username can only contain letters, numbers, and underscores",
        },
        { status: 400 }
      );
    }

    if (username.length < 3) {
      return NextResponse.json(
        { error: "Username must be at least 3 characters" },
        { status: 400 }
      );
    }

    const db = await getDatabase();

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return NextResponse.json(
          { error: "Email already exists" },
          { status: 400 }
        );
      }
      if (existingUser.username === username) {
        return NextResponse.json(
          { error: "Username already exists" },
          { status: 400 }
        );
      }
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser: User = {
      id: new ObjectId().toString(),
      name,
      email,
      username,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      portfolioData: {
        about: {
          name,
          title: "Full Stack Developer",
          bio: "I'm a passionate developer who loves creating amazing digital experiences.",
          experience: "1+",
          projectsCompleted: "5+",
          email,
          phone: "",
          location: "",
          profileImage: "",
        },
        projects: [],
        skills: [],
      },
    };

    // Store hashed password
    const userWithPassword = {
      ...newUser,
      password: hashedPassword, // Store hashed password
    };

    const result = await db.collection("users").insertOne(userWithPassword);

    // Return user without password
    const { password: _, ...userWithoutPassword } = userWithPassword;

    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          ...userWithoutPassword,
          _id: result.insertedId.toString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
