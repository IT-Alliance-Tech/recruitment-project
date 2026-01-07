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

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

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
            cache: "no-store" 
          });
          console.log("Candidate Response:", candidateRes);
          // ✅ CHANGE: Store entire candidates array
          // Backend returns { success: true, candidates: [...] }
          if (candidateRes.success && candidateRes.candidates && Array.isArray(candidateRes.candidates)) {
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
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a PDF or DOC file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('resume', file);

      const token = getToken();
      
      const response = await fetch(`${API_BASE_URL}/auth/resume`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      console.log("Upload response:", data);

      if (data.success) {
        alert('Resume uploaded successfully!');
        
        // Refresh the page to show updated data
        window.location.reload();
      } else {
        alert(data.message || 'Failed to upload resume');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload resume. Please try again.');
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
  const shortlistedCount = candidates.filter((c) => c.status === "SHORTLISTED").length;
  const rejectedCount = candidates.filter((c) => c.status === "REJECTED").length;

  // Get resume URL from either user or first candidate
  // Use first candidate for profile details (name, position, etc.)
  const firstCandidate = candidates.length > 0 ? candidates[0] : null;
  const resumeUrl = user?.resumeUrl || firstCandidate?.resumeUrl;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        {/* Welcome Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Welcome back, <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">{user?.name || "User"}</span>
          </h1>
          <p className="text-slate-600">Track your applications and manage your profile</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          <StatCard 
            title="Applied Jobs" 
            value={appliedCount} 
            icon={TrendingUp}
            gradient="from-blue-500 to-cyan-600"
            bgGradient="from-blue-50 to-cyan-50"
          />
          <StatCard 
            title="Shortlisted" 
            value={shortlistedCount} 
            icon={Award}
            gradient="from-emerald-500 to-teal-600"
            bgGradient="from-emerald-50 to-teal-50"
          />
          <StatCard 
            title="Rejected" 
            value={rejectedCount} 
            icon={XCircle}
            gradient="from-rose-500 to-red-600"
            bgGradient="from-rose-50 to-red-50"
          />
        </div>

        {/* Profile & Resume */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* Profile Card */}
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl shadow-sm">
                <User className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                Profile Information
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Mail className="w-4 h-4 text-slate-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium mb-0.5">Email Address</p>
                  <p className="text-slate-900 font-medium">{user?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Phone className="w-4 h-4 text-slate-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium mb-0.5">Phone Number</p>
                  <p className="text-slate-900 font-medium">{user?.phone || firstCandidate?.phone || "Not provided"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Briefcase className="w-4 h-4 text-slate-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium mb-0.5">Applied Position</p>
                  <p className="text-slate-900 font-medium">{firstCandidate?.position || "Not applied yet"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Resume Card */}
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-sm">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                Resume
              </h2>
            </div>

            <div className="space-y-4">
              {resumeUrl ? (
                <div className="p-6 bg-emerald-50 border-2 border-emerald-200 rounded-xl">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-emerald-900 mb-1">Resume Uploaded</p>
                      <p className="text-xs text-emerald-700">Your resume is available for recruiters</p>
                    </div>
                  </div>
                  
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800 font-medium text-sm transition-colors"
                    onClick={() => {
                      console.log("Opening resume URL:", resumeUrl);
                    }}
                  >
                    <FileText className="w-4 h-4" />
                    View Uploaded Resume
                  </a>
                </div>
              ) : (
                <div className="p-6 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl text-center">
                  <div className="inline-flex p-3 bg-slate-100 rounded-xl mb-3">
                    <Upload className="w-6 h-6 text-slate-400" />
                  </div>
                  <p className="text-slate-600 text-sm font-medium mb-1">No resume uploaded yet</p>
                  <p className="text-slate-500 text-xs">Upload your resume to complete your profile</p>
                </div>
              )}

              <label className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all ${
                uploading 
                  ? 'bg-slate-400 text-white cursor-wait' 
                  : 'bg-emerald-600 text-white cursor-pointer hover:bg-emerald-700 hover:shadow-md active:scale-95'
              }`}>
                <Upload className="w-4 h-4" />
                {uploading ? 'Uploading...' : 'Upload / Replace Resume'}
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

        {/* Application Status */}
        <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl shadow-sm">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              Application Status
            </h2>
          </div>

          {!candidate ? (
            <div className="text-center py-16">
              <div className="inline-flex p-5 bg-slate-50 rounded-2xl mb-4">
                <Briefcase className="text-slate-400" size={48} />
              </div>
              <p className="text-slate-600 text-lg font-medium mb-1">No Active Applications</p>
              <p className="text-slate-500 text-sm">You haven't applied to any jobs yet</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl border border-slate-200">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg mb-1">
                    {candidate.position}
                  </h3>
                  <p className="text-sm text-slate-600 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    Applied on {new Date(candidate.appliedDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>

                <StatusBadge status={candidate.status} />
              </div>

              {/* Interview Rounds */}
              {candidate.interviewRounds?.length > 0 && (
                <div>
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-slate-600" />
                    Interview Rounds
                  </h3>
                  <div className="space-y-3">
                    {candidate.interviewRounds.map((round, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-5 border border-gray-200 rounded-xl hover:border-slate-300 hover:shadow-sm transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-slate-700 font-bold text-sm">
                            {index + 1}
                          </div>
                          <span className="font-semibold text-slate-900">{round.roundName}</span>
                        </div>
                        <span className="px-4 py-2 bg-slate-50 text-slate-700 rounded-lg text-sm font-medium border border-slate-200">
                          {round.roundStatus}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
      <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
      
      <div className="relative">
        <div className={`inline-flex p-2.5 rounded-xl bg-gradient-to-br ${gradient} mb-4 shadow-sm`}>
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
      {status.replace(/_/g, ' ')}
    </span>
  );
}