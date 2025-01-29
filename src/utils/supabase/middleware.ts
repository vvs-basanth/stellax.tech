import { type CookieOptions, createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';

// Function to update the session
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next();

  const supabase = createServerClient(
    'https://fanjxyagrnrbqqkgvxwx.supabase.co', // Supabase URL
    'eyJhbGci0iJIUzI1NiIsInR5cCIkpXVCJ9.eyJpc3Mi0iJzdXBh', // Supabase Anon Key
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set(name, value, options);
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set(name, '', { ...options, maxAge: 0 });
        },
      },
    },
  );

  await supabase.auth.getUser();

  return response;
}

// Export the middleware function
export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

// Middleware configuration to specify routes to protect
export const config = {
  matcher: ['/path/to/protect'], // Define the routes where you want to apply the middleware
};