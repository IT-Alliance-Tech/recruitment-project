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
  Download,
  Eye,
} from "lucide-react";
import { apiFetch } from "@/utils/api";
import { getToken } from "@/utils/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const userRes = await apiFetch("/auth/profile");
        console.log("User Profile Response:", userRes);
        if (userRes.success) {
          setUser(userRes.user);
        }

        try {
          const candidateRes = await apiFetch("/candidates/me", { 
            cache: "no-store" 
          });
          console.log("Candidate Response:", candidateRes);
          if (candidateRes.success && candidateRes.candidates && Array.isArray(candidateRes.candidates)) {
            setCandidates(candidateRes.candidates);
          }
        } catch (error) {
          console.log("No candidate data found (user hasn't applied yet)");
        }
      } catch (error) {
        console.error("Dashboard fetch error:", error);
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

    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a PDF or DOC file');
      return;
    }

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
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-purple-200"></div>
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-t-purple-600 border-r-transparent border-b-transparent border-l-transparent absolute top-0 left-0"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  const appliedCount = candidates.filter((c) => c.status === "APPLIED").length;
  const shortlistedCount = candidates.filter((c) => c.status === "SHORTLISTED").length;
  const rejectedCount = candidates.filter((c) => c.status === "REJECTED").length;

  const firstCandidate = candidates.length > 0 ? candidates[0] : null;
  const resumeUrl = user?.resumeUrl || firstCandidate?.resumeUrl;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-10">
        {/* Welcome Header */}
        <div className="mb-12 text-center">
          <div className="inline-block mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-lg opacity-50 animate-pulse"></div>
              <div className="relative bg-white p-4 rounded-full shadow-xl">
                <User className="w-12 h-12 text-purple-600" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 mb-3 animate-gradient">
            Welcome, {user?.name || "User"}!
          </h1>
          <p className="text-lg text-gray-600 font-medium">Your career journey starts here</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <StatCard 
            title="Applied Jobs" 
            value={appliedCount} 
            icon={TrendingUp}
            gradient="from-blue-500 via-cyan-500 to-teal-500"
            glowColor="blue"
          />
          <StatCard 
            title="Shortlisted" 
            value={shortlistedCount} 
            icon={Award}
            gradient="from-emerald-500 via-green-500 to-teal-500"
            glowColor="emerald"
          />
          <StatCard 
            title="Rejected" 
            value={rejectedCount} 
            icon={XCircle}
            gradient="from-rose-500 via-pink-500 to-red-500"
            glowColor="rose"
          />
        </div>

        {/* Profile & Resume Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Profile Card */}
          <div className="group relative bg-white/80 backdrop-blur-xl border-2 border-white rounded-3xl p-8 shadow-2xl hover:shadow-purple-200/50 transition-all duration-500 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative">
              <div className="flex items-center gap-4 mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl blur opacity-50"></div>
                  <div className="relative p-3 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl shadow-lg">
                    <User className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Profile Details
                </h2>
              </div>

              <div className="space-y-5">
                <div className="group/item relative overflow-hidden p-5 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-100 hover:border-purple-300 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5 translate-x-[-100%] group-hover/item:translate-x-0 transition-transform duration-500"></div>
                  <div className="relative flex items-center gap-4">
                    <div className="p-3 bg-white rounded-xl shadow-md">
                      <Mail className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-purple-600 font-bold uppercase tracking-wide mb-1">Email Address</p>
                      <p className="text-gray-900 font-semibold text-lg">{user?.email}</p>
                    </div>
                  </div>
                </div>

                <div className="group/item relative overflow-hidden p-5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border-2 border-indigo-100 hover:border-indigo-300 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-purple-600/5 translate-x-[-100%] group-hover/item:translate-x-0 transition-transform duration-500"></div>
                  <div className="relative flex items-center gap-4">
                    <div className="p-3 bg-white rounded-xl shadow-md">
                      <Phone className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-indigo-600 font-bold uppercase tracking-wide mb-1">Phone Number</p>
                      <p className="text-gray-900 font-semibold text-lg">{user?.phone || firstCandidate?.phone || "Not provided"}</p>
                    </div>
                  </div>
                </div>

                <div className="group/item relative overflow-hidden p-5 bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl border-2 border-pink-100 hover:border-pink-300 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600/5 to-rose-600/5 translate-x-[-100%] group-hover/item:translate-x-0 transition-transform duration-500"></div>
                  <div className="relative flex items-center gap-4">
                    <div className="p-3 bg-white rounded-xl shadow-md">
                      <Briefcase className="w-5 h-5 text-pink-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-pink-600 font-bold uppercase tracking-wide mb-1">Applied Position</p>
                      <p className="text-gray-900 font-semibold text-lg">{firstCandidate?.position || "Not applied yet"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Resume Card */}
          <div className="group relative bg-white/80 backdrop-blur-xl border-2 border-white rounded-3xl p-8 shadow-2xl hover:shadow-emerald-200/50 transition-all duration-500 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative">
              <div className="flex items-center gap-4 mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl blur opacity-50"></div>
                  <div className="relative p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Your Resume
                </h2>
              </div>

              <div className="space-y-6">
                {resumeUrl ? (
                  <div className="relative overflow-hidden p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-300 rounded-full blur-3xl opacity-20"></div>
                    <div className="relative flex items-start gap-4 mb-6">
                      <div className="p-3 bg-emerald-100 rounded-xl shadow-md">
                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-emerald-900 mb-1">Resume Successfully Uploaded</p>
                        <p className="text-xs text-emerald-700">Your profile is complete and visible to recruiters</p>
                      </div>
                    </div>
                    
                    <div className="relative flex gap-3">
                      <a
                        href={resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-emerald-500/50 hover:-translate-y-0.5"
                        onClick={() => {
                          console.log("Opening resume URL:", resumeUrl);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                        View Resume
                      </a>
                      <a
                        href={resumeUrl}
                        download
                        className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-white hover:bg-emerald-50 text-emerald-700 border-2 border-emerald-200 rounded-xl font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="relative overflow-hidden p-8 bg-gradient-to-br from-gray-50 to-slate-50 border-2 border-dashed border-gray-300 rounded-2xl text-center group/upload hover:border-purple-400 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover/upload:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative">
                      <div className="inline-flex p-4 bg-gradient-to-br from-gray-100 to-slate-100 rounded-2xl mb-4 group-hover/upload:scale-110 transition-transform duration-300">
                        <Upload className="w-8 h-8 text-gray-400 group-hover/upload:text-purple-600 transition-colors" />
                      </div>
                      <p className="text-gray-700 font-bold mb-2">No Resume Yet</p>
                      <p className="text-gray-500 text-sm">Upload your resume to unlock opportunities</p>
                    </div>
                  </div>
                )}

                <label className={`relative overflow-hidden w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl font-bold text-base transition-all duration-300 ${
                  uploading 
                    ? 'bg-gray-400 text-white cursor-wait' 
                    : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white cursor-pointer hover:from-emerald-700 hover:to-teal-700 shadow-lg hover:shadow-emerald-500/50 hover:-translate-y-1 active:scale-95'
                }`}>
                  <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity"></div>
                  <Upload className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">{uploading ? 'Uploading...' : 'Upload New Resume'}</span>
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
        </div>

        {/* Application Status */}
        <div className="relative bg-white/80 backdrop-blur-xl border-2 border-white rounded-3xl p-8 shadow-2xl hover:shadow-blue-200/50 transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative">
            <div className="flex items-center gap-4 mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl blur opacity-50"></div>
                <div className="relative p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Your Applications
              </h2>
            </div>

            {!candidates || candidates.length === 0 ? (
              <div className="text-center py-20">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full blur-xl opacity-20"></div>
                  <div className="relative p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl">
                    <Briefcase className="text-blue-500" size={64} />
                  </div>
                </div>
                <p className="text-gray-700 text-xl font-bold mb-2">No Applications Yet</p>
                <p className="text-gray-500">Start your journey by applying to exciting opportunities</p>
              </div>
            ) : (
              <div className="space-y-8">
                {candidates.map((candidate, index) => (
                  <div key={candidate._id || index} className="group/app">
                    <div className="relative overflow-hidden p-6 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-lg">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 translate-y-full group-hover/app:translate-y-0 transition-transform duration-500"></div>
                      
                      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 text-2xl mb-3 flex items-center gap-2">
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full animate-pulse"></div>
                            {candidate.position}
                          </h3>
                          <p className="text-sm text-gray-600 flex items-center gap-2 font-medium">
                            <Calendar className="w-4 h-4 text-blue-600" />
                            Applied {new Date(candidate.appliedDate).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </p>
                        </div>

                        <StatusBadge status={candidate.status} />
                      </div>
                    </div>

                    {candidate.interviewRounds?.length > 0 && (
                      <div className="mt-6 ml-4 pl-6 border-l-4 border-gradient-to-b from-blue-300 to-indigo-300">
                        <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-3 text-lg">
                          <Clock className="w-6 h-6 text-blue-600" />
                          Interview Journey
                        </h3>
                        <div className="space-y-4">
                          {candidate.interviewRounds.map((round, roundIndex) => (
                            <div
                              key={roundIndex}
                              className="group/round relative overflow-hidden flex items-center justify-between p-5 bg-white border-2 border-gray-200 rounded-xl hover:border-indigo-300 hover:shadow-md transition-all duration-300"
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 opacity-0 group-hover/round:opacity-100 transition-opacity duration-300"></div>
                              <div className="relative flex items-center gap-4">
                                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-lg shadow-lg">
                                  {roundIndex + 1}
                                </div>
                                <span className="font-bold text-gray-900 text-lg">{round.roundName}</span>
                              </div>
                              <span className="relative px-5 py-2 bg-gradient-to-r from-gray-50 to-slate-50 text-gray-700 rounded-xl text-sm font-bold border-2 border-gray-200 shadow-sm">
                                {round.roundStatus}
                              </span>
                            </div>
                          ))}
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

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}

/* ---------- Helper Components ---------- */

function StatCard({ title, value, icon: Icon, gradient, glowColor }) {
  return (
    <div className="group relative">
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-3xl blur-lg opacity-30 group-hover:opacity-60 transition-opacity duration-500`}></div>
      
      <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-7 border-2 border-white shadow-2xl hover:shadow-purple-200/50 transition-all duration-500 hover:-translate-y-3 overflow-hidden">
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-500`}></div>
        
        <div className="relative">
          <div className="relative inline-block mb-5">
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-2xl blur opacity-50`}></div>
            <div className={`relative p-3.5 rounded-2xl bg-gradient-to-br ${gradient} shadow-xl group-hover:scale-110 transition-transform duration-500`}>
              <Icon className="text-white" size={28} />
            </div>
          </div>
          
          <p className="text-sm text-gray-600 font-bold uppercase tracking-wide mb-2">{title}</p>
          <p className={`text-5xl font-extrabold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>{value}</p>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const statusConfig = {
    APPLIED: {
      gradient: "from-blue-500 to-cyan-600",
      bg: "from-blue-50 to-cyan-50",
      text: "text-blue-700",
      border: "border-blue-300",
      icon: Clock,
    },
    SHORTLISTED: {
      gradient: "from-emerald-500 to-teal-600",
      bg: "from-emerald-50 to-teal-50",
      text: "text-emerald-700",
      border: "border-emerald-300",
      icon: Award,
    },
    INTERVIEW_SCHEDULED: {
      gradient: "from-amber-500 to-orange-600",
      bg: "from-amber-50 to-orange-50",
      text: "text-amber-700",
      border: "border-amber-300",
      icon: Calendar,
    },
    IN_PROGRESS: {
      gradient: "from-violet-500 to-purple-600",
      bg: "from-violet-50 to-purple-50",
      text: "text-violet-700",
      border: "border-violet-300",
      icon: TrendingUp,
    },
    SELECTED: {
      gradient: "from-emerald-500 to-green-600",
      bg: "from-emerald-50 to-green-50",
      text: "text-emerald-700",
      border: "border-emerald-300",
      icon: CheckCircle,
    },
    REJECTED: {
      gradient: "from-rose-500 to-red-600",
      bg: "from-rose-50 to-red-50",
      text: "text-rose-700",
      border: "border-rose-300",
      icon: XCircle,
    },
  };

  const config = statusConfig[status] || {
    gradient: "from-gray-500 to-slate-600",
    bg: "from-gray-50 to-slate-50",
    text: "text-gray-700",
    border: "border-gray-300",
    icon: Clock,
  };

  const StatusIcon = config.icon;

  return (
    <div className="relative group/badge">
      <div className={`absolute inset-0 bg-gradient-to-r ${config.gradient} rounded-2xl blur opacity-30 group-hover/badge:opacity-50 transition-opacity`}></div>
      <span
        className={`relative inline-flex items-center gap-3 px-6 py-3 rounded-2xl text-sm font-bold border-2 ${config.border} bg-gradient-to-r ${config.bg} ${config.text} shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5`}
      >
        <StatusIcon className="w-5 h-5" />
        {status.replace(/_/g, ' ')}
      </span>
    </div>
  );
}