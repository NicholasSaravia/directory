"use client";

import { Family } from "@/types";
import { FamilyPhoto } from "../../components/FamilyPhoto";
import { getFamilies } from "@/utils/api/data";
import { searchString } from "@/utils/signals/data";
import { useSignals } from "@preact/signals-react/runtime";
import useSWR from "swr";

export const Families = () => {
  useSignals();
  const { data = [] } = useSWR("families", getFamilies);

  const searchFilter = (family: Family) => {
    if (searchString.value === "") return true;
    return family.name.toLowerCase().includes(searchString.value);
  };

  return (
    <section className="flex flex-wrap justify-evenly gap-6">
      {data &&
        data.filter(searchFilter).map((family) => {
          return (
            <div
              className="flex flex-col bg-white rounded-md w-full sm:max-w-[400px] gap-2 shadow-xl"
              key={family.id}
            >
              <section className="relative h-[300px] w-full bg-gray-200 rounded-t-md ">
                <FamilyPhoto
                  familyId={family.id}
                  photoUrl={family.photo_url ?? ""}
                />
              </section>
              <section className="px-2 pb-2">
                <h2 className="font-bold self-start text-2xl text-green-900">
                  {family.name}
                </h2>
              </section>
            </div>
          );
        })}
    </section>
  );
};
