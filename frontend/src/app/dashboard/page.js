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
} from "lucide-react";

export default function Dashboard() {
  const router = useRouter();

  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= PAGINATION ================= */

  const ITEMS_PER_PAGE = 5;
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  /* ================= AUTH GUARD (RUN ONCE) ================= */

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin !== "true") {
      router.push("/login");
    } else {
      fetchCandidates(1);
    }
  }, []);

  /* ================= FETCH ================= */

  const fetchCandidates = async (currentPage) => {
    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:5000/api/candidates?page=${currentPage}&limit=${ITEMS_PER_PAGE}`
      );
      const json = await res.json();

      if (!json.success) {
        setCandidates([]);
        setTotalPages(1);
        setLoading(false);
        return;
      }

      setCandidates(json.data.candidates);
      setTotalPages(json.data.pagination.totalPages);
      setPage(json.data.pagination.currentPage);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setCandidates([]);
      setTotalPages(1);
      setLoading(false);
    }
  };

  /* ================= LOGOUT ================= */

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    router.push("/login");
  };

  /* ================= STATS (CURRENT PAGE VIEW) ================= */

  const stats = [
    {
      label: "Candidates (This Page)",
      value: candidates.length,
      icon: Users,
      color: "bg-blue-500",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      label: "Applied",
      value: candidates.filter((c) => c.status === "APPLIED").length,
      icon: TrendingUp,
      color: "bg-indigo-500",
      gradient: "from-indigo-500 to-indigo-600",
    },
    {
      label: "Shortlisted",
      value: candidates.filter((c) => c.status === "SHORTLISTED").length,
      icon: Calendar,
      color: "bg-amber-500",
      gradient: "from-amber-500 to-amber-600",
    },
    {
      label: "Selected",
      value: candidates.filter((c) => c.status === "SELECTED").length,
      icon: CheckCircle,
      color: "bg-green-500",
      gradient: "from-green-500 to-green-600",
    },
    {
      label: "Rejected",
      value: candidates.filter((c) => c.status === "REJECTED").length,
      icon: XCircle,
      color: "bg-red-500",
      gradient: "from-red-500 to-red-600",
    },
  ];

  /* ================= STATUS COLORS ================= */

  const getStatusColor = (status) => {
    const colors = {
      APPLIED: "bg-blue-100 text-blue-700 border-blue-200",
      SHORTLISTED: "bg-yellow-100 text-yellow-700 border-yellow-200",
      INTERVIEW_SCHEDULED: "bg-purple-100 text-purple-700 border-purple-200",
      IN_PROGRESS: "bg-indigo-100 text-indigo-700 border-indigo-200",
      ON_HOLD: "bg-orange-100 text-orange-700 border-orange-200",
      SELECTED: "bg-green-100 text-green-700 border-green-200",
      REJECTED: "bg-red-100 text-red-700 border-red-200",
    };
    return colors[status] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  /* ================= TOP JOBS ================= */

  const topJobs = [
    { title: "Frontend Developer", icon: Code, color: "from-blue-500 to-cyan-500" },
    { title: "Backend Developer", icon: Layers, color: "from-purple-500 to-pink-500" },
    { title: "Full Stack Developer", icon: Briefcase, color: "from-green-500 to-teal-500" },
    { title: "UI/UX Designer", icon: Palette, color: "from-orange-500 to-red-500" },
    { title: "QA Engineer", icon: Bug, color: "from-indigo-500 to-purple-500" },
  ];

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* HEADER - Enhanced with glassmorphism effect */}
      <div className="bg-white/80 backdrop-blur-xl shadow-xl border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent mb-1 drop-shadow-sm">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 text-base font-medium">
              Overview of recruitment activity and candidate status
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-0.5"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* STATS - Enhanced with better shadows and hover effects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="relative bg-white rounded-2xl p-6 border border-gray-200/60 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 overflow-hidden group"
            >
              {/* Animated background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-semibold uppercase tracking-wide">{stat.label}</p>
                  <p className="text-4xl font-bold bg-gradient-to-br from-gray-800 to-gray-600 bg-clip-text text-transparent mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className={`bg-gradient-to-br ${stat.gradient} p-4 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                  <stat.icon className="text-white" size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* TOP JOBS - Enhanced with better visual hierarchy */}
        <div className="bg-white rounded-3xl p-8 border border-gray-200/60 shadow-xl mb-10 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl shadow-lg">
              <Briefcase className="text-white" size={26} />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">
              Top Open Positions
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {topJobs.map((job, i) => (
              <div
                key={i}
                className="group relative overflow-hidden flex flex-col items-center justify-center p-8 border-2 border-gray-200 rounded-2xl hover:border-transparent transition-all duration-300 hover:shadow-xl cursor-pointer"
              >
                {/* Gradient border effect on hover */}
                <div className={`absolute inset-0 bg-gradient-to-r ${job.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}></div>
                <div className="absolute inset-0.5 bg-white rounded-2xl -z-10"></div>
                
                <div className={`p-3 rounded-2xl bg-gradient-to-r ${job.color} mb-4 shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110`}>
                  <job.icon className="text-white" size={20} />
                </div>
                <span className="text-gray-700 font-bold text-center text-sm group-hover:text-gray-900 transition-colors">
                  {job.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* QUICK ACTIONS - Enhanced with better gradient and animation */}
        <div className="relative bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 rounded-3xl p-8 border-2 border-teal-200/60 shadow-xl mb-10 hover:shadow-2xl transition-all duration-300 overflow-hidden">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-40 h-40 bg-teal-500 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="relative">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl shadow-lg">
                <Briefcase className="text-white" size={24} />
              </div>
              Quick Actions
            </h2>

            <Link
              href="/pipeline"
              className="group inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-teal-500 via-cyan-600 to-blue-600 hover:from-teal-600 hover:via-cyan-700 hover:to-blue-700 text-white font-bold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1"
            >
              <Briefcase className="w-6 h-6" />
              View All Candidates
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </div>
        </div>

        {/* RECENT CANDIDATES - Enhanced with better card design */}
        <div className="bg-white rounded-3xl p-8 border border-gray-200/60 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg">
              <Users className="text-white" size={26} />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">
              Recent Candidates
            </h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-teal-200"></div>
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-teal-600 border-r-transparent border-b-transparent border-l-transparent absolute top-0 left-0"></div>
              </div>
            </div>
          ) : candidates.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex p-6 bg-gray-100 rounded-3xl mb-4">
                <Users className="text-gray-400" size={56} />
              </div>
              <p className="text-gray-600 text-xl font-semibold">No candidates found</p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {candidates.map((c) => (
                  <div
                    key={c._id}
                    className="relative group flex items-center justify-between border-2 border-gray-200 rounded-2xl p-6 hover:border-teal-500 hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
                  >
                    {/* Hover gradient effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="relative flex-1">
                      <p className="font-bold text-gray-800 text-xl group-hover:text-teal-600 transition-colors mb-2">
                        {c.fullName}
                      </p>
                      <p className="text-sm text-gray-600 font-semibold">
                        {c.position}
                      </p>
                    </div>
                    
                    <span className={`relative px-5 py-2.5 rounded-xl border-2 text-sm font-bold shadow-sm group-hover:shadow-md transition-all ${getStatusColor(c.status)}`}>
                      {c.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                ))}
              </div>

              {/* PAGINATION - Enhanced with better styling */}
              <div className="flex justify-end gap-4 mt-10">
                <button
                  disabled={page === 1}
                  onClick={() => fetchCandidates(page - 1)}
                  className="px-6 py-3 border-2 border-gray-300 rounded-xl font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gradient-to-r hover:from-teal-500 hover:to-cyan-600 hover:text-white hover:border-transparent transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Previous
                </button>

                <span className="px-6 py-3 text-sm text-gray-700 font-bold bg-gradient-to-r from-gray-100 to-gray-50 rounded-xl border-2 border-gray-200 shadow-md">
                  Page {page} of {totalPages}
                </span>

                <button
                  disabled={page === totalPages}
                  onClick={() => fetchCandidates(page + 1)}
                  className="px-6 py-3 border-2 border-gray-300 rounded-xl font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gradient-to-r hover:from-teal-500 hover:to-cyan-600 hover:text-white hover:border-transparent transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}