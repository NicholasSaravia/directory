import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  let { data: families, error } = await supabase.from("Family").select("*");

  return (
    <div>
      {families?.map((family) => (
        <div key={family.id}>{family.name}</div>
      ))}
    </div>
  );
}
