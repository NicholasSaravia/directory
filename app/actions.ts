"use server";

import { createClient } from "@/utils/supabase/server";
import { AuthError, AuthOtpResponse } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export async function signInHandler(
  email: string,
  secretCode: string,
  redirectUrl: string
) {
  "use server";

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  if (secretCode !== process.env.AUTH_SECRET_CODE)
    return {
      error: JSON.stringify(new AuthError("Invalid secret code")),
      data: {
        user: null,
        session: null,
      },
    } as unknown as AuthOtpResponse;

  return await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: redirectUrl,
    },
  });
}
