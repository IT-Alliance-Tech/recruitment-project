"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/utils/api";
import { useParams } from "next/navigation";

export default function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [profile, setProfile] = useState(null);
  const [resumeUrl, setResumeUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  // Fetch job + user profile
  useEffect(() => {
    apiFetch(`/jobs/${id}`).then((res) => {
      if (res.success) setJob(res.job);
    });

    apiFetch("/auth/profile").then((res) => {
      if (res.success) {
        setProfile(res.user);
        if (res.user.latestResumeUrl) {
          setResumeUrl(res.user.latestResumeUrl);
        }
      }
    });
  }, [id]);

  // Upload new resume (Supabase / existing upload API)
  const handleResumeUpload = async (file) => {
    setUploading(true);

    // ⚠️ Replace this with your existing resume upload logic
    // This assumes you already have a resume upload API
    const uploadedUrl = await fakeUpload(file);

    setResumeUrl(uploadedUrl);
    setUploading(false);
  };

  const applyJob = async () => {
    if (!resumeUrl) {
      alert("Please select or upload a resume");
      return;
    }

    const res = await apiFetch("/applications", {
      method: "POST",
      body: JSON.stringify({
        jobId: id,
        resumeUrl,
      }),
    });

    if (res.success) {
      alert("Applied successfully");
    } else {
      alert(res.message || "Failed to apply");
    }
  };

  if (!job || !profile) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">{job.title}</h1>
      <p className="text-gray-600">
        {job.company} — {job.location}
      </p>

      <p className="mt-4">{job.description}</p>

      {/* Resume Section */}
      <div className="mt-8 border rounded-lg p-4">
        <h2 className="font-semibold mb-3">Resume</h2>

        {/* Latest Resume */}
        {profile.latestResumeUrl && (
          <label className="flex items-center gap-2 mb-3">
            <input
              type="radio"
              checked={resumeUrl === profile.latestResumeUrl}
              onChange={() => setResumeUrl(profile.latestResumeUrl)}
            />
            <span className="text-sm text-gray-700">
              Use latest resume
            </span>
            <a
              href={profile.latestResumeUrl}
              target="_blank"
              className="text-teal-600 text-sm underline"
            >
              View
            </a>
          </label>
        )}

        {/* Upload New Resume */}
        <div className="mt-2">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => handleResumeUpload(e.target.files[0])}
          />
          {uploading && (
            <p className="text-sm text-gray-500 mt-1">
              Uploading resume...
            </p>
          )}
        </div>
      </div>

      {/* Apply Button */}
      <button
        onClick={applyJob}
        className="mt-6 px-6 py-3 bg-teal-600 text-white rounded-xl font-semibold"
      >
        Apply Now
      </button>
    </div>
  );
}

/**
 * TEMP MOCK — replace with your real resume upload logic
 */
const fakeUpload = async (file) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`https://example.com/resumes/${file.name}`);
    }, 1000);
  });
};
