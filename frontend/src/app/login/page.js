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
    localStorage.removeItem("token"); // Clear user session if logging in as admin

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
    <div className="min-h-screen bg-slate-50">
      {/* 💻 DESKTOP VIEW (lg and up) */}
      <div className="hidden lg:flex min-h-screen">
        {/* Left Side: Branding/Intro */}
        <div className="w-1/2 bg-[#0b1c33] relative overflow-hidden flex flex-col justify-center p-20 text-white">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px] -mr-40 -mt-40" />
          <div className="relative z-10 space-y-8">
            <div className="w-16 h-16 rounded-2xl bg-teal-500 flex items-center justify-center shadow-2xl">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-6xl font-black leading-tight">
              Secure <br /> <span className="text-teal-400">Admin Access</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-md font-medium leading-relaxed">
              Manage your recruitment pipeline, track candidate progress, and
              scale your team from one central dashboard.
            </p>
          </div>
          <div className="absolute bottom-10 left-10 text-gray-500 text-sm font-bold uppercase tracking-widest">
            RecruitATS Admin Portal v2.0
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-1/2 flex items-center justify-center p-12 bg-white">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">
                Welcome Back
              </h2>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">
                Please enter your admin credentials
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
                  Admin Email
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-500 transition-colors" />
                  <input
                    type="email"
                    placeholder="admin@recruitats.com"
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
                  Security Password
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
              className="w-full bg-[#0b1c33] hover:bg-teal-600 text-white py-5 rounded-[2rem] font-black text-xl shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-3"
            >
              Launch Dashboard
              <Lock className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* 📱 MOBILE VIEW (md and below) */}
      <div className="lg:hidden min-h-screen flex flex-col justify-center px-6 py-12 relative overflow-hidden bg-white">
        <div className="absolute top-0 left-0 w-full h-[30vh] bg-[#0b1c33] rounded-b-[4rem] flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-teal-500 flex items-center justify-center shadow-2xl border-2 border-white/20 mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-black text-white px-8 text-center leading-tight tracking-tight">
            Admin <span className="text-teal-400">Security Login</span>
          </h1>
        </div>

        <div className="relative z-10 w-full max-w-sm mx-auto mt-[10vh] space-y-8">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-gray-200 border border-gray-50 space-y-6">
            {error && (
              <p className="bg-red-50 text-red-600 p-4 rounded-2xl text-xs font-black text-center border-2 border-red-100 uppercase tracking-wider">
                {error}
              </p>
            )}

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    placeholder="Admin Email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-teal-500 focus:outline-none transition-all font-bold text-gray-900"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-teal-500 focus:outline-none transition-all font-bold text-gray-900"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-teal-500 text-white py-5 rounded-[2rem] font-black text-xl shadow-xl shadow-teal-500/30 active:scale-95 transition-all mt-4"
            >
              Authorize Access
            </button>
          </div>

          <p className="text-center text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em] pt-4">
            Secure Environment • RecruitATS
          </p>
        </div>
      </div>
    </div>
  );
}
