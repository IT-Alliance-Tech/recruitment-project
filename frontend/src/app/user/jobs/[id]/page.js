"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiFetch } from "@/utils/api";
import {
  Building2,
  MapPin,
  Briefcase,
  Clock,
  Users,
  FileText,
  CheckCircle,
  Upload,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

export default function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobRes = await apiFetch(`/jobs/${id}`);
        if (jobRes.success) {
          setJob(jobRes.job || jobRes.data);
        }

        // ✅ CRITICAL: Disable cache to ensure fresh application status is displayed
        const candidateRes = await apiFetch("/candidates/me", { cache: 'no-store' });
        // ✅ UPDATE: Backend now returns { success, candidates: [...] }
        if (candidateRes.success && candidateRes.candidates && candidateRes.candidates.length > 0) {
          // Use first candidate (user can have multiple applications)
          setCandidate(candidateRes.candidates[0]);
        }
      } catch (error) {
        console.error("Job details fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const alreadyApplied = candidate?.job && candidate.job._id === id;

  const handleApply = async () => {
    setApplying(true);
    setMessage("");

    try {
      const res = await apiFetch(`/candidates/apply-job/${id}`, {
        method: "POST",
      });

      if (res.success) {
        setMessage("Job applied successfully ✅");
        // Update local state so button disables immediately
        setCandidate({
          ...candidate,
          job: { _id: id },
          status: "APPLIED",
        });
      } else {
        setMessage(res.message || "Failed to apply");
      }
    } catch (error) {
      setMessage("Something went wrong");
    } finally {
      setApplying(false);
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

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex p-5 bg-rose-50 rounded-2xl mb-4">
            <AlertCircle className="text-rose-500" size={48} />
          </div>
          <p className="text-rose-600 text-lg font-semibold">Job not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-10">
        {/* Back Button */}
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium mb-6 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Jobs
        </Link>

        {/* Job Header Card */}
        <div className="bg-white border border-gray-100 rounded-2xl p-8 md:p-10 shadow-sm mb-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg">
              <Briefcase className="text-white" size={32} />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                {job.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-slate-600">
                <span className="flex items-center gap-1.5 font-medium">
                  <Building2 size={18} />
                  {job.company}
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <MapPin size={18} />
                  {job.location}
                </span>
              </div>
            </div>
          </div>

          {/* Job Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <Briefcase className="w-5 h-5 text-slate-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Employment Type</p>
                <p className="text-slate-900 font-semibold">{job.employmentType}</p>
              </div>
            </div>

            {job.experience && (
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Clock className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Experience</p>
                  <p className="text-slate-900 font-semibold">{job.experience}</p>
                </div>
              </div>
            )}

            {job.openings && (
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Users className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Openings</p>
                  <p className="text-slate-900 font-semibold">{job.openings} positions</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Job Description */}
        <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <FileText className="w-6 h-6 text-slate-600" />
            Job Description
          </h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 leading-relaxed whitespace-pre-line">
              {job.description}
            </p>
          </div>
        </div>

        {/* Resume Section */}
        <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <FileText className="w-6 h-6 text-slate-600" />
            Your Resume
          </h2>

          {candidate?.resumeUrl ? (
            <div className="p-6 bg-emerald-50 border-2 border-emerald-200 rounded-xl">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-emerald-900 mb-1">
                    Resume Uploaded
                  </p>
                  <p className="text-xs text-emerald-700">
                    Your resume will be sent with your application
                  </p>
                </div>
              </div>
              <a
                href={candidate.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800 font-medium text-sm transition-colors"
              >
                <FileText className="w-4 h-4" />
                View Uploaded Resume
              </a>
            </div>
          ) : (
            <div className="p-6 bg-amber-50 border-2 border-amber-200 rounded-xl">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-amber-900 mb-1">
                    No Resume Found
                  </p>
                  <p className="text-xs text-amber-700">
                    Please upload your resume from the Resume Upload page before applying
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Apply Section */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">
                Ready to Apply?
              </h3>
              <p className="text-slate-600 text-sm">
                {alreadyApplied
                  ? "You have already applied for this position"
                  : "Submit your application and join our team"}
              </p>
            </div>

            <button
              onClick={handleApply}
              disabled={alreadyApplied || applying}
              className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm transition-all shadow-lg whitespace-nowrap ${
                alreadyApplied
                  ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-0.5"
              }`}
            >
              {alreadyApplied ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Already Applied
                </>
              ) : applying ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  Applying...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  Apply Now
                </>
              )}
            </button>
          </div>

          {message && (
            <div className="mt-4 p-4 bg-white border border-emerald-200 rounded-xl">
              <p className="text-emerald-700 font-medium text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                {message}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}