"use client";

import { useEffect, useState } from "react";
import {
  Briefcase,
  MapPin,
  Users,
  Clock,
  Building2,
  Plus,
  Sparkles,
  TrendingUp,
} from "lucide-react";

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
    <div className="min-h-screen bg-[#f8fafc]">
      {/* 💻 DESKTOP VIEW (lg and up) */}
      <div className="hidden lg:block">
        <div className="bg-[#0b1c33] px-12 py-10 flex justify-between items-end text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl -mr-48 -mt-48" />
          <div className="relative z-10 space-y-2">
            <span className="text-[10px] font-black text-teal-400 uppercase tracking-[0.3em]">
              Talent Acquisition
            </span>
            <h1 className="text-4xl font-black tracking-tighter uppercase">
              Job Management
            </h1>
            <p className="text-gray-400 font-bold text-xs uppercase tracking-widest leading-relaxed">
              Broadcast opportunities & architect your dream team
            </p>
          </div>

          <div className="relative z-10 flex gap-10">
            <div className="text-right border-r-2 border-white/10 pr-10">
              <p className="text-2xl font-black">{jobs.length}</p>
              <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest">
                Postings
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-black">
                {jobs.reduce(
                  (sum, job) => sum + (parseInt(job.openings) || 0),
                  0
                )}
              </p>
              <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest">
                Total Slots
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-12 py-12 grid grid-cols-12 gap-12">
          {/* Left: Create Form */}
          <div className="col-span-5 bg-white rounded-[3rem] p-10 border-2 border-slate-50 shadow-2xl shadow-gray-200/50">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-teal-500 flex items-center justify-center text-white shadow-xl shadow-teal-500/20">
                <Plus size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-gray-900 leading-tight">
                  Post New Role
                </h2>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Deployment Console
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">
                  Job Designation
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-teal-500 focus:bg-white outline-none transition-all font-bold text-gray-900"
                  placeholder="e.g. Lead Systems Architect"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">
                    Location
                  </label>
                  <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-teal-500 focus:bg-white outline-none transition-all font-bold text-gray-900"
                    placeholder="Global Remote"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">
                    Slots
                  </label>
                  <input
                    name="openings"
                    type="number"
                    value={form.openings}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-teal-500 focus:bg-white outline-none transition-all font-bold text-gray-900"
                    placeholder="3"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">
                    Experience
                  </label>
                  <input
                    name="experience"
                    value={form.experience}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-teal-500 focus:bg-white outline-none transition-all font-bold text-gray-900"
                    placeholder="5+ Years"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">
                    Type
                  </label>
                  <select
                    name="employmentType"
                    value={form.employmentType}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-teal-500 focus:bg-white outline-none transition-all font-bold text-gray-900"
                  >
                    <option>Full-Time</option>
                    <option>Part-Time</option>
                    <option>Contract</option>
                    <option>Internship</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">
                  Core Brief
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-teal-500 focus:bg-white outline-none transition-all font-bold text-gray-900 resize-none h-32"
                  placeholder="Define the mission..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-5 bg-[#0b1c33] text-white rounded-[2rem] font-black text-lg shadow-2xl hover:bg-black transition-all active:scale-95 flex items-center justify-center gap-3"
              >
                Activate Posting <Plus size={20} />
              </button>
            </form>
          </div>

          {/* Right: Jobs List */}
          <div className="col-span-7 space-y-6">
            <div className="flex items-center justify-between px-4">
              <div>
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                  Active Matrix
                </h2>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Propelled Postings
                </p>
              </div>
              <div className="p-3 bg-slate-100 rounded-xl text-slate-400 hover:text-teal-500 transition-colors cursor-pointer">
                <Sparkles size={24} />
              </div>
            </div>

            {loading ? (
              <div className="py-20 text-center text-gray-400 font-black uppercase tracking-[0.3em] animate-pulse">
                Syncing...
              </div>
            ) : jobs.length === 0 ? (
              <div className="py-20 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-200 text-gray-300 font-black uppercase tracking-widest">
                Zero Roles Deployed
              </div>
            ) : (
              <div className="space-y-4">
                {jobs.map((job) => (
                  <div
                    key={job._id}
                    className="group bg-white rounded-[2.5rem] p-6 border-2 border-slate-50 hover:border-teal-500 shadow-xl shadow-gray-200/50 transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-teal-500 group-hover:bg-teal-500 group-hover:text-white transition-all shadow-lg shadow-gray-100 group-hover:shadow-teal-500/20">
                        <Briefcase size={28} />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-black text-gray-900 uppercase tracking-tight line-clamp-1">
                          {job.title}
                        </h3>
                        <div className="flex items-center gap-3">
                          <p className="text-[10px] font-black text-teal-600 uppercase tracking-widest">
                            {job.location}
                          </p>
                          <span className="w-1 h-1 bg-slate-300 rounded-full" />
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            {job.employmentType}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-lg font-black text-gray-900 leading-none">
                          {job.openings}
                        </p>
                        <p className="text-[8px] font-black text-gray-400 uppercase">
                          Slots
                        </p>
                      </div>
                      <div className="px-5 py-2 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest border-2 border-emerald-100">
                        Active
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 📱 MOBILE VIEW (md and below) */}
      <div className="lg:hidden">
        <div className="bg-[#0b1c33] px-6 pt-16 pb-32 rounded-b-[4rem] relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="relative z-10 space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-black text-teal-400 uppercase tracking-[0.3em]">
                Talent Acquisition
              </span>
              <h1 className="text-4xl font-black text-white tracking-tighter uppercase">
                Job <br />{" "}
                <span className="text-teal-400 italic">Management.</span>
              </h1>
              <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest max-w-[250px] mx-auto leading-relaxed">
                Broadcast opportunities & architect your dream team
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-white/10 px-5 py-3 rounded-2xl border border-white/20">
                <p className="text-sm font-black text-white">{jobs.length}</p>
                <p className="text-[8px] font-black text-teal-400 uppercase tracking-widest">
                  Postings
                </p>
              </div>
              <div className="bg-white/10 px-5 py-3 rounded-2xl border border-white/20">
                <p className="text-sm font-black text-white">
                  {jobs.reduce(
                    (sum, job) => sum + (parseInt(job.openings) || 0),
                    0
                  )}
                </p>
                <p className="text-[8px] font-black text-teal-400 uppercase tracking-widest">
                  Vacancies
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 -mt-20 space-y-8 pb-32 relative z-20">
          {/* Mobile Post Job Form */}
          <div className="bg-white rounded-[3rem] p-8 shadow-2xl shadow-gray-200/50 border border-slate-50 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center text-white shadow-lg">
                <Plus size={20} />
              </div>
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">
                Deploy Role
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 focus:border-teal-500 focus:bg-white rounded-2xl font-bold text-gray-900 outline-none transition-all"
                  placeholder="Target Title"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 focus:border-teal-500 focus:bg-white rounded-2xl font-bold text-gray-900 outline-none transition-all"
                  placeholder="Location"
                />
                <input
                  name="openings"
                  type="number"
                  value={form.openings}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 focus:border-teal-500 focus:bg-white rounded-2xl font-bold text-gray-900 outline-none transition-all"
                  placeholder="Slots"
                />
              </div>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 focus:border-teal-500 focus:bg-white rounded-2xl font-bold text-gray-900 outline-none resize-none h-28 transition-all"
                placeholder="Core Briefing..."
              />
              <button
                type="submit"
                className="w-full py-5 bg-[#0b1c33] text-white rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-xl shadow-[#0b1c33]/20 active:scale-95 transition-all"
              >
                Broadcast Job
              </button>
            </form>
          </div>

          {/* Mobile Job List */}
          <div className="space-y-6">
            <h3 className="text-lg font-black text-gray-900 px-4 tracking-tight uppercase">
              Active Matrix
            </h3>
            <div className="space-y-4">
              {loading ? (
                <div className="p-10 text-center text-[10px] font-black text-gray-300 uppercase animate-pulse">
                  Syncing...
                </div>
              ) : jobs.length === 0 ? (
                <div className="p-20 text-center text-xs font-black text-gray-200">
                  System Void
                </div>
              ) : (
                jobs.map((job) => (
                  <div
                    key={job._id}
                    className="bg-white rounded-[2rem] p-6 border-2 border-slate-50 shadow-xl shadow-gray-200/50 flex items-center justify-between group active:border-teal-500 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-teal-500 shadow-sm border border-slate-100">
                        <Briefcase size={22} />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-sm font-black text-gray-900 uppercase tracking-tight">
                          {job.title}
                        </p>
                        <p className="text-[10px] font-black text-teal-600 uppercase tracking-widest">
                          {job.location}
                        </p>
                      </div>
                    </div>
                    <div className="px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-[8px] font-black uppercase border border-emerald-100 italic">
                      Active
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
