import { obtainMainPageData } from "@/utils/main-page";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const results = await obtainMainPageData();
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
