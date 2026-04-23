import { createClient } from "@supabase/supabase-js";

// Client-side instance: uses the public anon key ONLY.
// NEVER put the SERVICE_ROLE_KEY here — it would be exposed in the browser bundle.
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
