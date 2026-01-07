import { getToken } from "./auth";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

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

  const res = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers,
  });

  return res.json();
};
