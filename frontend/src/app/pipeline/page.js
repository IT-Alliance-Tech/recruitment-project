"use client";

import { useEffect, useState } from "react";
import {
  Mail,
  Calendar,
  Search,
  Briefcase,
  Users,
  TrendingUp,
  CheckCircle,
  XCircle,
  CalendarPlus,
  Eye,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

/* ================= ATS STAGES ================= */

const stages = {
  APPLIED: {
    label: "Applied",
    color: "bg-blue-100 text-blue-700 border-blue-200",
  },
  SHORTLISTED: {
    label: "Shortlisted",
    color: "bg-yellow-100 text-yellow-700 border-yellow-200",
  },
  INTERVIEW_SCHEDULED: {
    label: "Interview Scheduled",
    color: "bg-purple-100 text-purple-700 border-purple-200",
  },
  IN_PROGRESS: {
    label: "In Progress",
    color: "bg-indigo-100 text-indigo-700 border-indigo-200",
  },
  ON_HOLD: {
    label: "On Hold",
    color: "bg-orange-100 text-orange-700 border-orange-200",
  },
  SELECTED: {
    label: "Selected",
    color: "bg-green-100 text-green-700 border-green-200",
  },
  REJECTED: {
    label: "Rejected",
    color: "bg-red-100 text-red-700 border-red-200",
  },
  DEFAULT: {
    label: "Applied",
    color: "bg-gray-100 text-gray-700 border-gray-200",
  },
};

export default function Pipeline() {
  const [candidates, setCandidates] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  /* ================= FETCH CANDIDATES ================= */

  const fetchCandidates = async () => {
    try {
      setLoading(true);

      const res = await fetch("https://recruitment-project-8tbs.onrender.com/api/candidates");
      const json = await res.json();

      if (!json.success) {
        setCandidates([]);
        return;
      }

      // ✅ FIXED: correct backend response path
      setCandidates(json.data?.candidates || []);
    } catch (error) {
      console.error("Fetch candidates error:", error);
      setCandidates([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  /* ================= ACTIONS ================= */

  const updateStatus = async (id, status) => {
    try {
      await fetch(`https://recruitment-project-8tbs.onrender.com/api/candidates/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      fetchCandidates();
    } catch (error) {
      console.error("Update status error:", error);
    }
  };

  const scheduleInterview = (id) => {
    window.location.href = `/schedule?candidateId=${id}`;
  };

  /* ================= SEARCH ================= */

  const filtered = candidates.filter(
    (c) =>
      c.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase()) ||
      c.position?.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= STATS ================= */

  const stats = [
    {
      label: "Candidates",
      value: candidates.length,
      icon: Users,
    },
    {
      label: "Interviews",
      value: candidates.filter((c) =>
        ["INTERVIEW_SCHEDULED", "IN_PROGRESS"].includes(c.status)
      ).length,
      icon: TrendingUp,
    },
    {
      label: "Selected",
      value: candidates.filter((c) => c.status === "SELECTED").length,
      icon: Briefcase,
    },
    {
      label: "Rejected",
      value: candidates.filter((c) => c.status === "REJECTED").length,
      icon: XCircle,
    },
  ];

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* 💻 DESKTOP VIEW (lg and up) */}
      <div className="hidden lg:block">
        <div className="bg-[#0b1c33] px-12 py-10 flex justify-between items-end text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl -mr-48 -mt-48" />
          <div className="relative z-10 space-y-2">
            <span className="text-[10px] font-black text-teal-400 uppercase tracking-[0.3em]">
              Operational Flow
            </span>
            <h1 className="text-4xl font-black tracking-tighter uppercase">
              Candidate Pipeline
            </h1>
            <p className="text-gray-400 font-bold text-xs uppercase tracking-widest leading-relaxed">
              Systematic resume screening & talent lifecycle management
            </p>
          </div>

          <div className="relative z-10 flex gap-10">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="text-right border-r-2 border-white/10 pr-10 last:border-0 last:pr-0"
              >
                <p className="text-2xl font-black">{stat.value}</p>
                <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-12 py-12">
          {/* Search Header */}
          <div className="bg-white rounded-[2.5rem] p-4 border-2 border-slate-50 shadow-xl shadow-gray-200/50 mb-12 flex items-center gap-6">
            <div className="flex-1 relative">
              <Search
                className="absolute left-6 top-1/2 -translate-y-1/2 text-teal-500"
                size={20}
              />
              <input
                type="text"
                placeholder="Search candidates by name, position or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-16 pr-8 py-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-teal-500 focus:bg-white outline-none transition-all font-bold text-gray-900 placeholder:text-slate-400"
              />
            </div>
            <div className="flex items-center gap-3 pr-6">
              <div className="w-2 h-2 rounded-full bg-teal-500 animate-ping" />
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Active Search Filter
              </p>
            </div>
          </div>

          {/* Matrix Table */}
          <div className="bg-white rounded-[3rem] border-2 border-slate-50 shadow-2xl shadow-gray-200/50 overflow-hidden">
            {loading ? (
              <div className="p-32 text-center text-gray-400 font-black uppercase tracking-[0.4em] animate-pulse">
                Syncing Matrix...
              </div>
            ) : (
              <table className="w-full text-left">
                <thead className="bg-[#0b1c33] text-white">
                  <tr>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest">
                      Candidate
                    </th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest">
                      Target Role
                    </th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest">
                      Status Matrix
                    </th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-center">
                      Resume
                    </th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-right">
                      Strategic Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-slate-50">
                  {filtered.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="p-32 text-center text-gray-300 font-black uppercase tracking-widest"
                      >
                        Discovery Void: No results match criteria
                      </td>
                    </tr>
                  ) : (
                    filtered.map((c) => {
                      const stage = stages[c.status] || stages.DEFAULT;
                      return (
                        <tr
                          key={c._id}
                          className="hover:bg-teal-50/30 transition-all group"
                        >
                          <td className="px-10 py-6">
                            <p className="font-black text-gray-900 uppercase tracking-tight">
                              {c.fullName}
                            </p>
                            <p className="text-[10px] font-bold text-gray-400 lowercase">
                              {c.email}
                            </p>
                          </td>
                          <td className="px-10 py-6 font-black text-gray-600 uppercase text-xs tracking-widest">
                            {c.position}
                          </td>
                          <td className="px-10 py-6">
                            <span
                              className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border-2 ${stage.color}`}
                            >
                              {stage.label}
                            </span>
                          </td>
                          <td className="px-10 py-6 text-center">
                            <button
                              disabled={!c.resumeUrl}
                              onClick={() =>
                                c.resumeUrl &&
                                window.open(c.resumeUrl, "_blank")
                              }
                              className="w-12 h-12 rounded-xl bg-slate-50 text-slate-400 hover:bg-teal-500 hover:text-white transition-all inline-flex items-center justify-center disabled:opacity-20"
                            >
                              <Eye size={20} />
                            </button>
                          </td>
                          <td className="px-10 py-6 text-right">
                            <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                              {c.status === "APPLIED" && (
                                <>
                                  <button
                                    onClick={() =>
                                      updateStatus(c._id, "SHORTLISTED")
                                    }
                                    className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center shadow-lg shadow-emerald-500/10"
                                  >
                                    <CheckCircle size={20} />
                                  </button>
                                  <button
                                    onClick={() =>
                                      updateStatus(c._id, "REJECTED")
                                    }
                                    className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white transition-all flex items-center justify-center shadow-lg shadow-rose-500/10"
                                  >
                                    <XCircle size={20} />
                                  </button>
                                </>
                              )}
                              {c.status === "SHORTLISTED" && (
                                <button
                                  onClick={() => scheduleInterview(c._id)}
                                  className="px-6 py-3 bg-purple-50 text-purple-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all flex items-center gap-2"
                                >
                                  <CalendarPlus size={16} /> Schedule
                                </button>
                              )}
                              <button className="w-10 h-10 rounded-lg text-slate-300 hover:text-teal-500 transition-all flex items-center justify-center">
                                <ChevronRight size={20} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* 📱 MOBILE VIEW (md and below) */}
      <div className="lg:hidden">
        <div className="bg-[#0b1c33] px-6 pt-16 pb-32 rounded-b-[4rem] relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="relative z-10 space-y-2">
            <p className="text-[10px] font-black text-teal-400 uppercase tracking-[0.4em]">
              Operational Area
            </p>
            <h1 className="text-4xl font-black text-white tracking-tighter uppercase">
              ATS <br /> Pipeline.
            </h1>
          </div>
        </div>

        <div className="px-6 -mt-16 space-y-8 pb-32 relative z-20">
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-[2rem] shadow-2xl shadow-gray-200/50 border border-slate-50 text-center space-y-1 active:scale-95 transition-all"
              >
                <p className="text-3xl font-black text-gray-900">
                  {stat.value}
                </p>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          <div className="relative bg-white rounded-[3rem] p-4 shadow-2xl shadow-gray-200/50 border border-slate-50">
            <Search
              className="absolute left-10 top-1/2 -translate-y-1/2 text-teal-500"
              size={20}
            />
            <input
              type="text"
              placeholder="Find Candidate..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-20 pr-8 py-5 bg-slate-50 rounded-[2rem] border-2 border-transparent focus:border-teal-500 focus:bg-white outline-none font-bold text-gray-900 transition-all placeholder:text-slate-400"
            />
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-black text-gray-900 px-4 tracking-tight uppercase">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {loading ? (
                <div className="p-10 text-center text-xs font-black text-gray-300 uppercase animate-pulse tracking-widest">
                  Loading Pipeline...
                </div>
              ) : filtered.length === 0 ? (
                <div className="p-20 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-100 text-[10px] font-black text-gray-300 uppercase tracking-widest">
                  No matching talent found
                </div>
              ) : (
                filtered.map((c) => {
                  const stage = stages[c.status] || stages.DEFAULT;
                  return (
                    <div
                      key={c._id}
                      className="bg-white rounded-[2.5rem] p-8 border border-slate-50 shadow-xl shadow-gray-200/50 space-y-8"
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">
                            {c.fullName}
                          </h3>
                          <p className="text-[10px] font-black text-teal-600 uppercase tracking-widest">
                            {c.position}
                          </p>
                          <p className="text-[9px] font-medium text-gray-400 italic">
                            {c.email}
                          </p>
                        </div>
                        <span
                          className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest border-2 ${stage.color}`}
                        >
                          {stage.label}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 pt-8 border-t border-slate-50">
                        <button
                          onClick={() =>
                            c.resumeUrl && window.open(c.resumeUrl, "_blank")
                          }
                          className="flex-1 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center justify-center gap-2 active:bg-slate-100 transition-colors"
                        >
                          <Eye size={16} /> Resume
                        </button>

                        {c.status === "APPLIED" && (
                          <div className="flex gap-3">
                            <button
                              onClick={() => updateStatus(c._id, "SHORTLISTED")}
                              className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shadow-lg shadow-emerald-500/10 active:scale-95 transition-all"
                            >
                              <CheckCircle size={22} />
                            </button>
                            <button
                              onClick={() => updateStatus(c._id, "REJECTED")}
                              className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center shadow-lg shadow-rose-500/10 active:scale-95 transition-all"
                            >
                              <XCircle size={22} />
                            </button>
                          </div>
                        )}

                        {c.status === "SHORTLISTED" && (
                          <button
                            onClick={() => scheduleInterview(c._id)}
                            className="flex-[2] py-4 bg-purple-50 text-purple-600 border border-purple-100 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 active:bg-purple-100 shadow-xl shadow-purple-500/10 transition-all font-black"
                          >
                            <CalendarPlus size={16} /> Interview
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
