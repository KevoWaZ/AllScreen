import { getCollection } from "@/utils/collection";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const collectionId = searchParams.get("collectionId");

  if (!collectionId) {
    return NextResponse.json(
      { message: "Paramètre collectionId manquant" },
      { status: 400 }
    );
  }

  try {
    const results = await getCollection(collectionId);
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      { message: error },
      { status: 500 }
    );
  }
}
