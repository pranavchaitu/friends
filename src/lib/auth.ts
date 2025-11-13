import NextAuth, { DefaultSession } from "next-auth"
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id"
import { createUser, findUser } from "./actions"   
import { Session } from "inspector/promises"

declare module "next-auth" {
  interface Session {
    user : {
      isOnboarded : boolean
    } & DefaultSession["user"]
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [MicrosoftEntraID],
  callbacks: {
    signIn({ profile }) {
      return profile!.email!.endsWith("pragati.ac.in")
    },
    jwt : async ({ token,profile }) => {
      const { id,isOnboarded } = await findUser(profile?.email!)
      if(!id) {
        const newUserId = await createUser({
          name : profile?.email!,
          email : profile?.email!,
        })
        token.id = newUserId
        token.isOnboarded = false
      } else {
        token.id = id
        token.isOnboarded = isOnboarded
      }
      return token      
    },
    session : ({ session,token } : any ) => {
      session.user.id = token.id
      session.user.isOnboarded = token.isOnboarded
      return session
    },
    authorized: async ({ auth }) => {
      return !!auth
    },
  },
})