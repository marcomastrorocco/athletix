import { NextRequest, NextResponse } from "next/server";
import { checkPassword, setPassword } from "@/lib/auth";

const MIN_LENGTH = 8;

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const current = String(body?.current ?? "");
  const next = String(body?.next ?? "");

  if (!next || next.length < MIN_LENGTH) {
    return NextResponse.json(
      { error: `New password must be at least ${MIN_LENGTH} characters` },
      { status: 400 }
    );
  }
  if (next === current) {
    return NextResponse.json(
      { error: "New password must be different from current password" },
      { status: 400 }
    );
  }
  if (!(await checkPassword(current))) {
    return NextResponse.json(
      { error: "Current password is incorrect" },
      { status: 401 }
    );
  }

  await setPassword(next);
  return NextResponse.json({ ok: true });
}
