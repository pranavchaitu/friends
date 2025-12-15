"use client"

import { getFriendsForFeed, sendDislike, sendLike } from "@/lib/actions"
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
        // we can do cache for this - storing liked ids for a current session.
        // TRIAGE : making sure everytime a like happens the feed changes accordingly(exlusing liked ones without reload). 
    }, [])

    if(loading) {
        return <div className="flex items-center justify-center h-full w-full">
            loading...
        </div>
    }

    if(!feed?.length) {
        return <div className="flex items-center justify-center h-full w-full">
            visited all friends!
        </div>
    }

    const user = feed![curIndex]

    function changeIndex() {
        if(curIndex == feed!.length - 1) {
            setCurIndex(0)
        } else {
            setCurIndex(curIndex+1)
        }
    }

    async function handleLike() {
        await sendLike(user.id)
        changeIndex()
        toast.success(`Liked ${user.name}`)
    }

    async function handleDislike() {
        await sendDislike(user.id)
        changeIndex()
        toast.success(`Disliked ${user.name}`)
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
            <div className="flex gap-2 items-center justify-evenly w-full">
                <ThumbsUp onClick={handleLike}/>
                <ThumbsDown onClick={handleDislike}/>
            </div>
        </div>
    </div>
}