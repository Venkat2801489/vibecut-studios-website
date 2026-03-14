import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const SESSION_COOKIE = 'vc_admin_session';

export async function POST(req: Request) {
  const { username, password } = await req.json();
  const validUser = process.env.ADMIN_USERNAME || 'admin';
  const validPass = process.env.ADMIN_PASSWORD || 'vibecut2024';

  if (username === validUser && password === validPass) {
    const response = NextResponse.json({ success: true });
    response.cookies.set(SESSION_COOKIE, 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });
    return response;
  }
  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(SESSION_COOKIE, '', { maxAge: 0, path: '/' });
  return response;
}

export async function GET() {
  const cookieStore = cookies();
  const session = cookieStore.get(SESSION_COOKIE);
  return NextResponse.json({ authenticated: session?.value === 'authenticated' });
}
