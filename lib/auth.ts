import {
  createHmac,
  randomBytes,
  scryptSync,
  timingSafeEqual,
} from "crypto";
import { tryReadJson, writeJson } from "./storage";

const COOKIE_NAME = "athletix_admin";
const ADMIN_FILE = "admin.json";

type StoredPassword = {
  algorithm: "scrypt";
  salt: string; // hex
  hash: string; // hex
  updatedAt: string;
};

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

function safeEqualBuf(a: Buffer, b: Buffer): boolean {
  if (a.length !== b.length) return false;
  try {
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

function safeEqualStr(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  return safeEqualBuf(Buffer.from(a), Buffer.from(b));
}

function hashPassword(password: string, saltHex?: string): StoredPassword {
  const salt = saltHex ? Buffer.from(saltHex, "hex") : randomBytes(16);
  const hash = scryptSync(password, salt, 64);
  return {
    algorithm: "scrypt",
    salt: salt.toString("hex"),
    hash: hash.toString("hex"),
    updatedAt: new Date().toISOString(),
  };
}

export async function hasStoredPassword(): Promise<boolean> {
  const stored = await tryReadJson<StoredPassword>(ADMIN_FILE);
  return !!stored?.hash;
}

export async function checkPassword(input: string): Promise<boolean> {
  const stored = await tryReadJson<StoredPassword>(ADMIN_FILE);
  if (stored?.hash && stored?.salt) {
    const candidate = hashPassword(input, stored.salt);
    return safeEqualBuf(
      Buffer.from(candidate.hash, "hex"),
      Buffer.from(stored.hash, "hex")
    );
  }
  const expected = process.env.ADMIN_PASSWORD || "";
  if (!expected) return false;
  return safeEqualStr(input, expected);
}

export async function setPassword(newPassword: string): Promise<void> {
  const record = hashPassword(newPassword);
  await writeJson<StoredPassword>(ADMIN_FILE, record);
}

export const COOKIE = COOKIE_NAME;
