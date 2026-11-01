import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { ownerAuthorized, publicHours, readSchedule, saveSchedule, storageIsConfigured, validateSchedule } from "./lib/hours";

dotenv.config();
const app = express();
const PORT = Number(process.env.PORT) || 3000;
app.use(express.json({ limit: "16kb" }));

app.get("/health", (_req, res) => res.json({ status: "ok" }));
app.get("/api/place-hours", async (_req, res) => {
  try { res.set("Cache-Control", "no-store"); res.json(publicHours(await readSchedule())); }
  catch (error) { console.error("Unable to load public operating hours:", error); res.status(500).json({ error: "Hours are temporarily unavailable." }); }
});
app.get("/api/admin/hours", async (req, res) => {
  if (!process.env.ADMIN_HOURS_TOKEN || !storageIsConfigured()) return res.status(503).json({ error: "Operating-hours admin access is not configured." });
  if (!ownerAuthorized(req.header("x-admin-hours-token"))) return res.status(401).json({ error: "Owner authorization is required." });
  try { res.set("Cache-Control", "no-store"); res.json(await readSchedule()); }
  catch (error) { console.error("Unable to load operating hours:", error); res.status(500).json({ error: "Unable to load operating hours." }); }
});
app.put("/api/admin/hours", async (req, res) => {
  if (!process.env.ADMIN_HOURS_TOKEN || !storageIsConfigured()) return res.status(503).json({ error: "Operating-hours admin access is not configured." });
  if (!ownerAuthorized(req.header("x-admin-hours-token"))) return res.status(401).json({ error: "Owner authorization is required." });
  const { schedule, error } = validateSchedule(req.body);
  if (!schedule) return res.status(400).json({ error });
  try { res.json(await saveSchedule(schedule)); }
  catch (saveError) { console.error("Unable to save operating hours:", saveError); res.status(500).json({ error: "Unable to save operating hours. Please try again." }); }
});

async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: "spa" });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => res.sendFile(path.join(distPath, "index.html")));
  }
  app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT} with full-stack support.`));
}
setupServer();