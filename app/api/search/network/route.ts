import { obtainNetworkShow } from "@/utils/network";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const networkId = searchParams.get("networkId");
  const type = searchParams.get("type");
  const page = searchParams.get("page");

  if (!networkId || !type || !page) {
    return NextResponse.json(
      { message: "Paramètre type manquant" },
      { status: 400 }
    );
  }

  try {
    const results = await obtainNetworkShow(networkId, type, Number(page));
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
