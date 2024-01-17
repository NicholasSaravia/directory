"use client";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useRef } from "react";

interface UploadProps {
  familyId: string;
}
export const Upload = ({ familyId }: UploadProps) => {
  const supabase = createClient();
  const { refresh } = useRouter();
  const uploadRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        ref={uploadRef}
        className="hidden"
        type="file"
        onChange={async (e) => {
          if (e.target.files === null) return;
          const file = e.target.files[0];
          await supabase.storage
            .from("family-photos")
            .upload(`${familyId}/${file.name}`, file, {
              cacheControl: "3600",
              upsert: true,
            });

          await supabase
            .from("Family")
            .update({ photo_url: file.name })
            .eq("id", familyId)
            .select();

          refresh();
        }}
      />
      <button
        className="flex border-2 border-dashed rounded-t-md border-green-800 w-full h-full items-center justify-center"
        onClick={() => {
          uploadRef.current?.click();
        }}
      >
        <p className="text-xl text-green-800">Click Here Upload</p>
      </button>
    </>
  );
};
