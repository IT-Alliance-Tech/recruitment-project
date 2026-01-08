"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Users } from "lucide-react";

export default function UserLogin() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Prevent logged-in users from seeing login page
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/user/dashboard");
      return;
    }
    setLoading(false);
  }, [router]);

  const handleLogin = async () => {
    setError("");
    localStorage.removeItem("isAdmin"); // Clear admin session if logging in as user

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Login failed");
        return;
      }

      // Store user token
      localStorage.setItem("token", data.token);

      // Redirect to user dashboard
      router.replace("/user/dashboard");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  if (loading) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 💻 DESKTOP VIEW (lg and up) */}
      <div className="hidden lg:flex min-h-screen">
        {/* Left Side: Career Inspiration */}
        <div className="w-[45%] bg-[#0f4c5c] relative overflow-hidden flex flex-col justify-center p-20 text-white">
          <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-teal-400/20 rounded-full blur-[100px]" />
          <div className="relative z-10 space-y-10">
            <div className="w-16 h-16 rounded-2xl bg-teal-500 flex items-center justify-center shadow-2xl">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-6xl font-black leading-tight">
              Unlock Your <br />{" "}
              <span className="text-teal-400">Potential</span>
            </h1>
            <p className="text-xl text-teal-100/70 max-w-sm font-medium leading-relaxed">
              Join thousands of professionals finding their dream roles through
              our intelligent recruitment platform.
            </p>

            <div className="space-y-4 pt-4">
              {[
                "Access to 500+ Top Companies",
                "Real-time Application Tracking",
                "Direct Interview Scheduling",
              ].map((f) => (
                <div
                  key={f}
                  className="flex items-center gap-3 font-bold text-teal-200"
                >
                  <div className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center">
                    <Mail className="w-3 h-3 text-white" />
                  </div>
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="flex-1 flex items-center justify-center p-12 bg-white">
          <div className="w-full max-w-md space-y-10">
            <div className="text-center">
              <h2 className="text-4xl font-black text-gray-900 mb-2">
                Candidate Login
              </h2>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">
                Welcome back to your career journey
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl">
                <p className="text-red-700 font-bold text-sm text-center">
                  {error}
                </p>
              </div>
            )}

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-700 uppercase tracking-widest ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-500 transition-colors" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-teal-500 focus:outline-none transition-all font-bold text-gray-900"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-700 uppercase tracking-widest ml-1">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-500 transition-colors" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-teal-500 focus:outline-none transition-all font-bold text-gray-900"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-[#0f4c5c] hover:bg-teal-600 text-white py-5 rounded-[2rem] font-black text-xl shadow-2xl transition-all active:scale-95"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>

      {/* 📱 MOBILE VIEW (md and below) */}
      <div className="lg:hidden min-h-screen flex flex-col justify-center px-6 py-12 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full -mr-32 -mt-32 blur-3xl" />

        <div className="relative z-10 w-full max-w-sm mx-auto space-y-10">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 rounded-[2.5rem] bg-[#0f4c5c] flex items-center justify-center mx-auto shadow-2xl">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">
              Login
            </h1>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">
              Candidate Portal
            </p>
          </div>

          <div className="space-y-6">
            {error && (
              <p className="bg-red-50 text-red-600 p-4 rounded-2xl text-xs font-black text-center border-2 border-red-100 uppercase tracking-widest">
                {error}
              </p>
            )}

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="w-full pl-14 pr-4 py-5 rounded-3xl border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-teal-500 focus:outline-none transition-all font-bold"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    className="w-full pl-14 pr-4 py-5 rounded-3xl border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-teal-500 focus:outline-none transition-all font-bold"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-[#0f4c5c] text-white py-5 rounded-[2.5rem] font-black text-xl shadow-2xl shadow-[#0f4c5c]/20 active:scale-95 transition-all mt-4"
            >
              Sign In Now
            </button>
          </div>

          <div className="text-center pt-8 border-t border-gray-100">
            <p className="text-sm font-bold text-gray-400">
              Don't have an account?{" "}
              <span className="text-teal-500 font-black">Apply to any job</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
