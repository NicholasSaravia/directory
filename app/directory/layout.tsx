"use client";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import useSWR from "swr";
import { Spinner } from "../components/icons/Spinner";

export default function Layout({ children }: PropsWithChildren) {
  const supabase = createClient();
  const { data, isLoading, error } = useSWR(
    "session",
    async () => await supabase.auth.getSession()
  );

  if (isLoading) {
    return (
      <div className="p-4 flex justify-center items-center h-full w-full">
        <Spinner className="h-60" />
      </div>
    );
  }

  if (!data || data?.data === null || error) {
    redirect("/");
  }

  return <div className="p-4 layout">{children}</div>;
}
