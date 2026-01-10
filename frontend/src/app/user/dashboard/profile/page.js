"use client";

import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  FileText,
  Briefcase,
  Upload,
  CheckCircle,
  Clock,
  XCircle,
  TrendingUp,
  Award,
  Calendar,
} from "lucide-react";
import { apiFetch } from "@/utils/api";
import { getToken } from "@/utils/auth";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  // ✅ CHANGE: Store FULL candidates array (not just first)
  // This is essential for accurate count calculations
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch logged-in user profile
        const userRes = await apiFetch("/auth/profile");
        console.log("User Profile Response:", userRes);
        if (userRes.success) {
          setUser(userRes.user);
        }

        // Fetch candidate profile(s) (resume, position, status, interview rounds)
        try {
          // ✅ CRITICAL: Disable caching to ensure fresh data for count calculations
          // Without cache: "no-store", 304 responses can cause stale data to display
          const candidateRes = await apiFetch("/candidates/me", {
            cache: "no-store",
          });
          console.log("Candidate Response:", candidateRes);
          // ✅ CHANGE: Store entire candidates array
          // Backend returns { success: true, candidates: [...] }
          if (
            candidateRes.success &&
            candidateRes.candidates &&
            Array.isArray(candidateRes.candidates)
          ) {
            // Store ALL candidates for count calculations
            setCandidates(candidateRes.candidates);
          }
        } catch (error) {
          console.log("No candidate data found (user hasn't applied yet)");
        }
      } catch (error) {
        console.error("Dashboard fetch error:", error);
        // Redirect to login if unauthorized
        if (error.message?.includes("401") || !getToken()) {
          window.location.href = "/user/login";
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleResumeUpload = async (file) => {
    if (!file) return;

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a PDF or DOC file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const token = getToken();

      const response = await fetch(`${API_BASE_URL}/auth/resume`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      console.log("Upload response:", data);

      if (data.success) {
        alert("Resume uploaded successfully!");

        // Refresh the page to show updated data
        window.location.reload();
      } else {
        alert(data.message || "Failed to upload resume");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload resume. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 flex items-center justify-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-200"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-slate-900 border-r-transparent border-b-transparent border-l-transparent absolute top-0 left-0"></div>
        </div>
      </div>
    );
  }

  // Stats (derive from full candidates array)
  // ✅ CHANGE: Count by filtering entire array, not just first candidate
  const appliedCount = candidates.filter((c) => c.status === "APPLIED").length;
  const shortlistedCount = candidates.filter(
    (c) => c.status === "SHORTLISTED"
  ).length;
  const rejectedCount = candidates.filter(
    (c) => c.status === "REJECTED"
  ).length;

  // Get resume URL from either user or first candidate
  // Use first candidate for profile details (name, position, etc.)
  const firstCandidate = candidates.length > 0 ? candidates[0] : null;
  const resumeUrl = user?.resumeUrl || firstCandidate?.resumeUrl;

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* 💻 DESKTOP DASHBOARD (lg and up) */}
      <div className="hidden lg:block max-w-[1400px] mx-auto px-8 py-12">
        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-5xl font-black text-gray-900 mb-3 tracking-tight">
              Welcome back,{" "}
              <span className="text-teal-600">
                {user?.name?.split(" ")[0] || "Candidate"}
              </span>
            </h1>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">
              Candidate Productivity Dashboard
            </p>
          </div>
          <div className="px-6 py-3 bg-white rounded-2xl border-2 border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-teal-600" />
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">
                Current Date
              </p>
              <p className="text-sm font-black text-gray-900">
                {new Date().toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-12">
          <StatCard
            title="Applications"
            value={appliedCount}
            icon={TrendingUp}
            gradient="from-blue-600 to-blue-400"
          />
          <StatCard
            title="Shortlisted"
            value={shortlistedCount}
            icon={Award}
            gradient="from-teal-600 to-teal-400"
          />
          <StatCard
            title="Rejected"
            value={rejectedCount}
            icon={XCircle}
            gradient="from-rose-600 to-rose-400"
          />
          <div className="bg-[#0b1c33] rounded-3xl p-6 text-white flex flex-col justify-between shadow-xl">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold uppercase tracking-widest opacity-60">
                Offer Status
              </span>
              <CheckCircle className="text-teal-400 w-5 h-5" />
            </div>
            <div>
              <p className="text-3xl font-black">0 Pending</p>
              <p className="text-[10px] opacity-40 uppercase tracking-tighter font-bold mt-1">
                Ready for next steps
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Left Sidebar Info */}
          <div className="space-y-8">
            {/* Profile Brief */}
            <div className="bg-white rounded-[2rem] p-8 border-2 border-slate-50 shadow-xl shadow-gray-200/50">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-teal-500 flex items-center justify-center shadow-lg">
                  <User className="text-white w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900">Profile</h3>
                  <p className="text-xs font-bold text-teal-600 uppercase tracking-widest">
                    General Info
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="truncate">
                    <p className="text-[10px] font-black text-gray-400 uppercase">
                      Email
                    </p>
                    <p className="text-sm font-bold text-gray-900 truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase">
                      Contact
                    </p>
                    <p className="text-sm font-bold text-gray-900">
                      {user?.phone || firstCandidate?.phone || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Resume Quick Action */}
            <div className="bg-teal-600 rounded-[2rem] p-8 text-white shadow-xl shadow-teal-500/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <FileText className="text-white w-6 h-6" />
                </div>
                <h3 className="text-lg font-black">Resume Hub</h3>
              </div>

              {resumeUrl ? (
                <div className="space-y-4">
                  <p className="text-sm text-teal-100 font-medium leading-relaxed">
                    Your professional profile is active and visible to
                    recruiters.
                  </p>
                  <a
                    href={resumeUrl}
                    target="_blank"
                    className="flex items-center justify-center gap-2 py-3 bg-white text-teal-700 rounded-xl font-black text-sm hover:scale-105 transition-transform"
                  >
                    <Upload className="w-4 h-4" /> View Current
                  </a>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-teal-100 font-medium">
                    No resume found. Uploading one increases hire probability by
                    80%.
                  </p>
                </div>
              )}

              <label className="mt-4 flex items-center justify-center gap-2 py-3 bg-[#0b1c33] text-white rounded-xl font-black text-sm cursor-pointer hover:bg-black transition-colors">
                <Upload className="w-4 h-4" />{" "}
                {uploading ? "Wait..." : "Upload New"}
                <input
                  type="file"
                  hidden
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleResumeUpload(e.target.files[0])}
                  disabled={uploading}
                />
              </label>
            </div>
          </div>

          {/* Main Feed: Applications */}
          <div className="col-span-2 space-y-6">
            <div className="bg-white rounded-[2.5rem] p-10 border-2 border-slate-50 shadow-xl shadow-gray-200/50">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                    <Briefcase className="text-blue-600 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-gray-900">
                      Application Status
                    </h3>
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                      Live Updates
                    </p>
                  </div>
                </div>
                <div className="bg-slate-100 px-4 py-1.5 rounded-full text-[10px] font-black text-slate-500 uppercase">
                  {candidates.length} Applications Total
                </div>
              </div>

              {candidates.length === 0 ? (
                <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                  <p className="text-gray-400 font-bold italic">
                    No active applications currently
                  </p>
                </div>
              ) : (
                <div className="space-y-8">
                  {candidates.map((app) => (
                    <div
                      key={app._id}
                      className="group p-6 bg-white border-2 border-slate-50 rounded-3xl hover:border-teal-100 hover:shadow-lg transition-all"
                    >
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <h4 className="text-xl font-black text-gray-900">
                            {app.job?.title || app.position}
                          </h4>
                          <div className="flex items-center gap-4">
                            <p className="text-sm font-bold text-teal-600">
                              {app.job?.company || "Global Hiring"}
                            </p>
                            <span className="w-1 h-1 rounded-full bg-slate-300" />
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                              Applied{" "}
                              {new Date(app.appliedDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <StatusBadge status={app.status} />
                      </div>

                      {app.interviewRounds?.length > 0 && (
                        <div className="mt-8 pt-6 border-t border-slate-100 flex gap-4 overflow-x-auto pb-2">
                          {app.interviewRounds.map((round, idx) => (
                            <div
                              key={idx}
                              className="shrink-0 bg-slate-50 p-4 rounded-2xl border border-slate-100 min-w-[200px]"
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <span className="w-6 h-6 rounded-lg bg-teal-500 text-white text-[10px] font-black flex items-center justify-center">
                                  {idx + 1}
                                </span>
                                <span className="text-xs font-black text-gray-900 uppercase tracking-tight truncate">
                                  {round.roundName}
                                </span>
                              </div>
                              <div className="text-[10px] font-bold text-teal-600 uppercase italic">
                                {round.roundStatus}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 📱 MOBILE DASHBOARD (md and below) */}
      <div className="lg:hidden px-6 py-10 space-y-8 bg-white min-h-screen">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">
              Hi, {user?.name?.split(" ")[0]}
            </h1>
            <p className="text-xs font-bold text-teal-600 uppercase tracking-widest mt-1">
              Dashboard Active
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center border-2 border-slate-50">
            <User className="text-gray-400" />
          </div>
        </div>

        {/* Mobile Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { val: appliedCount, label: "Applied", color: "bg-blue-500" },
            { val: shortlistedCount, label: "Picked", color: "bg-teal-500" },
            { val: rejectedCount, label: "Closed", color: "bg-slate-400" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-slate-50 p-4 rounded-3xl text-center border border-slate-100"
            >
              <p className="text-2xl font-black text-gray-900">{s.val}</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mt-1">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile Action Card - Resume */}
        <div className="bg-[#0b1c33] rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/20 rounded-full -mr-16 -mt-16 blur-2xl" />
          <div className="relative z-10 flex flex-col items-center text-center space-y-4">
            <div className="w-12 h-12 rounded-xl bg-teal-500 flex items-center justify-center shadow-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-black">Manage Resume</h3>
            <p className="text-xs text-gray-400 font-medium">
              Keep your credentials updated for better opportunities.
            </p>

            <div className="w-full pt-4 flex flex-col gap-3">
              {resumeUrl && (
                <a
                  href={resumeUrl}
                  target="_blank"
                  className="w-full py-4 bg-white/10 rounded-2xl font-bold text-sm border border-white/10"
                >
                  View Resume
                </a>
              )}
              <label className="w-full py-4 bg-teal-500 rounded-2xl font-black text-sm flex items-center justify-center gap-2">
                <Upload className="w-4 h-4" />{" "}
                {uploading ? "Wait..." : "Update Resume"}
                <input
                  type="file"
                  hidden
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleResumeUpload(e.target.files[0])}
                  disabled={uploading}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Mobile Feed: Applications */}
        <div className="space-y-6">
          <h3 className="text-2xl font-black text-gray-900 px-2 tracking-tight">
            Active Applications
          </h3>

          {candidates.length === 0 ? (
            <div className="bg-slate-50 rounded-3xl p-10 text-center border-2 border-dashed border-slate-200">
              <p className="text-sm font-bold text-gray-400 italic">
                No applications found.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {candidates.map((app) => (
                <div
                  key={app._id}
                  className="bg-white border-2 border-slate-50 rounded-[2rem] p-6 shadow-xl shadow-gray-100 space-y-4"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="min-w-0">
                      <h4 className="text-lg font-black text-gray-900 truncate tracking-tight">
                        {app.job?.title || app.position}
                      </h4>
                      <p className="text-sm font-bold text-teal-600 truncate">
                        {app.job?.company || "Hiring Co"}
                      </p>
                    </div>
                    <div className="shrink-0">
                      <div
                        className={`p-2 rounded-xl ${
                          app.status === "APPLIED"
                            ? "bg-blue-50 text-blue-600"
                            : "bg-teal-50 text-teal-600"
                        }`}
                      >
                        <Clock className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Status:{" "}
                      <span className="text-gray-900">{app.status}</span>
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">
                      {new Date(app.appliedDate).toLocaleDateString()}
                    </p>
                  </div>

                  {app.interviewRounds?.length > 0 && (
                    <div className="bg-slate-50 rounded-2xl p-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-[#0b1c33] text-white flex items-center justify-center text-[10px] font-black">
                          {app.interviewRounds.length}
                        </span>
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                          Rounds Active
                        </span>
                      </div>
                      <div className="text-teal-600 text-xs font-black uppercase tracking-tighter">
                        View Details
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Helper Components ---------- */

function StatCard({ title, value, icon: Icon, gradient, bgGradient }) {
  return (
    <div className="group relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      ></div>

      <div className="relative">
        <div
          className={`inline-flex p-2.5 rounded-xl bg-gradient-to-br ${gradient} mb-4 shadow-sm`}
        >
          <Icon className="text-white" size={20} />
        </div>
        <p className="text-sm text-slate-600 font-medium mb-1">{title}</p>
        <p className="text-3xl font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const statusConfig = {
    APPLIED: {
      color: "bg-blue-50 text-blue-700 border-blue-200",
      icon: Clock,
    },
    SHORTLISTED: {
      color: "bg-emerald-50 text-emerald-700 border-emerald-200",
      icon: Award,
    },
    INTERVIEW_SCHEDULED: {
      color: "bg-amber-50 text-amber-700 border-amber-200",
      icon: Calendar,
    },
    IN_PROGRESS: {
      color: "bg-violet-50 text-violet-700 border-violet-200",
      icon: TrendingUp,
    },
    SELECTED: {
      color: "bg-emerald-50 text-emerald-700 border-emerald-200",
      icon: CheckCircle,
    },
    REJECTED: {
      color: "bg-rose-50 text-rose-700 border-rose-200",
      icon: XCircle,
    },
  };

  const config = statusConfig[status] || {
    color: "bg-slate-50 text-slate-700 border-slate-200",
    icon: Clock,
  };

  const StatusIcon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border-2 ${config.color} shadow-sm`}
    >
      <StatusIcon className="w-4 h-4" />
      {status.replace(/_/g, " ")}
    </span>
  );
}
