import db from "./prisma";
import { CreateUserPayload } from "./types";

export async function findUser(email : string) : Promise<string|null> {
    const user = await db.user.findFirst({
        where : {
          email
        },
        select : {
          id : true
        }
    })
    return user?.id || null
}

export async function createUser({
    name,
    email,
    profileUrl
} : CreateUserPayload) : Promise<string> {
    const newUser = await db.user.create({
        data : {
            name,
            email,
            profileUrl
        },
        select : {
            id : true
        }
    })
    return newUser.id
}