"use client";

import { useState, useEffect } from "react";
import { Upload, FileText, CheckCircle, X } from "lucide-react";

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
      data.append("name", formData.name);
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
      const response = await fetch(
        "http://localhost:5000/api/candidates",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        }
      );

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
    <>
      {/* ================= HERO / BANNER ================= */}
      <section className="relative min-h-[55vh] flex items-center justify-center text-white overflow-hidden bg-gradient-to-br from-[#0b1c33] via-[#0f2f4f] to-[#0f4c5c]">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-teal-400/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-400/20 rounded-full blur-[140px]" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-teal-300 text-sm font-medium mb-6">
            Apply Now
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Submit Your <span className="text-teal-400">Resume</span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
            Upload your resume once and track your application status directly
            from your dashboard.
          </p>
        </div>
      </section>

      {/* ================= SUCCESS TOAST ================= */}
      {showToast && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 mx-auto mt-8 max-w-3xl rounded-xl flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5" />
            <span>Resume saved successfully!</span>
          </div>
          <button onClick={() => setShowToast(false)}>
            <X className="w-4 h-4 opacity-70" />
          </button>
        </div>
      )}

      {/* ================= FORM SECTION ================= */}
      <section className="py-16 bg-[#f8fafc]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 md:p-10">

            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 p-4 rounded-xl text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border"
              />

              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border"
              />

              <input
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border"
              />

              <select
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border bg-white"
              >
                <option value="">Select Position</option>
                {positions.map((pos) => (
                  <option key={pos} value={pos}>
                    {pos}
                  </option>
                ))}
              </select>

              {formData.position === "Other" && (
                <input
                  name="customPosition"
                  placeholder="Enter Position"
                  value={formData.customPosition}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border"
                />
              )}

              <label className="flex items-center justify-center gap-3 px-6 py-5 border-2 border-dashed rounded-xl cursor-pointer">
                <Upload className="w-5 h-5 text-teal-500" />
                <span className="text-sm">
                  {resume ? resume.name : "Click to upload resume"}
                </span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  hidden
                  onChange={handleFileChange}
                />
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-teal-500 text-white disabled:opacity-60"
              >
                <FileText className="w-5 h-5" />
                {isSubmitting ? "Saving..." : "Save Resume"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
