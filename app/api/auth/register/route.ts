import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase using the keys you added to Vercel
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Uses your secret key for server-side
);

export async function POST(req: Request) {
  try {
    const { email, password, full_name } = await req.json();

    // 1. Register the user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (authError) throw authError;

    // 2. Add the user details to your 'users' table
    const { error: dbError } = await supabase
      .from('users')
      .insert([{ id: authData.user?.id, email, full_name }]);

    if (dbError) throw dbError;

    return NextResponse.json({ message: "User registered successfully!" }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
