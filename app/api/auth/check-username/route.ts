import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    const { username } = await request.json();

    // Validate required fields
    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    // Validate username format
    if (!/^[a-zA-Z0-9_.]+$/.test(username)) {
      return NextResponse.json(
        { available: false, error: "Username can only contain letters, numbers, underscores, and dots" },
        { status: 200 }
      );
    }

    // Check minimum length
    if (username.length < 3) {
      return NextResponse.json(
        { available: false, error: "Username must be at least 3 characters long" },
        { status: 200 }
      );
    }

    // Check maximum length
    if (username.length > 30) {
      return NextResponse.json(
        { available: false, error: "Username must be at most 30 characters long" },
        { status: 200 }
      );
    }

    const db = await getDatabase();

    // Check if username is already taken
    const existingUser = await db.collection("users").findOne({ 
      $or: [
        { username: username.toLowerCase() },
        { displayUsername: username }
      ]
    });

    if (existingUser) {
      return NextResponse.json(
        { available: false, error: "Username is already taken" },
        { status: 200 }
      );
    }

    return NextResponse.json({
      available: true,
      message: "Username is available"
    });
  } catch (error) {
    console.error("Username check error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
