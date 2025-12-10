"use client";

import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";
import { UploadDropzone } from "@/utils/uploadthing";
import { onBoardUser } from "@/lib/actions";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export default function({
  about,
  interests
} : {
  about : string,
  interests : string[]
}) {
  const router = useRouter()
  const { update } = useSession();
  return (
    <div className="flex justify-center w-full">
        <UploadDropzone
          className="w-full cursor-pointer bg-accent ut-label:text-lg ut-allowed-content:ut-uploading:text-red-300"
          endpoint="imageUploader"
          config={{ cn : twMerge }}
          onClientUploadComplete={async (res) => {
            localStorage.removeItem('profile/about')
            localStorage.removeItem('profile/interests')
            await onBoardUser({
              imageUrls : [res[0].ufsUrl,res[1].ufsUrl],
              about,
              interests,
              userId : res[0].serverData.uploadedBy!
            })
            await update();
            toast.success("Upload Completed!");
            router.push('/explore')
          }}
          onUploadError={(error: Error) => {
            console.log(error.message);
            toast.error('Error uploading photo!',{
              description : "you can try it again"
            });
          }}
        />
    </div>
  );
}