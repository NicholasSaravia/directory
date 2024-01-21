"use client";
import Image from "next/image";
import { Spinner } from "./icons/Spinner";
import { SignedPhoto } from "@/types";

interface FamilyPhotoProps {
  photoPath: string;
  photos: SignedPhoto[] | undefined;
  fetchingPhotos: boolean;
  className?: string;
}

export const FamilyPhoto = ({
  photoPath,
  photos,
  fetchingPhotos,
  className,
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

  console.log({ photo });

  return (
    <Image
      fill
      className={`object-cover w-full h-full object-center ${className}`}
      src={!photo ? "/placeholder-image.webp" : photo.signedUrl}
      placeholder="blur"
      blurDataURL="/placeholder-image.webp"
      alt="family photo"
    />
  );
};
