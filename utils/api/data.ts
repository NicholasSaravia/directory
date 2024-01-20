import { createClient } from "../supabase/client";
import { Family } from "@/types";

const BUCKET = "family-photos";
const supabase = createClient();

export const getAllFilesFromBucket = async (familyId: string) => {
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .list(`${familyId}`);

  if (error) throw error;
  return data;
};

export const getSignedUrl = async (familyId: string, photoUrl: string) => {
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(`${familyId}/${photoUrl}`, 60 * 60 * 24);

  if (error) throw error;
  return data;
};

export const getFamilies = async () => {
  const { data, error } = await supabase
    .from("Family")
    .select<"*", Family>("*")
    .order("name");

  if (error) throw error;
  return data;
};
