"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, Building2, ArrowRight, Briefcase } from "lucide-react";
import { apiFetch } from "@/utils/api";

export default function JobOpeningsPage() {
  const [jobs, setJobs] = useState([]); // ✅ always array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/jobs")
      .then((res) => {
        console.log("Jobs API response:", res); // 🔍 DEBUG ONCE

        // ✅ Handle all common backend shapes
        if (Array.isArray(res)) {
          setJobs(res);
        } else if (Array.isArray(res.data)) {
          setJobs(res.data);
        } else if (Array.isArray(res.jobs)) {
          setJobs(res.jobs);
        } else if (Array.isArray(res.data?.jobs)) {
          setJobs(res.data.jobs);
        } else {
          setJobs([]); // fallback
        }
      })
      .catch((err) => {
        console.error(err);
        setJobs([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-slate-200 rounded w-1/4 animate-pulse"></div>
        <div className="grid grid-cols-1 gap-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-40 bg-slate-200 rounded-lg animate-pulse"
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
              Available Roles
            </h1>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">
              Explore your next career milestone
            </p>
          </div>
          <div className="px-6 py-2 bg-teal-50 rounded-full text-[10px] font-black text-teal-600 uppercase tracking-widest border border-teal-100">
            {jobs.length} Opportunities Live
          </div>
        </div>

        {jobs.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
            <Briefcase className="mx-auto mb-6 text-slate-200" size={64} />
            <h3 className="text-2xl font-black text-gray-400 italic">
              No live openings currently
            </h3>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-8">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="group bg-white border-2 border-slate-50 rounded-[2.5rem] p-8 hover:border-teal-100 hover:shadow-2xl hover:shadow-teal-500/5 transition-all flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-teal-50 transition-colors">
                      <Building2
                        size={28}
                        className="text-slate-300 group-hover:text-teal-500"
                      />
                    </div>
                    <div className="px-4 py-1.5 bg-slate-50 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Full Time
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-gray-900 mb-2 truncate group-hover:text-teal-600 transition-colors">
                      {job.title}
                    </h2>
                    <div className="flex items-center gap-4 text-gray-400 font-bold text-xs uppercase tracking-widest">
                      <span>{job.company}</span>
                      <span className="w-1 h-1 bg-slate-200 rounded-full" />
                      <div className="flex items-center gap-1.5">
                        <MapPin size={14} /> {job.location || "Remote"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-slate-50 flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-gray-300 uppercase">
                      Competitive Salary
                    </p>
                    <p className="text-sm font-black text-gray-900">
                      Standard Pack
                    </p>
                  </div>
                  <Link
                    href={`/user/jobs/${job._id}`}
                    className="px-8 py-3.5 bg-[#0b1c33] hover:bg-teal-600 text-white font-black rounded-2xl transition-all hover:scale-105 active:scale-95 flex items-center gap-3 text-sm"
                  >
                    View Details
                    <ArrowRight size={16} />
                  </Link>
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
            Openings
          </h1>
          <p className="text-[10px] font-black text-teal-600 uppercase tracking-[0.2em]">
            Live Job Board
          </p>
        </div>

        {jobs.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 space-y-4">
            <Briefcase className="mx-auto text-slate-300" size={40} />
            <p className="text-sm font-bold text-gray-400 italic">
              No job openings found
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white border-2 border-slate-50 rounded-[2rem] p-6 shadow-xl shadow-gray-100 space-y-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center">
                    <Building2 size={24} className="text-slate-200" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-lg font-black text-gray-900 truncate tracking-tight">
                      {job.title}
                    </h2>
                    <p className="text-sm font-bold text-teal-600 truncate uppercase tracking-widest text-[10px]">
                      {job.company}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-1.5 text-[10px] font-black text-gray-400 uppercase tracking-tight">
                    <MapPin size={12} /> {job.location || "Remote"}
                  </div>
                  <Link
                    href={`/user/jobs/${job._id}`}
                    className="flex items-center gap-1.5 px-5 py-3 bg-[#0b1c33] text-white rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-transform"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
