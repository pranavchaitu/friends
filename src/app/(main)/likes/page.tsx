import { whoLikedUs } from "@/lib/actions"
import { UserFeed } from "@/lib/types"

import {
  MinimalCard,
  MinimalCardDescription,
  MinimalCardImage,
  MinimalCardTitle,
} from "@/components/ui/minimal-card"


export default async function() {
    const likedOnes : UserFeed[] = await whoLikedUs()
    return <>
        <div className="w-full max-w-4xl">
        <div className="min-h-[500px] p-4  flex flex-col justify-center  rounded-lg space-y-4">
            <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {likedOnes.map((user) => (
                <MinimalCard key={user.id}>
                    <MinimalCardImage src={user.images[0]} alt={user.name} />
                    <MinimalCardTitle>{user.name}</MinimalCardTitle>
                    <MinimalCardDescription>
                        {user.about}
                    </MinimalCardDescription>
                </MinimalCard>
            ))}
            </div>
        </div>
        </div>
    </>
}