import db from "./prisma";
import { CreateUserPayload } from "./types";

export async function findUser(email : string) {
    const user = await db.user.findFirst({
        where : {
          email
        },
    })
    const isOnboarded : boolean = !!(user?.images.length && user.about && user.gender && user.hobbies.length)
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