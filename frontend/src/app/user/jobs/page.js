"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  Building2,
  MapPin,
  Clock,
  Users,
  ArrowRight,
  Search,
  Sparkles,
} from "lucide-react";

export default function UserJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/jobs");
        const data = await res.json();

        console.log("RAW JOB API RESPONSE:", data);

        if (data.success && Array.isArray(data.jobs)) {
          setJobs(data.jobs);
        } else {
          setJobs([]);
        }
      } catch (error) {
        console.error("Failed to fetch jobs", error);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs based on search term
  const filteredJobs = jobs.filter((job) => {
    const search = searchTerm.toLowerCase();
    return (
      job.title?.toLowerCase().includes(search) ||
      job.company?.toLowerCase().includes(search) ||
      job.location?.toLowerCase().includes(search)
    );
  });

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

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* 💻 DESKTOP VIEW (lg and up) */}
      <div className="hidden lg:block max-w-[1200px] mx-auto px-8 py-12">
        <div className="flex items-end justify-between mb-12">
          <div className="space-y-2">
            <span className="text-[10px] font-black text-teal-600 uppercase tracking-[0.3em]">
              Career Center
            </span>
            <h1 className="text-5xl font-black text-gray-900 tracking-tighter">
              Explore Opportunities
            </h1>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
              Discover your next milestone
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
              <p className="text-2xl font-black text-gray-900 leading-none">
                {jobs.length}
              </p>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Open Positions
              </p>
            </div>
            <div className="w-px h-10 bg-slate-200" />
            <div className="flex flex-col items-end">
              <p className="text-2xl font-black text-gray-900 leading-none">
                {new Set(jobs.map((j) => j.company)).size}
              </p>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Active Companies
              </p>
            </div>
          </div>
        </div>

        {/* Search Header */}
        <div className="bg-white rounded-[3rem] p-4 border-2 border-slate-50 shadow-xl shadow-gray-200/50 mb-12 flex items-center gap-4">
          <div className="flex-1 relative">
            <Search
              className="absolute left-6 top-1/2 -translate-y-1/2 text-teal-500"
              size={24}
            />
            <input
              type="text"
              placeholder="Search by role, company, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-8 py-6 rounded-[2.5rem] bg-slate-50 border-2 border-transparent focus:border-teal-500 focus:bg-white outline-none transition-all font-bold text-gray-900 text-lg placeholder:text-slate-400"
            />
          </div>
          <div className="p-6 bg-[#0b1c33] text-white rounded-[2.5rem] shadow-2xl flex items-center gap-4">
            <Sparkles size={24} />
            <p className="text-xs font-black uppercase tracking-widest pr-4">
              AI Matching Active
            </p>
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="space-y-6">
          {filteredJobs.length === 0 ? (
            <div className="py-32 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
              <Briefcase size={64} className="mx-auto text-slate-200 mb-6" />
              <h3 className="text-2xl font-black text-gray-900">
                No matching roles found
              </h3>
              <p className="text-gray-400 font-bold uppercase text-xs tracking-widest mt-2">
                Try adjusting your search filters
              </p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div
                key={job._id}
                className="group bg-white rounded-[3rem] p-8 border-2 border-slate-50 hover:border-teal-500 shadow-xl shadow-gray-200/50 transition-all hover:-translate-y-1"
              >
                <div className="flex items-center justify-between gap-12">
                  <div className="flex items-center gap-8 flex-1">
                    <div className="w-20 h-20 rounded-3xl bg-teal-500 flex items-center justify-center text-white shadow-2xl shadow-teal-500/20">
                      <Briefcase size={32} />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-2xl font-black text-gray-900 group-hover:text-teal-600 transition-colors uppercase tracking-tight">
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-4">
                        <p className="text-sm font-black text-teal-600 uppercase tracking-widest">
                          {job.company}
                        </p>
                        <span className="w-1 h-1 bg-slate-300 rounded-full" />
                        <div className="flex items-center gap-1 text-gray-400 font-bold text-xs uppercase tracking-widest">
                          <MapPin size={14} /> {job.location}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-x-12 gap-y-2 px-12 border-x-2 border-slate-50">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-slate-300" />
                      <p className="text-xs font-black text-gray-900 uppercase">
                        {job.employmentType}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-slate-300" />
                      <p className="text-xs font-black text-gray-900 uppercase">
                        {job.openings || 1} Slots
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sparkles size={16} className="text-slate-300" />
                      <p className="text-xs font-black text-gray-900 uppercase">
                        {job.experience || "Entry"}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/user/jobs/${job._id}`}
                    className="px-8 py-5 bg-[#0b1c33] text-white rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-2xl hover:bg-black transition-all flex items-center gap-3 active:scale-95"
                  >
                    View Insights
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 📱 MOBILE VIEW (md and below) */}
      <div className="lg:hidden">
        {/* Mobile Header */}
        <div className="bg-[#0b1c33] px-6 pt-12 pb-24 rounded-b-[4rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full -mr-32 -mt-32 blur-3xl" />

          <div className="relative z-10 space-y-4">
            <span className="text-[10px] font-black text-teal-400 uppercase tracking-[0.3em]">
              Opportunities
            </span>
            <h1 className="text-4xl font-black text-white tracking-tighter">
              Career Board
            </h1>

            <div className="flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar pt-2">
              <div className="bg-white/10 border border-white/20 px-5 py-3 rounded-2xl whitespace-nowrap">
                <p className="text-xs font-black text-white">{jobs.length}</p>
                <p className="text-[8px] font-black text-teal-400 uppercase tracking-widest">
                  Roles
                </p>
              </div>
              <div className="bg-white/10 border border-white/20 px-5 py-3 rounded-2xl whitespace-nowrap">
                <p className="text-xs font-black text-white">
                  {new Set(jobs.map((j) => j.company)).size}
                </p>
                <p className="text-[8px] font-black text-teal-400 uppercase tracking-widest">
                  Primes
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search & List */}
        <div className="px-6 -mt-12 space-y-8 pb-32">
          <div className="relative">
            <Search
              className="absolute left-6 top-1/2 -translate-y-1/2 text-teal-500"
              size={20}
            />
            <input
              type="text"
              placeholder="Role or Company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-6 py-5 bg-white rounded-[2rem] border border-slate-100 shadow-2xl shadow-gray-200 outline-none font-bold text-gray-900 placeholder:text-slate-400"
            />
          </div>

          <div className="space-y-4">
            {filteredJobs.length === 0 ? (
              <div className="py-20 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  No matching roles
                </p>
              </div>
            ) : (
              filteredJobs.map((job) => (
                <Link
                  key={job._id}
                  href={`/user/jobs/${job._id}`}
                  className="block bg-white rounded-[2.5rem] p-6 border border-slate-50 shadow-xl shadow-gray-200/50 active:scale-[0.98] transition-all"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-teal-500 flex items-center justify-center text-white shadow-xl shadow-teal-500/20 shrink-0">
                      <Briefcase size={24} />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight line-clamp-1">
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <p className="text-[10px] font-black text-teal-600 uppercase tracking-widest">
                          {job.company}
                        </p>
                        <span className="w-1 h-1 bg-slate-200 rounded-full" />
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                          {job.location}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <div className="flex items-center gap-3">
                      <div className="px-3 py-1 bg-slate-50 rounded-lg text-[8px] font-black text-gray-600 uppercase">
                        {job.employmentType}
                      </div>
                      <div className="px-3 py-1 bg-slate-50 rounded-lg text-[8px] font-black text-gray-600 uppercase">
                        {job.experience || "Entry"}
                      </div>
                    </div>
                    <div className="text-teal-500 flex items-center gap-1 font-black text-[10px] uppercase tracking-widest">
                      Apply <ArrowRight size={12} />
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
