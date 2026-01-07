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

      const res = await fetch("http://localhost:5000/api/candidates");
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* HEADER */}
      <div className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Admin Dashboard
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Recruitment pipeline overview
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* STATS */}
        {/* UI improvement only – no logic change */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          {stats.map((stat, i) => {
            const statColors = {
              0: 'bg-blue-50 border-blue-200 text-blue-600',
              1: 'bg-emerald-50 border-emerald-200 text-emerald-600',
              2: 'bg-amber-50 border-amber-200 text-amber-600',
              3: 'bg-green-50 border-green-200 text-green-600',
              4: 'bg-red-50 border-red-200 text-red-600',
            };
            
            return (
              <div
                key={i}
                className={`${statColors[i]} border rounded-xl p-6 transition-all hover:shadow-md`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold text-slate-900">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`${statColors[i].split(' ')[0]} p-3 rounded-lg`}>
                    <stat.icon className={statColors[i].split(' ')[2]} size={20} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* QUICK ACTIONS */}
        {/* UI improvement only – no logic change */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <Link
            href="/pipeline"
            className="group bg-white border border-slate-200 rounded-xl p-8 hover:shadow-lg hover:border-blue-300 transition-all"
          >
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
              <Users className="text-blue-600" size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">View Candidates</h3>
            <p className="text-sm text-slate-600">
              Manage and screen candidates through the pipeline
            </p>
            <div className="flex items-center gap-2 mt-4 text-blue-600 font-medium text-sm">
              Go to Pipeline <ArrowRight size={16} />
            </div>
          </Link>

          <Link
            href="/dashboard/jobs"
            className="group bg-white border border-slate-200 rounded-xl p-8 hover:shadow-lg hover:border-emerald-300 transition-all"
          >
            <div className="bg-emerald-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors">
              <Briefcase className="text-emerald-600" size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Manage Jobs</h3>
            <p className="text-sm text-slate-600">
              Create, edit, and publish job openings
            </p>
            <div className="flex items-center gap-2 mt-4 text-emerald-600 font-medium text-sm">
              Go to Jobs <ArrowRight size={16} />
            </div>
          </Link>
        </div>

        {/* RECENT CANDIDATES */}
        {/* UI improvement only – no logic change */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="text-xl font-bold text-slate-900">Recent Candidates</h2>
            <p className="text-sm text-slate-600 mt-1">Latest applicants and their status</p>
          </div>

          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-pulse">
                <div className="h-4 bg-slate-200 rounded w-1/4 mx-auto mb-4"></div>
                <p className="text-slate-500">Loading candidates...</p>
              </div>
            </div>
          ) : candidates.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="mx-auto mb-4 text-slate-300" size={48} />
              <p className="text-slate-600 font-medium">No candidates found</p>
              <p className="text-sm text-slate-500 mt-1">Candidates will appear here once they apply</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-200">
              {candidates.slice(0, 8).map((c) => (
                <div
                  key={c._id}
                  className="px-6 py-4 hover:bg-slate-50 transition-colors flex justify-between items-center"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">
                      {c.fullName || c.user?.name}
                    </p>
                    <p className="text-sm text-slate-600 mt-1">
                      {c.position}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-4 ${getStatusColor(
                      c.status
                    )}`}
                  >
                    {c.status}
                  </span>
                </div>
              ))}
            </div>
          )}

          {candidates.length > 8 && (
            <div className="border-t border-slate-200 px-6 py-4">
              <Link
                href="/pipeline"
                className="text-blue-600 hover:text-blue-700 font-medium text-sm inline-flex items-center gap-2"
              >
                View all candidates <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
