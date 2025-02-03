import { obtainPersonDetails } from "@/utils/person";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const personId = searchParams.get("personId");

  if (!personId) {
    return NextResponse.json(
      { message: "Paramètre personId manquant" },
      { status: 400 }
    );
  }

  try {
    const results = await obtainPersonDetails(personId);
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      { message: error },
      { status: 500 }
    );
  }
}
