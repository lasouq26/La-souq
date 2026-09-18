import express from "express";
import path from "path";
import { promises as fs } from "node:fs";
import { timingSafeEqual } from "node:crypto";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = Number(process.env.PORT) || 3000;
const TIME_ZONE = "America/Chicago";
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;
const HOURS_FILE = process.env.HOURS_DATA_FILE || path.join(process.cwd(), "data", "hours.json");
type Day = typeof DAYS[number];
type Row = { day: Day; open: string; close: string; closed: boolean };
type Schedule = { timezone: string; weeklyHours: Row[] };
const defaultSchedule = (): Schedule => ({ timezone: TIME_ZONE, weeklyHours: DAYS.map(day => ({ day, open: "08:00", close: "22:00", closed: false })) });
app.use(express.json({ limit: "16kb" }));

function validate(value: unknown): { schedule?: Schedule; error?: string } {
  if (!value || typeof value !== "object" || !Array.isArray((value as Schedule).weeklyHours)) return { error: "A weeklyHours array is required." };
  const input = (value as Schedule).weeklyHours;
  if (input.length !== DAYS.length) return { error: "Provide exactly one entry for each day." };
  const seen = new Map<string, Row>();
  for (const item of input) {
    if (!item || !DAYS.includes(item.day) || seen.has(item.day)) return { error: "Each weekday must appear exactly once." };
    const validTime = (time: unknown) => typeof time === "string" && /^\d{2}:\d{2}$/.test(time) && Number(time.slice(0, 2)) < 24 && Number(time.slice(3, 5)) < 60;
    if (typeof item.closed !== "boolean" || (!item.closed && (!validTime(item.open) || !validTime(item.close) || Number(item.open.slice(0, 2)) * 60 + Number(item.open.slice(3, 5)) >= Number(item.close.slice(0, 2)) * 60 + Number(item.close.slice(3, 5))))) return { error: `${item.day} needs valid opening and closing times, with closing after opening.` };
    seen.set(item.day, { day: item.day, open: item.closed ? "" : item.open, close: item.closed ? "" : item.close, closed: item.closed });
  }
  return { schedule: { timezone: TIME_ZONE, weeklyHours: DAYS.map(day => seen.get(day)!) } };
}

async function readSchedule(): Promise<Schedule> {
  try {
    const { schedule } = validate(JSON.parse(await fs.readFile(HOURS_FILE, "utf8")));
    if (schedule) return schedule;
  } catch (error: any) {
    if (error.code !== "ENOENT") console.error("Could not read saved operating hours:", error);
  }
  return defaultSchedule();
}
async function saveSchedule(schedule: Schedule) {
  await fs.mkdir(path.dirname(HOURS_FILE), { recursive: true });
  const temporary = `${HOURS_FILE}.${process.pid}.${Date.now()}.tmp`;
  await fs.writeFile(temporary, `${JSON.stringify(schedule, null, 2)}\n`, { encoding: "utf8", mode: 0o600 });
  await fs.rename(temporary, HOURS_FILE);
}
function isOwner(token: unknown) {
  const expected = process.env.ADMIN_HOURS_TOKEN;
  if (!expected || typeof token !== "string") return false;
  const a = Buffer.from(expected); const b = Buffer.from(token);
  return a.length === b.length && timingSafeEqual(a, b);
}
const requireOwner: express.RequestHandler = (req, res, next) => {
  if (!process.env.ADMIN_HOURS_TOKEN) return res.status(503).json({ error: "Operating-hours admin access is not configured." });
  if (!isOwner(req.header("x-admin-hours-token"))) return res.status(401).json({ error: "Owner authorization is required." });
  next();
};
function displayTime(time: string) { const [hour, minute] = time.split(":").map(Number); return `${hour % 12 || 12}:${minute.toString().padStart(2, "0")} ${hour >= 12 ? "PM" : "AM"}`; }
function publicHours(schedule: Schedule) {
  const today = new Intl.DateTimeFormat("en-US", { timeZone: TIME_ZONE, weekday: "long" }).format(new Date()) as Day;
  const row = schedule.weeklyHours.find(item => item.day === today) || schedule.weeklyHours[0];
  const clock = new Intl.DateTimeFormat("en-US", { timeZone: TIME_ZONE, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
  const now = Number(clock.find(item => item.type === "hour")?.value || 0) * 60 + Number(clock.find(item => item.type === "minute")?.value || 0);
  const minutes = (time: string) => Number(time.slice(0, 2)) * 60 + Number(time.slice(3, 5));
  const label = (item: Row) => `${item.day}: ${item.closed ? "Closed" : `${displayTime(item.open)} – ${displayTime(item.close)}`}`;
  return { businessName: "La Souq Richardson", openNow: !row.closed && now >= minutes(row.open) && now < minutes(row.close), todayHours: row.closed ? "Closed" : `${displayTime(row.open)} – ${displayTime(row.close)}`, weeklyHours: schedule.weeklyHours.map(label), nextOpenTime: null, nextCloseTime: null, isLive: true };
}

app.get("/health", (_req, res) => res.json({ status: "ok" }));
app.get("/api/place-hours", async (_req, res) => { res.set("Cache-Control", "no-store"); res.json(publicHours(await readSchedule())); });
app.get("/api/admin/hours", requireOwner, async (_req, res) => { res.set("Cache-Control", "no-store"); res.json(await readSchedule()); });
app.put("/api/admin/hours", requireOwner, async (req, res) => {
  const { schedule, error } = validate(req.body); if (!schedule) return res.status(400).json({ error });
  try { await saveSchedule(schedule); res.json(schedule); } catch (error) { console.error("Could not save operating hours:", error); res.status(500).json({ error: "Unable to save operating hours. Please try again." }); }
});

async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: "spa" }); app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist"); app.use(express.static(distPath)); app.get("*", (_req, res) => res.sendFile(path.join(distPath, "index.html")));
  }
  app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT} with full-stack support.`));
}
setupServer();