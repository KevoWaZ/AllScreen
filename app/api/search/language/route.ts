import { obtainLanguageResults } from "@/utils/language";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const language = searchParams.get("language");
  const type = searchParams.get("type");
  const page = searchParams.get("page");

  if (!language || !type || !page) {
    return NextResponse.json(
      { message: "Paramètre type manquant" },
      { status: 400 }
    );
  }

  try {
    const results = await obtainLanguageResults(language, type, Number(page));
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
