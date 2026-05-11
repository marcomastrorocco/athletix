import { createHmac, timingSafeEqual } from "crypto";

const COOKIE_NAME = "athletix_admin";

function secret(): string {
  return process.env.ADMIN_SECRET || "dev-insecure-secret";
}

export function sessionToken(): string {
  return createHmac("sha256", secret()).update("admin").digest("hex");
}

export function verifyToken(value: string | undefined): boolean {
  if (!value) return false;
  const expected = sessionToken();
  if (value.length !== expected.length) return false;
  try {
    return timingSafeEqual(Buffer.from(value), Buffer.from(expected));
  } catch {
    return false;
  }
}

export function checkPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD || "";
  if (!expected) return false;
  if (input.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(input), Buffer.from(expected));
}

export const COOKIE = COOKIE_NAME;
