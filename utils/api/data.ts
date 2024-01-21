import useSWR from "swr";
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

export const usePhotos = (shouldFetchPhotos: boolean, families: Family[]) => {
  return useSWR(
    shouldFetchPhotos ? "/photos" : null,
    () => getAllPhotos(families),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
    }
  );
};
const getAllPhotos = async (families: Family[]) => {
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

export const useGetFamilies = () => {
  return useSWR("/families", getFamilies, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0,
  });
};
const getFamilies = async () => {
  const { data, error } = await supabase
    .from("families")
    .select<"*", Family>("*")
    .order("name");

  if (error) throw error;
  return data;
};

export const getFamily = async (id: string) => {
  const { data, error } = await supabase
    .from("families")
    .select<"*", Family>("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

export const getUser = async () => {
  const { data, error } = await supabase.auth.getUser();

  if (error) throw error;
  return data;
};

export const getUserPermissions = async () => {
  try {
    const data = await getUser();
    const { data: role, error } = await supabase
      .from("roles")
      .select("*")
      .eq("user_id", data.user.id)
      .single();

    if (error) throw error;
    return role;
  } catch (error) {
    throw error;
  }
};

export const usePermissions = () => {
  return useSWR("permissions", getUserPermissions);
};
