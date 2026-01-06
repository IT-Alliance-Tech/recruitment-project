import { getToken } from "./auth";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export const apiFetch = async (url, options = {}) => {
  const token = getToken();

  const res = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  return res.json();
};
