"use client";

import { useState } from "react";
import { Upload, FileText, CheckCircle } from "lucide-react";

export default function ResumeUpload() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
  });

  const [resume, setResume] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

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
    setSuccess(false);

    try {
      const data = new FormData();
      data.append("fullName", formData.fullName);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("position", formData.position);
      data.append("resume", resume);

      const response = await fetch("http://localhost:5000/api/candidates", {
        method: "POST",
        body: data,
      });

      const text = await response.text();
      let result;

      try {
        result = JSON.parse(text);
      } catch {
        throw new Error("Server error. Please try again later.");
      }

      if (!response.ok) {
        throw new Error(
          result.message || result.error || "Submission failed"
        );
      }

      setSuccess(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        position: "",
      });
      setResume(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* ================= HERO ================= */}
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
            Take the first step towards your dream career. Upload your resume
            and let us connect you with top employers.
          </p>
        </div>
      </section>

      {/* ================= FORM ================= */}
      <section className="py-16 bg-[#f8fafc]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 md:p-10">

            {success && (
              <div className="mb-6 flex items-center gap-3 bg-green-50 border border-green-200 p-4 rounded-xl text-green-700">
                <CheckCircle className="w-5 h-5" />
                Your resume has been submitted successfully. Our team will review it and get back to you shortly.
              </div>
            )}

            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 p-4 rounded-xl text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
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
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border"
              />

              <input
                name="position"
                placeholder="Position Applied For"
                value={formData.position}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border"
              />

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
                {isSubmitting ? "Submitting..." : "Submit Resume"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
