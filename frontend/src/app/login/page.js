"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Redirect if already logged in as admin
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin === "true") {
      router.replace("/dashboard");
      return;
    }
    setCheckingAuth(false);
  }, [router]);

  const handleLogin = () => {
    setError("");

    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    if (form.email === adminEmail && form.password === adminPassword) {
      localStorage.setItem("isAdmin", "true");
      router.replace("/dashboard");
    } else {
      setError("Invalid admin credentials");
    }
  };

  if (checkingAuth) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-teal-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl p-8 border border-gray-200">
        
        {/* Title */}
        <h1 className="text-2xl font-semibold text-center text-teal-600 mb-1">
          Admin Login
        </h1>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Access the recruitment dashboard
        </p>

        {/* Error */}
        {error && (
          <p className="text-red-600 text-sm text-center mb-4">
            {error}
          </p>
        )}

        <div className="space-y-4">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="Admin Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            />
          </div>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full mt-6 bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-xl font-semibold shadow-md transition-all"
        >
          Login
        </button>
      </div>
    </div>
  );
}
