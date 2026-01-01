"use client";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams<{ companyId: string }>();
  const companyId = params.companyId;
  return <div>keyword: {companyId}</div>;
}
