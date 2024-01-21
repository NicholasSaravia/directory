"use client";

import { FamilyPhoto } from "@/app/components/FamilyPhoto";
import { Upload } from "@/app/components/Upload";
import { useGetFamilies, usePermissions, usePhotos } from "@/utils/api/data";
import { useParams } from "next/navigation";

const Family = () => {
  const { familyId } = useParams<{ familyId: string }>();
  const { data: families } = useGetFamilies();
  const { data: roles } = usePermissions();
  const { data: photos, isLoading } = usePhotos(
    families ? true : false,
    families ?? []
  );
  const family = families?.find((family) => family.id === familyId);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="w-full relative h-[600px]">
        <FamilyPhoto
          fetchingPhotos={isLoading}
          photoPath={`${familyId}/${family?.photo_url}`}
          photos={photos}
          className="rounded-xl"
        />
      </div>
      {roles && roles.userrole === "ADMIN" && (
        <section className="mt-2 flex justify-end w-full">
          <Upload familyId={familyId} />
        </section>
      )}

      <p>{family?.description}</p>
    </div>
  );
};

export default Family;
