"use client";
import { Upload } from "@/app/components/Upload";
import { getAllFilesFromBucket, getSignedUrl } from "@/utils/api/data";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import useSWR from "swr";
import { Spinner } from "./icons/Spinner";

interface FamilyPhotoProps {
  familyId: string;
  photoUrl: string;
}

export const FamilyPhoto = ({ familyId, photoUrl }: FamilyPhotoProps) => {
  const { data: files, isLoading: fileLoading } = useSWR(
    `files-${familyId}`,
    () => getAllFilesFromBucket(familyId)
  );
  const noFiles = files === undefined || files?.length === 0;

  const { data, isLoading: signedUrlLoading } = useSWR(
    noFiles ? null : `signed-url-${familyId}/${photoUrl}`,
    () => getSignedUrl(familyId, photoUrl)
  );

  if (fileLoading || signedUrlLoading)
    return (
      <div className="flex items-center justify-center h-full w-full">
        <Spinner className="w-32" />
      </div>
    );

  if (noFiles || data?.signedUrl == null) return <Upload familyId={familyId} />;

  return (
    <Image
      fill
      className="object-cover w-full h-full object-center rounded-t-md"
      src={data.signedUrl}
      placeholder="blur"
      blurDataURL="/placeholder-image.webp"
      alt="family photo"
    />
  );
};
