import { Upload } from "@/app/components/Upload";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Image from "next/image";

interface FamilyPhotoProps {
  familyId: string;
  photoUrl: string;
}

export const FamilyPhoto = async ({ familyId, photoUrl }: FamilyPhotoProps) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const bucket = "family-photos";
  const { data: files } = await supabase.storage
    .from(bucket)
    .list(`${familyId}`);

  if (!files || files.length === 0) return <Upload familyId={familyId} />;
  const { data } = await supabase.storage
    .from(bucket)
    .createSignedUrl(`${familyId}/${photoUrl}`, 60 * 60);

  return (
    <Image
      fill
      className="object-cover w-full h-full object-center rounded-t-md"
      src={data?.signedUrl ?? ""}
      alt="family photo"
    />
  );
};
