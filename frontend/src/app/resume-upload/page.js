"use client";

import { useState, useEffect } from "react";
import { Upload, FileText, CheckCircle, X, ArrowRight } from "lucide-react";

export default function ResumeUpload() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    customPosition: "",
  });

  const [resume, setResume] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const positions = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "UI/UX Designer",
    "QA Engineer",
    "Other",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setError("Resume must be less than 10MB");
      setResume(null);
      return;
    }

    setError("");
    setResume(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume) {
      setError("Please upload your resume");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const data = new FormData();
      data.append("fullName", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append(
        "position",
        formData.position === "Other"
          ? formData.customPosition
          : formData.position
      );
      data.append("resume", resume);

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Please login before uploading resume");
      }

      // ✅ USE EXISTING API ONLY
      const response = await fetch("https://recruitment-project-8tbs.onrender.com/api/candidates", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Submission failed");
      }

      setShowToast(true);
      setResume(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Auto-hide toast
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* 💻 DESKTOP VIEW (lg and up) */}
      <div className="hidden lg:flex min-h-screen">
        {/* Left Side: Branding & Info */}
        <div className="w-1/2 bg-[#0b1c33] relative flex items-center justify-center p-20 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_30%_30%,#14b8a6_0%,transparent_50%)]" />
          <div className="absolute bottom-0 right-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_70%_70%,#3b82f6_0%,transparent_50%)]" />

          <div className="relative z-10 space-y-8">
            <span className="inline-block px-4 py-1 bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-full text-[10px] font-black uppercase tracking-[0.3em]">
              Credentials Hub
            </span>
            <h1 className="text-7xl font-black text-white leading-tight tracking-tighter">
              Upload Your <br />
              <span className="text-teal-400 italic">Professional</span> <br />
              Resume
            </h1>
            <p className="text-gray-400 font-medium text-lg leading-relaxed max-w-md">
              Your resume is the blueprint of your career. Upload once, apply to
              many, and track everything in real-time.
            </p>
            <div className="pt-10 flex items-center gap-6">
              <div className="flex -space-x-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-full border-4 border-[#0b1c33] bg-teal-500 flex items-center justify-center font-black text-white text-xs"
                  >
                    U{i}
                  </div>
                ))}
              </div>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
                + 2,400 Candidates Joined Today
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-1/2 flex items-center justify-center p-20 bg-white">
          <div className="w-full max-w-lg space-y-10">
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-2">
                Basic Information
              </h2>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em]">
                Step 01: Identification
              </p>
            </div>

            {error && (
              <div className="p-4 bg-rose-50 border-2 border-rose-100 rounded-2xl text-rose-600 font-bold text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase px-2">
                    Full Name
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:border-teal-500 focus:bg-white outline-none transition-all font-bold text-gray-900"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase px-2">
                    Phone
                  </label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:border-teal-500 focus:bg-white outline-none transition-all font-bold text-gray-900"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase px-2">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:border-teal-500 focus:bg-white outline-none transition-all font-bold text-gray-900"
                  placeholder="john.doe@techcareer.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase px-2">
                  Target Position
                </label>
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:border-teal-500 focus:bg-white outline-none transition-all font-bold text-gray-900 appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMUw2IDZMMTIgMSIgc3Ryb2tlPSIjOTQ5OUIxIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==')] bg-[length:12px_8px] bg-[92%_center] bg-no-repeat"
                >
                  <option value="">Select a career path</option>
                  {positions.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              {formData.position === "Other" && (
                <input
                  name="customPosition"
                  value={formData.customPosition}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:border-teal-500 focus:bg-white outline-none transition-all font-bold text-gray-900"
                  placeholder="Enter your custom role"
                />
              )}

              <label className="flex items-center justify-between px-8 py-8 bg-teal-50 border-2 border-dashed border-teal-200 rounded-[2rem] cursor-pointer hover:bg-teal-100/50 transition-all group">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-teal-500 shadow-xl group-hover:scale-110 transition-transform">
                    <Upload size={28} />
                  </div>
                  <div>
                    <p className="text-sm font-black text-gray-900">
                      {resume ? resume.name : "Choose File"}
                    </p>
                    <p className="text-xs font-bold text-teal-600 uppercase tracking-widest">
                      Type: PDF, DOCX (Max 10MB)
                    </p>
                  </div>
                </div>
                <input
                  type="file"
                  hidden
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                />
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-[#0b1c33] text-white rounded-[2rem] font-black text-lg shadow-2xl hover:bg-black transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {isSubmitting
                  ? "Uploading Profile..."
                  : "Submit Candidate Profile"}
                <ArrowRight size={20} />
              </button>
            </form>

            {showToast && (
              <div className="p-4 bg-teal-500 text-white rounded-2xl font-black text-xs text-center animate-bounce shadow-xl shadow-teal-500/20">
                RESUME SAVED SUCCESSFULLY! REDIRECTING...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 📱 MOBILE VIEW (md and below) */}
      <div className="lg:hidden px-6 py-12 space-y-10 bg-white min-h-screen">
        <div className="text-center space-y-3">
          <span className="inline-block px-3 py-1 bg-teal-50 text-teal-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-teal-100">
            Portal
          </span>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">
            Upload Resume
          </h1>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Connect with your future
          </p>
        </div>

        {error && (
          <div className="bg-rose-50 p-4 rounded-2xl border-2 border-rose-100 text-rose-600 text-[10px] font-black uppercase text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 pb-20">
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase px-2 mb-1 block">
                Your Name
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 bg-slate-50 rounded-2xl font-bold border-2 border-slate-50 focus:border-teal-500 transition-all outline-none"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase px-2 mb-1 block">
                Contact Email
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 bg-slate-50 rounded-2xl font-bold border-2 border-slate-50 focus:border-teal-500 transition-all outline-none"
                placeholder="name@email.com"
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase px-2 mb-1 block">
                Position
              </label>
              <select
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 bg-slate-50 rounded-2xl font-bold border-2 border-slate-50 focus:border-teal-500 transition-all outline-none"
              >
                <option value="">Select Path</option>
                {positions.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <label className="flex flex-col items-center justify-center p-12 bg-teal-50 border-2 border-dashed border-teal-200 rounded-[2.5rem] mt-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-teal-500/10 rounded-full -mr-10 -mt-10" />
              <Upload size={32} className="text-teal-500 mb-4" />
              <p className="text-sm font-black text-gray-900 text-center">
                {resume ? resume.name : "Tapped to Upload Resume"}
              </p>
              <p className="text-[10px] font-bold text-teal-600 uppercase tracking-widest mt-1">
                PDF or DOCX
              </p>
              <input
                type="file"
                hidden
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-5 bg-[#0b1c33] text-white rounded-[2rem] font-black text-lg shadow-2xl active:scale-95 transition-all"
          >
            {isSubmitting ? "UPLOADING..." : "SUBMIT RESUME"}
          </button>
        </form>

        {showToast && (
          <div className="fixed bottom-6 left-6 right-6 p-5 bg-teal-500 text-white rounded-[2rem] text-center font-black text-[10px] uppercase tracking-widest shadow-2xl z-50">
            SUCCESS! YOUR CAREER STARTS HERE
          </div>
        )}
      </div>
    </div>
  );
}
