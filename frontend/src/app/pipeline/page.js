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

  /* ================= FETCH ================= */

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

      setCandidates(json.data.candidates);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setCandidates([]);
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
      console.error(error);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* HEADER */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent mb-2">
            Candidate Pipeline
          </h1>
          <p className="text-gray-600 text-lg">
            Screen resumes and manage interview flow
          </p>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-6 my-8">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-xl shadow-sm`}>
                    <stat.icon className="text-white" size={24} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* SEARCH */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, or position..."
              className="w-full pl-12 pr-4 py-4 border rounded-xl focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {loading ? (
            <div className="py-16 text-center">Loading...</div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center text-gray-600">
              No candidates found
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gradient-to-r from-teal-50 to-blue-50">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Candidate</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Position</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Email</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Resume</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Applied</th>
                  <th className="px-6 py-4 text-right font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => {
                  const stage = stages[c.status] || stages.DEFAULT;

                  return (
                    <tr key={c._id} className="border-t hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-gray-800">
                        {c.fullName}
                      </td>
                      <td className="px-6 py-4 text-gray-700">{c.position}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Mail size={16} className="text-teal-600" /> {c.email}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => window.open(c.resumeUrl, "_blank")}
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all shadow-sm hover:shadow-md"
                          title="View Resume"
                        >
                          <Eye size={16} />
                          <span className="font-medium">View</span>
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-4 py-2 rounded-full border text-sm font-semibold ${stage.color}`}
                        >
                          {stage.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Calendar size={16} className="text-teal-600" />
                          {new Date(c.appliedDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        {/* APPLIED */}
                        {c.status === "APPLIED" && (
                          <>
                            <button
                              onClick={() =>
                                updateStatus(c._id, "SHORTLISTED")
                              }
                              className="p-2 bg-green-100 rounded-lg hover:bg-green-200 transition-colors"
                              title="Shortlist"
                            >
                              <CheckCircle className="text-green-600" />
                            </button>
                            <button
                              onClick={() =>
                                updateStatus(c._id, "REJECTED")
                              }
                              className="p-2 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
                              title="Reject"
                            >
                              <XCircle className="text-red-600" />
                            </button>
                          </>
                        )}

                        {/* SHORTLISTED */}
                        {c.status === "SHORTLISTED" && (
                          <button
                            onClick={() => scheduleInterview(c._id)}
                            className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
                            title="Schedule Interview"
                          >
                            <CalendarPlus className="text-blue-600" />
                          </button>
                        )}

                        {/* INTERVIEW / IN PROGRESS */}
                        {["INTERVIEW_SCHEDULED", "IN_PROGRESS"].includes(
                          c.status
                        ) && (
                          <>
                            <button
                              onClick={() =>
                                updateStatus(c._id, "IN_PROGRESS")
                              }
                              className="p-2 bg-indigo-100 rounded-lg hover:bg-indigo-200 transition-colors"
                              title="Next Round"
                            >
                              <TrendingUp className="text-indigo-600" />
                            </button>
                            <button
                              onClick={() =>
                                updateStatus(c._id, "ON_HOLD")
                              }
                              className="p-2 bg-orange-100 rounded-lg hover:bg-orange-200 transition-colors"
                              title="On Hold"
                            >
                              <Calendar className="text-orange-600" />
                            </button>
                            <button
                              onClick={() =>
                                updateStatus(c._id, "REJECTED")
                              }
                              className="p-2 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
                              title="Reject"
                            >
                              <XCircle className="text-red-600" />
                            </button>
                          </>
                        )}

                        {/* ON HOLD */}
                        {c.status === "ON_HOLD" && (
                          <>
                            <button
                              onClick={() =>
                                updateStatus(c._id, "IN_PROGRESS")
                              }
                              className="p-2 bg-indigo-100 rounded-lg hover:bg-indigo-200 transition-colors"
                              title="Resume Process"
                            >
                              <TrendingUp className="text-indigo-600" />
                            </button>
                            <button
                              onClick={() =>
                                updateStatus(c._id, "SELECTED")
                              }
                              className="p-2 bg-green-100 rounded-lg hover:bg-green-200 transition-colors"
                              title="Select"
                            >
                              <CheckCircle className="text-green-600" />
                            </button>
                            <button
                              onClick={() =>
                                updateStatus(c._id, "REJECTED")
                              }
                              className="p-2 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
                              title="Reject"
                            >
                              <XCircle className="text-red-600" />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}