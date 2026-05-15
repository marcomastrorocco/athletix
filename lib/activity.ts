import { readJson, writeJson, tryReadJson } from "./storage";

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

const FILE = "activity.json";

export async function readActivity(): Promise<ActivityEntry[]> {
  return (await tryReadJson<ActivityEntry[]>(FILE)) ?? [];
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
  await writeJson(FILE, list.slice(0, 50));
}
