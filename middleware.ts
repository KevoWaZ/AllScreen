import type { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

type Session = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest) {
  const response = await fetch(
    `${request.nextUrl.origin}/api/auth/get-session`,
    {
      headers: {
        cookie: request.headers.get("cookie") || "", // Forward the cookies from the request
      },
    }
  );

  const session: Session = await response.json();

  if (!session) {
    const response = NextResponse.next();
    response.cookies.set("isLogged", "false");
    response.cookies.set("userId", "");
    return response;
  } else if (session) {
    const response = NextResponse.next();

    response.cookies.set("isLogged", "true");
    response.cookies.set("userId", session.user.id);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"], // Apply middleware to specific routes
};
