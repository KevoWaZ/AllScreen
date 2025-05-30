import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth.api.listUserAccounts({
    headers: await headers(),
  });

  return NextResponse.json(session[0]);
}
