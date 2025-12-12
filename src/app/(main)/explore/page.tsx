"use client"

import { getFriendsForFeed, sendLike } from "@/lib/actions"
import { UserFeed } from "@/lib/types"
import { ThumbsDown, ThumbsUp } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function() {
    const [feed, setFeed] = useState<UserFeed[] | null>(null)
    const [curIndex, setCurIndex] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async function () {
            const friends = await getFriendsForFeed()
            setFeed(friends)
            setLoading(false)
        })()
    }, [])

    if(loading) {
        return <>
            loading...
        </>
    }

    const user = feed![curIndex]

    function changeIndex() {
        if(curIndex == feed!.length - 1) {
            setCurIndex(0)
        } else {
            setCurIndex(curIndex+1)
        }
    }

    function handleLike() {
        sendLike(user.id)
        toast.success(`Liked ${user.name}`)
    }

    function handleDislike() {
        // TRIAGE
    }

    return <div className="flex justify-evenly w-full">
        <div key={user.id} className="flex flex-col justify-center items-center py-5 gap-5">
            <p className="text-2xl">
                {user.name}
            </p>
            <Image src={user.images[0]} alt="img1" width={300} height={300}/>
            <p className="max-w-96" >
                {user.about}
            </p>
            <Image src={user.images[1]} alt="img2" width={300} height={300}/>
            <div className="flex gap-2 items-center justify-evenly w-full" onClick={changeIndex}>
                <ThumbsUp onClick={handleLike}/>
                <ThumbsDown onClick={handleDislike}/>
            </div>
        </div>
    </div>
}