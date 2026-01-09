import { getToken } from "./auth";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

// ✅ DEBUG: Log API_BASE when module loads
if (typeof window !== "undefined") {
  console.log("🔗 API Base URL:", API_BASE);
}

export const apiFetch = async (url, options = {}) => {
  const token = getToken();

  const headers = {
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  // ✅ Only set Content-Type if body is NOT FormData
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const fullUrl = `${API_BASE}${url}`;
  console.log("📡 Fetching:", fullUrl, { method: options.method || "GET", headers });

  try {
    const res = await fetch(fullUrl, {
      ...options,
      headers,
    });

    console.log("📥 Response Status:", res.status, res.statusText);

    if (!res.ok) {
      console.error(`❌ API Error: ${res.status} ${res.statusText}`);
      const errorData = await res.json();
      console.error("Error Details:", errorData);
      return errorData;
    }

    const data = await res.json();
    console.log("✅ Response Data:", data);
    return data;
  } catch (error) {
    console.error("🔴 Fetch Error:", error.message);
    return { success: false, message: error.message };
  }
};
