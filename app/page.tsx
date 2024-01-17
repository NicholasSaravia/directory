import { createClient } from "@/utils/supabase/server";
import { AuthError, AuthOtpResponse } from "@supabase/supabase-js";
import { SignInForm } from "./components/SignInForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.getSession();
  if (error === null) redirect("/directory");

  const signInHandler = async (
    email: string,
    secretCode: string,
    redirectUrl: string
  ): Promise<AuthOtpResponse> => {
    "use server";
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
  };

  return (
    <main className="flex flex-col h-full justify-center items-center">
      <SignInForm signInHandler={signInHandler} />
    </main>
  );
}
