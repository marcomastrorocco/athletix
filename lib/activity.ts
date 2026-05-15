import { promises as fs } from "fs";
import path from "path";

const file = path.join(process.cwd(), "data", "activity.json");

export type ActivityEntry = {
  id: string;
  at: string;
  kind:
    | "blog"
    | "site"
    | "team"
    | "membership"
    | "timetable"
    | "upload"
    | "page"
    | "media";
  action: "create" | "update" | "delete";
  target: string;
};

export async function readActivity(): Promise<ActivityEntry[]> {
  try {
    const raw = await fs.readFile(file, "utf8");
    return JSON.parse(raw) as ActivityEntry[];
  } catch {
    return [];
  }
}

export async function logActivity(
  entry: Omit<ActivityEntry, "id" | "at">
): Promise<void> {
  const list = await readActivity();
  const next: ActivityEntry = {
    id: Math.random().toString(36).slice(2, 10),
    at: new Date().toISOString(),
    ...entry,
  };
  list.unshift(next);
  await fs.writeFile(file, JSON.stringify(list.slice(0, 50), null, 2) + "\n");
}
