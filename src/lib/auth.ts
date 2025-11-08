import NextAuth from "next-auth"
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id"
import { createUser, findUser } from "./actions"   

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [MicrosoftEntraID],
  callbacks: {
    jwt : async ({ token,profile }) => {
      const userId = await findUser(profile?.email!)
      if(!userId) {
        const newUserId = await createUser({
          name : profile?.email!,
          email : profile?.email!,
          profileUrl : "something for now"
        })
        token.id = newUserId
        return token
      }
      token.id = userId
      return token
    },
    session : ({ session,token } : any ) => {
      session.user.id = token.id
      return session
    },
    authorized: async ({ auth }) => {
      return !!auth
    },
  },
})