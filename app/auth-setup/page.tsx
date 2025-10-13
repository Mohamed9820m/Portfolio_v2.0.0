"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function AuthSetupContent() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [refreshToken, setRefreshToken] = useState<string>("");
  const searchParams = useSearchParams();

  const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
  const REDIRECT_URI = `${window.location.origin}/auth-setup`;
  const SCOPES = [
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/calendar.events"
  ].join(" ");

  const getRefreshToken = useCallback(async (code: string) => {
    setStatus("loading");
    try {
      const response = await fetch("/api/auth/google-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, redirectUri: REDIRECT_URI }),
      });

      const data = await response.json();
      
      if (data.refresh_token) {
        setRefreshToken(data.refresh_token);
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("error");
    }
  }, [REDIRECT_URI]);

  useEffect(() => {
    const code = searchParams.get("code");
    if (code && status === "idle") {
      getRefreshToken(code);
    }
  }, [searchParams, getRefreshToken, status]);

  const handleAuthorize = () => {
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${GOOGLE_CLIENT_ID}` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
      `&response_type=code` +
      `&scope=${encodeURIComponent(SCOPES)}` +
      `&access_type=offline` +
      `&prompt=consent`;

    window.location.href = authUrl;
  };

  const copyToken = () => {
    navigator.clipboard.writeText(refreshToken);
    alert("Token copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <div className="bg-white/5 rounded-2xl border border-white/10 p-8">
          <h1 className="text-3xl font-bold mb-4">Google Calendar Setup</h1>
          <p className="text-gray-400 mb-8">
            Authorize your Google account to enable calendar booking integration.
          </p>

          {status === "idle" && (
            <button
              onClick={handleAuthorize}
              className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all"
            >
              Authorize Google Calendar
            </button>
          )}

          {status === "loading" && (
            <div className="text-center py-8">
              <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-400">Getting your refresh token...</p>
            </div>
          )}

          {status === "success" && (
            <div className="space-y-4">
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
                <h2 className="text-xl font-bold text-green-400 mb-2">✅ Success!</h2>
                <p className="text-gray-300 mb-4">
                  Your refresh token has been generated. Copy it and add it to your <code className="bg-white/10 px-2 py-1 rounded">.env.local</code> file.
                </p>
              </div>

              <div className="bg-white/5 rounded-xl p-4">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Refresh Token:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={refreshToken}
                    readOnly
                    className="flex-1 px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white font-mono text-sm"
                  />
                  <button
                    onClick={copyToken}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all"
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6">
                <h3 className="font-bold text-yellow-400 mb-2">📝 Next Steps:</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-300">
                  <li>Create a file named <code className="bg-white/10 px-2 py-1 rounded">.env.local</code> in your project root</li>
                  <li>Add this line:
                    <pre className="bg-black/50 p-3 rounded-lg mt-2 overflow-x-auto">
                      <code>GOOGLE_REFRESH_TOKEN={refreshToken}</code>
                    </pre>
                  </li>
                  <li>Restart your development server: <code className="bg-white/10 px-2 py-1 rounded">npm run dev</code></li>
                  <li>Test the booking form at <code className="bg-white/10 px-2 py-1 rounded">/contact</code></li>
                </ol>
              </div>
            </div>
          )}

          {status === "error" && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
              <h2 className="text-xl font-bold text-red-400 mb-2">❌ Error</h2>
              <p className="text-gray-300">
                Failed to get refresh token. Please try again or check the console for errors.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-4 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-semibold transition-all"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AuthSetupPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      }
    >
      <AuthSetupContent />
    </Suspense>
  );
}
