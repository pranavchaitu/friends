"use server"

import { auth } from "./auth";
import db from "./prisma";
import { CreateUserPayload, UserFeed } from "./types";

export async function findUser(email : string) {
    const user = await db.user.findFirst({
        where : {
          email
        },
    })
    // TRIAGE
    // const isOnboarded : boolean = !!(user?.images.length && user.about && user.gender && user.hobbies.length)
    const isOnboarded : boolean = !!(user?.images.length && user.about && user.hobbies.length)
    return {
        id : user?.id,
        isOnboarded
    }
}

export async function createUser({
    name,
    email,
} : CreateUserPayload) : Promise<string> {
    const newUser = await db.user.create({
        data : {
            name,
            email,
        },
        select : {
            id : true
        }
    })
    return newUser.id
}

export async function onBoardUser({
    userId,
    imageUrls,
    about,
    interests
} : {
    userId : string,
    imageUrls : string[],
    about : string,
    interests : string[]
}) {
    await db.user.update({
        data : {
            about,
            hobbies : interests,
            images : imageUrls
        },
        where : {
            id : userId
        }
    })
}

export async function getFriendsForFeed() : Promise<UserFeed[]> {
    const session = await auth()
    const userId = session?.user.id
    const friends = await db.user.findMany({
        where : {
            id : {
                not : userId
            }
        },
        select : {
            id : true,
            name : true,
            gender : true,
            about : true,
            hobbies : true,
            images : true
        }
    })
    return friends
}

export async function sendLike(to : string) {
    const session = await auth()
    const userId = session?.user.id
    await db.user.update({
        where : {
            id : userId
        },
        data : {
            sentLikes : {
                connect : {
                    id : to
                }
            }
        }
    })
}