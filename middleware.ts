import type { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { botUserAgents } from "./utils/utils";

type Session = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest) {
  // Vérifie si le User-Agent correspond à l'un des bots connus
  const userAgent = request.headers.get("user-agent") || "";
  const isBot = botUserAgents.some((bot) => userAgent.includes(bot));

  if (isBot) {
    return NextResponse.next();
  }

  const response = await fetch(
    `${request.nextUrl.origin}/api/auth/get-session`,
    {
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    }
  );

  const session: Session = await response.json();

  if (!session) {
    const response = NextResponse.next();
    response.cookies.set("isLogged", "false");
    response.cookies.set("userId", "");
    response.cookies.set("username", "");
    return response;
  } else if (session) {
    const response = NextResponse.next();
    response.cookies.set("isLogged", "true");
    response.cookies.set("userId", session.user.id);
    response.cookies.set("username", session.user.name);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
