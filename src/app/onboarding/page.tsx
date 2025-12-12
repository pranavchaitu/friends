"use client"

import InterestInput from "@/components/profile/interest-input"
import AboutInput from "@/components/profile/about-input"
import { useEffect, useState } from "react"
import ImageInput from "@/components/profile/image-input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default () => {
    const [about, setAbout] = useState("");
    const [selectedInterests,setSelectedInterests] = useState<string[]>([])
    const [step, setStep] = useState(0)

    useEffect(() => {
        setAbout(localStorage.getItem("profile/about") || "")
        setSelectedInterests(JSON.parse(localStorage.getItem("profile/interests")!) || [])
    },[])

    useEffect(() => {
        localStorage.setItem("profile/about", about)
        localStorage.setItem("profile/interests", JSON.stringify(selectedInterests))
    },[about, selectedInterests])
    
    function handleStepChange() {
        if (about.trim().length && selectedInterests.length) {
            setStep(1)
        } else {
            return toast.error("fill the details dude!")
        }
    }

    return <div className="flex flex-col items-center">
        <div className="font-bold text-3xl py-2">Complete your profile</div>
        <div className="text-gray-500">Let others get to know the real you</div>
        <div className="mt-4 border shadow-xs rounded-lg w-11/12 sm:w-10/12 md:w-9/12 lg:w-8/12 p-6 space-y-7">
            { step == 0 ? 
            <>
                <AboutInput about={about} setAbout={setAbout}/>
                <InterestInput selectedInterests={selectedInterests} setSelectedInterests={setSelectedInterests}/>
                <div className="flex justify-end pt-6 border-t border-border">
                <Button
                    onClick={handleStepChange}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold"
                >
                    Next
                </Button>
                </div>
            </>
            : 
                <ImageInput about={about} interests={selectedInterests}/>
            }
        </div>
    </div>
}