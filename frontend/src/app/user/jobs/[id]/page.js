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
        const candidateRes = await apiFetch("/candidates/me", {
          cache: "no-store",
        });
        // ✅ UPDATE: Backend now returns { success, candidates: [...] }
        if (
          candidateRes.success &&
          candidateRes.candidates &&
          candidateRes.candidates.length > 0
        ) {
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
    <div className="min-h-screen bg-[#f8fafc]">
      {/* 💻 DESKTOP VIEW (lg and up) */}
      <div className="hidden lg:block max-w-[1200px] mx-auto px-8 py-12">
        <Link
          href="/user/jobs"
          className="inline-flex items-center gap-2 text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-8 hover:text-teal-600 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Career Board
        </Link>

        <div className="grid grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="col-span-2 space-y-10">
            <div className="bg-white rounded-[3rem] p-12 border-2 border-slate-50 shadow-xl shadow-gray-200/50">
              <div className="flex items-start gap-8 mb-10">
                <div className="w-24 h-24 rounded-3xl bg-teal-500 flex items-center justify-center shadow-2xl shadow-teal-500/20">
                  <Briefcase className="text-white" size={40} />
                </div>
                <div>
                  <h1 className="text-5xl font-black text-gray-900 mb-3 tracking-tight">
                    {job.title}
                  </h1>
                  <div className="flex items-center gap-6">
                    <p className="text-sm font-black text-teal-600 uppercase tracking-widest">
                      {job.company}
                    </p>
                    <span className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
                    <div className="flex items-center gap-2 text-gray-400 font-bold text-xs uppercase tracking-widest">
                      <MapPin size={16} /> {job.location}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 py-8 border-y-2 border-slate-50">
                {[
                  {
                    label: "Employment",
                    val: job.employmentType,
                    icon: Briefcase,
                  },
                  {
                    label: "Experience",
                    val: job.experience || "Not Specified",
                    icon: Clock,
                  },
                  {
                    label: "Openings",
                    val: `${job.openings || 1} Positions`,
                    icon: Users,
                  },
                ].map((feat) => (
                  <div key={feat.label} className="space-y-1">
                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-tighter">
                      <feat.icon size={12} /> {feat.label}
                    </div>
                    <p className="text-sm font-black text-gray-900">
                      {feat.val}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3">
                  <FileText className="text-teal-500" size={24} />
                  Role Overview
                </h2>
                <p className="text-gray-600 leading-[1.8] font-medium whitespace-pre-line text-lg">
                  {job.description}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar Actions */}
          <div className="space-y-8">
            {/* Resume Card */}
            <div className="bg-[#0b1c33] rounded-[2.5rem] p-8 text-white shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center border border-teal-500/30">
                  <FileText className="text-teal-400" size={24} />
                </div>
                <h3 className="text-xl font-black">Your Resume</h3>
              </div>

              {candidate?.resumeUrl ? (
                <div className="space-y-6">
                  <p className="text-sm text-gray-400 font-medium">
                    Verified resume is attached to your candidate profile.
                  </p>
                  <a
                    href={candidate.resumeUrl}
                    target="_blank"
                    className="flex items-center justify-center gap-2 py-3 bg-white/10 rounded-2xl text-teal-400 border border-teal-500/20 font-black text-sm hover:bg-white/20 transition-colors"
                  >
                    <CheckCircle size={18} /> View Verified
                  </a>
                </div>
              ) : (
                <div className="p-4 bg-rose-500/10 border-2 border-rose-500/20 rounded-2xl">
                  <p className="text-xs text-rose-300 font-bold uppercase tracking-widest text-center">
                    Resume Missing
                  </p>
                </div>
              )}
            </div>

            {/* Apply Card */}
            <div className="bg-white rounded-[2.5rem] p-10 border-2 border-slate-50 shadow-xl shadow-gray-200/50 text-center">
              <h3 className="text-2xl font-black text-gray-900 mb-3">
                Interested?
              </h3>
              <p className="text-sm text-gray-400 font-bold mb-8 uppercase tracking-widest">
                Submit Application
              </p>

              <button
                onClick={handleApply}
                disabled={alreadyApplied || applying}
                className={`w-full py-5 rounded-[2rem] font-black text-lg transition-all shadow-xl flex items-center justify-center gap-3 ${
                  alreadyApplied
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed border-2 border-slate-50"
                    : "bg-teal-500 text-white hover:bg-teal-600 shadow-teal-500/20 hover:scale-105"
                }`}
              >
                {alreadyApplied ? (
                  <CheckCircle size={20} />
                ) : (
                  <Upload size={20} />
                )}
                {alreadyApplied
                  ? "Applied"
                  : applying
                  ? "Processing..."
                  : "Apply Now"}
              </button>

              {message && (
                <p className="mt-4 text-[10px] font-black text-teal-600 uppercase tracking-widest animate-pulse">
                  {message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 📱 MOBILE VIEW (md and below) */}
      <div className="lg:hidden min-h-screen bg-white">
        <div className="bg-[#0b1c33] px-6 pt-12 pb-24 rounded-b-[4rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full -mr-32 -mt-32 blur-3xl" />

          <Link
            href="/user/jobs"
            className="inline-flex items-center gap-2 text-teal-500/50 font-black text-[10px] uppercase tracking-widest mb-8"
          >
            <ArrowLeft size={14} /> Back
          </Link>

          <div className="relative z-10 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-teal-500 flex items-center justify-center shadow-2xl border-2 border-white/10">
              <Briefcase size={28} className="text-white" />
            </div>
            <h1 className="text-3xl font-black text-white leading-tight tracking-tight">
              {job.title}
            </h1>
            <div className="flex items-center gap-4">
              <p className="text-sm font-bold text-teal-400 uppercase tracking-widest">
                {job.company}
              </p>
              <div className="flex items-center gap-1.5 text-gray-500 font-black text-[10px] uppercase">
                <MapPin size={12} /> {job.location}
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 -mt-12 space-y-8 pb-32">
          {/* Mobile Stats Card */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-gray-200 border border-gray-50 flex justify-between text-center">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-gray-300 uppercase tracking-tighter">
                Type
              </p>
              <p className="text-xs font-black text-gray-900">
                {job.employmentType}
              </p>
            </div>
            <div className="w-px bg-slate-100" />
            <div className="space-y-1">
              <p className="text-[10px] font-black text-gray-300 uppercase tracking-tighter">
                Level
              </p>
              <p className="text-xs font-black text-gray-900">
                {job.experience || "Entry"}
              </p>
            </div>
            <div className="w-px bg-slate-100" />
            <div className="space-y-1">
              <p className="text-[10px] font-black text-gray-300 uppercase tracking-tighter">
                Slots
              </p>
              <p className="text-xs font-black text-gray-900">
                {job.openings || 1}
              </p>
            </div>
          </div>

          {/* Role Content */}
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-gray-900 px-2 tracking-tight">
              Role Description
            </h2>
            <div className="bg-slate-50 rounded-[2rem] p-8">
              <p className="text-sm text-gray-600 leading-relaxed font-medium whitespace-pre-line">
                {job.description}
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Sticky CTA */}
        <div className="fixed bottom-0 left-0 w-full p-6 bg-white/80 backdrop-blur-xl border-t border-slate-100 z-50">
          <button
            onClick={handleApply}
            disabled={alreadyApplied || applying}
            className={`w-full py-5 rounded-[2rem] font-black text-xl shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-3 ${
              alreadyApplied
                ? "bg-slate-100 text-slate-400"
                : "bg-teal-500 text-white shadow-teal-500/30"
            }`}
          >
            {alreadyApplied ? <CheckCircle size={22} /> : <Upload size={22} />}
            {alreadyApplied
              ? "Already Applied"
              : applying
              ? "Sending..."
              : "Apply Now"}
          </button>
          {message && (
            <p className="text-center text-[10px] font-black text-teal-600 uppercase tracking-widest mt-3">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
