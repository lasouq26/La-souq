import { ownerAuthorized, readSchedule, saveSchedule, storageIsConfigured, validateSchedule } from "../../lib/hours.js";

export default async function handler(req: any, res: any) {
  if (!process.env.ADMIN_HOURS_TOKEN || !storageIsConfigured()) return res.status(503).json({ error: "Operating-hours admin access is not configured." });
  if (!ownerAuthorized(req.headers?.["x-admin-hours-token"])) return res.status(401).json({ error: "Owner authorization is required." });
  if (req.method === "GET") {
    try { res.setHeader("Cache-Control", "no-store"); return res.status(200).json(await readSchedule()); }
    catch (error) { console.error("Unable to load operating hours:", error); return res.status(500).json({ error: "Unable to load operating hours." }); }
  }
  if (req.method === "PUT") {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const { schedule, error } = validateSchedule(body);
    if (!schedule) return res.status(400).json({ error });
    try { return res.status(200).json(await saveSchedule(schedule)); }
    catch (saveError) { console.error("Unable to save operating hours:", saveError); return res.status(500).json({ error: "Unable to save operating hours. Please try again." }); }
  }
  return res.status(405).json({ error: "Method not allowed." });
}