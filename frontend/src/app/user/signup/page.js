"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Lock, Phone } from "lucide-react";

export default function UserSignup() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async () => {
    setError("");
    setSuccess("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Signup failed");
        return;
      }

      setSuccess("Account created successfully. Please login.");

      // Redirect to login page after success
      setTimeout(() => {
        router.push("/user/login");
      }, 1500);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 💻 DESKTOP VIEW (lg and up) */}
      <div className="hidden lg:grid grid-cols-2 min-h-screen">
        {/* Left Side: Branded Experience */}
        <div className="bg-[#0b1c33] flex flex-col justify-between p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-teal-500/10 rounded-full -mr-96 -mt-96 blur-3xl" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-12">
              <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-teal-500/20">
                A
              </div>
              <span className="text-2xl font-black text-white tracking-tighter uppercase italic">
                Recruit<span className="text-teal-400">ATS</span>
              </span>
            </div>

            <div className="space-y-6 max-w-lg">
              <span className="px-4 py-2 bg-teal-500/10 text-teal-400 text-[10px] font-black uppercase tracking-[0.3em] rounded-full border border-teal-500/20">
                Candidate Enrollment
              </span>
              <h2 className="text-6xl font-black text-white leading-tight tracking-tighter">
                JOIN THE <br />{" "}
                <span className="text-teal-400 font-black italic">
                  ELITE MATRIX.
                </span>
              </h2>
              <p className="text-gray-400 font-medium text-lg leading-relaxed">
                Architect your professional future with our cutting-edge talent
                acquisition engine.
              </p>
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-10">
            <div className="space-y-2">
              <p className="text-4xl font-black text-white tracking-tighter">
                150K+
              </p>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                Global Deployments
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-black text-teal-400 tracking-tighter">
                98%
              </p>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                Candidate Velocity
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Deployment Form */}
        <div className="bg-white flex flex-col items-center justify-center p-20">
          <div className="w-full max-w-md space-y-12">
            <div className="space-y-2">
              <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">
                Initialize Profile
              </h1>
              <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">
                Entry into the professional network
              </p>
            </div>

            <div className="space-y-6">
              {(error || success) && (
                <div
                  className={`p-5 rounded-2xl border-2 font-bold text-xs uppercase tracking-widest ${
                    error
                      ? "bg-rose-50 border-rose-100 text-rose-600"
                      : "bg-emerald-50 border-emerald-100 text-emerald-600"
                  }`}
                >
                  {error || success}
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">
                    Identification
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-6 top-1/2 -translate-y-1/2 text-teal-500"
                      size={18}
                    />
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className="w-full pl-16 pr-8 py-5 bg-slate-50 border-2 border-transparent focus:border-teal-500 focus:bg-white rounded-2xl outline-none transition-all font-bold text-gray-900 placeholder:text-slate-300"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">
                    Navigation (Email)
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-6 top-1/2 -translate-y-1/2 text-teal-500"
                      size={18}
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className="w-full pl-16 pr-8 py-5 bg-slate-50 border-2 border-transparent focus:border-teal-500 focus:bg-white rounded-2xl outline-none transition-all font-bold text-gray-900 placeholder:text-slate-300"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">
                    Synchronize (Phone)
                  </label>
                  <div className="relative">
                    <Phone
                      className="absolute left-6 top-1/2 -translate-y-1/2 text-teal-500"
                      size={18}
                    />
                    <input
                      type="text"
                      placeholder="Contact number"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      className="w-full pl-16 pr-8 py-5 bg-slate-50 border-2 border-transparent focus:border-teal-500 focus:bg-white rounded-2xl outline-none transition-all font-bold text-gray-900 placeholder:text-slate-300"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">
                    Security Key
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-6 top-1/2 -translate-y-1/2 text-teal-500"
                      size={18}
                    />
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={form.password}
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                      className="w-full pl-16 pr-8 py-5 bg-slate-50 border-2 border-transparent focus:border-teal-500 focus:bg-white rounded-2xl outline-none transition-all font-bold text-gray-900 placeholder:text-slate-300"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={handleSignup}
                className="w-full py-6 bg-[#0b1c33] text-white rounded-[2rem] font-black text-lg shadow-2xl hover:bg-black transition-all active:scale-95 uppercase tracking-widest"
              >
                Establish Identity
              </button>

              <p className="text-center text-[10px] font-black text-gray-400 uppercase tracking-widest leading-relaxed">
                Member of the matrix?{" "}
                <Link
                  href="/user/login"
                  className="text-teal-600 hover:text-teal-500 transition-colors"
                >
                  Access Portal
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 📱 MOBILE VIEW (md and below) */}
      <div className="lg:hidden min-h-screen flex flex-col">
        {/* Branding Header */}
        <div className="bg-[#0b1c33] px-8 pt-16 pb-24 rounded-b-[4rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="relative z-10 text-center space-y-4">
            <div className="w-16 h-16 bg-teal-500 rounded-3xl mx-auto flex items-center justify-center text-white font-black text-3xl shadow-2xl shadow-teal-500/40">
              A
            </div>
            <div className="space-y-1">
              <h1 className="text-3xl font-black text-white tracking-tighter uppercase">
                Join Network
              </h1>
              <p className="text-teal-400 text-[10px] font-black uppercase tracking-[0.2em]">
                RecruitATS Candidate Bridge
              </p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="px-6 -mt-12 pb-20">
          <div className="bg-white rounded-[3rem] p-8 shadow-2xl shadow-gray-200/50 border border-slate-50 space-y-8">
            {(error || success) && (
              <div
                className={`p-5 rounded-2xl border font-bold text-[10px] uppercase tracking-widest text-center ${
                  error
                    ? "bg-rose-50 border-rose-100 text-rose-600"
                    : "bg-emerald-50 border-emerald-100 text-emerald-600"
                }`}
              >
                {error || success}
              </div>
            )}

            <div className="space-y-4">
              <div className="relative">
                <User
                  className="absolute left-6 top-1/2 -translate-y-1/2 text-teal-500"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full pl-16 pr-6 py-5 bg-slate-50 rounded-2xl font-bold text-gray-900 border-2 border-transparent focus:border-teal-500 focus:bg-white outline-none"
                />
              </div>
              <div className="relative">
                <Mail
                  className="absolute left-6 top-1/2 -translate-y-1/2 text-teal-500"
                  size={18}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full pl-16 pr-6 py-5 bg-slate-50 rounded-2xl font-bold text-gray-900 border-2 border-transparent focus:border-teal-500 focus:bg-white outline-none"
                />
              </div>
              <div className="relative">
                <Phone
                  className="absolute left-6 top-1/2 -translate-y-1/2 text-teal-500"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full pl-16 pr-6 py-5 bg-slate-50 rounded-2xl font-bold text-gray-900 border-2 border-transparent focus:border-teal-500 focus:bg-white outline-none"
                />
              </div>
              <div className="relative">
                <Lock
                  className="absolute left-6 top-1/2 -translate-y-1/2 text-teal-500"
                  size={18}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className="w-full pl-16 pr-6 py-5 bg-slate-50 rounded-2xl font-bold text-gray-900 border-2 border-transparent focus:border-teal-500 focus:bg-white outline-none"
                />
              </div>
            </div>

            <button
              onClick={handleSignup}
              className="w-full py-5 bg-[#0b1c33] text-white rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-xl active:scale-95 transition-all"
            >
              Create Profile
            </button>

            <p className="text-center text-[10px] font-black text-gray-400 uppercase tracking-widest leading-relaxed">
              Already bridged?{" "}
              <Link href="/user/login" className="text-teal-600">
                Login Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
