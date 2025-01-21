"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export const SignOut = () => {
  const supabase = createClient();
  const router = useRouter();
  return (
    <button
      className="btn-primary whitespace-nowrap px-4"
      onClick={async () => {
        await supabase.auth.signOut();
        router.push("/");
      }}
    >
      Sign out
    </button>
  );
};
