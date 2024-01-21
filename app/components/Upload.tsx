"use client";
import { createClient } from "@/utils/supabase/client";
import { useRef } from "react";
import { UploadIcon } from "./icons/Upload";
import { mutate } from "swr";

interface UploadProps {
  familyId: string;
}
export const Upload = ({ familyId }: UploadProps) => {
  const supabase = createClient();
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

          const { error } = await supabase
            .from("families")
            .update({ photo_url: file.name })
            .eq("id", familyId)
            .select();

          mutate("/families");
        }}
      />
      <button
        className="no-navigation flex border-2 rounded-full w-min p-2  border-dashed border-green-800 h-full items-center justify-center"
        onClick={(e) => {
          e.stopPropagation();
          uploadRef.current?.click();
        }}
      >
        <p className="text-lg uppercase italic text-green-800">
          <UploadIcon />
        </p>
      </button>
    </>
  );
};
