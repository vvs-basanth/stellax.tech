import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    'https://fanjxyagrnrbqqkgvxwx.supabase.co', // Supabase URL
    'eyJhbGci0iJIUzI1NiIsInR5cCIkpXVCJ9.eyJpc3Mi0iJzdXBh' // Supabase Anon Key
  );
}