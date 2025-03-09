import { obtainPopularPersons } from "@/utils/person";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page");

  if (!page) {
    return NextResponse.json(
      { message: "Paramètre page manquant" },
      { status: 400 }
    );
  }
  try {
    const results = await obtainPopularPersons(Number(page));
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
