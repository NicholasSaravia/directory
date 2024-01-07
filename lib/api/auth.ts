import { supabase } from "../supabase-config";

export async function signInWithEmail(email: string) {
  const redirectUrl = new URL("/directory", window.location.href).href;
  console.log(email);

  return await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: redirectUrl,
    },
  });
}
