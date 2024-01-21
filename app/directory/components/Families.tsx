"use client";

import { Family } from "@/types";
import { FamilyPhoto } from "../../components/FamilyPhoto";
import { getAllPhotos, getFamilies } from "@/utils/api/data";
import { searchString } from "@/utils/signals/data";
import { useSignals } from "@preact/signals-react/runtime";
import useSWR from "swr";
import { useEffect, useState } from "react";
import Link from "next/link";

export const Families = () => {
  useSignals();
  const [shouldFetchPhotos, setShouldFetchPhotos] = useState(false);
  const { data: families } = useSWR("families", getFamilies);
  const { data: photos, isLoading: fetchingPhotos } = useSWR(
    shouldFetchPhotos ? "photos" : null,
    () => getAllPhotos(families ?? [])
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
                  familyId={family.id}
                  photoPath={`${family.id}/${family.photo_url}`}
                  photos={photos}
                />
              </section>
              <section className="px-2 pb-2">
                <h2 className="font-bold self-start text-2xl text-green-900">
                  {family.name}
                </h2>
              </section>
            </Link>
          );
        })}
    </section>
  );
};
