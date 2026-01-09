"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Users,
  Briefcase,
  TrendingUp,
  CheckCircle,
  XCircle,
  Calendar,
  LogOut,
  ArrowRight,
  Code,
  Palette,
  Layers,
  Bug,
  Sparkles,
} from "lucide-react";

export default function Dashboard() {
  const router = useRouter();

  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= AUTH GUARD ================= */

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");

    if (isAdmin !== "true") {
      router.push("/login");
    } else {
      fetchCandidates();
    }
  }, []);

  /* ================= FETCH CANDIDATES ================= */

  const fetchCandidates = async () => {
    try {
      setLoading(true);

      const res = await fetch("https://recruitment-project-8tbs.onrender.com/api/candidates");
      const json = await res.json();

      if (!json.success) {
        setCandidates([]);
        setLoading(false);
        return;
      }

      // ✅ FIX: Backend returns candidates nested under data: { candidates }
      // Source of truth: Candidate model (NOT Application model)
      setCandidates(json.data?.candidates || []);
      setLoading(false);
    } catch (error) {
      console.error("Fetch candidates error:", error);
      setCandidates([]);
      setLoading(false);
    }
  };

  /* ================= LOGOUT ================= */

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("token");
    router.push("/login");
  };

  /* ================= STATS ================= */

  const stats = [
    {
      label: "Total Candidates",
      value: candidates.length,
      icon: Users,
    },
    {
      label: "Applied",
      value: candidates.filter((c) => c.status === "APPLIED").length,
      icon: TrendingUp,
    },
    {
      label: "Shortlisted",
      value: candidates.filter((c) => c.status === "SHORTLISTED").length,
      icon: Calendar,
    },
    {
      label: "Selected",
      value: candidates.filter((c) => c.status === "SELECTED").length,
      icon: CheckCircle,
    },
    {
      label: "Rejected",
      value: candidates.filter((c) => c.status === "REJECTED").length,
      icon: XCircle,
    },
  ];

  /* ================= STATUS COLORS ================= */

  const getStatusColor = (status) => {
    const colors = {
      APPLIED: "bg-blue-50 text-blue-700",
      SHORTLISTED: "bg-amber-50 text-amber-700",
      INTERVIEW_SCHEDULED: "bg-purple-50 text-purple-700",
      IN_PROGRESS: "bg-indigo-50 text-indigo-700",
      SELECTED: "bg-emerald-50 text-emerald-700",
      REJECTED: "bg-rose-50 text-rose-700",
    };
    return colors[status] || "bg-gray-50 text-gray-700";
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* 💻 DESKTOP VIEW (lg and up) */}
      <div className="hidden lg:block">
        {/* Top Header */}
        <div className="bg-[#0b1c33] px-12 py-10 flex justify-between items-center text-white">
          <div className="space-y-1">
            <span className="text-[10px] font-black text-teal-400 uppercase tracking-[0.3em]">
              Executive Portal
            </span>
            <h1 className="text-4xl font-black tracking-tighter">
              Recruiter Command
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white rounded-[2rem] font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-teal-500/20 active:scale-95 flex items-center gap-2"
          >
            <LogOut size={18} /> Exit System
          </button>
        </div>

        <div className="max-w-[1400px] mx-auto px-12 py-12">
          {/* Stats Visualization */}
          <div className="grid grid-cols-5 gap-6 mb-12">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-white rounded-[2.5rem] p-8 border-2 border-slate-50 shadow-xl shadow-gray-200/50 hover:-translate-y-1 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-teal-500 mb-6">
                  <stat.icon size={24} />
                </div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                  {stat.label}
                </p>
                <p className="text-4xl font-black text-gray-900">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Strategic Actions */}
          <div className="grid grid-cols-2 gap-8 mb-12">
            <Link
              href="/pipeline"
              className="group bg-white rounded-[3rem] p-12 border-2 border-slate-50 hover:border-teal-500 shadow-2xl shadow-gray-200/50 transition-all flex items-center gap-10"
            >
              <div className="w-24 h-24 rounded-[2rem] bg-teal-500 flex items-center justify-center text-white shadow-2xl shadow-teal-500/20 group-hover:scale-110 transition-transform">
                <Users size={40} />
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="text-3xl font-black text-gray-900">
                  Talent Pipeline
                </h3>
                <p className="text-gray-400 font-medium leading-relaxed">
                  Examine and manage incoming applications across all active
                  stages.
                </p>
                <p className="text-xs font-black text-teal-600 uppercase tracking-widest pt-2 flex items-center gap-2">
                  Monitor Flux <ArrowRight size={14} />
                </p>
              </div>
            </Link>

            <Link
              href="/dashboard/jobs"
              className="group bg-[#0b1c33] rounded-[3rem] p-12 shadow-2xl shadow-blue-900/20 transition-all flex items-center gap-10"
            >
              <div className="w-24 h-24 rounded-[2rem] bg-indigo-500 flex items-center justify-center text-white shadow-2xl shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                <Briefcase size={40} />
              </div>
              <div className="flex-1 space-y-2 text-white">
                <h3 className="text-3xl font-black text-white">
                  Role Management
                </h3>
                <p className="text-gray-400 font-medium leading-relaxed">
                  Broadcast new opportunities or optimize existing professional
                  roles.
                </p>
                <p className="text-xs font-black text-teal-400 uppercase tracking-widest pt-2 flex items-center gap-2">
                  Strategic Deployment <ArrowRight size={14} />
                </p>
              </div>
            </Link>
          </div>

          {/* Influx Timeline */}
          <div className="bg-white rounded-[3rem] border-2 border-slate-50 shadow-xl shadow-gray-200/50 overflow-hidden">
            <div className="px-10 py-8 border-b-2 border-slate-50 flex justify-between items-center bg-slate-50/50">
              <div>
                <h2 className="text-2xl font-black text-gray-900">
                  Live Intake
                </h2>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Real-time candidate synchronization
                </p>
              </div>
              <div className="px-5 py-2 bg-teal-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse">
                Live Tracking
              </div>
            </div>

            {loading ? (
              <div className="p-20 text-center text-gray-400 font-black uppercase tracking-[0.3em]">
                Syncing Data...
              </div>
            ) : candidates.length === 0 ? (
              <div className="p-20 text-center text-gray-300 font-black uppercase tracking-widest">
                Zero Candidates In Matrix
              </div>
            ) : (
              <div className="divide-y-2 divide-slate-50">
                {candidates.slice(0, 8).map((c) => (
                  <div
                    key={c._id}
                    className="px-10 py-6 hover:bg-slate-50 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-black text-gray-400 group-hover:bg-teal-500 group-hover:text-white transition-all">
                        {(c.fullName || c.user?.name || "?").charAt(0)}
                      </div>
                      <div>
                        <p className="font-black text-gray-900 text-lg uppercase tracking-tight">
                          {c.fullName || c.user?.name}
                        </p>
                        <p className="text-[10px] font-black text-teal-600 uppercase tracking-widest">
                          {c.position}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <span
                        className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border-2 ${getStatusColor(
                          c.status
                        )}`}
                      >
                        {c.status}
                      </span>
                      <ArrowRight
                        size={20}
                        className="text-slate-200 group-hover:text-teal-500 group-hover:translate-x-1 transition-all"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 📱 MOBILE VIEW (md and below) */}
      <div className="lg:hidden min-h-screen">
        <div className="bg-[#0b1c33] px-6 pt-16 pb-32 rounded-b-[4rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full -mr-32 -mt-32 blur-3xl" />

          <div className="relative z-10 flex justify-between items-center">
            <div className="space-y-1">
              <span className="text-[8px] font-black text-teal-400 uppercase tracking-[0.3em]">
                Command Center
              </span>
              <h1 className="text-4xl font-black text-white tracking-tighter uppercase">
                Admin Portal
              </h1>
            </div>
            <button
              onClick={handleLogout}
              className="w-12 h-12 flex items-center justify-center bg-white/10 text-white rounded-2xl border border-white/20 active:bg-white/20 transition-all"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>

        <div className="px-6 -mt-20 space-y-10 pb-32 relative z-20">
          {/* Mobile Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`bg-white rounded-[2.5rem] p-6 shadow-2xl shadow-gray-200/50 border border-slate-50 flex flex-col items-center text-center group active:scale-95 transition-all ${
                  i === 0 ? "col-span-2 py-8" : ""
                }`}
              >
                <div
                  className={`rounded-xl bg-slate-50 flex items-center justify-center text-teal-500 font-black shadow-sm ${
                    i === 0 ? "w-14 h-14 mb-4" : "w-10 h-10 mb-3"
                  }`}
                >
                  <stat.icon size={i === 0 ? 24 : 20} />
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">
                    {stat.label}
                  </p>
                  <p
                    className={`${
                      i === 0 ? "text-5xl" : "text-3xl"
                    } font-black text-gray-900 leading-none`}
                  >
                    {stat.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Actions */}
          <div className="grid grid-cols-2 gap-6">
            <Link
              href="/pipeline"
              className="bg-teal-500 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-teal-500/30 active:scale-95 transition-all flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
                <Users size={24} />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] leading-tight">
                Talent <br /> Pipeline
              </p>
            </Link>
            <Link
              href="/dashboard/jobs"
              className="bg-[#0b1c33] p-8 rounded-[2.5rem] text-white shadow-2xl shadow-blue-900/30 active:scale-95 transition-all flex flex-col items-center text-center border border-white/10"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
                <Briefcase size={24} />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] leading-tight">
                Manage <br /> Jobs
              </p>
            </Link>
          </div>

          {/* Recent Candidates List */}
          <div className="space-y-6">
            <h2 className="text-xl font-black text-gray-900 px-4 tracking-tight uppercase">
              Recent Influx
            </h2>
            <div className="space-y-4">
              {loading ? (
                <div className="p-10 text-center text-[10px] font-black text-gray-300 uppercase animate-pulse">
                  Syncing...
                </div>
              ) : candidates.length === 0 ? (
                <div className="p-10 text-center text-xs font-black text-gray-200 uppercase">
                  Matrix Empty
                </div>
              ) : (
                candidates.slice(0, 5).map((c) => (
                  <div
                    key={c._id}
                    className="p-6 bg-white rounded-[2rem] border-2 border-slate-50 shadow-xl shadow-gray-200/50 flex items-center justify-between group active:border-teal-500 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center font-black text-teal-500 shadow-sm border border-slate-100">
                        <Users size={20} />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-sm font-black text-gray-900 uppercase tracking-tight line-clamp-1">
                          {c.fullName || c.user?.name}
                        </p>
                        <p className="text-[10px] font-black text-teal-600 uppercase tracking-widest">
                          {c.position}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest border-2 italic ${getStatusColor(
                        c.status
                      )}`}
                    >
                      {c.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
