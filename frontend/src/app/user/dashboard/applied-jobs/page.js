"use client";

import { useEffect, useState } from "react";
import { Clock, Building2, MapPin, Briefcase } from "lucide-react";
import { apiFetch } from "@/utils/api";

export default function AppliedJobsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      // ✅ FIX: Use /candidates/me to get user's candidate profile from Candidate model
      // The Candidate model is the source of truth for applications (NOT Application model)
      // ✅ CRITICAL: Add timestamp to prevent browser caching
      const timestamp = new Date().getTime();
      const res = await apiFetch(`/candidates/me?_t=${timestamp}`);
      
      if (res.success && res.candidates && Array.isArray(res.candidates)) {
        // ✅ Show ALL applications regardless of status (APPLIED, INTERVIEW_SCHEDULED, etc.)
        const appliedJobs = res.candidates.filter(
          (candidate) => candidate.job
        );
        setApplications(appliedJobs);
      } else {
        setApplications([]);
      }
    } catch (err) {
      console.error("Failed to fetch applications:", err);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
    
    // ✅ Refresh data every 5 seconds to ensure up-to-date info after login
    const interval = setInterval(fetchApplications, 5000);
    return () => clearInterval(interval);
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
      {/* 💻 DESKTOP VIEW (lg and up) */}
      <div className="hidden lg:block space-y-10">
        <div className="flex items-end justify-between border-b-2 border-slate-50 pb-8">
          <div>
            <h1 className="text-5xl font-black text-gray-900 mb-3 tracking-tight">
              Applied Jobs
            </h1>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">
              Active Application Stream
            </p>
          </div>
          <div className="px-6 py-2 bg-blue-50 rounded-full text-[10px] font-black text-blue-600 uppercase tracking-widest border border-blue-100">
            {applications.length} Active Tracks
          </div>
        </div>

        {applications.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
            <Briefcase className="mx-auto mb-6 text-slate-200" size={64} />
            <h3 className="text-2xl font-black text-gray-400 italic">
              Queue is currently empty
            </h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {applications.map((app) => (
              <div
                key={app._id}
                className="group bg-white border-2 border-slate-50 rounded-[2.5rem] p-8 hover:border-blue-100 hover:shadow-2xl hover:shadow-blue-500/5 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-8">
                  <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                    <Building2
                      size={32}
                      className="text-slate-300 group-hover:text-blue-400"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                      {app.job?.title}
                    </h2>
                    <div className="flex items-center gap-4">
                      <p className="text-sm font-bold text-gray-400 group-hover:text-gray-600 uppercase tracking-widest">
                        {app.job?.company}
                      </p>
                      <span className="w-1 h-1 bg-slate-200 rounded-full" />
                      <div className="flex items-center gap-1.5 text-gray-400 font-medium text-xs italic">
                        <MapPin size={14} /> {app.job?.location || "Remote"}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-10">
                  <div className="text-right">
                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-tighter mb-1">
                      Status
                    </p>
                    <div className="px-5 py-2 bg-blue-50 text-blue-600 rounded-xl text-xs font-black uppercase tracking-widest border border-blue-100">
                      Applied
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full border-2 border-slate-50 flex items-center justify-center text-slate-200 group-hover:border-blue-100 group-hover:text-blue-400 transition-all cursor-pointer">
                    <Clock size={20} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 📱 MOBILE VIEW (md and below) */}
      <div className="lg:hidden space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Applications
          </h1>
          <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">
            Your Applied Jobs
          </p>
        </div>

        {applications.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 space-y-4">
            <Briefcase className="mx-auto text-slate-300" size={40} />
            <p className="text-sm font-bold text-gray-400 italic">
              No applications found
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <div
                key={app._id}
                className="bg-white border-2 border-slate-50 rounded-[2rem] p-6 shadow-xl shadow-gray-100 space-y-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center">
                    <Building2 size={24} className="text-slate-200" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-lg font-black text-gray-900 truncate tracking-tight">
                      {app.job?.title}
                    </h2>
                    <p className="text-sm font-bold text-blue-600 truncate uppercase tracking-widest text-[10px]">
                      {app.job?.company}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-1.5 text-[10px] font-black text-gray-400 uppercase tracking-tight">
                    <MapPin size={12} /> {app.job?.location || "Remote"}
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-blue-100">
                    Applied
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}