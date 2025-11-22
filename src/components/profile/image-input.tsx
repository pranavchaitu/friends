"use client";

import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";
import { UploadDropzone } from "@/utils/uploadthing";
import { onBoardUser } from "@/lib/actions";
import { useSession } from "next-auth/react";

export default function() {
  const router = useRouter()
  const { data } = useSession()
  const about = localStorage.getItem("profile/about")!
  const interests = JSON.parse(localStorage.getItem("profile/interests")!)

  return (
    <div className="flex justify-center w-full">
        <UploadDropzone
          className="w-full cursor-pointer bg-accent ut-label:text-lg ut-allowed-content:ut-uploading:text-red-300"
          endpoint="imageUploader"
          config={{ cn : twMerge }}
          onClientUploadComplete={async (res) => {
            console.log(res)
            // await onBoardUser({
            //   imageUrls : [res[0].ufsUrl,res[1].ufsUrl],
            //   about,
            //   interests,
            //   userId : data?.user.id!
            // })
            alert("Upload Completed");
            // router.push('/home')
          }}
          onUploadError={(error: Error) => {
            alert(error.message)
            // toast.error('error uploading photo',{
            //   description : "you can try it again"
            // });
          }}
        />
    </div>
  );
}