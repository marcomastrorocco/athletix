import { NextResponse } from "next/server";
import { listPages } from "@/lib/data";

export async function GET() {
  const pages = await listPages();
  return NextResponse.json(pages);
}
