import useSWR from "swr";
import { createClient } from "../supabase/client";
import { Family, Member, Role } from "@/types";

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
  const photPaths = families.reduce((prev: string[], current: Family) => {
    if (current.photo_path !== null) {
      prev.push(current.photo_path);
    }
    return prev;
  }, []);

  if (photPaths.length === 0) return [];

  const { data: photos, error: photoError } = await supabase.storage
    .from(BUCKET)
    .createSignedUrls(photPaths, 60 * 60 * 24);

  if (photoError) throw photoError;

  return photos;
};

export const useGetSignedUrl = (familyId: string, photoPath: string) => {
  return useSWR(`/signed-url-${familyId}-${photoPath}`, () =>
    getSignedUrl(photoPath)
  );
};

export const getSignedUrl = async (photoPath: string) => {
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(photoPath, 60 * 60 * 24);

  if (error) throw error;
  return data;
};

export const useGetFamilies = () => {
  return useSWR("/family", getFamilies, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0,
  });
};

const getFamilies = async () => {
  let { data, error } = await supabase
    .from("family")
    .select<"*", Family>("*")
    .order("name");

  if (error) throw error;
  return data;
};

export const useGetFamily = (id: string) => {
  return useSWR(id ? `/family-${id}` : null, () => getFamily(id), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0,
  });
};

const getFamily = async (id: string) => {
  const { data, error } = await supabase
    .from("family")
    .select<"*", Family>("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

export const useGetMembers = (familyId: string) => {
  return useSWR(`/members-${familyId}`, () => getMembers(familyId));
};

const getMembers = async (familyId: string) => {
  const { data, error } = await supabase
    .from("member")
    .select<"*", Member>("*")
    .eq("family_id", familyId);

  if (error) throw error;
  return data;
};

export const insertMember = async (member: any) => {
  const { data, error } = await supabase.from("member").insert(member);

  if (error) {
    console.log(error);
    return;
  }
  return data;
};

export const getMembersByBirthdayOrAnniversary = async (
  currentMonth: number
) => {
  let { data: member, error } = await supabase.from("member").select(`
    *,
    family (name)
    `);

  if (error) {
    console.log(error);
    return [];
  }

  // filter by anniversary and birthday regardless of year
  const members = member?.filter((member: Member) => {
    if (!member?.birthday && !member?.anniversary) return false;

    // first check birthday
    if (member?.birthday) {
      const birthday = new Date(member?.birthday).getMonth() + 1;
      if (birthday === currentMonth) return true;
    }

    // then check anniversary
    if (member?.anniversary) {
      const anniversary = new Date(member?.anniversary).getMonth() + 1;
      if (anniversary === currentMonth) return true;
    }

    return false;
  });
  return members;
};

export const getUserPermissions = async () => {
  const { data, error } = await supabase.auth.getUser();

  if (error) throw error;

  console.log(data.user.id);

  return await supabase
    .from("role")
    .select<"*", Role>("*")
    .eq("user_id", data.user.id)
    .single();
};

export const usePermissions = () => {
  return useSWR("/permissions", getUserPermissions);
};
