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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-sm">
              <Briefcase className="text-white" size={28} />
            </div>
            <h1 className="text-4xl font-bold text-slate-900">Job Openings</h1>
          </div>
          <p className="text-slate-600 text-sm ml-14">
            Explore exciting career opportunities and find your perfect role
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 font-medium mb-1">Total Openings</p>
                <p className="text-3xl font-bold text-slate-900">{jobs.length}</p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-sm">
                <Briefcase className="text-white" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 font-medium mb-1">Companies Hiring</p>
                <p className="text-3xl font-bold text-slate-900">
                  {new Set(jobs.map((j) => j.company)).size}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 shadow-sm">
                <Building2 className="text-white" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 font-medium mb-1">Total Positions</p>
                <p className="text-3xl font-bold text-slate-900">
                  {jobs.reduce((sum, job) => sum + (parseInt(job.openings) || 0), 0)}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-sm">
                <Users className="text-white" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search by job title, company, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all outline-none shadow-sm"
            />
          </div>
        </div>

        {/* Jobs List */}
        <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-sm">
              <Sparkles className="text-white" size={22} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              {filteredJobs.length > 0
                ? `Available Positions (${filteredJobs.length})`
                : "No Matching Jobs"}
            </h2>
          </div>

          {filteredJobs.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex p-5 bg-slate-50 rounded-2xl mb-4">
                <Briefcase className="text-slate-400" size={48} />
              </div>
              <p className="text-slate-600 text-lg font-medium mb-1">
                {searchTerm ? "No jobs match your search" : "No jobs available"}
              </p>
              <p className="text-slate-500 text-sm">
                {searchTerm
                  ? "Try adjusting your search terms"
                  : "Check back later for new opportunities"}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div
                  key={job._id}
                  className="group border border-gray-100 rounded-xl p-6 hover:border-slate-200 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 mt-1">
                          <Briefcase className="text-white" size={18} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-slate-900 text-xl mb-1 group-hover:text-emerald-600 transition-colors">
                            {job.title}
                          </h3>
                          <p className="text-sm text-slate-600 flex items-center gap-1.5 mb-3">
                            <Building2 size={14} />
                            {job.company}
                          </p>

                          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                            <span className="flex items-center gap-1.5">
                              <MapPin size={14} />
                              {job.location}
                            </span>

                            {job.employmentType && (
                              <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg font-medium text-xs">
                                {job.employmentType}
                              </span>
                            )}

                            {job.experience && (
                              <span className="flex items-center gap-1.5">
                                <Clock size={14} />
                                {job.experience}
                              </span>
                            )}

                            {job.openings && (
                              <span className="flex items-center gap-1.5">
                                <Users size={14} />
                                {job.openings} {job.openings === 1 ? "opening" : "openings"}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/user/jobs/${job._id}`}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl font-semibold text-sm transition-all shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-0.5 group whitespace-nowrap"
                    >
                      View Details
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}