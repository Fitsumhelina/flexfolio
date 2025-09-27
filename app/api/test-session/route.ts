import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    console.log('Test session API called')
    console.log('All cookies:', request.cookies.getAll())
    
    const token = request.cookies.get('auth-token')?.value
    console.log('Auth token:', token ? 'exists' : 'missing')
    
    return NextResponse.json({
      message: "Test session API working",
      hasToken: !!token,
      cookies: request.cookies.getAll()
    })
  } catch (error) {
    console.error("Test session error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
