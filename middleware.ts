import type { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { botUserAgents } from "./utils/utils";

type Session = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest) {
  if (
    request.nextUrl.protocol === "http:" ||
    !request.nextUrl.hostname.startsWith("www.")
  ) {
    const targetUrl = new URL(
      `https://www.allscreen.ovh${request.nextUrl.pathname}`
    );
    return NextResponse.redirect(targetUrl);
  }

  const userAgent = request.headers.get("user-agent") || "";
  const isBot = botUserAgents.some((bot) => userAgent.includes(bot));
  if (isBot) {
    console.log({ userAgent, isBot });
    return NextResponse.redirect("/robots.txt", 308);
  }

  try {
    const response = await fetch(
      `${request.nextUrl.origin}/api/auth/get-session`,
      {
        headers: {
          cookie: request.headers.get("cookie") || "",
        },
      }
    );
    const session: Session = await response.json();
    const nextResponse = NextResponse.next();

    if (!session) {
      nextResponse.cookies.set("isLogged", "false");
      nextResponse.cookies.set("userId", "");
      nextResponse.cookies.set("username", "");
    } else {
      nextResponse.cookies.set("isLogged", "true");
      nextResponse.cookies.set("userId", session.user.id);
      nextResponse.cookies.set("username", session.user.name);
    }
    return nextResponse;
  } catch (error) {
    console.error("Error in middleware:", error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
