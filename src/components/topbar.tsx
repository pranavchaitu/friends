"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { ModeToggle } from "./mode-toggle"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"
import Link from "next/link"

export default () => {
    const { status } = useSession()
    return <>
        <div className="z-30 bg-white dark:bg-black border fixed top-4 left-4 right-4 md:left-10 md:right-10 lg:left-60 lg:right-60 rounded-full p-2 md:px-4">
            <div className="flex justify-between items-center">
                <Link href={"/"}>friends.</Link>
                <div className="flex items-center gap-2">
                    <ModeToggle />
                    <Button onClick={() => status == "authenticated" ? signOut() : status == "unauthenticated" ? signIn() : null}>
                        {status == "authenticated" ? "Sign out" : status == "unauthenticated" ? "Sign in" : <Loader2 className="animate-spin"/>}
                    </Button>   
                </div>
            </div>
        </div>
    </>
}
