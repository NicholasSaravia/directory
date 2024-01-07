"use server";

import { supabase } from "@/lib/supabase-config";
import { AuthError } from "@supabase/supabase-js";

export async function signIn(
  email: string,
  secretCode: string,
  redirectUrl: string
) {
  if (secretCode !== process.env.AUTH_SECRET_CODE)
    return {
      error: JSON.stringify(new AuthError("Invalid secret code")),
      data: {
        user: null,
        session: null,
      },
    };

  return await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: redirectUrl,
    },
  });
}
