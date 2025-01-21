"use client";

import { Family } from "@/types";
import { FamilyPhoto } from "./FamilyPhoto";
import { usePhotos } from "@/utils/api/data";
import { searchString } from "@/utils/signals/data";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSignals } from "@preact/signals-react/runtime";

export const Families = ({ families }: { families: Family[] | null }) => {
  useSignals();
  const [shouldFetchPhotos, setShouldFetchPhotos] = useState(false);
  const { data: photos, isLoading: fetchingPhotos } = usePhotos(
    shouldFetchPhotos,
    families ?? []
  );

  const searchFilter = (family: Family) => {
    if (searchString.value === "") return true;
    return family.name.toLowerCase().includes(searchString.value);
  };

  useEffect(() => {
    if (families && families.length > 0) {
      setShouldFetchPhotos(true);
    }
  }, [families]);

  return (
    <section className="flex flex-wrap justify-evenly gap-6">
      {families &&
        families.filter(searchFilter).map((family) => {
          return (
            <Link
              className="flex flex-col bg-white rounded-md w-full sm:max-w-[400px] gap-2 shadow-xl"
              key={family.id}
              href={`/directory/${family.id}`}
            >
              <section className="relative h-[300px] w-full bg-gray-200 rounded-t-md ">
                <FamilyPhoto
                  fetchingPhotos={!shouldFetchPhotos || fetchingPhotos}
                  photoPath={family.photo_path}
                  photos={photos}
                  className="rounded-t-md"
                />
              </section>
              <section className="flex px-2 pb-2">
                <h2 className="font-bold self-start flex-1 text-2xl text-green-900">
                  {family.name}
                </h2>
              </section>
            </Link>
          );
        })}
    </section>
  );
};
