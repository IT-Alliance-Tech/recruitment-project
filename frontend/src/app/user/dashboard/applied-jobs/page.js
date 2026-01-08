'use client';

import { useEffect, useState } from 'react';
import { Clock, Building2, MapPin, Briefcase } from 'lucide-react';
import { apiFetch } from '@/utils/api';

export default function AppliedJobsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ FIX: Use /candidates/me to get user's candidate profile from Candidate model
    // The Candidate model is the source of truth for applications (NOT Application model)
    // ✅ CRITICAL: Disable cache to ensure fresh data is always displayed
    apiFetch('/candidates/me', { cache: 'no-store' })
      .then((res) => {
        if (res.success && res.candidates && Array.isArray(res.candidates)) {
          // ✅ UPDATE: Backend now returns candidates array
          // Filter to show only APPLIED jobs
          const appliedJobs = res.candidates.filter(
            (candidate) => candidate.status === 'APPLIED' && candidate.job
          );
          setApplications(appliedJobs);
        } else {
          setApplications([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch applications:', err);
        setApplications([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-slate-200 rounded w-1/4 animate-pulse"></div>
        <div className="grid grid-cols-1 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-slate-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Applied Jobs</h1>
        <p className="text-slate-600">Track your job applications and their status</p>
      </div>

      {applications.length === 0 ? (
        // UI improvement only – no logic change
        <div className="text-center py-16 bg-slate-50 rounded-xl border border-dashed border-slate-300">
          <Briefcase className="mx-auto mb-4 text-slate-400" size={48} />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No applied jobs yet</h3>
          <p className="text-slate-600">Browse job openings and apply to get started</p>
        </div>
      ) : (
        // UI improvement only – no logic change
        <div className="grid grid-cols-1 gap-4">
          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-slate-900 mb-2">
                    {app.job?.title}
                  </h2>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Building2 size={16} className="text-slate-400" />
                      <span className="text-sm">{app.job?.company}</span>
                    </div>
                    {app.job?.location && (
                      <div className="flex items-center gap-2 text-slate-600">
                        <MapPin size={16} className="text-slate-400" />
                        <span className="text-sm">{app.job.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                <Clock size={16} className="text-blue-600" />
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                  Applied
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
