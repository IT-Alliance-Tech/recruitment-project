import { getToken } from "./auth";

/**
 * API base URL (must be defined in Vercel env)
 * Example:
 * NEXT_PUBLIC_API_URL=https://your-backend-domain/api
 */
const API_BASE = process.env.NEXT_PUBLIC_API_URL;

// 🚨 Hard guard — fail fast if env is missing
if (!API_BASE) {
  throw new Error(
    "❌ NEXT_PUBLIC_API_URL is not defined. Check Vercel Environment Variables."
  );
}

// ✅ Debug log (runs only in browser)
if (typeof window !== "undefined") {
  console.log("🔗 API Base URL:", API_BASE);
}

export const apiFetch = async (url, options = {}) => {
  try {
    const token = getToken();

    const headers = {
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    // ✅ Set Content-Type only when body is NOT FormData
    if (options.body && !(options.body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    const fullUrl = `${API_BASE}${url}`;

    console.log("📡 Fetching:", {
      url: fullUrl,
      method: options.method || "GET",
      headers,
    });

    const response = await fetch(fullUrl, {
      ...options,
      headers,
    });

    console.log("📥 Response:", response.status, response.statusText);

    // ❌ API error
    if (!response.ok) {
      let errorBody = null;

      try {
        errorBody = await response.json();
      } catch {
        errorBody = { message: "Unknown API error" };
      }

      console.error("❌ API Error:", errorBody);

      return {
        success: false,
        status: response.status,
        ...errorBody,
      };
    }

    // ✅ Success
    const data = await response.json();
    console.log("✅ API Success:", data);

    return data;
  } catch (error) {
    console.error("🔴 Fetch Failed:", error);

    return {
      success: false,
      message: error.message || "Network error",
    };
  }
};