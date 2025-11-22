import { auth } from "@/lib/auth"
import { NextAuthRequest, Session } from "next-auth"
import { NextResponse } from "next/server"

export default auth((req : NextAuthRequest) => {
  const session = req.auth!
  if(!session) {
    // user is not authenticated
    return NextResponse.redirect(new URL("/api/auth/signin",req.url))
  }
  const pathName = req.nextUrl.pathname
  if(!session.user?.isOnboarded && pathName !== "/profile/edit") {
    return NextResponse.redirect(new URL("/profile/edit",req.url))
  }
  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|$).*)"],
}