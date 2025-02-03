import { obtainKeywordName } from "@/utils/keyword";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keywordId = searchParams.get("keywordId");
  const type = searchParams.get("type");
  const page = searchParams.get("page");

  if (!keywordId || !type || !page) {
    return NextResponse.json(
      { message: "Paramètre type manquant" },
      { status: 400 }
    );
  }

  try {
    const results = await obtainKeywordName(keywordId, type, Number(page));
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
