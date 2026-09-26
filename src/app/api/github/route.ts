import { NextResponse } from "next/server";

export async function GET() {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "Nisar-baloch";
  const token = process.env.GITHUB_TOKEN;

  // We need 12 weeks of 7 days = 84 days of data for our current UI.
  const totalDays = 12 * 7;

  if (!token) {
    console.warn("GitHub API token is missing, returning empty data.");
    return NextResponse.json({
      contributions: Array(totalDays).fill(0),
      total: 0,
      username,
      error: "Missing token"
    });
  }

  const query = `
    query($userName:String!) {
      user(login: $userName){
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { userName: username },
      }),
      // Revalidate every 24 hours (86400 seconds) to avoid spamming the API
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      throw new Error(`GitHub API responded with ${response.status}`);
    }

    const data = await response.json();
    
    if (data.errors) {
      throw new Error(data.errors[0]?.message || "GraphQL error");
    }

    const weeks = data.data.user.contributionsCollection.contributionCalendar.weeks;
    const total = data.data.user.contributionsCollection.contributionCalendar.totalContributions;

    // We only need the last 12 weeks
    const last12Weeks = weeks.slice(-12);
    
    interface ContributionDay { contributionCount: number; date: string }
    interface ContributionWeek { contributionDays: ContributionDay[] }

    // Flatten and normalize the contribution counts to 0-4 range
    // GitHub's standard is generally: 0, 1-3, 4-6, 7-9, 10+
    const normalizedContributions = last12Weeks.flatMap((week: ContributionWeek) => 
      week.contributionDays.map((day: ContributionDay) => {
        const count = day.contributionCount;
        if (count === 0) return 0;
        if (count <= 3) return 1;
        if (count <= 6) return 2;
        if (count <= 9) return 3;
        return 4;
      })
    );

    // Ensure we have exactly 84 days by padding with 0s if necessary
    const contributions = normalizedContributions.length >= totalDays 
      ? normalizedContributions.slice(-totalDays) 
      : [...Array(totalDays - normalizedContributions.length).fill(0), ...normalizedContributions];

    return NextResponse.json({
      contributions,
      total,
      username
    });
    
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    return NextResponse.json({
      contributions: Array(totalDays).fill(0),
      total: 0,
      username,
      error: "Failed to fetch data"
    });
  }
}
