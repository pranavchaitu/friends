import { Gender } from "@/generated/prisma/enums";

export type CreateUserPayload = {
    name : string,
    email : string,
}

export type UserFeed = {
    id: string;
    name: string;
    about: string | null;
    gender: Gender | null;
    hobbies: string[];
    images: string[];
}