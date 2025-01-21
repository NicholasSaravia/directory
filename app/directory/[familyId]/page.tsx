"use client";

import { FamilyPhoto } from "@/components/FamilyPhoto";
import { Upload } from "@/components/Upload";
import {
  InputWithLabel,
  SelectWithLabel,
} from "@/components/form/InputWithLabel";
import { FamilyRole } from "@/types";
import {
  insertMember,
  useGetFamily,
  useGetMembers,
  useGetSignedUrl,
  usePermissions,
} from "@/utils/api/data";
import { getMonthName } from "@/utils/date";
import { useSignal } from "@preact/signals-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { mutate } from "swr";
import { boolean, date, number, object, string } from "zod";

const Family = () => {
  const params = useParams<{ familyId: string }>();
  const familyId = params?.familyId ?? "";
  const { data: family, isLoading, isValidating } = useGetFamily(familyId);
  const { data: members } = useGetMembers(familyId);
  const photoPath = family?.photo_path || "";
  const { data: role } = usePermissions();
  const { data: photo, isLoading: loadingPhoto } = useGetSignedUrl(
    familyId,
    photoPath
  );
  const uploadingPhoto = useSignal(false);

  const formatPhoneNumber = (phoneNumber: string) => {
    // Remove all non-digit characters
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    // Check if we have exactly 10 digits
    return `(${cleaned.slice(0,3)}) ${cleaned.slice(3,6)}-${cleaned.slice(6)}`;
  };

  return (
    <div className="flex flex-col gap-4 max-w-6xl mx-auto">
      <Link href="/directory" className="uppercase text-green-900 font-bold">
        Back
      </Link>
      <h1 className="text-3xl font-bold text-center mb-4">{family?.name}</h1>
      <div className="w-full relative h-[300px] md:h-[600px] shadow-md rounded-2xl">
        <FamilyPhoto
          fetchingPhotos={loadingPhoto || isLoading}
          photoPath={family?.photo_path || ""}
          photos={
            photo
              ? [{ signedUrl: photo.signedUrl, error: null, path: photoPath }]
              : undefined
          }
          className="rounded-xl"
        />
        {role?.data?.role === "ADMIN" && (
          <section className="absolute bottom-2 right-2 mt-2 flex justify-end w-full">
            <Upload familyId={familyId} loadingSignal={uploadingPhoto} />
          </section>
        )}
      </div>

      {family?.description && (
        <p className="bg-white/40 rounded-xl p-2">{family?.description}</p>
      )}
      <div className="flex flex-col gap-2">
        {members &&
          members.map((member) => (
            <details
              open
              key={member.id}
              className="bg-white p-4 group flex flex-col bg-opacity-85 shadow-sm border rounded-xl"
            >
              <summary className="list-none text-xl font-bold">
                {member.name}
              </summary>
              <hr className="my-2 border-1 border-green-900" />
              {member.phone_number && (
                <div className="flex gap-1">
                  <span className="font-bold">Phone:</span>
                  <a
                    className="underline text-green-900"
                    href={`tel:${member.phone_number}`}
                  >
                    {formatPhoneNumber(member.phone_number)}
                  </a>
                </div>
              )}
              {member.email && (
                <div>
                  <span className="font-bold">Email:</span>{" "}
                  <a
                    className="underline text-green-900"
                    href={`mailto:${member.email}`}
                  >
                    {member.email}
                  </a>
                </div>
              )}
              {member.birthday && (
                <>
                  <div>
                    <span className="font-bold">Birthday:</span>{" "}
                    {`${getMonthName(new Date(member.birthday).getMonth())} ${
                      new Date(member.birthday).getDate() + 1
                    } ${
                      member.calculate_age === true
                        ? new Date(member.birthday).getFullYear()
                        : ""
                    }`}
                  </div>
                  {member.calculate_age && (
                    <div>
                      <span className="font-bold">Age:</span>{" "}
                      {new Date().getFullYear() -
                        new Date(member.birthday).getFullYear()}
                    </div>
                  )}
                </>
              )}
              {member.anniversary && (
                <div>
                  <span className="font-bold">Anniversary:</span>{" "}
                  {member.anniversary.toLocaleString()}{" "}
                </div>
              )}
            </details>
          ))}
      </div>

      {role?.data?.role === "ADMIN" && (
        <AddEditMemberForm familyId={familyId} />
      )}
    </div>
  );
};

export default Family;

const AddEditMemberForm = ({ familyId }: { familyId: string }) => {
  const crudMemberSchema = object({
    id: string().optional(),
    name: string().optional(),
    role: string().optional().default(FamilyRole.Child),
    family_id: string().optional(),
    anniversary: date().nullable().default(null),
    birthday: date().nullable().default(null),
    calculate_age: boolean().default(false),
    phone_number: string().nullable().default(null),
    email: string().nullable().default(null),
  });

  return (
    <section className="bg-white rounded-xl flex p-4 h-min">
      <form
        className="w-full flex gap-2 flex-col"
        action={async (formData) => {
          const form = Object.fromEntries(formData.entries());

          const member = crudMemberSchema.safeParse({
            ...form,
            anniversary:
              "anniversary" in form && form["anniversary"] !== ""
                ? new Date(`${form["anniversary"]}`)
                : null,
            birthday:
              "birthday" in form && form["birthday"] !== ""
                ? new Date(`${form["birthday"]}`)
                : null,
            calculate_age:
              "calculate_age" in form && form["calculate_age"] === "on",
            family_id: familyId,
          });

          if (!member.success) {
            console.log(member.error);
            return;
          }
          console.log(member.data);
          await insertMember(member.data);

          mutate(`/members-${familyId}`);
        }}
      >
        <InputWithLabel label="Name" />
        <InputWithLabel label="Email" />
        <InputWithLabel label="Phone" name="phone_number" />
        <InputWithLabel label="Anniversary" type="date" />
        <InputWithLabel label="Birthday" type="date" />
        <SelectWithLabel
          label="Role"
          options={[
            {
              value: FamilyRole.Child,
              label: "Child",
            },
            {
              value: FamilyRole.Head_of_Household,
              label: "Head of Household",
            },
            {
              value: FamilyRole.Spouse,
              label: "Spouse",
            },
          ]}
        />
        <InputWithLabel type="checkbox" label="Calculate Age" />

        <button type="submit" className="btn-primary w-full mt-2">
          Add Family Member
        </button>
      </form>
    </section>
  );
};
