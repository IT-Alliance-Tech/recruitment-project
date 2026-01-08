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

      const res = await fetch("http://localhost:5000/api/candidates");
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
      await fetch(`http://localhost:5000/api/candidates/${id}/status`, {
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
      label: "Total Candidates",
      value: candidates.length,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      label: "Active Interviews",
      value: candidates.filter((c) =>
        ["INTERVIEW_SCHEDULED", "IN_PROGRESS"].includes(c.status)
      ).length,
      icon: TrendingUp,
      color: "bg-purple-500",
    },
    {
      label: "Selected",
      value: candidates.filter((c) => c.status === "SELECTED").length,
      icon: Briefcase,
      color: "bg-green-500",
    },
  ];

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      {/* HEADER */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Candidate Pipeline
          </h1>
          <p className="text-slate-600">
            Screen resumes and manage the recruitment flow
          </p>

          {/* STATS */}
          {/* UI improvement only – no logic change */}
          <div className="grid grid-cols-3 gap-6 mt-8">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-6 border border-slate-200 transition-all hover:shadow-md"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <stat.icon className="text-white" size={20} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* SEARCH */}
          {/* UI improvement only – no logic change */}
          <div className="relative mt-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, or position..."
              className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-900 placeholder:text-slate-500 transition-all"
            />
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="py-20 text-center">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-slate-200 rounded w-1/4 mx-auto"></div>
                <p className="text-slate-500">Loading candidates...</p>
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center">
              <Users className="mx-auto mb-4 text-slate-300" size={48} />
              <p className="text-slate-600 font-medium text-lg">No candidates found</p>
              <p className="text-slate-500 text-sm mt-2">Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wide">
                      Candidate
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wide">
                      Position
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wide">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wide">
                      Resume
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wide">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wide">
                      Applied Date
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-slate-700 uppercase tracking-wide">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200">
                  {filtered.map((c) => {
                    const stage = stages[c.status] || stages.DEFAULT;

                    return (
                      <tr key={c._id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-semibold text-slate-900">
                          {c.fullName}
                        </td>
                        <td className="px-6 py-4 text-slate-700">{c.position}</td>
                        <td className="px-6 py-4 flex items-center gap-2 text-slate-700">
                          <Mail size={16} className="text-slate-400" />
                          <span className="text-sm">{c.email}</span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            disabled={!c.resumeUrl}
                            onClick={() =>
                              c.resumeUrl && window.open(c.resumeUrl, "_blank")
                            }
                            className="inline-flex items-center gap-2 px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Eye size={16} />
                            View
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full border text-xs font-bold whitespace-nowrap ${stage.color}`}
                          >
                            {stage.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-700 text-sm">
                          {c.appliedDate
                            ? new Date(c.appliedDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })
                            : "—"}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {c.status === "APPLIED" && (
                              <>
                                <button
                                  onClick={() =>
                                    updateStatus(c._id, "SHORTLISTED")
                                  }
                                  className="p-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors"
                                  title="Shortlist candidate"
                                >
                                  <CheckCircle size={18} />
                                </button>
                                <button
                                  onClick={() =>
                                    updateStatus(c._id, "REJECTED")
                                  }
                                  className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
                                  title="Reject candidate"
                                >
                                  <XCircle size={18} />
                                </button>
                              </>
                            )}

                            {c.status === "SHORTLISTED" && (
                              <button
                                onClick={() => scheduleInterview(c._id)}
                                className="p-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition-colors"
                                title="Schedule interview"
                              >
                                <CalendarPlus size={18} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
