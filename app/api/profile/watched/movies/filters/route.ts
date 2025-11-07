import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Facets = {
  genres: Array<{ id: number; name: string; count: number }>;
  companies: Array<{ id: number; name: string; count: number }>;
  actors: Array<{ id: number; name: string; count: number }>;
  directors: Array<{ id: number; name: string; count: number }>;
  producers: Array<{ id: number; name: string; count: number }>;
  execProducers: Array<{ id: number; name: string; count: number }>;
  writers: Array<{ id: number; name: string; count: number }>;
  composers: Array<{ id: number; name: string; count: number }>;
  cinematographers: Array<{ id: number; name: string; count: number }>;
  decades: string[];
  years: string[];
};

export async function GET(req: NextRequest) {
  return NextResponse.json("A integrer");
}
