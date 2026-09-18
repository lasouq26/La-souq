import { publicHours, readSchedule } from "../lib/hours";

export default async function handler(req: any, res: any) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed." });
  try {
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json(publicHours(await readSchedule()));
  } catch (error) {
    console.error("Unable to load public operating hours:", error);
    return res.status(500).json({ error: "Hours are temporarily unavailable." });
  }
}