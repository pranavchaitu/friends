"use client"

import { signIn } from "next-auth/react"
import { ModeToggle } from "./mode-toggle"
import { Button } from "./ui/button"

export default () => {
    return <>
        <div className="fixed top-2 left-2 right-2 md:left-10 md:right-10 lg:left-30 lg:right-30 border border-black rounded-full p-2 md:px-4 backdrop-blur-2xl">
            <div className="flex justify-between items-center">
                <div>friends.</div>
                <div className="flex items-center gap-2">
                    <Button onClick={() => signIn()}>
                        sign in
                    </Button>   
                    <ModeToggle />
                </div>
            </div>
        </div>
    </>
}
