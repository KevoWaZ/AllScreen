import { NextResponse } from "next/server";

export async function GET() {
  const result = "caca";
  return NextResponse.json(result);
}
