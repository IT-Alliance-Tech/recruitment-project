'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MapPin, Building2, ArrowRight, Briefcase } from 'lucide-react';
import { apiFetch } from '@/utils/api';

export default function JobOpeningsPage() {
  const [jobs, setJobs] = useState([]); // ✅ always array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch('/jobs')
      .then((res) => {
        console.log('Jobs API response:', res); // 🔍 DEBUG ONCE

        // ✅ Handle all common backend shapes
        if (Array.isArray(res)) {
          setJobs(res);
        } else if (Array.isArray(res.data)) {
          setJobs(res.data);
        } else if (Array.isArray(res.jobs)) {
          setJobs(res.jobs);
        } else if (Array.isArray(res.data?.jobs)) {
          setJobs(res.data.jobs);
        } else {
          setJobs([]); // fallback
        }
      })
      .catch((err) => {
        console.error(err);
        setJobs([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-slate-200 rounded w-1/4 animate-pulse"></div>
        <div className="grid grid-cols-1 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-40 bg-slate-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Job Openings</h1>
        <p className="text-slate-600">Browse and apply to available positions</p>
      </div>

      {jobs.length === 0 ? (
        // UI improvement only – no logic change
        <div className="text-center py-16 bg-slate-50 rounded-xl border border-dashed border-slate-300">
          <Briefcase className="mx-auto mb-4 text-slate-400" size={48} />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No job openings yet</h3>
          <p className="text-slate-600">Check back soon for new opportunities</p>
        </div>
      ) : (
        // UI improvement only – no logic change
        <div className="grid grid-cols-1 gap-4">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {job.title}
                  </h2>
                  <div className="flex flex-wrap gap-3 mt-3">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Building2 size={16} className="text-slate-400" />
                      <span className="text-sm">{job.company}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <MapPin size={16} className="text-slate-400" />
                      <span className="text-sm">{job.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href={`/user/jobs/${job._id}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors group/btn"
              >
                View Details
                <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
