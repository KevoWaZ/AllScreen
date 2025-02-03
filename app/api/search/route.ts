import { searchAll } from "@/utils/searchUtils";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const params = searchParams.get("params");

  if (!params) {
    return NextResponse.json(
      { message: "Paramètre params manquant" },
      { status: 400 }
    );
  }

  try {
    const results = await searchAll(params);
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
