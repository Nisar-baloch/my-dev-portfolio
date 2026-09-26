import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;

  if (!clientId) {
    return new NextResponse(
      "<h2>❌ SPOTIFY_CLIENT_ID is missing from your .env file.</h2>",
      { status: 500, headers: { "Content-Type": "text/html" } }
    );
  }

  const scope = "user-read-currently-playing";
  const redirectUri = "http://127.0.0.1:3000/api/spotify/callback";

  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    scope,
    redirect_uri: redirectUri,
  });

  const spotifyAuthUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;

  return NextResponse.redirect(spotifyAuthUrl);
}
