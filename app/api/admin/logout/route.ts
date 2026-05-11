import { NextResponse } from "next/server";
import { COOKIE } from "@/lib/auth";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: COOKIE,
    value: "",
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });
  return res;
}
