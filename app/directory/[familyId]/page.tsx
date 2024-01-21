"use client";

import { FamilyPhoto } from "@/app/components/FamilyPhoto";
import { Upload } from "@/app/components/Upload";
import { useGetFamilies, usePermissions, usePhotos } from "@/utils/api/data";
import Link from "next/link";
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
      <Link href="/directory" className="uppercase text-green-900 font-bold">
        Back
      </Link>
      <h1 className="text-3xl font-bold text-center mb-4">{family?.name}</h1>
      <div className="w-full relative h-[300px] md:h-[600px] shadow-sm rounded-2xl">
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
