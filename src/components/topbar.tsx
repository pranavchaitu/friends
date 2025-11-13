"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { ModeToggle } from "./mode-toggle"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"

export default () => {
    const { status } = useSession()
    return <>
        <div className="fixed top-4 left-4 right-4 md:left-10 md:right-10 lg:left-50 lg:right-50 rounded-full p-2 md:px-4 backdrop-blur-2xl">
            <div className="flex justify-between items-center">
                <div>friends.</div>
                <div className="flex items-center gap-2">
                    <Button onClick={() => status == "authenticated" ? signOut() : status == "unauthenticated" ? signIn() : null}>
                        {status == "authenticated" ? "Sign out" : status == "unauthenticated" ? "Sign in" : <Loader2 className="animate-spin"/>}
                    </Button>   
                    <ModeToggle />
                </div>
            </div>
        </div>
    </>
}
