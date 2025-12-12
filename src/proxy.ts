import { auth } from "@/lib/auth"
import { NextAuthRequest, Session } from "next-auth"
import { NextResponse } from "next/server"

export default auth((req : NextAuthRequest) => {
  const pathName = req.nextUrl.pathname
  const session = req.auth!
  if(!session) {
    // user is not authenticated
    return NextResponse.redirect(new URL("/api/auth/signin",req.url))
  }
  if(!session.user?.isOnboarded && pathName !== "/onboarding") {
    return NextResponse.redirect(new URL("/onboarding",req.url))
  }
  if(session.user?.isOnboarded && pathName == "/onboarding") {
    return NextResponse.redirect(new URL("/explore",req.url))
  }
  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|$).*)"],
}