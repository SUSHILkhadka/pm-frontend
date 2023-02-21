import { NextFetchEvent, NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export function middleware(req: NextRequest, event: any) {
  const protectedRoutes = ["/patient", "/home", "/hh"];
  console.log('req = ',req)
  let shouldCheck = false;
  for (const protectedRoute of protectedRoutes) {
    if (req.nextUrl.pathname.startsWith(protectedRoute)) {
      shouldCheck = true;
    }
  }

  console.log('souldcheck=',shouldCheck)
  if (shouldCheck) {
    // const token = req.headers["Authorization"];
    const isLoggedIn = false;
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    console.log("gg");
    if (isLoggedIn) {
      return new Response("Access Granted");
    } else {
      return NextResponse.redirect(url); // redirect
    }
  }

  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    // This logic is only applied to /dashboard
  }
}
