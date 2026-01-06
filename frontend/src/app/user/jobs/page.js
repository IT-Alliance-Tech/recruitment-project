"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/utils/api";

export default function UserJobsPage() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    apiFetch("/jobs").then((res) => {
      if (res.success) {
        setJobs(res.jobs);
      }
    });
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Job Openings</h1>

      {jobs.length === 0 ? (
        <p className="text-gray-500">No jobs available.</p>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="border rounded-xl p-4 bg-white shadow-sm flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold">{job.title}</h2>
                <p className="text-sm text-gray-500">
                  {job.company} • {job.location}
                </p>
              </div>

              <Link
                href={`/user/jobs/${job._id}`}
                className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
