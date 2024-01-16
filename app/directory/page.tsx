import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Search } from "./components/Search";
import { Month } from "./components/Month";
import { Families } from "./components/Families";

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  let { data: families } = await supabase.from("Family").select("*");

  return (
    <div className="flex flex-col gap-8">
      <Search />
      <Month />
      <Families families={families} />
    </div>
  );
}
