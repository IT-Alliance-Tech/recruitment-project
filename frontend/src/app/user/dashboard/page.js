"use client";

import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  FileText,
  Briefcase,
  Upload,
  Building2,
} from "lucide-react";
import { apiFetch } from "@/utils/api";

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Fetch user profile
    apiFetch("/auth/profile").then((res) => {
      if (res.success) {
        setUser(res.user);
      }
    });

    // Fetch user applications
    apiFetch("/applications/my").then((res) => {
      if (res.success) {
        setApplications(res.applications);
      }
    });
  }, []);

  if (!user) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  const appliedCount = applications.length;
  const shortlistedCount = applications.filter(
    (a) => a.status === "shortlisted"
  ).length;
  const rejectedCount = applications.filter(
    (a) => a.status === "rejected"
  ).length;

  // Get latest application (if any)
  const latestApplication = applications[0];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Welcome */}
      <h1 className="text-3xl font-bold mb-6">
        Welcome, <span className="text-teal-600">{user.name}</span>
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <StatCard title="Applied Jobs" value={appliedCount} />
        <StatCard title="Shortlisted" value={shortlistedCount} />
        <StatCard title="Rejected" value={rejectedCount} />
      </div>

      {/* Profile & Resume */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Profile Card */}
        <div className="bg-white border rounded-2xl p-6 shadow-md">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-teal-600" />
            Profile Information
          </h2>

          <div className="space-y-2 text-gray-700">
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-400" />
              {user.email}
            </p>

            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-400" />
              {user.phone || "Not provided"}
            </p>

            <p className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-gray-400" />
              {latestApplication?.jobTitle || "Not applied yet"}
            </p>

            <p className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-gray-400" />
              {latestApplication?.company || "—"}
            </p>
          </div>
        </div>

        {/* Resume Card */}
        <div className="bg-white border rounded-2xl p-6 shadow-md">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-teal-600" />
            Resume
          </h2>

          {user.resumeUrl ? (
            <a
              href={user.resumeUrl}
              target="_blank"
              className="text-teal-600 underline text-sm"
            >
              View Uploaded Resume
            </a>
          ) : (
            <p className="text-gray-500 text-sm mb-3">
              No resume uploaded yet
            </p>
          )}

          <button className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-500 text-white hover:bg-teal-600 transition">
            <Upload className="w-4 h-4" />
            Upload / Replace Resume
          </button>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="bg-white border rounded-2xl p-6 shadow-md">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-teal-600" />
          Recent Applications
        </h2>

        {applications.length === 0 ? (
          <p className="text-gray-500 text-sm">
            You haven’t applied to any jobs yet.
          </p>
        ) : (
          <div className="space-y-4">
            {applications.slice(0, 5).map((app) => (
              <div
                key={app._id}
                className="flex items-center justify-between border rounded-xl p-4"
              >
                <div>
                  <p className="font-medium">{app.jobTitle}</p>
                  <p className="text-sm text-gray-500">
                    {app.company}
                  </p>
                </div>

                <StatusBadge status={app.status} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Helper Components ---------- */

function StatCard({ title, value }) {
  return (
    <div className="bg-white border rounded-2xl p-6 shadow-md text-center">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-teal-600 mt-2">
        {value}
      </p>
    </div>
  );
}

function StatusBadge({ status }) {
  const colors = {
    applied: "bg-blue-100 text-blue-700",
    shortlisted: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        colors[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}
