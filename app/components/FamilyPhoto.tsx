"use client";
import { Upload } from "@/app/components/Upload";
import { getAllFilesFromBucket, getSignedUrl } from "@/utils/api/data";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import useSWR from "swr";
import { Spinner } from "./icons/Spinner";
import { SignedPhoto } from "@/types";

interface FamilyPhotoProps {
  familyId: string;
  photoPath: string;
  photos: SignedPhoto[] | undefined;
  fetchingPhotos: boolean;
}

export const FamilyPhoto = ({
  photoPath,
  photos,
  familyId,
  fetchingPhotos,
}: FamilyPhotoProps) => {
  if (fetchingPhotos)
    return (
      <div className="flex items-center justify-center h-full w-full">
        <Spinner className="w-32" />
      </div>
    );

  const photo = photos
    ? photos.find((photo) => photo.path === photoPath)
    : undefined;

  if (!photo) return <Upload familyId={familyId} />;

  return (
    <Image
      fill
      className="object-cover w-full h-full object-center rounded-t-md"
      src={photo.signedUrl}
      placeholder="blur"
      blurDataURL="/placeholder-image.webp"
      alt="family photo"
    />
  );
};
