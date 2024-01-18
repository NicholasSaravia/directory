import { Family } from "@/types";
import { FamilyPhoto } from "../../components/FamilyPhoto";

export const Families = ({ families }: { families: Family[] | null }) => {
  return (
    <section className="flex flex-wrap justify-evenly gap-6">
      {families?.map((family) => (
        <button
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
        </button>
      ))}
    </section>
  );
};
