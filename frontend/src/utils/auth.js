/**
 * Token utilities
 */

export const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

export const setToken = (token) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("token");
};

/**
 * Logout user safely
 */
export const logout = () => {
  if (typeof window === "undefined") return;

  // Clear auth token
  localStorage.removeItem("token");

  // ✅ Always redirect to valid route
  window.location.replace("/user/auth/login");
};