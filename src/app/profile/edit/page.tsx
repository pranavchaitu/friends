"use client"

import ImageSection from "@/components/image-section"
import InterestSection from "@/components/interest-section"
import InputAbout from "@/components/profile/input-about"
import { useState } from "react"

export default () => {
    const [about, setAbout] = useState("");
    const [selectedInterests,setSelectedInterests] = useState<string[]>([])
    return <div className="flex flex-col items-center">
        <div className="font-bold text-3xl py-2">Complete your profile</div>
        <div className="text-gray-500">Let others get to know the real you</div>
        <div className="mt-4 border shadow-xs rounded-lg w-11/12 sm:w-10/12 md:w-9/12 lg:w-8/12 p-6 space-y-7">
            <InputAbout about={about} setAbout={setAbout}/>
            <ImageSection />
            <InterestSection selectedInterests={selectedInterests} setSelectedInterests={setSelectedInterests}/>
        </div>
    </div>
}