"use client";
import { createClient } from "@/utils/supabase/client";
import { useRef } from "react";
import { UploadIcon } from "./icons/Upload";
import { mutate } from "swr";
import { getSignedUrl } from "@/utils/api/data";
import { Signal } from "@preact/signals-react";

interface UploadProps {
  familyId: string;
  loadingSignal: Signal<boolean>;
}
export const Upload = ({ familyId, loadingSignal }: UploadProps) => {
  const supabase = createClient();
  const uploadRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        ref={uploadRef}
        className="hidden"
        type="file"
        onChange={async (e) => {
          loadingSignal.value = true;

          if (e.target.files === null) return;
          const file = e.target.files[0];
          const { data: fileInfo } = await supabase.storage
            .from("family-photos")
            .upload(`${familyId}/${file.name}`, file, {
              cacheControl: "3600",
              upsert: true,
            });

          const { data: family } = await supabase
            .from("families")
            .update({
              photo_path: fileInfo ? fileInfo.path : null,
            })
            .eq("id", familyId)
            .select();

          await mutate(`/family-${familyId}`, family, {
            optimisticData: true,
          });

          loadingSignal.value = false;
        }}
      />
      <button
        className="no-navigation bg-white shadow-md flex border-2 rounded-full w-min p-2  border-dashed border-green-800 h-full items-center justify-center"
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
