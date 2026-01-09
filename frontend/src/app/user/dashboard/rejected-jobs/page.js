"use client";

import { useEffect, useState } from "react";
import { AlertCircle, Building2, MapPin, Briefcase } from "lucide-react";
import { apiFetch } from "@/utils/api";

export default function RejectedJobsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ FIX: Use /candidates/me to get user's candidate profile from Candidate model
    // The Candidate model is the source of truth for applications (NOT Application model)
    // ✅ CRITICAL: Disable cache to ensure fresh data is always displayed
    apiFetch("/candidates/me", { cache: "no-store" })
      .then((res) => {
        if (res.success && res.candidates && Array.isArray(res.candidates)) {
          // ✅ UPDATE: Backend now returns candidates array
          // Filter to show only REJECTED jobs
          const rejectedJobs = res.candidates.filter(
            (candidate) => candidate.status === "REJECTED" && candidate.job
          );
          setApplications(rejectedJobs);
        } else {
          setApplications([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch rejected applications:", err);
        setApplications([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-slate-200 rounded w-1/4 animate-pulse"></div>
        <div className="grid grid-cols-1 gap-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-32 bg-slate-200 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase mb-2">
            Decision <span className="text-red-600">Archive.</span>
          </h1>
          <p className="text-slate-500 font-medium italic">
            "Every setback is a setup for a comeback." — Keep pushing forward.
          </p>
        </div>
      </div>

      {/* 💻 DESKTOP VIEW (lg and up) */}
      <div className="hidden lg:block">
        {applications.length === 0 ? (
          <div className="py-32 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200 text-center space-y-6">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-xl">
              <Briefcase size={40} className="text-slate-300" />
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-black text-slate-900 uppercase tracking-tighter">
                Clear Registry
              </p>
              <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">
                Optimism is the only way forward
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {applications.map((app) => (
              <div
                key={app._id}
                className="group bg-white rounded-[2.5rem] p-10 border-2 border-transparent hover:border-red-500 transition-all duration-500 shadow-2xl shadow-slate-200/50 flex items-center justify-between"
              >
                <div className="flex items-center gap-8">
                  <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:scale-110 group-hover:bg-red-50 group-hover:text-red-500 transition-all duration-500">
                    <Building2 size={32} />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase leading-none">
                      {app.job?.title}
                    </h2>
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                        {app.job?.company}
                      </span>
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                      <div className="flex items-center gap-1.5 text-xs font-black text-slate-400 uppercase tracking-widest">
                        <MapPin size={12} /> {app.job?.location}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="px-6 py-2 bg-red-50 text-red-600 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border-2 border-red-100 italic">
                    Finalized
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 📱 MOBILE VIEW (md and below) */}
      <div className="lg:hidden">
        {applications.length === 0 ? (
          <div className="py-20 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200 text-center space-y-4">
            <Briefcase size={32} className="mx-auto text-slate-200" />
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Registry Entry: Null
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {applications.map((app) => (
              <div
                key={app._id}
                className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-50 space-y-6"
              >
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                    <Building2 size={24} />
                  </div>
                  <span className="px-4 py-1.5 bg-red-50 text-red-600 rounded-full text-[8px] font-black uppercase tracking-widest border border-red-100">
                    Finalized
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase leading-none">
                    {app.job?.title}
                  </h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest truncate">
                    {app.job?.company}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-50 flex items-center gap-2">
                  <AlertCircle size={14} className="text-red-500" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide italic">
                    Protocol Terminated
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
