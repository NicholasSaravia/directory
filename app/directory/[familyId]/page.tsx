"use client";

import { FamilyPhoto } from "@/app/components/FamilyPhoto";
import { Upload } from "@/app/components/Upload";
import {
  useGetFamily,
  useGetSignedUrl,
  usePermissions,
} from "@/utils/api/data";
import { useSignal } from "@preact/signals-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const Family = () => {
  const { familyId } = useParams<{ familyId: string }>();
  const { data: family, isLoading, isValidating } = useGetFamily(familyId);
  const photoPath = family?.photo_path || "";
  const { data: role } = usePermissions();
  const { data: photo } = useGetSignedUrl(familyId, photoPath);
  const uploadingPhoto = useSignal(false);

  return (
    <div className="max-w-6xl mx-auto">
      <Link href="/directory" className="uppercase text-green-900 font-bold">
        Back
      </Link>
      <h1 className="text-3xl font-bold text-center mb-4">{family?.name}</h1>
      <div className="w-full relative h-[300px] md:h-[600px] shadow-md rounded-2xl">
        <FamilyPhoto
          fetchingPhotos={isLoading || uploadingPhoto.value}
          photoPath={family?.photo_path || ""}
          photos={
            photo
              ? [{ signedUrl: photo.signedUrl, error: null, path: photoPath }]
              : undefined
          }
          className="rounded-xl"
        />
      </div>
      {role?.data?.userrole === "ADMIN" && (
        <section className="mt-2 flex justify-end w-full">
          <Upload familyId={familyId} loadingSignal={uploadingPhoto} />
        </section>
      )}

      <p>{family?.description}</p>
    </div>
  );
};

export default Family;
