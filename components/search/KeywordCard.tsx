import { Keyword } from "@/types/types";
import Link from "next/link";

export function KeywordCard({ keyword }: { keyword: Keyword }) {
  return (
    <Link
      href={`/keyword/${keyword.id}`}
      className="px-4 py-2 bg-[#2c2c2c] text-[#F5A623] rounded-full text-sm font-medium transition-transform duration-200 hover:scale-105 hover:bg-[#F5A623] hover:text-black cursor-pointer"
    >
      {keyword.name}
    </Link>
  );
}
