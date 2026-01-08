"use client";

import { useEffect, useState } from "react";
import { Briefcase, MapPin, Users, Clock, Building2, Plus, Sparkles, TrendingUp } from "lucide-react";

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    company: "RecruitATS",
    location: "",
    employmentType: "Full-Time",
    experience: "",
    openings: "",
    description: "",
  });

  /* ================= FETCH JOBS ================= */

  const fetchJobs = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/jobs");
      const data = await res.json();

      if (data.success) {
        setJobs(data.jobs);
      }
    } catch (error) {
      console.error("Failed to fetch jobs", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  /* ================= FORM HANDLING ================= */

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        alert("Job posted successfully");
        setForm({
          title: "",
          company: "RecruitATS",
          location: "",
          employmentType: "Full-Time",
          experience: "",
          openings: "",
          description: "",
        });
        fetchJobs();
      } else {
        alert("Failed to post job");
      }
    } catch (error) {
      alert("Server error");
    }
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      <div className="max-w-7xl mx-auto p-6 md:p-10">
        {/* HEADER */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-sm">
              <Briefcase className="text-white" size={28} />
            </div>
            <h1 className="text-4xl font-bold text-slate-900">Job Management</h1>
          </div>
          <p className="text-slate-600 text-sm ml-14">Create and manage job openings for your organization</p>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 font-medium mb-1">Total Jobs</p>
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
                <p className="text-sm text-slate-600 font-medium mb-1">Active Openings</p>
                <p className="text-3xl font-bold text-slate-900">
                  {jobs.reduce((sum, job) => sum + (parseInt(job.openings) || 0), 0)}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-sm">
                <Users className="text-white" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 font-medium mb-1">Recently Posted</p>
                <p className="text-3xl font-bold text-slate-900">{jobs.slice(0, 5).length}</p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 shadow-sm">
                <TrendingUp className="text-white" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* CREATE JOB FORM */}
        <div className="bg-white border border-gray-100 rounded-2xl p-8 mb-10 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-sm">
              <Plus className="text-white" size={22} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Post a New Job</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Job Title <span className="text-red-500">*</span>
                </label>
                <input
                  name="title"
                  placeholder="e.g. Senior Frontend Developer"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 rounded-xl p-3 text-slate-900 placeholder-slate-400 transition-all outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Company <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    name="company"
                    placeholder="Company name"
                    value={form.company}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 rounded-xl p-3 text-slate-900 placeholder-slate-400 transition-all outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Location <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    name="location"
                    placeholder="e.g. New York, NY"
                    value={form.location}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 rounded-xl p-3 text-slate-900 placeholder-slate-400 transition-all outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Employment Type
                </label>
                <select
                  name="employmentType"
                  value={form.employmentType}
                  onChange={handleChange}
                  className="w-full border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 rounded-xl p-3 text-slate-900 transition-all outline-none"
                >
                  <option>Full-Time</option>
                  <option>Part-Time</option>
                  <option>Contract</option>
                  <option>Internship</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Experience Required
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    name="experience"
                    placeholder="e.g. 2–4 Years"
                    value={form.experience}
                    onChange={handleChange}
                    className="w-full pl-11 border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 rounded-xl p-3 text-slate-900 placeholder-slate-400 transition-all outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Number of Openings <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    name="openings"
                    type="number"
                    placeholder="e.g. 3"
                    value={form.openings}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 rounded-xl p-3 text-slate-900 placeholder-slate-400 transition-all outline-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Job Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                placeholder="Provide a detailed job description, responsibilities, and requirements..."
                value={form.description}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 rounded-xl p-3 text-slate-900 placeholder-slate-400 transition-all outline-none resize-none"
                rows={6}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-3.5 rounded-xl font-semibold transition-all shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Post Job Opening
            </button>
          </form>
        </div>

        {/* JOB LIST */}
        <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl shadow-sm">
              <Sparkles className="text-white" size={22} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Posted Jobs</h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="relative">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200"></div>
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-slate-900 border-r-transparent border-b-transparent border-l-transparent absolute top-0 left-0"></div>
              </div>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex p-5 bg-slate-50 rounded-2xl mb-3">
                <Briefcase className="text-slate-400" size={48} />
              </div>
              <p className="text-slate-600 text-lg font-medium mb-1">No jobs posted yet</p>
              <p className="text-slate-500 text-sm">Create your first job opening using the form above</p>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="group border border-gray-100 rounded-xl p-6 hover:border-slate-200 hover:shadow-sm transition-all duration-200"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 mt-1">
                          <Briefcase className="text-white" size={18} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900 text-lg group-hover:text-emerald-600 transition-colors">
                            {job.title}
                          </h3>
                          <p className="text-sm text-slate-600 flex items-center gap-1 mt-1">
                            <Building2 size={14} />
                            {job.company}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 ml-11">
                        <span className="flex items-center gap-1.5">
                          <MapPin size={14} />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Users size={14} />
                          {job.openings} {job.openings === 1 ? 'opening' : 'openings'}
                        </span>
                        {job.experience && (
                          <span className="flex items-center gap-1.5">
                            <Clock size={14} />
                            {job.experience}
                          </span>
                        )}
                        <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg font-medium text-xs">
                          {job.employmentType}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg font-semibold text-sm border border-emerald-200">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        Active
                      </span>
                    </div>
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