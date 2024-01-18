import { createClient } from "@/utils/supabase/server";
import { SignInForm } from "./components/SignInForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data } = await supabase.auth.getSession();
  if (data.session) redirect("/directory");

  return (
    <main className="layout flex flex-col h-full justify-center items-center">
      <SignInForm />
    </main>
  );
}
