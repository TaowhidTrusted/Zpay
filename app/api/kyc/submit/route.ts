import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    // In the future, this is where you'll save the image URL to your database
    return NextResponse.json({ message: "KYC document received" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "KYC submission failed" }, { status: 500 });
  }
}
