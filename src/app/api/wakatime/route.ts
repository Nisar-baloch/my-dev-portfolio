import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.WAKATIME_API_KEY;

  if (!apiKey) {
    console.warn("WakaTime API key is missing. Returning fallback data.");
    return NextResponse.json({
      text: "4h 12m",
      progress: 65,
      error: "Missing API key",
    });
  }

  try {
    // We encode the API key for Basic Auth
    const encodedKey = Buffer.from(apiKey).toString("base64");
    
    // Fetch last 7 days stats
    const response = await fetch("https://wakatime.com/api/v1/users/current/stats/last_7_days", {
      headers: {
        Authorization: `Basic ${encodedKey}`,
      },
      // Revalidate every hour
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`WakaTime API responded with ${response.status}`);
    }

    const data = await response.json();
    
    // WakaTime returns human readable text like "4 hrs 12 mins"
    // We'll simplify it to match our UI "4h 12m" if possible, or just use their text
    const todayStat = data.data.human_readable_daily_average || "0h 0m";
    const formattedText = todayStat.replace("hrs", "h").replace("hr", "h").replace("mins", "m").replace("min", "m");
    
    // Calculate a rough progress percentage against an 8 hour goal (8 * 3600 = 28800 seconds)
    const dailyAverageSeconds = data.data.daily_average || 0;
    const goalSeconds = 8 * 3600;
    const progress = Math.min(Math.round((dailyAverageSeconds / goalSeconds) * 100), 100);

    return NextResponse.json({
      text: formattedText,
      progress,
    });
    
  } catch (error) {
    console.error("Error fetching WakaTime data:", error);
    return NextResponse.json({
      text: "Data Unavailable",
      progress: 0,
      error: "Failed to fetch data",
    });
  }
}
