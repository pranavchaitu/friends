"use client"

import { Textarea } from "@/components/ui/textarea"
import { ChangeEvent, useState } from "react"

export default ({ about, setAbout } : {
    about : string,
    setAbout : (about : string) => void
}) => {
    function handleAboutInput(e : ChangeEvent<HTMLTextAreaElement>) {
        setAbout(e.target.value)
    }

    return <div className="grid w-full gap-3">
        <h2 className="text-lg font-semibold text-foreground">About</h2>
        <Textarea onChange={(e) => handleAboutInput(e)} placeholder="Write about yourself in short" id="about-text" value={about}></Textarea>
        <p className="font-mono text-sm text-gray-500">{about.length}/100 characters</p>
    </div>
}