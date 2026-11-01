import { timingSafeEqual } from "node:crypto";

export const TIME_ZONE = "America/Chicago";
export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;
type Day = typeof DAYS[number];
export type HoursRow = { day: Day; open: string; close: string; closed: boolean };
export type Schedule = { timezone: string; weeklyHours: HoursRow[] };

export const defaultSchedule = (): Schedule => ({ timezone: TIME_ZONE, weeklyHours: DAYS.map((day) => ({ day, open: "08:00", close: "22:00", closed: false })) });

export function validateSchedule(value: unknown): { schedule?: Schedule; error?: string } {
  if (!value || typeof value !== "object" || !Array.isArray((value as Schedule).weeklyHours)) return { error: "A weeklyHours array is required." };
  const input = (value as Schedule).weeklyHours;
  if (input.length !== DAYS.length) return { error: "Provide exactly one entry for each day." };
  const seen = new Map<string, HoursRow>();
  for (const item of input) {
    const validTime = (time: unknown) => typeof time === "string" && /^\d{2}:\d{2}$/.test(time) && Number(time.slice(0, 2)) < 24 && Number(time.slice(3, 5)) < 60;
    const asMinutes = (time: string) => Number(time.slice(0, 2)) * 60 + Number(time.slice(3, 5));
    if (!item || !DAYS.includes(item.day) || seen.has(item.day)) return { error: "Each weekday must appear exactly once." };
    if (typeof item.closed !== "boolean" || (!item.closed && (!validTime(item.open) || !validTime(item.close) || asMinutes(item.open) >= asMinutes(item.close)))) return { error: `${item.day} needs valid opening and closing times, with closing after opening.` };
    seen.set(item.day, { day: item.day, open: item.closed ? "" : item.open, close: item.closed ? "" : item.close, closed: item.closed });
  }
  return { schedule: { timezone: TIME_ZONE, weeklyHours: DAYS.map((day) => seen.get(day)!) } };
}

const storageConfig = () => ({ url: process.env.SUPABASE_URL?.replace(/\/$/, ""), key: process.env.SUPABASE_SERVICE_ROLE_KEY });
const storageHeaders = (key: string) => ({ apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" });
export const storageIsConfigured = () => Boolean(storageConfig().url && storageConfig().key);

export async function readSchedule(): Promise<Schedule> {
  const { url, key } = storageConfig();
  if (!url || !key) return defaultSchedule();
  const response = await fetch(`${url}/rest/v1/site_settings?setting_key=eq.operating_hours&select=setting_value`, { headers: storageHeaders(key) });
  if (!response.ok) throw new Error("Unable to read operating hours from storage.");
  const rows = await response.json() as Array<{ setting_value?: unknown }>;
  if (!rows[0]?.setting_value) return defaultSchedule();
  return validateSchedule(rows[0].setting_value).schedule || defaultSchedule();
}

export async function saveSchedule(schedule: Schedule): Promise<Schedule> {
  const { url, key } = storageConfig();
  if (!url || !key) throw new Error("Operating-hours storage is not configured.");
  const response = await fetch(`${url}/rest/v1/site_settings?on_conflict=setting_key`, {
    method: "POST",
    headers: { ...storageHeaders(key), Prefer: "resolution=merge-duplicates,return=representation" },
    body: JSON.stringify({ setting_key: "operating_hours", setting_value: schedule }),
  });
  if (!response.ok) throw new Error("Unable to save operating hours to storage.");
  return schedule;
}

export function ownerAuthorized(token: unknown) {
  const expected = process.env.ADMIN_HOURS_TOKEN;
  if (!expected || typeof token !== "string") return false;
  const expectedBuffer = Buffer.from(expected);
  const receivedBuffer = Buffer.from(token);
  return expectedBuffer.length === receivedBuffer.length && timingSafeEqual(expectedBuffer, receivedBuffer);
}

const displayTime = (time: string) => { const [hour, minute] = time.split(":").map(Number); return `${hour % 12 || 12}:${minute.toString().padStart(2, "0")} ${hour >= 12 ? "PM" : "AM"}`; };
export function publicHours(schedule: Schedule) {
  const today = new Intl.DateTimeFormat("en-US", { timeZone: TIME_ZONE, weekday: "long" }).format(new Date()) as Day;
  const row = schedule.weeklyHours.find((item) => item.day === today) || schedule.weeklyHours[0];
  const clock = new Intl.DateTimeFormat("en-US", { timeZone: TIME_ZONE, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
  const now = Number(clock.find((item) => item.type === "hour")?.value || 0) * 60 + Number(clock.find((item) => item.type === "minute")?.value || 0);
  const minutes = (time: string) => Number(time.slice(0, 2)) * 60 + Number(time.slice(3, 5));
  const label = (item: HoursRow) => `${item.day}: ${item.closed ? "Closed" : `${displayTime(item.open)} - ${displayTime(item.close)}`}`;
  return { businessName: "La Souq Richardson", openNow: !row.closed && now >= minutes(row.open) && now < minutes(row.close), todayHours: row.closed ? "Closed" : `${displayTime(row.open)} - ${displayTime(row.close)}`, weeklyHours: schedule.weeklyHours.map(label), nextOpenTime: null, nextCloseTime: null, isLive: true };
}