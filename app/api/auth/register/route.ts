import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // 1. Parse the incoming data from the app/web
    const body = await req.json();
    const { email, password } = body;

    // 2. Logic: Connect to your database here (Supabase/Firebase)
    // Example: await db.users.create({ data: { email, password } });

    // 3. Return a success response
    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
    
  } catch (error) {
    // 4. Return an error response if something fails
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
