import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const configuredPort = Number(process.env.PORT);
const PORT = Number.isInteger(configuredPort) && configuredPort > 0 ? configuredPort : 3000;

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

// Simple in-memory cache for the Places API response (15-minute duration)
interface CacheEntry {
  data: {
    businessName: string;
    openNow: boolean | null;
    todayHours: string;
    weeklyHours: string[];
    nextOpenTime: string | null;
    nextCloseTime: string | null;
  };
  timestamp: number;
}

let hoursCache: CacheEntry | null = null;
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds

app.get("/api/place-hours", async (req, res) => {
  // Graceful fallback hours data generator
  const getFallbackHours = () => {
    let openNow = false;
    let todayHours = "8:00 AM – 10:00 PM";
    try {
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Chicago",
        hour: "numeric",
        minute: "numeric",
        hour12: false
      });
      const parts = formatter.formatToParts(new Date());
      const hourPart = parts.find(p => p.type === "hour");
      const minutePart = parts.find(p => p.type === "minute");
      if (hourPart && minutePart) {
        const hour = parseInt(hourPart.value, 10);
        const minute = parseInt(minutePart.value, 10);
        const totalMinutes = hour * 60 + minute;
        const openMinutes = 8 * 60; // 8:00 AM
        const closeMinutes = 22 * 60; // 10:00 PM
        if (totalMinutes >= openMinutes && totalMinutes < closeMinutes) {
          openNow = true;
        }
      }
    } catch (err) {
      console.error("Error calculating local openNow status:", err);
    }

    return {
      businessName: "La Souq Richardson",
      openNow,
      todayHours,
      weeklyHours: [
        "Monday: 8:00 AM – 10:00 PM",
        "Tuesday: 8:00 AM – 10:00 PM",
        "Wednesday: 8:00 AM – 10:00 PM",
        "Thursday: 8:00 AM – 10:00 PM",
        "Friday: 8:00 AM – 10:00 PM",
        "Saturday: 8:00 AM – 10:00 PM",
        "Sunday: 8:00 AM – 10:00 PM"
      ],
      nextOpenTime: null,
      nextCloseTime: null,
      isLive: false
    };
  };

  try {
    // Check cache
    const now = Date.now();
    if (hoursCache && (now - hoursCache.timestamp < CACHE_DURATION)) {
      return res.json(hoursCache.data);
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey || apiKey === "MY_API_KEY" || apiKey.trim() === "") {
      console.warn("GOOGLE_MAPS_API_KEY is not defined or is placeholder. Returning scheduled fallback hours gracefully.");
      const fallback = getFallbackHours();
      return res.json(fallback);
    }

    const placeId = "ChIJA3Ws5X0fTIYRS0ym1WwKZgY";
    const googleUrl = `https://places.googleapis.com/v1/places/${placeId}`;

    const googleResponse = await fetch(googleUrl, {
      method: "GET",
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "displayName,currentOpeningHours,regularOpeningHours,utcOffsetMinutes"
      }
    });

    if (!googleResponse.ok) {
      const errorText = await googleResponse.text();
      console.error(`Google Places API responded with status ${googleResponse.status}: ${errorText}`);
      console.warn("Returning fallback scheduled hours gracefully due to Google Places API response issue.");
      const fallback = getFallbackHours();
      return res.json(fallback);
    }

    const data = await googleResponse.json();

    // Determine openNow status, favoring currentOpeningHours
    const openNow = data.currentOpeningHours?.openNow ?? data.regularOpeningHours?.openNow ?? null;

    // Retrieve weekly hours from current or regular opening hours
    const weeklyHours: string[] = 
      data.currentOpeningHours?.weekdayDescriptions || 
      data.regularOpeningHours?.weekdayDescriptions || 
      [];

    // Extract today's hours dynamically based on local timezone in America/Chicago
    let todayHours = "8:00 AM – 10:00 PM"; // Default fallback
    try {
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Chicago",
        weekday: "long"
      });
      const todayDayName = formatter.format(new Date()); // e.g. "Monday"
      
      const todayHoursLine = weeklyHours.find((line: string) => 
        line.toLowerCase().startsWith(todayDayName.toLowerCase())
      );
      if (todayHoursLine) {
        // Strip out day prefix "Monday: 6:30 AM – 7:00 PM" -> "6:30 AM – 7:00 PM"
        const parts = todayHoursLine.split(":");
        if (parts.length > 1) {
          todayHours = parts.slice(1).join(":").trim();
        } else {
          todayHours = todayHoursLine;
        }
      }
    } catch (tzErr) {
      console.error("Error formatting date for timezone:", tzErr);
    }

    // Try to parse nextOpenTime or nextCloseTime from periods if available
    let nextOpenTime: string | null = null;
    let nextCloseTime: string | null = null;

    const result = {
      businessName: data.displayName?.text || "La Souq Richardson",
      openNow,
      todayHours,
      weeklyHours,
      nextOpenTime,
      nextCloseTime,
      isLive: true
    };

    // Store in cache
    hoursCache = {
      data: result,
      timestamp: now
    };

    res.json(result);
  } catch (err: any) {
    console.error("Error fetching store hours from Google:", err);
    console.warn("Returning fallback scheduled hours gracefully due to unexpected error.");
    const fallback = getFallbackHours();
    res.json(fallback);
  }
});

// Configure Vite or serve static production build
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT} with full-stack support.`);
  });
}

setupServer();
