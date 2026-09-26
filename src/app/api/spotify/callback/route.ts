import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  // User denied access
  if (error) {
    return new NextResponse(
      `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Spotify Auth — Denied</title>
  <style>
    body { font-family: system-ui, sans-serif; background: #0f0f0f; color: #fff; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
    .card { background: #1a1a1a; border: 1px solid #333; border-radius: 12px; padding: 2rem; max-width: 480px; text-align: center; }
    h2 { color: #ef4444; margin-bottom: 1rem; }
    p { color: #aaa; line-height: 1.6; }
  </style>
</head>
<body>
  <div class="card">
    <h2>❌ Authorization Denied</h2>
    <p>You denied access to Spotify. Close this tab and try <a href="/api/spotify/authorize" style="color:#1db954;">again</a>.</p>
    <p style="font-size:0.8rem;margin-top:1rem;color:#555;">Error: ${error}</p>
  </div>
</body>
</html>`,
      { status: 400, headers: { "Content-Type": "text/html" } }
    );
  }

  if (!code) {
    return new NextResponse(
      `<!DOCTYPE html><html><body><h2>❌ No authorization code received from Spotify.</h2></body></html>`,
      { status: 400, headers: { "Content-Type": "text/html" } }
    );
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirectUri = "http://127.0.0.1:3000/api/spotify/callback";

  if (!clientId || !clientSecret) {
    return new NextResponse(
      `<!DOCTYPE html><html><body><h2>❌ Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET in .env</h2></body></html>`,
      { status: 500, headers: { "Content-Type": "text/html" } }
    );
  }

  try {
    const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

    const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
      }),
      cache: "no-store",
    });

    if (!tokenResponse.ok) {
      const errText = await tokenResponse.text();
      console.error("Spotify token exchange failed:", errText);
      throw new Error(`Spotify responded with ${tokenResponse.status}`);
    }

    const tokenData = await tokenResponse.json();
    const refreshToken: string = tokenData.refresh_token;

    if (!refreshToken) {
      throw new Error("Spotify did not return a refresh token. Ensure the app is requesting the correct scope.");
    }

    // We intentionally do NOT log the refresh token to the terminal.
    // We display it only once, inside this local-only browser page.
    // The user should copy it and add it to their .env file immediately.

    return new NextResponse(
      `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Spotify Auth — Success</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background: #0f0f0f;
      color: #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      padding: 1rem;
    }
    .card {
      background: #1a1a1a;
      border: 1px solid #2a2a2a;
      border-radius: 16px;
      padding: 2.5rem;
      max-width: 560px;
      width: 100%;
    }
    .badge {
      display: inline-block;
      background: #1db954;
      color: #000;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.25rem 0.75rem;
      border-radius: 999px;
      margin-bottom: 1.25rem;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }
    h2 { margin: 0 0 0.5rem; font-size: 1.5rem; }
    p { color: #aaa; margin: 0 0 1.5rem; line-height: 1.6; font-size: 0.95rem; }
    .step {
      background: #111;
      border: 1px solid #2a2a2a;
      border-radius: 10px;
      padding: 1.25rem;
      margin-bottom: 1rem;
    }
    .step-label {
      font-size: 0.7rem;
      font-weight: 700;
      color: #1db954;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 0.5rem;
    }
    .token-box {
      background: #000;
      border: 1px solid #333;
      border-radius: 8px;
      padding: 0.75rem 1rem;
      font-family: 'Courier New', monospace;
      font-size: 0.8rem;
      word-break: break-all;
      color: #1db954;
      margin: 0.75rem 0;
    }
    .copy-btn {
      display: inline-block;
      background: #1db954;
      color: #000;
      font-weight: 700;
      font-size: 0.85rem;
      padding: 0.5rem 1.25rem;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.2s;
    }
    .copy-btn:hover { background: #1ed760; }
    .warning {
      background: #1a1200;
      border: 1px solid #4a3200;
      border-radius: 10px;
      padding: 1rem 1.25rem;
      color: #fbbf24;
      font-size: 0.85rem;
      line-height: 1.6;
      margin-top: 1.5rem;
    }
    .env-line {
      font-family: 'Courier New', monospace;
      font-size: 0.82rem;
      background: #000;
      border: 1px solid #2a2a2a;
      border-radius: 6px;
      padding: 0.5rem 0.75rem;
      color: #c8c8c8;
      margin-top: 0.5rem;
      word-break: break-all;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">✓ Spotify Authorized</div>
    <h2>Refresh Token Obtained</h2>
    <p>Authorization successful. Follow the steps below to save your refresh token. Do this now — this page will not persist the token anywhere.</p>

    <div class="step">
      <div class="step-label">Step 1 — Your Refresh Token</div>
      <div class="token-box" id="token">${refreshToken}</div>
      <button class="copy-btn" onclick="copyToken()">Copy Token</button>
    </div>

    <div class="step">
      <div class="step-label">Step 2 — Add to your .env file</div>
      <p style="margin:0;font-size:0.85rem;">Open your project's <strong>.env</strong> file and set this line:</p>
      <div class="env-line">SPOTIFY_REFRESH_TOKEN=${refreshToken}</div>
    </div>

    <div class="step">
      <div class="step-label">Step 3 — Restart Dev Server</div>
      <p style="margin:0;font-size:0.85rem;">After saving the .env file, restart your Next.js dev server so the new variable is loaded:</p>
      <div class="env-line">npm run dev</div>
    </div>

    <div class="warning">
      ⚠️ <strong>Security reminder:</strong> Keep this token private. Never commit your <code>.env</code> file to Git — it is already listed in <code>.gitignore</code>. This page was served only to your local browser and is safe to close.
    </div>
  </div>

  <script>
    function copyToken() {
      const token = document.getElementById('token').textContent.trim();
      navigator.clipboard.writeText(token).then(() => {
        const btn = document.querySelector('.copy-btn');
        btn.textContent = '✓ Copied!';
        setTimeout(() => btn.textContent = 'Copy Token', 2000);
      });
    }
  </script>
</body>
</html>`,
      { status: 200, headers: { "Content-Type": "text/html" } }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return new NextResponse(
      `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><title>Spotify Auth — Error</title>
<style>
  body { font-family: system-ui, sans-serif; background: #0f0f0f; color: #fff; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
  .card { background: #1a1a1a; border: 1px solid #333; border-radius: 12px; padding: 2rem; max-width: 480px; text-align: center; }
  h2 { color: #ef4444; }
  p { color: #aaa; }
  code { background: #000; padding: 0.2rem 0.4rem; border-radius: 4px; font-size: 0.85rem; }
</style>
</head>
<body>
  <div class="card">
    <h2>❌ Token Exchange Failed</h2>
    <p>Could not exchange the authorization code for a refresh token.</p>
    <p><code>${message}</code></p>
    <p>Check your terminal for server-side logs and try <a href="/api/spotify/authorize" style="color:#1db954;">again</a>.</p>
  </div>
</body>
</html>`,
      { status: 500, headers: { "Content-Type": "text/html" } }
    );
  }
}
