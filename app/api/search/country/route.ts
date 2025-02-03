import { obtainCountryResults } from "@/utils/country";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get("country");
  const type = searchParams.get("type");
  const page = searchParams.get("page");

  if (!country || !type || !page) {
    return NextResponse.json(
      { message: "Paramètre type manquant" },
      { status: 400 }
    );
  }

  try {
    const results = await obtainCountryResults(country, type, Number(page));
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
