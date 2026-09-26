import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.WAKATIME_API_KEY;

  if (!apiKey) {
    console.warn("WakaTime API key is missing. Returning fallback data.");
    return NextResponse.json({
      text: "4h 12m",
      progress: 65,
      totalText: "29h 24m",
      topLanguage: "TypeScript",
      topProject: "portfolio",
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
    
    const todayStat = data.data.human_readable_daily_average || "0h 0m";
    const formattedText = todayStat.replace("hrs", "h").replace("hr", "h").replace("mins", "m").replace("min", "m");
    
    const totalStat = data.data.human_readable_total || "0h 0m";
    const formattedTotal = totalStat.replace("hrs", "h").replace("hr", "h").replace("mins", "m").replace("min", "m");

    const languages = data.data.languages || [];
    const topLanguage = languages.length > 0 ? languages[0].name : "Unknown";

    const projects = data.data.projects || [];
    const topProject = projects.length > 0 ? projects[0].name : "Unknown";
    
    // Calculate a rough progress percentage against an 8 hour goal (8 * 3600 = 28800 seconds)
    const dailyAverageSeconds = data.data.daily_average || 0;
    const goalSeconds = 8 * 3600;
    const progress = Math.min(Math.round((dailyAverageSeconds / goalSeconds) * 100), 100);

    return NextResponse.json({
      text: formattedText,
      progress,
      totalText: formattedTotal,
      topLanguage,
      topProject,
    });
    
  } catch (error) {
    console.error("Error fetching WakaTime data:", error);
    return NextResponse.json({
      text: "Unavailable",
      progress: 0,
      totalText: "Unavailable",
      topLanguage: "Unknown",
      topProject: "Unknown",
      error: "Failed to fetch data",
    }, { status: 500 });
  }
}
