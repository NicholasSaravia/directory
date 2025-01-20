import { Search } from "../components/Search";
import { Month } from "../components/Month";
import { Families } from "../components/Families";
import { SignOut } from "../components/SignOut";
import { Family } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";


export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: families } = await supabase.from("family").select<"*",Family>("*");
  return (
    <div className="flex flex-col gap-8">
      <nav className="flex justify-between items-center">
        <h1 className="text-3xl font-bold capitalize text-black">
          FBC DIRECTORY
        </h1>
        <SignOut />
      </nav>

      <Search />
      <Month />
      <Families families={families} />
    </div>
  );
}


