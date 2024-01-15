import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  let { data: Family, error } = await supabase.from("Family").select("*");
  let user = await supabase.auth.getSession();

  console.log({ user });
  return (
    <div>
      {Family?.map((family) => (
        <div key={family.id}>{family.name}</div>
      ))}
    </div>
  );
}
