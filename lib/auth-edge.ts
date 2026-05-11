// Web Crypto version of the session token, usable from Next.js middleware (Edge runtime).

function secret(): string {
  return process.env.ADMIN_SECRET || "dev-insecure-secret";
}

function toHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function sessionTokenEdge(): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode("admin"));
  return toHex(sig);
}

export async function verifyTokenEdge(value: string | undefined): Promise<boolean> {
  if (!value) return false;
  const expected = await sessionTokenEdge();
  if (value.length !== expected.length) return false;
  let mismatch = 0;
  for (let i = 0; i < value.length; i++) {
    mismatch |= value.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return mismatch === 0;
}

export const COOKIE_NAME = "athletix_admin";
