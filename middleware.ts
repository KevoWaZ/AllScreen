import type { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { botUserAgents } from "./utils/utils";

type Session = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") || "";
  const isBot = botUserAgents.some((bot) => userAgent.includes(bot));

  if (isBot) {
    console.log({ userAgent, isBot });
    return NextResponse.next();
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

    console.log(response);

    console.log(`Process with isBot ${isBot}`);

    const session: Session = await response.json();

    const nextResponse = NextResponse.next();

    if (!session) {
      nextResponse.cookies.set("isLogged", "false", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      nextResponse.cookies.set("userId", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      nextResponse.cookies.set("username", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
    } else {
      nextResponse.cookies.set("isLogged", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      nextResponse.cookies.set("userId", session.user.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      nextResponse.cookies.set("username", session.user.name, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
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
