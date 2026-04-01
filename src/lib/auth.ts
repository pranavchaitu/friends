import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id"
import { createUser, findUser } from "./actions"

declare module "next-auth" {
  interface Session {
    user: {
      isOnboarded: boolean
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string
    email?: string | null
    isOnboarded?: boolean
  }
}

async function syncUser(token: JWT, email: string) {
  const { id, isOnboarded } = await findUser(email)

  if (!id) {
    const newUserId = await createUser({
      name: email,
      email,
    })

    token.id = newUserId
    token.email = email
    token.isOnboarded = false
    return token
  }

  token.id = id
  token.isOnboarded = isOnboarded
  token.email = email
  return token
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [MicrosoftEntraID],
  callbacks: {
    signIn({ profile }) {
      if (profile && profile.email) {
        return profile.email.endsWith("pragati.ac.in")
      }
      return false
    },
    jwt: async ({ token, user, trigger }) => {
      if (trigger === "signIn" && user?.email) {
        return syncUser(token, user.email)
      }

      if (token.email) {
        return syncUser(token, token.email)
      }

      return token
    },
    session: ({ session, token }) => {
      session.user.id = token.id ?? ""
      session.user.isOnboarded = token.isOnboarded ?? false
      return session
    },
  },
})
