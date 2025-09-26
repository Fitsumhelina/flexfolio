import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export async function GET(request: NextRequest) {
  try {
    console.log('Session API called')
    console.log('All cookies:', request.cookies.getAll())

    // Try to get user data from cookie first (simpler approach)
    const userDataCookie = request.cookies.get('user-data')?.value
    if (userDataCookie) {
      try {
        const userData = JSON.parse(userDataCookie)
        console.log('User data found in cookie:', userData.email)
        return NextResponse.json({
          user: userData,
        });
      } catch (parseError) {
        console.log('Failed to parse user data cookie:', parseError)
      }
    }

    // Fallback to JWT token approach
    const token = request.cookies.get('auth-token')?.value
    console.log('Token:', token ? 'exists' : 'missing')

    if (!token) {
      console.log('No token found, returning null user')
      return NextResponse.json(
        { user: null },
        { status: 200 }
      );
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any
      console.log('Token decoded successfully:', decoded)
      const db = await getDatabase()

      // Find user by ID
      const user = await db.collection("users").findOne({ _id: new ObjectId(decoded.userId) })
      console.log('User found:', user ? 'yes' : 'no')

      if (!user) {
        console.log('User not found in database')
        return NextResponse.json(
          { user: null },
          { status: 200 }
        );
      }

      // Return user without password
      const { password: _, ...userWithoutPassword } = user;
      console.log('Returning user session')

      return NextResponse.json({
        user: {
          ...userWithoutPassword,
          _id: user._id.toString(),
        },
      });
    } catch (jwtError) {
      console.log('JWT verification failed:', jwtError)
      return NextResponse.json(
        { user: null },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Session check error:", error);
    return NextResponse.json(
      { user: null },
      { status: 200 }
    );
  }
}
