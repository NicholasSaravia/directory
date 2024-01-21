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

export const getAllPhotos = async (families: Family[]) => {
  const { data: files, error } = await supabase.storage.from(BUCKET).list();
  if (error) throw error;

  const photPaths = files.map((file) => {
    const family = families.find((family) => family.id == file.name);
    return `${file.name}/${family?.photo_url}`;
  });

  const { data: photos, error: photoError } = await supabase.storage
    .from(BUCKET)
    .createSignedUrls(photPaths, 60 * 60 * 24);

  if (photoError) throw photoError;

  return photos;
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

export const getFamily = async (id: string) => {
  const { data, error } = await supabase
    .from("Family")
    .select<"*", Family>("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};
